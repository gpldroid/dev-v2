/\* STREAMING_CHUNK:Configuring root variables and global resets... */
/* ==========================================================================

1. GLOBAL RESET & CSS VARIABLES
   تحديد المتغيرات الأساسية وإعادة ضبط الهوامش لمنع التداخل بين العناصر
   ========================================================================== */
   :root {
   /* Color Palette \*/
   --primary-color: #0d6efd;
   --primary-hover: #0b5ed7;
   --secondary-color: #6c757d;
   --bg-main: #f8f9fa;
   --bg-card: #ffffff;
   --text-main: #212529;
   --text-muted: #6c757d;
   --border-color: #e9ecef;
   --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
   --shadow-md: 0 4px 12px rgba(0,0,0,0.08);

```
/* Dimensions & Spacing */
--header-height: 75px;
--footer-height: auto;
--max-width: 1200px;
--radius: 12px;
--gap-base: 1.5rem;

/* Z-index Hierarchy Scale - نظام طبقات دقيق لمنع تداخل القوائم والطبقات */
--z-back: -1;
--z-normal: 1;
--z-card: 10;
--z-dropdown: 100;
--z-sticky: 500;
--z-fixed: 1000;
--z-modal: 2000;
--z-tooltip: 3000;

```

}

/\* Base Reset with Box-Sizing Protection \*/
\*, \*::before, \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

html {
scroll-behavior: smooth;
scroll-padding-top: var(--header-height); /\* منع تداخل التمرير المباشر مع الهيدر الثابت \*/
font-size: 16px;
\-webkit-text-size-adjust: 100%;
}

body {
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
background-color: var(--bg-main);
color: var(--text-main);
line-height: 1.6;
direction: rtl; /\* دعم اللغة العربية */
text-align: right;
min-height: 100vh;
display: flex;
flex-direction: column;
overflow-x: hidden; /* منع التمرير الأفقي والانهيار \*/
}

/\* STREAMING_CHUNK:Styling main layout containers and dynamic spacing... */
/* ==========================================================================
2. MAIN LAYOUT & CONTAINER FIXES
حل تداخل الهيدر مع المحتوى الرئيسي وتنسيق الحاوية
========================================================================== \*/

/\* Main Container - يدفع المحتوى تلقائياً بمسافة آمنة عن الهيدر \*/
.main-wrapper, main {
flex: 1 0 auto;
width: 100%;
max-width: var(--max-width);
margin: 0 auto;
padding-top: calc(var(--header-height) + 1.5rem);
padding-bottom: 2.5rem;
padding-left: 1rem;
padding-right: 1rem;
position: relative;
z-index: var(--z-normal);
}

.container {
width: 100%;
max-width: var(--max-width);
margin-right: auto;
margin-left: auto;
padding-right: 1rem;
padding-left: 1rem;
}

/\* Clearfix traditional floats \*/
.clearfix::after {
content: "";
clear: both;
display: table;
}

/\* STREAMING_CHUNK:Refining header and navigation alignment... */
/* ==========================================================================
3. HEADER & NAVIGATION (PREVENTING OVERLAPS)
ضمان استقرار الهيدر والتأكد من عدم حجب المحتوى تحته
========================================================================== \*/

.site-header {
position: fixed;
top: 0;
right: 0;
left: 0;
height: var(--header-height);
background-color: rgba(255, 255, 255, 0.98);
backdrop-filter: blur(8px);
box-shadow: var(--shadow-sm);
z-index: var(--z-fixed);
display: flex;
align-items: center;
transition: background-color 0.3s ease, height 0.3s ease;
}

.header-container {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100%;
max-width: var(--max-width);
margin: 0 auto;
padding: 0 1rem;
gap: 1rem;
}

.brand-logo {
display: flex;
align-items: center;
gap: 0.75rem;
text-decoration: none;
color: var(--text-main);
font-weight: 700;
font-size: 1.25rem;
white-space: nowrap;
flex-shrink: 0; /\* منع انكماش الشعار وتداخله مع القائمة \*/
}

.brand-logo img {
max-height: 42px;
width: auto;
object-fit: contain;
}

.nav-menu {
display: flex;
align-items: center;
gap: 1rem;
list-style: none;
margin: 0;
padding: 0;
flex-wrap: wrap; /\* السماح بالتلفف لمنع الخروج عن الحدود \*/
}

.nav-link {
text-decoration: none;
color: var(--text-main);
font-weight: 500;
padding: 0.5rem 0.75rem;
border-radius: 6px;
white-space: nowrap;
transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover, .nav-link.active {
color: var(--primary-color);
background-color: rgba(13, 110, 253, 0.08);
}

/\* STREAMING_CHUNK:Structuring responsive grid and card components... */
/* ==========================================================================
4. GRID & CARDS (PREVENTING ITEM COLLISION)
استخدام Grid تلقائي محمي لمنع انكماش وتداخل البطاقات
========================================================================== \*/

.grid-layout {
display: grid;
/\* min(100%, 280px) تمنع فيضان الشبكة في الشاشات فائقة الصغر \*/
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
gap: var(--gap-base);
width: 100%;
margin-top: 1.5rem;
margin-bottom: 1.5rem;
align-items: stretch;
}

.card {
background-color: var(--bg-card);
border-radius: var(--radius);
padding: 1.5rem;
box-shadow: var(--shadow-sm);
border: 1px solid var(--border-color);
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
z-index: var(--z-card);
isolation: isolate; /\* إنشاء سياق تكديس مستقل يمنع تداخل العناصر الابن مع الخارج */
overflow: hidden;
word-break: break-word;
overflow-wrap: anywhere; /* حماية حتمية ضد فيضان النصوص الطويلة \*/
transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
transform: translateY(-3px);
box-shadow: var(--shadow-md);
}

.card-header {
margin-bottom: 1rem;
}

.card-title {
font-size: 1.25rem;
font-weight: 600;
margin-bottom: 0.5rem;
line-height: 1.4;
}

.card-body {
flex: 1 1 auto;
margin-bottom: 1rem;
min-width: 0; /\* إصلاح خطأ Flexbox الشهير الذي يسبب تداخل المحتوى \*/
}

.card-footer {
margin-top: auto;
padding-top: 1rem;
border-top: 1px solid var(--border-color);
display: flex;
align-items: center;
justify-content: space-between;
gap: 0.75rem;
flex-wrap: wrap; /\* السماح بتنظيم العناصر ذاتياً في حال ضيق المساحة \*/
}

/\* STREAMING_CHUNK:Fixing media elements and word wrapping... */
/* ==========================================================================
5. MEDIA & TYPOGRAPHY FIXES
ضبط أبعاد الوسائط والنصوص لمنع الفيضان والخروج من البطاقات
========================================================================== \*/

img, video, iframe, svg {
max-width: 100%;
height: auto;
display: block;
object-fit: cover;
}

h1, h2, h3, h4, h5, h6 {
line-height: 1.3;
margin-bottom: 0.75rem;
color: var(--text-main);
overflow-wrap: anywhere;
word-break: break-word;
}

p, span, a, li {
overflow-wrap: anywhere;
word-break: break-word;
}

p {
margin-bottom: 1rem;
}

p:last-child {
margin-bottom: 0;
}

/\* STREAMING_CHUNK:Setting up button and form input standards... */
/* ==========================================================================
6. BUTTONS & FORM INPUTS
ضمان محاذاة وتجاوب المدخلات والأزرار بدون تداخل
========================================================================== \*/

.btn {
display: inline-flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
padding: 0.6rem 1.25rem;
font-size: 1rem;
font-weight: 500;
border-radius: 8px;
border: 1px solid transparent;
cursor: pointer;
text-decoration: none;
transition: all 0.2s ease;
white-space: nowrap;
max-width: 100%;
flex-shrink: 0;
}

.btn-primary {
background-color: var(--primary-color);
color: #ffffff;
}

.btn-primary:hover {
background-color: var(--primary-hover);
}

.form-group {
margin-bottom: 1.25rem;
display: flex;
flex-direction: column;
gap: 0.5rem;
width: 100%;
}

.form-control {
width: 100%;
padding: 0.75rem 1rem;
font-size: 1rem;
border: 1px solid var(--border-color);
border-radius: 8px;
background-color: #ffffff;
box-sizing: border-box;
transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
outline: none;
border-color: var(--primary-color);
box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
}

/\* STREAMING_CHUNK:Fixing footer and bottom section alignment... */
/* ==========================================================================
7. FOOTER STYLING
ثبات الفوتر في أسفل الشاشة ودفع المحتوى بأمان
========================================================================== \*/

.site-footer {
background-color: #ffffff;
border-top: 1px solid var(--border-color);
padding: 2rem 1rem;
margin-top: auto;
position: relative;
z-index: var(--z-normal);
width: 100%;
}

.footer-container {
max-width: var(--max-width);
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
gap: 1.5rem;
}

/\* STREAMING_CHUNK:Applying mobile media queries and responsive adaptations... */
/* ==========================================================================
8. RESPONSIVE MEDIA QUERIES
تعديلات حاسمة للشاشات الصغيرة لتفتيت التداخلات
========================================================================== \*/

@media (max-width: 992px) {
:root {
\--header-height: 68px;
}
}

@media (max-width: 768px) {
:root {
\--header-height: 62px;
\--gap-base: 1rem;
}

```
.main-wrapper, main {
    padding-top: calc(var(--header-height) + 1rem);
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.header-container {
    flex-wrap: wrap;
    padding: 0.5rem 1rem;
}

.nav-menu {
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.25rem;
}

.nav-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
}

.grid-layout {
    grid-template-columns: 1fr; /* عرض عنصر واحد لمنع الانكماش الأفقي */
}

.footer-container {
    flex-direction: column;
    text-align: center;
    justify-content: center;
}

```

}