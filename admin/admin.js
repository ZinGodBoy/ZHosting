(()=>{"use strict";
const auth=window.ZAuth;
if(!auth)return;
const session=auth.getSession?.();
if(!session){location.replace("../auth/login.html");return;}
const users=auth.getUsers();
const me=users.find(u=>u.email===session.email);
if(!me||me.role!=="admin"||me.status==="locked"){auth.logout();return;}
const $=id=>document.getElementById(id);
const safeText=(id,value)=>{const n=$(id);if(n)n.textContent=String(value??"—");};
const date=v=>{if(!v)return"—";const d=new Date(v);return Number.isNaN(d.getTime())?"—":d.toLocaleString("vi-VN",{dateStyle:"medium",timeStyle:"short"});};
let selected=null;
const matches=()=>{
 const q=($("search")?.value||"").trim().toLowerCase(), status=$("status")?.value||"all", role=$("role")?.value||"all";
 return users.filter(u=>(!q||String(u.name||"").toLowerCase().includes(q)||String(u.email||"").toLowerCase().includes(q))&&(status==="all"||u.status===status)&&(role==="all"||u.role===role));
};
const render=()=>{
 const rows=$("rows");if(!rows)return;rows.replaceChildren();
 const list=matches();safeText("count",list.length);$("empty").hidden=list.length!==0;
 list.forEach(u=>{
  const tr=document.createElement("tr");
  const cells=[u.name||"—",u.role||"user",u.status||"active",u.loginCount||0,date(u.lastLogin)];
  cells.forEach((v,i)=>{const td=document.createElement("td");td.textContent=String(v);if(i===0){td.className="user";}tr.append(td);});
  const action=document.createElement("td"),btn=document.createElement("button");btn.className="view";btn.type="button";btn.textContent="Xem";btn.addEventListener("click",()=>show(u.id));action.append(btn);tr.append(action);rows.append(tr);
 });
 updateStats();
};
const updateStats=()=>{
 safeText("total",users.length);safeText("active",users.filter(u=>u.status==="active").length);safeText("admins",users.filter(u=>u.role==="admin").length);
 safeText("logins",users.reduce((n,u)=>n+Number(u.loginCount||0),0));
};
const show=id=>{
 selected=users.find(u=>u.id===id)||null;
 $("placeholder").hidden=!!selected;$("details").hidden=!selected;
 if(!selected)return;
 const initial=(selected.name||"Z").trim().charAt(0).toUpperCase();
 safeText("avatar",initial);safeText("name",selected.name);safeText("email",selected.email);safeText("state",(selected.status||"active").toUpperCase());
 safeText("id",selected.id);safeText("userRole",selected.role);safeText("created",date(selected.createdAt));safeText("last",date(selected.lastLogin));safeText("loginCount",selected.loginCount||0);
 const device=(selected.loginHistory||[])[0];safeText("device",device?device.device+" · "+device.browser:"—");
 const history=$("history");history.replaceChildren();
 (selected.loginHistory||[]).slice(0,10).forEach(item=>{const row=document.createElement("div");row.className="history-row";const dot=document.createElement("i");dot.className="dot";const wrap=document.createElement("div");const b=document.createElement("b");b.textContent=item.success?"Đăng nhập thành công":"Đăng nhập thất bại";const s=document.createElement("span");s.textContent=(item.device||"Browser")+" · "+(item.browser||"Browser");wrap.append(b,s);const time=document.createElement("time");time.textContent=date(item.at);row.append(dot,wrap,time);history.append(row);});
 $("lock").textContent=selected.status==="locked"?"Mở khóa tài khoản":"Khóa tài khoản";
 $("lock").disabled=selected.email===me.email;
 $("revoke").disabled=selected.email===me.email;
};
const save=()=>auth.saveUsers(users);
$("search")?.addEventListener("input",render);$("status")?.addEventListener("change",render);$("role")?.addEventListener("change",render);$("refresh")?.addEventListener("click",render);
$("close")?.addEventListener("click",()=>show(null));
$("logout")?.addEventListener("click",()=>auth.logout());
$("lock")?.addEventListener("click",()=>{if(!selected||selected.email===me.email)return;selected.status=selected.status==="locked"?"active":"locked";save();render();show(selected.id);});
$("revoke")?.addEventListener("click",()=>{if(!selected||selected.email===me.email)return;selected.sessionRevokedAt=new Date().toISOString();save();show(selected.id);});
render();
})();