import { useEffect } from 'react';
import { href } from '../lib/router.ts';

export function NotFound({ message }: { message?: string }) {
  useEffect(() => {
    document.title = 'Conteúdo não encontrado — MAPD-Flix';
  }, []);
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center" data-testid="not-found">
      <div>
        <div className="font-display text-6xl font-extrabold text-brand">404</div>
        <h1 className="mt-2 text-2xl font-bold">{message ?? 'Este conteúdo não existe.'}</h1>
        <p className="mt-2 text-mute">Volte ao catálogo para escolher uma série, um caso clínico ou um desafio.</p>
        <a href={href.home()} className="btn btn-primary mt-6">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
