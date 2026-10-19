#!/usr/bin/env python3
"""Generate only individually curated, sourced, photographed records. No biological inference."""
import argparse
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
DOC = ROOT / 'docs/catalogo'
DATA = ROOT / 'src/data/species'

def read(name): return json.loads((DOC / name).read_text())
def write(path, value):path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
def slug(value):return value.lower().replace(' ', '-')
def field(label, value, refs=('care',)):return {'label':label,'value':value,'referenceIds':list(refs)}
def section(id, *fields):return {'id':id,'fields':list(fields)}
def make(key, source, research, photos, inventory):
    tax=source['taxonomy'];name=tax['scientificName'];rows=[r for r in inventory if r['row'] in source['rows']];first=rows[0];numbers=source['careNumbers'];family=tax['family']

    refs=[{'id':'cof','title':'Eschmeyer’s Catalog of Fishes — '+name,'url':tax['url'],'author':'California Academy of Sciences','accessedAt':source['accessedAt']},{'id':'class','title':'Eschmeyer’s Catalog of Fishes — classificação por família','url':'https://researcharchive.calacademy.org/research/ichthyology/catalog/SpeciesByFamily.asp','author':'California Academy of Sciences','accessedAt':source['accessedAt']},{'id':'care','title':source['candidateName']+' — manutenção e história natural','url':source['careUrl'],'author':'Seriously Fish','accessedAt':source['accessedAt']},{'id':'gbif','title':source['candidateName']+' — registro comparativo no GBIF','url':source['gbifUrl'],'author':'GBIF','accessedAt':source['accessedAt']}]
    identity='Nome aceito, família e autoridade conferidos no Catalog of Fishes. As formas comerciais foram agrupadas sem atribuir procedência ou pureza de linhagem não comprovadas.'
    if name != source['candidateName']:identity+=f" A fonte de manutenção e as fotos podem usar o nome anterior {source['candidateName']}; não são espécies adicionais."
    aliases='; '.join(r['commercialName'] for r in rows)
    portrait=[]
    for photo in photos:
        public_photo={k:v for k,v in photo.items() if k in ['src','width','height','alt','author','license','licenseUrl','sourceUrl','changes','note']}
        if public_photo.get('note','').startswith('Original de '):public_photo.pop('note')
        portrait.append(public_photo)
    regions=source['regions']
    return {'slug':slug(name),'name':source['popularName'],'commercialName':first['commercialName'],'category':first['category'],'source':{'workbook':'VAREJO PEIXES NICHOS.xlsx','sheet':first['sheet'],'row':first['row'],'niche':first['category']},'sortOrder':first['row'],'scientificName':name,'identificationNote':identity,'description':research['description'],'photo':portrait[0],'additionalPhotos':portrait[1:],'sections':[
      section('apresentacao',field('Outros nomes populares',aliases),field('Identificação científica',identity,('cof',)),field('Introdução',research['description'])),
      section('classificacao',field('Reino',tax['kingdom'],('gbif',)),field('Filo',tax['phylum'],('gbif',)),field('Classe',tax['className']+', conforme o esquema do Catalog of Fishes.',('class',)),field('Ordem',tax['order'],('class',)),field('Família',family,('cof',)),field('Gênero',name.split()[0],('cof',)),field('Espécie',name,('cof',)),field('Autoridade taxonômica',tax['authority'],('cof',)),field('Sinônimos científicos',f"Literatura de manutenção consultada sob {source['candidateName']}; o nome aceito adotado é {name}. Consultar o histórico nomenclatural completo na referência taxonômica.",('cof','care'))),
      section('origem',field('Continente e países',research['origin'],('care','cof')),field('Ambiente natural',research['habitat'])),
      section('caracteristicas',field('Tamanho adulto',numbers['size']+' (comprimento padrão, sem a nadadeira caudal). O tamanho de venda não corresponde necessariamente ao adulto.'),field('Diferenças entre machos e fêmeas',research['dimorphism'])),
      section('agua',field('Temperatura em aquário',numbers['temperature']+' °C, faixa da fonte para manutenção, sem reproduzir extremos naturais.'),field('pH em aquário',numbers['ph']+'; não interpretar os extremos como metas a alternar.'),field('GH',numbers['gh']+' °dGH.'),field('KH','A fonte consultada não estabelece faixa específica de KH para manutenção desta espécie; dado pendente, sem converter GH em KH.'),field('Substrato e decoração',research['maintenance'])),
      section('criacao',field('Volume mínimo e contexto',research['space']),field('Manutenção específica',research['maintenance'])),
      section('alimentacao',field('Alimentos adequados',research['diet'])),
      section('comportamento',field('Comportamento social',research['social'])),
      section('reproducao',field('Tipo de reprodução',research['reproduction'])),
      section('saude',field('Problemas de manutenção',research['maintenance'])),
      section('curiosidades',field('Curiosidades verificadas da espécie',research['curiosity'],('care','cof')))
    ],'references':refs,'regions':regions,'status':'draft'}

def reviewed_editorial(research):
    """Do not publish a research draft lacking individually edited care content."""
    editorial = research.get('editorial')
    if not isinstance(editorial, dict) or not editorial.get('description', '').strip():return None
    sections = editorial.get('sections', [])
    essentials = editorial.get('essentials', [])
    expected_sections = ['apresentacao','agua','caracteristicas','criacao','comportamento','alimentacao','reproducao','saude','origem','classificacao','curiosidades']
    expected_keys = ['temperature','ph','gh','size','volume','behavior','sociability','diet','difficulty']
    if [item.get('id') for item in sections] != expected_sections:return None
    if [item.get('key') for item in essentials] != expected_keys:return None
    valid_refs = {'cof','class','care','gbif'}
    for section in sections:
        if not section.get('fields') or section.get('pending'):return None
        for field in section['fields']:
            if not field.get('label') or not field.get('value', '').strip() or not field.get('referenceIds') or set(field['referenceIds']) - valid_refs:return None
    fields = {
        'temperature':('agua','Temperatura em aquário'), 'ph':('agua','pH em aquário'), 'gh':('agua','GH'),
        'size':('caracteristicas','Tamanho adulto'), 'volume':('criacao','Volume mínimo e contexto'),
        'behavior':('comportamento','Temperamento'), 'sociability':('comportamento','Sociabilidade'),
        'diet':('alimentacao','Dieta em aquário'), 'difficulty':('criacao','Dificuldade')
    }
    for fact in essentials:
        if not fact.get('value', '').strip() or not fact.get('referenceIds') or set(fact['referenceIds']) - valid_refs:return None
        section_id,label=fields[fact['key']]
        detail=next((field for section in sections if section['id']==section_id for field in section['fields'] if field['label']==label),None)
        if detail is None or set(fact['referenceIds']) - set(detail['referenceIds']):return None
        if fact['key']=='volume':
            if not detail['value'].startswith(fact['value']):return None
        elif fact['key']!='diet' and detail['value']!=fact['value']:return None
    return editorial

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--batch',required=True);p.add_argument('--limit',type=int,default=10);p.add_argument('--apply',action='store_true');a=p.parse_args()
    if a.limit<1 or not re.fullmatch(r'[a-z0-9-]+',a.batch):p.error('Positive limit and safe batch identifier required')
    inventory=read('importacao.json')['records'];sources=read('fontes.json');research=read('pesquisa.json');photos=read('fotos.json');existing=[json.loads(f.read_text()) for f in DATA.glob('*.json')];names={s['scientificName'] for s in existing};taxon_urls={ref['url'] for s in existing for ref in s['references'] if ref['id']=='cof'};slugs={s['slug'] for s in existing};prepared=[]
    for key,source in sorted(sources.items(),key=lambda item:item[1]['rows'][0]):
        if 'taxonomy' not in source or key not in research or source.get('photoReview')!='verified' or source.get('publicationPending'):continue
        name=source['taxonomy']['scientificName']
        if name in names or source['taxonomy']['url'] in taxon_urls:continue
        selected=photos.get(key,[])
        if len(selected)!=3 or not all(k in source['careNumbers'] for k in ['temperature','ph','gh','size']):continue
        if any(not (ROOT/'public'/s['src'].lstrip('/')).is_file() for s in selected):continue
        editorial=reviewed_editorial(research[key])
        if editorial is None:continue
        animal=make(key,source,research[key],selected,inventory)
        animal.update(description=editorial['description'],sections=editorial['sections'],essentials=editorial['essentials'],identificationNote='')
        if animal['slug'] in slugs:raise SystemExit('Conflicting URL: '+animal['slug'])
        for photo in selected:
            if hashlib.sha256((ROOT/'public'/photo['src'].lstrip('/')).read_bytes()).hexdigest()!=photo['webpSha256']:raise SystemExit('Image hash mismatch: '+photo['src'])
        prepared.append((key,animal));names.add(name);slugs.add(animal['slug'])
        if len(prepared)>=a.limit:break
    print(json.dumps({'batch':a.batch,'apply':a.apply,'prepared':[animal['slug'] for _,animal in prepared]},ensure_ascii=False,indent=2))
    if not a.apply or not prepared:return
    ledgerpath=DOC/'lotes.json';ledger=json.loads(ledgerpath.read_text()) if ledgerpath.exists() else []
    if any(b['id']==a.batch for b in ledger):raise SystemExit('Batch identifier already exists; choose the next batch to resume.')
    for key,animal in prepared:
        path=DATA/f"{animal['source']['row']:03d}-{animal['slug']}.json"
        if path.exists():raise SystemExit('Refusing to overwrite '+str(path))
    # All decisions validated before writes. Existing validated data is never modified.
    for key,animal in prepared:write(DATA/f"{animal['source']['row']:03d}-{animal['slug']}.json",animal)
    ledger.append({'id':a.batch,'species':[s['slug'] for _,s in prepared],'validation':'pending'});write(ledgerpath,ledger)
if __name__=='__main__':main()
