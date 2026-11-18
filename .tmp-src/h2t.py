import re, sys, html
from html.parser import HTMLParser

BLOCK = {'p','div','br','li','tr','h1','h2','h3','h4','h5','h6','section','article','table'}

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip = 0
        self.buf = []
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'noscript'):
            self.skip += 1
        if tag in BLOCK:
            self.flush()
            if tag == 'br':
                self.out.append('\n')
    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'noscript'):
            self.skip = max(0, self.skip - 1)
        if tag in BLOCK:
            self.flush()
            self.out.append('\n')
    def handle_data(self, d):
        if self.skip:
            return
        self.buf.append(d)
    def flush(self):
        if self.buf:
            t = ''.join(self.buf).replace('\xa0', ' ')
            t = re.sub(r'[ \t\r\f\v]+', ' ', t).strip()
            if t:
                self.out.append(t)
            self.buf = []

src, dst = sys.argv[1], sys.argv[2]
raw = open(src, 'rb').read()
for enc in ('utf-8', 'gb18030'):
    try:
        text = raw.decode(enc)
        break
    except UnicodeDecodeError:
        continue
p = P()
p.feed(text)
p.flush()
res = '\n'.join(p.out)
res = re.sub(r'\n{3,}', '\n\n', res)
open(dst, 'w').write(res)
print(dst, len(res))
