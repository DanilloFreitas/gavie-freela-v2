import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const ROOT=process.argv[2] ?? new URL('../public', import.meta.url).pathname;
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
const server=createServer(async(q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=join(ROOT,normalize(p));try{await stat(f);s.writeHead(200,{'Content-Type':T[extname(f)]||'application/octet-stream'});s.end(await readFile(f));}catch{s.writeHead(404);s.end('404');}});
await new Promise(r=>server.listen(4323,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ok=[],bad=[];
const check=(name,cond,extra='')=>(cond?ok:bad).push(name+(extra?` → ${extra}`:''));

// ---- desktop interactions
let page=await b.newPage({viewport:{width:1440,height:900}});
await page.goto('http://127.0.0.1:4323/',{waitUntil:'domcontentloaded'});
const card=page.locator('[data-product]').first();
const hrefBefore=await card.locator('[data-whatsapp-product]').getAttribute('href');
await card.locator('.size', {hasText:'GG'}).click();
await card.locator('.swatch').nth(3).click();
const hrefAfter=await card.locator('[data-whatsapp-product]').getAttribute('href');
check('CTA WhatsApp muda com a seleção', hrefBefore!==hrefAfter);
check('CTA contém tamanho GG', decodeURIComponent(hrefAfter).includes('Tamanho: GG'), decodeURIComponent(hrefAfter).split('text=')[1]);
check('CTA contém cor Rosa', decodeURIComponent(hrefAfter).includes('Cor: Rosa'));
check('aria-checked único em sizes', await card.locator('.size[aria-checked="true"]').count()===1);
// teclado
await card.locator('.size[aria-checked="true"]').focus();
await page.keyboard.press('ArrowLeft');
check('setas movem seleção de tamanho', await card.locator('.size[aria-checked="true"]').innerText()==='G');
check('nav desktop visível', await page.locator('.site-nav').isVisible());
check('hamburguer oculto no desktop', !(await page.locator('.nav-toggle').isVisible()));
// headings
const h=await page.evaluate(()=>[...document.querySelectorAll('h1,h2,h3')].map(e=>e.tagName+':'+e.textContent.trim().slice(0,28)));
check('um único h1', h.filter(x=>x.startsWith('H1')).length===1, h.filter(x=>x.startsWith('H1')).join());
const landmarks=await page.evaluate(()=>({header:!!document.querySelector('header'),main:!!document.querySelector('main'),footer:!!document.querySelector('footer'),sections:document.querySelectorAll('section').length,articles:document.querySelectorAll('article').length}));
check('landmarks semânticos', landmarks.header&&landmarks.main&&landmarks.footer&&landmarks.sections>=3&&landmarks.articles===4, JSON.stringify(landmarks));
const noAlt=await page.evaluate(()=>[...document.images].filter(i=>!i.hasAttribute('alt')).length);
check('todas as imagens têm alt', noAlt===0);
await page.close();

// ---- mobile menu
page=await b.newPage({viewport:{width:390,height:844}});
await page.goto('http://127.0.0.1:4323/',{waitUntil:'domcontentloaded'});
check('hamburguer visível no mobile', await page.locator('.nav-toggle').isVisible());
check('menu fechado por padrão', !(await page.locator('#menu-mobile').isVisible()));
await page.locator('.nav-toggle').click();
check('menu abre', await page.locator('#menu-mobile').isVisible());
check('aria-expanded=true', await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true');
await page.keyboard.press('Escape');
check('Esc fecha o menu', !(await page.locator('#menu-mobile').isVisible()));
await page.locator('.nav-toggle').click();
await page.locator('.mobile-menu__link').first().click();
check('clicar em link fecha o menu', !(await page.locator('#menu-mobile').isVisible()));
const ov=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
check('sem scroll horizontal no mobile', ov<=0, 'overflow '+ov);
await page.close();
await b.close();server.close();
console.log('PASS:'); ok.forEach(o=>console.log('  ✓ '+o));
if(bad.length){console.log('FAIL:');bad.forEach(o=>console.log('  ✗ '+o));process.exitCode=1;}
