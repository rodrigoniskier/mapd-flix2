/**
 * Validação estrutural e editorial do conteúdo (dados educacionais).
 * Executa com: node --test tests/unit/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allCases, allEpisodes, allQuizzes, allSeries, availableSeries, comingSoonSeries, episodesOf, neighbors } from '../../src/data/catalog.ts';
import { referenceById } from '../../src/data/references.ts';
import { videos } from '../../src/data/videos.ts';
import type { ContentBlock } from '../../src/domain/types.ts';

const illustrationSource = fs.readFileSync(new URL('../../src/illustrations/mechanisms.tsx', import.meta.url), 'utf8');
const illustrationIds = new Set([...illustrationSource.matchAll(/^\s+'([a-z0-9-]+)': [A-Za-z0-9]+,$/gm)].map((m) => m[1]));

test('catálogo: 3 séries disponíveis e 2 em breve', () => {
  assert.equal(availableSeries().length, 3);
  assert.deepEqual(availableSeries().map((s) => s.id), ['autoimunidade', 'imunodeficiencias', 'hipersensibilidades']);
  assert.equal(comingSoonSeries().length, 2);
  for (const s of comingSoonSeries()) {
    assert.equal(s.seasons.length, 0, `${s.id} não deve ter episódios fictícios`);
    assert.equal(s.caseId, undefined);
    assert.equal(s.quizId, undefined);
  }
});

test('19 episódios conceituais na distribuição prevista (6 + 6 + 7)', () => {
  assert.equal(allEpisodes.length, 19);
  assert.equal(episodesOf('autoimunidade').length, 6);
  assert.equal(episodesOf('imunodeficiencias').length, 6);
  assert.equal(episodesOf('hipersensibilidades').length, 7);
  const ids = new Set(allEpisodes.map((e) => e.id));
  assert.equal(ids.size, 19, 'ids únicos');
  for (const s of availableSeries()) {
    const eps = episodesOf(s.id);
    eps.forEach((e, i) => assert.equal(e.number, i + 1, `${e.id} numerado em ordem`));
  }
});

test('cada episódio contém os 9 elementos pedagógicos obrigatórios', () => {
  for (const e of allEpisodes) {
    assert.ok(e.guidingQuestion.endsWith('?'), `${e.id}: pergunta orientadora`);
    assert.ok(e.objectives.length >= 3, `${e.id}: objetivos`);
    assert.ok(e.keyTerms.length >= 3, `${e.id}: conceitos fundamentais`);
    assert.ok(e.sections.some((s) => s.role === 'mecanismos'), `${e.id}: explicação dos mecanismos`);
    const blocks = e.sections.flatMap((s) => s.blocks);
    assert.ok(blocks.some((b) => b.type === 'figure'), `${e.id}: representação visual`);
    assert.ok(e.sections.some((s) => s.role === 'aplicacao'), `${e.id}: aplicação clínica`);
    assert.ok(blocks.some((b) => b.type === 'chain'), `${e.id}: cadeia mecanismo → conduta`);
    assert.ok(e.activity.length >= 1, `${e.id}: atividade interativa`);
    assert.ok(e.synthesis.length >= 3, `${e.id}: síntese`);
    assert.ok(e.citations.length >= 1, `${e.id}: referências`);
    assert.ok(e.citations.some((c) => c.ref === 'barbosa-2026'), `${e.id}: cita a obra-base`);
  }
});

test('cada episódio usa ao menos dois tipos de componente interativo', () => {
  const interactive = new Set<ContentBlock['type']>(['expandable', 'flow', 'timeline', 'compare', 'figure', 'chain']);
  for (const e of allEpisodes) {
    const kinds = new Set(e.sections.flatMap((s) => s.blocks.map((b) => b.type)).filter((t) => interactive.has(t)));
    assert.ok(kinds.size >= 2, `${e.id}: ${[...kinds].join(',')}`);
  }
});

test('ilustrações referenciadas existem', () => {
  assert.ok(illustrationIds.size >= 15, `encontradas ${illustrationIds.size}`);
  const used: string[] = [];
  for (const e of allEpisodes) {
    used.push(e.cover);
    for (const b of e.sections.flatMap((s) => s.blocks)) if (b.type === 'figure') used.push(b.visual.illustration);
  }
  for (const c of allCases) for (const s of c.steps) if (s.visual) used.push(s.visual.illustration);
  for (const id of used) assert.ok(illustrationIds.has(id), `ilustração inexistente: ${id}`);
});

test('figuras têm texto alternativo e hotspots em coordenadas válidas', () => {
  for (const e of allEpisodes) {
    for (const b of e.sections.flatMap((s) => s.blocks)) {
      if (b.type !== 'figure') continue;
      assert.ok(b.visual.alt.length > 30, `${e.id}: alt descritivo`);
      for (const h of b.visual.hotspots ?? []) {
        assert.ok(h.x >= 0 && h.x <= 100 && h.y >= 0 && h.y <= 100, `${e.id}: hotspot ${h.label}`);
      }
    }
  }
});

test('todas as citações apontam para referências registradas', () => {
  const all = [
    ...allEpisodes.flatMap((e) => e.citations),
    ...allSeries.flatMap((s) => s.citations),
    ...allCases.flatMap((c) => c.citations),
    ...allQuizzes.flatMap((q) => q.citations),
  ];
  for (const c of all) assert.ok(referenceById.has(c.ref), `referência desconhecida: ${c.ref}`);
  for (const r of referenceById.values()) {
    if (r.kind === 'complementar') assert.ok(r.doi || r.pmid, `${r.id}: complementar deve ter DOI ou PMID`);
  }
});

test('questões: 4 alternativas, uma correta, feedback para todas', () => {
  const questions = [...allQuizzes.flatMap((q) => q.questions), ...allEpisodes.flatMap((e) => e.activity)];
  const ids = new Set<string>();
  const episodeIds = new Set(allEpisodes.map((e) => e.id));
  for (const q of questions) {
    assert.ok(!ids.has(q.id), `id duplicado ${q.id}`);
    ids.add(q.id);
    assert.equal(q.options.length, 4, `${q.id}: 4 alternativas`);
    assert.equal(q.options.filter((o) => o.id === q.correctOptionId).length, 1, `${q.id}: uma correta`);
    assert.equal(new Set(q.options.map((o) => o.id)).size, 4, `${q.id}: ids de alternativas únicos`);
    for (const o of q.options) assert.ok(o.feedback.length > 10, `${q.id}/${o.id}: feedback`);
    assert.ok(q.explanation.length > 20, `${q.id}: justificativa`);
    assert.ok(q.relatedEpisodes.length > 0, `${q.id}: episódio relacionado`);
    for (const ep of q.relatedEpisodes) assert.ok(episodeIds.has(ep), `${q.id}: episódio ${ep}`);
  }
});

test('quizzes: 3 desafios com ≥ 10 questões, cobrindo vários episódios', () => {
  assert.equal(allQuizzes.length, 3);
  for (const q of allQuizzes) {
    assert.ok(q.questions.length >= 10, `${q.id}: ${q.questions.length}`);
    const eps = new Set(q.questions.flatMap((x) => x.relatedEpisodes));
    assert.ok(eps.size >= 4, `${q.id}: cobre ${eps.size} episódios`);
    // gabarito não concentrado em uma única letra
    const letters = new Set(q.questions.map((x) => x.options.findIndex((o) => o.id === x.correctOptionId)));
    assert.ok(letters.size >= 3, `${q.id}: distribuição do gabarito`);
  }
});

test('casos clínicos: 7 etapas, revelação apenas no final, decisões com qualidades distintas', () => {
  assert.equal(allCases.length, 3);
  for (const c of allCases) {
    assert.equal(c.steps.length, 7, c.id);
    const revealIdx = c.steps.findIndex((s) => s.reveal);
    assert.equal(revealIdx, 6, `${c.id}: elucidação somente na última etapa`);
    const decisions = c.steps.filter((s) => s.decision);
    assert.ok(decisions.length >= 5, `${c.id}: decisões`);
    for (const s of decisions) {
      const qs = s.decision!.options.map((o) => o.quality);
      assert.equal(qs.filter((q) => q === 'prioritaria').length, 1, `${c.id}/${s.id}: uma prioritária`);
      assert.ok(qs.includes('inadequada'), `${c.id}/${s.id}: há opção inadequada`);
    }
  }
});

test('casos: título e gancho não revelam o diagnóstico', () => {
  const forbidden: Record<string, RegExp> = {
    'caso-a': /l[úu]pus|LES\b/i,
    'caso-b': /SCID|imunodefici[êe]ncia combinada|IL2RG/i,
    'caso-c': /anafilaxia/i,
  };
  for (const c of allCases) {
    const text = [c.title, c.hook, ...c.steps.slice(0, 1).flatMap((s) => [s.title, ...s.narrative])].join(' ');
    assert.ok(!forbidden[c.id].test(text), `${c.id} revela o diagnóstico cedo`);
  }
});

test('caso C: adrenalina IM é a decisão prioritária na intervenção imediata', () => {
  const c = allCases.find((x) => x.id === 'caso-c')!;
  const step = c.steps.find((s) => s.id === 'c3')!;
  const best = step.decision!.options.find((o) => o.quality === 'prioritaria')!;
  assert.match(best.text, /adrenalina/i);
  assert.match(best.text, /IM/);
});

test('vídeos: um por série, ≤ 180 s, verificados e vinculados a episódios existentes', () => {
  assert.equal(videos.length, 3);
  const episodeIds = new Set(allEpisodes.map((e) => e.id));
  for (const v of videos) {
    assert.ok(v.durationSeconds <= 180, v.id);
    assert.match(v.youtubeId, /^[\w-]{11}$/);
    assert.equal(v.url, `https://www.youtube.com/watch?v=${v.youtubeId}`);
    assert.ok(v.verifiedAt);
    for (const e of v.episodeIds) assert.ok(episodeIds.has(e), `${v.id}: ${e}`);
  }
  for (const s of availableSeries()) assert.ok(videos.some((v) => v.id === s.videoId), `${s.id} sem vídeo`);
});

test('navegação anterior/próximo dentro da série', () => {
  assert.equal(neighbors('auto-e1-autotolerancia').prev, undefined);
  assert.equal(neighbors('auto-e1-autotolerancia').next?.id, 'auto-e2-origem');
  assert.equal(neighbors('hiper-e7-tratamento').next, undefined);
  assert.equal(neighbors('hiper-e7-tratamento').prev?.id, 'hiper-e6-diagnostico');
});
