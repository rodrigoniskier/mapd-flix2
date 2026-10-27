# MAPD-Flix

Plataforma web educacional de **Mecanismos de Agressão, Patológicos e de Defesa** — Imunologia Clínica para estudantes de Medicina, com navegação inspirada em serviços de streaming: séries, episódios, casos clínicos interativos e “filmes especiais” (desafios clínicos).

Interface no estilo dos serviços de streaming — fundo carvão, vermelho como destaque, “Quem está estudando?”, abertura animada, destaque em tela cheia, fileiras horizontais, Top 10, Minha lista, cartões que se expandem e janela “Mais informações” com episódios. A marca, a abertura (traçado de monitor cardíaco que forma o anticorpo da marca) e o som (bipes de monitor + acorde, sintetizados) são originais; nenhum logotipo, vinheta ou som da Netflix é reutilizado.

Fotografias reais de cenas clínicas e laboratoriais (Unsplash, licença livre), uma por série, episódio, caso e desafio, com créditos na página “Fontes”. O perfil do professor traz foto e dados do autor.

## O que há na versão 1.0

| Item | Quantidade |
|---|---|
| Séries disponíveis | 3 — Autoimunidade, Imunodeficiências, Hipersensibilidades |
| Episódios conceituais | 19 (6 + 6 + 7) |
| Casos clínicos interativos (7 etapas, revelação progressiva) | 3 |
| Desafios clínicos (quizzes) | 3 × 12 questões |
| Questões de fixação dentro dos episódios | 28 |
| Ilustrações vetoriais originais (mecanismos) | 19 |
| Fotografias clínicas reais (Unsplash) | 32 |
| Vídeos do YouTube verificados (≤ 3 min) | 3 |
| Séries “Em breve” | 2 — Imunidade Antitumoral, Imunidade nos Transplantes |

Cada episódio segue o roteiro pedagógico: pergunta orientadora → objetivos → conceitos fundamentais → mecanismos → representação visual → aplicação clínica (cadeia *mecanismo → alteração funcional → lesão → manifestação → investigação → conduta*) → atividade com feedback → síntese → referências.

## Executar localmente

Requisitos: Node.js ≥ 22.18.

```bash
npm install          # react, react-dom, esbuild, tailwindcss, typescript, playwright
npm run build        # gera dist/index.html (página única, CSS e JS embutidos)
npm start            # serve dist/ em http://127.0.0.1:4173
npm run dev          # rebuild automático + servidor em http://127.0.0.1:5173
```

Testes:

```bash
npm run typecheck    # TypeScript estrito
npm run test:unit    # 34 testes (conteúdo, progresso, perfis, quiz, busca, rotas)
npm run test:e2e     # 16 testes Playwright no build de produção
```

Se o navegador do Playwright não estiver instalado: `npx playwright install chromium`.

## Publicar na Vercel

O projeto é estático (`dist/`). O arquivo `vercel.json` já define `npm run build` e `dist` como saída:

1. Crie um repositório no GitHub e envie este projeto (`git push`).
2. Na Vercel: *Add New → Project → Import* o repositório. Nenhuma variável de ambiente é necessária.
3. A cada `git push`, a Vercel publica a nova versão.

Alternativa sem Git: `npx vercel --prod` na pasta do projeto.

## Estrutura

```
src/
  domain/types.ts         Modelo de dados (Série, Temporada, Episódio, Seção, Bloco, Questão, Caso, Quiz, Vídeo, Referência…)
  data/                   TODO o conteúdo educacional (dados estruturados)
    series/*.ts           Séries e episódios
    cases/*.ts            Casos clínicos
    quizzes/*.ts          Desafios clínicos
    references.ts         Referências (obra-base, pedagógica, complementares, normativas)
    videos.ts             Vídeos verificados
    catalog.ts            Registro e consultas do catálogo
  lib/                    Lógica pura e testável (progresso, quiz, busca, rotas)
  components/             Componentes reutilizáveis (blocos interativos, cards, vídeo, referências)
  illustrations/          Ilustrações SVG originais e capas
  pages/                  Telas (início, série, episódio, caso, quiz, busca, impressão, sobre)
tests/unit, tests/e2e     Testes
docs/                     Arquitetura, fontes, inclusão de séries, relatório de testes, limitações
```

## Documentação

- [Arquitetura](docs/ARQUITETURA.md)
- [Como incluir novas séries, episódios e questões](docs/NOVAS-SERIES.md)
- [Fontes científicas e vídeos](docs/FONTES-E-VIDEOS.md)
- [Relatório de testes](docs/RELATORIO-DE-TESTES.md)
- [Limitações e pendências](docs/LIMITACOES.md)

## Autoria e uso

Conteúdo baseado em Barbosa, R. N. F. *Mecanismos de Agressão, Patológicos e de Defesa*, 1ª ed., 2026, e nas orientações da ABEM para as DCN de Medicina 2025. Uso educacional; não substitui protocolos clínicos vigentes. Casos clínicos são fictícios.
