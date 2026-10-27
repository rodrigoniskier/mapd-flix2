import type { Episode, Series } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const imunodeficienciasSeries: Series = {
  id: 'imunodeficiencias',
  slug: 'imunodeficiencias',
  order: 2,
  status: 'disponivel',
  title: 'Imunodeficiências',
  shortTitle: 'Imunodeficiências',
  tagline: 'Quando a defesa falha, o tipo de infecção revela onde está o defeito.',
  synopsis:
    'Infecções de repetição podem ser só má sorte — ou o primeiro sinal de um erro inato da imunidade, do HIV ou de uma imunossupressão iatrogênica. Nesta série, o estudante aprende a ler o “padrão de infecções” como um mapa do sistema imune, a escolher exames em sequência lógica e a agir com urgência quando a vida de um lactente depende de reconhecimento precoce.',
  learningObjectives: [
    'Diferenciar imunodeficiências primárias (erros inatos) e secundárias.',
    'Relacionar o compartimento imune defeituoso ao padrão de infecções.',
    'Reconhecer sinais de alerta e complicações após vacinas vivas.',
    'Planejar investigação escalonada: hemograma, imunoglobulinas, citometria, complemento, testes funcionais e genéticos.',
    'Descrever medidas protetoras, terapias de reposição e acesso no SUS.',
  ],
  theme: { from: '#04202c', via: '#0b4f5c', to: '#10b981', accent: '#34d399', motif: 'imunodeficiencia' },
  seasons: [
    {
      number: 1,
      title: 'Temporada 1 — Da suspeita ao cuidado',
      episodeIds: [
        'idef-e1-fundamentos',
        'idef-e2-primarias',
        'idef-e3-secundarias',
        'idef-e4-manifestacoes',
        'idef-e5-diagnostico',
        'idef-e6-tratamento',
      ],
    },
  ],
  caseId: 'caso-b',
  quizId: 'quiz-imunodeficiencias',
  videoId: 'video-imunodeficiencias',
  citations: [{ ref: BOOK, locator: 'cap. 20 (Imunodeficiências); caps. 16–17 (imunidade inata e adaptativa)' }, { ref: ABEM }],
  competencies: [
    'Reconhecimento precoce de condições graves na infância',
    'Investigação laboratorial racional e escalonada',
    'Coordenação do cuidado e encaminhamento na rede de atenção do SUS',
  ],
};

export const imunodeficienciasEpisodes: Episode[] = [
  {
    id: 'idef-e1-fundamentos',
    seriesId: 'imunodeficiencias',
    number: 1,
    title: 'Fundamentos das imunodeficiências',
    tagline: 'Cada braço da defesa deixa uma “assinatura” de infecções quando falha.',
    cover: 'imunidade-camadas',
    durationMinutes: 17,
    guidingQuestion: 'Por que pacientes com defeitos diferentes do sistema imune adoecem por micro-organismos diferentes?',
    objectives: [
      'Definir imunocompetência, imunodeficiência e imunossupressão.',
      'Diferenciar imunodeficiência primária (erro inato da imunidade) de secundária.',
      'Distinguir defeitos quantitativos e funcionais.',
      'Associar defeitos humorais, celulares, fagocíticos e do complemento a padrões de suscetibilidade.',
    ],
    keyTerms: [
      { term: 'Imunocompetência', definition: 'Capacidade de montar respostas inatas e adaptativas adequadas e reguladas.' },
      { term: 'Erro inato da imunidade (EII)', definition: 'Defeito genético (geralmente monogênico) do sistema imune; termo atual para imunodeficiência primária. Inclui também desregulação, autoinflamação e autoimunidade.' },
      { term: 'Imunodeficiência secundária', definition: 'Defeito adquirido, decorrente de infecção (ex.: HIV), fármacos, desnutrição, neoplasias ou perdas proteicas.' },
      { term: 'Defeito quantitativo', definition: 'Redução do número de células ou da concentração de moléculas (ex.: neutropenia, hipogamaglobulinemia).' },
      { term: 'Defeito funcional', definition: 'Células ou moléculas em quantidade normal, mas com função alterada (ex.: doença granulomatosa crônica).' },
    ],
    sections: [
      {
        id: 'conceitos',
        title: 'Conceitos essenciais',
        role: 'conceitos',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Imunodeficiência é a incapacidade de montar uma resposta imune eficaz, resultando em **infecções mais frequentes, mais graves, mais prolongadas, por germes incomuns ou com resposta inadequada ao tratamento**. Os erros inatos também podem se manifestar com autoimunidade, inflamação desregulada, alergia grave e neoplasias.',
              'Na **imunossupressão**, a redução da imunidade é induzida — geralmente de forma intencional e terapêutica (transplantes, doenças autoimunes) — e é uma das causas mais comuns de imunodeficiência secundária na prática.',
            ],
          },
          {
            type: 'compare',
            title: 'Primárias × secundárias',
            columns: ['Primárias (erros inatos)', 'Secundárias'],
            rows: [
              { label: 'Origem', cells: ['Genética (mais de 400 defeitos catalogados pela IUIS)', 'Adquirida'] },
              { label: 'Frequência', cells: ['Individualmente raras; em conjunto, subdiagnosticadas', 'Muito mais frequentes'] },
              { label: 'Início', cells: ['Geralmente na infância (algumas no adulto, como a ICV)', 'Qualquer idade, ligada à causa'] },
              { label: 'Exemplos', cells: ['XLA, ICV, SCID, 22q11.2, DGC, deficiências de complemento', 'HIV/AIDS, corticoides, quimioterapia, desnutrição, síndrome nefrótica'] },
            ],
          },
        ],
      },
      {
        id: 'mapa',
        title: 'O mapa: compartimento defeituoso → padrão de infecção',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'imunidade-camadas',
              alt: 'Quatro quadrantes: anticorpos (linfócitos B), linfócitos T, fagócitos e complemento, cada um com os tipos de micro-organismos mais associados a seu defeito.',
              caption: 'Cada compartimento imune protege contra grupos de patógenos característicos. O padrão de infecções aponta o defeito provável.',
              hotspots: [
                { x: 45, y: 10, label: 'Anticorpos (B)', detail: 'Bactérias encapsuladas (pneumococo, Haemophilus), infecções sinopulmonares de repetição, giárdia e enterovírus. Início após ~6 meses, quando a IgG materna declina.' },
                { x: 94, y: 10, label: 'Linfócitos T', detail: 'Vírus, fungos (Candida, Pneumocystis), micobactérias e germes intracelulares; falha de crescimento e diarreia crônica. Defeitos T geralmente comprometem também a resposta de anticorpos (combinados).' },
                { x: 45, y: 58, label: 'Fagócitos', detail: 'Abscessos profundos (pele, fígado, linfonodos), Staphylococcus aureus, Aspergillus; má cicatrização e queda tardia do coto umbilical em defeitos de adesão.' },
                { x: 94, y: 58, label: 'Complemento', detail: 'Componentes terminais (C5–C9): Neisseria de repetição. Componentes iniciais da via clássica (C1q, C2, C4): encapsulados e autoimunidade tipo lúpus.' },
              ],
            },
          },
          {
            type: 'callout',
            variant: 'conceito',
            title: 'Pense em “sistemas”, não em listas',
            body: 'Lembre o que cada braço faz no indivíduo saudável (caps. 16–17): anticorpos opsonizam e neutralizam; linfócitos T coordenam e matam células infectadas; fagócitos destroem bactérias e fungos; o complemento opsoniza, inflama e lisa. A falha de cada função prevê o tipo de infecção.',
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Ausência de linfócitos B maduros impede a produção de anticorpos.' },
              { stage: 'alteracao', text: 'Sem opsonização por IgG, bactérias encapsuladas escapam da fagocitose.' },
              { stage: 'lesao', text: 'Infecções sinopulmonares repetidas levam a bronquiectasias.' },
              { stage: 'manifestacao', text: 'Menino com otites, sinusites e pneumonias a partir dos 6 meses.' },
              { stage: 'investigacao', text: 'IgG, IgA e IgM muito baixas; ausência de CD19+ na citometria.' },
              { stage: 'conduta', text: 'Reposição de imunoglobulina e tratamento precoce das infecções.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e1-q1',
        prompt: 'Uma adolescente apresenta o segundo episódio de meningite meningocócica. Qual compartimento deve ser investigado primeiro?',
        options: [
          { id: 'a', text: 'Linfócitos T (citometria CD4/CD8)', feedback: 'Defeitos T se associam a vírus, fungos e germes intracelulares, não a Neisseria recorrente.' },
          { id: 'b', text: 'Complemento terminal (CH50/AH50)', feedback: 'Correto: deficiência de C5–C9 impede a formação do MAC, essencial contra Neisseria.' },
          { id: 'c', text: 'Explosão respiratória de neutrófilos', feedback: 'Defeitos fagocíticos predispõem a abscessos por S. aureus e fungos.' },
          { id: 'd', text: 'Apenas IgE sérica', feedback: 'IgE não se relaciona à suscetibilidade a Neisseria.' },
        ],
        correctOptionId: 'b',
        explanation: 'Neisseria recorrente é a assinatura clássica de deficiência do complemento terminal (ou de properdina). CH50 e AH50 são os exames de triagem.',
        relatedEpisodes: ['idef-e1-fundamentos', 'idef-e2-primarias'],
        tags: ['complemento', 'padrão de infecção'],
      },
    ],
    synthesis: [
      'Imunodeficiência: infecções mais frequentes, graves, prolongadas ou por germes incomuns — e também desregulação.',
      'Primárias são genéticas (EII); secundárias, adquiridas e muito mais comuns.',
      'Defeitos podem ser quantitativos ou funcionais.',
      'O padrão de infecção aponta o compartimento: B, T, fagócitos ou complemento.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: BOOK, locator: 'cap. 16, p. 112–115 — complemento e células efetoras' },
      { ref: 'tangye-2022' },
      { ref: ABEM },
    ],
    keywords: ['erros inatos da imunidade', 'IUIS', 'imunossupressão', 'encapsuladas', 'Neisseria', 'oportunistas'],
  },

  {
    id: 'idef-e2-primarias',
    seriesId: 'imunodeficiencias',
    number: 2,
    title: 'Imunodeficiências primárias',
    tagline: 'Do gene ao fenótipo: onde a maturação se interrompe.',
    cover: 'linfocitos-b-t-defeitos',
    durationMinutes: 21,
    guidingQuestion: 'Em que ponto do desenvolvimento linfocitário cada erro inato interrompe a defesa — e como isso se traduz em clínica e laboratório?',
    objectives: [
      'Descrever defeitos de linfócitos B: agamaglobulinemia ligada ao X e imunodeficiência comum variável.',
      'Descrever defeitos de linfócitos T e combinados: SCID e síndrome de deleção 22q11.2.',
      'Reconhecer defeitos de fagócitos e do complemento.',
      'Identificar doenças de desregulação imune como parte dos erros inatos.',
    ],
    keyTerms: [
      { term: 'XLA (Bruton)', definition: 'Agamaglobulinemia ligada ao X por mutação em BTK; bloqueio da maturação pré-B → B; ausência de linfócitos B circulantes.' },
      { term: 'ICV', definition: 'Imunodeficiência comum variável: hipogamaglobulinemia com resposta vacinal deficiente, B geralmente presentes; diagnóstico frequentemente no adulto.' },
      { term: 'SCID', definition: 'Imunodeficiência combinada grave: ausência ou disfunção profunda de linfócitos T (± B, NK); emergência pediátrica.' },
      { term: 'Deleção 22q11.2', definition: 'Síndrome de DiGeorge: alteração do desenvolvimento das bolsas faríngeas com hipoplasia tímica variável, cardiopatia conotruncal e hipocalcemia.' },
      { term: 'DGC', definition: 'Doença granulomatosa crônica: defeito da NADPH oxidase; fagócitos não produzem explosão respiratória.' },
    ],
    sections: [
      {
        id: 'maturacao',
        title: 'Pontos de bloqueio no desenvolvimento',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'linfocitos-b-t-defeitos',
              alt: 'Célula-tronco hematopoética originando o ramo T (via timo) e o ramo B (via medula), com barreiras marcando SCID antes dos dois ramos, deleção 22q11.2 no timo e XLA na transição pré-B para B.',
              caption: 'Onde a maturação é interrompida define quais células faltam e quais funções se perdem.',
              hotspots: [
                { x: 30, y: 62, label: 'SCID', detail: 'Bloqueio precoce do desenvolvimento T (ex.: cadeia γ comum do receptor de IL-2/IL-7, ADA, RAG). Sem T funcional, também falta ajuda aos B: defeito combinado.' },
                { x: 72, y: 45, label: '22q11.2 (timo)', detail: 'Timo hipoplásico: linfopenia T variável. A maioria tem defeito parcial; formas com ausência de timo comportam-se como SCID.' },
                { x: 60, y: 66, label: 'XLA (BTK)', detail: 'BTK é necessária para a sinalização do pré-BCR: sem ela, não há linfócitos B maduros nem plasmócitos.' },
              ],
            },
          },
        ],
      },
      {
        id: 'humorais',
        title: 'Defeitos de linfócitos B (humorais)',
        role: 'mecanismos',
        blocks: [
          {
            type: 'compare',
            title: 'XLA × ICV',
            columns: ['Agamaglobulinemia ligada ao X', 'Imunodeficiência comum variável'],
            rows: [
              { label: 'Genética', cells: ['BTK (cromossomo X) — meninos', 'Heterogênea; maioria sem causa monogênica definida'] },
              { label: 'Idade típica', cells: ['Após 6 meses (queda da IgG materna)', 'Adolescentes e adultos (pico 20–40 anos), mas pode ser na infância'] },
              { label: 'Linfócitos B (CD19+)', cells: ['Ausentes ou < 1%', 'Geralmente presentes; B de memória com troca de classe reduzidos'] },
              { label: 'Imunoglobulinas', cells: ['Todas muito baixas', 'IgG baixa + IgA e/ou IgM baixas; resposta vacinal ruim'] },
              { label: 'Achados associados', cells: ['Tonsilas e linfonodos hipoplásicos; enterovírus graves', 'Autoimunidade (citopenias), granulomas, linfoproliferação, risco de linfoma'] },
            ],
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'Deficiência seletiva de IgA',
            body: 'É o defeito humoral mais comum; muitos são assintomáticos. Alguns têm infecções, alergias ou autoimunidade. Pode haver anticorpos anti-IgA, com risco de reação a hemoderivados.',
          },
        ],
      },
      {
        id: 'celulares',
        title: 'Defeitos de linfócitos T e combinados',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'SCID — uma emergência pediátrica', body: 'Lactentes com infecções graves e persistentes (candidíase, Pneumocystis, vírus), diarreia crônica e falha de crescimento nos primeiros meses. Vacinas vivas (BCG, rotavírus) podem causar doença disseminada. Linfopenia é pista frequente. Sem transplante de células-tronco hematopoéticas (ou terapia específica), a maioria evolui para óbito precoce.' },
              { title: 'Síndrome de deleção 22q11.2', body: 'Espectro com cardiopatia conotruncal, hipocalcemia por hipoparatireoidismo, fácies característica, fenda palatina e alterações do desenvolvimento. A imunodeficiência é geralmente leve a moderada e pode melhorar com a idade; raramente é completa (exige transplante de timo).' },
              { title: 'Desregulação imune', body: 'IPEX (FOXP3), ALPS (Fas) e síndromes como deficiência de CTLA-4 mostram que erros inatos podem se manifestar mais por autoimunidade e linfoproliferação do que por infecção.' },
            ],
          },
        ],
      },
      {
        id: 'fagocitos',
        title: 'Fagócitos e complemento',
        role: 'mecanismos',
        blocks: [
          {
            type: 'compare',
            title: 'Defeitos da imunidade inata',
            columns: ['Mecanismo', 'Clínica característica', 'Exame orientador'],
            rows: [
              { label: 'Doença granulomatosa crônica', cells: ['NADPH oxidase defeituosa: sem explosão respiratória', 'Abscessos por S. aureus, Serratia, Burkholderia, Aspergillus; granulomas', 'Teste de DHR (di-hidrorrodamina) por citometria'] },
              { label: 'Deficiência de adesão leucocitária (LAD-1)', cells: ['CD18 (integrinas β2) defeituoso: neutrófilos não migram', 'Queda tardia do coto umbilical, infecções sem pus, leucocitose', 'Expressão de CD18 por citometria'] },
              { label: 'Neutropenia congênita grave', cells: ['Bloqueio da produção de neutrófilos', 'Infecções bacterianas graves e úlceras orais desde o início da vida', 'Hemograma seriado; medula óssea; genética'] },
              { label: 'Complemento terminal (C5–C9)', cells: ['Sem MAC', 'Neisseria de repetição', 'CH50/AH50'] },
              { label: 'Complemento inicial (C1q, C2, C4)', cells: ['Falha de remoção de imunocomplexos e apoptóticos', 'Encapsulados; quadro lúpus-símile', 'CH50; dosagens específicas'] },
            ],
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            title: 'Doença granulomatosa crônica',
            links: [
              { stage: 'mecanismo', text: 'Mutação em componente da NADPH oxidase.' },
              { stage: 'alteracao', text: 'Fagócitos englobam, mas não matam germes catalase-positivos.' },
              { stage: 'lesao', text: 'Abscessos profundos e granulomas obstrutivos.' },
              { stage: 'manifestacao', text: 'Abscesso hepático e linfadenite supurativa recorrente.' },
              { stage: 'investigacao', text: 'Teste de DHR anormal; confirmação genética.' },
              { stage: 'conduta', text: 'Profilaxia antibacteriana e antifúngica; TCTH em casos selecionados.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e2-q1',
        stem: 'Menino de 14 meses com otites e duas pneumonias por pneumococo. Tonsilas quase ausentes. IgG, IgA e IgM muito baixas; CD19+ < 1%.',
        prompt: 'Qual o diagnóstico mais provável?',
        options: [
          { id: 'a', text: 'Imunodeficiência comum variável', feedback: 'Na ICV os linfócitos B costumam estar presentes, e o início típico é mais tardio.' },
          { id: 'b', text: 'Agamaglobulinemia ligada ao X', feedback: 'Correto: menino, início após 6 meses, panhipogamaglobulinemia e ausência de B — mutação em BTK.' },
          { id: 'c', text: 'Deficiência seletiva de IgA', feedback: 'Nesse caso apenas IgA estaria baixa.' },
          { id: 'd', text: 'Doença granulomatosa crônica', feedback: 'DGC não reduz imunoglobulinas; causa abscessos por catalase-positivos.' },
        ],
        correctOptionId: 'b',
        explanation: 'A ausência de linfócitos B circulantes com todas as imunoglobulinas baixas em menino é a assinatura da XLA.',
        relatedEpisodes: ['idef-e2-primarias'],
        tags: ['defeitos humorais'],
      },
    ],
    synthesis: [
      'XLA: sem linfócitos B; ICV: B presentes, mas sem anticorpos eficazes.',
      'SCID: emergência — linfopenia, infecções oportunistas, risco com vacinas vivas.',
      '22q11.2: espectro com cardiopatia, hipocalcemia e defeito T variável.',
      'DGC: fagócitos sem explosão respiratória; complemento terminal: Neisseria.',
      'Erros inatos incluem desregulação e autoimunidade, não apenas infecções.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: BOOK, locator: 'cap. 17, p. 117–120 — linfócitos T e B' },
      { ref: 'tangye-2022' },
      { ref: ABEM },
    ],
    keywords: ['Bruton', 'BTK', 'XLA', 'ICV', 'SCID', 'DiGeorge', '22q11', 'DGC', 'NADPH oxidase', 'DHR', 'LAD', 'deficiência de IgA'],
  },

  {
    id: 'idef-e3-secundarias',
    seriesId: 'imunodeficiencias',
    number: 3,
    title: 'Imunodeficiências secundárias',
    tagline: 'As mais comuns na prática — e muitas vezes evitáveis ou tratáveis.',
    cover: 'hiv-cd4',
    durationMinutes: 19,
    guidingQuestion: 'Quais condições comuns no Brasil reduzem a imunidade — e como identificar o paciente em risco antes da infecção grave?',
    objectives: [
      'Explicar a fisiopatologia da imunodeficiência no HIV/AIDS.',
      'Relacionar desnutrição, fármacos, neoplasias, perdas proteicas e doenças crônicas a defeitos imunes específicos.',
      'Reconhecer a imunossenescência e suas implicações para vacinação.',
    ],
    keyTerms: [
      { term: 'HIV', definition: 'Retrovírus que infecta células CD4+ (via CD4 e correceptores CCR5/CXCR4), levando a depleção progressiva de linfócitos T CD4+.' },
      { term: 'AIDS', definition: 'Estágio avançado da infecção pelo HIV, definido por doenças oportunistas e/ou contagem de CD4 muito baixa.' },
      { term: 'Imunossenescência', definition: 'Remodelação do sistema imune com o envelhecimento: menor timopoiese, repertório T reduzido e inflamação basal (inflammaging).' },
      { term: 'Enteropatia perdedora de proteínas', definition: 'Perda intestinal de proteínas, inclusive imunoglobulinas e linfócitos.' },
    ],
    sections: [
      {
        id: 'hiv',
        title: 'HIV/AIDS: a depleção de CD4',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'hiv-cd4',
              alt: 'Vírion do HIV ligando-se ao CD4 e ao correceptor de um linfócito T e, ao lado, gráfico esquemático com queda da contagem de CD4 e aumento da carga viral ao longo dos anos sem tratamento.',
              caption: 'Curso natural esquemático sem tratamento: a queda progressiva de CD4 abre espaço para infecções oportunistas.',
            },
          },
          {
            type: 'timeline',
            title: 'História natural sem terapia antirretroviral (esquemática)',
            events: [
              { time: 'Semanas', label: 'Infecção aguda', detail: 'Alta viremia, queda transitória de CD4; pode haver síndrome retroviral aguda (febre, rash, linfadenopatia). Depleção maciça de CD4 na mucosa intestinal.' },
              { time: 'Anos', label: 'Latência clínica', detail: 'Replicação viral contínua nos tecidos linfoides, ativação imune crônica e declínio gradual de CD4.' },
              { time: 'CD4 < 200/mm³', label: 'AIDS', detail: 'Risco elevado de pneumocistose, neurotoxoplasmose, criptococose, candidíase esofágica, CMV e micobacterioses; tuberculose ocorre em qualquer faixa de CD4.' },
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'SUS e HIV',
            body: 'Testagem, terapia antirretroviral e profilaxias são oferecidas gratuitamente pelo SUS. A terapia antirretroviral é indicada para todas as pessoas vivendo com HIV, independentemente do CD4, e restaura a imunidade de forma progressiva.',
          },
        ],
      },
      {
        id: 'outras',
        title: 'Outras causas adquiridas',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'Desnutrição', body: 'Principal causa de imunodeficiência no mundo. Afeta barreiras, atrofia o timo, reduz linfócitos T e a função fagocítica. Micronutrientes (zinco, vitamina A) também importam. Infecção e desnutrição alimentam-se mutuamente.' },
              { title: 'Glicocorticoides', body: 'Reduzem migração e função de neutrófilos e monócitos, induzem linfopenia (redistribuição e apoptose) e inibem citocinas. Risco dose- e tempo-dependente: infecções bacterianas, fúngicas, reativação de TB e estrongiloidíase disseminada (relevante no Brasil).' },
              { title: 'Imunobiológicos', body: 'Cada alvo cria suscetibilidade específica: anti-TNF → tuberculose e fungos endêmicos; anti-CD20 → hipogamaglobulinemia e reativação de hepatite B; inibidores de complemento terminal (anti-C5) → Neisseria.' },
              { title: 'Quimioterapia e neoplasias', body: 'Neutropenia é o principal risco da quimioterapia (neutropenia febril é emergência). Leucemia linfocítica crônica e mieloma causam hipogamaglobulinemia funcional; linfomas e transplantes alteram imunidade T.' },
              { title: 'Perdas proteicas', body: 'Síndrome nefrótica e enteropatia perdedora de proteínas reduzem IgG (e, na enteropatia, linfócitos); queimaduras extensas rompem barreiras e perdem proteínas.' },
              { title: 'Doenças crônicas e asplenia', body: 'Diabetes mal controlado prejudica neutrófilos; doença renal crônica e cirrose alteram imunidade inata e adaptativa. Asplenia (anatômica ou funcional, como na doença falciforme) aumenta o risco de sepse por encapsulados.' },
              { title: 'Imunossenescência', body: 'Envelhecimento reduz timopoiese e diversidade de linfócitos T naïve, diminui resposta vacinal e mantém inflamação basal. Fundamenta estratégias vacinais específicas para idosos.' },
            ],
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'HIV infecta e depleta linfócitos T CD4+.' },
              { stage: 'alteracao', text: 'Perda de ajuda a macrófagos, CD8+ e linfócitos B.' },
              { stage: 'lesao', text: 'Proliferação de patógenos oportunistas (ex.: Pneumocystis nos alvéolos).' },
              { stage: 'manifestacao', text: 'Dispneia progressiva, febre, hipoxemia, candidíase oral.' },
              { stage: 'investigacao', text: 'Teste para HIV, CD4, carga viral, investigação do agente.' },
              { stage: 'conduta', text: 'Tratar a infecção oportunista, profilaxias conforme CD4 e iniciar TARV no momento indicado.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e3-q1',
        prompt: 'Paciente em uso de anti-CD20 há dois anos apresenta pneumonias de repetição. Qual exame é mais útil inicialmente?',
        options: [
          { id: 'a', text: 'Dosagem de IgG, IgA e IgM', feedback: 'Correto: anti-CD20 depleta linfócitos B e pode causar hipogamaglobulinemia secundária.' },
          { id: 'b', text: 'Teste de DHR', feedback: 'DHR avalia explosão respiratória de fagócitos, não afetada pelo anti-CD20.' },
          { id: 'c', text: 'CH50', feedback: 'O complemento não é o alvo do anti-CD20.' },
          { id: 'd', text: 'Triagem neonatal por TREC', feedback: 'TREC é triagem neonatal para linfopenia T, não se aplica aqui.' },
        ],
        correctOptionId: 'a',
        explanation: 'A depleção prolongada de linfócitos B pode reduzir a produção de imunoglobulinas — uma causa iatrogênica importante de defeito humoral.',
        relatedEpisodes: ['idef-e3-secundarias', 'idef-e5-diagnostico'],
        tags: ['secundárias', 'imunobiológicos'],
      },
    ],
    synthesis: [
      'Imunodeficiências secundárias são as mais frequentes na prática.',
      'HIV: depleção de CD4 → infecções oportunistas; TARV restaura imunidade.',
      'Cada fármaco/imunobiológico cria suscetibilidades específicas e previsíveis.',
      'Desnutrição, perdas proteicas, neoplasias, doenças crônicas e envelhecimento também reduzem a defesa.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: ABEM },
    ],
    keywords: ['HIV', 'AIDS', 'CD4', 'TARV', 'Pneumocystis', 'desnutrição', 'corticoide', 'anti-CD20', 'anti-TNF', 'neutropenia febril', 'síndrome nefrótica', 'asplenia', 'imunossenescência', 'Strongyloides'],
  },

  {
    id: 'idef-e4-manifestacoes',
    seriesId: 'imunodeficiencias',
    number: 4,
    title: 'Manifestações clínicas',
    tagline: 'Saber quando desconfiar é a habilidade que salva vidas.',
    cover: 'imunidade-camadas',
    durationMinutes: 17,
    guidingQuestion: 'Quando infecções “comuns” deixam de ser normais e passam a exigir investigação imunológica?',
    objectives: [
      'Reconhecer sinais de alerta para imunodeficiência em crianças e adultos.',
      'Diferenciar infecções recorrentes, persistentes, graves e oportunistas.',
      'Reconhecer complicações após vacinas vivas e o valor da história familiar.',
      'Elaborar diagnóstico diferencial de infecções recorrentes.',
    ],
    keyTerms: [
      { term: 'Infecção oportunista', definition: 'Causada por micro-organismo que raramente adoece pessoas imunocompetentes (ex.: Pneumocystis jirovecii).' },
      { term: 'BCGite disseminada', definition: 'Doença causada pelo bacilo da vacina BCG fora do local de aplicação, sugestiva de defeito grave da imunidade celular (ex.: SCID, defeitos do eixo IL-12/IFN-γ).' },
      { term: 'Falha de crescimento', definition: 'Ganho ponderoestatural inadequado; em imunodeficiências, associa-se a infecções crônicas e diarreia.' },
    ],
    sections: [
      {
        id: 'alerta',
        title: 'Sinais de alerta',
        role: 'conceitos',
        blocks: [
          {
            type: 'list',
            title: 'Pistas que justificam investigação',
            items: [
              'Infecções **frequentes** (ex.: várias otites ou sinusites graves por ano; duas ou mais pneumonias em um ano).',
              'Infecções **graves** ou em **sítios incomuns** (meningite, sepse, abscessos profundos).',
              'Infecções **persistentes** ou que respondem mal a antibióticos, exigindo tratamento intravenoso.',
              'Micro-organismos **oportunistas** ou incomuns (Pneumocystis, micobactérias atípicas, Aspergillus).',
              '**Candidíase oral/cutânea persistente** após o primeiro ano de vida.',
              '**Falha de crescimento** e **diarreia crônica** em lactente.',
              '**Complicação de vacina viva** (BCG disseminada, rotavírus prolongado).',
              '**História familiar** de imunodeficiência, óbitos precoces por infecção ou consanguinidade.',
              'Associação com **autoimunidade, citopenias, linfoproliferação** ou cicatrização deficiente.',
            ],
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'Listas de sinais de alerta orientam, não excluem',
            body: 'Listas de sinais de alerta (como as divulgadas por fundações e sociedades de imunologia) aumentam a suspeita, mas não substituem o raciocínio clínico. Um único evento grave — como BCG disseminada — já justifica investigação urgente.',
          },
        ],
      },
      {
        id: 'padroes',
        title: 'Ler o padrão',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'imunidade-camadas',
              alt: 'Quatro quadrantes relacionando anticorpos, linfócitos T, fagócitos e complemento aos micro-organismos típicos de cada defeito, usados como mapa para ler o padrão de infecções.',
              caption: 'Use o mapa como ponto de partida: qual quadrante explica melhor o conjunto de infecções do paciente?',
            },
          },
          {
            type: 'compare',
            title: 'Padrão clínico → compartimento sugerido',
            columns: ['Sugere', 'Por quê'],
            rows: [
              { label: 'Sinusites, otites, pneumonias por encapsulados após 6 meses', cells: ['Defeito humoral', 'Falta de opsonização por IgG; IgG materna protege nos primeiros meses'] },
              { label: 'Candidíase persistente, diarreia, falha de crescimento nos primeiros meses', cells: ['Defeito T/combinado (SCID)', 'Linfócitos T controlam fungos, vírus e intracelulares'] },
              { label: 'Abscessos profundos, linfadenite supurativa', cells: ['Defeito de fagócitos (DGC)', 'Fagócitos não destroem germes catalase-positivos e fungos'] },
              { label: 'Neisseria recorrente', cells: ['Complemento terminal', 'MAC necessário para lise de Neisseria'] },
              { label: 'Micobactérias (incluindo BCG) disseminadas', cells: ['Eixo IL-12/IFN-γ ou SCID', 'Macrófagos dependem de IFN-γ para destruir micobactérias'] },
              { label: 'Queda tardia do coto umbilical, infecções sem pus', cells: ['Defeito de adesão leucocitária', 'Neutrófilos não saem do vaso'] },
            ],
          },
        ],
      },
      {
        id: 'diferencial',
        title: 'Diagnóstico diferencial: nem toda infecção recorrente é imunodeficiência',
        role: 'aplicacao',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'Exposição aumentada', body: 'Creches, irmãos em idade escolar e tabagismo passivo explicam muitas infecções virais de vias aéreas em crianças saudáveis com crescimento normal.' },
              { title: 'Causas anatômicas e funcionais', body: 'Fibrose cística, discinesia ciliar, refluxo e aspiração, cardiopatia congênita, corpo estranho, sequestro pulmonar — causam infecções repetidas no mesmo sítio.' },
              { title: 'Alergia', body: 'Rinite e asma podem ser confundidas com infecções de repetição (“resfriados” constantes, “pneumonias” que são crises de broncoespasmo).' },
              { title: 'Imunodeficiências secundárias', body: 'Desnutrição, HIV, uso de corticoides e doenças crônicas devem ser lembrados antes de erros inatos raros.' },
            ],
          },
          {
            type: 'callout',
            variant: 'clinica',
            title: 'Dica de raciocínio',
            body: 'Infecções recorrentes **no mesmo sítio** sugerem causa anatômica; em **sítios diferentes**, sugerem defeito imune sistêmico.',
          },
          {
            type: 'chain',
            title: 'Do sinal de alerta à conduta',
            links: [
              { stage: 'mecanismo', text: 'Defeito grave da imunidade celular (linfócitos T/eixo IL-12–IFN-γ).' },
              { stage: 'alteracao', text: 'Macrófagos não são ativados para destruir micobactérias, inclusive o bacilo vacinal.' },
              { stage: 'lesao', text: 'Disseminação do BCG para linfonodos, fígado e baço.' },
              { stage: 'manifestacao', text: 'Lactente com úlcera persistente no local da BCG, linfadenite e hepatoesplenomegalia.' },
              { stage: 'investigacao', text: 'Hemograma (linfopenia?), citometria T/B/NK, imunoglobulinas e pesquisa micobacteriana.' },
              { stage: 'conduta', text: 'Suspender vacinas vivas, tratar a micobacteriose e encaminhar com urgência à imunologia.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e4-q1',
        stem: 'Criança de 3 anos frequenta creche, tem 8 resfriados por ano que se resolvem sem antibiótico, crescimento adequado e exame físico normal.',
        prompt: 'Qual a conduta mais adequada?',
        options: [
          { id: 'a', text: 'Iniciar investigação genética para erros inatos', feedback: 'Sem sinais de alerta, investigação genética seria desproporcional.' },
          { id: 'b', text: 'Orientar a família: padrão compatível com exposição aumentada; reavaliar se surgirem sinais de alerta', feedback: 'Correto: infecções virais leves, autolimitadas, com crescimento normal, são esperadas em crianças de creche.' },
          { id: 'c', text: 'Iniciar reposição de imunoglobulina', feedback: 'Não há indicação sem defeito humoral comprovado.' },
          { id: 'd', text: 'Contraindicar todas as vacinas', feedback: 'Vacinação deve ser mantida; não há evidência de imunodeficiência.' },
        ],
        correctOptionId: 'b',
        explanation: 'Frequência isolada de infecções virais leves não indica imunodeficiência quando o crescimento e a evolução são normais.',
        relatedEpisodes: ['idef-e4-manifestacoes'],
        tags: ['sinais de alerta', 'diagnóstico diferencial'],
      },
      {
        id: 'idef-e4-q2',
        prompt: 'Lactente de 4 meses desenvolve lesão supurativa no local da BCG, linfadenite axilar e hepatoesplenomegalia. O que essa complicação sugere?',
        options: [
          { id: 'a', text: 'Reação local esperada da vacina', feedback: 'Disseminação com hepatoesplenomegalia não é reação local esperada.' },
          { id: 'b', text: 'Defeito grave da imunidade celular (ex.: SCID ou eixo IL-12/IFN-γ)', feedback: 'Correto: BCG disseminada sinaliza falha da imunidade mediada por linfócitos T/macrófagos.' },
          { id: 'c', text: 'Deficiência seletiva de IgA', feedback: 'Defeitos humorais não predispõem a micobactérias disseminadas.' },
          { id: 'd', text: 'Alergia a componente da vacina', feedback: 'Alergia não explica disseminação micobacteriana.' },
        ],
        correctOptionId: 'b',
        explanation: 'O controle de micobactérias depende de linfócitos T produtores de IFN-γ e de macrófagos ativados; BCG disseminada exige investigação urgente.',
        relatedEpisodes: ['idef-e4-manifestacoes', 'idef-e2-primarias'],
        tags: ['vacinas vivas', 'imunidade celular'],
      },
    ],
    synthesis: [
      'Desconfie de infecções frequentes, graves, persistentes, oportunistas ou em sítios incomuns.',
      'Falha de crescimento, diarreia crônica e candidíase persistente no lactente sugerem defeito T.',
      'Complicação de vacina viva e história familiar são sinais de alarme maiores.',
      'Considere exposição, causas anatômicas, alergia e causas secundárias no diferencial.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: 'tangye-2022' },
      { ref: ABEM },
    ],
    keywords: ['sinais de alerta', 'BCG', 'candidíase', 'diarreia crônica', 'falha de crescimento', 'abscessos', 'história familiar', 'consanguinidade', 'oportunistas'],
  },

  {
    id: 'idef-e5-diagnostico',
    seriesId: 'imunodeficiencias',
    number: 5,
    title: 'Investigação diagnóstica',
    tagline: 'Do hemograma ao gene: uma investigação em camadas.',
    cover: 'citometria-subpopulacoes',
    durationMinutes: 20,
    guidingQuestion: 'Qual a sequência racional de exames diante da suspeita de imunodeficiência — e como interpretar cada resultado na idade certa?',
    objectives: [
      'Interpretar hemograma (linfopenia, neutropenia) com valores de referência por idade.',
      'Interpretar imunoglobulinas e resposta vacinal.',
      'Compreender citometria de fluxo de subpopulações T, B e NK.',
      'Usar CH50/AH50, testes funcionais e diagnóstico molecular.',
      'Explicar a triagem neonatal por TREC.',
    ],
    keyTerms: [
      { term: 'Linfopenia', definition: 'Contagem de linfócitos abaixo do esperado para a idade; lactentes têm valores normais muito mais altos que adultos.' },
      { term: 'Citometria de fluxo', definition: 'Técnica que identifica e quantifica populações celulares por marcadores de superfície (CD3, CD4, CD8, CD19, CD16/56).' },
      { term: 'TREC', definition: 'Círculos de excisão do receptor de células T: DNA epissomal gerado no rearranjo do TCR; baixos níveis indicam baixa produção tímica.' },
      { term: 'CH50 / AH50', definition: 'Ensaios hemolíticos que avaliam a integridade funcional da via clássica (CH50) e alternativa (AH50) do complemento.' },
    ],
    sections: [
      {
        id: 'escalonada',
        title: 'Investigação em camadas',
        role: 'mecanismos',
        blocks: [
          {
            type: 'flow',
            title: 'Fluxograma de investigação (clique em cada nível)',
            intro: 'A escolha dos exames é guiada pelo padrão clínico. A sequência abaixo é um roteiro geral.',
            steps: [
              { label: 'Nível 1 — Hemograma com diferencial', detail: 'Linfopenia (atenção aos valores para a idade: no lactente, < 2.500–3.000/mm³ já chama atenção), neutropenia, plaquetas pequenas (síndrome de Wiskott-Aldrich). Barato e disponível na Atenção Primária.' },
              { label: 'Nível 1 — Imunoglobulinas séricas', detail: 'IgG, IgA, IgM (e IgE se indicado), sempre comparadas a valores de referência para a idade. Excluir perdas (proteinúria, enteropatia).' },
              { label: 'Nível 2 — Resposta vacinal', detail: 'Anticorpos contra antígenos proteicos (tétano, difteria) e polissacarídicos (pneumococo) avaliam a função humoral, mesmo com imunoglobulinas normais.' },
              { label: 'Nível 2 — Citometria de fluxo', detail: 'Subpopulações CD3, CD4, CD8, CD19 e NK (CD16/56); quando indicado, linfócitos T naïve, B de memória e Treg.' },
              { label: 'Nível 2 — Complemento', detail: 'CH50 (via clássica) e AH50 (via alternativa). Ambos baixos → componente terminal; só CH50 → via clássica inicial; só AH50 → via alternativa.' },
              { label: 'Nível 3 — Testes funcionais', detail: 'Proliferação linfocitária a mitógenos e antígenos; DHR para explosão respiratória; expressão de CD18; eixo IL-12/IFN-γ.' },
              { label: 'Nível 3 — Diagnóstico molecular', detail: 'Painéis genéticos ou sequenciamento de exoma: confirmam o defeito, permitem aconselhamento genético e, às vezes, terapia específica.' },
            ],
          },
        ],
      },
      {
        id: 'citometria',
        title: 'Citometria: lendo as subpopulações',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'citometria-subpopulacoes',
              alt: 'Gráfico de barras comparando contagens ilustrativas de CD3, CD4, CD8, CD19 e NK entre um lactente de referência e três fenótipos: SCID T−B+NK−, SCID T−B−NK+ e XLA.',
              caption: 'Fenótipos ilustrativos (valores didáticos, não de referência laboratorial). O padrão de células ausentes orienta o gene a investigar.',
            },
          },
          {
            type: 'compare',
            title: 'Fenótipos linfocitários típicos',
            columns: ['T (CD3)', 'B (CD19)', 'NK (CD16/56)', 'Exemplo'],
            rows: [
              { label: 'SCID T−B+NK−', cells: ['Ausentes', 'Presentes (não funcionais)', 'Ausentes', 'Deficiência da cadeia γ comum (IL2RG, ligada ao X) ou JAK3'] },
              { label: 'SCID T−B−NK+', cells: ['Ausentes', 'Ausentes', 'Presentes', 'Defeitos de RAG1/RAG2 ou Artemis (recombinação V(D)J)'] },
              { label: 'SCID T−B−NK−', cells: ['Ausentes', 'Ausentes', 'Ausentes', 'Deficiência de ADA (metabólito tóxico para linfócitos)'] },
              { label: 'XLA', cells: ['Normais', 'Ausentes', 'Normais', 'BTK'] },
            ],
            note: 'Atenção: em SCID, linfócitos T maternos transferidos pela placenta podem “mascarar” a linfopenia; a avaliação de T naïve e a análise de quimerismo ajudam.',
          },
        ],
      },
      {
        id: 'trec',
        title: 'Triagem neonatal por TREC',
        role: 'aplicacao',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Durante o rearranjo do TCR no timo, segmentos de DNA são excisados e formam círculos (TREC) que não se replicam. Sua quantidade no sangue reflete a **produção recente de linfócitos T pelo timo**. A dosagem por PCR em gota de sangue seco (a mesma do “teste do pezinho”) identifica recém-nascidos com SCID **antes** das infecções.',
              'Em paralelo, os **KREC** (círculos do rearranjo de cadeia κ) avaliam a produção de linfócitos B, ajudando a detectar agamaglobulinemias.',
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'Teste do pezinho ampliado',
            body: 'A Lei nº 14.154/2021 incluiu as **imunodeficiências primárias na etapa 4** da ampliação do Programa Nacional de Triagem Neonatal. Previsão legal, porém, não é o mesmo que oferta real: a implantação é escalonada, e iniciativas estaduais ou projetos não representam a rotina nacional. Antes de orientar uma família, confirme em fontes oficiais se o TREC é oferecido no seu estado (por exemplo, na Paraíba), qual laboratório executa e qual é o fluxo confirmatório.',
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Triagem ≠ diagnóstico',
            body: 'TREC baixo é um resultado de **triagem**: exige confirmação por citometria de fluxo (e, depois, genética). Prematuridade, síndromes com linfopenia e outras condições também reduzem TREC.',
          },
          {
            type: 'chain',
            title: 'Triagem neonatal por TREC',
            links: [
              { stage: 'mecanismo', text: 'Mutação impede o desenvolvimento tímico de linfócitos T.' },
              { stage: 'alteracao', text: 'Poucos rearranjos do TCR → TREC muito baixo no sangue do recém-nascido.' },
              { stage: 'lesao', text: 'Ainda sem lesão: a triagem identifica o defeito antes das infecções.' },
              { stage: 'manifestacao', text: 'Recém-nascido assintomático com triagem alterada.' },
              { stage: 'investigacao', text: 'Repetir/confirmar, citometria T/B/NK (incluindo T naïve) e genética.' },
              { stage: 'conduta', text: 'Medidas protetoras imediatas e encaminhamento para TCTH precoce.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e5-q1',
        prompt: 'CH50 baixo com AH50 normal sugere deficiência em qual parte do complemento?',
        options: [
          { id: 'a', text: 'Componentes terminais C5–C9', feedback: 'Defeito terminal reduziria tanto CH50 quanto AH50.' },
          { id: 'b', text: 'Componentes iniciais da via clássica (C1, C4, C2)', feedback: 'Correto: apenas a via clássica está comprometida.' },
          { id: 'c', text: 'Fator B ou properdina', feedback: 'Defeitos da via alternativa reduziriam AH50.' },
          { id: 'd', text: 'Nenhuma — o resultado é sempre artefato', feedback: 'Coleta inadequada pode causar resultados falsamente baixos, mas o padrão tem interpretação definida.' },
        ],
        correctOptionId: 'b',
        explanation: 'CH50 explora a via clássica até o MAC; AH50, a alternativa até o MAC. Se apenas CH50 está baixo, o defeito está nos componentes exclusivos da via clássica.',
        relatedEpisodes: ['idef-e5-diagnostico', 'idef-e2-primarias'],
        tags: ['complemento', 'interpretação'],
      },
      {
        id: 'idef-e5-q2',
        prompt: 'Lactente de 3 meses tem 1.200 linfócitos/mm³ no hemograma. Como interpretar?',
        options: [
          { id: 'a', text: 'Normal — adultos têm valores semelhantes', feedback: 'Lactentes têm contagens normais muito mais altas que adultos.' },
          { id: 'b', text: 'Linfopenia significativa para a idade, que exige investigação com citometria', feedback: 'Correto: para um lactente, esse valor é muito baixo e pode ser a primeira pista de SCID.' },
          { id: 'c', text: 'Esperado após vacinação', feedback: 'Vacinação não causa linfopenia significativa persistente.' },
          { id: 'd', text: 'Irrelevante sem infecção', feedback: 'Na SCID, a linfopenia pode preceder as infecções graves.' },
        ],
        correctOptionId: 'b',
        explanation: 'Valores de referência dependem da idade. A linfopenia em lactente é uma pista barata e precoce de defeito grave de linfócitos T.',
        relatedEpisodes: ['idef-e5-diagnostico'],
        tags: ['hemograma', 'linfopenia'],
      },
    ],
    synthesis: [
      'Comece simples: hemograma e imunoglobulinas, interpretados para a idade.',
      'Resposta vacinal avalia função humoral; citometria define fenótipo celular.',
      'CH50/AH50 localizam defeitos do complemento.',
      'Testes funcionais e genéticos confirmam e orientam a terapia.',
      'TREC é triagem neonatal — resultado alterado exige confirmação.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: 'tangye-2022' },
      { ref: 'lei-14154-2021' },
      { ref: ABEM },
    ],
    keywords: ['hemograma', 'linfopenia', 'neutropenia', 'imunoglobulinas', 'citometria', 'CD3', 'CD4', 'CD19', 'NK', 'CH50', 'AH50', 'DHR', 'TREC', 'KREC', 'teste do pezinho', 'exoma', 'resposta vacinal'],
  },

  {
    id: 'idef-e6-tratamento',
    seriesId: 'imunodeficiencias',
    number: 6,
    title: 'Tratamento e prevenção',
    tagline: 'Proteger hoje, corrigir amanhã, acompanhar sempre.',
    cover: 'linfocitos-b-t-defeitos',
    durationMinutes: 19,
    guidingQuestion: 'O que fazer imediatamente após suspeitar de uma imunodeficiência grave — e como organizar o cuidado de longo prazo?',
    objectives: [
      'Priorizar medidas protetoras imediatas na suspeita de SCID.',
      'Explicar a terapia de reposição de imunoglobulinas e suas indicações.',
      'Discutir antibioticoprofilaxia, TARV, vacinação e contraindicações.',
      'Reconhecer o papel do transplante de células-tronco hematopoéticas e de terapias específicas.',
      'Organizar acompanhamento multidisciplinar e encaminhamento no SUS.',
    ],
    keyTerms: [
      { term: 'Reposição de imunoglobulina', definition: 'Administração periódica de IgG policlonal humana (intravenosa ou subcutânea) em defeitos de produção de anticorpos.' },
      { term: 'TCTH', definition: 'Transplante de células-tronco hematopoéticas: reconstitui o sistema imune a partir de doador; tratamento de escolha para SCID.' },
      { term: 'Hemocomponente irradiado', definition: 'Sangue tratado com radiação para inativar linfócitos do doador e prevenir doença do enxerto contra o hospedeiro transfusional.' },
    ],
    sections: [
      {
        id: 'imediato',
        title: 'Medidas imediatas na suspeita de SCID',
        role: 'aplicacao',
        blocks: [
          {
            type: 'flow',
            title: 'Proteger antes de confirmar',
            intro: 'A confirmação diagnóstica pode levar dias a semanas; as medidas de proteção não devem esperar.',
            steps: [
              { label: 'Não aplicar vacinas vivas', detail: 'Suspender BCG, rotavírus e outras vacinas vivas para o paciente; avaliar contactantes.' },
              { label: 'Isolamento protetor', detail: 'Reduzir exposição a infecções; precauções hospitalares.' },
              { label: 'Hemocomponentes seguros', detail: 'Usar apenas hemocomponentes irradiados (e leucorreduzidos/CMV-seguros) para evitar doença do enxerto contra o hospedeiro transfusional.' },
              { label: 'Profilaxias', detail: 'Profilaxia para Pneumocystis e, conforme o caso, antifúngica e antiviral; investigar e tratar BCG se aplicada.' },
              { label: 'Reposição de imunoglobulina', detail: 'Iniciar enquanto se aguarda o transplante.' },
              { label: 'Amamentação', detail: 'Avaliar sorologia materna para CMV — o vírus pode ser transmitido pelo leite; decisão individualizada com a equipe especializada.' },
              { label: 'Encaminhamento urgente', detail: 'Contato imediato com centro de referência em imunologia e transplante; tipagem HLA do paciente e da família.' },
            ],
          },
        ],
      },
      {
        id: 'terapias',
        title: 'Terapias específicas',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'linfocitos-b-t-defeitos',
              alt: 'Desenvolvimento de linfócitos a partir da célula-tronco hematopoética, com bloqueios em SCID, deleção 22q11.2 e XLA, usado para mostrar onde cada terapia atua.',
              caption: 'Onde cada terapia atua: o TCTH substitui a célula-tronco (corrige SCID); a imunoglobulina repõe o produto final que falta na XLA (sem corrigir a célula); formas atímicas de 22q11.2 exigem transplante de timo.',
            },
          },
          {
            type: 'expandable',
            items: [
              { title: 'Reposição de imunoglobulina', body: 'Indicada em defeitos de produção de anticorpos (XLA, ICV, defeitos combinados). Fornece IgG contra uma ampla variedade de patógenos. A dose é ajustada pelo nível de vale e, sobretudo, pela resposta clínica. No SUS, é fornecida conforme PCDT específico.' },
              { title: 'Antibioticoprofilaxia em situações selecionadas', body: 'Ex.: sulfametoxazol-trimetoprima contra Pneumocystis em defeitos T e em HIV com CD4 baixo; profilaxia antibacteriana/antifúngica na DGC; profilaxia em asplenia. Não substitui a correção do defeito.' },
              { title: 'Terapia antirretroviral', body: 'Na infecção pelo HIV, a TARV suprime a replicação viral e permite a recuperação de CD4, reduzindo drasticamente infecções oportunistas.' },
              { title: 'Transplante de células-tronco hematopoéticas', body: 'Curativo para SCID e várias outras imunodeficiências graves. Resultados são melhores quando realizado **precocemente e antes de infecções graves** — razão da triagem neonatal.' },
              { title: 'Terapias específicas', body: 'Reposição enzimática (deficiência de ADA), terapia gênica em centros selecionados, interferon-γ na DGC, terapias-alvo em síndromes de desregulação (ex.: abatacepte na deficiência de CTLA-4).' },
            ],
          },
          {
            type: 'compare',
            title: 'Vacinação em imunodeficiências (princípios gerais)',
            columns: ['Vacinas inativadas', 'Vacinas vivas atenuadas'],
            rows: [
              { label: 'Defeitos T graves/combinados', cells: ['Seguras, mas resposta pode ser ruim', 'Contraindicadas'] },
              { label: 'Defeitos humorais graves (XLA)', cells: ['Seguras; benefício limitado em reposição de IgG', 'Algumas contraindicadas (ex.: pólio oral)'] },
              { label: 'DGC', cells: ['Recomendadas', 'BCG contraindicada; outras avaliadas caso a caso'] },
              { label: 'Contactantes domiciliares', cells: ['Recomendadas (inclusive influenza)', 'Em geral permitidas, com precauções específicas'] },
            ],
            note: 'Princípios didáticos. Consulte o Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE) e o especialista para cada caso.',
          },
        ],
      },
      {
        id: 'cuidado',
        title: 'Cuidado longitudinal no SUS',
        role: 'aplicacao',
        blocks: [
          {
            type: 'callout',
            variant: 'sus',
            title: 'Rede de cuidado',
            body: 'O reconhecimento começa na **Atenção Primária** (sinais de alerta, hemograma). O encaminhamento segue para serviços especializados em imunologia; os **CRIE** orientam vacinação especial; o **Componente Especializado** dispensa imunoglobulina conforme PCDT; transplantes ocorrem em centros habilitados. A coordenação entre esses pontos é parte da competência médica.',
          },
          {
            type: 'list',
            title: 'Acompanhamento multidisciplinar',
            items: [
              'Imunologia, infectologia, pneumologia (bronquiectasias), gastroenterologia, nutrição.',
              'Fisioterapia respiratória, saúde mental e apoio escolar/social.',
              'Aconselhamento genético para a família.',
              'Educação do paciente: sinais de infecção que exigem atendimento imediato.',
            ],
          },
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Ausência de linfócitos T funcionais (SCID).' },
              { stage: 'alteracao', text: 'Sem controle de vírus, fungos e micobactérias, inclusive vacinais.' },
              { stage: 'lesao', text: 'Pneumonite, enterite e BCG disseminada.' },
              { stage: 'manifestacao', text: 'Lactente com infecções graves e falha de crescimento.' },
              { stage: 'investigacao', text: 'Linfopenia → citometria → genética (ou TREC baixo na triagem).' },
              { stage: 'conduta', text: 'Proteção imediata + imunoglobulina + profilaxias + TCTH precoce.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'idef-e6-q1',
        stem: 'Lactente com suspeita forte de SCID aguarda resultado de exame genético e precisa de transfusão de concentrado de hemácias.',
        prompt: 'Qual cuidado é indispensável?',
        options: [
          { id: 'a', text: 'Aguardar o exame genético antes de qualquer transfusão', feedback: 'Atrasar uma transfusão necessária por aguardar a confirmação diagnóstica é inadequado.' },
          { id: 'b', text: 'Utilizar hemocomponente irradiado', feedback: 'Correto: linfócitos viáveis do doador podem causar doença do enxerto contra o hospedeiro transfusional, geralmente fatal em SCID.' },
          { id: 'c', text: 'Aplicar BCG antes da transfusão', feedback: 'Vacinas vivas são contraindicadas na suspeita de SCID.' },
          { id: 'd', text: 'Usar sangue total fresco de familiar', feedback: 'Doação dirigida de familiar não irradiada aumenta o risco de doença do enxerto contra o hospedeiro.' },
        ],
        correctOptionId: 'b',
        explanation: 'As medidas protetoras são iniciadas pela suspeita — não pela confirmação. A irradiação inativa linfócitos do doador.',
        relatedEpisodes: ['idef-e6-tratamento'],
        tags: ['SCID', 'medidas protetoras'],
      },
    ],
    synthesis: [
      'Na suspeita de SCID, proteger imediatamente: sem vacinas vivas, hemocomponentes irradiados, profilaxias.',
      'Reposição de IgG trata defeitos de anticorpos; TCTH é curativo para SCID quando precoce.',
      'Vacinação exige avaliação individual; vacinas vivas são contraindicadas em defeitos T graves.',
      'O cuidado é em rede: APS, especialistas, CRIE, Componente Especializado e centros de transplante.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Imunodeficiências' },
      { ref: 'pcdt-idp-anticorpos' },
      { ref: 'lei-14154-2021' },
      { ref: 'tangye-2022' },
      { ref: ABEM },
    ],
    keywords: ['imunoglobulina', 'IVIG', 'subcutânea', 'TCTH', 'transplante de medula', 'profilaxia', 'Pneumocystis', 'irradiado', 'CRIE', 'vacinas vivas', 'terapia gênica', 'ADA'],
  },
];
