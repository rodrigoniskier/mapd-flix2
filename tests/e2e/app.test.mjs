/**
 * Testes de navegação (E2E) com Playwright sobre o build de produção (dist/).
 * Executar: npm run test:e2e
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serve } from '../../scripts/serve.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(root, 'test-results');
fs.mkdirSync(OUT, { recursive: true });

let server;
let browser;
let base;

/** Erros externos esperados em ambiente sem rede (fontes web, YouTube) não contam. */
const EXTERNAL = /fonts\.(googleapis|gstatic)|youtube|ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|net::ERR_/i;

async function open(route, { width = 1366, height = 900, profile = 'estudante' } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  if (profile) {
    // Entra direto no perfil (a abertura e a escolha de perfil têm testes próprios).
    await page.addInitScript((p) => {
      sessionStorage.setItem('mapdflix:active-profile', p);
      sessionStorage.setItem('mapdflix:intro-seen', '1');
    }, profile);
  }
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !EXTERNAL.test(m.text())) errors.push(`console: ${m.text()}`);
  });
  page.on('requestfailed', (r) => {
    if (!EXTERNAL.test(r.url())) errors.push(`requestfailed: ${r.url()}`);
  });
  await page.goto(`${base}/${route}`);
  await page.waitForSelector('#root > *');
  return { page, errors };
}

const go = async (page, hash) => {
  await page.evaluate((h) => (location.hash = h), hash);
  await page.waitForTimeout(80);
};

before(async () => {
  server = await serve(path.join(root, 'dist'), 0);
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

/* ------------------------------------------------------------------ */

test('página inicial carrega com destaque, carrosséis, desafios e "Em breve"', async () => {
  const { page, errors } = await open('#/');
  assert.equal(await page.locator('h1').count(), 1);
  assert.match(await page.locator('h1').innerText(), /Autoimunidade/);
  for (const id of ['series', 'desafios', 'casos', 'em-breve', 'trilho-autoimunidade', 'trilho-imunodeficiencias', 'trilho-hipersensibilidades']) {
    assert.equal(await page.locator(`#${id}`).count(), 1, `seção ${id}`);
  }
  assert.equal(await page.locator('[data-series-card]').count(), 3);
  assert.equal(await page.locator('[data-quiz-card]').count(), 3);
  assert.equal(await page.locator('[data-coming-soon]').count(), 2);
  assert.equal(await page.locator('[data-coming-soon] a').count(), 0, 'séries em breve não são links');
  assert.equal(await page.locator('[data-episode-card]').count(), 19);
  await page.getByTestId('explorar-serie').click();
  await page.waitForURL(/#\/serie\/autoimunidade/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('séries disponíveis abrem; séries "em breve" não navegam para páginas vazias', async () => {
  const { page, errors } = await open('#/');
  for (const id of ['autoimunidade', 'imunodeficiencias', 'hipersensibilidades']) {
    await go(page, `#/serie/${id}`);
    const modal = page.getByTestId('series-modal');
    await modal.waitFor();
    assert.ok((await modal.locator('[data-episode-row]').count()) >= 6, id);
    assert.ok(await modal.locator('text=Objetivos de aprendizagem').count());
    assert.ok(await modal.locator('[data-case-card]').count(), `${id}: caso`);
    assert.ok(await modal.locator('[data-quiz-card]').count(), `${id}: quiz`);
    // fecha com Esc e volta ao catálogo
    await page.keyboard.press('Escape');
    await page.getByTestId('series-modal').waitFor({ state: 'detached' });
    assert.match(page.url(), /#\/$/);
  }
  for (const id of ['imunidade-antitumoral', 'imunidade-transplantes']) {
    await go(page, `#/serie/${id}`);
    assert.equal(await page.getByTestId('not-found').count(), 1, id);
    assert.match(await page.locator('h1').innerText(), /em breve/i);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('os 19 episódios abrem com todas as seções e figuras renderizadas', async () => {
  const { page, errors } = await open('#/');
  const ids = await page.locator('[data-episode-card]').evaluateAll((els) => els.map((e) => e.getAttribute('data-episode-card')));
  assert.equal(ids.length, 19);
  for (const id of ids) {
    await go(page, `#/episodio/${id}`);
    for (const sec of ['pergunta', 'objetivos', 'conceitos', 'atividade', 'sintese', 'referencias']) {
      assert.equal(await page.locator(`#${sec}`).count(), 1, `${id}: #${sec}`);
    }
    const figs = await page.locator('figure[data-component=figure]').count();
    assert.ok(figs >= 1, `${id}: figura`);
    const svgs = page.locator('figure[data-component=figure] svg[data-illustration]');
    assert.equal(await svgs.count(), figs, `${id}: todas as figuras têm SVG`);
    for (const svg of await svgs.all()) {
      const box = await svg.boundingBox();
      assert.ok(box && box.width > 100 && box.height > 50, `${id}: SVG com dimensão`);
      assert.ok((await svg.getAttribute('aria-label'))?.length > 20, `${id}: aria-label`);
    }
    assert.ok(await page.locator('[data-component=chain]').count(), `${id}: cadeia causal`);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('componentes interativos: fluxo, expansíveis, hotspots, cadeia, comparador e atividade', async () => {
  const { page, errors } = await open('#/episodio/auto-e1-autotolerancia');
  // fluxo progressivo
  const flow = page.locator('[data-component=flow]').first();
  const before = await flow.locator('ol > li').count();
  await flow.getByRole('button', { name: /Revelar próxima etapa/ }).click();
  assert.equal(await flow.locator('ol > li').count(), before + 1);
  await flow.getByRole('button', { name: 'Mostrar todas' }).click();
  assert.equal(await flow.locator('ol > li').count(), 6);
  // expansíveis
  const exp = page.locator('[data-component=expandable]').first();
  const btn = exp.locator('button[aria-expanded]').first();
  assert.equal(await btn.getAttribute('aria-expanded'), 'false');
  await btn.click();
  assert.equal(await btn.getAttribute('aria-expanded'), 'true');
  // hotspots
  const fig = page.locator('figure[data-component=figure]').first();
  await fig.getByRole('button', { name: /Ponto 2/ }).click();
  assert.match(await fig.locator('[aria-live]').innerText(), /AIRE/);
  // cadeia
  const chain = page.locator('[data-component=chain]').first();
  assert.equal(await chain.locator('ol > li').count(), 1);
  await chain.getByRole('button', { name: /Próximo elo/ }).click();
  assert.equal(await chain.locator('ol > li').count(), 2);
  await chain.getByRole('button', { name: /cadeia completa/ }).click();
  assert.equal(await chain.locator('ol > li').count(), 6);
  // atividade com feedback
  const q = page.locator('#atividade [data-component=question]').first();
  await q.getByRole('radio').nth(1).click();
  assert.equal(await q.locator('[data-feedback=correct]').count(), 1);
  await page.locator('#atividade [data-component=question]').nth(1).getByRole('radio').first().click();
  assert.equal(await page.locator('#atividade [data-feedback=incorrect]').count(), 1);
  // comparador (episódio com 3+ colunas)
  await go(page, '#/episodio/hiper-e1-fundamentos');
  const cmp = page.locator('[data-component=compare]').first();
  const colBtn = cmp.getByRole('button', { name: 'Tipo III' });
  await colBtn.click();
  assert.equal(await colBtn.getAttribute('aria-pressed'), 'true');
  assert.deepEqual(errors, []);
  await page.close();
});

test('progresso persiste localmente após recarregar', async () => {
  const { page, errors } = await open('#/episodio/idef-e1-fundamentos');
  await page.getByTestId('marcar-concluido').first().click();
  assert.match(await page.getByTestId('marcar-concluido').first().innerText(), /Concluído/);
  await page.reload();
  await page.waitForSelector('#root > *');
  assert.match(await page.getByTestId('marcar-concluido').first().innerText(), /Concluído/);
  const stored = await page.evaluate(() => localStorage.getItem('mapdflix:progress'));
  const storedKey = 'mapdflix:progress:estudante';
  assert.equal(stored, null, 'progresso fica na chave do perfil');
  const perProfile = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)), storedKey);
  assert.equal(perProfile.version, 3);
  assert.ok(perProfile.episodes['idef-e1-fundamentos']);
  await go(page, '#/serie/imunodeficiencias');
  assert.match(await page.getByTestId('series-modal').innerText(), /1\/6 concluídos/);
  // leitura parcial alimenta “Continuar estudando” com barra de progresso
  await go(page, '#/episodio/idef-e2-primarias');
  await page.evaluate(() => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * 0.5));
  await page.waitForTimeout(700);
  await go(page, '#/');
  assert.equal(await page.locator('#recentes [data-episode-card="idef-e2-primarias"]').count(), 1, 'continuar estudando');
  // migração de versão antiga
  await page.evaluate(() => localStorage.setItem('mapdflix:progress:estudante', JSON.stringify({ version: 1, completed: ['hiper-e2-tipo1'] })));
  await page.reload();
  await page.waitForSelector('#root > *');
  await go(page, '#/episodio/hiper-e2-tipo1');
  assert.match(await page.getByTestId('marcar-concluido').first().innerText(), /Concluído/);
  assert.deepEqual(errors, []);
  await page.close();
});

async function runQuiz(page, quizId, pickCorrect) {
  await go(page, `#/quiz/${quizId}`);
  await page.getByTestId('iniciar-quiz').click();
  let n = 0;
  for (;;) {
    const q = page.locator('[data-component=question]');
    await q.waitFor();
    const radios = q.getByRole('radio');
    // descobre a correta respondendo e lendo o feedback (sem acessar dados internos)
    const choice = pickCorrect(n);
    await radios.nth(choice).click();
    n++;
    if (await page.getByTestId('proxima-questao').count()) await page.getByTestId('proxima-questao').click();
    else {
      await page.getByTestId('ver-resultado').click();
      break;
    }
  }
  return n;
}

test('três quizzes completos: pontuação, percentual, revisão e refazer', async () => {
  const { page, errors } = await open('#/');
  // gabarito lido da versão impressa com gabarito (fluxo público da aplicação)
  for (const quizId of ['quiz-autoimunidade', 'quiz-imunodeficiencias', 'quiz-hipersensibilidades']) {
    await go(page, `#/imprimir/quiz/${quizId}?gabarito=1`);
    const key = await page.locator('[data-print-question]').evaluateAll((els) =>
      els.map((el) => 'ABCD'.indexOf(el.innerText.match(/Resposta: ([A-D])/)[1])),
    );
    assert.ok(key.length >= 10, `${quizId}: ${key.length} questões`);

    // 100%
    const total = await runQuiz(page, quizId, (i) => key[i]);
    assert.equal(total, key.length);
    assert.equal(await page.getByTestId('percentual').innerText(), '100%');
    assert.match(await page.getByTestId('pontuacao').innerText(), new RegExp(`${total} de ${total}`));

    // refazer errando as 3 primeiras
    await page.getByTestId('refazer-quiz').click();
    await page.getByTestId('quiz-running').waitFor();
    let n = 0;
    for (;;) {
      const radios = page.locator('[data-component=question]').getByRole('radio');
      await radios.nth(n < 3 ? (key[n] + 1) % 4 : key[n]).click();
      // feedback imediato visível
      assert.equal(await page.locator('[data-feedback]').count(), 1);
      n++;
      if (await page.getByTestId('proxima-questao').count()) await page.getByTestId('proxima-questao').click();
      else {
        await page.getByTestId('ver-resultado').click();
        break;
      }
    }
    const expected = Math.round(((total - 3) / total) * 100);
    assert.equal(await page.getByTestId('percentual').innerText(), `${expected}%`);
    const reviewLinks = page.locator('[data-review-link]');
    assert.ok((await reviewLinks.count()) >= 1, 'links de revisão');
    const target = await reviewLinks.first().getAttribute('data-review-link');
    await reviewLinks.first().click();
    await page.waitForURL(new RegExp(`#/episodio/${target}`));
    // impressão do resultado
    await go(page, `#/imprimir/resultado/${quizId}`);
    assert.match(await page.getByTestId('print-doc').innerText(), new RegExp(`${total - 3} de ${total} acertos`));
  }
  assert.deepEqual(errors, []);
  await page.close();
});

async function solveCase(page, caseId) {
  await go(page, `#/caso/${caseId}`);
  for (let step = 0; step < 7; step++) {
    const current = page.locator('[data-case-step]').nth(step);
    await current.waitFor();
    const advance = page.getByTestId('avancar-etapa');
    const decisions = current.locator('fieldset button');
    if (await decisions.count()) {
      if (await advance.count()) assert.equal(await advance.isDisabled(), true, `${caseId}: avanço bloqueado antes da decisão`);
      // escolhe uma opção inadequada primeiro nas etapas pares para verificar a consequência
      await decisions.first().click();
      assert.ok((await current.locator('[data-quality]').count()) === (await decisions.count()), 'todas as opções analisadas');
    }
    if (step < 6) await advance.click();
  }
  return page.locator('[data-case-step]').last().innerText();
}

test('três casos clínicos: revelação progressiva, decisões e elucidação final', async () => {
  const { page, errors } = await open('#/');
  const expected = { 'caso-a': /Lúpus eritematoso sistêmico/, 'caso-b': /SCID/, 'caso-c': /Anafilaxia grave/ };
  for (const [id, re] of Object.entries(expected)) {
    await go(page, `#/caso/${id}`);
    assert.equal(await page.locator('[data-case-step]').count(), 1, `${id}: só a 1ª etapa visível`);
    assert.doesNotMatch(await page.locator('main').innerText(), re, `${id}: diagnóstico oculto no início`);
    const last = await solveCase(page, id);
    assert.match(last, re, `${id}: elucidação`);
    assert.equal(await page.locator('[data-case-step]').count(), 7);
    assert.equal(await page.getByTestId('reiniciar-caso').count(), 1);
  }
  // o estado do caso persiste
  await page.reload();
  await page.waitForSelector('#root > *');
  await go(page, '#/caso/caso-c');
  assert.equal(await page.locator('[data-case-step]').count(), 7);
  assert.deepEqual(errors, []);
  await page.close();
});

test('vídeos: carregamento sob demanda do player oficial e link alternativo', async () => {
  const { page, errors } = await open('#/serie/hipersensibilidades');
  const card = page.locator('[data-component=video]');
  assert.equal(await card.count(), 1);
  assert.equal(await card.locator('iframe').count(), 0, 'nada é carregado antes do clique');
  assert.equal(await card.locator('a[href^="https://www.youtube.com/watch?v="]').count(), 1);
  await card.getByRole('button', { name: /Carregar vídeo/ }).click();
  const src = await card.locator('iframe').getAttribute('src');
  assert.match(src, /^https:\/\/www\.youtube-nocookie\.com\/embed\/6N285p5W0-k/);
  for (const ep of ['auto-e1-autotolerancia', 'idef-e4-manifestacoes', 'hiper-e7-tratamento']) {
    await go(page, `#/episodio/${ep}`);
    assert.equal(await page.locator('#video [data-component=video]').count(), 1, ep);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('impressão: layout branco, sem navegação, A4 e PDF gerado', async () => {
  const { page, errors } = await open('#/imprimir/episodio/auto-e5-investigacao');
  assert.equal(await page.locator('header[data-site-header]').count(), 0);
  await page.emulateMedia({ media: 'print' });
  const bg = await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid=print-doc]')).backgroundColor);
  assert.equal(bg, 'rgb(255, 255, 255)');
  assert.equal(await page.locator('[data-no-print]').isVisible(), false, 'barra de ferramentas oculta na impressão');
  // componentes abertos na impressão
  assert.equal(await page.locator('[data-component=expandable] button').count(), 0);
  assert.ok(await page.locator('figure svg[data-illustration]').count());
  const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
  fs.writeFileSync(path.join(OUT, 'episodio-auto-e5.pdf'), pdf);
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  assert.ok(pages >= 3, `PDF com ${pages} páginas`);

  for (const route of ['#/imprimir/serie/autoimunidade/resumo', '#/imprimir/serie/hipersensibilidades/completo', '#/imprimir/quiz/quiz-imunodeficiencias', '#/imprimir/quiz/quiz-imunodeficiencias?gabarito=1']) {
    await page.emulateMedia({ media: 'screen' });
    await go(page, route);
    await page.getByTestId('print-doc').waitFor();
    const text = await page.getByTestId('print-doc').innerText();
    assert.ok(text.length > 1500, route);
    if (route.endsWith('quiz-imunodeficiencias')) assert.doesNotMatch(text, /Resposta: [A-D]/);
    if (route.includes('gabarito=1')) assert.match(text, /Resposta: [A-D]/);
    if (route.includes('completo')) assert.equal(await page.locator('.page-break').count(), 7);
    const out = await page.pdf({ format: 'A4' });
    fs.writeFileSync(path.join(OUT, route.replace(/[^a-z0-9]+/gi, '_') + '.pdf'), out);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('responsividade: sem rolagem horizontal em smartphone, tablet e desktop', async () => {
  const routes = ['#/', '#/serie/autoimunidade', '#/episodio/hiper-e3-tipo2', '#/caso/caso-b', '#/quiz/quiz-autoimunidade', '#/busca?q=IgE', '#/sobre', '#/minha-lista', '#/navegar/series'];
  for (const [w, h] of [[375, 812], [768, 1024], [1440, 900]]) {
    const { page, errors } = await open('#/', { width: w, height: h });
    for (const r of routes) {
      await go(page, r);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(overflow <= 1, `${r} @${w}px: overflow ${overflow}px`);
    }
    await go(page, '#/');
    await page.screenshot({ path: path.join(OUT, `home-${w}.png`) });
    assert.deepEqual(errors, []);
    await page.close();
  }
});

test('acessibilidade básica: títulos, nomes acessíveis, foco visível e redução de movimento', async () => {
  const { page, errors } = await open('#/');
  const routes = ['#/', '#/serie/imunodeficiencias', '#/episodio/auto-e3-lesao', '#/caso/caso-a', '#/quiz/quiz-hipersensibilidades', '#/sobre'];
  for (const r of routes) {
    await go(page, r);
    assert.equal(await page.locator('h1').count(), 1, `${r}: um h1`);
    const unnamed = await page.$$eval('button, a[href]', (els) =>
      els.filter((e) => !(e.getAttribute('aria-label') || e.textContent.trim() || e.getAttribute('title'))).map((e) => e.outerHTML.slice(0, 80)),
    );
    assert.deepEqual(unnamed, [], `${r}: controles sem nome`);
    const imgs = await page.$$eval('svg[role=img]', (els) => els.filter((e) => !e.getAttribute('aria-label')).length);
    assert.equal(imgs, 0, `${r}: imagens sem texto alternativo`);
    assert.equal(await page.locator('html[lang="pt-BR"]').count(), 1);
  }
  // teclado: no carregamento, o primeiro Tab foca o link "Pular para o conteúdo"
  await page.reload();
  await page.waitForSelector('#root > *');
  await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement.textContent), /Pular para o conteúdo/);
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(outline, 'none');
  // redução de movimento
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, '#/');
  const dur = await page.evaluate(() => getComputedStyle(document.querySelector('.btn')).transitionDuration);
  assert.ok(parseFloat(dur) < 0.01, `transição ${dur}`);
  assert.deepEqual(errors, []);
  await page.close();
});

test('links internos: nenhum link quebrado em todo o catálogo', async () => {
  const { page, errors } = await open('#/');
  const seen = new Set();
  const queue = ['#/'];
  let broken = [];
  while (queue.length) {
    const h = queue.shift();
    if (seen.has(h)) continue;
    seen.add(h);
    await go(page, h);
    if (await page.getByTestId('not-found').count()) broken.push(h);
    const links = await page.$$eval('a[href^="#/"]', (els) => els.map((a) => a.getAttribute('href')));
    for (const l of links) if (!seen.has(l) && !l.startsWith('#/imprimir/resultado')) queue.push(l);
  }
  assert.ok(seen.size > 40, `visitadas ${seen.size} rotas`);
  assert.deepEqual(broken, []);
  fs.writeFileSync(path.join(OUT, 'rotas-visitadas.txt'), [...seen].sort().join('\n'));
  assert.deepEqual(errors, []);
  await page.close();
});

test('busca por temas e conceitos', async () => {
  const { page, errors } = await open('#/busca?q=triptase');
  assert.match(await page.getByTestId('search-count').innerText(), /[1-9]\d* resultado/);
  assert.ok(await page.locator('[data-search-result=episode]').count());
  await page.locator('#busca-pagina').fill('imunodeficiencia combinada');
  await page.locator('#busca-pagina').press('Enter');
  await page.waitForURL(/busca\?q=imunodeficiencia/);
  assert.ok(await page.locator('[data-search-result]').count());
  await page.locator('[data-search-result]').first().click();
  assert.equal(await page.getByTestId('not-found').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test('perfis: “Quem está estudando?”, abertura animada e perfil do professor', async () => {
  const { page, errors } = await open('#/', { profile: null });
  await page.getByTestId('profile-gate').waitFor();
  assert.match(await page.locator('h1').innerText(), /Quem está estudando\?/);
  const prof = page.locator('[data-profile=professor] img');
  assert.equal(await prof.count(), 1, 'foto do professor');
  assert.ok(await prof.evaluate((img) => img.complete && img.naturalWidth > 0), 'foto carregada');
  // novo perfil de estudante
  await page.getByRole('button', { name: 'Adicionar perfil' }).click();
  await page.locator('#nome-perfil').fill('Ana');
  await page.getByRole('button', { name: 'Continuar' }).click();
  assert.equal(await page.locator('[data-profile=ana]').count(), 1);
  // entrar como professor → abertura → catálogo
  await page.locator('[data-profile=professor]').click();
  await page.getByTestId('intro').waitFor();
  await page.waitForTimeout(3600);
  assert.equal(await page.getByTestId('intro').count(), 0, 'abertura termina sozinha');
  assert.equal(await page.locator('#top10').count(), 1);
  // a abertura não se repete na mesma sessão
  await page.reload();
  await page.waitForSelector('#root > *');
  assert.equal(await page.getByTestId('intro').count(), 0);
  // dados do professor
  await page.getByTestId('menu-perfil').click();
  await page.getByTestId('abrir-professor').click();
  const modal = page.getByTestId('professor-modal');
  const txt = await modal.innerText();
  assert.match(txt, /Prof\. Rodrigo Niskier Ferreira Barbosa/);
  assert.match(txt, /rodrigo\.niskier@unipe\.edu\.br/);
  assert.match(txt, /UNIPÊ/);
  await page.keyboard.press('Escape');
  assert.equal(await modal.count(), 0);
  // progresso separado por perfil
  await page.getByTestId('menu-perfil').click();
  await page.getByRole('menuitem', { name: 'Sair do perfil' }).click();
  await page.getByTestId('profile-gate').waitFor();
  assert.deepEqual(errors, []);
  await page.close();
});

test('abertura pode ser pulada e respeita movimento reduzido', async () => {
  const { page, errors } = await open('#/', { profile: null });
  await page.locator('[data-profile=estudante]').click();
  await page.getByTestId('pular-abertura').click();
  assert.equal(await page.getByTestId('intro').count(), 0);
  await page.close();
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const p2 = await ctx.newPage();
  await p2.goto(`${base}/#/`);
  await p2.locator('[data-profile=estudante]').click();
  await p2.waitForTimeout(1200);
  assert.equal(await p2.getByTestId('intro').count(), 0, 'abertura curta com movimento reduzido');
  await ctx.close();
  assert.deepEqual(errors, []);
});

test('Minha lista, avaliações, Top 10 e lembrete de “Em breve”', async () => {
  const { page, errors } = await open('#/');
  assert.equal(await page.locator('[data-top10]').count(), 10);
  // adicionar pela janela da série e pelo episódio
  await go(page, '#/serie/hipersensibilidades');
  await page.getByTestId('series-modal').getByRole('button', { name: /Adicionar Hipersensibilidades à Minha lista/ }).click();
  await page.keyboard.press('Escape');
  await go(page, '#/episodio/auto-e5-investigacao');
  await page.getByRole('button', { name: /Adicionar Investigação imunológica à Minha lista/ }).click();
  await go(page, '#/minha-lista');
  const list = page.getByTestId('minha-lista');
  assert.equal(await list.locator('li').count(), 2);
  assert.equal(await list.locator('[data-episode-card="auto-e5-investigacao"]').count(), 1);
  assert.equal(await list.locator('[data-series-card="hipersensibilidades"]').count(), 1);
  await go(page, '#/');
  assert.equal(await page.locator('#minha-lista li').count(), 2, 'fileira Minha lista no início');
  // lembrete
  const remind = page.locator('[data-coming-soon="imunidade-antitumoral"] button');
  await remind.click();
  assert.equal(await remind.getAttribute('aria-pressed'), 'true');
  // remover da lista
  await go(page, '#/episodio/auto-e5-investigacao');
  await page.getByRole('button', { name: /Remover Investigação imunológica da Minha lista/ }).click();
  await go(page, '#/minha-lista');
  assert.equal(await page.getByTestId('minha-lista').locator('li').count(), 1);
  assert.deepEqual(errors, []);
  await page.close();
});

test('acessibilidade: axe-core sem violações WCAG 2.1 A/AA (inclui contraste) em 11 telas × 2 tamanhos', async () => {
  const AXE = fs.readFileSync(path.join(root, 'tests', 'vendor', 'axe.min.js'), 'utf8');
  const screens = [
    ['#/', null], ['#/', 'professor'], ['#/serie/autoimunidade', 'professor'], ['#/episodio/auto-e1-autotolerancia', 'professor'],
    ['#/caso/caso-a', 'professor'], ['#/quiz/quiz-hipersensibilidades', 'professor'], ['#/sobre', 'professor'],
    ['#/busca?q=complemento', 'professor'], ['#/minha-lista', 'professor'], ['#/navegar/casos', 'professor'],
    ['#/imprimir/episodio/auto-e1-autotolerancia', 'professor'],
  ];
  const found = [];
  for (const [width, height] of [[1366, 768], [390, 844]]) {
    for (const [route, profile] of screens) {
      const { page } = await open(route, { width, height, profile });
      await page.waitForTimeout(400);
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () =>
        (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })).violations.map((x) => `${x.id} (${x.nodes.length})`),
      );
      for (const x of v) found.push(`${width}px ${route} [${profile ?? 'perfis'}]: ${x}`);
      await page.close();
    }
  }
  fs.writeFileSync(path.join(OUT, 'axe.json'), JSON.stringify(found, null, 2));
  assert.deepEqual(found, []);
});

test('episódio: "Ver em tela cheia" vira slides e "Voltar à navegação" retorna ao modo rolagem', async () => {
  const AXE = fs.readFileSync(path.join(root, 'tests', 'vendor', 'axe.min.js'), 'utf8');
  const { page, errors } = await open('#/episodio/auto-e1-autotolerancia');
  assert.equal(await page.locator('[data-testid="slideshow"]').count(), 0);
  await page.click('[data-testid="ver-tela-cheia"]');
  const show = page.locator('[data-testid="slideshow"]');
  await show.waitFor();
  const counter = page.locator('[data-testid="slide-contador"]');
  const m = (await counter.innerText()).match(/Slide 1 de (\d+)/);
  assert.ok(m && Number(m[1]) > 8, 'contador inicial');
  const total = Number(m[1]);
  // Teclado e botões.
  await page.keyboard.press('ArrowRight');
  assert.match(await counter.innerText(), /Slide 2 de/);
  await page.keyboard.press('ArrowLeft');
  assert.match(await counter.innerText(), /Slide 1 de/);
  assert.equal(await page.locator('[data-testid="slide-anterior"]').isDisabled(), true);
  // Percorre todos os slides: sem rolagem horizontal, responde à questão e roda o axe em cada um.
  await page.addScriptTag({ content: AXE });
  let answered = false;
  const violations = [];
  for (let i = 1; i <= total; i++) {
    const hs = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    assert.equal(hs, false, `rolagem horizontal no slide ${i}`);
    const radios = page.locator('[data-testid="slideshow"] [role="radio"]');
    if (!answered && (await radios.count())) {
      await radios.first().click();
      await page.locator('[data-testid="slideshow"] [data-feedback]').waitFor();
      answered = true;
    }
    await page.waitForTimeout(450); // fim da animação de entrada do slide
    const v = await page.evaluate(async () =>
      (await window.axe.run(document.querySelector('[data-testid="slideshow"]'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map((x) => `${x.id} (${x.nodes.length})`),
    );
    for (const x of v) violations.push(`slide ${i}: ${x}`);
    if (i < total) await page.click('[data-testid="slide-proximo"]');
  }
  assert.ok(answered, 'havia questão de fixação nos slides');
  assert.deepEqual(violations, []);
  assert.match(await counter.innerText(), new RegExp(`Slide ${total} de ${total}`));
  assert.equal(await page.locator('[data-testid="slide-proximo"]').count(), 0);
  // Voltar à navegação (botão) e por Esc.
  await page.click('[data-testid="sair-slides"]');
  assert.equal(await page.locator('[data-testid="slideshow"]').count(), 0);
  assert.equal(await page.locator('h1').count(), 1);
  await page.click('[data-testid="ver-tela-cheia"]');
  await show.waitFor();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[data-testid="slideshow"]').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
  // Celular (página nova: a janela de teste fica em tela cheia nativa após o passo anterior).
  const mobile = await open('#/episodio/auto-e1-autotolerancia', { width: 390, height: 844 });
  const page2 = mobile.page;
  const show2 = page2.locator('[data-testid="slideshow"]');
  await page2.click('[data-testid="ver-tela-cheia"]');
  await show2.waitFor();
  assert.equal(await page2.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
  await page2.click('[data-testid="sair-slides"]');
  assert.equal(await show2.count(), 0);
  assert.deepEqual(mobile.errors, []);
  await page2.close();
});
