import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  defaultStore,
  load,
  rate,
  recordActivity,
  recordQuizResult,
  resetCase,
  save,
  setEpisodeCompleted,
  setReading,
  storageKeyFor,
  toggleMyList,
  toggleReminder,
  touchRecent,
  updateCase,
} from './progress.ts';
import type { CaseProgress, KeyValueStore, ProgressState, RecentKind } from './progress.ts';
import { defaultProfiles, loadProfiles, migrateLegacyProgress, newProfile, saveCustomProfiles } from './profiles.ts';
import type { Profile } from './profiles.ts';
import type { QuizResult } from '../domain/types.ts';
import { professor } from '../data/media.ts';
import { parseHash } from './router.ts';
import type { Route } from './router.ts';

/* ------------------------------------------------------------------ */
/* Perfis                                                              */
/* ------------------------------------------------------------------ */

const ACTIVE_KEY = 'mapdflix:active-profile';
const INTRO_KEY = 'mapdflix:intro-seen';

interface ProfileApi {
  profiles: Profile[];
  active: Profile | null;
  /** Abertura animada já exibida nesta sessão do navegador. */
  introSeen: boolean;
  choose: (id: string) => void;
  signOut: () => void;
  add: (name: string) => Profile | null;
  remove: (id: string) => void;
  markIntroSeen: () => void;
  store: KeyValueStore;
}

const ProfileCtx = createContext<ProfileApi | null>(null);

function session(): Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> {
  try {
    const s = globalThis.sessionStorage;
    s.setItem('__p', '1');
    s.removeItem('__p');
    return s;
  } catch {
    const m = new Map<string, string>();
    return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k) };
  }
}

export function ProfileProvider({ children }: { children?: ReactNode }) {
  const store = useMemo(() => defaultStore(), []);
  const ss = useMemo(() => session(), []);
  const defaults = useMemo(() => defaultProfiles(professor.photo, professor.shortName), []);
  const [profiles, setProfiles] = useState<Profile[]>(() => loadProfiles(store, defaults));
  const [activeId, setActiveId] = useState<string | null>(() => ss.getItem(ACTIVE_KEY));
  const [introSeen, setIntroSeen] = useState<boolean>(() => ss.getItem(INTRO_KEY) === '1');

  const active = profiles.find((p) => p.id === activeId) ?? null;

  const choose = useCallback(
    (id: string) => {
      migrateLegacyProgress(store, id);
      ss.setItem(ACTIVE_KEY, id);
      setActiveId(id);
    },
    [store, ss],
  );
  const signOut = useCallback(() => {
    ss.removeItem(ACTIVE_KEY);
    setActiveId(null);
  }, [ss]);
  const add = useCallback(
    (name: string) => {
      if (!name.trim() || profiles.length >= 5) return null;
      const p = newProfile(name, profiles);
      const next = [...profiles, p];
      setProfiles(next);
      saveCustomProfiles(store, next, defaults);
      return p;
    },
    [profiles, store, defaults],
  );
  const remove = useCallback(
    (id: string) => {
      if (defaults.some((d) => d.id === id)) return;
      const next = profiles.filter((p) => p.id !== id);
      setProfiles(next);
      saveCustomProfiles(store, next, defaults);
    },
    [profiles, store, defaults],
  );
  const markIntroSeen = useCallback(() => {
    ss.setItem(INTRO_KEY, '1');
    setIntroSeen(true);
  }, [ss]);

  const api = useMemo(
    () => ({ profiles, active, introSeen, choose, signOut, add, remove, markIntroSeen, store }),
    [profiles, active, introSeen, choose, signOut, add, remove, markIntroSeen, store],
  );
  return <ProfileCtx.Provider value={api}>{children}</ProfileCtx.Provider>;
}

export function useProfiles(): ProfileApi {
  const ctx = useContext(ProfileCtx);
  if (!ctx) throw new Error('useProfiles fora do ProfileProvider');
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Progresso (por perfil)                                              */
/* ------------------------------------------------------------------ */

interface ProgressApi {
  state: ProgressState;
  setCompleted: (episodeId: string, done: boolean) => void;
  answerActivity: (questionId: string, optionId: string) => void;
  saveQuiz: (r: QuizResult) => void;
  patchCase: (caseId: string, patch: Partial<CaseProgress>) => void;
  restartCase: (caseId: string) => void;
  visit: (kind: RecentKind, id: string) => void;
  toggleList: (key: string) => void;
  rateItem: (key: string, value: 'up' | 'down') => void;
  toggleRemind: (seriesId: string) => void;
  readEpisode: (episodeId: string, fraction: number) => void;
}

const ProgressCtx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ profileId, store, children }: { profileId: string; store: KeyValueStore; children?: ReactNode }) {
  const key = storageKeyFor(profileId);
  const [state, setState] = useState<ProgressState>(() => load(store, key));

  useEffect(() => save(store, state, key), [store, state, key]);

  const setCompleted = useCallback((id: string, done: boolean) => setState((s) => setEpisodeCompleted(s, id, done)), []);
  const answerActivity = useCallback((q: string, o: string) => setState((s) => recordActivity(s, q, o)), []);
  const saveQuiz = useCallback((r: QuizResult) => setState((s) => recordQuizResult(s, r)), []);
  const patchCase = useCallback((id: string, p: Partial<CaseProgress>) => setState((s) => updateCase(s, id, p)), []);
  const restartCase = useCallback((id: string) => setState((s) => resetCase(s, id)), []);
  const visit = useCallback((k: RecentKind, id: string) => setState((s) => touchRecent(s, k, id)), []);
  const toggleList = useCallback((k: string) => setState((s) => toggleMyList(s, k)), []);
  const rateItem = useCallback((k: string, v: 'up' | 'down') => setState((s) => rate(s, k, v)), []);
  const toggleRemind = useCallback((id: string) => setState((s) => toggleReminder(s, id)), []);
  const readEpisode = useCallback((id: string, f: number) => setState((s) => setReading(s, id, f)), []);

  const api = useMemo(
    () => ({ state, setCompleted, answerActivity, saveQuiz, patchCase, restartCase, visit, toggleList, rateItem, toggleRemind, readEpisode }),
    [state, setCompleted, answerActivity, saveQuiz, patchCase, restartCase, visit, toggleList, rateItem, toggleRemind, readEpisode],
  );
  return <ProgressCtx.Provider value={api}>{children}</ProgressCtx.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error('useProgress fora do ProgressProvider');
  return ctx;
}

/** Rota atual a partir de location.hash. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash));
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return route;
}

/** Modo de impressão: componentes interativos se renderizam abertos/estáticos. */
const PrintCtx = createContext<boolean>(false);
export const PrintModeProvider = ({ value, children }: { value: boolean; children?: ReactNode }) => (
  <PrintCtx.Provider value={value}>{children}</PrintCtx.Provider>
);
export const usePrintMode = () => useContext(PrintCtx);

/** Verdadeiro quando o app roda em ambiente hospedado restrito (sem diálogo de impressão nem iframes externos). */
export const isEmbedded = (): boolean => !!(globalThis as { __MAPD_EMBED__?: boolean }).__MAPD_EMBED__;
