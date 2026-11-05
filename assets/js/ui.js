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
    el.innerHTML="<b>"+title+"</b><span>"+message+"</span>";stack.appendChild(el);
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

  document.querySelectorAll(".service-card,.price-card,.review,.dash-card,.panel,.status-main,.status-list").forEach(el=>{
    el.dataset.zuiReveal=el.dataset.zuiReveal||"up";
    el.classList.add("zui-glow-line");
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
    screen.innerHTML='<div class="zui-logout-card"><div class="zui-logout-orb">Z</div><strong>Đang đăng xuất</strong><span>Đang kết thúc phiên ZHosting...</span></div>';
    root.appendChild(screen);
    nodes.forEach(btn=>btn.addEventListener("click",e=>{
      if(btn.dataset.zuiBound==="1")return;
      e.preventDefault();e.stopImmediatePropagation();btn.dataset.zuiBound="1";
      root.classList.add("zui-page-lock");screen.classList.add("active");
      localStorage.removeItem("zhosting_session_v1");
      setTimeout(()=>{location.href=btn.closest("header")?"../auth/login.html":"auth/login.html"},620);
    },true));
  };
  setupLogout();

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
    meter.innerHTML="<span></span><span></span><span></span><span></span>";
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