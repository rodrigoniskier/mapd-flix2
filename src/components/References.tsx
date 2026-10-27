import type { Citation, ReferenceKind } from '../domain/types.ts';
import { referenceById } from '../data/references.ts';

const GROUP: Record<ReferenceKind, string> = {
  'obra-base': 'Obra-base',
  pedagogica: 'Orientação pedagógica',
  complementar: 'Complementação científica (verificável, identificada separadamente)',
  normativa: 'Normativas e políticas públicas',
};

const ORDER: ReferenceKind[] = ['obra-base', 'pedagogica', 'complementar', 'normativa'];

/** Lista de referências agrupada por tipo, deduplicada, com localizações. */
export function References({ citations, title = 'Referências', headingLevel = 2 }: { citations: Citation[]; title?: string; headingLevel?: 2 | 3 }) {
  const byRef = new Map<string, string[]>();
  for (const c of citations) {
    const list = byRef.get(c.ref) ?? [];
    if (c.locator) list.push(c.locator);
    byRef.set(c.ref, list);
  }
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="card-surface avoid-break p-5" aria-label={title} data-component="references">
      <H className="text-lg font-bold">{title}</H>
      {ORDER.map((kind) => {
        const items = [...byRef.entries()].filter(([id]) => referenceById.get(id)?.kind === kind);
        if (!items.length) return null;
        return (
          <div key={kind} className="mt-3">
            <div className="text-xs font-bold uppercase tracking-wider text-mute print-muted">{GROUP[kind]}</div>
            <ul className="mt-1.5 space-y-2 text-sm [overflow-wrap:anywhere]">
              {items.map(([id, locs]) => {
                const r = referenceById.get(id)!;
                return (
                  <li key={id}>
                    {r.citation}
                    {locs.length > 0 && <span className="text-mute print-muted"> — {locs.join('; ')}</span>}
                    {r.url && (
                      <>
                        {' '}
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="break-all underline hover:text-white">
                          {r.doi ? `doi:${r.doi}` : r.url}
                        </a>
                      </>
                    )}
                    {r.note && <div className="text-xs text-mute print-muted">{r.note}</div>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
