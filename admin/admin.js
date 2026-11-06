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
$("search")?.addEventListener("input",render);
$("status")?.addEventListener("change",render);
$("role")?.addEventListener("change",render);
$("refresh")?.addEventListener("click",()=>{window.location.reload();});
$("close")?.addEventListener("click",()=>show(null));
$("logout")?.addEventListener("click",()=>auth.logout?.());
$("lock")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);
 if(!u||u.email===me.email)return;
 u.status=normalize(u).status==="locked"?"active":"locked";
 save();render();show(u.id);
});
$("revoke")?.addEventListener("click",()=>{
 const u=users.find(x=>x.id===selectedId);
 if(!u||u.email===me.email)return;
 u.sessionRevokedAt=new Date().toISOString();
 save();show(u.id);
});
render();
})();