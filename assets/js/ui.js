(() => {
  "use strict";
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
    if(!document.querySelector(".zui-progress")){
      const p=document.createElement("div");p.className="zui-progress";root.appendChild(p);
    }
  };
  addBase();

  const spotlight=document.querySelector(".zui-spotlight");
  let raf=0;
  window.addEventListener("pointermove",e=>{
    if(!spotlight||window.matchMedia("(max-width:760px)").matches)return;
    const x=e.clientX,y=e.clientY;
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{spotlight.style.left=x+"px";spotlight.style.top=y+"px"});
  },{passive:true});

  const reveal=()=>{
    const items=[...document.querySelectorAll("[data-zui-reveal],.reveal")];
    if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("zui-visible","visible"));return}
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("zui-visible","visible");
          obs.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -40px"});
    items.forEach((el,i)=>{
      if(!el.dataset.zuiReveal)el.dataset.zuiReveal="up";
      el.style.setProperty("--reveal-delay",(i%6)*65+"ms");
      obs.observe(el);
    });
  };
  document.querySelectorAll(".service-card,.price-card,.review,.dash-card,.panel,.status-main,.status-list").forEach(el=>{
    el.dataset.zuiReveal=el.dataset.zuiReveal||"up";
    el.classList.add("zui-glow-line");
  });
  reveal();

  const progress=document.querySelector(".zui-progress");
  const updateProgress=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(progress)progress.style.width=max>0?(window.scrollY/max*100)+"%":"0%";
    document.body.classList.toggle("is-scrolled",window.scrollY>12);
  };
  addEventListener("scroll",updateProgress,{passive:true});updateProgress();

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

  document.querySelectorAll(".btn,.nav-cta,.text-btn,.billing-toggle button").forEach(el=>{
    el.classList.add("zui-ripple");
    el.addEventListener("click",e=>{
      if(el.disabled)return;
      const r=el.getBoundingClientRect(),w=Math.max(r.width,r.height);
      const wave=document.createElement("span");wave.className="zui-ripple-wave";
      wave.style.width=wave.style.height=w+"px";
      wave.style.left=e.clientX-r.left-w/2+"px";wave.style.top=e.clientY-r.top-w/2+"px";
      el.appendChild(wave);setTimeout(()=>wave.remove(),700);
    });
  });

  const tiltOK=()=>window.matchMedia("(pointer:fine) and (min-width:900px)").matches;
  document.querySelectorAll(".service-card,.price-card,.review,.dash-card,.status-main").forEach(el=>{
    if(!tiltOK())return;
    el.classList.add("zui-tilt");
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      el.style.transform="perspective(900px) rotateX("+(-py*3.2)+"deg) rotateY("+(px*3.2)+"deg) translateY(-3px)";
    });
    el.addEventListener("pointerleave",()=>{el.style.transform=""});
  });

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
    const activity=()=>window.ZAuth.touchSession?.();
    ["pointerdown","keydown","scroll","touchstart"].forEach(type=>addEventListener(type,activity,{passive:true}));
    const check=()=>{
      const session=window.ZAuth.getSession?.();
      if(session)return;
      if(location.pathname.includes("/dashboard/")){
        window.ZAuth.clearSession?.();
        location.replace("../auth/login.html");
      }
    };
    check();
    setInterval(check,30000);
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)check()});
    addEventListener("storage",event=>{
      if(event.key==="zhosting_session_v1"&&!event.newValue){
        if(location.pathname.includes("/dashboard/"))window.ZAuth.logout?.();
      }
    });
  };
  setupSessionGuard();

  const setupInputs=()=>{
    document.querySelectorAll("input,textarea").forEach(input=>{
      if(!input.id)return;
      const validate=()=>{
        if(input.required&&input.value.trim()===""){input.classList.remove("zui-input-valid");return}
        if(input.type==="email"){
          input.classList.toggle("zui-input-valid",input.validity.valid);
          input.classList.toggle("zui-input-invalid",!input.validity.valid&&input.value.length>2);
        }else if(input.type!=="password"){
          input.classList.add("zui-input-valid");input.classList.remove("zui-input-invalid");
        }
      };
      input.addEventListener("input",validate);input.addEventListener("blur",validate);
    });
  };
  setupInputs();

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

  document.querySelectorAll("a[href^="#"]").forEach(a=>{
    a.addEventListener("click",e=>{
      const target=document.querySelector(a.getAttribute("href"));
      if(!target)return;
      e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});
    });
  });
})();