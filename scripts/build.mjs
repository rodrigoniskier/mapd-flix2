#!/usr/bin/env node
/**
 * Build de produção do MAPD-Flix.
 *
 *  - Empacota src/main.tsx com esbuild (React 19, JSX automático).
 *  - Gera CSS com a API do Tailwind CSS v4 (compile + build), extraindo as
 *    classes usadas nos arquivos de src/.
 *  - Escreve dist/index.html (página completa, para Vercel/hosting estático)
 *    e dist/artifact.html (fragmento autocontido com CSS/JS inline).
 *
 * Uso: node scripts/build.mjs [--watch] [--serve]
 */
import { build, context } from 'esbuild';
import { compile } from 'tailwindcss';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const args = new Set(process.argv.slice(2));
const require = createRequire(import.meta.url);
const twBase = path.dirname(require.resolve('tailwindcss/package.json'));

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

/** Extrai candidatos a classes utilitárias de todos os arquivos-fonte. */
function extractCandidates() {
  const set = new Set();
  for (const file of walk(src)) {
    if (!/\.(tsx?|css)$/.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    // Divide só em espaços, aspas e chaves: preserva valores arbitrários como text-[clamp(4rem,10vw,8rem)].
    for (const raw of text.split(/[\s"'`{}<>;]+/)) {
      for (const tok of [raw, raw.replace(/^[^a-z!@\[-]+/, '').replace(/[),.:]+$/, '')]) {
        if (tok && tok.length < 160 && /^[!a-z@\[-]/.test(tok)) set.add(tok.replace(/^!/, ''));
      }
    }
  }
  return [...set];
}

async function buildCss() {
  const input = fs.readFileSync(path.join(src, 'styles', 'globals.css'), 'utf8');
  const compiler = await compile(input, {
    base: path.join(src, 'styles'),
    loadStylesheet: async (id, base) => {
      let file;
      if (id === 'tailwindcss') file = path.join(twBase, 'index.css');
      else if (id.startsWith('tailwindcss/')) file = path.join(twBase, id.slice('tailwindcss/'.length).replace(/(\.css)?$/, '.css'));
      else file = path.resolve(base, id);
      return { content: fs.readFileSync(file, 'utf8'), base: path.dirname(file), path: file };
    },
  });
  return compiler.build(extractCandidates());
}

async function buildJs(minify = true) {
  const result = await build({
    entryPoints: [path.join(src, 'main.tsx')],
    bundle: true,
    format: 'iife',
    target: ['es2020'],
    jsx: 'automatic',
    minify,
    write: false,
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development') },
    logLevel: 'warning',
  });
  return result.outputFiles[0].text;
}

// Bebas Neue (SIL OFL) embutida: os títulos não dependem do Google Fonts.
const BEBAS = `@font-face{font-family:'Bebas Neue';font-style:normal;font-weight:400;font-display:block;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(root, 'public', 'fonts', 'bebas-neue-latin.woff2')).toString('base64')}) format('woff2')}`;

const HEAD = (css) => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="MAPD-Flix: Imunologia Clínica em formato de séries — autoimunidade, imunodeficiências e hipersensibilidades.">
<meta name="theme-color" content="#141414">
<title>MAPD-Flix</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(fs.readFileSync(path.join(root, 'public', 'favicon.svg'), 'utf8'))}">
<style>${BEBAS}${css}</style>`;

async function main() {
  const t0 = Date.now();
  const [css, js] = await Promise.all([buildCss(), buildJs(!args.has('--dev'))]);
  // Evita que a sequência "</script" dentro do bundle feche a tag inline.
  const safeJs = js.replace(/<\/script/gi, '<\\/script');
  fs.mkdirSync(dist, { recursive: true });
  // Fotografias e avatar (servidos ao lado da página).
  fs.cpSync(path.join(root, 'public', 'img'), path.join(dist, 'img'), { recursive: true });
  const body = `<div id="root"></div>\n<script>${safeJs}</script>`;
  fs.writeFileSync(
    path.join(dist, 'index.html'),
    `<!doctype html>\n<html lang="pt-BR">\n<head>\n${HEAD(css)}\n</head>\n<body>\n${body}\n</body>\n</html>\n`,
  );
  // Fragmento para publicação como Artifact (o host adiciona o esqueleto HTML).
  // No modo hospedado (Artifact), impressão e iframes externos são bloqueados pelo ambiente.
  fs.writeFileSync(path.join(dist, 'artifact.html'), `${HEAD(css)}\n<script>window.__MAPD_EMBED__=true</script>\n${body}\n`);
  const kb = (n) => (n / 1024).toFixed(0) + ' kB';
  console.log(`build ok em ${Date.now() - t0} ms — css ${kb(css.length)}, js ${kb(js.length)} → dist/index.html`);
}

await main();

if (args.has('--watch')) {
  let timer;
  fs.watch(src, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => main().catch((e) => console.error(e.message)), 150);
  });
  console.log('observando alterações em src/ …');
}
if (args.has('--serve')) {
  await import('./serve.mjs').then((m) => m.serve(dist, 5173));
}
void context;
