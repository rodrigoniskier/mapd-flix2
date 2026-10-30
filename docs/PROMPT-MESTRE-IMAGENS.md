# Prompt mestre — 19 figuras didáticas do MAPD-Flix

**Como usar**

1. Abra uma conversa nova no ChatGPT (modelo com geração de imagens) e cole **tudo** o que está abaixo da linha `=== INÍCIO DO PROMPT ===` até `=== FIM DO PROMPT ===`.
2. O ChatGPT **não grava arquivos na sua pasta**. Ele gera cada imagem na conversa: baixe cada uma e salve em `mapd-flix/imagens-ia/` **com o nome exato indicado** (ex.: `timo-selecao.png`). O nome é a chave da substituição automática.
3. Se o ChatGPT parar no meio (limite de imagens), escreva "continue da figura N".
4. Quando as 19 estiverem na pasta, peça aqui: "substitua as imagens". Eu troco no código, reposiciono os pontos clicáveis (hotspots) e testo.

=== INÍCIO DO PROMPT ===

Você é ilustrador científico especializado em imunologia clínica. Vou pedir **19 figuras didáticas** para uma plataforma de ensino de Imunologia para estudantes de Medicina (MAPD-Flix). Gere **uma imagem por vez**, na ordem numerada, e antes de cada imagem escreva só uma linha: `Figura N — nome-do-arquivo`. Ao final de cada imagem não comente nada além disso. Se atingir algum limite, avise qual foi a última figura concluída e espere eu pedir para continuar.

## Especificações técnicas (valem para todas)

- Formato horizontal **1536 × 1024 px** (proporção 3:2), PNG, **fundo liso quase branco (#F7F8FA)**, sem moldura, sem sombra de borda, sem marca d'água, sem assinatura.
- **Nome de arquivo** exatamente o indicado em cada figura (minúsculas, hífens, extensão `.png`).
- Margens internas de ~5% em todos os lados; nada importante encostado na borda. Elementos principais bem separados entre si, para que eu possa sobrepor 2 a 4 marcadores numerados clicáveis sem cobrir informação.

## Estilo (idêntico em todas, para formar uma série coerente)

- Ilustração científica **vetorial plana** (flat), contornos limpos de espessura uniforme (~3 px, cor grafite #1F2937), cantos arredondados, leve gradiente interno apenas para dar volume. Estilo de livro-texto moderno / infográfico médico. **Nada fotorrealista, sem 3D pesado, sem estética de desenho infantil.**
- **Texto**: apenas rótulos curtos em **português do Brasil**, fonte sem serifa (tipo Inter/Helvetica), cor grafite, tamanho legível mesmo reduzido a 800 px de largura. **Revise a ortografia e os acentos** de cada rótulo. Siglas padrão (IgE, IgG, C3b, CD4, TCR, MHC, IL-2, TNF…) são permitidas. Sem parágrafos, sem texto decorativo, sem números de marcador (eu os adicionarei).
- **Código de cores das células e moléculas — use sempre os mesmos**:
  - Linfócito T: azul #60A5FA · Linfócito B / plasmócito: violeta #A78BFA · Treg: verde-esmeralda #34D399
  - Célula apresentadora de antígeno / dendrítica: âmbar #F59E0B · Macrófago: laranja #FB923C · Neutrófilo: rosa #F472B6
  - Mastócito: vermelho-coral #F87171 (grânulos amarelo-claro #FDE68A) · NK: ciano #22D3EE
  - IgG: amarelo-âmbar #FBBF24 · IgE: rosa #F472B6 · Complemento: verde #4ADE80
  - Antígeno/autoantígeno (próprio): cinza-azulado #94A3B8 · Micro-organismo: verde-limão #A3E635 · Hemácia: vermelho #EF4444
  - HIV: magenta #E879F9 · MHC: azul-céu #38BDF8 · Peptídeo: amarelo #FACC15 · Dano/lesão: vermelho forte #EF4444
- Setas: grafite, pontas triangulares simples; setas de **inibição** com barra (⊣) em vermelho; setas de **ativação** em verde-escuro.
- Composição clara, com hierarquia de leitura da esquerda para a direita e de cima para baixo. Sem elementos supérfluos.
- Rigor científico: respeite a anatomia e o mecanismo descritos. Se houver dúvida, simplifique em vez de inventar.

## As 19 figuras

**1 — `timo-selecao.png` · Seleção no timo**
Corte esquemático de um lóbulo tímico, com **córtex** (anel externo, tom mais escuro) e **medula** (centro, tom mais claro). Timócitos azuis entram pelo córtex (canto superior esquerdo), passam por **seleção positiva** (reconhecimento fraco do MHC próprio → sobrevive; sem reconhecimento → morre por negligência) e migram para a medula. Na medula, uma **célula epitelial tímica medular** expressa antígenos teciduais sob controle de **AIRE** (rótulo "AIRE") e apresenta autoantígenos; timócitos de **alta afinidade** por autoantígenos são eliminados (**apoptose**, ícone de célula fragmentada) ou desviados para **Treg** (célula verde, rótulo "Treg FOXP3+"). Em um canto inferior direito, linfócitos T maduros saem para a circulação. Rótulos: "Córtex — seleção positiva", "Medula", "AIRE", "Seleção negativa (apoptose)", "Treg", "Saída para a periferia".

**2 — `treg-supressao.png` · Mecanismos de supressão pelas Treg**
No centro, uma **Treg verde** entre uma **célula dendrítica âmbar** (à esquerda) e um **linfócito T efetor azul** (à direita). Quatro frentes de ação, cada uma com seta e rótulo curto: (a) "CTLA-4 retira B7" — a Treg capta as moléculas B7 da célula dendrítica (seta de inibição sobre a coestimulação CD28 do T efetor); (b) "IL-10 e TGF-β" — pequenas partículas saindo da Treg em direção ao T efetor com seta de inibição; (c) "Consumo de IL-2" — a Treg capta moléculas de IL-2 (receptor CD25) que faltam ao T efetor; (d) o T efetor aparece com ativação reduzida (cor esmaecida).

**3 — `mimetismo-molecular.png` · Mimetismo molecular**
Duas células apresentadoras lado a lado, uma à esquerda carregando um **peptídeo microbiano** (verde-limão) e outra à direita carregando um **peptídeo próprio** (cinza-azulado) de **formato quase idêntico**, ambos em moléculas MHC (azul-céu). Acima, **um único linfócito T azul** com TCR que encaixa nos dois peptídeos (setas duplas). À esquerda, pequena bactéria como origem do peptídeo microbiano; à direita, um tecido próprio (ex.: células de tecido) sendo atacado (indicador de dano). Rótulos: "Peptídeo microbiano", "Peptídeo próprio", "Mesmo TCR", "Reação cruzada → autoimunidade".

**4 — `mecanismos-lesao-autoimune.png` · Três rotas de lesão autoimune**
Painel dividido em **três colunas** verticais com títulos no topo: **(coluna 1) "Autoanticorpo contra alvo fixo"** — células ou receptor de membrana recobertos por anticorpos (IgG âmbar), com complemento/fagócito agindo; **(coluna 2) "Imunocomplexos"** — complexos antígeno–anticorpo circulantes depositados na parede de um vaso, com complemento (verde) e neutrófilos (rosa); **(coluna 3) "Linfócitos T"** — linfócitos CD4 e CD8 (azuis) infiltrando um tecido, com uma célula-alvo sendo lisada (CD8) e macrófago ativado (CD4). Títulos no alto de cada coluna, bem visíveis; o conteúdo de cada coluna deve ficar centrado na coluna.

**5 — `complemento-vias.png` · Vias do complemento**
Esquema em funil: **três entradas** à esquerda/topo — "Via clássica (C1q + IgG/IgM)", "Via das lectinas (MBL)", "Via alternativa (C3 hidrolisado, properdina)" — que **convergem em C3** (caixa central). Da convergência saem **três efeitos** à direita: "C3b — opsonização" (ícone de bactéria recoberta e fagócito), "C5a — inflamação / recrutamento de leucócitos" (ícone de neutrófilo atraído), "C5b-9 — complexo de ataque à membrana" (poro na membrana de uma célula/bactéria, lise). Cor verde para todo o sistema complemento.

**6 — `anticorpo-estrutura.png` · Estrutura da IgG**
Uma grande molécula de **IgG em Y**, centralizada, bem legível: duas **cadeias pesadas** e duas **leves**, regiões variáveis e constantes diferenciadas por tom. Os dois braços superiores = **Fab** (cada um ligando um **antígeno** cinza-azulado na ponta); a haste inferior = **Fc**. Mostre à direita da haste Fc um **receptor Fc** em fagócito/NK e o **C1q** (complemento) ligando-se ao Fc. Chaves/colchetes e rótulos: "Fab — define o alvo", "Fc — define o efeito", "Região variável", "Região constante", "Antígeno", "Receptor Fc", "C1q".

**7 — `fan-padroes.png` · Padrões de FAN em células HEp-2**
**Quatro células HEp-2** estilizadas lado a lado (1 linha, 4 colunas), cada uma como círculo/oval com **núcleo** e citoplasma, **fundo escuro (azul-marinho) dentro de cada célula para simular imunofluorescência**, com fluorescência verde-maçã: (1) **Nuclear homogêneo** — núcleo todo preenchido uniformemente; (2) **Nuclear pontilhado** — núcleo com salpicado fino de pontos, nucléolos poupados; (3) **Nucleolar** — 1 a 3 manchas brilhantes dentro do núcleo; (4) **Centromérico** — ~46 pequenos pontos discretos distribuídos no núcleo. Abaixo de cada célula, o nome do padrão. Rodapé em itálico: "Representação didática — não é microfotografia". As quatro células devem ficar bem espaçadas e alinhadas (centros em ~13%, 38%, 63% e 88% da largura).

**8 — `imunossupressao-alvos.png` · Alvos dos imunossupressores**
Linha de ativação imune da esquerda para a direita: "Apresentação de antígeno" (célula dendrítica) → "Ativação do linfócito T" → "Proliferação" → "Linfócito B / plasmócito" → "Citocinas (TNF, IL-6…)". Sobre cada etapa, um **marcador (escudo ou etiqueta vermelha com barra de inibição)** indicando o fármaco: **Glicocorticoides** (amplo, sobre várias etapas/transcrição de citocinas), **Antiproliferativos** — "micofenolato, azatioprina" (sobre a proliferação), **Anti-CD20** — "rituximabe" (sobre o linfócito B), **Anti-TNF** — "infliximabe, adalimumabe" (sobre a citocina TNF). Aviso pequeno no rodapé: "Mapa simplificado".

**9 — `imunidade-camadas.png` · Mapa: compartimento defeituoso → padrão de infecção**
Quatro **quadrantes** (2×2) com títulos: **superior esquerdo "Anticorpos (linfócitos B)"** — bactérias encapsuladas (pneumococo, Haemophilus), infecções sinopulmonares recorrentes; **superior direito "Linfócitos T"** — vírus, fungos, oportunistas (Pneumocystis, CMV, Candida); **inferior esquerdo "Fagócitos"** — bactérias catalase-positivas e fungos (Staphylococcus, Aspergillus), abscessos; **inferior direito "Complemento"** — Neisseria. Cada quadrante com o ícone da célula/molécula do compartimento (B violeta, T azul, neutrófilo/macrófago rosa/laranja, complemento verde) e 2–3 pequenos ícones de micro-organismos com nome. Títulos grandes no topo de cada quadrante.

**10 — `linfocitos-b-t-defeitos.png` · Pontos de bloqueio no desenvolvimento linfocitário**
Árvore de desenvolvimento: **célula-tronco hematopoética** (topo, centro) → ramo **T** (descendo à direita, passando pelo **timo** → linfócito T maduro) e ramo **B** (descendo à esquerda/centro, **medula óssea**: pró-B → pré-B → **linfócito B** → plasmócito). **Três barreiras** (barras vermelhas atravessando o caminho) com rótulos: "**SCID**" logo após a célula-tronco, antes dos dois ramos (afeta T e B); "**Deleção 22q11.2**" no timo (ramo T); "**XLA (BTK)**" na transição pré-B → B. Rótulo auxiliar: "Onde a maturação é interrompida define o que falta".

**11 — `hiv-cd4.png` · HIV e depleção de CD4**
Metade esquerda: ilustração molecular — um **vírion do HIV** (magenta, envelope com gp120 em espículas) ligando-se ao **CD4** e ao **correceptor CCR5/CXCR4** na superfície de um **linfócito T CD4+** (azul). Metade direita: **gráfico esquemático** "Curso natural sem tratamento", eixo x "Anos", com duas curvas: **contagem de CD4** (azul) caindo lentamente de ~1000 para abaixo de 200 células/µL, e **carga viral** (magenta) com pico precoce, queda a um platô e aumento tardio. Faixa sombreada na região final: "Infecções oportunistas (CD4 < 200)". Eixos e legenda simples.

**12 — `citometria-subpopulacoes.png` · Citometria de fluxo: subpopulações linfocitárias**
**Gráfico de barras agrupadas**. Eixo x: "CD3 (T)", "CD4", "CD8", "CD19 (B)", "NK". Eixo y: "% do valor de referência para a idade", com marcas 0, 50, 100%. Quatro séries por grupo, com legenda no topo: **Referência** (cinza, 100% em todos); **SCID T−B+NK−** (azul: CD3 3, CD4 3, CD8 3, CD19 110, NK 4); **SCID T−B−NK+** (violeta: CD3 3, CD4 3, CD8 3, CD19 3, NK 100); **XLA** (âmbar: CD3 100, CD4 100, CD8 100, CD19 1, NK 100). Barras de 3–4% devem aparecer como tocos mínimos, mas visíveis. Nota no rodapé em itálico: "Valores ilustrativos — não são referência laboratorial". Respeite exatamente as alturas.

**13 — `gell-coombs.png` · Classificação de Gell e Coombs**
Quatro **quadrantes** (2×2) com título em cada um: **superior esquerdo "Tipo I — imediata"**: mastócito com IgE ligada liberando grânulos após ligação do alérgeno; **superior direito "Tipo II — citotóxica"**: anticorpos (IgG) sobre a superfície de uma célula, com complemento/fagócito; **inferior esquerdo "Tipo III — imunocomplexos"**: imunocomplexos depositados na parede de um vaso, com neutrófilos; **inferior direito "Tipo IV — tardia"**: linfócito T ativando macrófago (setas, citocinas). Numeração romana grande (I, II, III, IV) em cada quadrante. Cada título no topo do quadrante, bem visível.

**14 — `mastocito-degranulacao.png` · Degranulação do mastócito (tipo I)**
Um **mastócito** grande (vermelho-coral) ocupando o centro, com núcleo e **grânulos** amarelos. Na membrana, moléculas de **IgE** (rosa) ligadas ao receptor **FcεRI**. Na parte superior esquerda, um **alérgeno multivalente** fazendo **ligação cruzada** entre duas IgE vizinhas (destaque, com halo). À direita, **grânulos liberando mediadores pré-formados** ("Histamina, triptase" — saindo da célula); na parte inferior, mediadores **neoformados** ("Leucotrienos, prostaglandinas") e "Citocinas" (IL-4, IL-5, IL-13) saindo pela base/esquerda. Setas de sequência numeradas não são necessárias (eu adiciono marcadores).

**15 — `tipo2-citotoxicidade.png` · Hipersensibilidade tipo II — três modos de ação**
Imagem dividida ao meio. **Esquerda "Destruição celular"**: **hemácia** (vermelho) recoberta por **IgG** (âmbar) com **complemento** (verde) formando poros (MAC), e um **macrófago** (laranja) fagocitando; indique também ADCC por NK (ciano) em um pequeno detalhe. **Direita "Alteração funcional de receptores"**: dois receptores de membrana — um com **anticorpo estimulante** ("Graves — estimula o receptor de TSH", seta verde de ativação) e outro com **anticorpo bloqueador** ("Miastenia gravis — bloqueia o receptor de acetilcolina", seta de inibição vermelha). Sem destruição celular na metade direita.

**16 — `imunocomplexo-deposicao.png` · Deposição de imunocomplexos (tipo III)**
**Corte transversal de um pequeno vaso** no centro: lúmen com sangue, endotélio e parede. **Imunocomplexos** (antígeno cinza-azulado + anticorpo âmbar, formando pequenas redes) **depositados na parede vascular** (parte superior-central da imagem), ativando **complemento** (verde) com liberação de **C5a** (à esquerda, na parte inferior, com seta atraindo células) e **neutrófilos** (rosa) migrando e **liberando enzimas** (pequenas estrelas) que lesam o endotélio (à direita, na parte inferior). Rótulos: "Depósito de imunocomplexos", "Complemento → C5a", "Neutrófilos", "Lesão do endotélio".

**17 — `tipo4-celular.png` · Hipersensibilidade tipo IV — mecanismo celular**
Duas vias lado a lado. **Via 1 (esquerda e centro)**: **célula dendrítica** (âmbar) apresentando antígeno via MHC II a um **linfócito Th1** (azul), que libera **IFN-γ** (partículas) e ativa um **macrófago** (laranja, "Macrófago ativado") na direita; indique também Th17 → neutrófilos como detalhe. **Via 2 (parte inferior)**: **linfócito T CD8+ citotóxico** (azul-escuro) liberando **perforina e granzimas** sobre uma **célula-alvo** (que apresenta peptídeo em MHC I). Rótulos: "Apresentação", "IFN-γ", "Macrófago ativado", "CD8+ citotóxico → lise da célula-alvo". Título de rodapé: "Hipersensibilidade tardia (48–72 h)".

**18 — `triptase-curva.png` · Curva de triptase sérica na anafilaxia**
**Gráfico de linha**. Eixo x não linear (horas): 0; 0,5; 1; 2; 4; 6; 12; 24. Eixo y: "Triptase sérica (µg/L)". Curva: basal ≈ 4 µg/L em 0 h → sobe para ~12 em 0,5 h → **pico ≈ 18 em 1 h** → ~16 em 2 h → ~11 em 4 h → ~8 em 6 h → ~5 em 12 h → volta ao basal (~4) em 24 h. Faixa amarela translúcida entre 0,5 h e 2 h com rótulo "Coleta aguda (30 min – 2 h)". Marcador (losango ou círculo vazado) em 24 h: "Coleta do basal (≥ 24 h)". Linha horizontal tracejada no nível basal. Estilo limpo, ponto em cada vértice da curva.

**19 — `anafilaxia-adrenalina.png` · Adrenalina IM na anafilaxia**
À esquerda, **silhueta de uma coxa** (vista lateral, estilo plano) com a **face anterolateral** destacada (círculo ou alvo) e uma **seringa/autoinjetor** aplicando por via intramuscular (indique ângulo de 90° e a profundidade do músculo vasto lateral). À direita, **três setas/ícones de efeito**: "**α1** — vasoconstrição, reduz edema e hipotensão" (vaso contraído), "**β1** — aumenta força e frequência cardíaca" (coração), "**β2** — broncodilatação e menor liberação de mediadores" (brônquio dilatado + mastócito estabilizado). Rótulo geral: "Adrenalina IM — face anterolateral da coxa".

## Verificação final

Depois das 19, liste em uma tabela: número, nome do arquivo e uma frase confirmando que **todos os rótulos estão em português correto**. Aponte qualquer figura em que você teve de simplificar o mecanismo.

=== FIM DO PROMPT ===

## Observações para mim (não colar no ChatGPT)

- **Total:** 19 figuras únicas. Algumas são reaproveitadas em vários lugares: `imunidade-camadas` e `linfocitos-b-t-defeitos` em 2 episódios cada; `fan-padroes`, `citometria-subpopulacoes`, `imunocomplexo-deposicao`, `triptase-curva` e `anafilaxia-adrenalina` em um episódio **e** em um caso clínico.
- **Pontos clicáveis (hotspots):** 10 figuras têm marcadores numerados sobre a imagem (`timo-selecao`, `mecanismos-lesao-autoimune`, `anticorpo-estrutura`, `fan-padroes`, `imunidade-camadas`, `linfocitos-b-t-defeitos`, `gell-coombs`, `mastocito-degranulacao`, `imunocomplexo-deposicao`, `tipo4-celular`). As coordenadas atuais são do desenho antigo; vou reposicioná-las em cada imagem nova ao substituir.
- **Fundo claro:** escolhido para funcionar também na impressão em A4; na tela, a figura ficará num cartão claro sobre o fundo escuro do site.
- **Texto gerado por IA** costuma errar acentos; ao receber as imagens, vou conferir os rótulos e listar o que precisar ser regenerado.
