(() => {
  const users=JSON.parse(localStorage.getItem("zhosting_users_v1")||"[]");
  const session=JSON.parse(localStorage.getItem("zhosting_session_v1")||"null");
  const user=session && users.find(u=>u.email===session.email);
  if(!user){ location.replace("../auth/login.html"); return; }
  const first=(user.name||"Z").trim().charAt(0).toUpperCase();
  document.querySelector("#userName").textContent=(user.name||"bạn").split(" ").slice(-1)[0];
  document.querySelector("#userEmail").textContent=user.email;
  document.querySelector("#userAvatar").textContent=first;
  document.querySelector("#logoutBtn").addEventListener("click",()=>{localStorage.removeItem("zhosting_session_v1");location.replace("../index.html");});
  document.querySelector("#dashMenu").addEventListener("click",()=>document.querySelector("#sidebar").classList.toggle("open"));
  document.querySelectorAll(".side-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#sidebar").classList.remove("open")));
})();