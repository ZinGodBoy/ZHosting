(() => {
  "use strict";
  if(window.__ZUIInitialized)return;
  window.__ZUIInitialized=true;
  const root=document.body;
  if(!root)return;

  const addBase=()=>{
    root.classList.add("zui-page");
    if(!document.querySelector(".zui-spotlight")){
      const s=document.createElement("div");s.className="zui-spotlight";root.appendChild(s);
    }
    if(!document.querySelector(".zui-grain")){
      const g=document.createElement("div");g.className="zui-grain";root.appendChild(g);
    }
    if(!document.querySelector(".zui-grid")){
      const g=document.createElement("div");g.className="zui-grid";root.appendChild(g);
    }
  };
  addBase();

  // Pointer-follow spotlight is intentionally disabled: it adds a continuous main-thread task
  // on desktop without improving core navigation or readability.
  const spotlight=document.querySelector(".zui-spotlight");
  if(spotlight)spotlight.setAttribute("aria-hidden","true");

  let revealObserver=null;
  const reveal=()=>{if(window.ZAppEngine)return;
    const items=[...document.querySelectorAll("[data-zui-reveal],.reveal")];
    if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("zui-visible","visible"));return}
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("zui-visible","visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -40px"});
    items.forEach((el,i)=>{
      if(!el.dataset.zuiReveal)el.dataset.zuiReveal="up";
      el.style.setProperty("--reveal-delay",(i%6)*65+"ms");
      revealObserver.observe(el);
    });
  };
  window.addEventListener("pagehide",()=>{revealObserver?.disconnect();revealObserver=null},{once:true});
  document.querySelectorAll(".service-card,.price-card,.review,.dash-card,.panel,.status-main,.status-list").forEach(el=>{
    el.dataset.zuiReveal=el.dataset.zuiReveal||"up";
    el.classList.add("zui-glow-line");
  });
  reveal();


  const toast=(title,message,type="success")=>{
    let stack=document.querySelector(".zui-toast-stack");
    if(!stack){stack=document.createElement("div");stack.className="zui-toast-stack";root.appendChild(stack)}
    const el=document.createElement("div");el.className="zui-toast "+type;
    const heading=document.createElement("b");heading.textContent=title;
    const body=document.createElement("span");body.textContent=message;
    el.append(heading,body);stack.appendChild(el);
    setTimeout(()=>el.remove(),3700);
  };
  window.ZUI={toast};

  const rippleSelector=".btn,.nav-cta,.text-btn,.billing-toggle button";
  document.querySelectorAll(rippleSelector).forEach(el=>el.classList.add("zui-ripple"));
  document.addEventListener("click",event=>{
    const el=event.target.closest?.(rippleSelector);
    if(!el||el.disabled||!el.isConnected)return;
    const r=el.getBoundingClientRect(),w=Math.max(r.width,r.height);
    const wave=document.createElement("span");wave.className="zui-ripple-wave";
    wave.style.width=wave.style.height=w+"px";
    wave.style.left=event.clientX-r.left-w/2+"px";wave.style.top=event.clientY-r.top-w/2+"px";
    el.appendChild(wave);
    window.setTimeout(()=>wave.remove(),700);
  },{passive:true});

  // Keep card hover CSS-only. Removing per-card pointermove handlers avoids
  // repeated getBoundingClientRect/style writes while scrolling or moving the pointer.
  if(window.matchMedia("(pointer:fine) and (min-width:900px)").matches){
    document.querySelectorAll(".service-card,.price-card,.review,.dash-card,.status-main").forEach(el=>el.classList.add("zui-tilt"));
  }

  const setupLogout=()=>{
    const nodes=[...document.querySelectorAll("#logoutBtn,#navLogout,.logout-link")];
    if(!nodes.length)return;
    const screen=document.createElement("div");
    screen.className="zui-logout-screen";
    const card=document.createElement("div");card.className="zui-logout-card";
    const orb=document.createElement("div");orb.className="zui-logout-orb";orb.textContent="Z";
    const title=document.createElement("strong");title.textContent="Đang đăng xuất";
    const subtitle=document.createElement("span");subtitle.textContent="Đang kết thúc phiên ZHosting...";
    card.append(orb,title,subtitle);screen.appendChild(card);root.appendChild(screen);
    nodes.forEach(btn=>btn.addEventListener("click",e=>{
      if(btn.dataset.zuiBound==="1")return;
      e.preventDefault();e.stopImmediatePropagation();btn.dataset.zuiBound="1";
      root.classList.add("zui-page-lock");screen.classList.add("active");
      try{
        const session=window.ZAuth?.getSession?.();
        if(session)window.ZAuth?.recordAudit?.("logout",{email:session.email});
      }catch{}
      localStorage.removeItem("zhosting_session_v1");
      sessionStorage.removeItem("zhosting_temp_session_v1");
      const loginPath=location.pathname.includes("/dashboard/")?"../auth/login.html":location.pathname.includes("/auth/")?"login.html":"auth/login.html";
      setTimeout(()=>{location.href=loginPath},620);
    },true));
  };
  setupLogout();

  const eyeIcon=(visible)=>{
    const span=document.createElement("span");
    span.className="password-eye-icon";
    span.setAttribute("aria-hidden","true");
    span.innerHTML=visible
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 3 18 18"/><path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.1 0 9.5 6 9.5 6a18.7 18.7 0 0 1-3.2 3.8"/><path d="M6.7 6.7C3.9 8.5 2.5 12 2.5 12s3.4 6 9.5 6c1.5 0 2.8-.3 4-.8"/><path d="M9.9 9.9a2.5 2.5 0 0 0 3.5 3.5"/></svg>';
    return span;
  };
  const bindPasswordToggle=(button,input)=>{
    if(!button||!input||button.dataset.passwordBound==="1")return;
    button.dataset.passwordBound="1";
    button.setAttribute("aria-controls",input.id);
    const render=visible=>{
      button.replaceChildren(eyeIcon(visible));
      const label=document.createElement("span");
      label.className="password-toggle-label";
      label.textContent=visible?"Ẩn":"Hiện";
      button.appendChild(label);
      button.classList.toggle("is-visible",visible);
      button.setAttribute("aria-label",visible?"Ẩn mật khẩu":"Hiện mật khẩu");
      button.setAttribute("title",visible?"Ẩn mật khẩu":"Hiện mật khẩu");
    };
    render(false);
    button.addEventListener("click",()=>{
      const visible=input.type==="text";
      input.type=visible?"password":"text";
      render(!visible);
      input.focus({preventScroll:true});
    });
  };
  document.querySelectorAll("[data-toggle-password]").forEach(button=>{
    const input=document.querySelector(button.dataset.togglePassword);
    bindPasswordToggle(button,input);
  });
  const loginPassword=document.querySelector("#loginPassword");
  const loginToggle=document.querySelector("#passwordToggle");
  bindPasswordToggle(loginToggle,loginPassword);

  const setupSessionGuard=()=>{
    if(!window.ZAuth?.getSession)return;
    let activityTimer=0;
    const activity=()=>{
      if(activityTimer)return;
      activityTimer=window.setTimeout(()=>{activityTimer=0;window.ZAuth.touchSession?.()},15000);
    };
    ["pointerdown","keydown","scroll","touchstart"].forEach(type=>addEventListener(type,activity,{passive:true}));
    window.addEventListener("pagehide",()=>window.clearTimeout(activityTimer),{once:true});
    const check=()=>{
      const session=window.ZAuth.getSession?.();
      if(session)return;
      if(location.pathname.includes("/dashboard/")){
        window.ZAuth.clearSession?.();
        location.replace("../auth/login.html");
      }
    };
    check();
    let guardTimer=0;
    let guardStopped=false;
    const scheduleGuard=()=>{
      window.clearTimeout(guardTimer);
      if(guardStopped||document.hidden)return;
      guardTimer=window.setTimeout(()=>{
        if(!document.hidden)check();
        scheduleGuard();
      },30000);
    };
    const onGuardVisibility=()=>scheduleGuard();
    document.addEventListener("visibilitychange",onGuardVisibility,{passive:true});
    scheduleGuard();
    window.addEventListener("pagehide",()=>{
      guardStopped=true;
      window.clearTimeout(guardTimer);
      document.removeEventListener("visibilitychange",onGuardVisibility);
    },{once:true});
    addEventListener("storage",event=>{
      if(event.key==="zhosting_session_v1"&&!event.newValue){
        if(location.pathname.includes("/dashboard/"))window.ZAuth.logout?.();
      }
    });
  };
  setupSessionGuard();

  const validateInput=input=>{
    if(!input?.id)return;
    if(input.required&&input.value.trim()===""){input.classList.remove("zui-input-valid");return}
    if(input.type==="email"){
      input.classList.toggle("zui-input-valid",input.validity.valid);
      input.classList.toggle("zui-input-invalid",!input.validity.valid&&input.value.length>2);
    }else if(input.type!=="password"){
      input.classList.add("zui-input-valid");input.classList.remove("zui-input-invalid");
    }
  };
  document.addEventListener("input",event=>{
    const input=event.target.closest?.("input,textarea");
    if(input)validateInput(input);
  },{passive:true});
  document.addEventListener("blur",event=>{
    const input=event.target.closest?.("input,textarea");
    if(input)validateInput(input);
  },true);

  const strengthInput=document.querySelector("#registerPassword");
  if(strengthInput){
    const meter=document.createElement("div");meter.className="zui-password-strength";meter.dataset.level="0";
    for(let i=0;i<4;i+=1)meter.appendChild(document.createElement("span"));
    strengthInput.closest("label")?.appendChild(meter);
    strengthInput.addEventListener("input",()=>{
      const v=strengthInput.value;let score=0;
      if(v.length>=8)score++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))score++;
      if(/\d/.test(v))score++;if(/[^A-Za-z0-9]/.test(v))score++;
      meter.dataset.level=String(score);
    });
  }

  const loginForm=document.querySelector("#loginForm");
  if(loginForm){
    const email=document.querySelector("#loginEmail"),pass=document.querySelector("#loginPassword");
    [email,pass].forEach(i=>i?.addEventListener("input",()=>{
      const ok=(email?.value.trim().length>0)&&(pass?.value.length>=1);
      loginForm.classList.toggle("zui-form-ready",ok);
    }));
  }

})();

/* ===== ZHOSTING UI SAFETY PASS v1.4.1 ===== */
(()=>{
  document.querySelectorAll('a[target="_blank"]').forEach(link=>{
    const rel=new Set((link.getAttribute("rel")||"").split(/\s+/).filter(Boolean));
    rel.add("noopener");rel.add("noreferrer");link.setAttribute("rel",[...rel].join(" "));
  });
  document.addEventListener("invalid",event=>{event.target.classList.add("field-invalid")},{capture:true});
  document.addEventListener("input",event=>{event.target.classList.remove("field-invalid")},{passive:true});
})();

/* ===== SMALL UX FEEDBACK v1.4.4 ===== */
(()=>{"use strict";
 document.addEventListener("click",event=>{
   const btn=event.target.closest?.("button,.btn");
   if(!btn||btn.disabled||btn.dataset.zuiFeedback==="1")return;
   btn.dataset.zuiFeedback="1";
   btn.classList.remove("zui-clicked");
   requestAnimationFrame(()=>{
     if(btn.isConnected)btn.classList.add("zui-clicked");
   });
   window.setTimeout(()=>btn.dataset.zuiFeedback="0",220);
 },{passive:true});
})();
