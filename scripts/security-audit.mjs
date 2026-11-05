import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const allowed = new Set([".html",".js",".mjs",".css"]);
const failures = [];
const warnings = [];

async function walk(dir){
  const entries = await readdir(dir,{withFileTypes:true});
  for(const entry of entries){
    if(entry.name==="node_modules" || entry.name===".git") continue;
    const full=join(dir,entry.name);
    if(entry.isDirectory()) await walk(full);
    else if(allowed.has(full.slice(full.lastIndexOf(".")))){
      const content=await readFile(full,"utf8");
      const relative=full.slice(root.length+1);
      if(/<script[^>]+onerror\s*=|<[^>]+\son\w+\s*=/.test(content)){
        failures.push(relative+": inline event handler detected");
      }
      if(/javascript\s*:/i.test(content)){
        failures.push(relative+": javascript: URL detected");
      }
      if(/\beval\s*\(|\bnew\s+Function\s*\(/.test(content)){
        failures.push(relative+": dynamic code execution pattern detected");
      }
      if(/document\.write\s*\(/.test(content)){
        failures.push(relative+": document.write detected");
      }
      if(/<script[^>]+src=["']https?:\/\//i.test(content)){
        failures.push(relative+": external script source detected");
      }
      if(/localStorage\.(setItem|getItem)\([^)]*(password|token|secret)/i.test(content)){
        warnings.push(relative+": review browser storage for secrets/credentials");
      }
    }
  }
}

await walk(root);

console.log("ZHosting security audit");
console.log("=======================");
console.log("Warnings:",warnings.length);
for(const warning of warnings)console.log("WARN",warning);

if(failures.length){
  console.error("Failures:",failures.length);
  for(const failure of failures)console.error("FAIL",failure);
  process.exit(1);
}

console.log("No blocking static-security findings.");
