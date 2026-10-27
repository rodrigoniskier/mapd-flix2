import type { ClinicalCase, Episode, Quiz, Series } from '../domain/types.ts';

export type SearchKind = 'series' | 'episode' | 'case' | 'quiz' | 'term';

export interface SearchDoc {
  kind: SearchKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  /** Texto pesquisável normalizado. */
  haystack: string;
  /** Campos de maior peso (títulos/termos). */
  primary: string;
}

/** Minúsculas, sem acentos, espaços normalizados. */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\*\*/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const NON_TEXT_KEYS = new Set(['type', 'illustration', 'stage', 'variant', 'role', 'id', 'x', 'y']);

/** Extrai apenas o texto legível de uma estrutura de dados (ignora chaves técnicas). */
export function collectText(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectText(v, out));
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) if (!NON_TEXT_KEYS.has(k)) collectText(v, out);
  return out;
}

export function buildIndex(series: Series[], episodes: Episode[], cases: ClinicalCase[], quizzes: Quiz[]): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const seriesTitle = new Map(series.map((s) => [s.id, s.title]));
  for (const s of series) {
    if (s.status !== 'disponivel') continue;
    docs.push({
      kind: 'series',
      id: s.id,
      title: s.title,
      subtitle: s.tagline,
      href: `#/serie/${s.id}`,
      primary: normalize(s.title),
      haystack: normalize([s.title, s.tagline, s.synopsis, ...s.learningObjectives].join(' ')),
    });
  }
  for (const e of episodes) {
    const blocksText = collectText(e.sections).join(' ');
    docs.push({
      kind: 'episode',
      id: e.id,
      title: `Ep. ${e.number} — ${e.title}`,
      subtitle: seriesTitle.get(e.seriesId) ?? '',
      href: `#/episodio/${e.id}`,
      primary: normalize([e.title, ...e.keywords, ...e.keyTerms.map((t) => t.term)].join(' ')),
      haystack: normalize([e.title, e.tagline, e.guidingQuestion, ...e.objectives, ...e.synthesis, blocksText].join(' ')),
    });
    for (const t of e.keyTerms) {
      docs.push({
        kind: 'term',
        id: `${e.id}::${t.term}`,
        title: t.term,
        subtitle: `Conceito · ${e.title}`,
        href: `#/episodio/${e.id}`,
        primary: normalize(t.term),
        haystack: normalize(`${t.term} ${t.definition}`),
      });
    }
  }
  for (const c of cases) {
    docs.push({
      kind: 'case',
      id: c.id,
      title: c.title,
      subtitle: c.hook,
      href: `#/caso/${c.id}`,
      primary: normalize(c.title),
      // A busca não indexa a etapa de elucidação, para não revelar o diagnóstico.
      haystack: normalize([c.title, c.hook, ...c.objectives].join(' ')),
    });
  }
  for (const q of quizzes) {
    docs.push({
      kind: 'quiz',
      id: q.id,
      title: q.title,
      subtitle: q.tagline,
      href: `#/quiz/${q.id}`,
      primary: normalize(q.title),
      haystack: normalize([q.title, q.description].join(' ')),
    });
  }
  return docs;
}

export function search(index: SearchDoc[], query: string, limit = 30): SearchDoc[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const words = q.split(' ').filter(Boolean);
  const scored: { d: SearchDoc; score: number }[] = [];
  for (const d of index) {
    let score = 0;
    let all = true;
    for (const w of words) {
      const inPrimary = d.primary.includes(w);
      const inHay = d.haystack.includes(w);
      if (!inPrimary && !inHay) {
        all = false;
        break;
      }
      score += inPrimary ? 5 : 1;
    }
    if (!all) continue;
    if (d.primary.startsWith(q)) score += 5;
    if (d.kind === 'term' && d.primary === q) score += 10;
    scored.push({ d, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.d.title.localeCompare(b.d.title)).slice(0, limit).map((x) => x.d);
}
