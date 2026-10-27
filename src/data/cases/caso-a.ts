import type { ClinicalCase } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const casoA: ClinicalCase = {
  id: 'caso-a',
  seriesId: 'autoimunidade',
  title: 'Caso Clínico A — Mulher jovem com manifestações multissistêmicas',
  hook: 'Cansaço, manchas no rosto, dor nas mãos e urina espumosa. Peças soltas — ou um único quebra-cabeça?',
  setting: 'Unidade Básica de Saúde → ambulatório de especialidades (SUS)',
  objectives: [
    'Construir raciocínio diagnóstico a partir de achados multissistêmicos.',
    'Solicitar e interpretar exames imunológicos com base na probabilidade pré-teste.',
    'Relacionar mecanismos de lesão (imunocomplexos, complemento) a achados renais.',
    'Priorizar condutas e planejar acompanhamento.',
  ],
  disclaimer:
    'Caso fictício construído para fins educacionais. Condutas apresentadas em contexto didático; decisões reais exigem avaliação individual e protocolos vigentes.',
  relatedEpisodes: ['auto-e3-lesao', 'auto-e4-doencas', 'auto-e5-investigacao', 'auto-e6-tratamento'],
  citations: [
    { ref: BOOK, locator: 'cap. 22 — Casos integrados de Imunologia; cap. 19' },
    { ref: 'aringer-2019' },
    { ref: ABEM },
  ],
  steps: [
    {
      id: 'a1',
      title: 'Etapa 1 — Anamnese e exame físico',
      narrative: [
        'Joana, 24 anos, auxiliar administrativa, procura a UBS com **cansaço há 3 meses**, que piora no fim do dia, e **dor nas mãos e punhos** pela manhã, com rigidez de cerca de 40 minutos.',
        'Conta que surgiram **manchas avermelhadas no rosto** após uma viagem à praia, que “não saíram como queimadura comum”. Teve **feridas indolores no céu da boca**. Há 3 semanas nota **urina espumosa** e inchaço nos tornozelos ao fim do dia.',
        'Sem febre medida. Nega uso de medicamentos, exceto anticoncepcional oral. Mãe com hipotireoidismo.',
      ],
      findings: [
        { label: 'PA', value: '142/92 mmHg', flag: 'alto' },
        { label: 'Face', value: 'Eritema malar poupando sulcos nasolabiais', flag: 'alterado' },
        { label: 'Palato', value: 'Úlcera indolor em palato duro', flag: 'alterado' },
        { label: 'Articulações', value: 'Sinovite em 2ª e 3ª MCF bilateral, punhos dolorosos', flag: 'alterado' },
        { label: 'Membros inferiores', value: 'Edema depressível 1+/4+', flag: 'alterado' },
      ],
      decision: {
        prompt: 'Qual o melhor próximo passo na UBS?',
        options: [
          { id: 'a1o1', text: 'Solicitar hemograma, creatinina, urina tipo 1, relação proteína/creatinina urinária e FAN', quality: 'prioritaria', consequence: 'Você avalia órgãos-alvo (sangue, rim) e testa a hipótese de doença autoimune sistêmica com probabilidade pré-teste alta.', rationale: 'A clínica multissistêmica em mulher jovem eleva a probabilidade pré-teste — o FAN passa a ser informativo. Avaliar rim e sangue é obrigatório porque a lesão de órgão define gravidade e urgência.' },
          { id: 'a1o2', text: 'Prescrever anti-inflamatório e reavaliar em 3 meses', quality: 'inadequada', consequence: 'O edema e a urina espumosa progridem; o AINE pode piorar a função renal e mascarar sinais.', rationale: 'Há sinais de possível acometimento renal (edema, urina espumosa, hipertensão). Postergar a investigação atrasa o diagnóstico de uma condição potencialmente grave.' },
          { id: 'a1o3', text: 'Solicitar painel com 20 autoanticorpos sem outros exames', quality: 'aceitavel', consequence: 'Você obtém muitos resultados, mas sem avaliar a função renal e o hemograma — que definem gravidade.', rationale: 'Painéis amplos sem foco aumentam falsos-positivos e não avaliam a lesão de órgão. Melhor: FAN como triagem + exames de órgão-alvo.' },
        ],
      },
      teachingPoint: 'Fotossensibilidade, úlceras orais indolores, artrite não erosiva e sinais renais em mulher jovem formam um padrão — a anamnese define a probabilidade pré-teste.',
    },
    {
      id: 'a2',
      title: 'Etapa 2 — Resultados laboratoriais iniciais',
      narrative: ['Os exames chegam 10 dias depois.'],
      findings: [
        { label: 'Hemoglobina', value: '10,4 g/dL', flag: 'baixo', reference: '12–16' },
        { label: 'Leucócitos', value: '3.100/mm³', flag: 'baixo', reference: '4.000–11.000' },
        { label: 'Linfócitos', value: '800/mm³', flag: 'baixo', reference: '1.000–4.000' },
        { label: 'Plaquetas', value: '118.000/mm³', flag: 'baixo', reference: '150.000–450.000' },
        { label: 'Creatinina', value: '1,3 mg/dL', flag: 'alto', reference: '0,5–1,1' },
        { label: 'Urina tipo 1', value: 'Proteína 3+, hemácias 25/campo, cilindros hemáticos', flag: 'alterado' },
        { label: 'Proteína/creatinina urinária', value: '2,1 g/g', flag: 'alto', reference: '< 0,2' },
        { label: 'VHS', value: '58 mm/h', flag: 'alto' },
        { label: 'PCR', value: '0,8 mg/dL', flag: 'normal', reference: '< 1,0' },
      ],
      decision: {
        prompt: 'Como interpretar o conjunto?',
        options: [
          { id: 'a2o1', text: 'Citopenias em múltiplas linhagens e sedimento urinário ativo com proteinúria: suspeita de glomerulonefrite em doença sistêmica — investigação imunológica e avaliação nefrológica prioritárias', quality: 'prioritaria', consequence: 'Você reconhece um quadro com lesão renal ativa e acelera o encaminhamento.', rationale: 'Cilindros hemáticos indicam origem glomerular; proteinúria > 0,5 g/g e creatinina em elevação sinalizam nefrite. VHS alta com PCR pouco elevada é um padrão frequentemente descrito no LES.' },
          { id: 'a2o2', text: 'Infecção urinária: iniciar antibiótico', quality: 'inadequada', consequence: 'A proteinúria e os cilindros persistem; o tempo perdido pode custar função renal.', rationale: 'Cilindros hemáticos não são achado de cistite; indicam lesão glomerular.' },
          { id: 'a2o3', text: 'Anemia ferropriva e lesão renal por anticoncepcional', quality: 'inadequada', consequence: 'A hipótese não explica leucopenia, plaquetopenia, artrite e eritema malar.', rationale: 'Uma explicação unificadora deve contemplar todos os achados.' },
        ],
      },
      teachingPoint: 'Cilindros hemáticos = glomérulo. Citopenias de múltiplas linhagens sugerem mecanismo imune periférico (anticorpos contra células) ou medular — no contexto, a primeira hipótese é imune.',
    },
    {
      id: 'a3',
      title: 'Etapa 3 — FAN e autoanticorpos',
      narrative: ['O FAN foi colhido na primeira consulta. Com o resultado, novos anticorpos são solicitados.'],
      findings: [
        { label: 'FAN (HEp-2)', value: 'Reagente 1:1280 — padrão nuclear homogêneo', flag: 'alterado' },
        { label: 'Anti-dsDNA', value: 'Reagente, título elevado', flag: 'alterado' },
        { label: 'Anti-Sm', value: 'Reagente', flag: 'alterado' },
        { label: 'Anti-Ro/SSA', value: 'Não reagente', flag: 'normal' },
        { label: 'Antifosfolípides (anticardiolipina, anti-β2GPI, anticoagulante lúpico)', value: 'Negativos', flag: 'normal' },
        { label: 'Coombs direto', value: 'Positivo (IgG)', flag: 'alterado' },
      ],
      visual: {
        illustration: 'fan-padroes',
        alt: 'Padrões ilustrativos de FAN em HEp-2, com destaque para o padrão nuclear homogêneo.',
        caption: 'O padrão homogêneo associa-se a anti-dsDNA e antinucleossomo.',
      },
      decision: {
        prompt: 'O que esses resultados acrescentam?',
        options: [
          { id: 'a3o1', text: 'Anti-dsDNA e anti-Sm são altamente específicos; com a clínica, a probabilidade de doença autoimune sistêmica é muito alta', quality: 'prioritaria', consequence: 'Você integra especificidade dos testes e quadro clínico.', rationale: 'Com probabilidade pré-teste alta, testes específicos positivos elevam muito a probabilidade pós-teste. Coombs positivo sugere componente hemolítico autoimune (tipo II).' },
          { id: 'a3o2', text: 'O título alto do FAN, sozinho, já define o diagnóstico', quality: 'aceitavel', consequence: 'Conclusão provavelmente correta aqui, mas pelo motivo errado.', rationale: 'FAN tem baixa especificidade; o que sustenta o diagnóstico é a combinação de clínica e anticorpos específicos.' },
          { id: 'a3o3', text: 'Repetir FAN em 3 meses para confirmar', quality: 'inadequada', consequence: 'Atraso sem ganho de informação.', rationale: 'Repetir FAN não acrescenta; a nefrite ativa exige ação.' },
        ],
      },
      teachingPoint: 'Probabilidade pré-teste alta + testes específicos positivos = probabilidade pós-teste muito alta. O mesmo FAN em uma pessoa assintomática significaria muito menos.',
    },
    {
      id: 'a4',
      title: 'Etapa 4 — Complemento e investigação renal',
      narrative: [
        'No ambulatório de nefrologia/reumatologia, dosam-se complementos e indica-se biópsia renal, realizada após controle pressórico.',
      ],
      findings: [
        { label: 'C3', value: '48 mg/dL', flag: 'baixo', reference: '90–180' },
        { label: 'C4', value: '6 mg/dL', flag: 'baixo', reference: '10–40' },
        { label: 'Biópsia renal', value: 'Glomerulonefrite proliferativa difusa com depósitos de IgG, IgA, IgM, C3 e C1q (“full house”) à imunofluorescência', flag: 'alterado' },
      ],
      visual: {
        illustration: 'imunocomplexo-deposicao',
        alt: 'Imunocomplexos depositados na parede vascular com complemento e neutrófilos.',
        caption: 'Depósitos de imunocomplexos ativam a via clássica (C1q → C4 → C3) — daí C3 e C4 baixos.',
      },
      decision: {
        prompt: 'Qual a principal função da biópsia renal neste caso?',
        options: [
          { id: 'a4o1', text: 'Definir classe histológica, atividade e cronicidade da nefrite, orientando a intensidade do tratamento', quality: 'prioritaria', consequence: 'Você usa a biópsia para decidir o tratamento — não apenas para “confirmar”.', rationale: 'A classe histológica e os índices de atividade/cronicidade definem a imunossupressão e o prognóstico.' },
          { id: 'a4o2', text: 'Apenas confirmar o diagnóstico de lúpus, que ainda é duvidoso', quality: 'aceitavel', consequence: 'A biópsia contribui para o diagnóstico, mas seu maior valor aqui é terapêutico.', rationale: 'O diagnóstico sistêmico já é muito provável; a biópsia define a abordagem renal.' },
          { id: 'a4o3', text: 'Não é necessária; tratar apenas com diurético', quality: 'inadequada', consequence: 'A nefrite proliferativa sem imunossupressão pode evoluir para doença renal crônica.', rationale: 'Diurético trata edema, não o mecanismo imunológico.' },
        ],
      },
      teachingPoint: 'C3 e C4 baixos + depósitos com C1q = via clássica ativada por imunocomplexos (tipo III).',
    },
    {
      id: 'a5',
      title: 'Etapa 5 — Possíveis mecanismos de lesão',
      narrative: ['Antes de tratar, a equipe discute com os estudantes: quais mecanismos explicam cada achado?'],
      decision: {
        prompt: 'Qual associação mecanismo → achado está correta?',
        options: [
          { id: 'a5o1', text: 'Nefrite e C3/C4 baixos → imunocomplexos (tipo III); anemia com Coombs positivo → anticorpos contra hemácias (tipo II); fotossensibilidade → apoptose de queratinócitos por UV expondo antígenos nucleares', quality: 'prioritaria', consequence: 'Você explica a doença como combinação de mecanismos.', rationale: 'O LES ilustra que uma mesma doença combina mecanismos tipo II e tipo III, amplificados pelo interferon tipo I.' },
          { id: 'a5o2', text: 'Todos os achados decorrem de linfócitos T citotóxicos (tipo IV)', quality: 'inadequada', consequence: 'A explicação não justifica Coombs positivo nem consumo de complemento.', rationale: 'Linfócitos T participam, mas os efetores dominantes aqui são anticorpos e imunocomplexos.' },
          { id: 'a5o3', text: 'A nefrite é causada por IgE e mastócitos', quality: 'inadequada', consequence: 'Mecanismo incompatível com os achados histológicos.', rationale: 'Não há participação relevante de IgE na nefrite lúpica.' },
        ],
      },
      teachingPoint: 'Mecanismo imunológico → alteração funcional → lesão tecidual → manifestação: cada achado tem uma explicação causal.',
    },
    {
      id: 'a6',
      title: 'Etapa 6 — Condutas e acompanhamento',
      narrative: [
        'A equipe define o plano terapêutico com a paciente. Ela pergunta sobre gravidez no futuro e sobre os efeitos dos remédios.',
      ],
      decision: {
        prompt: 'Qual plano é mais adequado?',
        options: [
          { id: 'a6o1', text: 'Imunossupressão de indução para nefrite proliferativa (glicocorticoide + agente como micofenolato ou ciclofosfamida, conforme protocolo), hidroxicloroquina, controle pressórico com IECA/BRA, contracepção eficaz compatível, vacinação e acompanhamento regular de C3/C4, anti-dsDNA e urina', quality: 'prioritaria', consequence: 'Plano integral: trata a nefrite, protege o rim, previne complicações e respeita o projeto de vida da paciente.', rationale: 'Nefrite proliferativa exige indução; hidroxicloroquina reduz reativações; micofenolato é teratogênico — planejamento reprodutivo é parte do cuidado.' },
          { id: 'a6o2', text: 'Prednisona em dose alta isolada por tempo indeterminado', quality: 'aceitavel', consequence: 'Controle inicial possível, mas com dano cumulativo pelo corticoide e maior risco de recidiva renal.', rationale: 'Corticoide isolado não é o padrão para nefrite proliferativa e tem toxicidade importante a longo prazo.' },
          { id: 'a6o3', text: 'Somente hidroxicloroquina e reavaliação em 6 meses', quality: 'inadequada', consequence: 'A nefrite ativa progride.', rationale: 'Hidroxicloroquina é base, mas insuficiente para nefrite proliferativa.' },
        ],
      },
      teachingPoint: 'Tratar a doença, proteger contra a toxicidade e incluir a paciente nas decisões (projeto reprodutivo, adesão) — acesso a medicamentos conforme PCDT.',
    },
    {
      id: 'a7',
      title: 'Etapa 7 — Elucidação diagnóstica',
      reveal: true,
      narrative: [
        '**Diagnóstico: Lúpus eritematoso sistêmico com nefrite lúpica proliferativa difusa.**',
        'Joana preenche os critérios classificatórios EULAR/ACR 2019 (FAN ≥ 1:80 como critério de entrada; pontuação somada por lúpus cutâneo agudo, úlceras orais, artrite, leucopenia, trombocitopenia, hemólise autoimune, proteinúria, biópsia classe IV, anti-dsDNA/anti-Sm e C3/C4 baixos) — mas o diagnóstico foi **clínico-laboratorial**, construído pela integração dos achados.',
        'Mecanismos: perda de tolerância a antígenos nucleares; imunocomplexos (tipo III) com consumo de complemento pela via clássica na nefrite; anticorpos contra hemácias (tipo II) na anemia; amplificação por interferon tipo I; fotossensibilidade por apoptose induzida por UV.',
        'Seguimento: acompanhamento compartilhado entre reumatologia, nefrologia e APS; hidroxicloroquina de longo prazo; monitoramento de atividade e toxicidade; planejamento gestacional quando a doença estiver controlada.',
      ],
      teachingPoint: 'Critérios classificatórios ajudam a organizar o raciocínio, mas o diagnóstico é clínico. A investigação foi guiada por probabilidade pré-teste e pela busca de lesão de órgão.',
    },
  ],
};
