# Arquitetura do MAPD-Flix

## Visão geral

Aplicação **React 19 + TypeScript + Tailwind CSS v4**, empacotada com **esbuild** em uma única página estática (`dist/index.html`) e roteada por hash (`#/serie/…`). Não há servidor, banco de dados nem autenticação nesta versão.

```
Dados (src/data) ──► Catálogo/consultas (catalog.ts) ──► Páginas (src/pages) ──► Componentes (src/components)
                                   │                                         │
                    Lógica pura (src/lib: progress, quiz, search, router)    └─► Ilustrações SVG (src/illustrations)
```

### Por que não Next.js nesta entrega

O prompt indicava Next.js “preferencialmente”. No ambiente de desenvolvimento, o acesso ao registro npm estava bloqueado pela política de rede, impossibilitando instalar `next`. Para não entregar código não testado, o projeto usa apenas as dependências disponíveis e verificáveis (React, esbuild, Tailwind, TypeScript, Playwright). A arquitetura mantém o que importa para a migração:

- **Dados separados da interface** (`src/data`), com tipos em `src/domain/types.ts`.
- **Lógica pura** em `src/lib` (sem dependência do DOM, testável com `node --test`).
- **Páginas** recebem apenas IDs (`<EpisodePage id=… />`), equivalentes a rotas dinâmicas `app/episodio/[id]/page.tsx` do Next.js.

Migrar para Next.js App Router exige: criar `app/*/page.tsx` que renderizam as páginas existentes com `params.id`, trocar `href.*` (hash) por caminhos e adicionar `'use client'` nos componentes interativos. O conteúdo e a lógica não mudam.

## Modelo de dados

| Entidade | Tipo | Observações |
|---|---|---|
| Série | `Series` | `status: 'disponivel' \| 'em-breve'`, tema visual, competências, temporadas |
| Temporada | `Season` | Lista ordenada de `episodeIds` (preparada para expansão) |
| Episódio | `Episode` | Pergunta orientadora, objetivos, `keyTerms`, `sections`, `activity`, `synthesis`, `citations` |
| Seção | `Section` | Papel pedagógico (`conceitos`, `mecanismos`, `visual`, `aplicacao`, `aprofundamento`) + blocos |
| Bloco | `ContentBlock` | `text`, `expandable`, `flow`, `timeline`, `compare`, `figure`, `chain`, `callout`, `list` |
| Termo conceitual | `KeyTerm` | Também indexado pela busca |
| Recurso visual | `VisualResource` | Ilustração + texto alternativo + legenda + `hotspots` (imagem anotada) |
| Vídeo | `Video` | Título, canal, duração verificada, URL, justificativa, episódios vinculados |
| Caso clínico | `ClinicalCase` → `CaseStep` → `Decision` → `DecisionOption` | Qualidade da decisão: `prioritaria`, `aceitavel`, `inadequada`; `reveal` marca a elucidação |
| Pergunta / Alternativa / Feedback | `Question` / `Option` | Feedback por alternativa + justificativa; `relatedEpisodes` orienta revisão |
| Resultado de quiz | `QuizResult` | Acertos, percentual, episódios e temas para revisão |
| Progresso | `ProgressState` (lib/progress.ts) | Versionado (`version: 2`), com migração da v1 |
| Referência | `Reference` | `obra-base`, `pedagogica`, `complementar` (DOI/PMID), `normativa` |

## Progresso do estudante

- Persistido em `localStorage` (`mapdflix:progress`), sem dados pessoais.
- `migrate()` converte versões anteriores; dados corrompidos resultam em estado vazio, sem quebrar o app.
- Se o armazenamento estiver bloqueado (modo privado), o app funciona em memória.
- O armazenamento é injetável (`KeyValueStore`), o que permite trocar por API/banco quando houver autenticação institucional.

## Interatividade

| Componente | Uso pedagógico |
|---|---|
| Fluxo clicável com revelação progressiva | Processos em etapas (seleção tímica, sensibilização, investigação escalonada, atendimento da anafilaxia) |
| Cards expansíveis | Aprofundamento opcional sem poluir a leitura |
| Imagens anotadas (hotspots) | Exploração de estruturas nas ilustrações |
| Comparador (tabela com destaque de coluna) | Contrastar mecanismos e doenças |
| Linha do tempo | Fisiopatologia temporal (AR pré-clínica, HIV, doença do soro, fases tipo I) |
| Cadeia causal | Mecanismo → alteração → lesão → manifestação → investigação → conduta |
| Questões com feedback | Fixação formativa com explicação de cada alternativa |
| Casos com decisões | Revelação progressiva; a próxima etapa só abre após a decisão |

Todos funcionam por toque e teclado (sem dependência de hover), com `aria-expanded`, `aria-pressed` e regiões `aria-live`.

## Impressão

Rotas `#/imprimir/…` renderizam um documento A4 de fundo branco, sem menus, com componentes abertos (fluxos completos, hotspots listados, gabarito opcional). O CSS de impressão (`@page A4`, `break-inside: avoid`) evita cortes em figuras e tabelas. O estudante usa “Imprimir / Salvar como PDF” do navegador.

## Vídeos

Facade de carregamento sob demanda: o `iframe` oficial (`youtube-nocookie.com/embed`) só é criado após o clique. O link “Abrir no YouTube” permanece sempre disponível. A ausência de vídeo é exibida explicitamente (`VideoCard` sem `video`).

## Acessibilidade e design system

- Tokens em `src/styles/globals.css` (`@theme`): cores, fontes, sombras; tema escuro de alto contraste.
- Foco visível (`:focus-visible`), link “Pular para o conteúdo”, um `h1` por página, SVGs com `role="img"` e `aria-label`.
- `prefers-reduced-motion` desativa transições e animações.
- Layout responsivo testado em 375, 768 e 1440 px.

## Build

`scripts/build.mjs` compila o CSS pela API do Tailwind v4 (extraindo classes de `src/`) e o JS com esbuild; gera `dist/index.html` (página completa) e `dist/artifact.html` (fragmento para publicação como Artifact no claude.ai).
