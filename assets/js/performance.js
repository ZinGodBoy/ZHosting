/* ZHosting Adaptive Performance Layer v1.4.2 */
(()=>{"use strict";
if(window.__ZHostingPerformanceInitialized)return;
window.__ZHostingPerformanceInitialized=true;
const root=document.documentElement,body=document.body;
const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
const lowMemory=typeof navigator.deviceMemory==="number"&&navigator.deviceMemory<=4;
const lowCpu=typeof navigator.hardwareConcurrency==="number"&&navigator.hardwareConcurrency<=4;
const saveData=!!connection?.saveData;
const slowNetwork=connection?.effectiveType==="slow-2g"||connection?.effectiveType==="2g";
if(reduced||lowMemory||lowCpu||saveData||slowNetwork)body?.classList.add("zperf-lite");
if(lowMemory||lowCpu||saveData||slowNetwork)root.classList.add("zperf-constrained");
if(reduced)body?.classList.add("zperf-reduced");
if(saveData||slowNetwork)body?.classList.add("zperf-data-saver");
let raf=0,lastViewportHeight=0;
const syncViewport=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const h=window.innerHeight;if(h!==lastViewportHeight){lastViewportHeight=h;root.style.setProperty("--z-viewport-height",h+"px")}})};
window.addEventListener("resize",syncViewport,{passive:true});syncViewport();
let scrollRaf=0;
let lastScrollState=false;
const syncScroll=()=>{
  if(scrollRaf)return;
  scrollRaf=requestAnimationFrame(()=>{
    scrollRaf=0;
    const next=window.scrollY>8;
    if(next!==lastScrollState){lastScrollState=next;root.classList.toggle("z-scroll-active",next)}
  });
};
window.addEventListener("scroll",syncScroll,{passive:true});syncScroll();
document.addEventListener("visibilitychange",()=>{body?.classList.toggle("zperf-paused",document.hidden);if(document.hidden)root.classList.remove("z-scroll-active")},{passive:true});
const reveal=selector=>{const nodes=document.querySelectorAll(selector);if(!nodes.length||!("IntersectionObserver"in window))return;const io=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("zperf-visible");io.unobserve(entry.target)}},{rootMargin:"0px 0px -6% 0px",threshold:.01});nodes.forEach(node=>io.observe(node))};
if(!reduced)reveal(".service-card,.price-card,.node-card,.review,.feature,.step,.launch-card,.compare-wrap,.config-panel,.config-result,.status-main,.status-list,.admin-kpi,.admin-panel,.admin-workspace");
if("requestIdleCallback"in window)requestIdleCallback(()=>root.classList.add("z-idle-ready"),{timeout:1200});else setTimeout(()=>root.classList.add("z-idle-ready"),600);
})();