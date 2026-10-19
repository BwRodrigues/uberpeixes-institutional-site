# Auditoria e correção da indexação das espécies

Branch: `fix/indexacao-fichas-especies`. Base de produção: `5c7ed74013dff05c7bddd0672d8a01dd46c9fc15`. Alteração proposta para revisão; não foi feito merge nem deploy.

## Resultado proposto

- **45 fichas auditadas; 39 aptas à indexação e seis mantidas com noindex.**
- Produção: **41 URLs no sitemap** — início, catálogo e 39 fichas.
- Preview de branch e build local sem opção explícita de produção: **zero URLs indexáveis**, robots permitindo a leitura do noindex e sitemap vazio.
- Nenhum texto ou parâmetro científico foi alterado. Hashes do conteúdo sem o campo `status` são comparados com o baseline e testados em `docs/seo-indexacao.json`.

## Fontes do bloqueio encontradas

| Fonte                                              | Diagnóstico                                                                       | Correção                                                                                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/species/*.json`                          | Todas as 45 fichas estavam em `draft`, apesar da revisão anterior.                | 39 passam a `reviewed`; seis permanecem em `draft` por pendências específicas.                                                   |
| `src/data/species-validation.ts` / `isPublishable` | O estado editorial controla a publicação.                                         | Mantido o bloqueio por estado e reforçada a exigência de descrição, fotos, resumo e seções preenchidas.                          |
| `src/components/species/SpeciesProfile.astro`      | Passa `draft={!isPublishable(animal)}` ao layout.                                 | Preservado: nenhuma liberação incondicional de todas as fichas.                                                                  |
| `src/layouts/SpeciesLayout.astro`                  | Emitia noindex para qualquer ficha em draft; default seguro também é draft.       | Política central distingue produção, preview e conteúdo pendente.                                                                |
| `src/pages/especies/index.astro`                   | Uma única ficha pendente tornava o catálogo inteiro noindex.                      | O catálogo pode ser indexado quando há fichas publicáveis.                                                                       |
| `src/pages/sitemap.xml.ts`                         | Excluía as 45 fichas; não distinguia ambiente.                                    | Publica apenas URLs indexáveis em produção e fica vazio em preview/teste.                                                        |
| `public/_headers` e endpoint da API                | X-Robots-Tag: noindex apenas para o JSON de dados. Não era o bloqueio das fichas. | Regra da API preservada no arquivo gerado; acrescentadas regras para pendências e ambientes não públicos.                        |
| `public/robots.txt`                                | Anunciava o sitemap de produção também em previews; não distinguia ambientes.     | Substituído por endpoint estático dependente do ambiente, permitindo leitura do noindex e anunciando Sitemap apenas em produção. |
| `src/pages/index.astro`                            | Sem canonical e sem proteção própria de preview.                                  | Canonical da página inicial e robots conforme o ambiente.                                                                        |
| `astro.config.mjs` / globais                       | Sem bloqueio global antigo; site/trailingSlash não declarados.                    | Origem canônica e barra final explícitas; integração leve injeta o endpoint reservado `_headers`.                                |

## Conferência HTTP da versão atualmente publicada

Inspeção somente de leitura, antes desta proposta: início HTTP 200 sem meta robots nem X-Robots-Tag; Betta HTTP 200 com `noindex, follow` na meta e sem bloqueio por header; API JSON HTTP 200 com header `noindex`; URL versionada existente HTTP 200 com header de preview `noindex`. Isso confirma que não há um noindex global observado na produção e que o bloqueio da ficha vem da meta derivada do estado editorial. Os quatro resultados estão registrados em `docs/seo-indexacao.json`.

## Critério de prontidão

Foram cruzados o inventário de 45 fichas, a revisão editorial individual já registrada, os metadados e a consistência entre resumo e conteúdo completo. Não basta remover a tag noindex: páginas com pendências relevantes continuam bloqueadas. A inexistência de um valor específico de KH ou uma escala científica de dificuldade não foi preenchida com suposição e não foi usada para inventar parâmetros.

As seis pendências abaixo ficam fora do sitemap e recebem tanto meta robots quanto X-Robots-Tag noindex. Permanecem acessíveis aos visitantes, com canonical para sua própria URL; não são redirecionadas nem canonicalizadas para outro animal. O rastreamento em produção continua permitido para que o robô consiga ler o noindex.

## Fichas ainda bloqueadas

| Ficha                                         | URL                                   | Motivo                                                                                                     |
| --------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Agulhinha Prata — _Dermogenys pusilla_        | `/especies/peixe-agulhinha/`          | Divergência de tamanho adulto não reconciliada; confirmação do lote necessária antes de definir lotação.   |
| Venustus — _Nimbochromis venustus_            | `/especies/nimbochromis-venustus/`    | Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico. |
| Zebra-laranja — _Maylandia estherae_          | `/especies/maylandia-estherae/`       | Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico. |
| Acará-heckelii — _Acarichthys heckelii_       | `/especies/acarichthys-heckelii/`     | Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico. |
| Tricogáster-azul — _Trichopodus trichopterus_ | `/especies/trichopodus-trichopterus/` | Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico. |
| Tricogáster-leeri — _Trichopodus leerii_      | `/especies/trichopodus-leerii/`       | Dimensionamento final de adultos/grupos requer projeto específico; não foi inventado novo mínimo numérico. |

A retenção de cinco fichas por dimensionamento é conservadora: conteúdo útil sobre manutenção não equivale à resolução do mínimo recomendado para os contextos de adultos/grupos citados no relatório anterior. A liberação futura exige registrar a decisão e conferir o conteúdo, em vez de trocar o estado em massa.

## Fichas liberadas no código proposto

| Ficha                      | Nome científico                  | Canonical                                                                                |
| -------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| Neon-chinês                | _Tanichthys albonubes_           | https://uberpeixes-institutional-site.pages.dev/especies/neon-chines/                    |
| Barbus cereja              | _Rohanella titteya_              | https://uberpeixes-institutional-site.pages.dev/especies/barbus-cereja/                  |
| Barbo Conchônio Cereja Véu | _Pethia conchonius_              | https://uberpeixes-institutional-site.pages.dev/especies/barbus-cereja-veu/              |
| Barbus Denizoni            | _Dawkinsia denisonii_            | https://uberpeixes-institutional-site.pages.dev/especies/barbus-denizoni/                |
| Barbo-gema                 | _Pethia gelius_                  | https://uberpeixes-institutional-site.pages.dev/especies/pethia-gelius/                  |
| Barbo-ouro                 | _Barbodes semifasciolatus_       | https://uberpeixes-institutional-site.pages.dev/especies/barbodes-semifasciolatus/       |
| Barbo-sumatra              | _Puntigrus tetrazona_            | https://uberpeixes-institutional-site.pages.dev/especies/puntigrus-tetrazona/            |
| Paulistinha                | _Danio rerio_                    | https://uberpeixes-institutional-site.pages.dev/especies/danio-rerio/                    |
| Betta                      | _Betta splendens_                | https://uberpeixes-institutional-site.pages.dev/especies/betta-splendens/                |
| Dojo                       | _Misgurnus anguillicaudatus_     | https://uberpeixes-institutional-site.pages.dev/especies/misgurnus-anguillicaudatus/     |
| Aulonocara-stuartgranti    | _Aulonocara stuartgranti_        | https://uberpeixes-institutional-site.pages.dev/especies/aulonocara-stuartgranti/        |
| Auratus                    | _Melanochromis auratus_          | https://uberpeixes-institutional-site.pages.dev/especies/melanochromis-auratus/          |
| Labidochromis yellow       | _Labidochromis caeruleus_        | https://uberpeixes-institutional-site.pages.dev/especies/labidochromis-caeruleus/        |
| Lombardoi                  | _Maylandia lombardoi_            | https://uberpeixes-institutional-site.pages.dev/especies/maylandia-lombardoi/            |
| Socolofi                   | _Chindongo socolofi_             | https://uberpeixes-institutional-site.pages.dev/especies/chindongo-socolofi/             |
| Acará-bandeira             | _Pterophyllum scalare_           | https://uberpeixes-institutional-site.pages.dev/especies/pterophyllum-scalare/           |
| Acará-boca-de-fogo         | _Thorichthys meeki_              | https://uberpeixes-institutional-site.pages.dev/especies/thorichthys-meeki/              |
| Green terror               | _Andinoacara rivulatus_          | https://uberpeixes-institutional-site.pages.dev/especies/andinoacara-rivulatus/          |
| Oscar                      | _Astronotus ocellatus_           | https://uberpeixes-institutional-site.pages.dev/especies/astronotus-ocellatus/           |
| Ramirezi                   | _Mikrogeophagus ramirezi_        | https://uberpeixes-institutional-site.pages.dev/especies/mikrogeophagus-ramirezi/        |
| Colisa-chuna               | _Trichogaster chuna_             | https://uberpeixes-institutional-site.pages.dev/especies/trichogaster-chuna/             |
| Peixe-paraíso              | _Macropodus opercularis_         | https://uberpeixes-institutional-site.pages.dev/especies/macropodus-opercularis/         |
| Comedor-de-algas-chinês    | _Gyrinocheilus aymonieri_        | https://uberpeixes-institutional-site.pages.dev/especies/gyrinocheilus-aymonieri/        |
| Coridora-schwartzi         | _Hoplisoma schwartzi_            | https://uberpeixes-institutional-site.pages.dev/especies/hoplisoma-schwartzi/            |
| Pangasius                  | _Pangasianodon hypophthalmus_    | https://uberpeixes-institutional-site.pages.dev/especies/pangasianodon-hypophthalmus/    |
| Pirarara                   | _Phractocephalus hemioliopterus_ | https://uberpeixes-institutional-site.pages.dev/especies/phractocephalus-hemioliopterus/ |
| Espada                     | _Xiphophorus hellerii_           | https://uberpeixes-institutional-site.pages.dev/especies/xiphophorus-hellerii/           |
| Lebiste                    | _Poecilia reticulata_            | https://uberpeixes-institutional-site.pages.dev/especies/poecilia-reticulata/            |
| Molinésia-sphenops         | _Poecilia sphenops_              | https://uberpeixes-institutional-site.pages.dev/especies/poecilia-sphenops/              |
| Tetra-mato-grosso          | _Megalamphodus eques_            | https://uberpeixes-institutional-site.pages.dev/especies/megalamphodus-eques/            |
| Tetra-olho-de-fogo         | _Bario sanctaefilomenae_         | https://uberpeixes-institutional-site.pages.dev/especies/bario-sanctaefilomenae/         |
| Tetra-limão                | _Hyphessobrycon pulchripinnis_   | https://uberpeixes-institutional-site.pages.dev/especies/hyphessobrycon-pulchripinnis/   |
| Tetra-pristela             | _Pristella maxillaris_           | https://uberpeixes-institutional-site.pages.dev/especies/pristella-maxillaris/           |
| Tetra-foguinho             | _Hyphessobrycon amandae_         | https://uberpeixes-institutional-site.pages.dev/especies/hyphessobrycon-amandae/         |
| Tetra-glowlight            | _Hemigrammus erythrozonus_       | https://uberpeixes-institutional-site.pages.dev/especies/hemigrammus-erythrozonus/       |
| Tetra-negro                | _Gymnocorymbus ternetzi_         | https://uberpeixes-institutional-site.pages.dev/especies/gymnocorymbus-ternetzi/         |
| Neon-cardinal              | _Paracheirodon axelrodi_         | https://uberpeixes-institutional-site.pages.dev/especies/paracheirodon-axelrodi/         |
| Neon-negro                 | _Hyphessobrycon herbertaxelrodi_ | https://uberpeixes-institutional-site.pages.dev/especies/hyphessobrycon-herbertaxelrodi/ |
| Tetra-pinguim              | _Thayeria boehlkei_              | https://uberpeixes-institutional-site.pages.dev/especies/thayeria-boehlkei/              |

## Ambientes, headers e descoberta

- `src/config/indexing.ts` centraliza a política. Em Cloudflare Pages, somente `CF_PAGES=1` com `CF_PAGES_BRANCH=main` libera produção; uma variável compartilhada não pode transformar branch de preview em produção.
- Fora do Cloudflare, o padrão é noindex. `SITE_DEPLOYMENT=production` permite testar localmente o HTML final de produção e é usado no CI.
- Branches não públicas têm meta noindex/nofollow em todas as páginas, header global equivalente, robots permitindo ler essas diretivas e sitemap vazio.
- A regra de hostname `https://:preview.uberpeixes-institutional-site.pages.dev/*` mantém noindex nas URLs alternativas/hash, mesmo quando o artefato pertence a um build da main. Ela não corresponde ao hostname público de produção.
- API JSON, caminhos de testes/preview e página de erro ficam fora do índice. Não há rotas HTML de testes no artefato auditado.
- Robots permite o rastreamento de produção e anuncia o sitemap absoluto. Robots não é usado para esconder uma página noindex do robô.
- Canônicas permanecem na origem pública correta, sempre para a própria página. Slugs e nomes científicos únicos, URLs do sitemap sem duplicação e todo destino do sitemap resolvendo para HTML real.

## Validações

- `npm run test:seo`: gera builds isolados de produção Cloudflare, preview Cloudflare com override de produção indevido e ambiente local padrão. Valida **47 documentos HTML por cenário**, além de robots, sitemap, headers e hostnames alternativos.
- Produção: 47 HTML, 41 URLs no sitemap, 39 fichas indexáveis e seis bloqueadas. Preview/local: 47 HTML, zero indexáveis e 45 fichas bloqueadas.
- O HTML gerado deve ter um H1, título e descrição não vazios e únicos, uma canonical exata, robots coerente, OG URL correto, JSON-LD válido, corpo distinto por espécie e todo o conteúdo científico/resumo já presente no HTML.
- A simulação de regras de `_headers` verifica que nenhum noindex efetivo atinge uma URL pronta de produção e que previews, API, testes e fichas pendentes continuam bloqueados.
- A validação de dados existente rejeita parâmetros resumidos contraditórios, referências ausentes, espécies ou fotos duplicadas. Nenhuma alegação de nova pesquisa biológica é feita nesta alteração de SEO.
- Build e Astro check aprovados, sem erros, avisos ou hints; auditoria dos dados e cinco testes Python aprovados. **48 testes Playwright aprovados em 3,7 minutos**, em desktop de 1440 px e celulares de 375 e 320 px. Formatação e integridade do diff também verificadas.

## Sem deploy nesta etapa

O commit usa o prefixo oficial `[CF-Pages-Skip]` para que o push necessário ao PR não publique um preview automaticamente. O GitHub Actions continua ativo. Nenhuma configuração global do projeto Cloudflare foi desativada.

Documentação oficial consultada no repositório Cloudflare: [skip de build](https://github.com/cloudflare/cloudflare-docs/blob/production/src/content/docs/pages/configuration/git-integration/github-integration.mdx#skipping-a-build-via-a-commit-message) e [headers por hostname](https://github.com/cloudflare/cloudflare-docs/blob/production/src/content/docs/pages/configuration/headers.mdx).

Após aprovação, um merge commit normal, sem esse prefixo, poderá executar o fluxo habitual da main. Até lá, o site de produção continua com a configuração anterior. A inclusão em sitemap e a ausência de noindex permitem indexação, mas a decisão e o prazo de inclusão nos resultados pertencem aos mecanismos de busca.
