/* ZHosting Adaptive Performance Layer
 * Keeps the visual system rich while reducing expensive work on constrained devices.
 */
(()=>{"use strict";
const root=document.documentElement;
const body=document.body;
const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const lowMemory=typeof navigator.deviceMemory==="number"&&navigator.deviceMemory<=4;
const lowCpu=typeof navigator.hardwareConcurrency==="number"&&navigator.hardwareConcurrency<=4;
const saveData=!!navigator.connection?.saveData;
if(reduced||lowMemory||lowCpu||saveData)body?.classList.add("zperf-lite");
if(reduced)body?.classList.add("zperf-reduced");

let raf=0;
const syncViewport=()=>{
  if(raf)return;
  raf=requestAnimationFrame(()=>{
    raf=0;
    root.style.setProperty("--z-viewport-height",`${window.innerHeight}px`);
  });
};
window.addEventListener("resize",syncViewport,{passive:true});
syncViewport();

document.addEventListener("visibilitychange",()=>{
  body?.classList.toggle("zperf-paused",document.hidden);
},{passive:true});

const reveal=(selector)=>{
  const nodes=document.querySelectorAll(selector);
  if(!nodes.length||!("IntersectionObserver"in window))return;
  const io=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add("zperf-visible");
        io.unobserve(entry.target);
      }
    }
  },{rootMargin:"0px 0px -8% 0px",threshold:.01});
  nodes.forEach(node=>io.observe(node));
};
reveal(".service-card,.price-card,.node-card,.review,.feature,.step,.launch-card,.compare-wrap,.config-panel,.config-result,.status-main,.status-list,.admin-kpi,.admin-panel,.admin-workspace");
})();