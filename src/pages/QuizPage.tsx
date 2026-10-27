import { useEffect, useState } from 'react';
import type { QuizResult } from '../domain/types.ts';
import { getEpisode, getQuiz, getSeries } from '../data/catalog.ts';
import { AnswerFeedback, CheckQuestion } from '../components/blocks.tsx';
import { References } from '../components/References.tsx';
import { Icon, ProgressBar } from '../components/ui.tsx';
import { performanceLabel, scoreQuiz } from '../lib/quiz.ts';
import { href } from '../lib/router.ts';
import { Photo } from '../components/Photo.tsx';
import { photoFor } from '../data/media.ts';
import { useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

type Phase = 'intro' | 'running' | 'done';

export function QuizPage({ id }: { id: string }) {
  const quiz = getQuiz(id);
  const { state, saveQuiz, visit } = useProgress();
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (quiz) {
      document.title = `${quiz.title} — MAPD-Flix`;
      visit('quiz', quiz.id);
    }
  }, [quiz, visit]);
  useEffect(() => {
    scrollTo({ top: 0 });
  }, [phase, index]);

  if (!quiz) return <NotFound />;
  const s = getSeries(quiz.seriesId)!;
  const q = quiz.questions[index];
  const answered = q && answers[q.id] !== undefined;
  const best = state.quizzes[quiz.id]?.best;

  const start = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setPhase('running');
  };
  const finish = () => {
    const r = scoreQuiz(quiz, answers);
    setResult(r);
    saveQuiz(r);
    setPhase('done');
  };

  return (
    <div className="pb-10">
      <header className="relative overflow-hidden">
        <Photo photo={photoFor(quiz.id)} className="absolute inset-0 h-full w-full" eager />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative pb-10 pt-28 md:pt-36">
          <nav aria-label="Trilha" className="text-sm text-white/70">
            <a href={href.home()} className="hover:text-white">Início</a> <span aria-hidden="true">›</span> Filmes especiais
          </nav>
          <div className="mt-3 chip bg-black/40">
            <Icon name="trophy" className="h-3.5 w-3.5" /> Filme especial · Desafio clínico
          </div>
          <h1 className="mt-3 font-title text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-white [overflow-wrap:anywhere]">{quiz.title}</h1>
          <p className="mt-2 max-w-2xl text-white/90">{quiz.tagline}</p>
        </div>
      </header>

      <div className="container-page mt-8 max-w-4xl">
        {phase === 'intro' && (
          <section className="card-surface p-6" aria-labelledby="intro-quiz">
            <h2 id="intro-quiz" className="text-xl font-bold">Como funciona</h2>
            <p className="mt-2">{quiz.description}</p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li>• {quiz.questions.length} questões, uma por vez, com quatro alternativas e uma única correta.</li>
              <li>• Feedback imediato, justificativa científica e análise de cada alternativa incorreta.</li>
              <li>• Ao final: pontuação, percentual e episódios recomendados para revisão.</li>
            </ul>
            {best !== undefined && <p className="mt-3 text-sm text-mute">Seu melhor resultado até agora: <strong className="text-white">{best}%</strong></p>}
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="btn btn-brand" onClick={start} data-testid="iniciar-quiz">
                <Icon name="play" className="h-5 w-5" /> Iniciar desafio
              </button>
              <a className="btn btn-ghost" href={href.printQuiz(quiz.id, false)}>
                <Icon name="print" className="h-5 w-5" /> Imprimir questões
              </a>
              <a className="btn btn-ghost" href={href.printQuiz(quiz.id, true)}>
                <Icon name="print" className="h-5 w-5" /> Imprimir com gabarito
              </a>
            </div>
          </section>
        )}

        {phase === 'running' && q && (
          <section aria-labelledby="questao-atual" data-testid="quiz-running">
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-sm">
                <span id="questao-atual" className="font-semibold text-white">
                  Questão {index + 1} de {quiz.questions.length}
                </span>
                <span>{Object.keys(answers).length} respondidas</span>
              </div>
              <ProgressBar value={(index + (answered ? 1 : 0)) / quiz.questions.length} label="Progresso no desafio" />
            </div>
            <CheckQuestion key={q.id} q={q} index={index} selected={answers[q.id]} onAnswer={(o) => setAnswers((a) => ({ ...a, [q.id]: o }))} />
            <div className="mt-4 flex justify-end">
              {index < quiz.questions.length - 1 ? (
                <button type="button" className="btn btn-primary" disabled={!answered} onClick={() => setIndex((i) => i + 1)} data-testid="proxima-questao">
                  Próxima questão <Icon name="chevronRight" className="h-5 w-5" />
                </button>
              ) : (
                <button type="button" className="btn btn-brand" disabled={!answered} onClick={finish} data-testid="ver-resultado">
                  Ver resultado <Icon name="trophy" className="h-5 w-5" />
                </button>
              )}
            </div>
          </section>
        )}

        {phase === 'done' && result && (
          <section aria-labelledby="resultado" className="space-y-6" data-testid="quiz-result">
            <div className="card-surface p-6 text-center">
              <h2 id="resultado" className="text-sm font-bold uppercase tracking-[0.18em] text-mute">Resultado</h2>
              <div className="mt-2 font-display text-6xl font-extrabold text-white" data-testid="percentual">
                {result.percent}%
              </div>
              <div className="mt-1 text-lg" data-testid="pontuacao">
                {result.correct} de {result.total} acertos · <span className="font-semibold text-white">{performanceLabel(result.percent)}</span>
              </div>
            </div>

            {result.reviewEpisodes.length > 0 ? (
              <div className="card-surface p-6">
                <h3 className="text-lg font-bold">Conteúdos que merecem revisão</h3>
                <p className="mt-1 text-sm text-mute">Ordenados pelo número de erros relacionados.</p>
                <ul className="mt-3 space-y-2">
                  {result.reviewEpisodes.map((r) => {
                    const e = getEpisode(r.episodeId);
                    return e ? (
                      <li key={r.episodeId}>
                        <a href={href.episode(e.id)} className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 hover:bg-white/5" data-review-link={e.id}>
                          <span>
                            <span className="font-semibold text-white">Ep. {e.number} — {e.title}</span>
                          </span>
                          <span className="chip shrink-0">{r.misses} {r.misses === 1 ? 'erro' : 'erros'}</span>
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
                {result.reviewTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-mute">Temas:</span>
                    {result.reviewTags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="card-surface p-6">
                <h3 className="text-lg font-bold">Nenhum erro — excelente!</h3>
                <p className="mt-1">Experimente o caso clínico da série para aplicar o raciocínio em uma situação completa.</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-brand" onClick={start} data-testid="refazer-quiz">
                <Icon name="reset" className="h-5 w-5" /> Refazer o desafio
              </button>
              <a className="btn btn-ghost" href={href.printResult(quiz.id)}>
                <Icon name="print" className="h-5 w-5" /> Imprimir resultado
              </a>
              <a className="btn btn-ghost" href={href.series(s.id)}>
                Voltar à série
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Revisão das respostas</h3>
              {quiz.questions.map((qq, i) => {
                const a = result.answers.find((x) => x.questionId === qq.id)!;
                return (
                  <details key={qq.id} className="card-surface p-4">
                    <summary className="cursor-pointer font-semibold text-white">
                      <span className={a.correct ? 'text-ok' : 'text-bad'}>{a.correct ? '✓' : '✗'}</span> Questão {i + 1}: {qq.prompt}
                    </summary>
                    <AnswerFeedback q={qq} selected={a.optionId} />
                  </details>
                );
              })}
            </div>
          </section>
        )}

        <div className="mt-10">
          <References citations={quiz.citations} />
        </div>
      </div>
    </div>
  );
}
