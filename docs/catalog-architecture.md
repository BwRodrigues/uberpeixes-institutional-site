# Arquitetura do catálogo e decisões editoriais

## Cadastro sem recriar páginas

1. Adicionar um JSON em `src/data/species/` com slug único e estável, nome popular/científico confirmado, descrição, categoria, seções científicas e referências. Seguir `species-schema.ts` e o guia `species-catalog.md`. Não copiar informações biológicas entre espécies.
2. Definir `sortOrder` se necessário. `source` conserva a rastreabilidade dos registros da planilha, mas é opcional para novas fontes e futuros registros de banco de dados; não inventar uma linha de planilha para cadastrar outro animal.
3. Adicionar uma capa em `photo` e duas fotos distintas em `additionalPhotos`. Salvar arquivos reais, autorizados e otimizados em `public/images/species/`, com dimensões, alt, autor, licença, origem e alterações. Atualizar os créditos.
4. Informar `regions`, com IDs estáveis, rótulo, escala e IDs de fontes existentes em `references`. Exemplo de forma (usar somente quando a origem estiver documentada):

   ```json
   {
     "id": "asia",
     "label": "Ásia",
     "scale": "continent",
     "referenceIds": ["cof"]
   }
   ```

5. Manter `status: "draft"` até a revisão editorial. Completar identificação, imagens, seções e fontes antes de marcar `reviewed`. A aprovação não é inferida pelo cadastro ou pela remoção de avisos visuais.
6. Executar `npm run check`, `npm run build`, `npm run format:check` e `npm test`. Conferir ficha, sugestões, imagens, mensagens do WhatsApp e referências no preview. Abrir/atualizar PR; não mesclar na main sem autorização.

Não editar componentes ou criar arquivos de páginas para cada espécie. O carregador descobre os JSONs; as rotas, listagem, busca, categorias, metadados, links e sugestões usam o mesmo conjunto de dados. O sitemap inclui os registros aprovados conforme a política editorial existente.

## Separação de responsabilidades

- `species-schema.ts`: contrato independente de armazenamento.
- `species-validation.ts`: validação dos registros e estado de publicação.
- `species.ts`: adaptador atual de leitura dos JSONs do Astro; não contém critérios biológicos de recomendação.
- `catalog-repository.ts`: interface `CatalogRepository` com `list`, `findBySlug` e `recommendations`, validação de regiões/avaliações e seleção determinística.
- `compatibility.json`: avaliações entre pares; permanece vazio até haver avaliações científicas específicas revisadas.
- `SpeciesProfile.astro`/`SpeciesRecommendations.astro`: templates reutilizáveis; todo o conteúdo e as sugestões são renderizados no HTML inicial.
- `catalog-knowledge.ts`: serialização pública versionada, sem dependência do armazenamento.
- `/dados/catalogo-especies.json`: exportação estática gerada no mesmo build, com os cadastros e suas fontes.

O banco e o chatbot não foram conectados. A preparação entrega um contrato de dados, uma camada de acesso intercambiável e uma exportação consumível; não simula serviços em funcionamento.

## Critérios das três sugestões

1. Excluir o próprio animal e candidatos sem identificação/foto.
2. Priorizar **Convivência compatível** somente quando existir uma avaliação específica do par com `status: "reviewed"` e documentação de água, comportamento, porte/espaço, condições de manutenção e referências com autoria/consulta. Faixas numéricas coincidentes ou o mesmo continente não aprovam convivência automaticamente. O algoritmo não interpreta linguagem natural para preencher esses critérios.
3. Para **Mesma região**, exigir uma região compartilhada com fontes nos dois cadastros. Priorizar bacia, país e sub-região antes de continente. Exibir rótulo e escala, e oferecer as fontes da indicação no cartão.
4. Desempatar pela ordem circular dos registros, evitando favorecer sempre os mesmos animais quando a evidência tem a mesma prioridade. Limitar a três candidatos distintos; dados iguais geram o mesmo resultado.
5. Mostrar menos candidatos se faltarem relações fundamentadas. Não inventar relações para completar uma grade.

As cinco espécies atuais têm origem asiática documentada nos respectivos registros do Catalog of Fishes. O único agrupamento comum cadastrado é **Ásia, em escala continental**. Assim, os 15 cartões atuais recebem “Mesma região” e o contexto “Ásia · continente”. Essa indicação não afirma que compartilham país, bacia, habitat ou condições de convivência. As avaliações de compatibilidade entre pares continuam pendentes; nenhuma foi inferida das faixas de água.

### Avaliações futuras de convivência

Uma entrada em `compatibility.json` contém:

- `species`: dois slugs existentes, sem repetição;
- `status`: `draft` durante pesquisa ou `reviewed` após revisão;
- `waterParameters`, `behavior`, `adultSizeAndSpace`: análise própria do par, incluindo intervalos adequados à manutenção, interação, porte e dimensões/lotação;
- `conditions`: condições essenciais, que aparecem no cartão;
- `references`: referências reais, com ID, título, autoria, URL HTTPS e data de consulta.

O build rejeita avaliações revisadas incompletas, pares duplicados/inexistentes e regiões sem referências ou com identidades inconsistentes. Uma revisão editorial humana continua necessária para avaliar a qualidade das fontes e as conclusões: preencher campos não comprova cientificamente compatibilidade.

## Contrato para banco de dados e chatbot

A exportação `/dados/catalogo-especies.json` contém `schemaVersion: 1` e registros com ID estável (slug), URL canônica, identificação, descrição, fotos/créditos, regiões, estado editorial, seções, referências e sugestões com tipo, condições e evidências. Não exporta os campos de metadados da planilha (arquivo/aba/linha) nem `commercialName`, e não contém preços nem disponibilidade de estoque. A categoria pública permanece disponível. Campos científicos preservam `referenceIds`; sugestões preservam a evidência e sua distinção geográfica/compatibilidade.

Para banco de dados: implementar a leitura das tabelas/documentos de espécies, fotos, fontes, regiões e avaliações de pares; mapear ao mesmo contrato `Species[]`/`CompatibilityAssessment[]`; validar com `createCatalogRepository`. A integração deverá substituir o adaptador JSON no build ou optar conscientemente por renderização de servidor. Não é necessário reescrever o template. Escolha de provedor, migração, credenciais, atualização em tempo real e administração ficam para essa integração futura.

Para chatbot: consumir a exportação ou o mesmo repositório, manter citações/estado editorial e tratar valores desconhecidos como desconhecidos. O selo geográfico nunca deve ser convertido em recomendação de convivência. Valores e estoque devem vir de uma futura fonte comercial confirmada ou da equipe da loja; não podem ser inferidos deste catálogo científico. A escolha de modelo, indexação e interface de conversa não faz parte desta entrega.

A exportação tem `X-Robots-Tag: noindex` configurado em `public/_headers` para Cloudflare Pages. O preview estático local do Astro não interpreta esse arquivo; o teste local confere o artefato, e a validação no preview público confere o cabeçalho HTTP real. O estado editorial individual também aparece no JSON. As páginas mantêm a política de noindex/sitemap do protótipo até a aprovação.

## Verificação

Os testes verificam três sugestões distintas por ficha, exclusão do próprio animal, rótulo/escala/fontes, fotos e destinos válidos. Testes de contrato verificam a prioridade de pares revisados, exclusão de avaliações em rascunho e rejeição de evidência incompleta ou região sem fonte. Dados sintéticos usados nos testes ficam fora do catálogo publicado. Também verificam leitura por um adaptador sem `source` de planilha e o contrato JSON público. Os testes anteriores de HTML inicial, semântica, acordeões, WhatsApp, SEO, fotos e responsividade são preservados.

Capturas de revisão: [desktop](review/species-recommendations-desktop.png) e [celular](review/species-recommendations-mobile.png). A conferência navegável deve usar o preview HTTPS do PR, que permite abrir os cartões e percorrer as fichas.
