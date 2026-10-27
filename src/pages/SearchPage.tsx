import { useEffect, useMemo, useState } from 'react';
import { allCases, allEpisodes, allQuizzes, allSeries } from '../data/catalog.ts';
import { Icon } from '../components/ui.tsx';
import { buildIndex, search } from '../lib/search.ts';
import type { SearchKind } from '../lib/search.ts';
import { href } from '../lib/router.ts';

const KIND: Record<SearchKind, string> = { series: 'Série', episode: 'Episódio', case: 'Caso clínico', quiz: 'Desafio', term: 'Conceito' };
const SUGESTOES = ['FAN', 'IgE', 'SCID', 'complemento', 'Treg', 'triptase', 'adrenalina', 'HLA', 'TREC', 'imunocomplexos'];

export function SearchPage({ q }: { q: string }) {
  const [value, setValue] = useState(q);
  const index = useMemo(() => buildIndex(allSeries, allEpisodes, allCases, allQuizzes), []);
  const results = useMemo(() => search(index, q), [index, q]);
  useEffect(() => setValue(q), [q]);
  useEffect(() => {
    document.title = q ? `Busca: ${q} — MAPD-Flix` : 'Busca — MAPD-Flix';
  }, [q]);

  return (
    <div className="container-page max-w-4xl pb-10 pt-24">
      <h1 className="font-display text-3xl font-extrabold">Buscar temas e conceitos</h1>
      <form
        role="search"
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          location.hash = href.search(value.trim());
        }}
      >
        <label htmlFor="busca-pagina" className="sr-only">Termo de busca</label>
        <input
          id="busca-pagina"
          type="search"
          autoFocus
          value={value}
          onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
          placeholder="Ex.: anti-dsDNA, mastócito, linfopenia…"
          className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-panel px-4 text-white placeholder:text-mute focus:border-brand focus:outline-none"
        />
        <button type="submit" className="btn btn-brand h-12 shrink-0">
          <Icon name="search" className="h-5 w-5" /> Buscar
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Sugestões">
        {SUGESTOES.map((s) => (
          <a key={s} href={href.search(s)} className="chip hover:bg-white/15">{s}</a>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {q && (
          <p className="mb-3 text-sm text-mute" data-testid="search-count">
            {results.length} resultado{results.length === 1 ? '' : 's'} para “{q}”
          </p>
        )}
        <ul className="space-y-2">
          {results.map((r) => (
            <li key={r.kind + r.id}>
              <a href={r.href} className="block rounded-xl border border-line px-4 py-3 hover:bg-white/5" data-search-result={r.kind}>
                <span className="chip mr-2">{KIND[r.kind]}</span>
                <span className="font-semibold text-white">{r.title}</span>
                <span className="mt-0.5 block text-sm text-mute">{r.subtitle}</span>
              </a>
            </li>
          ))}
        </ul>
        {q && results.length === 0 && <p>Nenhum resultado. Tente outro termo ou uma das sugestões acima.</p>}
      </div>
    </div>
  );
}
