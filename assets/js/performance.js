/* ZHosting Adaptive Performance Layer v1.4.2 */
(()=>{"use strict";
if(window.__ZHostingPerformanceInitialized)return;
window.__ZHostingPerformanceInitialized=true;
const root=document.documentElement,body=document.body;
const reducedQuery=window.matchMedia?.("(prefers-reduced-motion: reduce)");
let reduced=!!reducedQuery?.matches;
const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
const lowMemory=typeof navigator.deviceMemory==="number"&&navigator.deviceMemory<=4;
const lowCpu=typeof navigator.hardwareConcurrency==="number"&&navigator.hardwareConcurrency<=4;
const saveData=!!connection?.saveData;
const slowNetwork=connection?.effectiveType==="slow-2g"||connection?.effectiveType==="2g";
if(reduced||lowMemory||lowCpu||saveData||slowNetwork)body?.classList.add("zperf-lite");
if(lowMemory||lowCpu||saveData||slowNetwork)root.classList.add("zperf-constrained");
if(reduced)body?.classList.add("zperf-reduced");
const syncNetworkMode=()=>{
 const conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 const saver=!!conn?.saveData;
 const slow=conn?.effectiveType==="slow-2g"||conn?.effectiveType==="2g";
 body?.classList.toggle("zperf-data-saver",saver||slow);
 body?.classList.toggle("zperf-lite",reduced||lowMemory||lowCpu||saver||slow);
 root.classList.toggle("zperf-constrained",lowMemory||lowCpu||saver||slow);
};
syncNetworkMode();
const network=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
network?.addEventListener?.("change",syncNetworkMode);
const syncMotionMode=event=>{
 reduced=!!event.matches;
 body?.classList.toggle("zperf-reduced",reduced);
 const conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 const saver=!!conn?.saveData;
 const slow=conn?.effectiveType==="slow-2g"||conn?.effectiveType==="2g";
 body?.classList.toggle("zperf-lite",reduced||lowMemory||lowCpu||saver||slow);
};
reducedQuery?.addEventListener?.("change",syncMotionMode);
let raf=0,lastViewportHeight=0;
const syncViewport=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const h=window.innerHeight;if(h!==lastViewportHeight){lastViewportHeight=h;root.style.setProperty("--z-viewport-height",h+"px")}})};
window.addEventListener("resize",syncViewport,{passive:true});
const onPageHide=()=>{
 if(raf)cancelAnimationFrame(raf);
 raf=0;
 window.removeEventListener("resize",syncViewport);
};
window.addEventListener("pagehide",onPageHide,{once:true});
syncViewport();
document.addEventListener("visibilitychange",()=>{body?.classList.toggle("zperf-paused",document.hidden);if(document.hidden)root.classList.remove("z-scroll-active")},{passive:true});
const revealObservers=[];
const reveal=selector=>{const nodes=document.querySelectorAll(selector);if(!nodes.length||!("IntersectionObserver"in window))return;const io=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("zperf-visible");io.unobserve(entry.target)}},{rootMargin:"0px 0px -6% 0px",threshold:.01});nodes.forEach(node=>io.observe(node));revealObservers.push(io)};
if(!reduced)reveal(".launch-card,.compare-wrap,.config-panel,.config-result,.admin-kpi,.admin-panel,.admin-workspace");
let idleHandle=0;
const markIdle=()=>{idleHandle=0;root.classList.add("z-idle-ready")};
if("requestIdleCallback"in window)idleHandle=requestIdleCallback(markIdle,{timeout:1200});else idleHandle=window.setTimeout(markIdle,600);
window.addEventListener("pagehide",()=>{
  revealObservers.forEach(io=>io.disconnect());
  revealObservers.length=0;
  network?.removeEventListener?.("change",syncNetworkMode);
  reducedQuery?.removeEventListener?.("change",syncMotionMode);
  if(idleHandle){if("cancelIdleCallback"in window)cancelIdleCallback(idleHandle);else clearTimeout(idleHandle);idleHandle=0}
},{once:true});
})();