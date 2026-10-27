import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Logo } from '../illustrations/index.tsx';
import { href } from '../lib/router.ts';
import { Icon } from './ui.tsx';

export function Header() {
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 12);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    location.hash = href.search(q.trim());
    setMenu(false);
  };
  const links = [
    { h: href.home(), t: 'Início' },
    { h: href.home() + '?s=series', t: 'Séries', anchor: 'series' },
    { h: href.home() + '?s=desafios', t: 'Desafios clínicos', anchor: 'desafios' },
    { h: href.about(), t: 'Fontes e sobre' },
  ];
  return (
    <header
      data-site-header
      className={`no-print sticky top-0 z-40 transition-colors ${scrolled ? 'bg-ink/95 shadow-lg backdrop-blur' : 'bg-gradient-to-b from-ink/90 to-transparent'}`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Pular para o conteúdo
      </a>
      <div className="container-page flex h-16 items-center gap-4">
        <a href={href.home()} className="shrink-0" aria-label="MAPD-Flix — página inicial">
          <Logo />
        </a>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {links.map((l) => (
              <li key={l.t}>
                <a
                  href={l.anchor ? href.home() : l.h}
                  onClick={(e) => {
                    if (!l.anchor) return;
                    e.preventDefault();
                    goToAnchor(l.anchor);
                  }}
                  className="rounded-lg px-3 py-2 font-medium text-soft hover:bg-white/10 hover:text-white"
                >
                  {l.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <form role="search" onSubmit={submit} className="ml-auto hidden items-center sm:flex">
          <label htmlFor="busca-topo" className="sr-only">
            Buscar temas e conceitos
          </label>
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <input
              id="busca-topo"
              type="search"
              value={q}
              onChange={(e: { target: { value: string } }) => setQ(e.target.value)}
              placeholder="Buscar: FAN, IgE, SCID…"
              className="h-10 w-56 rounded-lg border border-line bg-panel pl-9 pr-3 text-sm text-white placeholder:text-mute focus:w-72 focus:border-brand focus:outline-none lg:w-64"
            />
          </div>
        </form>
        <a href={href.search()} className="btn btn-ghost ml-auto h-10 min-h-0 px-3 sm:hidden" aria-label="Buscar">
          <Icon name="search" className="h-5 w-5" />
        </a>
        <button type="button" className="btn btn-ghost h-10 min-h-0 px-3 md:hidden" aria-expanded={menu} aria-controls="menu-movel" onClick={() => setMenu((m) => !m)} aria-label="Menu">
          <Icon name="menu" className="h-5 w-5" />
        </button>
      </div>
      {menu && (
        <nav id="menu-movel" aria-label="Menu móvel" className="container-page pb-3 md:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.t}>
                <a
                  href={l.anchor ? href.home() : l.h}
                  onClick={(e) => {
                    setMenu(false);
                    if (!l.anchor) return;
                    e.preventDefault();
                    goToAnchor(l.anchor);
                  }}
                  className="block rounded-lg px-3 py-3 font-medium text-white hover:bg-white/10"
                >
                  {l.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Navega até uma seção da página inicial (mesmo vindo de outra página). */
export function goToAnchor(id: string) {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (location.hash !== '#/' && location.hash !== '') {
    location.hash = '#/';
    setTimeout(scroll, 60);
  } else scroll();
}

export function Footer() {
  return (
    <footer data-site-footer className="no-print mt-16 border-t border-line py-10 text-sm text-mute">
      <div className="container-page grid gap-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm">
            Plataforma educacional de Mecanismos de Agressão, Patológicos e de Defesa — Imunologia Clínica para estudantes de Medicina.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white">Base científica</div>
          <p className="mt-2">
            Barbosa, R. N. F. <em>Mecanismos de Agressão, Patológicos e de Defesa</em>, 1ª ed., 2026 (caps. 16, 17, 19, 20 e 22). Orientação pedagógica: Caderno ABEM/DCN 2025.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white">Uso educacional</div>
          <p className="mt-2">
            Conteúdo didático; não substitui protocolos clínicos vigentes nem avaliação profissional. Seu progresso fica salvo apenas neste navegador.
          </p>
          <a className="mt-2 inline-block underline hover:text-white" href={href.about()}>
            Fontes, vídeos e metodologia
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children?: ReactNode }) {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      {children}
    </main>
  );
}
