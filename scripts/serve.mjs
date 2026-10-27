#!/usr/bin/env node
/** Servidor estático mínimo (sem dependências) para desenvolvimento e testes. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' };

export function serve(dir, port = 4173) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(dir, url === '/' ? 'index.html' : url);
    if (!file.startsWith(path.resolve(dir))) file = path.join(dir, 'index.html');
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dir, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => {
    console.log(`MAPD-Flix em http://127.0.0.1:${server.address().port}`);
    resolve(server);
  }));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [dir = 'dist', port = '4173'] = process.argv.slice(2);
  serve(path.resolve(dir), Number(port));
}
