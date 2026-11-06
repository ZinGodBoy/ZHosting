(() => {
  "use strict";

  const session = window.ZAuth?.getSession?.();
  if (!session) {
    location.replace("../auth/login.html");
    return;
  }

  const users = window.ZAuth.getUsers();
  const user = users.find(item => item.email === session.email);
  if (!user) {
    window.ZAuth.logout();
    return;
  }

  const $ = selector => document.querySelector(selector);
  const set = (selector,value) => {
    const node=$(selector);
    if(node)node.textContent=String(value);
  };

  const firstName=(user.name||"bạn").trim().split(/\s+/)[0]||"bạn";
  const initial=(user.name||"Z").trim().charAt(0).toUpperCase();

  const formatDate=value=>{
    if(!value)return "—";
    const date=new Date(value);
    return Number.isNaN(date.getTime())?"—":date.toLocaleString("vi-VN",{dateStyle:"medium",timeStyle:"short"});
  };

  const deviceName=()=>{
    const ua=navigator.userAgent;
    if(/Edg\//.test(ua))return "Microsoft Edge";
    if(/Chrome\//.test(ua))return "Chrome";
    if(/Firefox\//.test(ua))return "Firefox";
    if(/Safari\//.test(ua))return "Safari";
    return "Browser";
  };

  const syncProfile=()=>{
    set("#dashName",user.name);
    set("#dashEmail",user.email);
    set("#welcomeName",firstName);
    set("#profileName",user.name);
    set("#profileEmail",user.email);
    set("#profileDate",formatDate(user.createdAt));
    set("#profileLastLogin",formatDate(user.lastLogin));
    set("#dashAvatar",initial);
    set("#profileAvatar",initial);
    set("#menuAvatar",initial);
    set("#menuName",user.name);
    set("#menuEmail",user.email);
    set("#profileHeadline",user.name);
    set("#profileSubline","Member · Demo account");
  };

  const updateSessionView=()=>{
    const persistent=Boolean(localStorage.getItem(window.ZAuth.SESSION_KEY));
    set("#sessionType",persistent?"Persistent":"Temporary");
    set("#sessionStarted",formatDate(session.issuedAt));
    set("#sessionActivity",formatDate(session.lastActivity));
    set("#sessionDevice",deviceName());
  };

  const updateSecurity=()=>{
    const score=$("#securityScore");
    const passwordOk=Boolean(user.password?.hash&&user.password?.salt);
    if(score){
      score.textContent=passwordOk?"GOOD":"REVIEW";
      score.style.color=passwordOk?"var(--green)":"#ffd166";
      score.style.borderColor=passwordOk?"rgba(85,230,165,.18)":"rgba(255,209,102,.2)";
    }
    set("#passwordSecurity",passwordOk?"PBKDF2 protected":"Legacy credential format");
  };

  const syncPrefs=()=>{
    let prefs={};
    try{prefs=JSON.parse(localStorage.getItem("zhosting_prefs_v1")||"{}")}catch{}
    const motion=$("#prefMotion"),toast=$("#prefToast"),compact=$("#prefCompact");
    if(motion)motion.checked=prefs.motion!==false;
    if(toast)toast.checked=prefs.toast!==false;
    if(compact)compact.checked=prefs.compact===true;
    document.body.classList.toggle("compact-mode",compact?.checked===true);
    document.body.classList.toggle("reduce-ui-motion",motion?.checked===false);
  };

  const savePrefs=()=>{
    const prefs={
      motion:$("#prefMotion")?.checked!==false,
      toast:$("#prefToast")?.checked!==false,
      compact:$("#prefCompact")?.checked===true
    };
    localStorage.setItem("zhosting_prefs_v1",JSON.stringify(prefs));
    document.body.classList.toggle("compact-mode",prefs.compact);
    document.body.classList.toggle("reduce-ui-motion",!prefs.motion);
    if(prefs.toast)window.ZUI?.toast("Đã lưu tùy chọn","Preferences đã được cập nhật.","success");
  };

  syncProfile();
  updateSessionView();
  updateSecurity();
  syncPrefs();

  const accountMenuBtn=$("#accountMenuBtn");
  const accountMenu=$("#accountMenu");
  const setMenuOpen=open=>{
    if(!accountMenu||!accountMenuBtn)return;
    accountMenu.hidden=!open;
    accountMenuBtn.setAttribute("aria-expanded",String(open));
  };

  accountMenuBtn?.addEventListener("click",event=>{
    event.stopPropagation();
    setMenuOpen(accountMenu?.hidden===true);
  });

  document.addEventListener("click",event=>{
    if(accountMenu&&!accountMenu.hidden&&!accountMenu.contains(event.target)&&!accountMenuBtn?.contains(event.target))setMenuOpen(false);
  });

  document.addEventListener("keydown",event=>{
    if(event.key==="Escape")setMenuOpen(false);
  });

  $("#focusProfile")?.addEventListener("click",()=>{
    setMenuOpen(false);
    $("#profile")?.scrollIntoView({behavior:"smooth",block:"start"});
  });

  $("#focusSecurity")?.addEventListener("click",()=>{
    setMenuOpen(false);
    $("#security")?.scrollIntoView({behavior:"smooth",block:"center"});
  });

  $("#copyEmail")?.addEventListener("click",async()=>{
    try{
      await navigator.clipboard.writeText(user.email);
      window.ZUI?.toast("Đã sao chép","Email tài khoản đã được copy.","success");
    }catch{
      window.ZUI?.toast("Không thể sao chép","Trình duyệt không cấp quyền clipboard.","error");
    }
    setMenuOpen(false);
  });

  $("#logoutBtn")?.addEventListener("click",event=>{
    event.preventDefault();
    setMenuOpen(false);
    window.ZAuth.logout();
  });

  const messages=[
    {title:"Chào mừng đến ZHosting",body:"Tài khoản của bạn đã sẵn sàng để quản lý dịch vụ.",time:"Vừa xong"},
    {title:"System status",body:"Các hệ thống demo đang hoạt động bình thường.",time:"Hôm nay"}
  ];

  const list=$("#mailList");
  const mailCount=$("#mailCount");
  const renderMessages=()=>{
    if(!list)return;
    list.replaceChildren();
    messages.forEach((message,index)=>{
      const item=document.createElement("button");
      item.type="button";
      item.className="mail-item"+(index===0?" unread":"");

      const dot=document.createElement("span");
      dot.className="mail-unread";

      const wrap=document.createElement("div");
      const title=document.createElement("b");
      title.textContent=message.title;
      const body=document.createElement("p");
      body.textContent=message.body;
      const time=document.createElement("small");
      time.textContent=message.time;

      wrap.append(title,body,time);
      item.append(dot,wrap);
      item.addEventListener("click",()=>{
        item.classList.remove("unread");
        dot.remove();
        const unread=[...list.querySelectorAll(".mail-item.unread")].length;
        if(mailCount)mailCount.textContent=String(unread);
        window.ZUI?.toast("Đã đánh dấu","Thông báo đã được đọc.","success");
      });
      list.appendChild(item);
    });
    if(mailCount)mailCount.textContent=String(messages.length);
  };
  renderMessages();

  $("#openInbox")?.addEventListener("click",()=>{
    $("#inbox")?.scrollIntoView({behavior:"smooth",block:"center"});
  });

  const modal=$("#profileModal");
  const openModal=()=>{
    if(!modal)return;
    const input=$("#editName");
    if(input)input.value=user.name||"";
    const style=$("#avatarStyle");
    if(style)style.value=user.avatarStyle||"initial";
    modal.setAttribute("aria-hidden","false");
    input?.focus();
  };
  const closeModal=()=>{
    modal?.setAttribute("aria-hidden","true");
  };

  $("#editProfile")?.addEventListener("click",openModal);
  $("#closeModal")?.addEventListener("click",closeModal);
  modal?.addEventListener("click",event=>{if(event.target===modal)closeModal()});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeModal()});

  $("#profileForm")?.addEventListener("submit",event=>{
    event.preventDefault();
    const name=$("#editName")?.value.trim()||"";
    const avatarStyle=$("#avatarStyle")?.value||"initial";
    const message=$("#profileMessage");

    if(name.length<2){
      if(message){
        message.textContent="Họ và tên cần có ít nhất 2 ký tự.";
        message.className="form-note error";
      }
      return;
    }

    user.name=name;
    user.avatarStyle=avatarStyle;
    window.ZAuth.saveUsers(users);
    syncProfile();

    if(message){
      message.textContent="Đã lưu thay đổi hồ sơ.";
      message.className="form-note success";
    }
    window.ZUI?.toast("Đã lưu hồ sơ","Thông tin tài khoản đã được cập nhật.","success");
    setTimeout(closeModal,650);
  });

  $("#refreshSession")?.addEventListener("click",()=>{
    const fresh=window.ZAuth.touchSession?.();
    if(fresh){
      Object.assign(session,fresh);
      updateSessionView();
      window.ZUI?.toast("Session refreshed","Phiên hoạt động đã được cập nhật.","success");
    }else{
      window.ZAuth.logout();
    }
  });

  ["#prefMotion","#prefToast","#prefCompact"].forEach(selector=>{
    $(selector)?.addEventListener("change",savePrefs);
  });

  const progressBar=$("#profileProgressBar");
  const progressText=$("#profileProgressText");
  const completeness=[user.name,user.email,user.createdAt,user.lastLogin].filter(Boolean).length;
  const percentage=Math.round((completeness/4)*100);
  if(progressBar)progressBar.style.width=Math.max(25,percentage)+"%";
  if(progressText)progressText.textContent=Math.max(25,percentage)+"%";

  const observeVisibility=()=>{
    document.querySelectorAll(".account-grid .panel").forEach((panel,index)=>{
      panel.style.setProperty("--account-delay",Math.min(index*70,280)+"ms");
      panel.dataset.zuiReveal=panel.dataset.zuiReveal||"up";
    });
  };
  observeVisibility();
})();