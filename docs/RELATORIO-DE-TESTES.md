# Relatório de testes — MAPD-Flix 1.0

Execução: 27/10/2026, Node.js 22.23, Chromium (Playwright 1.63), build de produção (`dist/index.html`).

## Resumo

| Etapa | Resultado |
|---|---|
| Type-check (`tsc --noEmit`, modo estrito) | ✅ sem erros |
| Build de produção | ✅ CSS 57 kB + JS 572 kB embutidos em `dist/index.html` |
| Testes unitários | ✅ 34/34 |
| Testes de navegação (E2E) | ✅ 16/16 (≈ 2 min) |
| Rotas internas visitadas pelo rastreador | 71, nenhuma quebrada |
| Erros de console da aplicação | 0 (apenas falhas externas esperadas sem internet: fontes web) |

## Testes unitários (`tests/unit`)

```
ok 1 - catálogo: 3 séries disponíveis e 2 em breve
ok 2 - 19 episódios conceituais na distribuição prevista (6 + 6 + 7)
ok 3 - cada episódio contém os 9 elementos pedagógicos obrigatórios
ok 4 - cada episódio usa ao menos dois tipos de componente interativo
ok 5 - ilustrações referenciadas existem
ok 6 - figuras têm texto alternativo e hotspots em coordenadas válidas
ok 7 - todas as citações apontam para referências registradas
ok 8 - questões: 4 alternativas, uma correta, feedback para todas
ok 9 - quizzes: 3 desafios com ≥ 10 questões, cobrindo vários episódios
ok 10 - casos clínicos: 7 etapas, revelação apenas no final, decisões com qualidades distintas
ok 11 - casos: título e gancho não revelam o diagnóstico
ok 12 - caso C: adrenalina IM é a decisão prioritária na intervenção imediata
ok 13 - vídeos: um por série, ≤ 180 s, verificados e vinculados a episódios existentes
ok 14 - navegação anterior/próximo dentro da série
ok 15 - progresso: salvar e carregar preserva o estado
ok 16 - progresso: migração da versão 1
ok 17 - progresso: dados corrompidos ou desconhecidos resultam em estado vazio
ok 18 - progresso: armazenamento que lança exceção não quebra
ok 19 - progresso: recentes sem duplicatas e limitados
ok 20 - progresso: conclusão, desmarcação e percentual
ok 21 - progresso: casos mesclam decisões
ok 22 - quiz: pontuação perfeita
ok 23 - quiz: pontuação parcial, percentual arredondado e revisão ordenada
ok 24 - quiz: questões não respondidas contam como erro
ok 25 - quiz: rótulos de desempenho
ok 26 - progresso: melhor resultado do quiz
ok 27 - busca: normalização ignora acentos e caixa
ok 28 - busca: encontra conceitos e episódios
ok 29 - busca: não indexa séries em breve nem revela diagnósticos de casos
ok 30 - rotas: parse e geração são consistentes
# tests 30 · pass 30 · fail 0
```

O teste 3 encontrou, durante o desenvolvimento, cinco episódios sem algum elemento obrigatório (figura, cadeia causal, seção de mecanismos ou de aplicação). O conteúdo foi completado antes da entrega.

## Testes de navegação (`tests/e2e`)

```
ok 1 - página inicial carrega com destaque, carrosséis, desafios e "Em breve"
ok 2 - séries disponíveis abrem; séries "em breve" não navegam para páginas vazias
ok 3 - os 19 episódios abrem com todas as seções e figuras renderizadas
ok 4 - componentes interativos: fluxo, expansíveis, hotspots, cadeia, comparador e atividade
ok 5 - progresso persiste localmente após recarregar
ok 6 - três quizzes completos: pontuação, percentual, revisão e refazer
ok 7 - três casos clínicos: revelação progressiva, decisões e elucidação final
ok 8 - vídeos: carregamento sob demanda do player oficial e link alternativo
ok 9 - impressão: layout branco, sem navegação, A4 e PDF gerado
ok 10 - responsividade: sem rolagem horizontal em smartphone, tablet e desktop
ok 11 - acessibilidade básica: títulos, nomes acessíveis, foco visível e redução de movimento
ok 12 - links internos: nenhum link quebrado em todo o catálogo
ok 13 - busca por temas e conceitos
# tests 13 · pass 13 · fail 0
```

### O que cada teste verifica

| Critério do projeto | Evidência |
|---|---|
| Carregamento da página inicial | Teste 1: 1 `h1`, 3 séries, 19 episódios em carrosséis, 3 desafios, 2 “em breve” sem link |
| Navegação por todas as séries | Teste 2; séries em breve retornam página “em breve”, nunca página vazia |
| Abertura de todos os episódios | Teste 3: 19 episódios, 6 seções obrigatórias cada |
| Carregamento correto de imagens | Teste 3: todo `figure` contém SVG com dimensões e `aria-label` |
| Componentes interativos | Teste 4 |
| Execução completa dos três quizzes e pontuação | Teste 6: 100% com gabarito; refazer com 3 erros → percentual exato; links de revisão; impressão do resultado |
| Persistência local | Teste 5: recarregar mantém progresso; migração da v1 |
| Casos clínicos | Teste 7: só 1ª etapa visível; avanço bloqueado sem decisão; diagnóstico só no fim; estado persiste |
| Vídeos | Teste 8: `iframe` criado só após clique, com URL oficial; link alternativo |
| Impressão | Teste 9: fundo branco em mídia `print`, barra oculta, PDF A4 gerado (episódio, resumo, série completa com 7 quebras de página, quiz com/sem gabarito) |
| Responsividade | Teste 10: 7 rotas × 375/768/1440 px sem rolagem horizontal |
| Acessibilidade básica | Teste 11: um `h1`, controles nomeados, SVGs com texto alternativo, `lang`, foco visível, movimento reduzido |
| Links internos | Teste 12: rastreamento de 71 rotas |

Artefatos gerados em `test-results/` (PDFs de impressão, capturas em 375/768/1440 px, lista de rotas).

## Defeitos encontrados e corrigidos pelos testes

- Rolagem horizontal em 375 px nas páginas de série/episódio/caso (grade sem `minmax(0,1fr)`; nome de arquivo longo em referência) e na busca (campo sem `min-width: 0`).
- Foco inicial: o link “Pular para o conteúdo” não era o primeiro foco no carregamento.
- Sobreposição de rótulos e pontos de interação em 8 ilustrações (corrigidos após inspeção visual).

## Não coberto automaticamente

- Leitores de tela reais (NVDA/VoiceOver) e auditoria completa WCAG (axe não estava disponível offline).
- Reprodução real dos vídeos (sem acesso ao YouTube no ambiente de testes; verificação feita no navegador do usuário).
- Navegadores Safari/Firefox.

## Versão 1.1 — interface de streaming

Novos testes:

- Unitários: migração do progresso v2 → v3; Minha lista, avaliação, lembrete e progresso de leitura; perfis (ids únicos, persistência, migração do progresso antigo); Top 10 calculado a partir das questões dos desafios.
- E2E 14: tela “Quem está estudando?”, foto do professor carregada, criação de perfil, abertura animada que termina sozinha e não se repete na sessão, janela “Sobre o professor” com nome, instituição e e-mail, saída do perfil.
- E2E 15: “Pular abertura” e abertura curta com movimento reduzido.
- E2E 16: Top 10 com 10 itens, Minha lista (adicionar pela série e pelo episódio, fileira no início, remover), lembrete de “Em breve”.
- Testes existentes ajustados: janela da série (abre, fecha com Esc), progresso por perfil (chave `mapdflix:progress:<perfil>`, versão 3), “Continuar estudando” a partir da leitura parcial.

## Versão 1.2 — marca “M” e auditoria de contraste

- Marca trocada: o anticorpo deu lugar a um “M” de MAPD (logotipo, abertura e ícone da aba). Na abertura, o traçado do monitor desenha o “M”.
- Fonte dos títulos (Bebas Neue, SIL OFL) embutida no build: o layout não muda se o Google Fonts falhar.
- **Auditoria de contraste (WCAG 2.1 AA).** `scripts/contraste/coletar.mjs` abre 12 telas (perfis, início, janela da série, episódio, caso, desafio, fontes, busca, Minha lista, navegar, menu e janela do professor) em 1366×768 e 390×844, rolando cada uma (92 capturas). Para cada trecho de texto visível, compara a cor do texto com o fundo real medido numa captura sem texto (inclui fotos e degradês; usa o pixel claro do percentil 92 como pior caso). `scripts/contraste/analisar.py` aplica 4,5:1 (texto normal) e 3:1 (texto grande).
  - Antes: 89 trechos abaixo do mínimo (rótulos de cartões sobre fotos claras, selo “MAPD” vermelho sobre foto, destaque e cabeçalhos no celular, títulos de pôster, botão desativado).
  - Correções: degradês mais fortes nos cartões e pôsteres; camada escura extra no celular e no topo dos cabeçalhos com foto; selo “MAPD” em branco sobre vermelho (4,9:1); rótulos pequenos em branco pleno; menus com fundo sólido; botão desativado em cinza legível; selo “MED” com fundo escuro.
  - Depois: 0 falhas reais (1 falso positivo: rótulo parcialmente coberto pelo menu aberto).
- Testes: 34/34 unitários e 16/16 E2E após as mudanças.
