(() => {
  "use strict";

  const USERS_KEY="zhosting_users_v1";
  const SESSION_KEY="zhosting_session_v1";
  const TEMP_SESSION_KEY="zhosting_temp_session_v1";
  const GUARD_KEY="zhosting_login_guard_v1";
  const PBKDF2_ITERATIONS=600000;

  const getUsers=()=>{
    try{return JSON.parse(localStorage.getItem(USERS_KEY)||"[]")}catch{return[]}
  };
  const saveUsers=users=>localStorage.setItem(USERS_KEY,JSON.stringify(users));

  const getDeviceInfo=()=>{
    const ua=navigator.userAgent||"";
    const mobile=/Android|iPhone|iPad|iPod/i.test(ua);
    const browser=/Edg\//.test(ua)?"Edge":/Chrome\//.test(ua)?"Chrome":/Firefox\//.test(ua)?"Firefox":/Safari\//.test(ua)?"Safari":"Browser";
    return {device:mobile?"Mobile":"Desktop",browser};
  };

  const recordLogin=async user=>{
    const now=new Date().toISOString();
    const device=getDeviceInfo();
    user.lastLogin=now;
    user.loginCount=Number(user.loginCount||0)+1;
    user.loginHistory=Array.isArray(user.loginHistory)?user.loginHistory:[];
    user.loginHistory.unshift({
      id:crypto.randomUUID?.()||String(Date.now()),
      at:now,
      success:true,
      device:device.device,
      browser:device.browser
    });
    user.loginHistory=user.loginHistory.slice(0,30);
  };

  const getSession=()=>{
    try{
      const local=JSON.parse(localStorage.getItem(SESSION_KEY)||"null");
      const temporary=JSON.parse(sessionStorage.getItem(TEMP_SESSION_KEY)||"null");
      const session=local||temporary;
      if(!session)return null;

      const now=Date.now();
      const absoluteMax=8*60*60*1000;
      const idleMax=30*60*1000;
      if(!session.issuedAt||now-session.issuedAt>absoluteMax||now-(session.lastActivity||session.issuedAt)>idleMax){
        clearSession();
        return null;
      }
      return session;
    }catch{return null}
  };

  const touchSession=()=>{
    const session=getSession();
    if(!session)return null;
    session.lastActivity=Date.now();
    const value=JSON.stringify(session);
    if(localStorage.getItem(SESSION_KEY))localStorage.setItem(SESSION_KEY,value);
    else sessionStorage.setItem(TEMP_SESSION_KEY,value);
    return session;
  };

  const saveSession=(email,remember=true)=>{
    const value=JSON.stringify({
      id:crypto.randomUUID?.()||String(Date.now()),
      email,
      issuedAt:Date.now(),
      lastActivity:Date.now()
    });
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TEMP_SESSION_KEY);
    (remember?localStorage:sessionStorage).setItem(
      remember?SESSION_KEY:TEMP_SESSION_KEY,value
    );
  };

  const clearSession=()=>{
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TEMP_SESSION_KEY);
  };

  const bufferToBase64=buffer=>{
    let binary="";
    const bytes=new Uint8Array(buffer);
    for(let i=0;i<bytes.byteLength;i+=1)binary+=String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const base64ToBuffer=value=>{
    const binary=atob(value);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i+=1)bytes[i]=binary.charCodeAt(i);
    return bytes;
  };

  const derivePasswordHash=async(password,saltBytes,iterations=PBKDF2_ITERATIONS)=>{
    const material=await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      {name:"PBKDF2"},
      false,
      ["deriveBits"]
    );
    const bits=await crypto.subtle.deriveBits(
      {
        name:"PBKDF2",
        salt:saltBytes,
        iterations,
        hash:"SHA-256"
      },
      material,
      256
    );
    return bufferToBase64(bits);
  };

  const createPasswordRecord=async password=>{
    const salt=crypto.getRandomValues(new Uint8Array(16));
    return {
      algorithm:"PBKDF2-SHA256",
      iterations:PBKDF2_ITERATIONS,
      salt:bufferToBase64(salt),
      hash:await derivePasswordHash(password,salt)
    };
  };

  const verifyPassword=async(password,user)=>{
    if(user.password?.hash&&user.password?.salt){
      const salt=base64ToBuffer(user.password.salt);
      const hash=await derivePasswordHash(
        password,
        salt,
        Number(user.password.iterations)||PBKDF2_ITERATIONS
      );
      return hash===user.password.hash;
    }

    // Legacy SHA-256 migration for accounts created by the previous demo.
    if(user.passwordHash){
      const oldData=new TextEncoder().encode(password);
      const oldBuffer=await crypto.subtle.digest("SHA-256",oldData);
      const oldHash=[...new Uint8Array(oldBuffer)]
        .map(b=>b.toString(16).padStart(2,"0")).join("");
      return oldHash===user.passwordHash;
    }

    return false;
  };

  const setMessage=(id,text,type="")=>{
    const element=document.getElementById(id);
    if(!element)return;
    element.textContent=text;
    element.className="form-note "+type;
  };

  const setBusy=(form,busy,label="Đang xử lý")=>{
    const button=form?.querySelector('button[type="submit"]');
    if(!button)return;
    button.disabled=busy;
    if(busy){
      button.dataset.originalText=button.textContent||"";
      button.replaceChildren();
      button.append(document.createTextNode(label+" "));
      const spinner=document.createElement("span");spinner.className="login-spinner";button.appendChild(spinner);
    }else if(button.dataset.originalText){
      button.replaceChildren(document.createTextNode(button.dataset.originalText));
    }
  };

  const getGuard=()=>{
    try{return JSON.parse(sessionStorage.getItem(GUARD_KEY)||'{"fails":0,"lockedUntil":0}')}catch{return{fails:0,lockedUntil:0}}
  };
  const setGuard=guard=>sessionStorage.setItem(GUARD_KEY,JSON.stringify(guard));
  const resetGuard=()=>sessionStorage.removeItem(GUARD_KEY);

  const checkLoginGuard=()=>{
    const guard=getGuard();
    if(guard.lockedUntil>Date.now()){
      return Math.ceil((guard.lockedUntil-Date.now())/1000);
    }
    if(guard.lockedUntil)resetGuard();
    return 0;
  };

  const registerFailure=()=>{
    const guard=getGuard();
    guard.fails+=1;
    if(guard.fails>=5){
      guard.lockedUntil=Date.now()+30000;
      guard.fails=0;
    }
    setGuard(guard);
  };

  const focusInvalid=form=>{
    const invalid=form?.querySelector(":invalid");
    invalid?.focus();
    invalid?.animate(
      [
        {transform:"translateX(0)"},
        {transform:"translateX(-4px)"},
        {transform:"translateX(4px)"},
        {transform:"translateX(0)"}
      ],
      {duration:240,easing:"ease-out"}
    );
  };

  const registerForm=document.querySelector("#registerForm");
  registerForm?.addEventListener("submit",async event=>{
    event.preventDefault();

    const name=document.querySelector("#registerName")?.value.trim()||"";
    const email=document.querySelector("#registerEmail")?.value.trim().toLowerCase()||"";
    const password=document.querySelector("#registerPassword")?.value||"";
    const confirm=document.querySelector("#registerConfirm")?.value||"";

    if(name.length<2)return setMessage("registerMessage","Họ và tên cần có ít nhất 2 ký tự.","error");
    if(!/^\S+@\S+\.\S+$/.test(email))return setMessage("registerMessage","Email chưa đúng định dạng.","error");
    if(password.length<8)return setMessage("registerMessage","Mật khẩu cần ít nhất 8 ký tự.","error");
    if(password!==confirm)return setMessage("registerMessage","Mật khẩu xác nhận chưa khớp.","error");
    if(getUsers().some(user=>user.email===email))return setMessage("registerMessage","Email này đã được đăng ký.","error");

    setBusy(registerForm,true,"Đang tạo tài khoản");
    try{
      const users=getUsers();
      const passwordRecord=await createPasswordRecord(password);
      users.push({
        id:crypto.randomUUID?.()||String(Date.now()),
        name,email,password:passwordRecord,
        createdAt:new Date().toISOString(),
        lastLogin:null,
        role:users.length===0?"admin":"user",
        status:"active",
        loginCount:0,
        loginHistory:[]
      });
      saveUsers(users);
      saveSession(email,true);
      setMessage("registerMessage","Tài khoản đã được tạo. Đang mở Control Center...","success");
      window.ZUI?.toast("Đăng ký thành công","Tài khoản ZHosting đã sẵn sàng.","success");
      setTimeout(()=>location.href="../dashboard/index.html",520);
    }catch(error){
      console.error(error);
      setBusy(registerForm,false);
      setMessage("registerMessage","Không thể tạo tài khoản trên trình duyệt này.","error");
    }
  });

  const loginForm=document.querySelector("#loginForm");
  loginForm?.addEventListener("submit",async event=>{
    event.preventDefault();

    const lockSeconds=checkLoginGuard();
    if(lockSeconds>0){
      setMessage("loginMessage","Thử quá nhiều lần. Hãy đợi "+lockSeconds+" giây.","error");
      window.ZUI?.toast("Tạm khóa đăng nhập","Bảo vệ demo đang giới hạn thử lại.","error");
      return;
    }

    const email=document.querySelector("#loginEmail")?.value.trim().toLowerCase()||"";
    const password=document.querySelector("#loginPassword")?.value||"";
    const remember=!!document.querySelector("#rememberMe")?.checked;

    if(!/^\S+@\S+\.\S+$/.test(email)||!password){
      setMessage("loginMessage","Vui lòng nhập email và mật khẩu.","error");
      focusInvalid(loginForm);
      return;
    }

    setBusy(loginForm,true,"Đang xác thực");

    try{
      const users=getUsers();
      const user=users.find(item=>item.email===email);

      if(!user){
        registerFailure();
        setBusy(loginForm,false);
        setMessage("loginMessage","Email hoặc mật khẩu không đúng.","error");
        window.ZUI?.toast("Đăng nhập thất bại","Thông tin xác thực không chính xác.","error");
        return;
      }

      const valid=await verifyPassword(password,user);
      if(!valid){
        registerFailure();
        setBusy(loginForm,false);
        setMessage("loginMessage","Email hoặc mật khẩu không đúng.","error");
        window.ZUI?.toast("Đăng nhập thất bại","Thông tin xác thực không chính xác.","error");
        loginForm.classList.remove("auth-error");
        void loginForm.offsetWidth;
        loginForm.classList.add("auth-error");
        return;
      }

      if(user.status==="locked"){
        setBusy(loginForm,false);
        setMessage("loginMessage","Tài khoản đang bị khóa. Vui lòng liên hệ quản trị viên.","error");
        window.ZUI?.toast("Tài khoản bị khóa","Không thể đăng nhập tài khoản này.","error");
        return;
      }

      // Upgrade old SHA-256 demo accounts to salted PBKDF2 on successful login.
      if(user.passwordHash&&!user.password){
        user.password=await createPasswordRecord(password);
        delete user.passwordHash;
      }

      await recordLogin(user);
      saveUsers(users);
      saveSession(user.email,remember);
      resetGuard();

      setMessage("loginMessage","Đăng nhập thành công. Đang mở Control Center...","success");
      window.ZUI?.toast("Chào mừng trở lại",user.name||"Đăng nhập thành công.","success");
      setTimeout(()=>location.href="../dashboard/index.html",420);
    }catch(error){
      console.error(error);
      setBusy(loginForm,false);
      setMessage("loginMessage","Không thể xác thực lúc này. Hãy thử lại.","error");
    }
  });

  const changePassword=async(email,currentPassword,newPassword)=>{
    const users=getUsers();
    const target=users.find(item=>item.email===email);
    if(!target)return {ok:false,reason:"not-found"};
    const valid=await verifyPassword(currentPassword,target);
    if(!valid)return {ok:false,reason:"invalid-current"};
    if(typeof newPassword!=="string"||newPassword.length<8)return {ok:false,reason:"weak"};
    target.password=await createPasswordRecord(newPassword);
    delete target.passwordHash;
    saveUsers(users);
    return {ok:true};
  };

  window.ZAuth={
    USERS_KEY,
    SESSION_KEY,
    TEMP_SESSION_KEY,
    getUsers,
    saveUsers,
    getSession,
    touchSession,
    saveSession,
    clearSession,
    verifyPassword,
    changePassword,
    isAdmin:email=>{
      const target=getUsers().find(user=>user.email===email);
      return target?.role==="admin";
    },
    logout:()=>{
      clearSession();
      const path=location.pathname.includes("/dashboard/")?"../auth/login.html":
        location.pathname.includes("/auth/")?"login.html":"auth/login.html";
      location.href=path;
    }
  };
})();