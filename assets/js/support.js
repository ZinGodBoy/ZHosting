/* ZHosting Support Bubbles — shared runtime v1.6.6 */
(()=>{"use strict";
if(window.__ZSupportLoaded)return;window.__ZSupportLoaded=true;
const p=location.pathname;
const base=p.includes("/auth/")||p.includes("/dashboard/")||p.includes("/admin/")?"../":"./";
const root=document.createElement("aside");
root.className="support-bubbles";
root.setAttribute("aria-label","Liên hệ nhanh");
root.innerHTML=`<a class="support-bubble support-bubble-zalo" href="https://zalo.me/0828689789" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ Zalo 0828 689 789" title="Zalo — 0828 689 789"><img src="${base}assets/brand/zalo.svg" alt="Zalo" width="24" height="24"><span class="support-bubble-label">Zalo · 0828 689 789</span></a><a class="support-bubble support-bubble-discord" href="https://discord.com/users/tdk_208" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ Discord tdk_208" title="Discord — tdk_208"><img src="${base}assets/brand/discord.svg" alt="Discord" width="24" height="24"><span class="support-bubble-label">Discord · tdk_208</span></a>`;
document.body.appendChild(root);
let raf=0,resizeRaf=0,maxScroll=1,paused=document.hidden,disposed=false,lastScrollY=-1;
const sync=()=>{
 if(disposed)return;
 const scrollY=window.scrollY;
 if(scrollY===lastScrollY)return;
 lastScrollY=scrollY;
 const progress=Math.min(1,Math.max(0,scrollY/maxScroll));
 root.style.setProperty("--support-scroll-y",((progress-.5)*150).toFixed(2)+"px");
};
const measure=()=>{
 if(disposed)return;
 maxScroll=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
 const scrollbar=Math.max(0,window.innerWidth-document.documentElement.clientWidth);
 const safe=window.matchMedia?.("(max-width:700px)")?.matches?10:12;
 root.style.setProperty("--support-right",Math.max(safe,scrollbar+safe)+"px");
 sync();
};
const onScroll=()=>{
 if(disposed||paused||raf)return;
 raf=requestAnimationFrame(()=>{raf=0;sync()});
};
const onResize=()=>{
 if(disposed||resizeRaf)return;
 resizeRaf=requestAnimationFrame(()=>{resizeRaf=0;measure()});
};
const cleanup=()=>{
 if(disposed)return;
 disposed=true;
 if(raf)cancelAnimationFrame(raf);
 if(resizeRaf)cancelAnimationFrame(resizeRaf);
 raf=0;resizeRaf=0;
 };
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",onResize,{passive:true});
window.addEventListener("orientationchange",onResize,{passive:true});
window.addEventListener("pageshow",onResize,{passive:true});
window.addEventListener("visibilitychange",()=>{
 paused=document.hidden;
 if(paused){
  if(raf)cancelAnimationFrame(raf);
  if(resizeRaf)cancelAnimationFrame(resizeRaf);
  raf=0;resizeRaf=0;
  return;
 }
 measure();
},{passive:true});
window.addEventListener("pagehide",cleanup,{once:true});
measure();
})();