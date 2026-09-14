import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = process.argv[2] ?? new URL('../public', import.meta.url).pathname;
const TYPES = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
const server = createServer(async (req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = join(ROOT, normalize(p));
  try { await stat(file); const b = await readFile(file);
    res.writeHead(200,{'Content-Type':TYPES[extname(file)]||'application/octet-stream'}); res.end(b);
  } catch { res.writeHead(404); res.end('404'); }
});
await new Promise(r=>server.listen(4321,r));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const shots = [['desktop',1440,1000],['tablet',820,1100],['mobile',390,844]];
for (const [name,w,h] of shots) {
  const page = await browser.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
  const errors=[]; page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('pageerror',e=>errors.push('PAGEERROR '+e.message));
  await page.goto('http://127.0.0.1:4321/', { waitUntil:'networkidle' });
  await page.evaluate(async ()=>{
    document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible'));
    document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
    for (let y=0; y<document.body.scrollHeight; y+=400){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,40)); }
    window.scrollTo(0,0);
    await Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;})));
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path:`./.tmp/shot-${name}.png`, fullPage:true });
  const overflow = await page.evaluate(()=>({doc:document.documentElement.scrollWidth, win:window.innerWidth}));
  console.log(name, JSON.stringify(overflow), errors.length?errors:'no console errors');
  await page.close();
}
await browser.close(); server.close();
