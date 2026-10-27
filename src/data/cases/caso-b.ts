import type { ClinicalCase } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const casoB: ClinicalCase = {
  id: 'caso-b',
  seriesId: 'imunodeficiencias',
  title: 'Caso Clínico B — Lactente com infecções recorrentes',
  hook: 'Cinco meses de vida, três internações. Má sorte — ou um sistema imune que não está lá?',
  setting: 'Pronto-atendimento pediátrico → enfermaria → centro de referência (SUS)',
  objectives: [
    'Reconhecer sinais de alerta de imunodeficiência grave no lactente.',
    'Interpretar linfopenia segundo valores para a idade.',
    'Escalonar a investigação até citometria e genética.',
    'Priorizar medidas protetoras urgentes antes da confirmação diagnóstica.',
  ],
  disclaimer:
    'Caso fictício construído para fins educacionais. Condutas apresentadas em contexto didático; decisões reais exigem avaliação individual e protocolos vigentes.',
  relatedEpisodes: ['idef-e2-primarias', 'idef-e4-manifestacoes', 'idef-e5-diagnostico', 'idef-e6-tratamento'],
  citations: [
    { ref: BOOK, locator: 'cap. 22 — Casos integrados de Imunologia; cap. 20' },
    { ref: 'tangye-2022' },
    { ref: 'lei-14154-2021' },
    { ref: ABEM },
  ],
  steps: [
    {
      id: 'b1',
      title: 'Etapa 1 — História clínica',
      narrative: [
        'Lucas, 5 meses, chega ao pronto-atendimento com **tosse, taquipneia e febre** há 4 dias. É sua **terceira pneumonia**; as duas anteriores exigiram internação.',
        'A mãe relata **“sapinho” na boca desde o 2º mês**, que volta logo após o tratamento, e **diarreia** quase diária há 6 semanas. O peso caiu do percentil 50 ao nascer para **abaixo do percentil 3**.',
        'Pais saudáveis, não consanguíneos. **Um tio materno morreu com 8 meses** “de pneumonia”. Recebeu BCG ao nascer e as vacinas do calendário, incluindo rotavírus.',
      ],
      findings: [
        { label: 'FR', value: '68 irpm', flag: 'alto' },
        { label: 'SatO2', value: '89% em ar ambiente', flag: 'baixo' },
        { label: 'Orofaringe', value: 'Placas esbranquiçadas extensas', flag: 'alterado' },
        { label: 'Linfonodos e tonsilas', value: 'Não palpáveis / não visualizadas', flag: 'alterado' },
        { label: 'Estado nutricional', value: 'Emagrecido, peso < p3', flag: 'alterado' },
      ],
      decision: {
        prompt: 'Qual a principal hipótese a ser considerada, além do tratamento da pneumonia?',
        options: [
          { id: 'b1o1', text: 'Imunodeficiência grave com comprometimento de linfócitos T — o conjunto preenche vários sinais de alerta', quality: 'prioritaria', consequence: 'Você amplia o raciocínio além do episódio agudo.', rationale: 'Infecções graves e repetidas, candidíase persistente, diarreia crônica, falha de crescimento e óbito precoce de tio materno (sugere herança ligada ao X) apontam para defeito T/combinado.' },
          { id: 'b1o2', text: 'Exposição aumentada por frequentar creche', quality: 'inadequada', consequence: 'Você subestima um quadro potencialmente fatal.', rationale: 'Exposição não explica candidíase persistente, falha de crescimento e pneumonias graves em lactente de 5 meses.' },
          { id: 'b1o3', text: 'Alergia à proteína do leite de vaca explicando diarreia e déficit de peso', quality: 'aceitavel', consequence: 'É um diferencial de diarreia, mas não explica candidíase e pneumonias graves.', rationale: 'A hipótese não unifica os achados.' },
        ],
      },
      teachingPoint: 'História familiar de óbito precoce por infecção em parente do sexo masculino do lado materno sugere herança ligada ao X.',
    },
    {
      id: 'b2',
      title: 'Etapa 2 — Complicação após BCG',
      narrative: [
        'No exame detalhado, o pediatra nota **úlcera com secreção no local da BCG** e **linfadenite axilar esquerda** com flutuação. A ultrassonografia mostra **hepatoesplenomegalia**.',
      ],
      findings: [
        { label: 'Cicatriz da BCG', value: 'Úlcera ativa aos 5 meses', flag: 'alterado' },
        { label: 'Linfonodo axilar', value: 'Linfadenite supurativa', flag: 'alterado' },
        { label: 'Fígado e baço', value: 'Aumentados', flag: 'alterado' },
      ],
      decision: {
        prompt: 'Como interpretar e o que fazer?',
        options: [
          { id: 'b2o1', text: 'Suspeita de BCG disseminada — sinal de defeito grave da imunidade celular; investigar micobactéria e acionar a imunologia', quality: 'prioritaria', consequence: 'A equipe de infectologia colhe amostras e discute tratamento antimicobacteriano.', rationale: 'Disseminação da BCG indica falha da imunidade mediada por linfócitos T e macrófagos (SCID, defeitos do eixo IL-12/IFN-γ).' },
          { id: 'b2o2', text: 'Reação local habitual da vacina', quality: 'inadequada', consequence: 'A doença micobacteriana progride sem tratamento.', rationale: 'Linfadenite supurativa com hepatoesplenomegalia não é reação habitual.' },
          { id: 'b2o3', text: 'Reaplicar a BCG para reforçar a imunidade', quality: 'inadequada', consequence: 'Agravaria a doença: vacinas vivas são contraindicadas na suspeita de defeito T.', rationale: 'Nunca administrar vacinas vivas quando há suspeita de imunodeficiência celular.' },
        ],
      },
      teachingPoint: 'Complicação de vacina viva é um sinal de alarme maior.',
    },
    {
      id: 'b3',
      title: 'Etapa 3 — Hemograma com linfopenia',
      narrative: ['O hemograma da admissão é revisado com atenção à contagem de linfócitos.'],
      findings: [
        { label: 'Leucócitos', value: '5.200/mm³', flag: 'normal' },
        { label: 'Neutrófilos', value: '4.400/mm³', flag: 'normal' },
        { label: 'Linfócitos', value: '520/mm³', flag: 'baixo', reference: 'Lactente de 5 meses: tipicamente > 3.000' },
        { label: 'Hemoglobina', value: '9,8 g/dL', flag: 'baixo' },
        { label: 'Plaquetas', value: '310.000/mm³', flag: 'normal' },
      ],
      decision: {
        prompt: 'Qual a interpretação correta da linfopenia?',
        options: [
          { id: 'b3o1', text: 'Linfopenia grave para a idade — reforça a hipótese de SCID e exige citometria de fluxo urgente', quality: 'prioritaria', consequence: 'Você solicita imunofenotipagem com urgência.', rationale: 'Lactentes têm contagem de linfócitos muito maior que adultos; 520/mm³ é muito baixo e pode ser a pista mais precoce.' },
          { id: 'b3o2', text: 'Contagem normal, semelhante à de adultos', quality: 'inadequada', consequence: 'A pista principal é desperdiçada.', rationale: 'Valores de referência dependem da idade.' },
          { id: 'b3o3', text: 'Linfopenia explicada apenas pela infecção aguda; repetir em 2 meses', quality: 'aceitavel', consequence: 'Infecções podem reduzir linfócitos, mas o contexto não permite esperar.', rationale: 'Com sinais de alerta e BCG disseminada, a investigação não deve ser adiada.' },
        ],
      },
      teachingPoint:
        'A partir daqui, a suspeita de SCID já justifica proteção imediata — sem vacinas vivas, apenas hemocomponentes irradiados, isolamento protetor e contato com a imunologia — enquanto a citometria é processada.',
    },
    {
      id: 'b4',
      title: 'Etapa 4 — Subpopulações linfocitárias',
      narrative: ['A citometria de fluxo e as imunoglobulinas ficam prontas em 48 horas.'],
      findings: [
        { label: 'CD3+ (T)', value: '45/mm³', flag: 'baixo', reference: 'Lactente: ~2.500–5.500' },
        { label: 'CD4+', value: '30/mm³', flag: 'baixo' },
        { label: 'CD8+', value: '12/mm³', flag: 'baixo' },
        { label: 'CD19+ (B)', value: '450/mm³', flag: 'normal' },
        { label: 'CD16/56+ (NK)', value: '15/mm³', flag: 'baixo' },
        { label: 'IgG', value: '110 mg/dL', flag: 'baixo', reference: 'IgG materna em declínio' },
        { label: 'IgA / IgM', value: 'Indetectável / muito baixa', flag: 'baixo' },
      ],
      visual: {
        illustration: 'citometria-subpopulacoes',
        alt: 'Gráfico comparando subpopulações linfocitárias de um lactente de referência com fenótipos de SCID.',
        caption: 'Fenótipo T−B+NK−: compatível com defeito da cadeia γ comum ou JAK3.',
      },
      decision: {
        prompt: 'Qual fenótipo e qual gene mais provável?',
        options: [
          { id: 'b4o1', text: 'SCID T−B+NK−; com herança sugestiva ligada ao X, o gene IL2RG (cadeia γ comum) é o principal candidato', quality: 'prioritaria', consequence: 'Você direciona a investigação genética.', rationale: 'A cadeia γ comum é compartilhada pelos receptores de IL-2, IL-4, IL-7, IL-9, IL-15 e IL-21; sem IL-7 não há T e sem IL-15 não há NK. Os B existem, mas sem ajuda T não produzem anticorpos.' },
          { id: 'b4o2', text: 'Agamaglobulinemia ligada ao X (BTK)', quality: 'inadequada', consequence: 'Hipótese incompatível: na XLA, os linfócitos B estão ausentes e T normais.', rationale: 'O fenótipo aqui é o inverso.' },
          { id: 'b4o3', text: 'Deficiência de ADA (T−B−NK−)', quality: 'aceitavel', consequence: 'Também causa SCID, mas os linfócitos B estariam ausentes.', rationale: 'B presentes favorecem IL2RG/JAK3.' },
        ],
      },
    },
    {
      id: 'b5',
      title: 'Etapa 5 — Análise funcional e genética',
      narrative: [
        'A proliferação linfocitária a mitógenos (fito-hemaglutinina) está **praticamente ausente**. O painel genético identifica **variante patogênica hemizigótica em IL2RG**. A mãe é portadora heterozigota.',
        'A equipe realiza aconselhamento genético. A família pergunta se o resultado do “teste do pezinho” poderia ter detectado antes.',
      ],
      findings: [
        { label: 'Proliferação a mitógenos', value: '< 10% do controle', flag: 'baixo' },
        { label: 'Genética', value: 'IL2RG — variante patogênica hemizigótica', flag: 'alterado' },
      ],
      decision: {
        prompt: 'O que responder à família sobre a triagem neonatal?',
        options: [
          { id: 'b5o1', text: 'A triagem por TREC detecta baixa produção de linfócitos T e foi incluída na etapa 4 do teste do pezinho ampliado (Lei 14.154/2021); a disponibilidade depende da implantação em cada estado', quality: 'prioritaria', consequence: 'Resposta honesta e informativa, sem gerar culpa indevida.', rationale: 'TREC é triagem e identifica SCID antes das infecções, quando o transplante tem melhores resultados.' },
          { id: 'b5o2', text: 'O teste do pezinho já detecta todas as imunodeficiências em todo o país', quality: 'inadequada', consequence: 'Informação incorreta.', rationale: 'A implantação é escalonada e o TREC não detecta todas as imunodeficiências.' },
          { id: 'b5o3', text: 'Não há como detectar SCID antes dos sintomas', quality: 'inadequada', consequence: 'Informação incorreta.', rationale: 'A triagem por TREC existe exatamente para isso.' },
        ],
      },
    },
    {
      id: 'b6',
      title: 'Etapa 6 — Intervenções protetoras urgentes',
      narrative: [
        'Na verdade, várias medidas deveriam começar **já na suspeita** (Etapa 3) — sem esperar a genética. Revise o plano.',
      ],
      decision: {
        prompt: 'Qual conjunto de medidas é prioritário?',
        options: [
          { id: 'b6o1', text: 'Isolamento protetor; nenhuma vacina viva; hemocomponentes irradiados e CMV-seguros; profilaxia para Pneumocystis; reposição de imunoglobulina; tratamento da BCG disseminada e das infecções; avaliar CMV materno e amamentação; encaminhar com urgência para TCTH e tipagem HLA da família', quality: 'prioritaria', consequence: 'Lucas é transferido estável para o centro de transplante.', rationale: 'A sobrevida na SCID depende de prevenir infecções e realizar o transplante o mais cedo possível.' },
          { id: 'b6o2', text: 'Aguardar a genética para iniciar qualquer medida', quality: 'inadequada', consequence: 'Durante a espera, uma transfusão não irradiada ou nova infecção pode ser fatal.', rationale: 'A busca do diagnóstico definitivo não pode atrasar medidas protetoras.' },
          { id: 'b6o3', text: 'Apenas antibiótico de amplo espectro e alta hospitalar', quality: 'inadequada', consequence: 'Recorrência precoce de infecções graves.', rationale: 'Tratar o episódio não corrige o defeito.' },
        ],
      },
      teachingPoint: 'Na SCID, proteger antes de confirmar: a confirmação não pode atrasar a proteção.',
    },
    {
      id: 'b7',
      title: 'Etapa 7 — Elucidação diagnóstica',
      reveal: true,
      narrative: [
        '**Diagnóstico: Imunodeficiência combinada grave (SCID) ligada ao X, por defeito da cadeia γ comum (IL2RG) — fenótipo T−B+NK−, com BCG disseminada.**',
        'Mecanismo: sem sinalização por IL-7, não há desenvolvimento de linfócitos T; sem IL-15, não há NK. Linfócitos B existem, mas não recebem ajuda T e não produzem anticorpos eficazes — defeito combinado. A proteção nos primeiros meses dependeu da IgG materna, que declinou.',
        'Por que as manifestações? Sem linfócitos T: candidíase persistente, pneumonias graves (incluindo potencialmente Pneumocystis), diarreia crônica (vírus/agentes entéricos), falha de crescimento e doença pela BCG (micobactéria viva atenuada).',
        'Desfecho esperado com conduta adequada: TCTH precoce, com reconstituição imune. A família recebe aconselhamento genético (risco de recorrência em filhos homens de mães portadoras).',
      ],
      teachingPoint: 'Linfopenia em lactente é uma pista barata e precoce. Sinais de alerta + linfopenia = citometria urgente + proteção imediata.',
    },
  ],
};
