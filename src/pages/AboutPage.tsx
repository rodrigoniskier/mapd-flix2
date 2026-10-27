import { useEffect } from 'react';
import { references } from '../data/references.ts';
import { videos } from '../data/videos.ts';
import { allSeries } from '../data/catalog.ts';
import { References } from '../components/References.tsx';
import { formatDuration } from '../components/ui.tsx';

export function AboutPage() {
  useEffect(() => {
    document.title = 'Fontes e metodologia — MAPD-Flix';
  }, []);
  return (
    <div className="container-page max-w-4xl space-y-10 pb-10 pt-8">
      <header>
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">Fontes, vídeos e metodologia</h1>
        <p className="mt-3 text-lg">
          O MAPD-Flix organiza a Imunologia Clínica em séries e episódios para estudantes de Medicina, com base na obra
          <em> Mecanismos de Agressão, Patológicos e de Defesa</em> (Prof. Rodrigo Niskier Ferreira Barbosa, 2026) e nas orientações da ABEM para as DCN de Medicina.
        </p>
      </header>

      <section aria-labelledby="metodo" className="space-y-3">
        <h2 id="metodo" className="text-2xl font-bold">Desenho pedagógico</h2>
        <p>Cada episódio segue a mesma estrutura, alinhada à educação baseada em competências e à aprendizagem ativa:</p>
        <ol className="list-decimal space-y-1 pl-6">
          <li>Pergunta orientadora (ativa conhecimentos prévios).</li>
          <li>Objetivos de aprendizagem.</li>
          <li>Conceitos fundamentais.</li>
          <li>Explicação dos mecanismos, com fluxos clicáveis, comparadores e linhas do tempo.</li>
          <li>Representação visual com imagens anotadas originais.</li>
          <li>Aplicação clínica: mecanismo → alteração funcional → lesão → manifestação → investigação → conduta.</li>
          <li>Atividade interativa com feedback formativo.</li>
          <li>Síntese e retorno à pergunta orientadora.</li>
          <li>Referências separadas por tipo.</li>
        </ol>
        <p>
          Casos clínicos usam revelação progressiva e decisões com consequências; o diagnóstico só é revelado ao final, e decisões emergenciais
          nunca dependem da confirmação diagnóstica. Os desafios clínicos (quizzes) explicam por que cada alternativa está certa ou errada e
          direcionam a revisão aos episódios relacionados.
        </p>
        <p className="text-sm text-mute">
          Todos os casos são fictícios e didáticos. Terapêuticas aparecem em contexto educacional; decisões reais seguem protocolos vigentes e avaliação individual.
        </p>
      </section>

      <section aria-labelledby="videos" className="space-y-3">
        <h2 id="videos" className="text-2xl font-bold">Vídeos complementares (verificados)</h2>
        <div className="overflow-x-auto rounded-xl border border-line" tabIndex={0}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.06] text-white">
              <tr>
                <th scope="col" className="px-3 py-2">Série</th>
                <th scope="col" className="px-3 py-2">Título e canal</th>
                <th scope="col" className="px-3 py-2">Duração</th>
                <th scope="col" className="px-3 py-2">Justificativa</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id} className="border-t border-line align-top">
                  <td className="px-3 py-2">{allSeries.find((s) => s.videoId === v.id)?.title}</td>
                  <td className="px-3 py-2">
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline">{v.title}</a>
                    <div className="text-mute">{v.channel} · {v.language}</div>
                  </td>
                  <td className="px-3 py-2">{formatDuration(v.durationSeconds)}</td>
                  <td className="px-3 py-2">{v.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-mute">
          Disponibilidade, duração (≤ 3 min) e permissão de incorporação verificadas no YouTube em 27/10/2026. O player é carregado apenas após o clique; se a
          incorporação falhar, use o link direto. A plataforma funciona normalmente sem os vídeos.
        </p>
      </section>

      <section aria-labelledby="privacidade" className="space-y-2">
        <h2 id="privacidade" className="text-2xl font-bold">Privacidade e progresso</h2>
        <p>
          Não há cadastro. O progresso (episódios concluídos, respostas, casos e desafios) é salvo apenas no armazenamento local deste navegador
          e pode ser apagado limpando os dados do site. Nenhum dado pessoal é coletado.
        </p>
      </section>

      <section aria-labelledby="imagens" className="space-y-2">
        <h2 id="imagens" className="text-2xl font-bold">Imagens</h2>
        <p>
          Todas as ilustrações são vetoriais, originais e esquemáticas, criadas para o MAPD-Flix (não são microfotografias). Valores numéricos em gráficos são
          ilustrativos quando assim indicado.
        </p>
      </section>

      <References citations={references.map((r) => ({ ref: r.id }))} title="Todas as referências" />
    </div>
  );
}
