const zSetInterval=(fn,ms)=>window.setInterval(()=>{if(!document.hidden)fn();},ms);
(async()=>{"use strict";
const auth=window.ZAuth;
if(!auth)return;
const $=id=>document.getElementById(id);
const session=auth.getSession?.();
if(!session){location.replace("../auth/login.html");return;}

let users=auth.getUsers?.()||[];
let me=users.find(u=>u.email===session.email);
if(!me||me.role!=="admin"||me.status==="locked"){auth.logout?.();return;}

const trustedDevice=await window.ZAdminAccess?.isTrusted?.(me);
if(!trustedDevice){
  window.ZAdminAccess?.auditDenied?.(me);
  location.replace("../dashboard/index.html?admin=denied");
  return;
}

let selectedId=null;
const text=(id,value)=>{const node=$(id);if(node)node.textContent=String(value??"—");};
const fmt=value=>{if(!value)return"—";const d=new Date(value);return Number.isNaN(d.getTime())?"—":d.toLocaleString("vi-VN",{dateStyle:"medium",timeStyle:"short"});};
const timeValue=value=>{const n=Date.parse(value||"");return Number.isFinite(n)?n:0;};
const normalize=u=>({...u,role:u.role==="admin"?"admin":"user",status:u.status==="locked"?"locked":"active",loginHistory:Array.isArray(u.loginHistory)?u.loginHistory:[],loginCount:Number(u.loginCount)||0});

const filtered=()=>{
 const q=($("search")?.value||"").trim().toLowerCase();
 const status=$("status")?.value||"all";
 const role=$("role")?.value||"all";
 const sort=$("sort")?.value||"recent";
 const list=users.map(normalize).filter(u=>{
   const hay=(u.name+" "+u.email).toLowerCase();
   return (!q||hay.includes(q))&&(status==="all"||u.status===status)&&(role==="all"||u.role===role);
 });
 return list.sort((a,b)=>{
   if(sort==="name")return String(a.name||a.email).localeCompare(String(b.name||b.email),"vi");
   if(sort==="logins")return b.loginCount-a.loginCount;
   if(sort==="created")return timeValue(b.createdAt)-timeValue(a.createdAt);
   return timeValue(b.lastLogin)-timeValue(a.lastLogin);
 });
};

const animateNumber=(id,target,duration=520)=>{
 const node=$(id);if(!node)return;
 const start=Number(node.dataset.value||node.textContent)||0;
 const end=Number(target)||0;
 node.dataset.value=String(end);
 if(reduceMotion){node.textContent=String(end);return;}
 const started=performance.now();
 const tick=now=>{
   const p=Math.min(1,(now-started)/duration);
   const eased=1-Math.pow(1-p,3);
   node.textContent=String(Math.round(start+(end-start)*eased));
   if(p<1)requestAnimationFrame(tick);
 };
 requestAnimationFrame(tick);
};
const stats=()=>{
 const list=users.map(normalize);
 animateNumber("total",list.length);
 animateNumber("active",list.filter(u=>u.status==="active").length);
 animateNumber("admins",list.filter(u=>u.role==="admin").length);
 animateNumber("logins",list.reduce((n,u)=>n+u.loginCount,0));
 animateNumber("locked",list.filter(u=>u.status==="locked").length);
};

const show=raw=>{
 const u=users.map(normalize).find(x=>x.id===raw);
 selectedId=u?.id||null;
 const details=$("details"),placeholder=$("placeholder");
 if(!u){details.hidden=true;placeholder.hidden=false;document.querySelector(".admin-detail")?.classList.remove("has-selection");return;}
 placeholder.hidden=true;details.hidden=false;document.querySelector(".admin-detail")?.classList.add("has-selection");
 text("avatar",(u.name||"Z").trim().charAt(0).toUpperCase());
 text("name",u.name);text("email",u.email);text("state",u.status.toUpperCase());
 text("id",u.id);text("userRole",u.role);text("created",fmt(u.createdAt));text("last",fmt(u.lastLogin));text("loginCount",u.loginCount);
 const last=u.loginHistory[0];
 text("device",last?(last.device||"Browser")+" · "+(last.browser||"Browser"):"—");
 text("ip",last?.ip||"Chưa có dữ liệu");
 text("emailDetail",u.email||"—");

 const history=$("history");history.replaceChildren();
 if(!u.loginHistory.length){
   const empty=document.createElement("div");empty.className="no-history";empty.textContent="Chưa có lịch sử đăng nhập.";history.append(empty);
 }else{
   u.loginHistory.slice(0,10).forEach(item=>{
     const row=document.createElement("div");row.className="history-row";
     const dot=document.createElement("i");dot.className=item.success===false?"dot fail":"dot";
     const wrap=document.createElement("div");
     const b=document.createElement("b");b.textContent=item.success===false?"Đăng nhập thất bại":"Đăng nhập thành công";
     const s=document.createElement("span");s.textContent=(item.device||"Browser")+" · "+(item.browser||"Browser")+" · IP: "+(item.ip||"chưa có");wrap.append(b,s);
     const time=document.createElement("time");time.textContent=fmt(item.at);row.append(dot,wrap,time);history.append(row);
   });
 }
 const lock=$("lock"),revoke=$("revoke");
 if(lock){lock.textContent=u.status==="locked"?"Mở khóa tài khoản":"Khóa tài khoản";lock.disabled=u.email===me.email;}
 if(revoke)revoke.disabled=u.email===me.email;
};

const render=()=>{
 const rows=$("rows");if(!rows)return;
 rows.replaceChildren();
 const list=filtered();
 text("count",list.length);
 const empty=$("empty");if(empty)empty.hidden=list.length!==0;

 list.forEach(u=>{
   const tr=document.createElement("tr");
   if(u.id===selectedId)tr.classList.add("is-selected");

   const user=document.createElement("td");user.className="user";
   const avatar=document.createElement("span");avatar.className="avatar";avatar.textContent=(u.name||"Z").trim().charAt(0).toUpperCase();
   const wrap=document.createElement("span");
   const b=document.createElement("b");b.textContent=u.name||"—";
   const s=document.createElement("span");s.textContent=u.email||"—";
   wrap.append(b,s);user.append(avatar,wrap);tr.append(user);

   const role=document.createElement("td");role.textContent=u.role;role.className=u.role;tr.append(role);
   const status=document.createElement("td");status.textContent=u.status;status.className=u.status;tr.append(status);

   const login=document.createElement("td");login.textContent=String(u.loginCount);login.className="numeric";tr.append(login);
   const last=document.createElement("td");last.textContent=fmt(u.lastLogin);tr.append(last);

   const action=document.createElement("td");
   const btn=document.createElement("button");btn.className="view";btn.type="button";btn.textContent="Xem";
   btn.setAttribute("aria-label","Xem tài khoản "+(u.name||u.email||"người dùng"));
   btn.addEventListener("click",()=>show(u.id));
   action.append(btn);tr.append(action);rows.append(tr);
 });
 stats();
 if(selectedId&&!list.some(u=>u.id===selectedId))show(null);
};

const save=()=>auth.saveUsers(users);

const analytics=()=>{
 const normalized=users.map(normalize),now=Date.now(),day=86400000;
 const days=Array.from({length:7},(_,i)=>{const d=new Date(now-(6-i)*day);return{key:d.toISOString().slice(0,10),label:d.toLocaleDateString("vi-VN",{weekday:"short"}).replace(".","")};});
 const chart=$("loginChart");chart?.replaceChildren();
 const counts=days.map(d=>normalized.reduce((n,u)=>n+u.loginHistory.filter(x=>x.success!==false&&String(x.at||"").slice(0,10)===d.key).length,0));
 const max=Math.max(1,...counts);
 days.forEach((d,i)=>{
   const item=document.createElement("div");item.className="bar-item";
   const value=document.createElement("b");value.textContent=String(counts[i]);
   const track=document.createElement("div");track.className="bar-track";
   const fill=document.createElement("i");fill.style.height=Math.max(8,(counts[i]/max)*100)+"%";fill.style.animationDelay=(i*55)+"ms";track.append(fill);
   const label=document.createElement("span");label.textContent=d.label;
   item.append(value,track,label);chart?.append(item);
 });

 const active=normalized.filter(u=>u.status==="active").length;
 text("userDonutTotal",normalized.length);text("mixActive",active);text("mixLocked",normalized.filter(u=>u.status==="locked").length);text("mixAdmins",normalized.filter(u=>u.role==="admin").length);
 const donut=$("userDonut");if(donut)donut.style.setProperty("--active",normalized.length?active/normalized.length*100+"%":"0%");

 text("activeSessions",session?1:0);text("sessionUser",me.name||me.email);
 const last=me.loginHistory?.[0];text("sessionDevice",last?(last.device||"Browser")+" · "+(last.browser||"Browser"):"Phiên quản trị hiện tại");

 const audit=auth.getAudit?.()||[];
 const success=audit.filter(x=>x.type==="login_success"),failed=audit.filter(x=>x.type==="login_failed");
 const attempts=success.length+failed.length,rate=attempts?Math.round(success.length/attempts*100):0;
 text("loginSuccess",success.length);text("loginFailed",failed.length);text("loginHealthRate",rate+"%");
 const health=$("loginHealthBar");if(health)health.style.width=rate+"%";

 const growth=$("userGrowth");growth?.replaceChildren();
 const growthDays=Array.from({length:30},(_,i)=>new Date(now-(29-i)*day));
 const growthCounts=growthDays.map(d=>normalized.filter(u=>String(u.createdAt||"").slice(0,10)<=d.toISOString().slice(0,10)).length);
 const growthMax=Math.max(1,...growthCounts);
 growthDays.forEach((d,i)=>{const bar=document.createElement("i");bar.title=d.toLocaleDateString("vi-VN")+" · "+growthCounts[i]+" users";bar.style.height=Math.max(4,growthCounts[i]/growthMax*100)+"%";bar.style.animationDelay=(i*18)+"ms";growth?.append(bar);});

 const deviceCounts={};
 [...success,...normalized.flatMap(u=>u.loginHistory)].forEach(x=>{
   const key=(x.device||"Browser")+" · "+(x.browser||"Browser");deviceCounts[key]=(deviceCounts[key]||0)+1;
 });
 const deviceMix=$("deviceMix");deviceMix?.replaceChildren();
 const deviceEntries=Object.entries(deviceCounts).sort((a,b)=>b[1]-a[1]).slice(0,5),deviceMax=Math.max(1,...deviceEntries.map(x=>x[1]));
 if(!deviceEntries.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có dữ liệu thiết bị.";deviceMix?.append(e);}
 deviceEntries.forEach(([name,count])=>{
   const row=document.createElement("div");row.className="device-row";
   const label=document.createElement("span");label.textContent=name;
   const track=document.createElement("div");track.className="device-track";
   const fill=document.createElement("i");fill.style.width=count/deviceMax*100+"%";track.append(fill);
   const value=document.createElement("b");value.textContent=String(count);row.append(label,track,value);deviceMix?.append(row);
 });

 const recent=audit.slice().sort((a,b)=>timeValue(b.at)-timeValue(a.at));
 const activity=[];
 normalized.forEach(u=>u.loginHistory.slice(0,8).forEach(x=>activity.push({at:x.at,user:u.name||u.email,ok:x.success!==false,device:x.device||"Browser",browser:x.browser||"Browser"})));
 activity.sort((a,b)=>timeValue(b.at)-timeValue(a.at));
 const feed=$("activityFeed");feed?.replaceChildren();text("activityCount",activity.length+" events");
 if(!activity.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có hoạt động gần đây.";feed?.append(e);}
 activity.slice(0,8).forEach(e=>{
   const row=document.createElement("div");row.className="activity-row";
   const dot=document.createElement("i");dot.className=e.ok?"dot":"dot fail";
   const wrap=document.createElement("div"),b=document.createElement("b"),s=document.createElement("span"),t=document.createElement("time");
   b.textContent=e.ok?"Đăng nhập thành công":"Đăng nhập thất bại";s.textContent=e.user+" · "+e.device+" · "+e.browser+" · IP: "+(e.ip||"chưa có");t.textContent=fmt(e.at);
   wrap.append(b,s);row.append(dot,wrap,t);feed?.append(row);
 });

 const auditFeed=$("auditFeed");auditFeed?.replaceChildren();text("auditCount",recent.length+" events");
 const labels={login_success:"Đăng nhập thành công",login_failed:"Đăng nhập thất bại",register:"Tạo tài khoản",logout:"Đăng xuất",admin_lock:"Admin khóa tài khoản",admin_unlock:"Admin mở khóa tài khoản",admin_revoke_session:"Admin thu hồi phiên"};
 if(!recent.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có audit event.";auditFeed?.append(e);}
 recent.slice(0,10).forEach(e=>{
   const row=document.createElement("div");row.className="activity-row";
   const dot=document.createElement("i");dot.className=e.type==="login_failed"?"dot fail":"dot";
   const wrap=document.createElement("div"),b=document.createElement("b"),s=document.createElement("span"),t=document.createElement("time");
   b.textContent=labels[e.type]||e.type;s.textContent=(e.name||e.email||"Unknown")+" · "+(e.device||"Browser")+" · "+(e.browser||"Browser")+" · IP: "+(e.ip||"chưa có");t.textContent=fmt(e.at);
   wrap.append(b,s);row.append(dot,wrap,t);auditFeed?.append(row);
 });
};

const refreshData=()=>{
 const fresh=auth.getUsers?.()||[];
 const currentSession=auth.getSession?.();
 const current=fresh.find(u=>u.email===currentSession?.email);
 if(!current||current.role!=="admin"||current.status==="locked"){auth.logout?.();return;}
 users=fresh;me=current;render();analytics();show(selectedId);
};

$("jumpDirectory")?.addEventListener("click",()=>{document.querySelector(".admin-workspace")?.scrollIntoView({behavior:"smooth",block:"start"});});
let globalSearchDebounce=0;
$("adminGlobalSearch")?.addEventListener("input",event=>{const value=event.target.value.trim();const search=$("search");if(search){search.value=value;window.clearTimeout(globalSearchDebounce);globalSearchDebounce=window.setTimeout(render,120);}});
/* Performance-aware motion engine */
const reduceMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
const canHover=window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;

const revealObserver=reduceMotion?null:new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.08,rootMargin:"0px 0px -8% 0px"});

document.querySelectorAll(".admin-reveal-group,.admin-workspace").forEach(node=>{
  if(revealObserver)revealObserver.observe(node);
  else node.classList.add("is-visible");
});

const toast=document.createElement("div");
toast.className="admin-toast";
toast.setAttribute("role","status");
toast.setAttribute("aria-live","polite");
document.body.append(toast);
let toastTimer=0;
const notify=(title,message)=>{
  toast.replaceChildren();
  const strong=document.createElement("strong");
  const span=document.createElement("span");
  strong.textContent=title;span.textContent=message;
  toast.append(strong,span);
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),2400);
};

document.addEventListener("keydown",event=>{
  const tag=document.activeElement?.tagName;
  if((event.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(tag))||
     (event.key.toLowerCase()==="k"&&(event.ctrlKey||event.metaKey))){
    event.preventDefault();
    $("adminGlobalSearch")?.focus();
    $("adminGlobalSearch")?.select();
  }
  if(event.key==="Escape"&&document.activeElement?.id==="adminGlobalSearch"){
    document.activeElement.blur();
  }
});

const scrollProgress=document.createElement("div");
scrollProgress.className="admin-scroll-progress";
document.body.append(scrollProgress);
const backTop=document.createElement("button");
backTop.type="button";
backTop.className="admin-back-top";
backTop.textContent="↑";
backTop.setAttribute("aria-label","Về đầu trang");
document.body.append(backTop);

let scrollTick=false;
const syncScrollUI=()=>{
  if(scrollTick)return;
  scrollTick=true;
  requestAnimationFrame(()=>{
    const doc=document.documentElement;
    const max=Math.max(1,doc.scrollHeight-window.innerHeight);
    scrollProgress.style.setProperty("--progress",(window.scrollY/max)*100+"%");
    backTop.classList.toggle("is-visible",window.scrollY>420);
    document.body.classList.toggle("header-scrolled",window.scrollY>22);
    scrollTick=false;
  });
};
window.addEventListener("scroll",syncScrollUI,{passive:true});
backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"}));
syncScrollUI();

if(canHover&&!reduceMotion){
  document.querySelectorAll(".admin-panel,.admin-kpi,.admin-privacy").forEach(card=>{
    let frame=0;
    let point=null;
    const update=()=>{
      frame=0;
      if(!point)return;
      const rect=card.getBoundingClientRect();
      const x=(point.clientX-rect.left)/rect.width-.5;
      const y=(point.clientY-rect.top)/rect.height-.5;
      card.style.setProperty("--tilt-x",(x*1.4)+"deg");
      card.style.setProperty("--tilt-y",(-y*1.4)+"deg");
    };
    card.addEventListener("pointermove",event=>{
      point=event;
      if(!frame)frame=requestAnimationFrame(update);
    },{passive:true});
    card.addEventListener("pointerleave",()=>{
      point=null;
      card.style.setProperty("--tilt-x","0deg");
      card.style.setProperty("--tilt-y","0deg");
    },{passive:true});
  });
}

if(!reduceMotion){
  document.addEventListener("pointerdown",event=>{
    const button=event.target.closest("button,.view,.admin-header-actions a");
    if(!button||button.disabled)return;
    const rect=button.getBoundingClientRect();
    const ripple=document.createElement("span");
    ripple.className="ripple-dot";
    ripple.style.left=(event.clientX-rect.left)+"px";
    ripple.style.top=(event.clientY-rect.top)+"px";
    button.append(ripple);
    ripple.addEventListener("animationend",()=>ripple.remove(),{once:true});
  },{passive:true});
}
const updateClock=()=>{const node=$("adminClock");if(node)node.textContent=new Date().toLocaleTimeString("vi-VN",{hour12:false});};
zSetInterval(updateClock,1000);updateClock();

$("focusSearch")?.addEventListener("click",()=>{$("search")?.focus();$("search")?.select();notify("Search","Đã đưa con trỏ tới bộ lọc User Directory.");});
$("focusLocked")?.addEventListener("click",()=>{const status=$("status");if(status){status.value="locked";render();notify("Filter","Đang hiển thị tài khoản bị khóa.");}});
$("clearFilters")?.addEventListener("click",()=>{["search"].forEach(id=>{if($(id))$(id).value="";});if($("status"))$("status").value="all";if($("role"))$("role").value="all";if($("sort"))$("sort").value="recent";render();notify("Filters","Đã đặt lại toàn bộ bộ lọc.");});
let searchDebounce=0;
$("search")?.addEventListener("input",()=>{window.clearTimeout(searchDebounce);searchDebounce=window.setTimeout(render,120);});
["status","role","sort"].forEach(id=>$(id)?.addEventListener("change",render));
$("refresh")?.addEventListener("click",()=>{refreshData();notify("System","Dữ liệu Admin Center đã được làm mới.");});
$("close")?.addEventListener("click",()=>show(null));
$("logout")?.addEventListener("click",()=>auth.logout?.());

$("exportUsers")?.addEventListener("click",()=>{
 const rows=[["id","name","email","role","status","createdAt","lastLogin","loginCount","lastDevice","lastBrowser","lastIp"]];
 users.map(normalize).forEach(u=>{const last=u.loginHistory[0]||{};rows.push([u.id,u.name,u.email,u.role,u.status,u.createdAt||"",u.lastLogin||"",u.loginCount,last.device||"",last.browser||"",last.ip||""]);});
 const csv=rows.map(row=>row.map(value=>{
   let valueText=String(value??"").replace(/"/g,'""');
   if(/^[=+\-@]/.test(valueText))valueText="'"+valueText;
   return '"'+valueText+'"';
 }).join(",")).join("\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
 const url=URL.createObjectURL(blob),link=document.createElement("a");
 link.href=url;link.download="zhosting-users-"+new Date().toISOString().slice(0,10)+".csv";link.click();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
});

$("lock")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);if(!u||u.email===me.email)return;
 const next=normalize(u).status==="locked"?"active":"locked";u.status=next;
 auth.recordAudit?.(next==="locked"?"admin_lock":"admin_unlock",{adminId:me.id,adminEmail:me.email,targetId:u.id,targetEmail:u.email});
 save();render();analytics();show(u.id);notify(next==="locked"?"Account locked":"Account unlocked",u.email);
});
$("revoke")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);if(!u||u.email===me.email)return;
 u.sessionRevokedAt=new Date().toISOString();
 auth.recordAudit?.("admin_revoke_session",{adminId:me.id,adminEmail:me.email,targetId:u.id,targetEmail:u.email});
 save();analytics();show(u.id);notify("Session revoked",u.email);
});

render();analytics();
})();