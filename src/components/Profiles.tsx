import { useEffect, useRef, useState } from 'react';
import { professor } from '../data/media.ts';
import type { Profile } from '../lib/profiles.ts';
import { MAX_PROFILES } from '../lib/profiles.ts';
import { useProfiles } from '../lib/store.tsx';
import { Logo } from '../illustrations/index.tsx';
import { Icon } from './ui.tsx';

export function Avatar({ profile, className = '' }: { profile: Profile; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (profile.photo && !failed) {
    return <img src={profile.photo} alt="" className={`object-cover ${className}`} onError={() => setFailed(true)} />;
  }
  return (
    <span className={`grid place-items-center text-white ${className}`} style={{ background: profile.color }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-3/5 w-3/5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M6 3v6a5 5 0 0 0 10 0V3" />
        <path d="M11 14v2a4 4 0 0 0 8 0v-2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    </span>
  );
}

/** Tela “Quem está estudando?”. */
export function ProfileGate() {
  const { profiles, choose, add, remove } = useProfiles();
  const [managing, setManaging] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = 'Quem está estudando? — MAPD-Flix';
  }, []);
  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  if (adding) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink px-4">
        <form
          className="w-full max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            const p = add(name);
            if (p) {
              setAdding(false);
              setName('');
            }
          }}
        >
          <h1 className="text-4xl font-medium text-white md:text-6xl">Adicionar perfil</h1>
          <p className="mt-2 text-mute">Crie um perfil para separar seu progresso (fica salvo só neste navegador).</p>
          <div className="mt-6 flex items-center gap-5 border-y border-line py-6">
            <Avatar profile={{ id: 'novo', name, color: '#21a366', kind: 'estudante' }} className="h-24 w-24 shrink-0 rounded" />
            <label htmlFor="nome-perfil" className="sr-only">Nome do perfil</label>
            <input id="nome-perfil" ref={inputRef} value={name} maxLength={24} onChange={(e: { target: { value: string } }) => setName(e.target.value)} placeholder="Nome" className="h-11 w-full min-w-0 bg-[#666] px-3 text-white placeholder:text-soft focus:outline-none focus:ring-2 focus:ring-white" />
          </div>
          <div className="mt-6 flex gap-4">
            <button type="submit" className="btn border border-white bg-white px-6 text-black hover:bg-brand hover:text-white" disabled={!name.trim()}>
              Continuar
            </button>
            <button type="button" className="btn border border-mute px-6 text-mute hover:border-white hover:text-white" onClick={() => setAdding(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink" data-testid="profile-gate">
      <div className="container-page flex h-20 items-center">
        <Logo />
      </div>
      <main className="grid flex-1 place-items-center px-4 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-white md:text-5xl">{managing ? 'Gerenciar perfis' : 'Quem está estudando?'}</h1>
          <ul className="mt-8 flex flex-wrap justify-center gap-5 md:gap-8">
            {profiles.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="group flex w-28 flex-col items-center gap-3 md:w-36"
                  onClick={() => (managing ? p.kind === 'estudante' && p.id !== 'estudante' && remove(p.id) : choose(p.id))}
                  aria-label={managing ? (p.kind === 'estudante' && p.id !== 'estudante' ? `Remover perfil ${p.name}` : `${p.name} (perfil fixo)`) : `Entrar como ${p.name}`}
                  data-profile={p.id}
                >
                  <span className="relative block">
                    <Avatar profile={p} className="h-28 w-28 rounded border-[3px] border-transparent transition-colors group-hover:border-white group-focus-visible:border-white md:h-36 md:w-36" />
                    {managing && p.kind === 'estudante' && p.id !== 'estudante' && (
                      <span className="absolute inset-0 grid place-items-center rounded bg-black/60">
                        <Icon name="x" className="h-10 w-10 text-white" />
                      </span>
                    )}
                  </span>
                  <span className="text-mute transition-colors group-hover:text-white md:text-lg">{p.name}</span>
                  {p.kind === 'professor' && <span className="-mt-2 text-xs text-mute">Professor</span>}
                </button>
              </li>
            ))}
            {!managing && profiles.length < MAX_PROFILES && (
              <li>
                <button type="button" className="group flex w-28 flex-col items-center gap-3 md:w-36" onClick={() => setAdding(true)}>
                  <span className="grid h-28 w-28 place-items-center rounded border-[3px] border-transparent text-mute transition-colors group-hover:border-white group-hover:bg-white/10 group-hover:text-white md:h-36 md:w-36">
                    <Icon name="plus" className="h-16 w-16" />
                  </span>
                  <span className="text-mute group-hover:text-white md:text-lg">Adicionar perfil</span>
                </button>
              </li>
            )}
          </ul>
          <button type="button" className="mt-12 border border-mute px-6 py-2 tracking-[0.2em] text-mute uppercase hover:border-white hover:text-white" onClick={() => setManaging((m) => !m)}>
            {managing ? 'Concluído' : 'Gerenciar perfis'}
          </button>
        </div>
      </main>
    </div>
  );
}

/** Janela com os dados do professor-autor. */
export function ProfessorModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4" onClick={onClose}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prof-nome"
        className="relative w-full max-w-lg overflow-hidden rounded-md bg-panel shadow-2xl outline-none animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        data-testid="professor-modal"
      >
        <button type="button" className="icon-btn absolute right-3 top-3 z-10 h-9 w-9 border-0 bg-panel" onClick={onClose} aria-label="Fechar">
          <Icon name="x" className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-brand/30 to-panel px-6 pb-6 pt-10 text-center sm:flex-row sm:items-end sm:text-left">
          <img src={professor.photo} alt={`Foto de ${professor.name}`} className="h-32 w-32 shrink-0 rounded object-cover shadow-xl" />
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-2">Professor · Autor</div>
            <h2 id="prof-nome" className="mt-1 text-2xl font-extrabold leading-tight text-white">{professor.name}</h2>
          </div>
        </div>
        <dl className="space-y-3 px-6 pb-7 text-[0.95rem]">
          <div><dt className="text-mute">Atuação</dt><dd className="text-white">{professor.title}</dd></div>
          <div><dt className="text-mute">Instituição</dt><dd className="text-white">{professor.institution}</dd></div>
          <div><dt className="text-mute">Obra-base</dt><dd className="text-white">{professor.book}</dd></div>
          <div>
            <dt className="text-mute">Contato</dt>
            <dd className="select-all break-all text-white">{professor.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
