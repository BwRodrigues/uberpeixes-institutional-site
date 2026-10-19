#!/usr/bin/env python3
"""Build and audit actual HTML, robots, sitemap and Pages headers without deploying."""
import hashlib
import json
import os
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]
SITE = 'https://uberpeixes-institutional-site.pages.dev'
PREVIEW = 'https://test-branch.uberpeixes-institutional-site.pages.dev'
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.title = []; self.meta = {}; self.canonical = []; self.h1 = 0
        self.in_title = False; self.json_ld = []; self.script = None; self.text = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta': self.meta.setdefault(a.get('name', a.get('property','')), []).append(a.get('content',''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if tag == 'script' and a.get('type') == 'application/ld+json': self.script = []
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.script is not None:
            self.json_ld.append(json.loads(''.join(self.script))); self.script = None
    def handle_data(self, value):
        self.text.append(value)
        if self.in_title:self.title.append(value)
        if self.script is not None:self.script.append(value)

def directives(value):return {part.strip().lower() for part in value.split(',')}
def header_rules(source):
    rules = []; current = None
    for line in source.splitlines():
        if not line.strip() or line.lstrip().startswith('#'):continue
        if not line[0].isspace():
            current = (line.strip(), []); rules.append(current)
        else:
            key, value = line.strip().split(':',1)
            if key.lower() == 'x-robots-tag':current[1].append(value.strip())
    return rules

def applied_headers(rules, url):
    parsed = urlsplit(url); result = set()
    for pattern, values in rules:
        if pattern.startswith('https://'):
            target = urlsplit(pattern)
            host = re.escape(target.netloc).replace(':preview', '[^.]+')
            if not re.fullmatch(host, parsed.netloc):continue
            pattern = target.path
        if re.fullmatch(re.escape(pattern).replace(r'\*', '.*'), parsed.path):
            for value in values:result.update(directives(value))
    return result

def validate(directory, production, animals, decision):
    rules = header_rules((directory/'_headers').read_text())
    sitemap = ET.fromstring((directory/'sitemap.xml').read_text())
    locations = [node.text for node in sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    ready = set(decision['ready']); expected = {'/','/especies/'} | {f'/especies/{slug}/' for slug in ready}
    assert len(locations) == len(set(locations)), 'Duplicate sitemap URLs'
    assert set(locations) == ({SITE+path for path in expected} if production else set()), 'Wrong sitemap membership'
    robots = (directory/'robots.txt').read_text()
    if production:
        assert 'Allow: /' in robots and 'Disallow: /' not in robots
        assert f'Sitemap: {SITE}/sitemap.xml' in robots
    else:assert 'Allow: /' in robots and 'Disallow: /' not in robots and 'Sitemap:' not in robots
    paths = {'/':None,'/especies/':None, **{f"/especies/{a['slug']}/":a for a in animals}}
    generated = {'/'+str(p.relative_to(directory).parent).strip('.')+'/' for p in directory.rglob('index.html')}
    generated = {re.sub('/+', '/', p) for p in generated}
    assert generated == set(paths), ('Unexpected/missing HTML routes', generated ^ set(paths))
    titles = set(); descriptions = set(); bodies = set()
    for path, animal in paths.items():
        document = directory/path.lstrip('/')/'index.html'
        source = document.read_text(); page = Page(source)
        assert page.h1 == 1 and len(page.canonical) == 1, path
        assert page.canonical == [SITE+path], ('Wrong canonical',path)
        title = ''.join(page.title).strip(); description = page.meta.get('description',[])
        assert title and title not in titles, ('Duplicate/empty title',path);titles.add(title)
        assert len(description) == 1 and description[0].strip() and description[0] not in descriptions, ('Duplicate description',path);descriptions.add(description[0])
        robots_meta = page.meta.get('robots',[]);assert len(robots_meta)==1, path
        actual = directives(robots_meta[0]); indexable = production and path in expected
        assert ('noindex' not in actual and 'index' in actual) if indexable else 'noindex' in actual, path
        assert ('noindex' not in applied_headers(rules,SITE+path)) == indexable, ('Header/meta conflict',path)
        # Even the alternate hostname of a production build remains noindex.
        assert 'noindex' in applied_headers(rules, PREVIEW+path), ('Preview alias exposed',path)
        if animal:
            assert animal['scientificName'] in title and page.meta.get('og:url') == [SITE+path], path
            assert page.json_ld and any(x.get('@type')=='Article' for x in page.json_ld), path
            visible = ' '.join(page.text)
            for section in animal['sections']:
                for field in section['fields']:assert field['value'] in visible, ('Missing initial content',path,field['label'])
            for fact in animal['essentials']:assert fact['value'] in visible, ('Missing summary',path,fact['key'])
            body = '\n'.join(field['value'] for section in animal['sections'] for field in section['fields'])
            assert body not in bodies, ('Duplicate species body',path);bodies.add(body)
    for url in locations:assert (directory/urlsplit(url).path.lstrip('/')/'index.html').is_file(), url
    for path in ['/dados/catalogo-especies.json','/tests/sample/','/testes/sample/','/preview/sample/','/404.html']:
        assert 'noindex' in applied_headers(rules,SITE+path), ('Non-public resource exposed',path)
    return {'html':len(paths),'indexable':len(locations),'speciesReady':len(ready) if production else 0,'speciesBlocked':len(animals)-len(ready) if production else len(animals)}

def main():
    animals = [json.loads(f.read_text()) for f in sorted((ROOT/'src/data/species').glob('*.json'))]
    decision = json.loads((ROOT/'docs/seo-indexacao.json').read_text())
    assert {a['slug'] for a in animals} == set(decision['ready']) | set(decision['blocked'])
    assert not set(decision['ready']) & set(decision['blocked'])
    for animal in animals:
        assert (animal['status']=='reviewed') == (animal['slug'] in decision['ready'])
        biology = {k:v for k,v in animal.items() if k!='status'}
        digest = hashlib.sha256(json.dumps(biology,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
        assert digest == decision['biologySha256'][animal['slug']], ('Biology changed in SEO patch',animal['slug'])

    results = {}
    scenarios = {
        'cloudflare-production':{'CF_PAGES':'1','CF_PAGES_BRANCH':'main','SITE_DEPLOYMENT':'preview'},
        'cloudflare-preview':{'CF_PAGES':'1','CF_PAGES_BRANCH':'fix/indexacao-fichas-especies','SITE_DEPLOYMENT':'production'},
        'local-default':{},
    }
    (ROOT/'.astro').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='seo-audit-', dir=ROOT/'.astro') as cache:
        for name, values in scenarios.items():
            env = dict(os.environ)
            for key in ['CF_PAGES','CF_PAGES_BRANCH','SITE_DEPLOYMENT']:env.pop(key,None)
            env.update(values);env['ASTRO_TELEMETRY_DISABLED']='1'
            output = Path(cache)/name
            r = subprocess.run(['npm','run','build','--','--outDir',str(output)],cwd=ROOT,env=env,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
            assert r.returncode==0, r.stdout
            results[name]=validate(output,name=='cloudflare-production',animals,decision)
    print(json.dumps(results,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
