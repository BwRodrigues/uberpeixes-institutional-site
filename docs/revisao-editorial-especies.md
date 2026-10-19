# Revisão editorial e técnica das fichas de espécies

Data de consulta: 2026-10-18. Branch: `feat/expandir-catalogo-especies`; PR #7. Não autoriza merge nem publicação em produção.

## Abrangência

- Fichas identificadas automaticamente: **45**.
- Fichas revisadas individualmente: **45**, em três lotes de 15.
- Fichas ainda não revisadas nesta etapa: **0**.
- URLs, nomes científicos, categorias, fotografias e licenças preservados; nenhum novo animal cadastrado.
- A ordem das seções e os resumos são verificados também no contrato dos dados e nos testes do navegador.

## Correções editoriais e de estrutura

- Texto de pesquisa e justificativas internas retirados das páginas. Informações desconhecidas não viraram promessas; limites e divergências ficam neste relatório.
- As 14 seções seguem a sequência solicitada no conteúdo e no menu. Apresentação, água e criação ficam abertas; referências continuam fora de seções fechadas.
- O quadro após Apresentação contém temperatura, pH, GH, tamanho, volume contextualizado, comportamento, sociabilidade, dieta e dificuldade. Valores coincidem com o conteúdo detalhado; quando não existe mínimo defensável em litros, o quadro remete ao dimensionamento específico em vez de inventar um número.
- Dificuldade é uma síntese editorial das exigências verificadas (estabilidade, alimentação, porte e territorialidade), não uma escala científica validada nem garantia de sucesso.
- Descrições de montagem antes repetidas em água, criação e saúde foram separadas. Prevenção é específica, sem diagnósticos ou receitas de medicamentos.
- Navegação móvel recolhível, referências completas, HTML inicial com todo o conteúdo, logo, assinatura e WhatsApp preservados. A barra de contato ficou mais compacta no celular; áreas de rolagem e âncoras respeitam sua altura.
- A API pública recebe os resumos estruturados. O esquema permanece compatível por adição de campo, sem incluir informações privadas.

## Pesquisa, fontes e limites

- 95 URLs individuais reconferidas: 90 respostas HTTP 200; cinco páginas FishBase responderam HTTP 503 nesta rodada.
- Cada espécie possui manutenção específica do Seriously Fish e registro taxonômico individual do Catalog of Fishes reconferidos. A classificação por família e os registros GBIF completam a rastreabilidade; fontes de taxonomia não foram usadas como prova de volume mínimo.
- Aquarismo Paulista foi tentado como referência editorial, mas o proxy retornou erro de túnel HTTP 403. Nenhum texto, imagem, identidade visual ou dado foi atribuído a uma página inacessível.
- FishBase havia sido consultado na etapa anterior para as cinco fichas originais; não foi tratado como novamente acessível. Dados relevantes foram mantidos com suas referências e limitações declaradas.
- Não houve médias automáticas entre parâmetros. Comprimento padrão exclui a cauda; comprimento total não é intercambiável. Valores em milímetros foram convertidos para centímetros na mesma medida, sem estimar crescimento adicional.
- Faixas amplas de uma referência não significam que se deva alternar os extremos. Volume bruto e base não são uma regra automática de lotação; contexto do grupo e território permanece no texto.
- Relações geográficas continuam rotuladas como tal; nenhum novo par recebeu aprovação de convivência.

## Pendências e decisões importantes

- Agulhinha-prata: divergência grande entre 5,5 cm de comprimento padrão e registro de 16,1 cm de comprimento total ainda não foi reconciliada. O texto alerta para o porte; confirmar identificação/população do lote antes de definir a lotação.
- Venustus: retirados 205 L como recomendação geral para adulto/grupo. Necessário dimensionamento especializado; não foi inventado um novo mínimo.
- Acará-heckelii: base de 150 × 45 cm para casal, sem extrapolar altura/volume. Grupo demanda muito mais espaço.
- Zebra-laranja, tricogáster-azul e leeri: limites inferiores históricos não são apresentados como garantia para grupos adultos.
- Pangasius e pirarara: mantidos como peixes de instalação especializada; a escala em milhares de litros não autoriza tratá-los como adequados ao aquário doméstico.
- KH específico de manutenção e longevidade sem documentação foram omitidos dos campos públicos, sem derivar KH de GH nem inventar anos de vida. Não foram criados mínimos de grupo ou protocolos de reprodução ausentes das fontes.
- Micro-habitat pouco documentado em sumatra, bandeira, molinésia-sphenops, tetra-limão e foguinho não foi preenchido com inferências de congêneres.
- Identificação de linhagens, procedência de lotes, variantes e subdivisões geográficas exige confirmação da loja quando relevante; as fotos são referências da espécie, não comprovação de estoque.
- O estado de indexação é tratado separadamente na [auditoria de SEO](indexacao-especies.md). A revisão de conteúdo não libera automaticamente todas as fichas. Não existem selos de validação ou mensagens provisórias na interface.

## Validações

- `npm run check`: sem erros, avisos ou hints.
- `npm run build`: 45 fichas, catálogo e demais rotas estáticas.
- `npm run catalog:audit`: unicidade, hashes, fotografias, atribuições e rastreabilidade.
- `npm run test:import`: cinco testes: dois de importação OOXML e três de proteção editorial.
- Navegador: 45 testes Playwright aprovados em 3,8 minutos: desktop de 1440 px, celular de 375 px e celular de 320 px; todas as fichas, resumo, ordem, imagens, SEO, referências, teclado e conteúdo sem JavaScript.

## Revisão por espécie

### Neon-chinês — Tanichthys albonubes

- URL preservada: `/especies/neon-chines/`; lote editorial 1.
- Água: 14–22 °C; pH 6,0–8,5; GH 5–20 °dGH.
- Porte e espaço: Cerca de 4 cm sem a cauda; 54 L ou mais; grupo de 10.
- Manejo: Pacífico e ativo; Cardume de 10 ou mais; Microgrânulos e pequenos invertebrados.
- Decisão: Separados 4 cm de comprimento padrão e registros de comprimento total. Distribuição restrita mantida; não ampliar com antigas identificações. Lin, 1932 preservado, sem atribuir Linnaeus.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Tanichthys albonubes](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=3580) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — Genera/Species by Family/Subfamily](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Tanichthys albonubes — ficha de manutenção](https://www.seriouslyfish.com/species/tanichthys-albonubes/) — HTTP 200 reconferido.
  - [Tanichthys albonubes — resumo biológico](https://www.fishbase.se/summary/tanichthys-albonubes.html) — indisponível nesta rodada; consulta anterior preservada.
  - [Tanichthys albonubes — correspondência no GBIF (usada para reino e filo)](https://api.gbif.org/v1/species/match?name=Tanichthys%20albonubes) — referência complementar já registrada.

### Agulhinha Prata — Dermogenys pusilla

- URL preservada: `/especies/peixe-agulhinha/`; lote editorial 1.
- Água: 24–28 °C; pH 7,0–8,0; GH 10–20 °dGH.
- Porte e espaço: 5,5 cm sem cauda; registro de 16,1 cm total; 68 L ou mais; pequeno grupo.
- Manejo: Calma; machos disputam a superfície; Pequeno grupo com espaço de fuga; Insetos pequenos e alimento de superfície.
- Decisão: pH de manutenção passou de 6,5–8,0 para 7,0–8,0, subconjunto conservador comum às referências existentes; GH 10–20 preservado. Porte de 5,5 cm SL no Seriously Fish e 16,1 cm TL no FishBase permanece divergente, sem média. A identificação do lote deve ser confirmada antes de dimensionar o grupo.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Divergência de tamanho adulto não reconciliada; confirmação do lote necessária antes de definir lotação.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Dermogenys pusilla](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=13933) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — Genera/Species by Family/Subfamily](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Dermogenys pusilla — ficha de manutenção](https://www.seriouslyfish.com/species/dermogenys-pusilla/) — HTTP 200 reconferido.
  - [Dermogenys pusilla — resumo biológico](https://www.fishbase.se/summary/dermogenys-pusilla.html) — indisponível nesta rodada; consulta anterior preservada.
  - [Dermogenys pusilla — correspondência no GBIF (usada para reino e filo)](https://api.gbif.org/v1/species/match?name=Dermogenys%20pusilla) — referência complementar já registrada.

### Barbus cereja — Rohanella titteya

- URL preservada: `/especies/barbus-cereja/`; lote editorial 1.
- Água: 20–27 °C; pH 6,0–8,0; GH 2–20 °dGH.
- Porte e espaço: Cerca de 5 cm sem a cauda; 54 L ou mais; grupo de 6–10.
- Manejo: Muito pacífico; Grupo de 6–10 ou mais; Onívoro; ração fina e invertebrados.
- Decisão: Rohanella titteya e Cyprinidae preservados; nomes anteriores apresentados sem discurso sobre a escolha editorial. Valores SL e TL não foram convertidos entre si.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Rohanella titteya](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=31656) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — Genera/Species by Family/Subfamily](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Puntius titteya (nome anterior de Rohanella titteya) — ficha de manutenção](https://www.seriouslyfish.com/species/puntius-titteya/) — HTTP 200 reconferido.
  - [Puntius titteya (nome anterior de Rohanella titteya) — resumo biológico](https://www.fishbase.se/summary/puntius-titteya.html) — indisponível nesta rodada; consulta anterior preservada.
  - [Molecular phylogeny and systematics of the South Asian freshwater-fish genus Puntius (Teleostei: Cyprinidae)](https://researcharchive.calacademy.org/research/ichthyology/catalog/getref.asp?id=40281) — referência complementar já registrada.
  - [Puntius titteya — correspondência no GBIF (usada para reino e filo)](https://api.gbif.org/v1/species/match?name=Puntius%20titteya) — referência complementar já registrada.

### Barbo Conchônio Cereja Véu — Pethia conchonius

- URL preservada: `/especies/barbus-cereja-veu/`; lote editorial 1.
- Água: 16–24 °C; pH 6,0–8,0; GH 5–20 °dGH.
- Porte e espaço: Até 10 cm sem cauda; 14 cm total; 90 L ou mais; cardume de 8–10.
- Manejo: Pacífico e nadador ativo; Cardume de 8–10 ou mais; Onívoro; ração, vegetais e invertebrados.
- Decisão: Pethia conchonius preservado, sem confundir com Rohanella titteya. Faixa fresca 16–24 °C e cardume 8–10 preservados; 10 cm SL e 14 cm TL distinguidos.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Pethia conchonius](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=2612) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — Genera/Species by Family/Subfamily](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Pethia conchonius — ficha de manutenção e variedades ornamentais](https://www.seriouslyfish.com/species/pethia-conchonius/) — HTTP 200 reconferido.
  - [Pethia conchonius — resumo biológico](https://www.fishbase.se/summary/Pethia-conchonius.html) — indisponível nesta rodada; consulta anterior preservada.
  - [Pethia conchonius — correspondência no GBIF (usada para reino e filo)](https://api.gbif.org/v1/species/match?name=Pethia%20conchonius) — referência complementar já registrada.

### Barbus Denizoni — Dawkinsia denisonii

- URL preservada: `/especies/barbus-denizoni/`; lote editorial 1.
- Água: 15–25 °C; pH 6,5–7,8; GH 5–25 °dGH.
- Porte e espaço: Até 11 cm sem cauda; 15 cm total; 243 L ou mais; grupo de 6–10.
- Manejo: Pacífico e muito ativo; Grupo de 6–10 ou mais; Ração, invertebrados e componente vegetal.
- Decisão: Dawkinsia denisonii preservado, com nomes históricos. Comprimentos de 11 cm SL e 15 cm TL mantidos como medidas distintas. Oxigenação e necessidade de grupo priorizadas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Dawkinsia denisonii](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=46829) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — Genera/Species by Family/Subfamily](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Dawkinsia denisonii — ficha de manutenção](https://www.seriouslyfish.com/species/dawkinsia-denisonii/) — HTTP 200 reconferido.
  - [Dawkinsia denisonii — resumo biológico](https://www.fishbase.se/summary/sahyadria-denisonii.html) — indisponível nesta rodada; consulta anterior preservada.
  - [Molecular phylogeny and divergence of major clades in the Puntius complex (Teleostei: Cypriniformes)](https://researcharchive.calacademy.org/research/ichthyology/catalog/getref.asp?id=37805) — referência complementar já registrada.
  - [Sahyadria denisonii — correspondência no GBIF (usada para reino e filo)](https://api.gbif.org/v1/species/match?name=Sahyadria%20denisonii) — referência complementar já registrada.

### Barbo-gema — Pethia gelius

- URL preservada: `/especies/pethia-gelius/`; lote editorial 1.
- Água: 18–24 °C; pH 6,0–7,0; GH 1–10 °dGH.
- Porte e espaço: Até 4 cm sem a cauda; 54 L ou mais; cardume de 8–10.
- Manejo: Pacífico e tímido; Cardume de 8–10 ou mais; Micropredador; ração fina e artêmia.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Pethia gelius](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=1558) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Pethia gelius — manutenção e história natural](https://www.seriouslyfish.com/species/pethia-gelius/) — HTTP 200 reconferido.
  - [Pethia gelius — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Pethia%20gelius) — referência complementar já registrada.

### Barbo-ouro — Barbodes semifasciolatus

- URL preservada: `/especies/barbodes-semifasciolatus/`; lote editorial 1.
- Água: 16–24 °C; pH 6,0–8,0; GH 2–20 °dGH.
- Porte e espaço: Até 7,5 cm sem a cauda; 81 L ou mais; grupo de 8–10.
- Manejo: Pacífico e ativo; Grupo de 8–10 ou mais; Onívoro com componente vegetal.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Barbodes semifasciolatus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=2006) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Barbodes semifasciolatus — manutenção e história natural](https://www.seriouslyfish.com/species/barbodes-semifasciolatus/) — HTTP 200 reconferido.
  - [Barbodes semifasciolatus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Barbodes%20semifasciolatus) — referência complementar já registrada.

### Barbo-sumatra — Puntigrus tetrazona

- URL preservada: `/especies/puntigrus-tetrazona/`; lote editorial 1.
- Água: 20–26 °C; pH 5,0–8,0; GH 1–20 °dGH.
- Porte e espaço: Até 6 cm sem a cauda; 72 L ou mais; grupo de 8–10.
- Manejo: Ativo; pode beliscar nadadeiras; Grupo de 8–10 ou mais; Ração variada, invertebrados e vegetais.
- Decisão: Habitat natural detalhado não confirmado: removida a explicação de pesquisa da página, sem substituí-la por habitat de congêneres. Comportamento de beliscar e grupo preservados.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Puntigrus tetrazona](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=51825) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Puntigrus tetrazona — manutenção e história natural](https://www.seriouslyfish.com/species/puntigrus-tetrazona/) — HTTP 200 reconferido.
  - [Puntigrus tetrazona — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Puntigrus%20tetrazona) — referência complementar já registrada.

### Paulistinha — Danio rerio

- URL preservada: `/especies/danio-rerio/`; lote editorial 1.
- Água: 18–25 °C; pH 6,0–8,0; GH 5–20 °dGH.
- Porte e espaço: Até 5 cm sem a cauda; 81 L ou mais; grupo de 8–10.
- Manejo: Pacífico e muito ativo; Grupo de 8–10 ou mais; Microgrânulos, dáfnias e artêmia.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Danio rerio](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=1979) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Danio rerio — manutenção e história natural](https://www.seriouslyfish.com/species/danio-rerio/) — HTTP 200 reconferido.
  - [Danio rerio — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Danio%20rerio) — referência complementar já registrada.

### Betta — Betta splendens

- URL preservada: `/especies/betta-splendens/`; lote editorial 1.
- Água: 22–30 °C; pH 6,0–8,0; GH 1–15 °dGH.
- Porte e espaço: Até 7 cm sem a cauda; Cerca de 40 L ou mais; um indivíduo.
- Manejo: Territorial; pode atacar outros bettas; Um indivíduo; sexos separados; Ração para betta e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Betta splendens](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=19458) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Betta splendens — manutenção e história natural](https://www.seriouslyfish.com/species/betta-splendens/) — HTTP 200 reconferido.
  - [Betta splendens — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Betta%20splendens) — referência complementar já registrada.

### Dojo — Misgurnus anguillicaudatus

- URL preservada: `/especies/misgurnus-anguillicaudatus/`; lote editorial 1.
- Água: 18–23 °C; pH 6,0–8,0; GH 1–12 °dGH.
- Porte e espaço: Até 28 cm sem a cauda; 243 L ou mais; ampliar para vários.
- Manejo: Geralmente pacífico; come animais muito pequenos; Pode viver só; ativo com conspecíficos; Ração de fundo e invertebrados.
- Decisão: Distribuição atual restrita à China mantida; não tratar toda distribuição histórica como nativa. Água fresca e proteção contra fuga priorizadas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Misgurnus anguillicaudatus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=2327) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Misgurnus anguillicaudatus — manutenção e história natural](https://www.seriouslyfish.com/species/misgurnus-anguillicaudatus/) — HTTP 200 reconferido.
  - [Misgurnus anguillicaudatus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Misgurnus%20anguillicaudatus) — referência complementar já registrada.

### Aulonocara-stuartgranti — Aulonocara stuartgranti

- URL preservada: `/especies/aulonocara-stuartgranti/`; lote editorial 1.
- Água: 23–29 °C; pH 7,5–9,0; GH 10–25 °dGH.
- Porte e espaço: Até 13 cm sem a cauda; 243 L ou mais; grupo bem planejado.
- Manejo: Macho territorial; Um macho com 4–6 fêmeas; Pequenos alimentos de origem aquática.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Aulonocara stuartgranti](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=8048) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Aulonocara stuartgranti — manutenção e história natural](https://www.seriouslyfish.com/species/aulonocara-stuartgranti/) — HTTP 200 reconferido.
  - [Aulonocara stuartgranti — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Aulonocara%20stuartgranti) — referência complementar já registrada.

### Auratus — Melanochromis auratus

- URL preservada: `/especies/melanochromis-auratus/`; lote editorial 1.
- Água: 24–28 °C; pH 7,6–8,8; GH 10–25 °dGH.
- Porte e espaço: Até 11 cm sem a cauda; 205 L como limite inferior; ampliar o projeto.
- Manejo: Muito agressivo e territorial; Um macho com várias fêmeas; Ração com algas e componente vegetal.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Melanochromis auratus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=38508) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Melanochromis auratus — manutenção e história natural](https://www.seriouslyfish.com/species/melanochromis-auratus/) — HTTP 200 reconferido.
  - [Melanochromis auratus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Melanochromis%20auratus) — referência complementar já registrada.

### Labidochromis yellow — Labidochromis caeruleus

- URL preservada: `/especies/labidochromis-caeruleus/`; lote editorial 1.
- Água: 24–28 °C; pH 7,7–8,6; GH 10–25 °dGH.
- Porte e espaço: Até 10 cm sem a cauda; 154 L ou mais; grupo planejado.
- Manejo: Relativamente calmo para um mbuna; Várias fêmeas por macho; Ração variada com componente vegetal.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Labidochromis caeruleus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=25522) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Labidochromis caeruleus — manutenção e história natural](https://www.seriouslyfish.com/species/labidochromis-caeruleus/) — HTTP 200 reconferido.
  - [Labidochromis caeruleus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Labidochromis%20caeruleus) — referência complementar já registrada.

### Lombardoi — Maylandia lombardoi

- URL preservada: `/especies/maylandia-lombardoi/`; lote editorial 1.
- Água: 24–28 °C; pH 7,6–8,8; GH 10–25 °dGH.
- Porte e espaço: Até 15 cm sem a cauda; 205 L como limite inferior; ampliar o projeto.
- Manejo: Muito agressivo e territorial; Um macho com várias fêmeas; Ração vegetal, algas e complementos.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Maylandia lombardoi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=9436) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Maylandia lombardoi — manutenção e história natural](https://www.seriouslyfish.com/species/maylandia-lombardoi/) — HTTP 200 reconferido.
  - [Maylandia lombardoi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Maylandia%20lombardoi) — referência complementar já registrada.

### Socolofi — Chindongo socolofi

- URL preservada: `/especies/chindongo-socolofi/`; lote editorial 2.
- Água: 24–28 °C; pH 7,6–8,8; GH 10–25 °dGH.
- Porte e espaço: Até 11,5 cm sem a cauda; 154 L ou mais; grupo planejado.
- Manejo: Territorial, sobretudo entre machos; Várias fêmeas por macho; Ração com algas e vegetais.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Chindongo socolofi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=61146) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Chindongo socolofi — manutenção e história natural](https://www.seriouslyfish.com/species/chindongo-socolofi/) — HTTP 200 reconferido.
  - [Chindongo socolofi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Chindongo%20socolofi) — referência complementar já registrada.

### Venustus — Nimbochromis venustus

- URL preservada: `/especies/nimbochromis-venustus/`; lote editorial 2.
- Água: 24–28 °C; pH 7,6–8,8; GH 10–25 °dGH.
- Porte e espaço: Até 25 cm sem a cauda; Projeto especializado para adultos.
- Manejo: Predador; machos podem se agredir; Indivíduo ou grupo reprodutivo planejado; Alimentos de origem aquática; piscívoro.
- Decisão: Retirados 205 L como recomendação geral. O limite histórico não é apresentado como mínimo seguro para adultos/grupos; dimensionamento específico permanece necessário.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Nimbochromis venustus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=37995) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Nimbochromis venustus — manutenção e história natural](https://www.seriouslyfish.com/species/nimbochromis-venustus/) — HTTP 200 reconferido.
  - [Nimbochromis venustus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Nimbochromis%20venustus) — referência complementar já registrada.

### Zebra-laranja — Maylandia estherae

- URL preservada: `/especies/maylandia-estherae/`; lote editorial 2.
- Água: 24–28 °C; pH 7,6–8,8; GH 10–25 °dGH.
- Porte e espaço: Até 13,5 cm sem a cauda; Projeto maior que 137 L; ver criação.
- Manejo: Territorial e robusto; Um macho com várias fêmeas; Ração com algas e componente vegetal.
- Decisão: 137 L deixa de aparecer como recomendação suficiente para grupo adulto; mantido somente como limite histórico rejeitado para essa finalidade.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Maylandia estherae](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=62465) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Maylandia estherae — manutenção e história natural](https://www.seriouslyfish.com/species/maylandia-estherae/) — HTTP 200 reconferido.
  - [Maylandia estherae — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Maylandia%20estherae) — referência complementar já registrada.

### Acará-bandeira — Pterophyllum scalare

- URL preservada: `/especies/pterophyllum-scalare/`; lote editorial 2.
- Água: 24–30 °C; pH 6,0–7,4; GH 0–15 °dGH.
- Porte e espaço: Até 15 cm sem a cauda; 200 L ou mais; ampliar para grupos.
- Manejo: Territorial ao formar casal; predador de peixes pequenos; Grupo exige espaço; casais defendem território; Ração completa e invertebrados.
- Decisão: Micro-habitat natural insuficientemente descrito não foi preenchido por inferência. Altura de 50 cm e necessidade de espaço para casais explicitadas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Pterophyllum scalare](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=38425) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Pterophyllum scalare — manutenção e história natural](https://www.seriouslyfish.com/species/pterophyllum-scalare/) — HTTP 200 reconferido.
  - [Pterophyllum scalare — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Pterophyllum%20scalare) — referência complementar já registrada.

### Acará-boca-de-fogo — Thorichthys meeki

- URL preservada: `/especies/thorichthys-meeki/`; lote editorial 2.
- Água: 20–32 °C; pH 6,5–8,5; GH 2–15 °dGH.
- Porte e espaço: Até 12 cm sem a cauda; 108 L apenas para casal; ampliar para grupo.
- Manejo: Territorial na reprodução; Casal; grupo somente em grande instalação; Ração de fundo e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Thorichthys meeki](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=16452) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Thorichthys meeki — manutenção e história natural](https://www.seriouslyfish.com/species/thorichthys-meeki/) — HTTP 200 reconferido.
  - [Thorichthys meeki — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Thorichthys%20meeki) — referência complementar já registrada.

### Green terror — Andinoacara rivulatus

- URL preservada: `/especies/andinoacara-rivulatus/`; lote editorial 2.
- Água: 20–24 °C; pH 6,5–8,0; GH 5–25 °dGH.
- Porte e espaço: Até 30 cm sem a cauda; 304 L ou mais; indivíduo ou casal formado.
- Manejo: Agressivo e territorial; Indivíduo ou casal já formado; Ração para ciclídeos e itens aquáticos.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Andinoacara rivulatus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=39041) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Andinoacara rivulatus — manutenção e história natural](https://www.seriouslyfish.com/species/andinoacara-rivulatus/) — HTTP 200 reconferido.
  - [Andinoacara rivulatus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Andinoacara%20rivulatus) — referência complementar já registrada.

### Acará-heckelii — Acarichthys heckelii

- URL preservada: `/especies/acarichthys-heckelii/`; lote editorial 2.
- Água: 24–30 °C; pH 6,0–8,0; GH 1–12 °dGH.
- Porte e espaço: Até 20 cm sem a cauda; Dimensionar pela base; ver criação.
- Manejo: Pode agredir conspecíficos e predar animais pequenos; Casal compatível; grupo exige muito mais área; Rações e alimentos aquáticos variados.
- Decisão: Sem mínimo numérico em litros: a base de 150 × 45 cm para casal foi mantida, sem inventar altura ou volume. Grupo exige muito mais espaço.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Acarichthys heckelii](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=21290) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Acarichthys heckelii — manutenção e história natural](https://www.seriouslyfish.com/species/acarichthys-heckelii/) — HTTP 200 reconferido.
  - [Acarichthys heckelii — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Acarichthys%20heckelii) — referência complementar já registrada.

### Oscar — Astronotus ocellatus

- URL preservada: `/especies/astronotus-ocellatus/`; lote editorial 2.
- Água: 20–28 °C; pH 6,0–7,5; GH 5–20 °dGH.
- Porte e espaço: Até 35 cm sem a cauda; 540 L ou mais; um adulto.
- Manejo: Predador; pode defender território; Um adulto; casal ou grupo em aquário maior; Ração para grandes ciclídeos e itens aquáticos.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Astronotus ocellatus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=19918) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Astronotus ocellatus — manutenção e história natural](https://www.seriouslyfish.com/species/astronotus-ocellatus/) — HTTP 200 reconferido.
  - [Astronotus ocellatus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Astronotus%20ocellatus) — referência complementar já registrada.

### Ramirezi — Mikrogeophagus ramirezi

- URL preservada: `/especies/mikrogeophagus-ramirezi/`; lote editorial 2.
- Água: 27–30 °C; pH 4,0–7,0; GH 1–10 °dGH.
- Porte e espaço: Até 4 cm sem a cauda; 54 L ou mais; um casal.
- Manejo: Delicado; casal territorial; Casal; evitar competição intensa; Ração que afunda e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Mikrogeophagus ramirezi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=22062) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Mikrogeophagus ramirezi — manutenção e história natural](https://www.seriouslyfish.com/species/mikrogeophagus-ramirezi/) — HTTP 200 reconferido.
  - [Mikrogeophagus ramirezi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Mikrogeophagus%20ramirezi) — referência complementar já registrada.

### Colisa-chuna — Trichogaster chuna

- URL preservada: `/especies/trichogaster-chuna/`; lote editorial 2.
- Água: 22–27 °C; pH 6,0–7,5; GH 2–15 °dGH.
- Porte e espaço: Até 5,5 cm sem a cauda; 54 L ou mais; ajustar ao grupo.
- Manejo: Pacífica e pouco competitiva; Grupo de 4–6 em espaço adequado; Ração fina e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Trichogaster chuna](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=41983) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Trichogaster chuna — manutenção e história natural](https://www.seriouslyfish.com/species/trichogaster-chuna/) — HTTP 200 reconferido.
  - [Trichogaster chuna — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Trichogaster%20chuna) — referência complementar já registrada.

### Peixe-paraíso — Macropodus opercularis

- URL preservada: `/especies/macropodus-opercularis/`; lote editorial 2.
- Água: 10–22 °C; pH 6,0–8,0; GH 5–20 °dGH.
- Porte e espaço: Até 8 cm sem a cauda; 72 L ou mais; casal com refúgios.
- Manejo: Territorial, sobretudo entre machos; Casal com refúgios; evitar vários machos em pouco espaço; Ração aceita e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Macropodus opercularis](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=19461) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Macropodus opercularis — manutenção e história natural](https://www.seriouslyfish.com/species/macropodus-opercularis/) — HTTP 200 reconferido.
  - [Macropodus opercularis — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Macropodus%20opercularis) — referência complementar já registrada.

### Tricogáster-azul — Trichopodus trichopterus

- URL preservada: `/especies/trichopodus-trichopterus/`; lote editorial 2.
- Água: 24–30 °C; pH 5,5–8,5; GH 3–35 °dGH.
- Porte e espaço: Até 15 cm sem a cauda; 81 L é limite inferior; ampliar para adultos.
- Manejo: Variável; machos podem ser agressivos; Avaliar território e proporção sexual; Onívoro; ração e itens aquáticos variados.
- Decisão: 81 L explicitados como limite inferior histórico; adultos/grupos requerem projeto maior. Distribuição atual no Mekong mantida, sem atribuir Indonésia para gerar sugestões.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Trichopodus trichopterus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=42008) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Trichopodus trichopterus — manutenção e história natural](https://www.seriouslyfish.com/species/trichopodus-trichopterus/) — HTTP 200 reconferido.
  - [Trichopodus trichopterus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Trichopodus%20trichopterus) — referência complementar já registrada.

### Tricogáster-leeri — Trichopodus leerii

- URL preservada: `/especies/trichopodus-leerii/`; lote editorial 2.
- Água: 24–30 °C; pH 5,5–8,0; GH 2–30 °dGH.
- Porte e espaço: Até 12 cm sem a cauda; 81 L é limite inferior; ampliar para grupos.
- Manejo: Relativamente pacífico; machos territoriais; Planejar refúgios e proporção sexual; Ração variada e pequenos itens aquáticos.
- Decisão: 81 L mantidos apenas como limite inferior; grupos e convivência precisam de mais espaço.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada. Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Trichopodus leerii](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=19476) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Trichopodus leerii — manutenção e história natural](https://www.seriouslyfish.com/species/trichopodus-leerii/) — HTTP 200 reconferido.
  - [Trichopodus leerii — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Trichopodus%20leerii) — referência complementar já registrada.

### Comedor-de-algas-chinês — Gyrinocheilus aymonieri

- URL preservada: `/especies/gyrinocheilus-aymonieri/`; lote editorial 2.
- Água: 22–26 °C; pH 6,0–8,0; GH 2–20 °dGH.
- Porte e espaço: Até 28 cm sem a cauda; 304 L ou mais; planejar um adulto.
- Manejo: Pode ficar territorial com a idade; Planejar um adulto e avaliar os peixes de fundo; Ração, vegetais e biofilme; não só algas.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Gyrinocheilus aymonieri](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=53563) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Gyrinocheilus aymonieri — manutenção e história natural](https://www.seriouslyfish.com/species/gyrinocheilus-aymonieri/) — HTTP 200 reconferido.
  - [Gyrinocheilus aymonieri — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Gyrinocheilus%20aymonieri) — referência complementar já registrada.

### Coridora-schwartzi — Hoplisoma schwartzi

- URL preservada: `/especies/hoplisoma-schwartzi/`; lote editorial 2.
- Água: 22–24 °C; pH 6,0–7,5; GH 1–15 °dGH.
- Porte e espaço: Até 7 cm sem a cauda; 68 L ou mais; grupo de seis.
- Manejo: Muito pacífica; Grupo de pelo menos seis; Ração de fundo e pequenos invertebrados.
- Decisão: Hoplisoma schwartzi e origem no Purus preservados. Não copiar instruções genéricas para qualquer Corydoras; 22–24 °C e fundo limpo destacados.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Hoplisoma schwartzi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=4905) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Corydoras schwartzi — manutenção e história natural](https://www.seriouslyfish.com/species/corydoras-schwartzi/) — HTTP 200 reconferido.
  - [Corydoras schwartzi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Corydoras%20schwartzi) — referência complementar já registrada.

### Pangasius — Pangasianodon hypophthalmus

- URL preservada: `/especies/pangasianodon-hypophthalmus/`; lote editorial 3.
- Água: 22–26 °C; pH 6,5–7,5; GH 2–30 °dGH.
- Porte e espaço: Até 130 cm sem a cauda; 14.580 L ou mais; um adulto, instalação especializada.
- Manejo: Ativo, assustadiço e capaz de predar peixes menores; Sociável; grupos exigem instalação enorme; Onívoro; dieta ajustada ao porte.
- Decisão: Escala de 14.580 L contextualizada para um adulto; não sugerir aquário doméstico ou multiplicar lotação automaticamente.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Pangasianodon hypophthalmus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=56294) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Pangasianodon hypophthalmus — manutenção e história natural](https://www.seriouslyfish.com/species/pangasianodon-hypophthalmus/) — HTTP 200 reconferido.
  - [Pangasianodon hypophthalmus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Pangasianodon%20hypophthalmus) — referência complementar já registrada.

### Pirarara — Phractocephalus hemioliopterus

- URL preservada: `/especies/phractocephalus-hemioliopterus/`; lote editorial 3.
- Água: 21–26 °C; pH 6,0–7,5; GH 2–12 °dGH.
- Porte e espaço: Até 134 cm sem a cauda; 10.368 L é limite inferior; instalação especializada.
- Manejo: Grande predadora; pode disputar território; Instalação específica; alto risco para peixes menores; Itens de origem aquática adequados ao porte.
- Decisão: 10.368 L mantidos como limite inferior restritivo, não como garantia universal de bem-estar.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Phractocephalus hemioliopterus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=47923) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Phractocephalus hemioliopterus — manutenção e história natural](https://www.seriouslyfish.com/species/phractocephalus-hemioliopterus/) — HTTP 200 reconferido.
  - [Phractocephalus hemioliopterus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Phractocephalus%20hemioliopterus) — referência complementar já registrada.

### Espada — Xiphophorus hellerii

- URL preservada: `/especies/xiphophorus-hellerii/`; lote editorial 3.
- Água: 16–28 °C; pH 7,0–8,0; GH 10–25 °dGH.
- Porte e espaço: Até 14 cm sem a cauda; 108 L ou mais; grupo planejado.
- Manejo: Ativo; machos disputam posição; Grupo com espaço e refúgios para fêmeas; Onívoro com componente vegetal.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Xiphophorus hellerii](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=13936) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Xiphophorus hellerii — manutenção e história natural](https://www.seriouslyfish.com/species/xiphophorus-hellerii/) — HTTP 200 reconferido.
  - [Xiphophorus hellerii — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Xiphophorus%20hellerii) — referência complementar já registrada.

### Lebiste — Poecilia reticulata

- URL preservada: `/especies/poecilia-reticulata/`; lote editorial 3.
- Água: 17–28 °C; pH 7,0–8,5; GH 8–30 °dGH.
- Porte e espaço: Até 6 cm sem a cauda; 41 L ou mais; pequeno grupo.
- Manejo: Pacífico; machos podem perseguir fêmeas; Grupo; várias fêmeas por macho em reprodução; Ração fina e pequenos alimentos variados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Poecilia reticulata](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=58598) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Poecilia reticulata — manutenção e história natural](https://www.seriouslyfish.com/species/poecilia-reticulata/) — HTTP 200 reconferido.
  - [Poecilia reticulata — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Poecilia%20reticulata) — referência complementar já registrada.

### Molinésia-sphenops — Poecilia sphenops

- URL preservada: `/especies/poecilia-sphenops/`; lote editorial 3.
- Água: 21–28 °C; pH 7,0–8,5; GH 15–30 °dGH.
- Porte e espaço: Até 8 cm sem a cauda; 81 L ou mais; grupo planejado.
- Manejo: Geralmente pacífica; machos perseguem fêmeas; Grupo com refúgios e várias fêmeas por macho; Onívora com forte componente vegetal.
- Decisão: Distribuição atual delimitada conforme taxonomia; não estender automaticamente a todas as molinésias comerciais. Sal não equivale a GH.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Poecilia sphenops](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=32496) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Poecilia sphenops — manutenção e história natural](https://www.seriouslyfish.com/species/poecilia-sphenops/) — HTTP 200 reconferido.
  - [Poecilia sphenops — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Poecilia%20sphenops) — referência complementar já registrada.

### Tetra-mato-grosso — Megalamphodus eques

- URL preservada: `/especies/megalamphodus-eques/`; lote editorial 3.
- Água: 20–28 °C; pH 5,0–7,5; GH 1–15 °dGH.
- Porte e espaço: Até 4 cm sem a cauda; 72 L ou mais; 12–15 sem outra meia-água.
- Manejo: Ativo; pode beliscar nadadeiras; Cardume de 12–15; Rações e pequenos alimentos aquáticos.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Megalamphodus eques](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=29783) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Hyphessobrycon eques — manutenção e história natural](https://www.seriouslyfish.com/species/hyphessobrycon-eques/) — HTTP 200 reconferido.
  - [Hyphessobrycon eques — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Hyphessobrycon%20eques) — referência complementar já registrada.

### Tetra-olho-de-fogo — Bario sanctaefilomenae

- URL preservada: `/especies/bario-sanctaefilomenae/`; lote editorial 3.
- Água: 22–26 °C; pH 6,0–8,0; GH 3–20 °dGH.
- Porte e espaço: Até 7 cm sem a cauda; 103 L ou mais; cardume pequeno.
- Manejo: Ativo; pode intimidar e beliscar nadadeiras; Cardume de 6–8 ou mais; Ração variada, invertebrados e vegetais.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Bario sanctaefilomenae](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=29217) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Moenkhausia sanctaefilomenae — manutenção e história natural](https://www.seriouslyfish.com/species/moenkhausia-sanctaefilomenae/) — HTTP 200 reconferido.
  - [Moenkhausia sanctaefilomenae — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Moenkhausia%20sanctaefilomenae) — referência complementar já registrada.

### Tetra-limão — Hyphessobrycon pulchripinnis

- URL preservada: `/especies/hyphessobrycon-pulchripinnis/`; lote editorial 3.
- Água: 20–28 °C; pH 5,0–7,5; GH 1–12 °dGH.
- Porte e espaço: Até 4 cm sem a cauda; 72 L ou mais; cardume de 8–10.
- Manejo: Pacífico; Cardume de 8–10 ou mais; Ração fina e pequenos alimentos variados.
- Decisão: Micro-habitat inferido na literatura não é descrito como observação comprovada; removido o texto provisório e mantidos os dados de manutenção.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Hyphessobrycon pulchripinnis](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=29160) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Hyphessobrycon pulchripinnis — manutenção e história natural](https://www.seriouslyfish.com/species/hyphessobrycon-pulchripinnis/) — HTTP 200 reconferido.
  - [Hyphessobrycon pulchripinnis — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Hyphessobrycon%20pulchripinnis) — referência complementar já registrada.

### Tetra-pristela — Pristella maxillaris

- URL preservada: `/especies/pristella-maxillaris/`; lote editorial 3.
- Água: 22–28 °C; pH 6,0–7,5; GH 2–20 °dGH.
- Porte e espaço: Até 4,5 cm sem a cauda; 54 L ou mais; pequeno cardume.
- Manejo: Muito pacífica e pouco competitiva; Pelo menos seis; de preferência 10 ou mais; Rações finas, dáfnias e artêmia.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Pristella maxillaris](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=32998) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Pristella maxillaris — manutenção e história natural](https://www.seriouslyfish.com/species/pristella-maxillaris/) — HTTP 200 reconferido.
  - [Pristella maxillaris — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Pristella%20maxillaris) — referência complementar já registrada.

### Tetra-foguinho — Hyphessobrycon amandae

- URL preservada: `/especies/hyphessobrycon-amandae/`; lote editorial 3.
- Água: 20–28 °C; pH 5,0–7,0; GH 1–10 °dGH.
- Porte e espaço: Até 2 cm sem a cauda; 41 L ou mais; cardume de 8–10.
- Manejo: Muito pacífico e delicado; Cardume de 8–10 ou mais; Microalimentos e ração muito fina.
- Decisão: Micro-habitat natural pouco documentado não foi inventado. Tamanho de alimento e risco de predação priorizados.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Hyphessobrycon amandae](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=7876) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Hyphessobrycon amandae — manutenção e história natural](https://www.seriouslyfish.com/species/hyphessobrycon-amandae/) — HTTP 200 reconferido.
  - [Hyphessobrycon amandae — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Hyphessobrycon%20amandae) — referência complementar já registrada.

### Tetra-glowlight — Hemigrammus erythrozonus

- URL preservada: `/especies/hemigrammus-erythrozonus/`; lote editorial 3.
- Água: 24–28 °C; pH 5,5–7,5; GH 2–15 °dGH.
- Porte e espaço: Até 4 cm sem a cauda; 68 L ou mais; pequeno cardume.
- Manejo: Pacífico; Pelo menos seis; de preferência 10 ou mais; Ração fina e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Hemigrammus erythrozonus](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=4011) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Hemigrammus erythrozonus — manutenção e história natural](https://www.seriouslyfish.com/species/hemigrammus-erythrozonus/) — HTTP 200 reconferido.
  - [Hemigrammus erythrozonus — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Hemigrammus%20erythrozonus) — referência complementar já registrada.

### Tetra-negro — Gymnocorymbus ternetzi

- URL preservada: `/especies/gymnocorymbus-ternetzi/`; lote editorial 3.
- Água: 20–26 °C; pH 6,0–7,0; GH 5–20 °dGH.
- Porte e espaço: Até 6 cm sem a cauda; Cerca de 70 L ou mais; grupo de 12.
- Manejo: Ativo; pode beliscar nadadeiras; Cardume de pelo menos 12; Ração completa e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Gymnocorymbus ternetzi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=51817) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Gymnocorymbus ternetzi — manutenção e história natural](https://www.seriouslyfish.com/species/gymnocorymbus-ternetzi/) — HTTP 200 reconferido.
  - [Gymnocorymbus ternetzi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Gymnocorymbus%20ternetzi) — referência complementar já registrada.

### Neon-cardinal — Paracheirodon axelrodi

- URL preservada: `/especies/paracheirodon-axelrodi/`; lote editorial 3.
- Água: 23–29 °C; pH 3,5–7,5; GH 1–12 °dGH.
- Porte e espaço: Até 3,5 cm sem a cauda; 54 L ou mais; cardume de 8–10.
- Manejo: Pacífico; Cardume de 8–10 ou mais; Ração fina e pequenos invertebrados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Paracheirodon axelrodi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=4506) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Paracheirodon axelrodi — manutenção e história natural](https://www.seriouslyfish.com/species/paracheirodon-axelrodi/) — HTTP 200 reconferido.
  - [Paracheirodon axelrodi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Paracheirodon%20axelrodi) — referência complementar já registrada.

### Neon-negro — Hyphessobrycon herbertaxelrodi

- URL preservada: `/especies/hyphessobrycon-herbertaxelrodi/`; lote editorial 3.
- Água: 20–28 °C; pH 5,0–7,5; GH 1–12 °dGH.
- Porte e espaço: Até 3,5 cm sem a cauda; 72 L ou mais; cardume de 8–10.
- Manejo: Muito pacífico; Cardume de 8–10 ou mais; Ração fina e pequenos alimentos variados.
- Decisão: Parâmetros e taxonomia preservados após conferência individual; conteúdo organizado e reescrito com orientações de espaço, sociabilidade, alimentação e prevenção específicas.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Hyphessobrycon herbertaxelrodi](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=24804) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Hyphessobrycon herbertaxelrodi — manutenção e história natural](https://www.seriouslyfish.com/species/hyphessobrycon-herbertaxelrodi/) — HTTP 200 reconferido.
  - [Hyphessobrycon herbertaxelrodi — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Hyphessobrycon%20herbertaxelrodi) — referência complementar já registrada.

### Tetra-pinguim — Thayeria boehlkei

- URL preservada: `/especies/thayeria-boehlkei/`; lote editorial 3.
- Água: 22–28 °C; pH 5,5–8,0; GH 0–20 °dGH.
- Porte e espaço: Até 3,6 cm sem a cauda; 68 L ou mais; pequeno cardume.
- Manejo: Pacífico; pouco competitivo com peixes muito agitados; Pelo menos seis; de preferência 10 ou mais; Ração fina, artêmia e dáfnias.
- Decisão: Distribuição no oeste amazônico mantida, sem incorporar Araguaia de fonte antiga. Nado inclinado explicado como comportamento normal.
- Dados/avaliações que exigem cautela: KH específico de manutenção não documentado; omitido, sem derivar de GH. Dificuldade é síntese editorial das exigências descritas, não escala científica padronizada.
- Fontes individuais:
  - [Eschmeyer’s Catalog of Fishes — Thayeria boehlkei](https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=24929) — HTTP 200 reconferido.
  - [Eschmeyer’s Catalog of Fishes — classificação por família](https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp) — referência complementar já registrada.
  - [Thayeria boehlkei — manutenção e história natural](https://www.seriouslyfish.com/species/thayeria-boehlkei/) — HTTP 200 reconferido.
  - [Thayeria boehlkei — registro comparativo no GBIF](https://api.gbif.org/v1/species/match?name=Thayeria%20boehlkei) — referência complementar já registrada.

## Arquivos e retomada

- `docs/catalogo/revisao-editorial.json`: cobertura dos lotes, decisões, hashes anteriores/posteriores e fontes por espécie.
- `docs/catalogo/revisao-fontes.json`: respostas reais e hashes das páginas acessadas, incluindo falhas.
- `docs/catalogo/preservados.json`: baseline original imutável das cinco fichas do PR #6; mudanças agora autorizadas são justificadas no ledger editorial, sem apagar o histórico.
- `src/data/species/*.json`: fonte única dos dados públicos revisados e dos resumos.
- `scripts/catalog/report_editorial.py`: gera este relatório a partir dos dados e da trilha de revisão.
- `docs/catalogo-pendencias.md`: continua sendo o relatório da expansão da planilha (123 registros para próxima etapa); esta revisão não os cadastra.
- Não há publicação de produção nesta etapa. Conferir o preview do commit e aguardar aprovação da loja.
