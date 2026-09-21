(()=>{"use strict";
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const html=document.documentElement, theme=$("#themeBtn"), menu=$("#menuBtn"), mobile=$("#mobileNav");

const loadIcons=()=>{
  if(document.getElementById("fontawesome-css")) return;
  const l=document.createElement("link");
  l.id="fontawesome-css"; l.rel="stylesheet";
  l.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
  l.crossOrigin="anonymous"; document.head.appendChild(l);
};
if("requestIdleCallback" in window) requestIdleCallback(loadIcons,{timeout:2500});
else window.addEventListener("load",()=>setTimeout(loadIcons,1200),{once:true});

if(localStorage.getItem("theme")==="dark") html.classList.add("dark");
const syncTheme=()=>{
  if(!theme)return;
  const dark=html.classList.contains("dark");
  theme.innerHTML=dark?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
  theme.setAttribute("aria-pressed",String(dark));
  theme.setAttribute("aria-label",dark?"تفعيل المظهر الفاتح":"تفعيل المظهر الداكن");
};
syncTheme();
theme?.addEventListener("click",()=>{
  html.classList.toggle("dark");
  localStorage.setItem("theme",html.classList.contains("dark")?"dark":"light");
  syncTheme();
});

const setMenu=open=>{
  if(!menu||!mobile)return;
  mobile.classList.toggle("open",open);
  menu.setAttribute("aria-expanded",String(open));
  menu.setAttribute("aria-label",open?"إغلاق القائمة":"فتح القائمة");
  menu.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
};
menu?.addEventListener("click",e=>{e.stopPropagation();setMenu(!mobile.classList.contains("open"))});
document.addEventListener("click",e=>{
  if(mobile?.classList.contains("open")&&!mobile.contains(e.target)&&!menu?.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
mobile?.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});

const progress=$("#progress"), controls=document.createElement("div");
controls.className="scroll-controls";
controls.setAttribute("aria-label","أزرار التمرير");
controls.innerHTML='<button class="scroll-control" id="scrollTopBtn" type="button" aria-label="الانتقال إلى أعلى الصفحة" title="إلى الأعلى"><i class="fa-solid fa-chevron-up"></i></button><button class="scroll-control" id="scrollDownBtn" type="button" aria-label="الانتقال إلى أسفل الصفحة" title="إلى الأسفل"><i class="fa-solid fa-chevron-down"></i></button>';
document.body.appendChild(controls);
const topBtn=$("#scrollTopBtn"), downBtn=$("#scrollDownBtn");
let ticking=false;
const updateScrollUI=()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress)progress.style.width=(max>0?scrollY/max*100:0)+"%";
  controls.classList.toggle("visible",scrollY>220);
  ticking=false;
};
addEventListener("scroll",()=>{
  if(!ticking){requestAnimationFrame(updateScrollUI);ticking=true}
},{passive:true});
updateScrollUI();
topBtn?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
downBtn?.addEventListener("click",()=>scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"}));

$$(".faq-q").forEach(q=>q.addEventListener("click",()=>{
  const item=q.parentElement,open=item.classList.toggle("open"),icon=q.querySelector("i");
  q.setAttribute("aria-expanded",String(open));
  if(icon)icon.className=open?"fa-solid fa-minus":"fa-solid fa-plus";
}));

const form=$("#contactForm");
form?.addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("#name")?.value.trim()||"", s=$("#service")?.value||"", m=$("#message")?.value.trim()||"";
  const text=`مرحباً Larache Web Dev،%0Aالاسم: ${encodeURIComponent(n)}%0Aالخدمة: ${encodeURIComponent(s)}%0Aالتفاصيل: ${encodeURIComponent(m)}`;
  open(`https://wa.me/212783539816?text=${text}`,"_blank","noopener");
});
const year=$("#year"); if(year)year.textContent=new Date().getFullYear();
})();