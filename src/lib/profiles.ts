/**
 * Perfis locais (estilo streaming). Nenhum dado sai do navegador.
 * O perfil do professor é fixo; estudantes podem criar perfis com um nome.
 */
import type { KeyValueStore } from './progress.ts';
import { STORAGE_KEY, storageKeyFor } from './progress.ts';

export interface Profile {
  id: string;
  name: string;
  /** Foto (somente o perfil do professor) ou cor do avatar. */
  photo?: string;
  color: string;
  kind: 'professor' | 'estudante';
}

export const PROFILES_KEY = 'mapdflix:profiles';
export const MAX_PROFILES = 5;
export const AVATAR_COLORS = ['#e3122b', '#2b7de9', '#f5a524', '#21a366', '#8b5cf6', '#ec4899'];

export const defaultProfiles = (professorPhoto: string, professorName: string): Profile[] => [
  { id: 'professor', name: professorName, photo: professorPhoto, color: '#e3122b', kind: 'professor' },
  { id: 'estudante', name: 'Estudante', color: '#2b7de9', kind: 'estudante' },
];

export function loadProfiles(store: KeyValueStore, defaults: Profile[]): Profile[] {
  try {
    const raw = store.getItem(PROFILES_KEY);
    const extra = raw ? (JSON.parse(raw) as Profile[]).filter((p) => p && p.kind === 'estudante' && p.id && p.name) : [];
    const ids = new Set(defaults.map((d) => d.id));
    return [...defaults, ...extra.filter((p) => !ids.has(p.id))].slice(0, MAX_PROFILES);
  } catch {
    return defaults;
  }
}

export function saveCustomProfiles(store: KeyValueStore, all: Profile[], defaults: Profile[]): void {
  const ids = new Set(defaults.map((d) => d.id));
  try {
    store.setItem(PROFILES_KEY, JSON.stringify(all.filter((p) => !ids.has(p.id))));
  } catch {
    /* sem armazenamento: perfis ficam apenas nesta sessão */
  }
}

export function newProfile(name: string, existing: Profile[]): Profile {
  const clean = name.trim().replace(/\s+/g, ' ').slice(0, 24);
  const base = clean.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'perfil';
  let id = base;
  let n = 2;
  while (existing.some((p) => p.id === id)) id = `${base}-${n++}`;
  return { id, name: clean, color: AVATAR_COLORS[existing.length % AVATAR_COLORS.length], kind: 'estudante' };
}

/** Primeira vez no perfil “estudante”: herda o progresso salvo antes da existência de perfis. */
export function migrateLegacyProgress(store: KeyValueStore, profileId: string): void {
  try {
    if (profileId !== 'estudante') return;
    const key = storageKeyFor(profileId);
    if (store.getItem(key) !== null) return;
    const legacy = store.getItem(STORAGE_KEY);
    if (legacy !== null) store.setItem(key, legacy);
  } catch {
    /* ignora */
  }
}
