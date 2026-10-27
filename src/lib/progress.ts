/**
 * Progresso do estudante, persistido localmente (localStorage) com
 * versionamento e migração. Não coleta dados pessoais.
 *
 * O armazenamento é injetável (`KeyValueStore`) para permitir testes e uma
 * futura troca por persistência em servidor (autenticação institucional).
 */
import type { QuizResult } from '../domain/types.ts';

export const STORAGE_KEY = 'mapdflix:progress';
export const CURRENT_VERSION = 3;

export type RecentKind = 'episode' | 'case' | 'quiz' | 'series';

export interface RecentItem {
  kind: RecentKind;
  id: string;
  at: string;
}

export interface CaseProgress {
  /** Índice da etapa mais avançada alcançada. */
  step: number;
  /** Decisões tomadas: id da etapa → id da opção. */
  decisions: Record<string, string>;
  completedAt?: string;
}

export interface ProgressState {
  version: typeof CURRENT_VERSION;
  episodes: Record<string, { completedAt: string }>;
  /** Respostas às atividades de fixação dos episódios: questionId → optionId. */
  activities: Record<string, string>;
  quizzes: Record<string, { best: number; attempts: QuizResult[] }>;
  cases: Record<string, CaseProgress>;
  recent: RecentItem[];
  /** “Minha lista”: chaves no formato `tipo:id` (ex.: `series:autoimunidade`). */
  myList: string[];
  /** Avaliações “gostei/não gostei” por chave `tipo:id`. */
  ratings: Record<string, 'up' | 'down'>;
  /** Lembretes de séries “Em breve”. */
  reminders: string[];
  /** Fração lida de cada episódio (0–1), para a barra “Continuar assistindo”. */
  reading: Record<string, number>;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const emptyProgress = (): ProgressState => ({
  version: CURRENT_VERSION,
  episodes: {},
  activities: {},
  quizzes: {},
  cases: {},
  recent: [],
  myList: [],
  ratings: {},
  reminders: [],
  reading: {},
});

/** Formato v1 (protótipo): apenas lista de episódios concluídos e pontuações. */
interface ProgressV1 {
  version: 1;
  completed: string[];
  quizScores?: Record<string, number>;
}

/** Converte qualquer versão conhecida para a atual; dados inválidos → estado vazio. */
export function migrate(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') return emptyProgress();
  const v = (raw as { version?: unknown }).version;
  if (v === CURRENT_VERSION || v === 2) {
    // v2 → v3: acrescenta Minha lista, avaliações, lembretes e progresso de leitura.
    const s = raw as Partial<ProgressState>;
    return {
      ...emptyProgress(),
      ...s,
      version: CURRENT_VERSION,
      episodes: s.episodes ?? {},
      activities: s.activities ?? {},
      quizzes: s.quizzes ?? {},
      cases: s.cases ?? {},
      recent: Array.isArray(s.recent) ? s.recent : [],
      myList: Array.isArray(s.myList) ? s.myList : [],
      ratings: s.ratings ?? {},
      reminders: Array.isArray(s.reminders) ? s.reminders : [],
      reading: s.reading ?? {},
    };
  }
  if (v === 1) {
    const old = raw as ProgressV1;
    const next = emptyProgress();
    const now = new Date(0).toISOString();
    for (const id of old.completed ?? []) next.episodes[id] = { completedAt: now };
    for (const [quizId, best] of Object.entries(old.quizScores ?? {})) next.quizzes[quizId] = { best, attempts: [] };
    return next;
  }
  return emptyProgress();
}

class MemoryStore implements KeyValueStore {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}

/** Retorna localStorage quando disponível; caso contrário, memória (modo privado, SSR, testes). */
export function defaultStore(): KeyValueStore {
  try {
    const ls = globalThis.localStorage;
    const probe = '__mapdflix_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return ls;
  } catch {
    return new MemoryStore();
  }
}

export function load(store: KeyValueStore, key: string = STORAGE_KEY): ProgressState {
  try {
    const txt = store.getItem(key);
    return txt ? migrate(JSON.parse(txt)) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function save(store: KeyValueStore, state: ProgressState, key: string = STORAGE_KEY): void {
  try {
    store.setItem(key, JSON.stringify(state));
  } catch {
    /* armazenamento indisponível ou cheio: o app segue funcionando em memória */
  }
}

/* ---------------- operações puras ---------------- */

const MAX_RECENT = 12;

export function touchRecent(s: ProgressState, kind: RecentKind, id: string, at = new Date().toISOString()): ProgressState {
  const recent = [{ kind, id, at }, ...s.recent.filter((r) => !(r.kind === kind && r.id === id))].slice(0, MAX_RECENT);
  return { ...s, recent };
}

export function setEpisodeCompleted(s: ProgressState, episodeId: string, done: boolean, at = new Date().toISOString()): ProgressState {
  const episodes = { ...s.episodes };
  if (done) episodes[episodeId] = { completedAt: at };
  else delete episodes[episodeId];
  return { ...s, episodes };
}

export function recordActivity(s: ProgressState, questionId: string, optionId: string): ProgressState {
  return { ...s, activities: { ...s.activities, [questionId]: optionId } };
}

export function recordQuizResult(s: ProgressState, result: QuizResult): ProgressState {
  const prev = s.quizzes[result.quizId] ?? { best: 0, attempts: [] };
  return {
    ...s,
    quizzes: {
      ...s.quizzes,
      [result.quizId]: { best: Math.max(prev.best, result.percent), attempts: [...prev.attempts, result].slice(-10) },
    },
  };
}

export function updateCase(s: ProgressState, caseId: string, patch: Partial<CaseProgress>): ProgressState {
  const prev = s.cases[caseId] ?? { step: 0, decisions: {} };
  return { ...s, cases: { ...s.cases, [caseId]: { ...prev, ...patch, decisions: { ...prev.decisions, ...(patch.decisions ?? {}) } } } };
}

export function resetCase(s: ProgressState, caseId: string): ProgressState {
  const cases = { ...s.cases };
  delete cases[caseId];
  return { ...s, cases };
}

/** Fração (0–1) de episódios concluídos de uma lista. */
export function completion(s: ProgressState, episodeIds: string[]): number {
  if (episodeIds.length === 0) return 0;
  return episodeIds.filter((id) => s.episodes[id]).length / episodeIds.length;
}

export function toggleMyList(s: ProgressState, key: string): ProgressState {
  return { ...s, myList: s.myList.includes(key) ? s.myList.filter((k) => k !== key) : [key, ...s.myList] };
}

export function rate(s: ProgressState, key: string, value: 'up' | 'down'): ProgressState {
  const ratings = { ...s.ratings };
  if (ratings[key] === value) delete ratings[key];
  else ratings[key] = value;
  return { ...s, ratings };
}

export function toggleReminder(s: ProgressState, id: string): ProgressState {
  return { ...s, reminders: s.reminders.includes(id) ? s.reminders.filter((k) => k !== id) : [...s.reminders, id] };
}

/** Registra o quanto do episódio foi lido (só aumenta). */
export function setReading(s: ProgressState, episodeId: string, fraction: number): ProgressState {
  const f = Math.max(0, Math.min(1, fraction));
  if ((s.reading[episodeId] ?? 0) >= f - 0.01) return s;
  return { ...s, reading: { ...s.reading, [episodeId]: f } };
}

/** Chave de armazenamento por perfil (perfis à la streaming). */
export const storageKeyFor = (profileId: string) => `${STORAGE_KEY}:${profileId}`;
