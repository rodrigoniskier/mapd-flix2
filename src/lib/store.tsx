import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  defaultStore,
  load,
  recordActivity,
  recordQuizResult,
  resetCase,
  save,
  setEpisodeCompleted,
  touchRecent,
  updateCase,
} from './progress.ts';
import type { CaseProgress, ProgressState, RecentKind } from './progress.ts';
import type { QuizResult } from '../domain/types.ts';
import { parseHash } from './router.ts';
import type { Route } from './router.ts';

interface ProgressApi {
  state: ProgressState;
  setCompleted: (episodeId: string, done: boolean) => void;
  answerActivity: (questionId: string, optionId: string) => void;
  saveQuiz: (r: QuizResult) => void;
  patchCase: (caseId: string, patch: Partial<CaseProgress>) => void;
  restartCase: (caseId: string) => void;
  visit: (kind: RecentKind, id: string) => void;
}

const ProgressCtx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children?: ReactNode }) {
  const store = useMemo(() => defaultStore(), []);
  const [state, setState] = useState<ProgressState>(() => load(store));

  useEffect(() => save(store, state), [store, state]);

  const setCompleted = useCallback((id: string, done: boolean) => setState((s) => setEpisodeCompleted(s, id, done)), []);
  const answerActivity = useCallback((q: string, o: string) => setState((s) => recordActivity(s, q, o)), []);
  const saveQuiz = useCallback((r: QuizResult) => setState((s) => recordQuizResult(s, r)), []);
  const patchCase = useCallback((id: string, p: Partial<CaseProgress>) => setState((s) => updateCase(s, id, p)), []);
  const restartCase = useCallback((id: string) => setState((s) => resetCase(s, id)), []);
  const visit = useCallback((k: RecentKind, id: string) => setState((s) => touchRecent(s, k, id)), []);

  const api = useMemo(
    () => ({ state, setCompleted, answerActivity, saveQuiz, patchCase, restartCase, visit }),
    [state, setCompleted, answerActivity, saveQuiz, patchCase, restartCase, visit],
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
