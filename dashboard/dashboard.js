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

  const syncAdminCenter=async()=>{
    const adminLink=$("#adminCenterLink");
    if(!adminLink)return;
    const trusted=user.role==="admin"&&await window.ZAdminAccess?.isTrusted?.(user);
    adminLink.hidden=!trusted;
    if(trusted){
      adminLink.onclick=()=>{location.href="../admin/index.html";};
    }else{
      adminLink.onclick=null;
    }
  };
  syncAdminCenter();

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
  let healthSignature="";
  const syncHealth=()=>{
    const sessionNow=auth.getSession?.();
    const loginAt=sessionNow?.createdAt||sessionNow?.issuedAt||sessionNow?.loginAt;
    const age=loginAt?Date.now()-Date.parse(loginAt):0;
    const sessionOk=!!sessionNow && (!age||age<8*60*60*1000);
    const securityOk=typeof auth.changePassword==="function" && !!user.password;
    const activityOk=Array.isArray(user.loginHistory);
    const signature=[sessionOk,securityOk,activityOk].join("|");
    if(signature===healthSignature)return;
    healthSignature=signature;
    const setHealth=(dot,textSelector,okText,badText,ok)=>{
      const dotNode=$(dot),textNode=$(textSelector);
      dotNode?.classList.toggle("is-good",ok); dotNode?.classList.toggle("is-warn",!ok);
      if(textNode)textNode.textContent=ok?okText:badText;
    };
    setHealth("#healthSessionDot","#healthSessionText","Phiên đang hoạt động","Cần đăng nhập lại",sessionOk);
    setHealth("#healthSecurityDot","#healthSecurityText","Đang dùng cơ chế bảo vệ mật khẩu","Kiểm tra lại bảo mật",securityOk);
    setHealth("#healthActivityDot","#healthActivityText",activityOk?"Lịch sử hoạt động sẵn sàng":"Chưa có lịch sử","Chưa có dữ liệu",activityOk);
  };
  const refreshAccountRuntime=()=>{
    if(document.hidden)return;
    syncHealth();
  };
  refreshAccountRuntime();
  window.addEventListener("pageshow",refreshAccountRuntime,{passive:true});
  document.addEventListener("visibilitychange",refreshAccountRuntime,{passive:true});

})();
