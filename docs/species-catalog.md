# Catálogo de espécies — protótipo V1

## Escopo e seleção

Exatamente os cinco primeiros registros válidos da aba `Tabela Peixes Atual`, linhas 6–10, do arquivo `VAREJO PEIXES NICHOS.xlsx`. O arquivo original e seus preços/valores financeiros não são distribuídos no repositório.

| Registro comercial     | Nome científico adotado |
| ---------------------- | ----------------------- |
| NEON CHINES (TANICTIS) | Tanichthys albonubes    |
| PEIXE AGULHINHA        | Dermogenys pusilla      |
| BARBUS CEREJA          | Rohanella titteya       |
| BARBUS CEREJA VEU      | Rohanella titteya       |
| BARBUS DENIZONI        | Dawkinsia denisonii     |

A loja confirmou Agulhinha Prata como `Dermogenys pusilla`. Cinco registros comerciais representam quatro espécies biológicas; véu é uma variedade ornamental, não outra espécie. Não ampliar o catálogo antes da aprovação deste protótipo.

## Arquitetura

- `src/data/species/*.json`: um registro independente por animal comercial, incluindo identificação, fontes, créditos e seções.
- `src/data/species-schema.ts`: contrato TypeScript e seções esperadas.
- `src/data/species.ts`: descoberta automática, ordenação pela linha original e validação durante o build.
- `src/pages/especies/index.astro`: galeria estática com pesquisa sem acentos e filtro combinado por categoria; navegação permanece disponível sem JavaScript.
- `src/pages/especies/[slug].astro` e `SpeciesProfile.astro`: geração de todas as fichas com um único template.
- `src/config/site.ts`: contato oficial e mensagem específica de consulta. Não há preços nem indicação de estoque.
- `src/styles/species.css`: apresentação isolada do catálogo, sem redesenhar a home.

## Adicionar um animal após aprovação

1. Criar um JSON em `src/data/species/` seguindo o contrato de `species-schema.ts`; o prefixo do arquivo é organizacional, a ordem vem de `source.row`.
2. Definir um slug único, preservar o nome comercial, preencher categoria, origem do registro e nome científico confirmado. Não copiar recomendações biológicas de outro animal.
3. Consultar fontes taxonômicas e de manutenção específicas. Cada campo precisa citar IDs existentes em `references`. Informar autor, título, ano quando publicado, URL e data real da consulta. Distinguir manutenção em aquário de registros na natureza.
4. Preencher as onze seções. Para informação não localizada, explicar a lacuna; não inventar longevidade, KH, números de indivíduos ou compatibilidade. `pending` permite deixar uma seção inteira pendente em um rascunho.
5. Colocar uma foto real e autorizada em `public/images/species/`. Informar dimensões reais, alt, autor, licença, URL da licença, página de origem e alterações efetuadas em `photo`. Acrescentar `note` para limitações da imagem. Não gerar uma imagem supostamente científica.
6. Revisar `relatedSlugs`, copiar o registro dos créditos para `docs/species-image-credits.json` e conferir as condições da licença.
7. Manter `status: "draft"` até a revisão da loja e da ficha. Depois da aprovação, mudar para `reviewed`; o build rejeita registros revisados sem nome científico, foto, referências ou seções completas.
8. Executar check, build, formatação e testes. Conferir o animal real, as imagens, referências e o texto da consulta antes de abrir PR. Não editar templates para cada nova espécie.

## SEO e revisão

Cada rota possui título, descrição, canonical, Open Graph e BreadcrumbList próprios; fichas com conteúdo possuem Article sem autores, avaliações ou datas inventadas. Os cinco pilotos estão acessíveis, porém com `noindex, follow` até a revisão da loja. O sitemap inclui apenas rotas aprovadas e a página inicial; `/especies/` entra quando houver ao menos uma ficha revisada. Aprovar as cinco fichas libera suas URLs automaticamente sem alterar templates. O protótipo não afirma disponibilidade.

## Executar e revisar

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run format:check
ASTRO_TELEMETRY_DISABLED=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Se Chromium estiver instalado por Playwright, omitir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. `npm run dev` inicia o Astro para revisão local. Os testes exercitam desktop 1440 px, celular 375 px e celular estreito 320 px, incluindo home/aquário, navegação, busca, filtros, reset, ausência de resultados, cinco fichas, imagens, console, metadados e WhatsApp. Referências e identificação requerem revisão editorial: testes de interface não comprovam exatidão científica.

Revisão manual: abrir `/especies/`, pesquisar `VÉU` e `Dermogenys`, combinar com categoria, limpar, abrir cada ficha e expandir seções. Conferir links de fontes e créditos, mensagem de WhatsApp sem enviá-la, logo e ausência de rolagem horizontal. A home deve manter textos, imagens e destinos anteriores.

## Capturas de revisão

[Catálogo no desktop](review/species-catalog-desktop.png) e [ficha da agulhinha no celular](review/species-profile-mobile.png). Capturadas com movimento reduzido, sem modificar as animações do site.
