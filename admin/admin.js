(()=>{"use strict";
const auth=window.ZAuth;
if(!auth)return;
const $=id=>document.getElementById(id);
const session=auth.getSession?.();
if(!session){location.replace("../auth/login.html");return;}
const users=auth.getUsers?.()||[];
const me=users.find(u=>u.email===session.email);
if(!me||me.role!=="admin"||me.status==="locked"){auth.logout?.();return;}

const text=(id,value)=>{const n=$(id);if(n)n.textContent=String(value??"—");};
const fmt=value=>{if(!value)return"—";const d=new Date(value);return Number.isNaN(d.getTime())?"—":d.toLocaleString("vi-VN",{dateStyle:"medium",timeStyle:"short"});};
const normalize=u=>({...u,role:u.role==="admin"?"admin":"user",status:u.status==="locked"?"locked":"active",loginHistory:Array.isArray(u.loginHistory)?u.loginHistory:[],loginCount:Number(u.loginCount)||0});
let selectedId=null;

const filtered=()=>{
 const q=($("search")?.value||"").trim().toLowerCase();
 const status=$("status")?.value||"all";
 const role=$("role")?.value||"all";
 return users.map(normalize).filter(u=>{
  const hay=(u.name+" "+u.email).toLowerCase();
  return (!q||hay.includes(q))&&(status==="all"||u.status===status)&&(role==="all"||u.role===role);
 });
};

const stats=()=>{
 text("total",users.length);
 text("active",users.filter(u=>normalize(u).status==="active").length);
 text("admins",users.filter(u=>normalize(u).role==="admin").length);
 text("logins",users.reduce((n,u)=>n+normalize(u).loginCount,0));
 text("locked",users.filter(u=>normalize(u).status==="locked").length);
};

const show=raw=>{
 const u=users.map(normalize).find(x=>x.id===raw);
 selectedId=u?.id||null;
 const details=$("details"),placeholder=$("placeholder");
 if(!u){details.hidden=true;placeholder.hidden=false;return;}
 placeholder.hidden=true;details.hidden=false;
 text("avatar",(u.name||"Z").trim().charAt(0).toUpperCase());
 text("name",u.name);text("email",u.email);text("state",u.status.toUpperCase());
 text("id",u.id);text("userRole",u.role);text("created",fmt(u.createdAt));text("last",fmt(u.lastLogin));text("loginCount",u.loginCount);
 const last=u.loginHistory[0];
 text("device",last?(last.device||"Browser")+" · "+(last.browser||"Browser"):"—");
 const history=$("history");history.replaceChildren();
 if(!u.loginHistory.length){const empty=document.createElement("div");empty.className="no-history";empty.textContent="Chưa có lịch sử đăng nhập.";history.append(empty);}
 else u.loginHistory.slice(0,10).forEach(item=>{
  const row=document.createElement("div");row.className="history-row";
  const dot=document.createElement("i");dot.className="dot";
  const wrap=document.createElement("div");const b=document.createElement("b");b.textContent=item.success?"Đăng nhập thành công":"Đăng nhập thất bại";
  const s=document.createElement("span");s.textContent=(item.device||"Browser")+" · "+(item.browser||"Browser");wrap.append(b,s);
  const time=document.createElement("time");time.textContent=fmt(item.at);row.append(dot,wrap,time);history.append(row);
 });
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
  const user=document.createElement("td");user.className="user";
  const avatar=document.createElement("span");avatar.className="avatar";avatar.textContent=(u.name||"Z").trim().charAt(0).toUpperCase();
  const wrap=document.createElement("span");const b=document.createElement("b");b.textContent=u.name||"—";const s=document.createElement("span");s.textContent=u.email||"—";wrap.append(b,s);user.append(avatar,wrap);
  tr.append(user);
  [u.role,u.status,u.loginCount,fmt(u.lastLogin)].forEach((v,i)=>{const td=document.createElement("td");td.textContent=String(v);if(i===0||i===1)td.className=String(v);tr.append(td);});
  const action=document.createElement("td");const btn=document.createElement("button");btn.className="view";btn.type="button";btn.textContent="Xem";btn.addEventListener("click",()=>show(u.id));action.append(btn);tr.append(action);rows.append(tr);
 });
 stats();
 if(selectedId&&!list.some(u=>u.id===selectedId))show(null);
};

const save=()=>auth.saveUsers(users);

const analytics=()=>{
 const normalized=users.map(normalize);
 const now=Date.now(), day=86400000;
 const days=Array.from({length:7},(_,i)=>{const d=new Date(now-(6-i)*day);return {key:d.toISOString().slice(0,10),label:d.toLocaleDateString("vi-VN",{weekday:"short"}).replace(".","")};});
 const chart=$("loginChart");chart?.replaceChildren();
 const counts=days.map(d=>normalized.reduce((n,u)=>n+u.loginHistory.filter(x=>x.success!==false&&String(x.at||"").slice(0,10)===d.key).length,0));
 const max=Math.max(1,...counts);
 days.forEach((d,i)=>{
  const item=document.createElement("div");item.className="bar-item";
  const value=document.createElement("b");value.textContent=String(counts[i]);
  const track=document.createElement("div");track.className="bar-track";
  const fill=document.createElement("i");fill.style.height=Math.max(8,(counts[i]/max)*100)+"%";track.append(fill);
  const label=document.createElement("span");label.textContent=d.label;
  item.append(value,track,label);chart?.append(item);
 });
 text("userDonutTotal",normalized.length);text("mixActive",normalized.filter(u=>u.status==="active").length);text("mixLocked",normalized.filter(u=>u.status==="locked").length);text("mixAdmins",normalized.filter(u=>u.role==="admin").length);
 const active=normalized.filter(u=>u.status==="active").length;
 const activePct=normalized.length?active/normalized.length*100:0;
 const donut=$("userDonut");if(donut)donut.style.setProperty("--active",activePct+"%");
 text("activeSessions",session?1:0);text("sessionUser",me.name||me.email);
 const last=me.loginHistory?.[0];text("sessionDevice",last?(last.device||"Browser")+" · "+(last.browser||"Browser"):"Phiên quản trị hiện tại");

 const audit=auth.getAudit?.()||[];
 const success=audit.filter(x=>x.type==="login_success");
 const failed=audit.filter(x=>x.type==="login_failed");
 const totalAttempts=success.length+failed.length;
 const rate=totalAttempts?Math.round(success.length/totalAttempts*100):0;
 text("loginSuccess",success.length);text("loginFailed",failed.length);text("loginHealthRate",rate+"%");
 const health=$("loginHealthBar");if(health)health.style.width=rate+"%";

 const growth=$("userGrowth");growth?.replaceChildren();
 const growthDays=Array.from({length:30},(_,i)=>new Date(now-(29-i)*day));
 const growthCounts=growthDays.map(d=>{
   const key=d.toISOString().slice(0,10);
   return normalized.filter(u=>String(u.createdAt||"").slice(0,10)<=key).length;
 });
 const growthMax=Math.max(1,...growthCounts);
 growthDays.forEach((d,i)=>{
   const bar=document.createElement("i");
   bar.title=d.toLocaleDateString("vi-VN")+" · "+growthCounts[i]+" users";
   bar.style.height=Math.max(4,(growthCounts[i]/growthMax)*100)+"%";
   growth?.append(bar);
 });

 const deviceCounts={};
 success.forEach(x=>{
   const key=(x.device||"Browser")+" · "+(x.browser||"Browser");
   deviceCounts[key]=(deviceCounts[key]||0)+1;
 });
 if(!success.length){
   normalized.forEach(u=>u.loginHistory.filter(x=>x.success!==false).forEach(x=>{
     const key=(x.device||"Browser")+" · "+(x.browser||"Browser");
     deviceCounts[key]=(deviceCounts[key]||0)+1;
   }));
 }
 const deviceMix=$("deviceMix");deviceMix?.replaceChildren();
 const deviceEntries=Object.entries(deviceCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
 const deviceMax=Math.max(1,...deviceEntries.map(x=>x[1]));
 if(!deviceEntries.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có dữ liệu thiết bị.";deviceMix?.append(e);}
 deviceEntries.forEach(([name,count])=>{
   const row=document.createElement("div");row.className="device-row";
   const label=document.createElement("span");label.textContent=name;
   const track=document.createElement("div");track.className="device-track";
   const fill=document.createElement("i");fill.style.width=(count/deviceMax*100)+"%";track.append(fill);
   const value=document.createElement("b");value.textContent=String(count);
   row.append(label,track,value);deviceMix?.append(row);
 });

 const recent= audit.slice().sort((a,b)=>new Date(b.at)-new Date(a.at));
 const feed=$("activityFeed");feed?.replaceChildren();
 const activity=[];
 normalized.forEach(u=>u.loginHistory.slice(0,8).forEach(x=>activity.push({at:x.at,user:u.name||u.email,ok:x.success!==false,device:x.device||"Browser",browser:x.browser||"Browser"})));
 activity.sort((a,b)=>new Date(b.at)-new Date(a.at));
 text("activityCount",activity.length+" events");
 if(!activity.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có hoạt động gần đây.";feed?.append(e);}
 activity.slice(0,8).forEach(e=>{
  const row=document.createElement("div");row.className="activity-row";
  const dot=document.createElement("i");dot.className=e.ok?"dot":"dot fail";
  const wrap=document.createElement("div");const b=document.createElement("b");b.textContent=e.ok?"Đăng nhập thành công":"Đăng nhập thất bại";const s=document.createElement("span");s.textContent=e.user+" · "+e.device+" · "+e.browser;wrap.append(b,s);
  const t=document.createElement("time");t.textContent=fmt(e.at);row.append(dot,wrap,t);feed?.append(row);
 });

 const auditFeed=$("auditFeed");auditFeed?.replaceChildren();text("auditCount",recent.length+" events");
 const auditLabel={
   login_success:"Đăng nhập thành công",
   login_failed:"Đăng nhập thất bại",
   register:"Tạo tài khoản",
   logout:"Đăng xuất",
   admin_lock:"Admin khóa tài khoản",
   admin_unlock:"Admin mở khóa tài khoản",
   admin_revoke_session:"Admin thu hồi phiên"
 };
 if(!recent.length){const e=document.createElement("div");e.className="no-history";e.textContent="Chưa có audit event.";auditFeed?.append(e);}
 recent.slice(0,10).forEach(e=>{
   const row=document.createElement("div");row.className="activity-row";
   const dot=document.createElement("i");dot.className=e.type==="login_failed"?"dot fail":"dot";
   const wrap=document.createElement("div");
   const b=document.createElement("b");b.textContent=auditLabel[e.type]||e.type;
   const s=document.createElement("span");s.textContent=(e.name||e.email||"Unknown")+" · "+(e.device||"Browser")+" · "+(e.browser||"Browser");
   wrap.append(b,s);
   const t=document.createElement("time");t.textContent=fmt(e.at);
   row.append(dot,wrap,t);auditFeed?.append(row);
 });
};const updateClock=()=>{const node=$("adminClock");if(node)node.textContent=new Date().toLocaleTimeString("vi-VN",{hour12:false});};
setInterval(updateClock,1000);updateClock();
$("focusSearch")?.addEventListener("click",()=>{$("search")?.focus();$("search")?.select();});
$("focusLocked")?.addEventListener("click",()=>{const status=$("status");if(status){status.value="locked";render();}});
$("clearFilters")?.addEventListener("click",()=>{
 if($("search"))$("search").value="";
 if($("status"))$("status").value="all";
 if($("role"))$("role").value="all";
 render();
});
$("search")?.addEventListener("input",render);
$("status")?.addEventListener("change",render);
$("role")?.addEventListener("change",render);
$("refresh")?.addEventListener("click",()=>{window.location.reload();});
$("close")?.addEventListener("click",()=>show(null));
$("logout")?.addEventListener("click",()=>auth.logout?.());
$("exportUsers")?.addEventListener("click",()=>{
 const rows=[["id","name","email","role","status","createdAt","lastLogin","loginCount","lastDevice","lastBrowser"]];
 users.map(normalize).forEach(u=>{
  const last=u.loginHistory[0]||{};
  rows.push([u.id,u.name,u.email,u.role,u.status,u.createdAt||"",u.lastLogin||"",u.loginCount,last.device||"",last.browser||""]);
 });
 const csv=rows.map(row=>row.map(value=>{
  const text=String(value??"").replace(/"/g,'""');
  return '"' + text + '"';
 }).join(",")).join("\\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
 const url=URL.createObjectURL(blob);const link=document.createElement("a");
 link.href=url;link.download="zhosting-users-"+new Date().toISOString().slice(0,10)+".csv";
 link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$("lock")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);
 if(!u||u.email===me.email)return;
 const nextStatus=normalize(u).status==="locked"?"active":"locked";
 u.status=nextStatus;
 auth.recordAudit?.(nextStatus==="locked"?"admin_lock":"admin_unlock",{adminId:me.id,adminEmail:me.email,targetId:u.id,targetEmail:u.email});
 save();render();show(u.id);
});
$("revoke")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);
 if(!u||u.email===me.email)return;
 u.sessionRevokedAt=new Date().toISOString();
 auth.recordAudit?.("admin_revoke_session",{adminId:me.id,adminEmail:me.email,targetId:u.id,targetEmail:u.email});
 save();show(u.id);
});
render();
analytics();
})();