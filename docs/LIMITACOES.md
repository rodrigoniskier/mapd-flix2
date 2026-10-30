# Limitações e pendências reais

1. **Next.js não utilizado.** O registro npm estava bloqueado no ambiente de desenvolvimento; o app foi feito com React + TypeScript + Tailwind + esbuild (todos testados). A migração para Next.js está descrita em `ARQUITETURA.md`.
2. **Site na Vercel ainda não publicado.** O código está em https://github.com/rodrigoniskier/mapd-flix2 (branch `master`). Falta apenas importar o repositório na Vercel (*Add New → Project*), pois não havia login da Vercel no ambiente. Endereço do site: a preencher após a importação.
3. **Paginação da obra-base.** O manuscrito consultado não tem paginação; os caps. 19, 20 e 22 são citados sem página. Na versão do manuscrito, imunidade inata e adaptativa são os caps. 17 e 18 (no prompt e nos slides do autor: 16 e 17). Recomenda-se conferir a numeração com a edição impressa (ISBN 9798187758487).
4. **Vídeos.** Verificados por metadados (disponibilidade, duração, canal, incorporação). O conteúdo falado deve ser assistido pelo docente antes do uso. O vídeo de Autoimunidade é em inglês (legendas em inglês; tradução automática para português).
5. **Incorporação de vídeo em ambientes restritos.** Em alguns hospedeiros (ex.: páginas com política de conteúdo restritiva), o `iframe` do YouTube pode não carregar; o link direto permanece.
6. **Fontes.** Inter e Bebas Neue (licença SIL OFL) estão embutidas no próprio arquivo; o app não depende mais do Google Fonts nem de qualquer recurso externo, exceto os vídeos do YouTube.
7. **Progresso apenas local.** Não há sincronização entre dispositivos nem acompanhamento docente — a arquitetura está preparada (armazenamento injetável e modelo versionado).
8. **Revisão docente.** O conteúdo foi alinhado à obra-base e a referências verificáveis, mas deve ser revisado pelo autor antes do uso com estudantes, especialmente doses, condutas e informações sobre disponibilidade no SUS (TREC, PCDT), que mudam com o tempo.
9. **Acessibilidade.** Auditoria automática com axe-core 4.10 (WCAG 2.1 A/AA + boas práticas) e medição de contraste sobre as fotos: 0 violações. Não houve teste com leitores de tela reais (NVDA/VoiceOver), que a auditoria automática não substitui.
10. **Séries futuras.** Antitumoral e Transplantes aparecem como “Em breve”, sem conteúdo.
11. **Vinheta e som.** A abertura no estilo “N + tudum” não foi reproduzida por ser marca registrada da Netflix; foi criada uma abertura original. O som só toca após um clique (exigência dos navegadores) e é sintetizado no próprio navegador.
12. **Fotografias.** São fotos reais de banco de imagens (Unsplash), com modelos e cenários genéricos; não retratam pacientes reais nem as doenças específicas de cada episódio. Créditos em “Fontes”.
13. **Perfis.** São locais (por navegador). Qualquer pessoa pode abrir o perfil “Rodrigo”; ele não é protegido por senha. O e-mail institucional fica visível na janela “Sobre o professor” e no rodapé.
14. **Contraste sobre fotos.** A auditoria mede o fundo real atrás de cada texto nas telas testadas; fotos novas ou trocadas devem passar de novo pela auditoria (`scripts/contraste`).
