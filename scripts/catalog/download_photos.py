#!/usr/bin/env python3
"""Resume licensed Commons originals; stop on HTTP 429, verify hashes and optimize proportionally."""
import argparse
import hashlib
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[2]
DOC=ROOT/'docs/catalogo'

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--download',action='store_true',help='Allow HTTP downloads; otherwise process the cache only')
    parser.add_argument('--limit',type=int,default=10)
    parser.add_argument('--cache-dir',type=Path,default=Path('/tmp/uberpeixes-catalog-originals'))
    parser.add_argument('--output-dir',type=Path,default=Path('/tmp/uberpeixes-catalog-photos'))
    args=parser.parse_args();args.cache_dir.mkdir(parents=True,exist_ok=True);args.output_dir.mkdir(parents=True,exist_ok=True)
    manifest=json.loads((DOC/'fotos.json').read_text());limitpath=args.cache_dir/'retry-after.json'
    wait=json.loads(limitpath.read_text()).get('notBefore',0) if limitpath.exists() else 0
    if args.download and time.time()<wait:raise SystemExit(f'Retry-After not elapsed; resume after Unix timestamp {wait}. Cache-only processing is still available.')
    queue=[(key,photo) for key,photos in manifest.items() for photo in photos]
    queue.sort(key=lambda item:item[1].get('originalBytes',10**12))
    fetched=0;ready=0
    for key,photo in queue:
        raw=args.cache_dir/f"{photo['pageid']}.original";dest=args.output_dir/Path(photo['src']).name
        if not raw.exists():
            if not args.download or fetched>=args.limit:continue
            url=urllib.parse.urlsplit(photo['downloadUrl'])
            if url.scheme!='https' or url.hostname!='upload.wikimedia.org':raise SystemExit('Only official HTTPS Commons originals are accepted')
            # Canonical file URL without API analytics parameters; no cookies or credentials.
            request=urllib.request.Request(urllib.parse.urlunsplit((url.scheme,url.netloc,url.path,'','')),headers={'User-Agent':'UberpeixesCatalog/1.0 (+https://github.com/BwRodrigues/uberpeixes-institutional-site)'})
            try:
                with urllib.request.urlopen(request,timeout=40) as response:
                    data=response.read()
                if hashlib.sha1(data).hexdigest()!=photo['originalSha1']:raise SystemExit('Source image hash mismatch: '+photo['src'])
                temporary=raw.with_suffix('.tmp');temporary.write_bytes(data);temporary.replace(raw);fetched+=1
                time.sleep(2)
            except urllib.error.HTTPError as error:
                print(key,'HTTP',error.code,'Retry-After',error.headers.get('Retry-After'),flush=True)
                if error.code==429:
                    seconds=int(error.headers.get('Retry-After','600'))
                    limitpath.write_text(json.dumps({'notBefore':time.time()+seconds,'seconds':seconds}))
                    break
                continue
            except (urllib.error.URLError,TimeoutError) as error:
                print(key,'download pending:',error,flush=True);continue
        if hashlib.sha1(raw.read_bytes()).hexdigest()!=photo['originalSha1']:raise SystemExit('Cached source image hash mismatch: '+str(raw))
        try:
            image=ImageOps.exif_transpose(Image.open(raw)).convert('RGB');image.thumbnail((960,900));image.save(dest,'WEBP',quality=83,method=6)
        except (OSError,ValueError) as error:
            photo['processingError']=str(error)
            print(key,photo['pageid'],'invalid image:',error,flush=True)
            continue
        photo.pop('processingError',None)
        photo.update(width=image.width,height=image.height,webpSha256=hashlib.sha256(dest.read_bytes()).hexdigest());ready+=1
        # Checkpoint each success, even if a later file or connection fails.
        (DOC/'fotos.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
        print(key,photo['pageid'],'optimized',flush=True)
    (DOC/'fotos.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'downloaded':fetched,'processed':ready,'output':str(args.output_dir)}))
if __name__=='__main__':main()
