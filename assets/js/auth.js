(() => {
  "use strict";

  const USERS_KEY="zhosting_users_v1";
  const SESSION_KEY="zhosting_session_v1";
  const TEMP_SESSION_KEY="zhosting_temp_session_v1";

  const getUsers=()=>{
    try{return JSON.parse(localStorage.getItem(USERS_KEY)||"[]")}catch{return[]}
  };
  const saveUsers=users=>localStorage.setItem(USERS_KEY,JSON.stringify(users));

  const getSession=()=>{
    try{
      return JSON.parse(
        localStorage.getItem(SESSION_KEY) ||
        sessionStorage.getItem(TEMP_SESSION_KEY) ||
        "null"
      );
    }catch{return null}
  };

  const saveSession=(email,remember=true)=>{
    const value=JSON.stringify({email,createdAt:Date.now()});
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

  const hash=async value=>{
    const data=new TextEncoder().encode(value);
    const buffer=await crypto.subtle.digest("SHA-256",data);
    return [...new Uint8Array(buffer)]
      .map(byte=>byte.toString(16).padStart(2,"0")).join("");
  };

  const getByEmail=email=>getUsers().find(user=>user.email===email);

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
      button.dataset.originalText=button.innerHTML;
      button.innerHTML=label+' <span class="login-spinner"></span>';
    }else if(button.dataset.originalText){
      button.innerHTML=button.dataset.originalText;
    }
  };

  const focusFirstInvalid=form=>{
    const invalid=form?.querySelector(":invalid");
    invalid?.focus();
    invalid?.animate(
      [{transform:"translateX(0)"},{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(0)"}],
      {duration:240,easing:"ease-out"}
    );
  };

  const validateRegister=()=>{
    const name=document.querySelector("#registerName")?.value.trim()||"";
    const email=document.querySelector("#registerEmail")?.value.trim().toLowerCase()||"";
    const password=document.querySelector("#registerPassword")?.value||"";
    const confirm=document.querySelector("#registerConfirm")?.value||"";
    if(name.length<2)return "Họ và tên cần có ít nhất 2 ký tự.";
    if(!/^\S+@\S+\.\S+$/.test(email))return "Email chưa đúng định dạng.";
    if(password.length<8)return "Mật khẩu cần ít nhất 8 ký tự.";
    if(password!==confirm)return "Mật khẩu xác nhận chưa khớp.";
    if(getByEmail(email))return "Email này đã được đăng ký.";
    return "";
  };

  const registerForm=document.querySelector("#registerForm");
  registerForm?.addEventListener("submit",async event=>{
    event.preventDefault();
    const error=validateRegister();
    if(error){
      setMessage("registerMessage",error,"error");
      focusFirstInvalid(registerForm);
      return;
    }

    setBusy(registerForm,true,"Đang tạo tài khoản");
    try{
      const name=document.querySelector("#registerName").value.trim();
      const email=document.querySelector("#registerEmail").value.trim().toLowerCase();
      const password=document.querySelector("#registerPassword").value;
      const users=getUsers();

      users.push({
        id:crypto.randomUUID?.()||String(Date.now()),
        name,email,
        passwordHash:await hash(password),
        createdAt:new Date().toISOString(),
        lastLogin:new Date().toISOString()
      });

      saveUsers(users);
      saveSession(email,true);
      setMessage("registerMessage","Tài khoản đã được tạo. Đang mở Control Center...","success");
      window.ZUI?.toast("Đăng ký thành công","Tài khoản ZHosting đã sẵn sàng.","success");
      setTimeout(()=>{location.href="../dashboard/index.html"},520);
    }catch(error){
      console.error(error);
      setMessage("registerMessage","Không thể tạo tài khoản trên trình duyệt này.","error");
      setBusy(registerForm,false);
    }
  });

  const loginForm=document.querySelector("#loginForm");
  loginForm?.addEventListener("submit",async event=>{
    event.preventDefault();

    const email=document.querySelector("#loginEmail")?.value.trim().toLowerCase()||"";
    const password=document.querySelector("#loginPassword")?.value||"";
    const remember=!!document.querySelector("#rememberMe")?.checked;

    if(!/^\S+@\S+\.\S+$/.test(email)||!password){
      setMessage("loginMessage","Vui lòng nhập email và mật khẩu.","error");
      focusFirstInvalid(loginForm);
      return;
    }

    const user=getByEmail(email);
    if(!user){
      setMessage("loginMessage","Không tìm thấy tài khoản. Hãy đăng ký trước.","error");
      window.ZUI?.toast("Đăng nhập thất bại","Tài khoản chưa tồn tại.","error");
      loginForm.classList.remove("auth-error");
      void loginForm.offsetWidth;
      loginForm.classList.add("auth-error");
      return;
    }

    setBusy(loginForm,true,"Đang xác thực");
    const passwordHash=await hash(password);

    if(passwordHash!==user.passwordHash){
      setBusy(loginForm,false);
      setMessage("loginMessage","Email hoặc mật khẩu không đúng.","error");
      window.ZUI?.toast("Sai thông tin","Email hoặc mật khẩu không chính xác.","error");
      loginForm.classList.remove("auth-error");
      void loginForm.offsetWidth;
      loginForm.classList.add("auth-error");
      return;
    }

    user.lastLogin=new Date().toISOString();
    saveUsers(getUsers().map(item=>item.email===user.email?user:item));
    saveSession(user.email,remember);

    setMessage("loginMessage","Đăng nhập thành công. Đang mở Control Center...","success");
    window.ZUI?.toast("Chào mừng trở lại",user.name||"Đăng nhập thành công.","success");
    setTimeout(()=>{location.href="../dashboard/index.html"},420);
  });

  document.querySelector("#passwordToggle")?.addEventListener("click",()=>{
    const input=document.querySelector("#loginPassword");
    const button=document.querySelector("#passwordToggle");
    if(!input||!button)return;
    const visible=input.type==="text";
    input.type=visible?"password":"text";
    button.textContent=visible?"◉":"○";
    button.setAttribute("aria-label",visible?"Hiện mật khẩu":"Ẩn mật khẩu");
    input.focus();
  });

  document.querySelector("#forgotLink")?.addEventListener("click",event=>{
    event.preventDefault();
    setMessage("loginMessage","Demo frontend: đặt lại mật khẩu cần backend và email service thật.","error");
    window.ZUI?.toast("Tính năng demo","Reset password chưa kết nối backend.","error");
  });

  ["#loginEmail","#loginPassword","#registerName","#registerEmail","#registerPassword","#registerConfirm"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("keydown",event=>{
      if(event.key==="Enter"){
        const form=event.target.form;
        if(form)form.requestSubmit();
      }
    });
  });

  document.querySelectorAll("input[type='password']").forEach(input=>{
    input.addEventListener("keydown",event=>{
      if(event.getModifierState?.("CapsLock")){
        input.closest("label")?.classList.add("caps-warning");
      }else{
        input.closest("label")?.classList.remove("caps-warning");
      }
    });
  });

  window.ZAuth={
    USERS_KEY,
    SESSION_KEY,
    TEMP_SESSION_KEY,
    getUsers,
    saveUsers,
    getSession,
    getByEmail,
    saveSession,
    clearSession,
    logout:()=>{
      clearSession();
      const path=location.pathname.includes("/dashboard/")?"../auth/login.html":
        location.pathname.includes("/auth/")?"login.html":"auth/login.html";
      location.href=path;
    }
  };
})();