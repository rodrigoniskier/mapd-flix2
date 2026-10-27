# Como incluir novas séries, episódios e questões

Todo o conteúdo fica em `src/data`. Nenhum componente precisa ser alterado.

## Ativar uma série “Em breve”

1. Em `src/data/series/futuras.ts`, mova a série para um arquivo próprio (ex.: `src/data/series/antitumoral.ts`) e altere `status: 'disponivel'`.
2. Preencha `synopsis`, `learningObjectives`, `competencies`, `citations` e `seasons[0].episodeIds`.
3. Crie os episódios no mesmo arquivo, exportando `Episode[]` (copie a estrutura de `autoimunidade.ts`).
4. Opcional: `caseId`, `quizId`, `videoId` apontando para dados criados em `cases/`, `quizzes/` e `videos.ts`.
5. Registre tudo em `src/data/catalog.ts` (`allSeries`, `allEpisodes`, `allCases`, `allQuizzes`).
6. Rode `npm run test:unit`: os testes de conteúdo verificam campos obrigatórios, ilustrações, referências e consistência.

## Estrutura mínima de um episódio

```ts
{
  id: 'tumor-e1-vigilancia',
  seriesId: 'imunidade-antitumoral',
  number: 1,
  title: 'Vigilância imunológica',
  tagline: '…',
  cover: 'tipo4-celular',               // id de ilustração existente
  durationMinutes: 18,
  guidingQuestion: '…?',                // termina com “?”
  objectives: ['…', '…', '…'],          // ≥ 3
  keyTerms: [{ term: '…', definition: '…' }],  // ≥ 3
  sections: [
    { id: 'mecanismos', title: '…', role: 'mecanismos', blocks: [ /* text, flow, compare, expandable… */ ] },
    { id: 'visual', title: '…', role: 'visual', blocks: [{ type: 'figure', visual: { illustration: '…', alt: '…', hotspots: [] } }] },
    { id: 'aplicacao', title: 'Aplicação clínica', role: 'aplicacao', blocks: [{ type: 'chain', links: [ /* 6 elos */ ] }] },
  ],
  activity: [ /* Question[] */ ],
  synthesis: ['…', '…', '…'],
  citations: [{ ref: 'barbosa-2026', locator: 'cap. 21' }],
  keywords: ['…'],
}
```

Os testes exigem, para cada episódio: seção de mecanismos, seção de aplicação, figura, cadeia causal, atividade, síntese ≥ 3 itens e citação da obra-base.

## Nova questão de quiz

```ts
{
  id: 'qa13',
  stem: 'Vinheta clínica…',
  prompt: 'Pergunta?',
  options: [
    { id: 'a', text: '…', feedback: 'Por que está certa ou errada.' },
    { id: 'b', text: '…', feedback: '…' },
    { id: 'c', text: '…', feedback: '…' },
    { id: 'd', text: '…', feedback: '…' },
  ],
  correctOptionId: 'b',
  explanation: 'Justificativa científica da correta.',
  relatedEpisodes: ['auto-e5-investigacao'],   // links de revisão no resultado
  tags: ['FAN'],
}
```

## Nova ilustração

Crie um componente em `src/illustrations/mechanisms.tsx` (viewBox 400×240, use as primitivas de `primitives.tsx`) e registre-o no objeto `mechanismIllustrations`. Use `currentColor` para textos e contornos, garantindo legibilidade no tema escuro e na impressão.

## Nova referência

Adicione em `src/data/references.ts`. Referências `complementar` precisam de DOI ou PMID (verificado pelos testes).

## Novo vídeo

Adicione em `src/data/videos.ts` somente após verificar no YouTube: disponibilidade, duração ≤ 180 s e permissão de incorporação. Registre `verifiedAt`.
