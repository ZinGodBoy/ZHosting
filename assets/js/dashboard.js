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

  const syncAdminEntry=()=>{
    const link=document.querySelector("#adminCenterLink");
    if(!link)return;
    const isAdmin=user.role==="admin"&&user.status==="active";
    link.hidden=!isAdmin;
    if(isAdmin&&!link.dataset.bound){
      link.dataset.bound="1";
      link.addEventListener("click",()=>{ window.location.href="../admin/index.html"; });
    }
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
    const avatarNodes=["#dashAvatar","#profileAvatar","#menuAvatar"].map(selector=>$(selector)).filter(Boolean);
    avatarNodes.forEach(node=>{
      node.classList.remove("avatar-cyan","avatar-blue");
      if(user.avatarStyle==="cyan")node.classList.add("avatar-cyan");
      if(user.avatarStyle==="blue")node.classList.add("avatar-blue");
    });
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

  const syncAdminEntry=()=>{
    const link=$("#adminCenterLink");
    if(!link)return;
    link.hidden=user.role!=="admin";
    link.addEventListener("click",event=>{
      event.preventDefault();
      location.href="../admin/index.html";
    });
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

  syncAdminEntry();
  syncProfile();
  syncAdminEntry();
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
  const mailPill=$("#mailPill");
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
        if(mailPill)mailPill.textContent=unread?`${unread} mới`:"Đã đọc";
        window.ZUI?.toast("Đã đánh dấu","Thông báo đã được đọc.","success");
      });
      list.appendChild(item);
    });
    if(mailCount)mailCount.textContent=String(messages.length);
    if(mailPill)mailPill.textContent=`${messages.length} mới`;
  };
  renderMessages();

  $("#openInbox")?.addEventListener("click",()=>{
    $("#inbox")?.scrollIntoView({behavior:"smooth",block:"center"});
  });

  const passwordModal=$("#passwordModal");
  const openPasswordModal=()=>{
    passwordModal?.setAttribute("aria-hidden","false");
    $("#passwordForm")?.reset();
    $("#currentPassword")?.focus();
  };
  const closePasswordModal=()=>passwordModal?.setAttribute("aria-hidden","true");
  $("#quickPassword")?.addEventListener("click",openPasswordModal);
  $("#closePasswordModal")?.addEventListener("click",closePasswordModal);
  passwordModal?.addEventListener("click",event=>{if(event.target===passwordModal)closePasswordModal()});

  $("#passwordForm")?.addEventListener("submit",async event=>{
    event.preventDefault();
    const current=$("#currentPassword")?.value||"";
    const next=$("#newPassword")?.value||"";
    const confirm=$("#confirmPassword")?.value||"";
    const message=$("#passwordMessage");
    if(next.length<8){if(message){message.textContent="Mật khẩu mới cần ít nhất 8 ký tự.";message.className="form-note error";}return;}
    if(next!==confirm){if(message){message.textContent="Mật khẩu xác nhận chưa khớp.";message.className="form-note error";}return;}
    const result=await window.ZAuth?.changePassword?.(user.email,current,next);
    if(!result?.ok){
      const text=result?.reason==="invalid-current"?"Mật khẩu hiện tại không đúng.":"Không thể cập nhật mật khẩu.";
      if(message){message.textContent=text;message.className="form-note error";}
      return;
    }
    if(message){message.textContent="Đổi mật khẩu thành công.";message.className="form-note success";}
    updateSecurity();
    syncOverview();
    syncCommandCenter();
    window.ZUI?.toast("Bảo mật đã cập nhật","Mật khẩu mới đã được lưu an toàn.","success");
    setTimeout(closePasswordModal,700);
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

  $("#resetPrefs")?.addEventListener("click",()=>{
    localStorage.removeItem("zhosting_prefs_v1");
    syncPrefs();
    window.ZUI?.toast("Đã khôi phục","Tùy chọn đã trở về mặc định.","success");
  });

  $("#refreshAccount")?.addEventListener("click",()=>{
    const fresh=window.ZAuth?.touchSession?.();
    if(fresh){
      Object.assign(session,fresh);
      updateSessionView();
      renderActivity();
      syncProfile();
      window.ZUI?.toast("Account refreshed","Dữ liệu tài khoản và phiên đã được làm mới.","success");
    }
  });

  const progressBar=$("#profileProgressBar");
  const progressText=$("#profileProgressText");
  const completeness=[user.name,user.email,user.createdAt,user.lastLogin].filter(Boolean).length;
  const percentage=Math.round((completeness/4)*100);
  if(progressBar)progressBar.style.width=Math.max(25,percentage)+"%";
  if(progressText)progressText.textContent=Math.max(25,percentage)+"%";

  const renderActivity=()=>{
    const list=$("#activityList");
    if(!list)return;
    const items=[
      {label:"Đăng nhập tài khoản",meta:formatDate(user.lastLogin),status:"Success"},
      {label:"Phiên hiện tại được tạo",meta:formatDate(session.issuedAt),status:"Active"},
      {label:"Bảo mật mật khẩu",meta:"PBKDF2 protected",status:"Protected"},
      {label:"Thiết bị truy cập",meta:deviceName(),status:"Detected"}
    ];
    list.replaceChildren();
    items.forEach((item,index)=>{
      const row=document.createElement("div");
      row.className="activity-row";
      const marker=document.createElement("span");
      marker.className="activity-marker"+(index===0?" active":"");
      const content=document.createElement("div");
      const title=document.createElement("b"); title.textContent=item.label;
      const meta=document.createElement("small"); meta.textContent=item.meta;
      content.append(title,meta);
      const status=document.createElement("strong"); status.textContent=item.status;
      row.append(marker,content,status);
      list.appendChild(row);
    });
  };
  renderActivity();

  const openProfileFromQuick=()=>openModal();
  $("#quickEditProfile")?.addEventListener("click",openProfileFromQuick);
  $("#quickRefreshSession")?.addEventListener("click",()=>$("#refreshSession")?.click());

  $("#exportAccount")?.addEventListener("click",()=>{
    const safeUser={
      name:user.name||"",
      email:user.email||"",
      avatarStyle:user.avatarStyle||"initial",
      createdAt:user.createdAt||null,
      lastLogin:user.lastLogin||null
    };
    const payload={
      product:"ZHosting",
      exportedAt:new Date().toISOString(),
      account:safeUser,
      session:{
        type:localStorage.getItem(window.ZAuth.SESSION_KEY)?"persistent":"temporary",
        issuedAt:session.issuedAt||null,
        lastActivity:session.lastActivity||null,
        device:deviceName()
      }
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url; link.download="zhosting-account-data.json";
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    window.ZUI?.toast("Đã xuất dữ liệu","Bản sao tài khoản đã được tải xuống.","success");
  });

  ["#quickLogout","#dangerLogout"].forEach(selector=>{
    $(selector)?.addEventListener("click",()=>{
      window.ZAuth.logout();
    });
  });

  const observeVisibility=()=>{
    document.querySelectorAll(".account-grid .panel").forEach((panel,index)=>{
      panel.style.setProperty("--account-delay",Math.min(index*70,280)+"ms");
      panel.dataset.zuiReveal=panel.dataset.zuiReveal||"up";
    });
  };
  const syncCommandCenter=()=>{
    const health=Math.max(25,percentage);
    const passwordOk=Boolean(user.password?.hash&&user.password?.salt);
    const unread=list?.querySelectorAll(".mail-item.unread").length||0;
    set("#commandProfile",health+"%");
    set("#commandSecurityStatus",passwordOk?"GOOD":"REVIEW");
    set("#commandSecurityScore",passwordOk?"GOOD":"REVIEW");
    set("#commandInbox",unread);
    set("#commandSession","ACTIVE");
    set("#insightProfile",health+"%");
    set("#insightSecurity",passwordOk?"GOOD":"REVIEW");
    set("#insightSecurityText",passwordOk?"PBKDF2 protected":"Cần kiểm tra credential");
    set("#insightDevice",deviceName());
    set("#insightSessionTime",formatDate(session.lastActivity));
    set("#insightInbox",unread);
    const bar=$("#insightProfileBar");
    if(bar)bar.style.width=health+"%";
  };

  const syncOverview=()=>{
    const health=Math.max(25,percentage);
    set("#overviewHealth",health+"%");
    set("#overviewSession","1");
    set("#overviewSecurity",user.password?.hash&&user.password?.salt?"Good":"Review");
    const bar=$("#overviewHealthBar");
    if(bar)bar.style.width=health+"%";
  };
  syncOverview();
  syncCommandCenter();

  $("#commandEdit")?.addEventListener("click",openModal);
  $("#commandSecurity")?.addEventListener("click",()=>$("#security")?.scrollIntoView({behavior:"smooth",block:"center"}));
  $("#commandPassword")?.addEventListener("click",openPasswordModal);
  $("#toolCopyEmail")?.addEventListener("click",()=>$("#copyEmail")?.click());
  $("#toolExport")?.addEventListener("click",()=>$("#exportAccount")?.click());
  $("#toolRefresh")?.addEventListener("click",()=>$("#refreshAccount")?.click());

  $("#markAllRead")?.addEventListener("click",()=>{
    list?.querySelectorAll(".mail-item.unread").forEach(item=>item.classList.remove("unread"));
    list?.querySelectorAll(".mail-unread").forEach(dot=>dot.remove());
    if(mailCount)mailCount.textContent="0";
    if(mailPill)mailPill.textContent="Đã đọc";
    syncCommandCenter();
    window.ZUI?.toast("Inbox đã cập nhật","Tất cả thông báo đã được đánh dấu đã đọc.","success");
  });

  observeVisibility();
})();

/* Account Center polish v8: keeps existing auth/data logic and adds safe UI behavior. */
(function(){
  const center=document.getElementById("accountCenter");
  if(!center) return;
  const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const syncMotion=()=>{
    const motion=document.getElementById("prefMotion");
    document.body.classList.toggle("reduce-ui-motion",reduced || (motion && !motion.checked));
  };
  document.getElementById("prefMotion")?.addEventListener("change",syncMotion);
  syncMotion();

  // Prevent accidental horizontal overflow from long account values.
  document.querySelectorAll(".profile-grid b,.session-grid b").forEach(el=>{
    el.title=el.textContent.trim();
  });

  // Smooth anchor navigation inside the account center.
  document.querySelectorAll('a[href^="#"],button[data-scroll-target]').forEach(el=>{
    el.addEventListener("click",()=>{
      const id=el.getAttribute("data-scroll-target") || el.getAttribute("href")?.slice(1);
      if(!id) return;
      const target=document.getElementById(id);
      if(target) target.scrollIntoView({behavior:document.body.classList.contains("reduce-ui-motion")?"auto":"smooth",block:"start"});
    });
  });

  // Close account menu when clicking outside or pressing Escape.
  const menu=document.getElementById("accountMenu"), btn=document.getElementById("accountMenuBtn");
  const closeMenu=()=>{
    if(menu && !menu.hidden){menu.hidden=true;btn?.setAttribute("aria-expanded","false");}
  };
  document.addEventListener("click",e=>{
    if(menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape") closeMenu();});

  // Keep the header visually compact while scrolling.
  let ticking=false;
  const onScroll=()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      document.querySelector(".dash-header")?.classList.toggle("is-scrolled",window.scrollY>8);
      ticking=false;
    });
  };
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
})();

/* Account Center Navigator v15 */
(function(){
  const center=document.getElementById("accountCenter");
  if(!center)return;
  const $=s=>document.querySelector(s);
  const search=$("#accountSearch"), links=[...document.querySelectorAll("#workspaceLinks [data-target]")], empty=$("#searchEmpty");
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:document.body.classList.contains("reduce-ui-motion")?"auto":"smooth",block:"center"});
  links.forEach(btn=>btn.addEventListener("click",()=>scrollTo(btn.dataset.target)));
  const filter=()=>{
    const q=(search?.value||"").trim().toLowerCase();
    let visible=0;
    links.forEach(btn=>{
      const match=!q || btn.textContent.toLowerCase().includes(q);
      btn.hidden=!match;if(match)visible++;
    });
    if(empty)empty.hidden=visible!==0;
  };
  search?.addEventListener("input",filter);
  $("#clearAccountSearch")?.addEventListener("click",()=>{if(search){search.value="";search.focus();filter()}});
  $("#toolTop")?.addEventListener("click",()=>window.scrollTo({top:0,behavior:document.body.classList.contains("reduce-ui-motion")?"auto":"smooth"}));

  const palette=$("#commandPalette"), paletteInput=$("#paletteInput"), paletteResults=$("#paletteResults");
  const openPalette=()=>{palette?.setAttribute("aria-hidden","false");if(paletteInput){paletteInput.value="";paletteInput.focus()}};
  const closePalette=()=>palette?.setAttribute("aria-hidden","true");
  $("#openCommandPalette")?.addEventListener("click",openPalette);
  palette?.querySelector("[data-close-palette]")?.addEventListener("click",closePalette);
  document.addEventListener("keydown",event=>{
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();openPalette()}
    if(event.key==="Escape")closePalette();
  });
  const commands={
    profile:()=>scrollTo("profile"),
    security:()=>scrollTo("security"),
    password:()=>document.getElementById("commandPassword")?.click(),
    inbox:()=>scrollTo("inbox"),
    refresh:()=>document.getElementById("refreshSession")?.click(),
    export:()=>document.getElementById("exportAccount")?.click()
  };
  paletteResults?.querySelectorAll("[data-command]").forEach(btn=>btn.addEventListener("click",()=>{commands[btn.dataset.command]?.();closePalette()}));
  paletteInput?.addEventListener("input",()=>{
    const q=paletteInput.value.trim().toLowerCase();
    paletteResults?.querySelectorAll("[data-command]").forEach(btn=>btn.hidden=Boolean(q&&!btn.textContent.toLowerCase().includes(q)));
  });
})();
