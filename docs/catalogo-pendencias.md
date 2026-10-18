# Expansão do catálogo — relatório de pendências

Relatório gerado por `python3 scripts/catalog/audit_catalog.py --write`. Não contém preços, estoque, telefones da planilha nem instruções das abas auxiliares.

## Inventário e contagem

- Arquivo: `VAREJO PEIXES NICHOS.xlsx`; SHA-256 `f5740672fd7780f15369adc8b6635d7089ecc96f39ba74b34297c3bfbdcddb66`.
- Registros comerciais recebidos: **212** (incluem plantas e variedades, não equivalem a espécies biológicas).
- Abas inspecionadas: **3**; duas abas de instruções não contêm registros de catálogo e não foram executadas.
- Espécies já existentes preservadas: **5**.
- Novas fichas geradas: **24**; total de fichas navegáveis: **29**.
- Registros comerciais incorporados como variedades/aliases de fichas novas, sem URL adicional: **33**.
- Registros ignorados ou pendentes: **150**.
- Grupos científicos candidatos: **53**; **52** têm nome aceito verificado no Catalog of Fishes. Essa contagem não resolve a identidade dos demais nomes comerciais; o total biológico final da planilha continua indeterminado.

## Abas

| Aba | Tipo | Registros |
| --- | --- | --- |
| Tabela Peixes Atual | catalog | 212 |
| PROMPT PEIXES | non-catalog | 0 |
| PROMPT PRODUTOS | non-catalog | 0 |

## Lotes e retomada

- `lote-01`: pethia-gelius, barbodes-semifasciolatus, puntigrus-tetrazona, danio-rerio. Validação: build, integridade e testes do lote aprovados.
- `lote-02`: betta-splendens, misgurnus-anguillicaudatus, aulonocara-stuartgranti, melanochromis-auratus, labidochromis-caeruleus, maylandia-lombardoi, chindongo-socolofi, nimbochromis-venustus, maylandia-estherae, pterophyllum-scalare. Validação: build, integridade e testes do lote aprovados.
- `lote-03`: thorichthys-meeki, andinoacara-rivulatus, acarichthys-heckelii, astronotus-ocellatus, mikrogeophagus-ramirezi, trichogaster-chuna, macropodus-opercularis, trichopodus-trichopterus, trichopodus-leerii, gyrinocheilus-aymonieri. Validação: build, integridade e testes do lote aprovados.

## Fichas novas concluídas

| Nome | Nome científico | Categoria original | URL relativa |
| --- | --- | --- | --- |
| Barbo-gema | *Pethia gelius* | Barbos e Danios | `/especies/pethia-gelius/` |
| Barbo-ouro | *Barbodes semifasciolatus* | Barbos e Danios | `/especies/barbodes-semifasciolatus/` |
| Barbo-sumatra | *Puntigrus tetrazona* | Barbos e Danios | `/especies/puntigrus-tetrazona/` |
| Paulistinha | *Danio rerio* | Barbos e Danios | `/especies/danio-rerio/` |
| Betta | *Betta splendens* | Bettas | `/especies/betta-splendens/` |
| Dojo | *Misgurnus anguillicaudatus* | Botias e Loaches | `/especies/misgurnus-anguillicaudatus/` |
| Aulonocara-stuartgranti | *Aulonocara stuartgranti* | Ciclídeos Africanos | `/especies/aulonocara-stuartgranti/` |
| Auratus | *Melanochromis auratus* | Ciclídeos Africanos | `/especies/melanochromis-auratus/` |
| Labidochromis yellow | *Labidochromis caeruleus* | Ciclídeos Africanos | `/especies/labidochromis-caeruleus/` |
| Lombardoi | *Maylandia lombardoi* | Ciclídeos Africanos | `/especies/maylandia-lombardoi/` |
| Socolofi | *Chindongo socolofi* | Ciclídeos Africanos | `/especies/chindongo-socolofi/` |
| Venustus | *Nimbochromis venustus* | Ciclídeos Africanos | `/especies/nimbochromis-venustus/` |
| Zebra-laranja | *Maylandia estherae* | Ciclídeos Africanos | `/especies/maylandia-estherae/` |
| Acará-bandeira | *Pterophyllum scalare* | Ciclídeos Americanos | `/especies/pterophyllum-scalare/` |
| Acará-boca-de-fogo | *Thorichthys meeki* | Ciclídeos Americanos | `/especies/thorichthys-meeki/` |
| Green terror | *Andinoacara rivulatus* | Ciclídeos Americanos | `/especies/andinoacara-rivulatus/` |
| Acará-heckelii | *Acarichthys heckelii* | Ciclídeos Americanos | `/especies/acarichthys-heckelii/` |
| Oscar | *Astronotus ocellatus* | Ciclídeos Americanos | `/especies/astronotus-ocellatus/` |
| Ramirezi | *Mikrogeophagus ramirezi* | Ciclídeos Americanos | `/especies/mikrogeophagus-ramirezi/` |
| Colisa-chuna | *Trichogaster chuna* | Labirintídeos | `/especies/trichogaster-chuna/` |
| Peixe-paraíso | *Macropodus opercularis* | Labirintídeos | `/especies/macropodus-opercularis/` |
| Tricogáster-azul | *Trichopodus trichopterus* | Labirintídeos | `/especies/trichopodus-trichopterus/` |
| Tricogáster-leeri | *Trichopodus leerii* | Labirintídeos | `/especies/trichopodus-leerii/` |
| Comedor-de-algas-chinês | *Gyrinocheilus aymonieri* | Limpadores | `/especies/gyrinocheilus-aymonieri/` |

## Duplicidades comerciais consolidadas

O agrupamento é uma decisão explícita por espécie, não uma deduplicação por semelhança textual. Tamanhos, sexos e variedades não geram URLs diferentes. Linhagens híbridas duvidosas permanecem pendentes.

| Linha | Nome da planilha | Ficha de destino |
| --- | --- | --- |
| 14 | BARBUS SUMATRA ALBINO | *Puntigrus tetrazona* |
| 15 | BARBUS SUMATRA VERMELHO | *Puntigrus tetrazona* |
| 19 | BETTA FÊMEA DUMBO | *Betta splendens* |
| 20 | BETTA FÊMEA KOI CANDY | *Betta splendens* |
| 21 | BETTA MACHO COMUM | *Betta splendens* |
| 22 | BETTA MACHO CROWNTAIL | *Betta splendens* |
| 23 | BETTA MACHO DRAGON | *Betta splendens* |
| 24 | BETTA MACHO DUMBO | *Betta splendens* |
| 25 | BETTA MACHO KOI | *Betta splendens* |
| 26 | BETTA MACHO MUSTARD GAS | *Betta splendens* |
| 27 | BETTA MACHO PALHAÇO | *Betta splendens* |
| 56 | AURATUS AMARELO | *Melanochromis auratus* |
| 68 | ACARÁ KOI M | *Pterophyllum scalare* |
| 69 | ACARÁ MARMORADO M | *Pterophyllum scalare* |
| 70 | ACARÁ PALHAÇO M | *Pterophyllum scalare* |
| 74 | GREEN TERROR P | *Andinoacara rivulatus* |
| 77 | OSCAR BRONZE M | *Astronotus ocellatus* |
| 78 | OSCAR RED RUBI ALBINO M | *Astronotus ocellatus* |
| 79 | OSCAR RED TIGER ALBINO G | *Astronotus ocellatus* |
| 80 | OSCAR RED TIGER ALBINO | *Astronotus ocellatus* |
| 81 | OSCAR RED TIGER M | *Astronotus ocellatus* |
| 82 | OSCAR TIGRE M | *Astronotus ocellatus* |
| 83 | OSCAR TIGRE MG | *Astronotus ocellatus* |
| 84 | OSCAR TIGRE MOSAICO | *Astronotus ocellatus* |
| 91 | RAMIREZI BALÃO ELECTRIC BLUE M | *Mikrogeophagus ramirezi* |
| 92 | RAMIREZI BALÃO OURO VEL M | *Mikrogeophagus ramirezi* |
| 93 | RAMIREZI ELECTRIC BLUE M | *Mikrogeophagus ramirezi* |
| 94 | RAMIREZI OURO | *Mikrogeophagus ramirezi* |
| 95 | RAMIREZI OURO VEU MATRIZ | *Mikrogeophagus ramirezi* |
| 132 | PEIXE PARAISO COBRE | *Macropodus opercularis* |
| 133 | PEIXE PARAISO COMUM | *Macropodus opercularis* |
| 136 | TRICOGASTER OURO | *Trichopodus trichopterus* |
| 138 | ALGA EATER COMUM | *Gyrinocheilus aymonieri* |

## Pendências nominais: todos os registros para a próxima etapa

| Linha | Categoria | Nome comercial | Espécie candidata | Motivo específico |
| --- | --- | --- | --- | --- |
| 16 | Barbos e Danios | DÂNIO | Não confirmada | Dânio é nome de grupo; não presumir Danio rerio nem mesclar com paulistinha sem confirmação. |
| 28 | Botias e Loaches | BOTIA LOHACHATA (YOYO) | Não confirmada | Bótia yoyo/lohachata: distinguir Botia almorhae de B. lohachata e possíveis misturas comerciais. |
| 29 | Botias e Loaches | BOTIA MODESTA (AZUL) M | Yasuhikotakia modesta | Terceira foto tem nome de arquivo Botia morleti e descrição Yasuhikotakia modesta; identificação contraditória, não utilizar até confirmação ou substituição. Download e conferência visual das três fotografias pendentes; metadados não substituem a inspeção dos arquivos. |
| 30 | Botias e Loaches | COBRINHA KULLY | Não confirmada | Kuhli: Pangio kuhlii e espécies semelhantes são comercializadas juntas; identificação não confirmada. |
| 32 | Carpas | CARPA COLORIDA ESPECIAL G | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 33 | Carpas | CARPA COLORIDA ESPECIAL M | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 34 | Carpas | CARPA COLORIDA ESPECIAL P | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 35 | Carpas | CARPA KOI 16 a 18CM | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 36 | Carpas | CARPA VEU G | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 37 | Carpas | CARPA VEU M | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 38 | Carpas | CARPA VEU MG | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 39 | Carpas | CARPA VEU P | Não confirmada | Carpa/koi: confirmar Cyprinus rubrofuscus, C. carpio ou linhagem híbrida; cores e tamanho não resolvem a identificação. |
| 40 | Cascudos  e limpadores | CASCUDO ABACAXI G | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 41 | Cascudos  e limpadores | CASCUDO ABACAXI M | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 42 | Cascudos  e limpadores | CASCUDO ABACAXI P | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 43 | Cascudos  e limpadores | CASCUDO ALBINO M | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 44 | Cascudos  e limpadores | CASCUDO ANCISTRUS | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 45 | Ciclídeos Africanos | AULONOCARA  APACHE | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 46 | Ciclídeos Africanos | AULONOCARA BLUE | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 47 | Ciclídeos Africanos | AULONOCARA DRAGON BLOOD | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 48 | Ciclídeos Africanos | AULONOCARA EUREKA | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 49 | Ciclídeos Africanos | AULONOCARA MALERI YELLOW | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 50 | Ciclídeos Africanos | AULONOCARA MAULANA BICOLOR | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 51 | Ciclídeos Africanos | AULONOCARA ORANGE BLUE | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 52 | Ciclídeos Africanos | AULONOCARA RED FLASH | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 54 | Ciclídeos Africanos | AULONOCARIA ORANGE BLUE ALBINA | Não confirmada | Aulonocara: nome de cor/linhagem/localidade pode indicar híbrido; confirmar espécie e procedência com fornecedor. |
| 57 | Ciclídeos Africanos | AURATUS AZUL | Não confirmada | Nome comercial insuficiente ou categoria inconsistente: confirmar espécie antes de atribuir taxonomia e cuidados. |
| 62 | Ciclídeos Africanos | ZEBRA BORRADO M | Não confirmada | Nome comercial insuficiente ou categoria inconsistente: confirmar espécie antes de atribuir taxonomia e cuidados. |
| 64 | Ciclídeos Africanos | ZEBRA OBLIQUIDENS M | Não confirmada | Nome comercial insuficiente ou categoria inconsistente: confirmar espécie antes de atribuir taxonomia e cuidados. |
| 67 | Ciclídeos Americanos | ACARÁ JOIA | Não confirmada | Nome comercial insuficiente ou categoria inconsistente: confirmar espécie antes de atribuir taxonomia e cuidados. |
| 71 | Ciclídeos Americanos | FLOWER HORN RED DRAGON | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 72 | Ciclídeos Americanos | FLOWER HORN RED DRAGON BALAO | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 85 | Ciclídeos Americanos | PAPAGAIO BLUE SAPHIRE M | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 86 | Ciclídeos Americanos | PAPAGAIO TEXAS M | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 87 | Ciclídeos Americanos | PAPAGAIO VERDE | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 88 | Ciclídeos Americanos | PAPAGAIO WHITE SAPHIRE M | Não confirmada | Linhagem híbrida: parentais e requisitos não confirmados; não tratar nome comercial como espécie taxonômica. |
| 89 | Ciclídeos Americanos | PAPILOCROMIS | Não confirmada | Papilocromis pode indicar diferentes Mikrogeophagus; confirmar se é M. ramirezi ou M. altispinosus. |
| 96 | Invertebrados | CARAMUJO AMARELO | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 97 | Invertebrados | CARAMUJO RED RAMSHORN M | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 98 | Invertebrados | CURBÍCULA AMARELA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 99 | Invertebrados | CURBÍCULA PRETA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 100 | Invertebrados | NEOCARIDINA SP AMARELO SAKURA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 101 | Invertebrados | NEOCARIDINA SP BLACK SAKURA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 102 | Invertebrados | NEOCARIDINA SP BLUE FANTASY | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 103 | Invertebrados | NEOCARIDINA SP ORANGE SAKURA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 104 | Invertebrados | NEOCARIDINA SP RED RILLI | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 105 | Invertebrados | NEOCARIDINA SP RED SAKURA | Não confirmada | Invertebrado: cor/nome genérico não comprova espécie (inclui Neocaridina sp.); confirmar identidade antes de atribuir cuidados. |
| 106 | Invertebrados | NERITINA VIRGINEA | Não confirmada | Neritina virginea: verificar nome aceito e necessidade de ambiente salobro/marinho, evitando recomendação indevida de água doce. |
| 107 | Kinguios | KINGUIO BLUE SCALE M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 108 | Kinguios | KINGUIO BRANCO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 109 | Kinguios | KINGUIO BRANCO/VERM M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 110 | Kinguios | KINGUIO CALICO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 111 | Kinguios | KINGUIO CHOCOLATE M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 112 | Kinguios | KINGUIO COMETA BRANCO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 113 | Kinguios | KINGUIO COMETA BRANCO/VERM M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 114 | Kinguios | KINGUIO COMETA BRANCO/VERM P | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 115 | Kinguios | KINGUIO COMETA CHOCOLATE M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 116 | Kinguios | KINGUIO COMETA CÁLICO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 117 | Kinguios | KINGUIO COMETA VERMELHO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 118 | Kinguios | KINGUIO PEROLA M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 119 | Kinguios | KINGUIO RED CAP M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 120 | Kinguios | KINGUIO VERMELHO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 121 | Kinguios | TELESCOPIO VERMELHO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 122 | Kinguios | TELESCÓPIO BRANCO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 123 | Kinguios | TELESCÓPIO BRANCO/VERM M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 124 | Kinguios | TELESCÓPIO CÁLICO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 125 | Kinguios | TELESCÓPIO PRETO M | Carassius auratus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada. |
| 126 | Labirintídeos | COLISA AZUL | Trichogaster lalius | Catalog of Fishes trata Trichogaster lalius como sinônimo de T. fasciata; revisar o estudo e identidade comercial antes de atribuir cuidados a outro nome. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. |
| 128 | Labirintídeos | COLISA LÁLIA | Trichogaster lalius | Catalog of Fishes trata Trichogaster lalius como sinônimo de T. fasciata; revisar o estudo e identidade comercial antes de atribuir cuidados a outro nome. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. |
| 129 | Labirintídeos | COLISA SANGUE | Trichogaster lalius | Catalog of Fishes trata Trichogaster lalius como sinônimo de T. fasciata; revisar o estudo e identidade comercial antes de atribuir cuidados a outro nome. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. |
| 130 | Labirintídeos | COLISA SUNSET | Não confirmada | Colisa sunset pode indicar linhagens de Trichogaster chuna ou T. lalius; fornecedor deve confirmar. |
| 139 | Limpadores | CORIDORA ALBINA | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 140 | Limpadores | CORRIDORA  SHAWRTZ | Hoplisoma schwartzi | Revisão editorial pendente. |
| 141 | Limpadores | CORRIDORA NATARELLI | Hoplisoma nattereri | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. |
| 142 | Limpadores | LIMPA VIDRO | Não confirmada | Cascudo/coridora albina/limpa-vidro: nome não permite determinar espécie; solicitar identificação e foto do fornecedor. |
| 143 | Peixes Africanos de Fundo | SYNODONTIS EUPTERUS | Synodontis eupterus | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Mínimo histórico de 108 L não contextualiza adequadamente porte de até 30 cm; buscar recomendação melhor fundamentada. |
| 144 | Peixes Africanos de Fundo | SYNODONTIS PETRICOLA | Synodontis petricola | Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas. Não foram selecionadas três fotografias reais distintas com licença comercial adequada. Fonte mistura a antiga forma anã com S. petricola; revisar distinção de S. lucipinnis e reprodução. |
| 145 | Peixes Arco-íris | MELANOTAENIA NEON | Melanotaenia praecox | Há apenas duas relações geográficas internas confirmadas na Indonésia. Uma terceira sugestão exige nova evidência de origem ou avaliação específica de convivência; não completar a grade por inferência. |
| 146 | Peixes de Grande Porte | PANGASIUS ALBINO | Pangasianodon hypophthalmus | Revisão editorial pendente. |
| 147 | Peixes de Grande Porte | PANGASIUS PRETO | Pangasianodon hypophthalmus | Revisão editorial pendente. |
| 148 | Peixes de Grande Porte | PINTADO | Não confirmada | Nome comercial inclui diferentes espécies ou híbridos de grande porte; confirmar identificação e procedência. |
| 149 | Peixes de Grande Porte | PIRARARA | Phractocephalus hemioliopterus | Revisão editorial pendente. |
| 150 | Peixes de Grande Porte | TILAPIA | Não confirmada | Nome comercial inclui diferentes espécies ou híbridos de grande porte; confirmar identificação e procedência. |
| 151 | Peixes de Grande Porte | TILAPIA SAINT PITER | Não confirmada | Nome comercial inclui diferentes espécies ou híbridos de grande porte; confirmar identificação e procedência. |
| 152 | Plantas Low Tech | AMAZONENSE  (PLANTA VIVA) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 153 | Plantas Low Tech | CABOMBA MAÇO  (PLANTA VIVA) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 154 | Plantas Low Tech | CAMBOJA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 155 | Plantas Low Tech | ELODEA  (PLANTA VIVA) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 156 | Plantas Low Tech | PLANTA ANÚBIA LANCEOLATA (NO TRONCO) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 157 | Plantas Low Tech | PLANTA CERATOPTERIS THALITROIDES CORNUTA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 158 | Plantas Low Tech | PLANTA CRYPTOCORYNE BROWN | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 159 | Plantas Low Tech | PLANTA ECHINODORUS GRANDE FLORUS | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 160 | Plantas Low Tech | PLANTA HYGRÓPHILA POLYSPERMA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 161 | Plantas Low Tech | PLANTA LANCEOLATA ANUBIA BARTERI | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 162 | Plantas Low Tech | PLANTA MICROSSORIUM | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 163 | Plantas Low Tech | PLANTA MICROSSORIUM NO TRONCO | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 164 | Plantas Low Tech | PLANTA MUDA DE ANUBIA GLABA S/ TRONCO | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 165 | Plantas Low Tech | PLANTA MUDA DE ANUBIA NO TRONCO GLABA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 166 | Plantas Low Tech | PLANTA MUDA DE ANUBIA NO TRONCO NANA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 167 | Plantas Low Tech | PLANTA MUSGO DE JAVA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 168 | Plantas Low Tech | PLANTA MUSGO DE JAVA NO TRONCO | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 169 | Plantas Low Tech | PLANTA PLANTA BRASILIENSE | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 170 | Plantas Low Tech | PLANTA VALLISNERIA SPIRALIS (MUDA) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 171 | Plantas Low Tech | PLANTA VIOLACEA | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 172 | Plantas Low Tech | ROTALA (PLANTA VIVA) | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 173 | Plantas Low Tech | VALLISNERIA GIGANTE | Não confirmada | Planta aquática: requer identificação botânica e template de cultivo; não preencher ficha animal com parâmetros incompatíveis. |
| 174 | Poecilídeos | ESPADA ANANAS (AMARELO E BRANCO) | Xiphophorus hellerii | Revisão editorial pendente. |
| 175 | Poecilídeos | ESPADA KOHAKU (VERMELHO E BRANCO) | Xiphophorus hellerii | Revisão editorial pendente. |
| 176 | Poecilídeos | ESPADA KOI (VERMELHO, PRETO E BRANCO) | Xiphophorus hellerii | Revisão editorial pendente. |
| 177 | Poecilídeos | ESPADA MARLERY (AMARELO) | Xiphophorus hellerii | Revisão editorial pendente. |
| 178 | Poecilídeos | ESPADA SANGUE/DOMINÓ (VERMELHO E PRETO) | Xiphophorus hellerii | Revisão editorial pendente. |
| 179 | Poecilídeos | ESPADA VERDE | Xiphophorus hellerii | Revisão editorial pendente. |
| 180 | Poecilídeos | LEBISTE A CASAL | Poecilia reticulata | Revisão editorial pendente. |
| 181 | Poecilídeos | LEBISTE FÊMEA | Poecilia reticulata | Revisão editorial pendente. |
| 182 | Poecilídeos | LEBISTE MACHO | Poecilia reticulata | Revisão editorial pendente. |
| 183 | Poecilídeos | MOLINESIA ALBINA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 184 | Poecilídeos | MOLINÉSIA BALÃO PRATA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 185 | Poecilídeos | MOLINÉSIA BALÃO PRETA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 186 | Poecilídeos | MOLINÉSIA DÁLMATA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 187 | Poecilídeos | MOLINÉSIA GOLD/BLACK | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 188 | Poecilídeos | MOLINÉSIA PRATA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 189 | Poecilídeos | MOLINÉSIA PRETA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 190 | Poecilídeos | MOLINÉSIA SPHENOPS | Poecilia sphenops | Revisão editorial pendente. |
| 191 | Poecilídeos | MOLINÉSIA TANGERINA | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 192 | Poecilídeos | MOLINÉSIA TIGRE | Não confirmada | Molinésia ornamental pode envolver Poecilia sphenops, P. latipinna, P. velifera e híbridos; nome de cor não resolve espécie. |
| 193 | Poecilídeos | PLATY ABELINHA | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 194 | Poecilídeos | PLATY AZUL | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 195 | Poecilídeos | PLATY DOMINÓ | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 196 | Poecilídeos | PLATY HAWAII | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 197 | Poecilídeos | PLATY TRICOLOR | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 198 | Poecilídeos | PLATY VARIADO | Não confirmada | Platy: confirmar Xiphophorus maculatus, X. variatus ou linhagem híbrida, sem inferir pela cor. |
| 199 | Tetras e Peixes de Cardume | CRUZEIRO DO SUL | Não confirmada | Cruzeiro-do-sul: verificar identificação e revisão taxonômica de Hyphessobrycon/Psalidodon anisitsi. |
| 200 | Tetras e Peixes de Cardume | LÁPIS | Não confirmada | Peixe-lápis: nome abrange diversas espécies de Nannostomus; confirmar espécie. |
| 201 | Tetras e Peixes de Cardume | MATO GROSSO VÉU | Megalamphodus eques | Revisão editorial pendente. |
| 202 | Tetras e Peixes de Cardume | MOCINHA | Não confirmada | Mocinha: nome regional não resolve espécie; confirmar Characidium ou outro gênero. |
| 203 | Tetras e Peixes de Cardume | OLHO DE FOGO BALÃO | Bario sanctaefilomenae | Revisão editorial pendente. |
| 204 | Tetras e Peixes de Cardume | TETRA  LIMÃO | Hyphessobrycon pulchripinnis | Revisão editorial pendente. |
| 205 | Tetras e Peixes de Cardume | TETRA ENFERMEIRINHA | Pristella maxillaris | Revisão editorial pendente. |
| 206 | Tetras e Peixes de Cardume | TETRA FOGUINHO | Hyphessobrycon amandae | Revisão editorial pendente. |
| 207 | Tetras e Peixes de Cardume | TETRA FORTUNA | Não confirmada | Tetra fortuna: identificação científica não comprovada por nome comercial. |
| 208 | Tetras e Peixes de Cardume | TETRA GROWLIGHT | Hemigrammus erythrozonus | Revisão editorial pendente. |
| 209 | Tetras e Peixes de Cardume | TETRA MATO GROSSO | Megalamphodus eques | Revisão editorial pendente. |
| 210 | Tetras e Peixes de Cardume | TETRA NEGRO | Gymnocorymbus ternetzi | Revisão editorial pendente. |
| 211 | Tetras e Peixes de Cardume | TETRA NEON CARDINAL | Paracheirodon axelrodi | Revisão editorial pendente. |
| 212 | Tetras e Peixes de Cardume | TETRA NEON NEGRO | Hyphessobrycon herbertaxelrodi | Revisão editorial pendente. |
| 213 | Tetras e Peixes de Cardume | TETRA OLHO DE FOGO BALÃO | Bario sanctaefilomenae | Revisão editorial pendente. |
| 214 | Tetras e Peixes de Cardume | TETRA PINGUIM | Thayeria boehlkei | Revisão editorial pendente. |
| 215 | Tetras e Peixes de Cardume | TETRA PRISTEL GOLD | Pristella maxillaris | Revisão editorial pendente. |
| 216 | Tetras e Peixes de Cardume | TETRA RODÓSTOMO | Não confirmada | Rodóstomo: distinguir Petitella rhodostoma, P. bleheri e P. georgiae; não atribuir foto ou cuidados à espécie errada. |
| 217 | Tetras e Peixes de Cardume | TETRA VIDRO | Prionobrama filigera | Não foram selecionadas três fotografias reais distintas com licença comercial adequada. |

## Imagens e licenciamento

Somente fotografias reais com CC BY, CC BY-SA, CC0 ou domínio público são elegíveis. Créditos individuais, páginas de origem e licenças acompanham todas as fotos publicadas em `docs/species-image-credits.json`; `docs/catalogo/fotos.json` guarda a seleção pesquisada, hashes e situação de download. Imagens não concluídas não são servidas pelo catálogo.

O serviço oficial `thumb.wikimedia.org` retornou bloqueio de túnel HTTP 403 neste ambiente. Originais em `upload.wikimedia.org` responderam com limite HTTP 429 e `Retry-After: 600`; os downloads são retomáveis e não substituem fotos indisponíveis por imagens erradas. Fotos de baixa resolução conservam dimensões e limitações declaradas.

Espécies ainda sem conjunto de três imagens conferidas:
- Bótia-azul — Yasuhikotakia modesta: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Kinguio — Carassius auratus: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Colisa-lália — Trichogaster lalius: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Coridora-nattereri — Hoplisoma nattereri: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Synodontis-eupterus — Synodontis eupterus: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Synodontis-petricola — Synodontis petricola: seleção, download ou conferência incompletos; detalhes na tabela nominal.
- Tetra-vidro — Prionobrama filigera: seleção, download ou conferência incompletos; detalhes na tabela nominal.

## Informações científicas e referências que exigem revisão

- As novas fichas permanecem em `draft` e `noindex, follow` até revisão editorial; geração técnica não equivale a aprovação científica da loja.
- KH de manutenção não foi documentado nas fontes consultadas. Longevidade, doses de tratamento e valores não encontrados não foram inventados.
- Diferenças taxonômicas entre Catalog of Fishes, GBIF e literatura de manutenção são registradas individualmente em `docs/catalogo/fontes.json`; a taxonomia das fichas novas prioriza o Catalog of Fishes.
- Colisa-lália: o Catalog of Fishes trata Trichogaster lalius como sinônimo de T. fasciata. Atribuição da linhagem comercial e transferência de cuidados exigem revisão antes de gerar ficha.
- Aulonocara, molinésias, platys, carpas, cascudos e vários invertebrados têm nomes comerciais que não resolvem espécie ou parentais; a tabela nominal discrimina cada caso.
- Os mínimos históricos de algumas fontes são apresentados com contexto e ressalvas. Não são garantias universais de lotação ou convivência.
- A indicação “Mesma região” informa origem e escala. Nenhuma convivência foi aprovada automaticamente por sobreposição de temperatura ou continente.
- Região Indonésia é um país que inclui áreas asiáticas e da Oceania; não indica mesma ilha, bacia ou compatibilidade.

## Arquivos e fontes utilizados

- `scripts/import_species_workbook.py`: importação OOXML sem dependências, com detecção de mudanças de entrada.
- `scripts/catalog/prepare_batch.py`: preparação em lotes a partir de decisões e fontes explícitas; não sobrescreve fichas existentes.
- `scripts/catalog/audit_catalog.py`: contagem, créditos, integridade e relatório retomável.
- `docs/catalogo/importacao.json`, `resolucoes.json`, `fontes.json`, `pesquisa.json`, `fotos.json`, `preservados.json` e `lotes.json`: rastreabilidade e checkpoints.
- `src/data/species/*.json` e `public/images/species/`: dados e fotografias locais das fichas concluídas.
- O template de ficha do PR #6 foi preservado; busca inclui aliases comerciais, validação rejeita duplicidade científica e reuso da mesma foto.
- Fontes: Catalog of Fishes (nome válido, autoridade e família), classificação por família da California Academy of Sciences, Seriously Fish (manutenção específica), GBIF (reino/filo e comparação taxonômica) e Wikimedia Commons (licenciamento individual). URLs e data de consulta em `fontes.json` e em cada ficha.

## Publicação e revisão

Somente branch de desenvolvimento e preview. Não realizar merge nem publicar a main sem autorização. Pendências não bloqueiam fichas independentes que atendam aos critérios; a retomada não recria as existentes.
