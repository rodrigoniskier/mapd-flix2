import type { Quiz, QuizAnswer, QuizResult } from '../domain/types.ts';

export function isCorrect(quiz: Quiz, questionId: string, optionId: string): boolean {
  const q = quiz.questions.find((x) => x.id === questionId);
  return !!q && q.correctOptionId === optionId;
}

/**
 * Calcula o resultado de um quiz a partir das respostas.
 * Questões não respondidas contam como erro.
 */
export function scoreQuiz(quiz: Quiz, answers: Record<string, string>, finishedAt = new Date().toISOString()): QuizResult {
  const list: QuizAnswer[] = quiz.questions.map((q) => {
    const optionId = answers[q.id] ?? '';
    return { questionId: q.id, optionId, correct: optionId === q.correctOptionId };
  });
  const correct = list.filter((a) => a.correct).length;
  const total = quiz.questions.length;

  const misses = new Map<string, number>();
  const tags = new Set<string>();
  for (const q of quiz.questions) {
    const a = list.find((x) => x.questionId === q.id)!;
    if (a.correct) continue;
    for (const ep of q.relatedEpisodes) misses.set(ep, (misses.get(ep) ?? 0) + 1);
    for (const t of q.tags) tags.add(t);
  }

  return {
    quizId: quiz.id,
    total,
    correct,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
    answers: list,
    reviewEpisodes: [...misses.entries()]
      .map(([episodeId, n]) => ({ episodeId, misses: n }))
      .sort((a, b) => b.misses - a.misses || a.episodeId.localeCompare(b.episodeId)),
    reviewTags: [...tags],
    finishedAt,
  };
}

export function performanceLabel(percent: number): string {
  if (percent >= 90) return 'Excelente domínio';
  if (percent >= 70) return 'Bom desempenho';
  if (percent >= 50) return 'Em consolidação';
  return 'Revisão recomendada';
}
