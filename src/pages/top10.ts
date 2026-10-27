import { allEpisodes, allQuizzes } from '../data/catalog.ts';

/** Top 10: episódios mais cobrados nas questões dos desafios clínicos (dado real do catálogo). */
export function top10(): { episodeId: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const q of allQuizzes.flatMap((x) => x.questions)) for (const e of q.relatedEpisodes) counts.set(e, (counts.get(e) ?? 0) + 1);
  const order = new Map(allEpisodes.map((e, i) => [e.id, i]));
  return [...counts.entries()]
    .map(([episodeId, count]) => ({ episodeId, count }))
    .sort((a, b) => b.count - a.count || order.get(a.episodeId)! - order.get(b.episodeId)!)
    .slice(0, 10);
}
