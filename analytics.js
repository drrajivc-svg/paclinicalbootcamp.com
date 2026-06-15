/* ===================================================================
   PA Clinical Bootcamp — Analytics  (visits, clicks, gate attempts)
   PASTE YOUR TWO IDS BELOW. Until you do, nothing loads (no tracking).
   =================================================================== */
(function(){
  /* ============== PASTE YOUR IDS HERE ============== */
  var GA4_ID     = "G-XXXXXXXXXX";   /* Google Analytics 4 Measurement ID */
  var CLARITY_ID = "XXXXXXXXXX";     /* Microsoft Clarity project ID       */
  /* ================================================= */
  var path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  var map={"":"home","index.html":"home","pa-bootcamp-diagnostic.html":"question_bank","pa-bootcamp-ecg.html":"ecg","pa-cardio-bootcamp-syllabus.html":"syllabus_cardio","pa-pulm-bootcamp-syllabus.html":"syllabus_pulm","pa-gi-bootcamp-syllabus.html":"syllabus_gi","pa-id-bootcamp-syllabus.html":"syllabus_id","pa-neuro-bootcamp-syllabus.html":"syllabus_neuro"};
  window.PAGE_ID = map[path] || path.replace(/\.html$/,"");
  var GA_ON = GA4_ID.indexOf("XXXX")===-1, CL_ON = CLARITY_ID.indexOf("XXXX")===-1;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); } window.gtag = gtag;
  if(GA_ON){ var s=document.createElement("script"); s.async=true; s.src="https://www.googletagmanager.com/gtag/js?id="+GA4_ID; document.head.appendChild(s); gtag("js", new Date()); gtag("config", GA4_ID); }
  if(CL_ON){ (function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",CLARITY_ID); }
  window.track = function(name, params){ if(!name) return;
    params = params || {}; params.page_id = window.PAGE_ID;
    try{ if(GA_ON && window.gtag) gtag("event", name, params); }catch(e){}
    try{ if(CL_ON && window.clarity){ window.clarity("event", name); if(params.label) window.clarity("set", name, String(params.label)); } }catch(e){}
  };
  document.addEventListener("click", function(e){
    var a=e.target.closest && e.target.closest("a,button"); if(!a) return;
    var href=a.getAttribute("href")||""; var txt=(a.textContent||"").trim().replace(/\s+/g," ").slice(0,60);
    if(/-bootcamp-syllabus\.html/.test(href)) track("syllabus_click",{label:txt});
    else if(/pa-bootcamp-diagnostic\.html/.test(href)) track("question_bank_click",{label:txt});
    else if(/pa-bootcamp-ecg\.html/.test(href)) track("ecg_click",{label:txt});
    else if(a.classList&&a.classList.contains("nav-dd-btn")) track("curriculum_menu_open",{});
    else if(a.classList&&a.classList.contains("open-vlib")) track("vignette_library_click",{});
    else if(/#contact/.test(href) || /get in touch/i.test(txt)) track("contact_click",{label:txt});
  }, true);
  window.addEventListener("DOMContentLoaded", function(){
    if(document.body && document.body.classList.contains("slocked")) track("gate_viewed",{label:window.PAGE_ID});
  });
})();
