#!/usr/bin/env python3
"""Audit imported rows, generated profiles, attribution, image identity and resume ledger."""
import argparse
import hashlib
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
DOC = ROOT / 'docs/catalogo'
def read(path):return json.loads(path.read_text())
def write(path,value):path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def audit():
    inventory=read(DOC/'importacao.json');decisions=read(DOC/'resolucoes.json')['records'];sources=read(DOC/'fontes.json');research=read(DOC/'pesquisa.json');photos=read(DOC/'fotos.json')
    records=[read(f) for f in sorted((ROOT/'src/data/species').glob('*.json'))];byname={r['scientificName']:r for r in records};slugs={r['slug'] for r in records}
    assert len(byname)==len(records),'Duplicate scientific identity'
    assert len(slugs)==len(records),'Duplicate URL'
    assert {str(r['row']) for r in inventory['records']}==set(decisions),'Every input row needs one decision'
    hashes={};urls=set();credits=[]
    for animal in records:
        assert len(animal['additionalPhotos'])==2,animal['slug']
        for index,photo in enumerate([animal['photo']]+animal['additionalPhotos'],1):
            path=ROOT/'public'/photo['src'].lstrip('/');assert path.is_file(),photo['src']
            digest=hashlib.sha256(path.read_bytes()).hexdigest();assert digest not in hashes,('Repeated image bytes',photo['src'],hashes.get(digest));hashes[digest]=photo['src']
            assert photo['sourceUrl'] not in urls,('Repeated Commons file',photo['sourceUrl']);urls.add(photo['sourceUrl'])
            assert photo['author'] and photo['license'] and photo['licenseUrl'].startswith('https://'),photo['src']
            credits.append({'slug':animal['slug'],'position':index,**photo})
    snapshots=read(DOC/'preservados.json')
    editorial=read(DOC/'revisao-editorial.json')['records'] if (DOC/'revisao-editorial.json').exists() else {}
    reviewed={item['file']:item for item in editorial.values()}
    for file,digest in snapshots.items():
        change=reviewed.get(file);expected=change['afterSha256'] if change else digest
        if change:assert change['beforeSha256']==digest and change['decision'],'Review must preserve the original baseline and justification: '+file
        assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==expected,'Unrecorded change to an approved record: '+file
    for slug,change in editorial.items():
        assert hashlib.sha256((ROOT/change['file']).read_bytes()).hexdigest()==change['afterSha256'],'Editorial record changed without review: '+slug
    rows=[]
    for row in inventory['records']:
        decision=decisions[str(row['row'])];out={**row,**decision};group=decision.get('group');source=sources.get(group,{})
        if group:
            tax=source.get('taxonomy');out['scientificName']=tax['scientificName'] if tax else None
            animal=byname.get(out['scientificName'])
            if animal:
                out.update(state='completed' if row['row']==source['rows'][0] else 'duplicate',slug=animal['slug'],reason='Ficha única gerada; variedades/tamanhos/sexos preservados como nomes alternativos, sem duplicar página.')
            else:
                reasons=[]
                if source.get('publicationPending'):reasons.append(source['publicationPending'])
                if not tax:reasons.append(source.get('taxonomyPending','Taxonomia oficial pendente.'))
                if group not in research:reasons.append('Conteúdo de manutenção ainda não aprovado para geração; revisar divergências e recomendações específicas.')
                if len(photos.get(group,[]))!=3:reasons.append('Não foram selecionadas três fotografias reais distintas com licença comercial adequada.')
                elif source.get('photoReview')!='verified':reasons.append('Download e conferência visual das três fotografias pendentes; metadados não substituem a inspeção dos arquivos.')
                if not all(k in source.get('careNumbers',{}) for k in ['temperature','ph','gh','size']):reasons.append('Faixas de manutenção ou tamanho adulto não confirmados em fonte consultada.')
                if group=='synodontis-petricola':reasons.append('Fonte mistura a antiga forma anã com S. petricola; revisar distinção de S. lucipinnis e reprodução.')
                if group=='synodontis-eupterus':reasons.append('Mínimo histórico de 108 L não contextualiza adequadamente porte de até 30 cm; buscar recomendação melhor fundamentada.')
                out.update(state='pending',reason=' '.join(reasons) or 'Revisão editorial pendente.')
        rows.append(out)
    count={state:sum(r['state']==state for r in rows) for state in ['existing','completed','duplicate','pending','pending-identification']}
    assert sum(count.values())==len(rows)
    # Display all input names, not only taxonomic groups, so unresolved aliases can be resumed safely.
    pending=[r for r in rows if r['state'] in ['pending','pending-identification']]
    lines=['# Expansão do catálogo — relatório de pendências','', 'Relatório gerado por `python3 scripts/catalog/audit_catalog.py --write`. Não contém preços, estoque, telefones da planilha nem instruções das abas auxiliares.','', '## Inventário e contagem','',f"- Arquivo: `{inventory['workbook']}`; SHA-256 `{inventory['sha256']}`.",f"- Registros comerciais recebidos: **{len(rows)}** (incluem plantas e variedades, não equivalem a espécies biológicas).",f"- Abas inspecionadas: **{len(inventory['sheets'])}**; duas abas de instruções não contêm registros de catálogo e não foram executadas.",f"- Espécies já existentes preservadas: **{count['existing']}**.",f"- Novas fichas geradas: **{count['completed']}**; total de fichas navegáveis: **{len(records)}**.",f"- Registros comerciais incorporados como variedades/aliases de fichas novas, sem URL adicional: **{count['duplicate']}**.",f"- Registros ignorados ou pendentes: **{len(pending)}**.",f"- Grupos científicos candidatos: **{len(sources)+count['existing']}**; **{sum('taxonomy' in s for s in sources.values())+count['existing']}** têm nome aceito verificado no Catalog of Fishes. Essa contagem não resolve a identidade dos demais nomes comerciais; o total biológico final da planilha continua indeterminado.",'','## Abas','', '| Aba | Tipo | Registros |','| --- | --- | --- |']
    lines += [f"| {s['name']} | {s['kind']} | {s['records']} |" for s in inventory['sheets']]
    lines += ['','## Lotes e retomada','']
    for b in read(DOC/'lotes.json'):lines.append(f"- `{b['id']}`: {', '.join(b['species'])}. Validação: {b['validation']}.")
    lines += ['','## Fichas novas concluídas','', '| Nome | Nome científico | Categoria original | URL relativa |','| --- | --- | --- | --- |']
    for r in rows:
        if r['state']=='completed':
            a=byname[r['scientificName']];lines.append(f"| {a['name']} | *{a['scientificName']}* | {a['category']} | `/especies/{a['slug']}/` |")
    lines += ['','## Duplicidades comerciais consolidadas','', 'O agrupamento é uma decisão explícita por espécie, não uma deduplicação por semelhança textual. Tamanhos, sexos e variedades não geram URLs diferentes. Linhagens híbridas duvidosas permanecem pendentes.','', '| Linha | Nome da planilha | Ficha de destino |','| --- | --- | --- |']
    lines += [f"| {r['row']} | {r['commercialName']} | *{r['scientificName']}* |" for r in rows if r['state']=='duplicate']
    lines += ['','## Pendências nominais: todos os registros para a próxima etapa','', '| Linha | Categoria | Nome comercial | Espécie candidata | Motivo específico |','| --- | --- | --- | --- | --- |']
    lines += [f"| {r['row']} | {r['category']} | {r['commercialName']} | {r.get('scientificName') or r.get('candidate') or 'Não confirmada'} | {r['reason']} |" for r in pending]
    lines += ['','## Imagens e licenciamento','', 'Somente fotografias reais com CC BY, CC BY-SA, CC0 ou domínio público são elegíveis. Créditos individuais, páginas de origem e licenças acompanham todas as fotos publicadas em `docs/species-image-credits.json`; `docs/catalogo/fotos.json` guarda a seleção pesquisada, hashes e situação de download. Imagens não concluídas não são servidas pelo catálogo.','', 'O serviço oficial `thumb.wikimedia.org` retornou bloqueio de túnel HTTP 403 neste ambiente. Originais em `upload.wikimedia.org` responderam com limite HTTP 429 e `Retry-After: 600`; os downloads são retomáveis e não substituem fotos indisponíveis por imagens erradas. Após respeitar o prazo, os originais acessíveis foram baixados e conferidos. Fotos de baixa resolução conservam as dimensões originais. Resolução e conversão ficam na documentação, sem poluir as legendas públicas. Arquivo truncado, imagem ilustrada, captura repetida e identificação contraditória foram rejeitados; decisões em `fotos-descartadas.json`. Fontes alternativas e limitações de acesso constam de `fontes-alternativas.json`.','', 'Espécies ainda sem conjunto de três imagens conferidas:']
    for key,source in sources.items():
        if source.get('photoReview')!='verified':lines.append(f"- {source['popularName']} — {source.get('taxonomy',{}).get('scientificName',source['candidateName'])}: seleção, download ou conferência incompletos; detalhes na tabela nominal.")
    lines += ['','## Informações científicas e referências que exigem revisão','', '- As novas fichas permanecem em `draft` e `noindex, follow` até aprovação editorial da loja para publicação; revisão técnica não equivale à autorização de publicar.', '- KH de manutenção não foi documentado nas fontes consultadas. Longevidade, doses de tratamento e valores não encontrados não foram inventados.', '- Diferenças taxonômicas entre Catalog of Fishes, GBIF e literatura de manutenção são registradas individualmente em `docs/catalogo/fontes.json`; a taxonomia das fichas novas prioriza o Catalog of Fishes.', '- Colisa-lália: o Catalog of Fishes trata Trichogaster lalius como sinônimo de T. fasciata. Atribuição da linhagem comercial e transferência de cuidados exigem revisão antes de gerar ficha.', '- Aulonocara, molinésias, platys, carpas, cascudos e vários invertebrados têm nomes comerciais que não resolvem espécie ou parentais; a tabela nominal discrimina cada caso.', '- Os mínimos históricos de algumas fontes são apresentados com contexto e ressalvas. Não são garantias universais de lotação ou convivência.', '- A indicação “Mesma região” informa origem e escala. Nenhuma convivência foi aprovada automaticamente por sobreposição de temperatura ou continente.', '- Região Indonésia é um país que inclui áreas asiáticas e da Oceania; não indica mesma ilha, bacia ou compatibilidade.','', '## Arquivos e fontes utilizados','', '- `scripts/import_species_workbook.py`: importação OOXML sem dependências, com detecção de mudanças de entrada.', '- `scripts/catalog/prepare_batch.py`: preparação em lotes a partir de decisões e fontes explícitas; não sobrescreve fichas existentes.', '- `scripts/catalog/audit_catalog.py`: contagem, créditos, integridade e relatório retomável.', '- `docs/catalogo/importacao.json`, `resolucoes.json`, `fontes.json`, `pesquisa.json`, `fotos.json`, `preservados.json` e `lotes.json`: rastreabilidade e checkpoints.', '- `src/data/species/*.json` e `public/images/species/`: dados e fotografias locais das fichas concluídas.', '- O template de ficha do PR #6 foi preservado; busca inclui aliases comerciais, validação rejeita duplicidade científica e reuso da mesma foto.', '- Fontes: Catalog of Fishes (nome válido, autoridade e família), classificação por família da California Academy of Sciences, Seriously Fish (manutenção específica), GBIF (reino/filo e comparação taxonômica) e Wikimedia Commons (licenciamento individual). URLs e data de consulta em `fontes.json` e em cada ficha.', '', '## Publicação e revisão','', 'Somente branch de desenvolvimento e preview. Não realizar merge nem publicar a main sem autorização. Pendências não bloqueiam fichas independentes que atendam aos critérios; a retomada não recria as existentes.','']
    return records,credits,'\n'.join(lines),count

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--write',action='store_true');p.add_argument('--validated-batch');a=p.parse_args()
    if a.validated_batch:
        ledger=read(DOC/'lotes.json');batch=next(b for b in ledger if b['id']==a.validated_batch);batch['validation']='build, integridade e testes do lote aprovados';write(DOC/'lotes.json',ledger)
    records,credits,report,counts=audit()
    if a.write:write(ROOT/'docs/species-image-credits.json',credits);(ROOT/'docs/catalogo-pendencias.md').write_text(report)
    print(json.dumps({'profiles':len(records),'rows':counts},ensure_ascii=False))
if __name__=='__main__':main()
