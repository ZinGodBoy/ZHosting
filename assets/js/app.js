const menuBtn=document.querySelector('#menuBtn');const navLinks=document.querySelector('#navLinks');menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const toggleButtons=document.querySelectorAll('.billing-toggle button');const prices=document.querySelectorAll('.price b[data-month]');toggleButtons.forEach(btn=>btn.addEventListener('click',()=>{toggleButtons.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const cycle=btn.dataset.cycle;prices.forEach(p=>p.textContent=p.dataset[cycle])}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

/* ===== ZHOSTING UX/UI ENGINE ===== */
const header=document.querySelector('.header');
const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);
const backTop=document.createElement('button');backTop.className='back-top';backTop.type='button';backTop.setAttribute('aria-label','Về đầu trang');backTop.textContent='↑';document.body.appendChild(backTop);
const toast=(message)=>{let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=message;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2600)};
const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=max>0?((scrollY/max)*100)+'%':'0%';header?.classList.toggle('scrolled',scrollY>12);backTop.classList.toggle('show',scrollY>550)};
addEventListener('scroll',onScroll,{passive:true});onScroll();backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const sections=[...document.querySelectorAll('main section[id]')];const nav=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const activeNav=()=>{const y=scrollY+120;let current='';sections.forEach(s=>{if(y>=s.offsetTop)current=s.id});nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))};addEventListener('scroll',activeNav,{passive:true});activeNav();

document.querySelectorAll('.price-card .btn,.service-card a').forEach(a=>a.addEventListener('click',()=>{if(a.getAttribute('href')==='#contact')setTimeout(()=>toast('Đã mở khu vực liên hệ — hãy gửi yêu cầu của bạn.'),300)}));

document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.addEventListener('click',()=>toast('Đang mở ứng dụng email...')));
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('details').forEach(other=>{if(other!==d)other.open=false})}));

window.addEventListener('load',()=>document.body.classList.add('ready'));
