
const D=new Proxy(function(){},{get:()=>D,set:()=>true,apply:()=>D}),$=s=>document.querySelector(s)||D,fmt=n=>n.toLocaleString('ru-RU')+' ₽';
const mix=(h,f)=>{const n=parseInt(h.slice(1),16);return'rgb('+[n>>16,n>>8&255,n&255].map(v=>Math.round(f>0?v+(255-v)*f:v*(1+f)))+')'};
const EX={round:2,oval:2,sq:4,rhomb:1,drop:2};
function pts(sh,k,cx,cy){const N=16,o=[];for(let i=0;i<N;i++){const t=i/N*6.2832,c=Math.cos(t),s=Math.sin(t),e=2/EX[sh];let x=Math.sign(c)*Math.abs(c)**e,y=Math.sign(s)*Math.abs(s)**e;
 if(sh=='oval'){x*=.8;y*=1.15}if(sh=='rhomb'){x*=1.05;y*=1.3}if(sh=='drop'){y*=1.1;if(y<0)x*=1+y*.6}o.push([cx+x*k,cy+y*k])}return o}
const P=a=>a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
function gem(cx,cy,k,sh,col,set,m){const o=pts(sh,k,cx,cy),n=pts(sh,k*.55,cx,cy),N=16;let g='';
 if(set=='Закрепка')g+=`<polygon points="${P(o)}" fill="${mix(col,-.6)}" stroke="url(#${m})" stroke-width="${k*.3}" stroke-linejoin="round"/>`;
 for(let i=0;i<N;i++){const j=(i+1)%N,a=(i+.5)/N*6.2832,f=.34*Math.cos(a+2.36)+(i%2?.14:-.1);
  g+=`<polygon points="${P([o[i],o[j],n[j],n[i]])}" fill="${mix(col,f)}" stroke="${mix(col,-.45)}" stroke-width=".5"/>`}
 g+=`<polygon points="${P(n)}" fill="${mix(col,.18)}" stroke="${mix(col,-.4)}" stroke-width=".5"/><polygon points="${P(n.slice(9).concat(n.slice(0,3)))}" fill="#fff" opacity=".28"/>`;
 if(set=='Крапаны')for(let i=0;i<N;i+=4)g+=`<circle cx="${o[i][0]}" cy="${o[i][1]}" r="${k*.17}" fill="url(#${m})" stroke="#0005" stroke-width=".5"/>`;
 g+=`<path class="tw" d="M${cx-k*.4} ${cy-k*.62}l${k*.06} ${k*.14} ${k*.14} ${k*.06}-${k*.14} ${k*.06}-${k*.06} ${k*.14}-${k*.06}-${k*.14}-${k*.14}-${k*.06} ${k*.14}-${k*.06}z" fill="#fff" opacity=".95"/>`;return g}
/* иллюстрации каталога */
function art(c,m,gc,sh){const gm=(x,y,k)=>gc?gem(x,y,k,sh,gc,'Крапаны',m):`<path d="M${x} ${y-k}l${k} ${k}-${k} ${k}-${k}-${k}z" fill="none" stroke="#0007" stroke-width="2"/>`,st=(w)=>`stroke="url(#${m})" stroke-width="${w}" fill="none"`;
 return{ring:`<ellipse cx="100" cy="176" rx="46" ry="5" fill="#000" opacity=".4" filter="url(#bl)"/><circle cx="100" cy="122" r="44" ${st(14)}/><circle cx="100" cy="122" r="37" stroke="#0004" stroke-width="2" fill="none"/>${gm(100,66,19)}`,
 ear:`<path d="M58 28v22M142 28v22" ${st(3)}/><circle cx="58" cy="58" r="9" ${st(4)}/><circle cx="142" cy="58" r="9" ${st(4)}/><path d="M58 70c-18 22-10 52 0 62 10-10 18-40 0-62zM142 70c-18 22-10 52 0 62 10-10 18-40 0-62z" fill="url(#${m})"/>${gm(58,106,13)}${gm(142,106,13)}`,
 bra:`<ellipse cx="100" cy="176" rx="70" ry="6" fill="#000" opacity=".4" filter="url(#bl)"/><ellipse cx="100" cy="108" rx="70" ry="42" ${st(13)}/><ellipse cx="100" cy="108" rx="70" ry="42" stroke="#0006" stroke-width="2" stroke-dasharray="5 7" fill="none"/>${gc?gm(100,150,12):''}`,
 pen:`<path d="M40 20q60 80 120 0" ${st(2.5)} stroke-dasharray="4 2"/><circle cx="100" cy="76" r="6" ${st(3)}/>${gem(100,118,30,sh,gc||'#2fa8a0','Закрепка',m)}`,
 set:`<ellipse cx="100" cy="176" rx="46" ry="5" fill="#000" opacity=".4" filter="url(#bl)"/><circle cx="100" cy="126" r="40" ${st(14)}/><rect x="64" y="44" width="72" height="56" rx="12" fill="url(#${m})" stroke="#0005"/><rect x="74" y="54" width="52" height="36" rx="7" fill="#0003" stroke="#fff6"/><path d="M100 60l16 12-16 12-16-12z" fill="url(#${m})"/>`}[c]}
const items=[['ring','Кольцо «Хоорай»','Серебро 925 · орнамент',5400,'gM','','round','4,2 г'],['ring','Кольцо с бирюзой','Серебро 925 · бирюза',7900,'gM','#2fa8a0','oval','5,0 г'],['ring','Кольцо «Рога барана»','Золото 585',24500,'gG','','round','3,8 г'],['ring','Обручальное гладкое','Золото 585 · 4 мм',18900,'gR','','round','3,1 г'],
['ear','Серьги-капли','Серебро · фианит',4800,'gM','#e8f4ff','round','3,4 г'],['ear','Серьги «Ромб»','Серебро · чернение',5200,'gB','#c4283f','rhomb','3,0 г'],['ear','Серьги с изумрудом','Золото 585',16800,'gG','#1f9d62','drop','2,9 г'],
['bra','Браслет-цепь','Серебро 925',8600,'gM','','round','18 г'],['bra','Браслет «Меандр»','Серебро · чернение',11200,'gB','#2fa8a0','round','22 г'],
['pen','Подвеска «Солнце»','Серебро · бирюза',3900,'gM','#2fa8a0','round','3,6 г'],['pen','Подвеска с сапфиром','Золото 585',21400,'gG','#2f55c9','drop','2,7 г'],
['set','Печатка','Серебро · чернение',9800,'gB','','round','14 г'],['set','Запонки','Серебро 925',6700,'gM','','round','12 г']];
const cats={ring:'Кольца',ear:'Серьги',bra:'Браслеты',pen:'Подвески',set:'Мужские украшения'};let cur='all';const cart=(()=>{try{return JSON.parse(localStorage.tyva||'[]')}catch(e){return[]}})();
$('#heroArt').innerHTML=art('ring','gG','#2fa8a0','rhomb');
function tabs(){$('#tabs').innerHTML='';[['all','Все'],...Object.entries(cats)].forEach(([k,v])=>{const b=document.createElement('button');b.textContent=v;b.setAttribute('aria-pressed',k==cur);b.onclick=()=>{cur=k;tabs();grid()};$('#tabs').append(b)})}
function grid(){$('#grid').innerHTML=items.map((t,i)=>cur=='all'||t[0]==cur?`<article class="item"><div class="pic"><svg viewBox="0 0 200 200">${art(t[0],t[4],t[5],t[6])}</svg><img src="images/item-${i+1}.jpg" alt="${t[1]}" onerror="this.remove()"></div><div class="info"><h3>${t[1]}</h3><small>${t[2]}</small><small>Вес ≈ ${t[7]}</small><div class="row"><span class="price">${fmt(t[3])}</span><button onclick="add(${i})">В заказ</button></div></div></article>`:'').join('');reveal()}
function add(i){const t=items[i];cart.push({n:t[1],d:t[2],p:t[3]});draw();toast()}
/* конструктор */
const MET={'Серебро':{g:'gM',mid:'#aab1bd',d:10.4,c:140},'Чернёное серебро':{g:'gB',mid:'#3a3f4b',d:10.4,c:160},'Жёлтое золото':{g:'gG',mid:'#c99a35',d:13.4,c:6200},'Розовое золото':{g:'gR',mid:'#c9806a',d:13.4,c:6300}};
const DOT={'Серебро':'#cfd5de','Чернёное серебро':'#3a3f4b','Жёлтое золото':'#e2b64f','Розовое золото':'#e3a58c'};
const STN={'Без камня':[null,0],'Бирюза':['#2fa8a0',1500],'Изумруд':['#1f9d62',4800],'Сапфир':['#2f55c9',4200],'Рубин':['#c4283f',4500],'Фианит':['#e8f4ff',600],'Аметист':['#8a4fc7',1100]};
const SH={'Круг':'round','Овал':'oval','Ромб':'rhomb','Капля':'drop','Квадрат':'sq'},SS={'Малый':.8,'Средний':1,'Крупный':1.3};
const S={metal:'Серебро',fin:'Глянцевая',stone:'Бирюза',shape:'Ромб',ssz:'Средний',set:'Крапаны',side:'Нет',pat:'Ромбы',prof:'Выпуклый'};
const OPT={metal:Object.keys(MET),fin:['Глянцевая','Матовая'],stone:Object.keys(STN),shape:Object.keys(SH),ssz:Object.keys(SS),set:['Крапаны','Закрепка'],side:['Нет','Фианиты','Бирюза'],pat:['Гладкая','Ромбы','Меандр','Рога барана'],prof:['Плоский','Выпуклый']};
const DOTS={metal:k=>DOT[k],stone:k=>STN[k][0]||'transparent'};
for(const key in OPT){$('#o-'+key).innerHTML=OPT[key].map(k=>`<label><input type="radio" name="${key}" value="${k}" ${S[key]==k?'checked':''}><span>${DOTS[key]?`<i class="dot" style="background:${DOTS[key](k)}"></i>`:''}${k}</span></label>`).join('');
 $('#o-'+key).onchange=e=>{S[key]=e.target.value;ring()}}
function calc(){const w=+$('#width').value,sz=+$('#size').value,M=MET[S.metal],t=S.prof=='Выпуклый'?1.7:1.5,g=Math.PI*(sz+t)*w*t/1000*M.d,has=!!STN[S.stone][0],sm=SS[S.ssz];
 const rows=[['Металл ('+g.toFixed(1).replace('.',',')+' г)',g*M.c],['Работа мастера',3500],['Центральный камень',has?STN[S.stone][1]*sm*sm:0],['Оправа',has&&S.set=='Закрепка'?400:0],['Боковые камни',S.side=='Нет'?0:1200],['Узор',S.pat=='Гладкая'?0:1800],['Гравировка',$('#engr').value?600:0]];
 const r=rows.map(x=>[x[0],Math.round(x[1]/100)*100]).filter(x=>x[1]>0);return{w,sz,g,rows:r,price:r.reduce((a,x)=>a+x[1],0)}}
function ring(){const c=calc(),{w,sz}=c,M=MET[S.metal],m=M.g,matte=S.fin=='Матовая',R=58+(sz-15)*4,th=w*4.4,rm=R+th/2,cx=200,cy=240;
 const C=6.2832*rm;let s=`<ellipse cx="${cx}" cy="${cy+rm+th/2+4}" rx="${rm*.85}" ry="9" fill="#000" opacity=".5" filter="url(#bl)"/>`;
 s+=`<circle cx="${cx}" cy="${cy}" r="${rm}" fill="none" stroke="url(#${m})" stroke-width="${th}"/>`;
 if(matte)s+=`<circle cx="${cx}" cy="${cy}" r="${rm}" fill="none" stroke="${M.mid}" stroke-opacity=".6" stroke-width="${th}"/>`;
 s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-opacity=".45" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${R+th}" fill="none" stroke="#fff" stroke-opacity="${matte?.15:.5}" stroke-width="1.5"/>`;
 if(S.prof=='Выпуклый'){if(!matte)s+=`<circle cx="${cx}" cy="${cy}" r="${rm}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="${th*.16}" stroke-dasharray="${C*.2} ${C*.8}" transform="rotate(205 ${cx} ${cy})"/>`;s+=`<circle cx="${cx}" cy="${cy}" r="${R+th*.86}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="${th*.2}"/>`}
 else s+=`<circle cx="${cx}" cy="${cy}" r="${R+th*.1}" fill="none" stroke="#000" stroke-opacity=".3"/><circle cx="${cx}" cy="${cy}" r="${R+th*.9}" fill="none" stroke="#000" stroke-opacity=".3"/>`;
 const n=Math.round(C/(th*1.1)),dk=mix(M.mid,-.55);
 if(S.pat!='Гладкая')for(let i=0;i<n;i++){const a=(i+.5)/n*360;if(a>24&&a<336){const tf=`transform="rotate(${a} ${cx} ${cy}) translate(${cx} ${cy-rm})"`,q=th*.5;
  if(S.pat=='Ромбы')s+=`<path ${tf} d="M0-${q*.6}L${q*.45} 0 0 ${q*.6}-${q*.45} 0z" fill="${dk}" opacity=".7"/>`;
  if(S.pat=='Меандр')s+=`<path ${tf} d="M-${q*.5} ${q*.4}v-${q*.8}h${q*.7}v${q*.5}h-${q*.35}" fill="none" stroke="${dk}" stroke-width="1.6"/>`;
  if(S.pat=='Рога барана')s+=`<path ${tf} d="M0 ${q*.6}c-${q}-${q*.2}-${q*.7}-${q*1.2} 0-${q*.8}c${q*.4} ${q*.2} 0 ${q*.5}-${q*.2} ${q*.4}" fill="none" stroke="${dk}" stroke-width="1.6" stroke-linecap="round"/>`}}
 const col=STN[S.stone][0];
 if(S.side!='Нет'){const sc=S.side=='Бирюза'?'#2fa8a0':'#e8f4ff';for(const a of[-32,32]){const r=a*Math.PI/180;s+=gem(cx+Math.sin(r)*rm,cy-Math.cos(r)*rm,Math.min(th*.3,11),'round',sc,'Закрепка',m)}}
 if(col){const k=(20+w*1.4)*SS[S.ssz];s+=`<ellipse cx="${cx}" cy="${cy-rm-th*.05}" rx="${k*.9}" ry="${k*.5}" fill="#000" opacity=".35" filter="url(#bl)"/>`+gem(cx,cy-R-th-k*.15,k,SH[S.shape],col,S.set,m)}
 const e=$('#engr').value.replace(/[<&]/g,'');if(e)s+=`<text x="200" y="${cy+4}" text-anchor="middle" fill="#9fb4de" font-size="13" font-style="italic" font-family="Cormorant Garamond,serif">${e}</text>`;
 $('#ring').innerHTML=s;{const v=$('#ring');v.classList.remove('pop');void v.getBoundingClientRect();v.classList.add('pop')}$('#wv').textContent=w;$('#sv').textContent=sz;$('#rp').textContent=fmt(c.price);
 $('#bd').innerHTML=c.rows.map(x=>`<tr><td>${x[0]}</td><td>${fmt(x[1])}</td></tr>`).join('')}
$('#width').oninput=$('#size').oninput=$('#engr').oninput=ring;
$('#addRing').onclick=()=>{const c=calc(),e=$('#engr').value,has=!!STN[S.stone][0];
 cart.push({n:'Кольцо по макету',p:c.price,d:`${S.metal}, ${S.fin.toLowerCase()}; камень: ${has?S.stone+', '+S.shape.toLowerCase()+', '+S.ssz.toLowerCase()+', оправа: '+S.set.toLowerCase():'нет'}; боковые: ${S.side.toLowerCase()}; узор: ${S.pat.toLowerCase()}; профиль: ${S.prof.toLowerCase()}; ширина ${c.w} мм; размер ${c.sz} мм; вес ≈ ${c.g.toFixed(1)} г${e?'; гравировка: «'+e+'»':''}`});draw();toast()};
function draw(){try{localStorage.tyva=JSON.stringify(cart)}catch(e){}const cc=document.getElementById('cc');if(cc){cc.textContent=cart.length||'';cc.classList.remove('bump');void cc.offsetWidth;cc.classList.add('bump')}$('#cart').innerHTML=cart.length?cart.map((c,i)=>`<li><span><b>${c.n}</b><br><small>${c.d}</small></span><span>${fmt(c.p)} <button onclick="cart.splice(${i},1);draw()" aria-label="Убрать">✕</button></span></li>`).join(''):'<li>Пока пусто — выберите товар или соберите кольцо.</li>';$('#sum').textContent=fmt(cart.reduce((a,c)=>a+c.p,0))}
$('#send').onclick=()=>{const r=$('#res');if(!cart.length||!$('#nm').value||!$('#ct').value){r.innerHTML='<p>Добавьте хотя бы одну позицию, имя и контакт.</p>';return}
 const txt=`Заказ «Тыва мастерская»\nКлиент: ${$('#nm').value}\nКонтакт: ${$('#ct').value}\n\n`+cart.map((c,i)=>`${i+1}. ${c.n} — ${c.d} — ${fmt(c.p)}`).join('\n')+`\n\nИтого: ${$('#sum').textContent}\nПожелания: ${$('#cm').value||'—'}`;
 r.innerHTML='<p><b>Заявка готова.</b> Отправьте текст мастеру или скачайте файл.</p><pre></pre><button class="btn" id="cp">Скопировать</button> <button class="btn ghost" style="color:var(--ink);border-color:var(--ink)" id="dl">Скачать .txt</button>';r.querySelector('pre').textContent=txt;
 $('#cp').onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(txt);$('#dl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download='zakaz-tyva.txt';a.click()}};
if(document.getElementById('grid')){tabs();grid()}if(document.getElementById('ring'))ring();draw();

function toast(){const t=document.createElement('div');t.className='toast';t.innerHTML='Добавлено в заказ · <a href="order.html">Открыть заказ</a>';document.body.append(t);setTimeout(()=>t.remove(),2800)}
function reveal(){if(!document.documentElement.classList.contains('ready'))return;
 const io=window._io||(window._io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}));
 document.querySelectorAll('h2,.sub,.perks div,.steps div,.mats article,details,.tabs,.stage,fieldset,.out,.tile,.item').forEach(el=>{if(el.dataset.rv)return;el.dataset.rv=1;el.classList.add('rv');
  const sib=el.closest('.grid,.perks,.steps,.mats,.tiles')?[...el.parentNode.children].indexOf(el)%6*80:0;el.style.transitionDelay=sib+'ms';
  el.addEventListener('transitionend',()=>el.style.transitionDelay='',{once:true});io.observe(el)})}
document.addEventListener('click',e=>{const a=e.target.closest('a[href$=".html"]');if(a&&!e.metaKey&&!e.ctrlKey&&a.target!='_blank'){e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,320)}});
(function(){let seen;try{seen=sessionStorage.tyva1}catch(e){}
 const go=()=>{document.documentElement.classList.add('ready');reveal()};
 if(seen){go();return}
 try{sessionStorage.tyva1=1}catch(e){}
 const F=[['62,72 80,50 90,72','#bfe3ff'],['80,50 100,50 90,72','#fff'],['100,50 120,50 110,72','#d9efff'],['100,50 110,72 90,72','#8fc6f5'],['120,50 138,72 110,72','#a9d6fb'],['62,72 90,72 100,106','#79b4ea'],['90,72 110,72 100,106','#dff1ff'],['110,72 138,72 100,106','#5e9fdc']];
 const el=document.createElement('div');el.id='intro';
 el.innerHTML='<svg viewBox="0 0 200 200"><ellipse cx="100" cy="196" rx="52" ry="5" fill="#000" opacity=".4"/><circle class="rg" cx="100" cy="150" r="48" fill="none" stroke="url(#gG)" stroke-width="11" stroke-linecap="round" transform="rotate(-90 100 150)"/>'
 +F.map((f,i)=>`<polygon class="f" points="${f[0]}" fill="${f[1]}" stroke="#fff" stroke-opacity=".7" stroke-width=".6" style="--d:${1.5+i*.12}s"/>`).join('')
 +[[34,44,2.4],[166,66,2.7],[150,22,3],[48,100,3.3]].map(t=>`<g transform="translate(${t[0]} ${t[1]})"><path class="st" d="M0-9L2-2 9 0 2 2 0 9-2 2-9 0-2-2z" fill="#fff" style="--d:${t[2]}s"/></g>`).join('')
 +'</svg><h2>Тыва мастерская</h2>';
 document.body.append(el);document.body.style.overflow='hidden';
 const end=()=>{if(el.dataset.d)return;el.dataset.d=1;el.classList.add('out');document.body.style.overflow='';go();setTimeout(()=>el.remove(),900)};
 el.onclick=end;setTimeout(end,4300)})();
