// Coleta: para cada tela, captura com texto e sem texto + caixas e cores do texto visível.
import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = 'test-results/contraste'; fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const BASE = 'http://127.0.0.1:4173/';
const states = [
  { name: 'perfis', hash: '#/', profile: null },
  { name: 'inicio', hash: '#/' },
  { name: 'serie-modal', hash: '#/serie/autoimunidade', scroller: '[data-testid=series-modal]' },
  { name: 'episodio', hash: '#/episodio/auto-e1-autotolerancia' },
  { name: 'caso', hash: '#/caso/caso-a' },
  { name: 'quiz', hash: '#/quiz/quiz-hipersensibilidades' },
  { name: 'sobre', hash: '#/sobre' },
  { name: 'busca', hash: '#/busca?q=complemento' },
  { name: 'minha-lista', hash: '#/minha-lista' },
  { name: 'navegar', hash: '#/navegar/casos' },
  { name: 'professor', hash: '#/', action: async (p) => { await p.click('[data-testid=menu-perfil]'); await p.waitForTimeout(200); await p.screenshot({ path: `${OUT}/_menu.png` }); } },
  { name: 'professor-modal', hash: '#/', action: async (p) => { await p.click('[data-testid=menu-perfil]'); await p.click('[data-testid=abrir-professor]'); }, scroller: '[data-testid=professor-modal]' },
];
const vps = [{ tag: 'd', width: 1366, height: 768 }, { tag: 'm', width: 390, height: 844 }];
const NOANIM = '*,*::before,*::after{animation:none!important;transition:none!important}';
const HIDE = '*{color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important;caret-color:transparent!important} *::placeholder{color:transparent!important}';
const b = await chromium.launch();
const results = [];
for (const vp of vps) for (const st of states) {
  const ctx = await b.newContext({ viewport: { width: vp.width, height: vp.height } });
  const p = await ctx.newPage();
  await p.addInitScript((prof) => { sessionStorage.setItem('mapdflix:intro-seen', '1'); if (prof) sessionStorage.setItem('mapdflix:active-profile', prof); }, st.profile === null ? '' : 'professor');
  await p.goto(BASE + st.hash); await p.waitForTimeout(700);
  if (st.action) { await st.action(p); await p.waitForTimeout(400); }
  await p.addStyleTag({ content: NOANIM }); await p.waitForTimeout(150);
  // força carregamento das imagens lazy
  await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')));
  await p.waitForTimeout(800);
  const total = await p.evaluate((sel) => { const el = sel ? document.querySelector(sel) : document.scrollingElement; return el ? el.scrollHeight : 0; }, st.scroller ?? null);
  const steps = Math.min(8, Math.ceil(total / vp.height));
  for (let i = 0; i < steps; i++) {
    await p.evaluate(([sel, y]) => { const el = sel ? document.querySelector(sel) : document.scrollingElement; el.scrollTop = y; }, [st.scroller ?? null, i * vp.height * 0.9]);
    await p.waitForTimeout(250);
    const id = `${vp.tag}-${st.name}-${i}`;
    const items = await p.evaluate(() => {
      const out = []; const W = innerWidth, H = innerHeight;
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = tw.nextNode())) {
        const t = n.textContent.trim(); if (!t) continue;
        const el = n.parentElement; if (!el || el.closest('svg,script,style,[aria-hidden=true] svg')) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility !== 'visible') continue;
        let op = 1, a = el; while (a) { op *= +getComputedStyle(a).opacity; a = a.parentElement; }
        if (op < 0.2) continue;
        const r = document.createRange(); r.selectNodeContents(n);
        for (const rc of r.getClientRects()) {
          const x0 = Math.max(0, rc.left), y0 = Math.max(0, rc.top), x1 = Math.min(W, rc.right), y1 = Math.min(H, rc.bottom);
          if (x1 - x0 < 4 || y1 - y0 < 4) continue;
          // elemento realmente visível no ponto central?
          const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; const top = document.elementFromPoint(cx, cy);
          if (top && !(el.contains(top) || top.contains(el))) continue;
          if (el.closest('.rank-number,[data-decorative]')) continue;
          let clip = el.parentElement, clipped = false;
          while (clip) { const c = getComputedStyle(clip); if (c.overflow !== 'visible' || c.webkitLineClamp !== 'none') { const b = clip.getBoundingClientRect(); if (cy < b.top || cy > b.bottom || cx < b.left || cx > b.right) { clipped = true; break; } } clip = clip.parentElement; }
          { const c = getComputedStyle(el); if (c.webkitLineClamp !== 'none') { const b = el.getBoundingClientRect(); if (cy > b.bottom) clipped = true; } }
          if (clipped) continue;
          out.push({ t: t.slice(0, 60), color: cs.color, fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, op, box: [x0, y0, x1, y1], tag: el.tagName.toLowerCase(), cls: (el.className && el.className.baseVal === undefined ? el.className : '').slice(0, 120) });
        }
      }
      return out;
    });
    await p.screenshot({ path: `${OUT}/${id}-txt.png` });
    const h = await p.addStyleTag({ content: HIDE }); await p.waitForTimeout(80);
    await p.screenshot({ path: `${OUT}/${id}-bg.png` });
    await h.evaluate((n) => n.remove());
    results.push({ id, items });
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/items.json`, JSON.stringify(results));
console.log('ok', results.length, 'capturas');
