/* ZHosting Admin Device Gate
 * Browser-local privileged-device binding.
 * This is a frontend safeguard for the current static demo.
 * Production authorization must still be enforced server-side.
 */
(()=>{"use strict";
const DB_NAME="zhosting_admin_device_v1";
const STORE="keys";
const KEY_ID="primary";
const USERS_KEY="zhosting_users_v1";

const openDb=()=>new Promise((resolve,reject)=>{
  if(!window.indexedDB)return reject(new Error("IndexedDB unavailable"));
  const req=indexedDB.open(DB_NAME,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE);};
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error||new Error("IndexedDB open failed"));
});

const dbGet=async key=>{
  const db=await openDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,"readonly"),store=tx.objectStore(STORE),req=store.get(key);
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
  });
};

const dbPut=async(key,value)=>{
  const db=await openDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,"readwrite");
    tx.objectStore(STORE).put(value,key);
    tx.oncomplete=()=>resolve(true);
    tx.onerror=()=>reject(tx.error);
  });
};

const toBase64=buffer=>{
  const bytes=new Uint8Array(buffer);
  let binary="";
  for(const byte of bytes)binary+=String.fromCharCode(byte);
  return btoa(binary);
};

const getKeyPair=async()=>{
  let pair=await dbGet(KEY_ID);
  if(pair?.privateKey&&pair?.publicKey)return pair;
  const generated=await crypto.subtle.generateKey(
    {name:"ECDSA",namedCurve:"P-256"},
    true,
    ["sign","verify"]
  );
  const privateRaw=await crypto.subtle.exportKey("pkcs8",generated.privateKey);
  const publicRaw=await crypto.subtle.exportKey("spki",generated.publicKey);
  const privateKey=await crypto.subtle.importKey(
    "pkcs8",privateRaw,{name:"ECDSA",namedCurve:"P-256"},false,["sign"]
  );
  const publicKey=await crypto.subtle.importKey(
    "spki",publicRaw,{name:"ECDSA",namedCurve:"P-256"},true,["verify"]
  );
  pair={privateKey,publicKey};
  await dbPut(KEY_ID,pair);
  return pair;
};

const publicKeyFingerprint=async publicKey=>{
  const raw=await crypto.subtle.exportKey("spki",publicKey);
  const digest=await crypto.subtle.digest("SHA-256",raw);
  return toBase64(digest);
};

const readUsers=()=>{
  try{
    const value=JSON.parse(localStorage.getItem(USERS_KEY)||"[]");
    return Array.isArray(value)?value:[];
  }catch{return[]}
};

const saveUsers=users=>{
  try{localStorage.setItem(USERS_KEY,JSON.stringify(users));return true}catch{return false}
};

const getCurrentUser=()=>{
  try{
    const session=window.ZAuth?.getSession?.();
    if(!session)return null;
    return readUsers().find(user=>user.email===session.email)||null;
  }catch{return null}
};

const enrollIfNeeded=async user=>{
  if(!user||user.role!=="admin")return false;
  const pair=await getKeyPair();
  const fingerprint=await publicKeyFingerprint(pair.publicKey);
  if(user.adminDevice?.fingerprint===fingerprint)return true;
  if(user.adminDevice?.fingerprint)return false;

  const users=readUsers();
  const target=users.find(item=>item.id===user.id);
  if(!target||target.role!=="admin")return false;
  target.adminDevice={
    version:1,
    algorithm:"ECDSA-P256-SHA256",
    fingerprint,
    enrolledAt:new Date().toISOString()
  };
  saveUsers(users);
  return true;
};

const isTrusted=async user=>{
  if(!user||user.role!=="admin"||!user.adminDevice?.fingerprint)return false;
  try{
    const pair=await getKeyPair();
    return (await publicKeyFingerprint(pair.publicKey))===user.adminDevice.fingerprint;
  }catch{return false}
};

const auditDenied=user=>{
  try{window.ZAuth?.recordAudit?.("admin_device_denied",{email:user?.email||undefined,reason:"untrusted-device"});}catch{}
};

window.ZAdminAccess={
  getCurrentUser,
  enrollIfNeeded,
  isTrusted,
  auditDenied
};
})();