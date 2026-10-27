import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Logo } from '../illustrations/index.tsx';
import { allCases, allQuizzes, comingSoonSeries } from '../data/catalog.ts';
import { professor } from '../data/media.ts';
import { href } from '../lib/router.ts';
import type { Route } from '../lib/router.ts';
import { useProfiles } from '../lib/store.tsx';
import { Avatar } from './Profiles.tsx';
import { Icon } from './ui.tsx';

const NAV: { t: string; h: string; match: (r: Route) => boolean }[] = [
  { t: 'Início', h: href.home(), match: (r) => r.name === 'home' || r.name === 'series' },
  { t: 'Séries', h: href.browse('series'), match: (r) => r.name === 'browse' && r.kind === 'series' },
  { t: 'Casos clínicos', h: href.browse('casos'), match: (r) => (r.name === 'browse' && r.kind === 'casos') || r.name === 'case' },
  { t: 'Desafios', h: href.browse('desafios'), match: (r) => (r.name === 'browse' && r.kind === 'desafios') || r.name === 'quiz' },
  { t: 'Minha lista', h: href.myList(), match: (r) => r.name === 'my-list' },
  { t: 'Fontes', h: href.about(), match: (r) => r.name === 'about' },
];

/** Fecha um menu ao clicar fora ou apertar Esc. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

export function Header({ route, onProfessor }: { route: Route; onProfessor: () => void }) {
  const { active, profiles, choose, signOut } = useProfiles();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(route.name === 'search');
  const [q, setQ] = useState(route.name === 'search' ? route.q : '');
  const [menu, setMenu] = useState<'none' | 'nav' | 'bell' | 'profile'>('none');
  const close = () => setMenu('none');
  const navRef = useDismiss(menu === 'nav', close);
  const bellRef = useDismiss(menu === 'bell', close);
  const profRef = useDismiss(menu === 'profile', close);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 8);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => close(), [route]);

  const notifications = [
    ...allQuizzes.map((x) => ({ t: 'Novo filme especial', d: x.title, h: href.quiz(x.id) })),
    ...allCases.map((c) => ({ t: 'Episódio especial disponível', d: c.title.replace(/ — .*/, ''), h: href.case(c.id) })),
    ...comingSoonSeries().map((s) => ({ t: 'Em breve', d: `Série ${s.title}`, h: href.home() + '' })),
  ];

  return (
    <header
      data-site-header
      className={`no-print fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-ink' : 'bg-gradient-to-b from-black/80 to-transparent'}`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Pular para o conteúdo
      </a>
      <div className="container-page flex h-16 items-center gap-4 md:h-[68px] md:gap-8">
        <a href={href.home()} className="shrink-0" aria-label="MAPD-Flix — página inicial">
          <Logo />
        </a>

        {/* navegação principal (desktop) */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {NAV.map((l) => (
              <li key={l.t}>
                <a href={l.h} aria-current={l.match(route) ? 'page' : undefined} className={`transition-colors hover:text-mute ${l.match(route) ? 'font-bold text-white' : 'text-soft'}`}>
                  {l.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* navegação compacta (tablet/celular) */}
        <div ref={navRef} className="relative lg:hidden">
          <button type="button" className="flex items-center gap-1 text-sm font-semibold text-white" aria-expanded={menu === 'nav'} aria-controls="menu-navegar" onClick={() => setMenu(menu === 'nav' ? 'none' : 'nav')}>
            Navegar <Icon name="chevronDown" className="h-4 w-4" />
          </button>
          {menu === 'nav' && (
            <nav id="menu-navegar" aria-label="Menu móvel" className="absolute left-1/2 top-9 w-56 -translate-x-1/2 border-t-2 border-white bg-[#0b0b0b] py-2 text-center shadow-2xl">
              <ul>
                {NAV.map((l) => (
                  <li key={l.t}>
                    <a href={l.h} className={`block px-4 py-3 text-sm hover:bg-white/10 ${l.match(route) ? 'font-bold text-white' : 'text-soft'}`}>
                      {l.t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 md:gap-5">
          {/* busca expansível */}
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              location.hash = href.search(q.trim());
            }}
            className={`flex items-center border transition-all ${searchOpen ? 'border-white bg-black/80' : 'border-transparent'}`}
          >
            <button
              type="button"
              className="grid h-9 w-9 place-items-center text-white"
              aria-label={searchOpen ? 'Buscar' : 'Abrir busca'}
              onClick={() => {
                if (searchOpen && q.trim()) location.hash = href.search(q.trim());
                else {
                  setSearchOpen(true);
                  setTimeout(() => inputRef.current?.focus(), 30);
                }
              }}
            >
              <Icon name="search" className="h-5 w-5" />
            </button>
            {searchOpen && (
              <>
                <label htmlFor="busca-topo" className="sr-only">
                  Buscar temas e conceitos
                </label>
                <input
                  id="busca-topo"
                  ref={inputRef}
                  type="search"
                  value={q}
                  onChange={(e: { target: { value: string } }) => setQ(e.target.value)}
                  onBlur={() => !q && setSearchOpen(false)}
                  placeholder="Títulos, conceitos, exames"
                  className="h-9 w-36 bg-transparent pr-2 text-sm text-white placeholder:text-mute focus:outline-none sm:w-56"
                />
              </>
            )}
          </form>

          {/* notificações */}
          <div ref={bellRef} className="relative hidden sm:block">
            <button type="button" className="relative grid h-9 w-9 place-items-center text-white" aria-label="Notificações" aria-expanded={menu === 'bell'} onClick={() => setMenu(menu === 'bell' ? 'none' : 'bell')}>
              <Icon name="bell" className="h-6 w-6" />
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold">{notifications.length}</span>
            </button>
            {menu === 'bell' && (
              <div className="absolute right-0 top-11 w-80 border-t-2 border-white bg-[#0b0b0b] shadow-2xl" role="dialog" aria-label="Notificações">
                <ul className="max-h-96 overflow-auto">
                  {notifications.map((n) => (
                    <li key={n.t + n.d} className="border-b border-white/10 last:border-0">
                      <a href={n.h} className="block px-4 py-3 hover:bg-white/10">
                        <span className="block text-xs text-mute">{n.t}</span>
                        <span className="block text-sm text-white">{n.d}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* menu do perfil */}
          {active && (
            <div ref={profRef} className="relative">
              <button type="button" className="group flex items-center gap-2" aria-label={`Perfil: ${active.name}. Abrir menu da conta`} aria-expanded={menu === 'profile'} onClick={() => setMenu(menu === 'profile' ? 'none' : 'profile')} data-testid="menu-perfil">
                <Avatar profile={active} className="h-8 w-8 rounded" />
                <Icon name="chevronDown" className={`hidden h-4 w-4 text-white transition-transform sm:block ${menu === 'profile' ? 'rotate-180' : ''}`} />
              </button>
              {menu === 'profile' && (
                <div className="absolute right-0 top-11 w-64 border border-white/15 bg-[#0b0b0b] py-2 text-sm shadow-2xl" role="menu" aria-label="Conta">
                  {profiles
                    .filter((p) => p.id !== active.id)
                    .map((p) => (
                      <button key={p.id} type="button" role="menuitem" className="flex w-full items-center gap-3 px-4 py-2 text-left text-soft hover:underline" onClick={() => choose(p.id)}>
                        <Avatar profile={p} className="h-8 w-8 rounded" /> {p.name}
                      </button>
                    ))}
                  <button type="button" role="menuitem" className="flex w-full items-center gap-3 px-4 py-2 text-left text-soft hover:underline" onClick={signOut}>
                    <Icon name="pencil" className="h-5 w-5" /> Gerenciar perfis
                  </button>
                  <button type="button" role="menuitem" className="flex w-full items-center gap-3 px-4 py-2 text-left text-soft hover:underline" onClick={onProfessor} data-testid="abrir-professor">
                    <Icon name="user" className="h-5 w-5" /> Sobre o professor
                  </button>
                  <a role="menuitem" href={href.about()} className="flex items-center gap-3 px-4 py-2 text-soft hover:underline">
                    <Icon name="book" className="h-5 w-5" /> Fontes e metodologia
                  </a>
                  <div className="my-2 border-t border-white/15" />
                  <button type="button" role="menuitem" className="block w-full px-4 py-2 text-center text-soft hover:underline" onClick={signOut}>
                    Sair do perfil
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer({ onProfessor }: { onProfessor: () => void }) {
  return (
    <footer data-site-footer className="no-print mt-20 pb-12 text-[13px] text-mute">
      <div className="container-page max-w-[1000px]">
        <p className="mb-4 text-base text-soft">Dúvidas? Escreva para o professor: <span className="select-all text-white">{professor.email}</span></p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <li><a className="hover:underline" href={href.about()}>Fontes científicas</a></li>
          <li><button type="button" className="hover:underline" onClick={onProfessor}>Sobre o professor</button></li>
          <li><a className="hover:underline" href={href.browse('series')}>Todas as séries</a></li>
          <li><a className="hover:underline" href={href.browse('desafios')}>Desafios clínicos</a></li>
          <li><a className="hover:underline" href={href.browse('casos')}>Casos clínicos</a></li>
          <li><a className="hover:underline" href={href.myList()}>Minha lista</a></li>
          <li><a className="hover:underline" href={href.about() }>Privacidade</a></li>
          <li><a className="hover:underline" href={href.search()}>Buscar conceitos</a></li>
        </ul>
        <p className="mt-6">
          Baseado em Barbosa, R. N. F. <em>Mecanismos de Agressão, Patológicos e de Defesa</em>, 1ª ed., 2026, e nas orientações da Abem para as DCN de Medicina 2025.
          Conteúdo educacional; não substitui protocolos clínicos vigentes. Fotografias: Unsplash (créditos em Fontes).
        </p>
        <p className="mt-3">© 2026 MAPD-Flix · {professor.institution}</p>
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
