window.ZAppEngine=true;
const zDebounce=(fn,wait=180)=>{let t=0;return(...args)=>{window.clearTimeout(t);t=window.setTimeout(()=>fn(...args),wait)}};
const zRafThrottle=(fn)=>{let frame=0,lastArgs;return(...args)=>{lastArgs=args;if(frame)return;frame=requestAnimationFrame(()=>{frame=0;fn(...lastArgs)})}};
const zSafeText=value=>String(value??"").replace(/[<>]/g,"");
const zPageReady=()=>{document.documentElement.classList.add("z-ready")};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",zPageReady,{once:true});else zPageReady();

const zSetInterval=(fn,ms)=>{let timer=0;let stopped=false;const schedule=()=>{window.clearTimeout(timer);if(stopped||document.hidden)return;timer=window.setTimeout(()=>{if(!document.hidden)fn();schedule()},ms)};const onVisibility=()=>schedule();document.addEventListener('visibilitychange',onVisibility,{passive:true});schedule();return()=>{stopped=true;window.clearTimeout(timer);document.removeEventListener('visibilitychange',onVisibility)}};
const menuBtn=document.querySelector('#menuBtn');const navLinks=document.querySelector('#navLinks');menuBtn?.setAttribute('aria-expanded','false');menuBtn?.addEventListener('click',()=>{const open=navLinks?.classList.toggle('open')??false;menuBtn?.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{navLinks?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches??false;
const revealNodes=[...document.querySelectorAll('.reveal')];
const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'}):null;
revealNodes.forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
const toggleButtons=document.querySelectorAll('.billing-toggle button');const prices=document.querySelectorAll('.price b[data-month]');toggleButtons.forEach(btn=>btn.addEventListener('click',()=>{toggleButtons.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const cycle=btn.dataset.cycle;prices.forEach(p=>p.textContent=p.dataset[cycle])}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const selector=link.getAttribute('href');if(!selector||selector==="#")return;let target=null;try{target=document.querySelector(selector)}catch{target=null}if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

/* ===== ZHOSTING UX/UI ENGINE ===== */
const header=document.querySelector('.header');
const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);
const backTop=document.createElement('button');backTop.className='back-top';backTop.type='button';backTop.setAttribute('aria-label','Về đầu trang');backTop.textContent='↑';document.body.appendChild(backTop);
const toast=(message)=>{let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=message;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2600)};
const nav=[...document.querySelectorAll('.nav-links a[href^="#"]')];
let scrollFrame=0;
const onScroll=()=>{
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{
    const y=window.scrollY;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.transform='scaleX('+Math.min(1,Math.max(0,y/max))+')';
    header?.classList.toggle('scrolled',y>12);
    backTop.classList.toggle('show',y>550);
    scrollFrame=0;
  });
};
addEventListener('scroll',onScroll,{passive:true});
onScroll();

/* Active navigation uses IntersectionObserver instead of scanning every section
   and reading offsetTop on every scroll frame. */
const navTargets=[...document.querySelectorAll('main section[id]')];
if(navTargets.length&&nav.length&&'IntersectionObserver' in window){
  const visible=new Map();
  const syncActive=()=>{
    let current='';
    let best=-Infinity;
    visible.forEach((ratio,id)=>{
      if(ratio>best){best=ratio;current=id}
    });
    nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
  };
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting)visible.set(entry.target.id,entry.intersectionRatio);
      else visible.delete(entry.target.id);
    });
    syncActive();
  },{threshold:[0,.12,.25,.5,.75,1],rootMargin:'-18% 0px -58% 0px'});
  navTargets.forEach(section=>navObserver.observe(section));
}else{
  nav.forEach(a=>a.classList.remove('active'));
}
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

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
    minecraft:{name:'Minecraft Hosting',desc:'Cấu hình cân bằng cho server cộng đồng.',recommend:'Phù hợp server nhỏ → trung bình, plugin vừa phải và cộng đồng đang phát triển.'},
    web:{name:'Web Hosting',desc:'Tối ưu cho portfolio, landing page và website doanh nghiệp.',recommend:'Phù hợp website giới thiệu, portfolio, blog và landing page cần triển khai đơn giản.'},
    vps:{name:'VPS Server',desc:'Tài nguyên riêng cho API, database và ứng dụng cần quyền kiểm soát.',recommend:'Phù hợp API, bot, database hoặc hệ thống cần quyền quản trị máy chủ.'}
  };
  const recommendation=document.querySelector('#configRecommendationText');
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
    if(recommendation)recommendation.textContent=services[service].recommend;
    document.querySelectorAll('.config-check').forEach(item=>item.classList.toggle('is-selected',item.querySelector('input')?.checked));
    if(reduceMotion){document.body.classList.remove('config-active');return;}
    requestAnimationFrame(()=>{
      document.body.classList.remove('config-active');
      requestAnimationFrame(()=>document.body.classList.add('config-active'));
    });
  };

  serviceButtons.forEach(button=>button.addEventListener('click',()=>{
    serviceButtons.forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    service=button.dataset.service;
    calc();
  }));
  let calcFrame=0;
  const scheduleCalc=()=>{
    if(calcFrame)return;
    calcFrame=requestAnimationFrame(()=>{calcFrame=0;calc()});
  };
  ram?.addEventListener('input',scheduleCalc,{passive:true});
  cpu?.addEventListener('input',scheduleCalc,{passive:true});
  addons.forEach(x=>x.addEventListener('change',calc));

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
    location.href='mailto:dangkhoita2@gmail.com?subject='+subject+'&body='+body;
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

/* ===== V6 PROFESSIONAL CONTACT FLOW ===== */
(()=>{
  const form=document.querySelector('#contactForm');
  if(!form)return;
  const name=document.querySelector('#contactName');
  const email=document.querySelector('#contactEmail');
  const note=document.querySelector('#contactNote');
  const validate=()=>{
    let ok=true;
    [name,email].forEach(input=>{
      if(!input)return;
      const valid=input.value.trim()!=="" && (input.type!=="email" || input.validity.valid);
      input.classList.toggle("zui-input-invalid",!valid);
      input.classList.toggle("zui-input-valid",valid);
      if(!valid)ok=false;
    });
    return ok;
  };
  [name,email].forEach(input=>input?.addEventListener("input",validate));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!validate()){
      note.textContent="Hãy kiểm tra họ tên và email trước khi tiếp tục.";
      note.style.color="#ff8e9e";
      window.ZUI?.toast("Thiếu thông tin","Vui lòng kiểm tra các trường bắt buộc.","error");
      return;
    }
    const data={
      name:name.value.trim(),
      email:email.value.trim(),
      service:document.querySelector('#contactService')?.value||"Khác",
      budget:document.querySelector('#contactBudget')?.value.trim()||"Chưa nêu",
      message:document.querySelector('#contactMessage')?.value.trim()||"Chưa nêu"
    };
    const subject=encodeURIComponent("[ZHosting] Tư vấn · "+data.service);
    const body=encodeURIComponent(
      "Xin chào ZHosting,\n\n"+
      "Họ và tên: "+data.name+"\n"+
      "Email: "+data.email+"\n"+
      "Dịch vụ: "+data.service+"\n"+
      "Nhu cầu: "+data.budget+"\n"+
      "Mô tả: "+data.message+"\n\n"+
      "Gửi từ ZHosting Project Brief."
    );
    note.textContent="Đang mở ứng dụng email...";
    note.style.color="";
    window.ZUI?.toast("Đã tạo project brief","Đang mở ứng dụng email của bạn.","success");
    setTimeout(()=>{location.href="mailto:dangkhoita2@gmail.com?subject="+subject+"&body="+body},220);
  });
})();

/* ===== V6 HERO TERMINAL MICRO ANIMATION ===== */
(()=>{
  const terminal=document.querySelector('.terminal');
  const ok=terminal?.querySelector('.ok');
  if(!terminal||!ok)return;
  zSetInterval(()=>{
    ok.style.opacity="0.55";
    setTimeout(()=>{ok.style.opacity="1"},450);
  },3200);
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

/* ===== V7 LIVE STATUS MICRO-DASH ===== */
(()=>{
 const cards=[...document.querySelectorAll('.node-card[data-node]')];
 if(!cards.length)return;
 const profiles={hanoi:{load:[34,44],latency:[12,18]},hcm:{load:[48,58],latency:[16,23]},singapore:{load:[25,35],latency:[28,38]},tokyo:{load:[12,22],latency:[50,66]}};
 const update=()=>{
  cards.forEach(card=>{
   const p=profiles[card.dataset.node];if(!p)return;
   const load=Math.round(p.load[0]+Math.random()*(p.load[1]-p.load[0]));
   const latency=Math.round(p.latency[0]+Math.random()*(p.latency[1]-p.latency[0]));
   const meter=card.querySelector('.node-meter i'),meta=card.querySelector('.node-meter+small');
   if(meter)meter.style.width=load+'%';
   if(meta)meta.innerHTML='Load <b>'+load+'%</b> · '+latency+'ms';
  });
  const status=document.querySelector('.status-main-top>span:last-child');
  if(status)status.textContent='UPDATED '+new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
 };
 update();zSetInterval(update,5000);
})();

/* ===== LIVE STATUS DEMO ===== */
const liveValues={latency:18,nodes:12};
zSetInterval(()=>{const latency=Math.round(16+Math.random()*8);const el=[...document.querySelectorAll('.status-mini b')].find(x=>x.parentElement?.textContent.includes('Latency'));if(el)el.textContent=latency+'ms'},4000);

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


/* ===== COMMAND LAUNCH MICRO-UI ===== */
(()=>{const clock=document.querySelector('#launchClock');if(!clock)return;const tick=()=>{const now=new Date();clock.textContent=now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit',second:'2-digit'})};tick();zSetInterval(tick,1000);})();


/* ===== ZHOSTING V1.4 COMMAND PALETTE + NAV HARDENING ===== */
(()=> {
  const account = document.querySelector('#navAccount');
  const readSession = () => {
    try {
      return JSON.parse(localStorage.getItem('zhosting_session_v1') || sessionStorage.getItem('zhosting_temp_session_v1') || 'null');
    } catch { return null; }
  };
  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem('zhosting_users_v1') || '[]'); }
    catch { return []; }
  };

  const currentSession = readSession();
  const currentUser = currentSession && readUsers().find(user => user.email === currentSession.email);

  if (account && currentUser) {
    const existingAdmin = account.querySelector('[data-admin-link]');
    const syncAdminLink = async () => {
      if (currentUser.role !== 'admin') {
        existingAdmin?.remove();
        return;
      }
      const trusted = await window.ZAdminAccess?.isTrusted?.(currentUser);
      if (trusted && !account.querySelector('[data-admin-link]')) {
        const admin = document.createElement('a');
        admin.href = 'admin/index.html';
        admin.className = 'admin-nav-link';
        admin.dataset.adminLink = 'true';
        admin.textContent = 'Admin Center';
        account.insertBefore(admin, account.querySelector('.logout-link'));
      } else if (!trusted) {
        account.querySelector('[data-admin-link]')?.remove();
      }
    };
    syncAdminLink();

  }

  const palette = document.createElement('div');
  palette.className = 'zhost-command-palette';
  palette.hidden = true;
  palette.setAttribute('aria-hidden', 'true');
  palette.innerHTML = [
    '<div class="zhost-palette-backdrop" data-palette-close></div>',
    '<div class="zhost-palette-dialog" role="dialog" aria-modal="true" aria-labelledby="zhostPaletteTitle">',
    '<div class="zhost-palette-head"><div><span class="eyebrow">ZHOSTING COMMAND</span><h2 id="zhostPaletteTitle">Đi đâu tiếp?</h2></div><button type="button" class="zhost-palette-close" data-palette-close aria-label="Đóng">Esc</button></div>',
    '<input class="zhost-palette-input" type="search" placeholder="Tìm dịch vụ, cấu hình, trạng thái..." autocomplete="off" aria-label="Tìm nhanh">',
    '<div class="zhost-palette-results"></div>',
    '<div class="zhost-palette-foot"><span>↑↓ chọn</span><span>Enter mở</span><span>Esc đóng</span></div>',
    '</div>'
  ].join('');
  document.body.appendChild(palette);

  const input = palette.querySelector('.zhost-palette-input');
  const results = palette.querySelector('.zhost-palette-results');
  const baseActions = [
    {label:'Dịch vụ',meta:'Khám phá các dịch vụ ZHosting',href:'#services'},
    {label:'Bảng giá',meta:'So sánh gói và chu kỳ thanh toán',href:'#pricing'},
    {label:'Config Builder',meta:'Tự chọn RAM, CPU và add-on',href:'#config'},
    {label:'Live Status',meta:'Xem trạng thái hạ tầng demo',href:'#status'},
    {label:'FAQ',meta:'Tìm câu hỏi thường gặp',href:'#faq'},
    {label:'Liên hệ',meta:'Tạo project brief',href:'#contact'},
    {label:'Account Center',meta:'Mở khu vực tài khoản',href:'dashboard/index.html'}
  ];
  let actions = [...baseActions];
  const syncPaletteActions = async () => {
    actions = [...baseActions];
    if (currentUser?.role === 'admin' && await window.ZAdminAccess?.isTrusted?.(currentUser)) {
      actions.push({label:'Admin Center',meta:'Quản lý tài khoản và audit demo',href:'admin/index.html'});
    }
  };

  let active = 0;
  const openPalette = async () => {
    await syncPaletteActions();
    palette.hidden = false;
    palette.setAttribute('aria-hidden','false');
    document.body.classList.add('palette-open');
    input.value = '';
    render('');
    requestAnimationFrame(() => input.focus());
  };
  const closePalette = () => {
    palette.hidden = true;
    palette.setAttribute('aria-hidden','true');
    document.body.classList.remove('palette-open');
  };
  const visibleActions = () => [...results.querySelectorAll('[data-palette-index]')];
  const render = query => {
    const q = query.trim().toLowerCase();
    const filtered = actions.filter(item => (item.label+' '+item.meta).toLowerCase().includes(q));
    results.replaceChildren();
    filtered.forEach((item,index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'zhost-palette-item' + (index === 0 ? ' active' : '');
      button.dataset.paletteIndex = String(index);
      const title = document.createElement('strong');
      title.textContent = item.label;
      const meta = document.createElement('small');
      meta.textContent = item.meta;
      button.append(title, meta);
      button.addEventListener('click', () => {
        closePalette();
        if (item.href.startsWith('#')) {
          const target = document.querySelector(item.href);
          target?.scrollIntoView({behavior:'smooth',block:'start'});
        } else {
          location.href = item.href;
        }
      });
      results.appendChild(button);
    });
    active = 0;
  };

  document.querySelectorAll('[data-command-open]').forEach(button => button.addEventListener('click', openPalette));
  palette.querySelectorAll('[data-palette-close]').forEach(button => button.addEventListener('click', closePalette));
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', event => {
    const items = visibleActions();
    if (event.key === 'ArrowDown' && items.length) {
      event.preventDefault();
      active = (active + 1) % items.length;
    }
    if (event.key === 'ArrowUp' && items.length) {
      event.preventDefault();
      active = (active - 1 + items.length) % items.length;
    }
    if ((event.key === 'Enter' || event.key === 'ArrowDown' || event.key === 'ArrowUp') && items.length) {
      items.forEach((item,index) => item.classList.toggle('active',index === active));
      items[active]?.scrollIntoView({block:'nearest'});
      if (event.key === 'Enter') items[active]?.click();
    }
  });

  document.addEventListener('keydown', event => {
    const target = event.target;
    const typing = target && (target.matches('input, textarea, select') || target.isContentEditable);
    if (event.key === 'Escape' && !palette.hidden) {
      closePalette();
      return;
    }
    if (!typing && event.key === '/') {
      event.preventDefault();
      openPalette();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openPalette();
    }
  });
})();

/* ===== ZHOSTING RUNTIME QUALITY API v1.4.1 ===== */
(()=>{
  if(window.ZHostingUI)return;
  const debounce=(fn,wait=180)=>{let timer=0;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),wait)}};
  const setBusy=(node,busy=true)=>{if(!node)return;node.setAttribute("aria-busy",String(busy));node.classList.toggle("is-loading",busy)};
  const safeText=value=>String(value??"").replace(/[<>]/g,"");
  const onPageShow=fn=>window.addEventListener("pageshow",fn,{passive:true});
  window.ZHostingUI={debounce,setBusy,safeText,onPageShow,version:"1.4.1"};
})();

/* ===== MICRO UX v1.4.4 ===== */
(()=>{"use strict";
 let clockTimer=0;
 const updateClock=()=>document.querySelectorAll("[data-live-clock]").forEach(el=>{el.textContent=new Date().toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit",second:"2-digit"})});
 const syncClock=()=>{if(clockTimer)clearInterval(clockTimer);if(document.hidden)return;updateClock();clockTimer=setInterval(updateClock,1000)};
 if(document.querySelector("[data-live-clock]")){syncClock();document.addEventListener("visibilitychange",syncClock,{passive:true})}
 document.addEventListener("click",async event=>{const btn=event.target.closest?.("[data-copy]");if(!btn||btn.dataset.copyBound)return;btn.dataset.copyBound="1";const value=btn.dataset.copy||btn.textContent||"";try{if(!navigator.clipboard?.writeText)throw new Error("Clipboard API unavailable");await navigator.clipboard.writeText(value.trim());btn.classList.add("is-copied");window.setTimeout(()=>btn.classList.remove("is-copied"),1200)}catch{}});
})();


/* ===== SUPPORT BUBBLE SCROLL FOLLOW v1.4.9 ===== */
(()=>{
  "use strict";
  const sync=()=>{
    const root=document.documentElement;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const progress=Math.min(1,Math.max(0,window.scrollY/max));
    root.style.setProperty("--support-scroll-y",((progress-.5)*150).toFixed(2)+"px");
  };
  let raf=0;
  const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;sync()})};
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",sync,{passive:true});
  window.addEventListener("pageshow",sync,{passive:true});
  sync();
})();
