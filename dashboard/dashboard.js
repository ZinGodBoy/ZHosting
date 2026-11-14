(() => {
  "use strict";
  const auth=window.ZAuth;
  const users=auth?.getUsers?.()||[];
  const session=auth?.getSession?.();
  const user=session && users.find(u=>u.email===session.email);
  if(!user){ location.replace("../auth/login.html"); return; }

  const $=selector=>document.querySelector(selector);
  const set=(selector,value)=>{
    const node=$(selector);
    if(node)node.textContent=String(value??"");
  };

  set("#userName",(user.name||"bạn").split(" ").slice(-1)[0]);
  set("#userEmail",user.email);
  set("#userAvatar",(user.name||"Z").trim().charAt(0).toUpperCase());

  $("#logoutBtn")?.addEventListener("click",event=>{
    event.preventDefault();
    auth.logout?.();
  });

  $("#dashMenu")?.addEventListener("click",()=>{
    const sidebar=$("#sidebar");
    if(!sidebar)return;
    const open=sidebar.classList.toggle("open");
    $("#dashMenu")?.setAttribute("aria-expanded",String(open));
  });

  document.querySelectorAll(".side-nav a").forEach(a=>a.addEventListener("click",()=>{
    $("#sidebar")?.classList.remove("open");
    $("#dashMenu")?.setAttribute("aria-expanded","false");
  }));

  // Keep legacy dashboard pages compatible while the Account Center uses its richer controller.
  if(typeof auth.touchSession==="function")auth.touchSession();
})();