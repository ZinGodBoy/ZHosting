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
/* ===== V5 CONFIG BUILDER ===== */
(()=>{
  const serviceButtons=[...document.querySelectorAll('.config-option')];
  const ram=document.querySelector('#ramRange'),cpu=document.querySelector('#cpuRange');
  const ramValue=document.querySelector('#ramValue'),cpuValue=document.querySelector('#cpuValue');
  const summaryRam=document.querySelector('#summaryRam'),summaryCpu=document.querySelector('#summaryCpu');
  const summaryAddons=document.querySelector('#summaryAddons'),total=document.querySelector('#configTotal');
  const title=document.querySelector('#configTitle'),description=document.querySelector('#configDescription');
  const contact=document.querySelector('#configContact'),reset=document.querySelector('#configReset');
  const addons=[...document.querySelectorAll('.config-check input[data-price]')];
  if(!serviceButtons.length)return;

  const services={
    minecraft:{name:'Minecraft Hosting',desc:'Cấu hình cân bằng cho server cộng đồng.'},
    web:{name:'Web Hosting',desc:'Tối ưu cho portfolio, landing page và website doanh nghiệp.'},
    vps:{name:'VPS Server',desc:'Tài nguyên riêng cho API, database và ứng dụng cần quyền kiểm soát.'}
  };
  let service=serviceButtons.find(x=>x.classList.contains('active'))?.dataset.service||'minecraft';

  const calc=()=>{
    const active=serviceButtons.find(x=>x.dataset.service===service);
    const base=Number(active?.dataset.base||39);
    const ramNum=Number(ram?.value||4);
    const cpuNum=Number(cpu?.value||2);
    const ramExtra=Math.max(0,Math.ceil((ramNum-4)/4))*12;
    const cpuExtra=Math.max(0,cpuNum-2)*7;
    const addonTotal=addons.filter(x=>x.checked).reduce((sum,x)=>sum+Number(x.dataset.price||0),0);
    const result=base+ramExtra+cpuExtra+addonTotal;

    if(ramValue)ramValue.value=ramNum+' GB',ramValue.textContent=ramNum+' GB';
    if(cpuValue)cpuValue.value=cpuNum+' vCPU',cpuValue.textContent=cpuNum+' vCPU';
    if(summaryRam)summaryRam.textContent=ramNum+' GB';
    if(summaryCpu)summaryCpu.textContent=cpuNum+' vCPU';
    if(summaryAddons)summaryAddons.textContent=String(addons.filter(x=>x.checked).length);
    if(total)total.textContent=result+'K';
    if(title)title.textContent=services[service].name;
    if(description)description.textContent=services[service].desc;
    document.body.classList.remove('config-active');void document.body.offsetWidth;document.body.classList.add('config-active');
  };

  serviceButtons.forEach(button=>button.addEventListener('click',()=>{
    serviceButtons.forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    service=button.dataset.service;
    calc();
  }));
  ram?.addEventListener('input',calc);cpu?.addEventListener('input',calc);addons.forEach(x=>x.addEventListener('change',calc));

  reset?.addEventListener('click',()=>{
    service='minecraft';
    serviceButtons.forEach(item=>item.classList.toggle('active',item.dataset.service===service));
    if(ram)ram.value='4';
    if(cpu)cpu.value='2';
    addons.forEach(x=>x.checked=false);
    calc();
    window.ZUI?.toast('Đã đặt lại','Cấu hình đã trở về mức cơ bản.','success');
  });

  contact?.addEventListener('click',()=>{
    const config='ZHosting '+services[service].name+' · '+(ram?.value||4)+'GB RAM · '+(cpu?.value||2)+' vCPU · '+addons.filter(x=>x.checked).map(x=>x.closest('.config-check')?.querySelector('b')?.textContent||'Addon').join(', ');
    const subject=encodeURIComponent('Tư vấn cấu hình ZHosting');
    const body=encodeURIComponent('Xin tư vấn cấu hình:\n'+config);
    location.href='mailto:contact@zhosting.vn?subject='+subject+'&body='+body;
  });

  calc();
})();

/* ===== FAQ SEARCH ===== */
(()=>{
  const input=document.querySelector('#faqSearch');
  const items=[...document.querySelectorAll('.faq-list details')];
  if(!input||!items.length)return;
  let empty=document.querySelector('.faq-no-results');
  if(!empty){empty=document.createElement('div');empty.className='faq-no-results';empty.textContent='Không tìm thấy câu hỏi phù hợp.';empty.hidden=true;input.closest('.section-head')?.parentElement?.querySelector('.faq-list')?.appendChild(empty)}
  const run=()=>{
    const q=input.value.trim().toLowerCase();
    let found=0;
    items.forEach(item=>{
      const match=!q||item.textContent.toLowerCase().includes(q);
      item.classList.toggle('faq-hidden',!match);
      if(match)found++;
    });
    empty.hidden=found!==0;
  };
  input.addEventListener('input',run);
})();

/* ===== KEYBOARD QUICK ACTIONS ===== */
document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
    const config=document.querySelector('#config');
    if(config&&!document.querySelector('#loginForm')){
      event.preventDefault();
      document.querySelector('#faqSearch')?.blur();
      document.querySelector('#ramRange')?.focus();
      config.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }
});


window.addEventListener('load',()=>document.body.classList.add('ready'));

/* ===== LIVE STATUS DEMO ===== */
const liveValues={latency:18,nodes:12};
setInterval(()=>{const latency=Math.round(16+Math.random()*8);const el=[...document.querySelectorAll('.status-mini b')].find(x=>x.parentElement?.textContent.includes('Latency'));if(el)el.textContent=latency+'ms'},4000);

/* ===== V3 COUNTER ENGINE ===== */
const counters=document.querySelectorAll('[data-counter]');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,target=parseFloat(el.dataset.counter),duration=1100,start=performance.now();
    const tick=now=>{const p=Math.min((now-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=target%1?((target*ease).toFixed(2)):Math.round(target*ease);if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);counterObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(el=>counterObserver.observe(el));

/* ===== ACCOUNT-AWARE NAV ===== */
(()=>{const account=document.querySelector('#navAccount');if(!account)return;try{const s=(()=>{try{return JSON.parse(localStorage.getItem('zhosting_session_v1')||sessionStorage.getItem('zhosting_temp_session_v1')||'null')}catch{return null}})(),users=JSON.parse(localStorage.getItem('zhosting_users_v1')||'[]'),u=s&&users.find(x=>x.email===s.email);if(!u)return;const first=(u.name||'Z').trim().charAt(0).toUpperCase();account.classList.add('logged-in');account.replaceChildren();const link=document.createElement('a');link.className='account-link';link.href='dashboard/index.html';const avatar=document.createElement('span');avatar.className='account-avatar';avatar.textContent=first;const name=document.createElement('span');name.textContent=((u.name||'Tài khoản').split(' ')[0]);link.append(avatar,name);const logout=document.createElement('a');logout.className='logout-link';logout.href='#';logout.id='navLogout';logout.textContent='Đăng xuất';account.append(link,logout);}catch(e){console.warn('ZHosting account nav unavailable',e)}})();
