import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRENT_VERSION,
  STORAGE_KEY,
  completion,
  emptyProgress,
  load,
  migrate,
  recordQuizResult,
  save,
  setEpisodeCompleted,
  touchRecent,
  updateCase,
} from '../../src/lib/progress.ts';
import type { KeyValueStore } from '../../src/lib/progress.ts';
import { scoreQuiz, performanceLabel } from '../../src/lib/quiz.ts';
import { buildIndex, normalize, search } from '../../src/lib/search.ts';
import { parseHash, href } from '../../src/lib/router.ts';
import { allCases, allEpisodes, allQuizzes, allSeries, getQuiz } from '../../src/data/catalog.ts';

class Mem implements KeyValueStore {
  m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}

/* ---------------- progresso ---------------- */

test('progresso: salvar e carregar preserva o estado', () => {
  const store = new Mem();
  let s = emptyProgress();
  s = setEpisodeCompleted(s, 'auto-e1-autotolerancia', true, '2026-01-01T00:00:00.000Z');
  s = touchRecent(s, 'episode', 'auto-e1-autotolerancia');
  save(store, s);
  const back = load(store);
  assert.deepEqual(back, s);
  assert.equal(JSON.parse(store.getItem(STORAGE_KEY)!).version, CURRENT_VERSION);
});

test('progresso: migração da versão 1', () => {
  const v1 = { version: 1, completed: ['auto-e1-autotolerancia', 'idef-e1-fundamentos'], quizScores: { 'quiz-autoimunidade': 70 } };
  const s = migrate(v1);
  assert.equal(s.version, CURRENT_VERSION);
  assert.ok(s.episodes['auto-e1-autotolerancia']);
  assert.ok(s.episodes['idef-e1-fundamentos']);
  assert.equal(s.quizzes['quiz-autoimunidade'].best, 70);
});

test('progresso: dados corrompidos ou desconhecidos resultam em estado vazio', () => {
  const store = new Mem();
  store.setItem(STORAGE_KEY, '{não é json');
  assert.deepEqual(load(store), emptyProgress());
  assert.deepEqual(migrate({ version: 99 }), emptyProgress());
  assert.deepEqual(migrate(null), emptyProgress());
});

test('progresso: armazenamento que lança exceção não quebra', () => {
  const broken: KeyValueStore = {
    getItem() {
      throw new Error('bloqueado');
    },
    setItem() {
      throw new Error('cheio');
    },
  };
  assert.deepEqual(load(broken), emptyProgress());
  assert.doesNotThrow(() => save(broken, emptyProgress()));
});

test('progresso: recentes sem duplicatas e limitados', () => {
  let s = emptyProgress();
  for (let i = 0; i < 20; i++) s = touchRecent(s, 'episode', `e${i % 15}`);
  assert.equal(s.recent.length, 12);
  assert.equal(new Set(s.recent.map((r) => r.id)).size, 12);
  assert.equal(s.recent[0].id, 'e4');
});

test('progresso: conclusão, desmarcação e percentual', () => {
  let s = emptyProgress();
  s = setEpisodeCompleted(s, 'a', true);
  s = setEpisodeCompleted(s, 'b', true);
  assert.equal(completion(s, ['a', 'b', 'c', 'd']), 0.5);
  s = setEpisodeCompleted(s, 'a', false);
  assert.equal(completion(s, ['a', 'b', 'c', 'd']), 0.25);
  assert.equal(completion(s, []), 0);
});

test('progresso: casos mesclam decisões', () => {
  let s = emptyProgress();
  s = updateCase(s, 'caso-a', { step: 1, decisions: { a1: 'a1o1' } });
  s = updateCase(s, 'caso-a', { step: 2, decisions: { a2: 'a2o2' } });
  assert.deepEqual(s.cases['caso-a'].decisions, { a1: 'a1o1', a2: 'a2o2' });
  assert.equal(s.cases['caso-a'].step, 2);
});

/* ---------------- quiz ---------------- */

test('quiz: pontuação perfeita', () => {
  for (const quiz of allQuizzes) {
    const answers = Object.fromEntries(quiz.questions.map((q) => [q.id, q.correctOptionId]));
    const r = scoreQuiz(quiz, answers);
    assert.equal(r.correct, quiz.questions.length);
    assert.equal(r.percent, 100);
    assert.equal(r.reviewEpisodes.length, 0);
  }
});

test('quiz: pontuação parcial, percentual arredondado e revisão ordenada', () => {
  const quiz = getQuiz('quiz-autoimunidade')!;
  const answers: Record<string, string> = {};
  quiz.questions.forEach((q, i) => {
    answers[q.id] = i < 7 ? q.correctOptionId : q.options.find((o) => o.id !== q.correctOptionId)!.id;
  });
  const r = scoreQuiz(quiz, answers);
  assert.equal(r.total, 12);
  assert.equal(r.correct, 7);
  assert.equal(r.percent, 58); // 7/12 = 58,33%
  const missed = quiz.questions.slice(7);
  const expected = new Set(missed.flatMap((q) => q.relatedEpisodes));
  assert.deepEqual(new Set(r.reviewEpisodes.map((x) => x.episodeId)), expected);
  for (let i = 1; i < r.reviewEpisodes.length; i++) assert.ok(r.reviewEpisodes[i - 1].misses >= r.reviewEpisodes[i].misses);
});

test('quiz: questões não respondidas contam como erro', () => {
  const quiz = getQuiz('quiz-imunodeficiencias')!;
  const r = scoreQuiz(quiz, {});
  assert.equal(r.correct, 0);
  assert.equal(r.percent, 0);
});

test('quiz: rótulos de desempenho', () => {
  assert.equal(performanceLabel(95), 'Excelente domínio');
  assert.equal(performanceLabel(70), 'Bom desempenho');
  assert.equal(performanceLabel(50), 'Em consolidação');
  assert.equal(performanceLabel(10), 'Revisão recomendada');
});

test('progresso: melhor resultado do quiz', () => {
  const quiz = getQuiz('quiz-hipersensibilidades')!;
  let s = emptyProgress();
  s = recordQuizResult(s, scoreQuiz(quiz, {}));
  s = recordQuizResult(s, scoreQuiz(quiz, Object.fromEntries(quiz.questions.map((q) => [q.id, q.correctOptionId]))));
  s = recordQuizResult(s, scoreQuiz(quiz, {}));
  assert.equal(s.quizzes[quiz.id].best, 100);
  assert.equal(s.quizzes[quiz.id].attempts.length, 3);
});

/* ---------------- busca ---------------- */

const index = buildIndex(allSeries, allEpisodes, allCases, allQuizzes);

test('busca: normalização ignora acentos e caixa', () => {
  assert.equal(normalize('  Imunodeficiência   Combinada '), 'imunodeficiencia combinada');
});

test('busca: encontra conceitos e episódios', () => {
  const r = search(index, 'triptase');
  assert.ok(r.some((d) => d.kind === 'episode' && d.id === 'hiper-e6-diagnostico'));
  const fan = search(index, 'fan');
  assert.ok(fan.some((d) => d.id === 'auto-e5-investigacao'));
  const semAcento = search(index, 'imunodeficiencias');
  assert.ok(semAcento.some((d) => d.kind === 'series' && d.id === 'imunodeficiencias'));
  assert.equal(search(index, 'a').length, 0);
});

test('busca: não indexa séries em breve nem revela diagnósticos de casos', () => {
  assert.ok(!index.some((d) => d.id === 'imunidade-antitumoral'));
  const casoB = index.find((d) => d.id === 'caso-b')!;
  assert.ok(!casoB.haystack.includes('il2rg'));
  assert.ok(!search(index, 'IL2RG').some((d) => d.kind === 'case'));
});

/* ---------------- rotas ---------------- */

test('rotas: parse e geração são consistentes', () => {
  assert.deepEqual(parseHash(''), { name: 'home' });
  assert.deepEqual(parseHash(href.series('autoimunidade')), { name: 'series', id: 'autoimunidade' });
  assert.deepEqual(parseHash(href.episode('auto-e1-autotolerancia')), { name: 'episode', id: 'auto-e1-autotolerancia' });
  assert.deepEqual(parseHash(href.search('IgE total')), { name: 'search', q: 'IgE total' });
  assert.deepEqual(parseHash(href.printQuiz('quiz-autoimunidade', true)), { name: 'print-quiz', id: 'quiz-autoimunidade', answers: true });
  assert.deepEqual(parseHash(href.printSeries('autoimunidade', 'completo')), { name: 'print-series', id: 'autoimunidade', mode: 'completo' });
  assert.equal(parseHash('#/qualquer/coisa').name, 'not-found');
});
