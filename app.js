/* ============================================================
   INFITEX — shared site script
   ► EDIT YOUR CONTACT DETAILS IN ONE PLACE (CONFIG below).
     Then also do a Find & Replace across the .html files for
     the same placeholders (see SETUP_GUIDE.md, section 6).
   ============================================================ */
(function(){
  "use strict";

  /* ---- 1. YOUR DETAILS — change these ---- */
  var CONFIG = {
    whatsappNumber: "919000000000",          // intl format, no +, no spaces, no leading 0
    email:          "hello@infitexglobal.com"
  };

  var store={get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},
             set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}}};
  var html=document.documentElement;
  var $=function(id){return document.getElementById(id);};
  var prefersReduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 2. Theme ---- */
  var iconSun=$('iconSun'),iconMoon=$('iconMoon');
  function applyTheme(t){
    html.setAttribute('data-theme',t);
    if(iconSun)iconSun.style.display=t==='dark'?'none':'block';
    if(iconMoon)iconMoon.style.display=t==='dark'?'block':'none';
    var mt=document.querySelector('meta[name="theme-color"]'); if(mt)mt.setAttribute('content',t==='dark'?'#0D1726':'#1C2E4F');
    store.set('infitex-theme',t);
  }
  var savedTheme=store.get('infitex-theme');
  if(!savedTheme){savedTheme=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';}
  applyTheme(savedTheme);
  function toggleTheme(){applyTheme(html.getAttribute('data-theme')==='dark'?'light':'dark');}
  if($('themeToggle'))$('themeToggle').addEventListener('click',toggleTheme);
  if($('themeBtn2'))$('themeBtn2').addEventListener('click',toggleTheme);

  /* ---- 3. Mobile menu ---- */
  var menuToggle=$('menuToggle'),navLinks=$('navLinks');
  if(menuToggle&&navLinks){
    menuToggle.addEventListener('click',function(){var o=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',o);});
    navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');});});
  }

  /* ---- 4. Accessibility panel ---- */
  var a11yPanel=$('a11yPanel'),a11yToggle=$('a11yToggle');
  function openA11y(o){if(a11yPanel){if(o)closePopovers();a11yPanel.classList.toggle('open',o);a11yToggle.setAttribute('aria-expanded',o);}}
  if(a11yToggle)a11yToggle.addEventListener('click',function(){openA11y(!a11yPanel.classList.contains('open'));});
  if($('a11yClose'))$('a11yClose').addEventListener('click',function(){openA11y(false);});

  /* Font scale */
  var fsIndex=parseInt(store.get('infitex-fs')||'0',10);
  function applyFs(){var map={'-1':0.92,'0':1,'1':1.1,'2':1.2};html.style.setProperty('--fs',map[String(fsIndex)]||1);store.set('infitex-fs',fsIndex);}
  applyFs();
  if($('fsPlus'))$('fsPlus').addEventListener('click',function(){if(fsIndex<2){fsIndex++;applyFs();}});
  if($('fsMinus'))$('fsMinus').addEventListener('click',function(){if(fsIndex>-1){fsIndex--;applyFs();}});
  if($('fsReset'))$('fsReset').addEventListener('click',function(){fsIndex=0;applyFs();});

  /* High contrast */
  var contrastBtn=$('contrastBtn');
  function applyContrast(on){html.setAttribute('data-contrast',on?'high':'normal');if(contrastBtn){contrastBtn.textContent=on?'On':'Off';contrastBtn.setAttribute('aria-pressed',on);}store.set('infitex-contrast',on?'high':'normal');}
  applyContrast(store.get('infitex-contrast')==='high');
  if(contrastBtn)contrastBtn.addEventListener('click',function(){applyContrast(html.getAttribute('data-contrast')!=='high');});

  /* Grayscale */
  var grayscaleBtn=$('grayscaleBtn');
  function applyGrayscale(on){html.setAttribute('data-grayscale',on?'on':'off');if(grayscaleBtn){grayscaleBtn.textContent=on?'On':'Off';grayscaleBtn.setAttribute('aria-pressed',on);}store.set('infitex-grayscale',on?'on':'off');}
  applyGrayscale(store.get('infitex-grayscale')==='on');
  if(grayscaleBtn)grayscaleBtn.addEventListener('click',function(){applyGrayscale(html.getAttribute('data-grayscale')!=='on');});

  /* ---- 5. Back to top ---- */
  var toTop=$('toTop');
  if(toTop){
    window.addEventListener('scroll',function(){toTop.classList.toggle('show',window.scrollY>600);},{passive:true});
    toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:prefersReduced?'auto':'smooth'});});
  }

  /* Year */
  if($('yr'))$('yr').textContent=new Date().getFullYear();

  /* ---- 6. Reveal on scroll ---- */
  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el){io.observe(el);});
  }else{reveals.forEach(function(el){el.classList.add('in');});}

  /* ---- 7. Lead popovers (WhatsApp + Email) ---- */
  var floatStack=document.querySelector('.float-stack');
  var waPop=$('waPop'),emPop=$('emPop');
  function closePopovers(){
    if(waPop)waPop.classList.remove('open');
    if(emPop)emPop.classList.remove('open');
    if(floatStack)floatStack.style.visibility='';
  }
  function openPopover(which){
    if(a11yPanel){a11yPanel.classList.remove('open');if(a11yToggle)a11yToggle.setAttribute('aria-expanded',false);}
    var target=which==='wa'?waPop:emPop, other=which==='wa'?emPop:waPop;
    if(other)other.classList.remove('open');
    if(target){
      var willOpen=!target.classList.contains('open');
      target.classList.toggle('open',willOpen);
      if(floatStack)floatStack.style.visibility=willOpen?'hidden':'';
      if(willOpen){var f=target.querySelector('input,select,textarea');if(f)setTimeout(function(){f.focus();},150);}
    }
  }
  function bindFab(id,which){var el=$(id);if(el)el.addEventListener('click',function(e){e.preventDefault();openPopover(which);});}
  bindFab('waFab','wa'); bindFab('emFab','em');
  if($('waClose'))$('waClose').addEventListener('click',closePopovers);
  if($('emClose'))$('emClose').addEventListener('click',closePopovers);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePopovers();});

  var EMAIL_RE=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var MOBILE_RE=/^\d{6,10}$/;
  var NAME_RE=/[A-Za-z\u00C0-\u024F]/;  /* must contain at least one letter */
  function fval(id){var el=$(id);return el?(el.value||'').trim():'';}
  /* restrict every mobile field to digits only, max 10 */
  ['waMobile','emMobile','cf-phone'].forEach(function(id){
    var el=$(id);
    if(el)el.addEventListener('input',function(){this.value=this.value.replace(/\D/g,'').slice(0,10);});
  });
  function readForm(prefix){
    return {
      name:fval(prefix+'Name'), email:fval(prefix+'Email'),
      cc:fval(prefix+'Cc')||'+61', mobile:fval(prefix+'Mobile'),
      company:fval(prefix+'Company'), interest:fval(prefix+'Interest'),
      message:fval(prefix+'Message')
    };
  }
  function leadError(d){
    if(!d.name)return 'Please enter the contact person name.';
    if(d.name.length<2||!NAME_RE.test(d.name))return 'Please enter a valid name (letters, at least 2 characters).';
    if(!EMAIL_RE.test(d.email))return 'Please enter a valid email address.';
    if(!MOBILE_RE.test(d.mobile))return 'Enter a valid mobile number (digits only, up to 10).';
    return '';
  }
  function showLeadErr(prefix,msg){var e=$(prefix+'Err');if(e){if(msg)e.textContent=msg;e.classList.toggle('show',!!msg);}}
  function buildLeadLines(d){
    var intro='This is '+d.name+(d.company?(', From '+d.company):'')+'. I would like to enquire about '+d.interest+'. My contact details are as below.';
    var L=['Hi Infitex Team,',intro,'Email : '+d.email,'Mobile : '+d.cc+' '+d.mobile];
    if(d.message){L.push('');L.push(d.message);}
    return L;
  }
  if($('waSend'))$('waSend').addEventListener('click',function(){
    var d=readForm('wa'),err=leadError(d);
    if(err){showLeadErr('wa',err);return;} showLeadErr('wa','');
    var text=buildLeadLines(d).join('\n');
    window.open('https://wa.me/'+CONFIG.whatsappNumber+'?text='+encodeURIComponent(text),'_blank','noopener'); closePopovers();
  });
  if($('emSend'))$('emSend').addEventListener('click',function(){
    var d=readForm('em'),err=leadError(d);
    if(err){showLeadErr('em',err);return;} showLeadErr('em','');
    var subject='Enquiry from '+d.name+(d.company?(' \u2014 '+d.company):'');
    var body=buildLeadLines(d).join('\r\n');
    window.location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    closePopovers();
  });

  /* ---- 8. Main contact form (Web3Forms) ---- */
  var WEB3FORMS_KEY="YOUR_WEB3FORMS_ACCESS_KEY";
  function showMsg(el,type,text){if(el){el.className='form-msg '+type;el.textContent=text;}}
  var form=$('contactForm'),formMsg=$('formMsg');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name=fval('cf-name'),email=fval('cf-email'),cc=fval('cf-cc')||'+61',phone=fval('cf-phone'),
          company=fval('cf-company'),interest=fval('cf-interest'),msg=fval('cf-msg');
      if(!name){showMsg(formMsg,'err','Please enter the contact person name.');return;}
      if(name.length<2||!NAME_RE.test(name)){showMsg(formMsg,'err','Please enter a valid name (letters, at least 2 characters).');return;}
      if(!EMAIL_RE.test(email)){showMsg(formMsg,'err','Please enter a valid email address.');return;}
      if(!MOBILE_RE.test(phone)){showMsg(formMsg,'err','Enter a valid mobile number (digits only, up to 10).');return;}
      if(fval('cf-website')){form.reset();showMsg(formMsg,'ok','Thanks! Your message has been received.');return;} /* honeypot: silently drop bots */
      if(!msg){showMsg(formMsg,'err','Please add a short message.');return;}
      if(msg.length<10){showMsg(formMsg,'err','Please add a little more detail — at least 10 characters.');return;}
      if(WEB3FORMS_KEY==="YOUR_WEB3FORMS_ACCESS_KEY"){
        showMsg(formMsg,'ok','Thanks '+name.split(' ')[0]+'! (Demo mode — add your free Web3Forms key in app.js to receive these by email.)');form.reset();return;
      }
      var btn=form.querySelector('button[type=submit]');btn.disabled=true;var label=btn.innerHTML;btn.textContent='Sending…';
      var data={access_key:WEB3FORMS_KEY,subject:'New enquiry — INFITEX website',name:name,email:email,
        mobile:cc+' '+phone,company:company,interest:interest,message:msg};
      fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json();}).then(function(res){
        if(res.success){showMsg(formMsg,'ok','Thanks '+name.split(' ')[0]+'! Your message has been sent — we\'ll reply within one business day.');form.reset();}
        else{showMsg(formMsg,'err','Something went wrong. Please email us directly at '+CONFIG.email);}
      }).catch(function(){showMsg(formMsg,'err','Network error. Please email us directly at '+CONFIG.email);})
      .finally(function(){btn.disabled=false;btn.innerHTML=label;});
    });
  }

  /* ---- 9. Subscribe (digests) ---- */
  var subForm=$('subForm'),subMsg=$('subMsg');
  if(subForm){
    subForm.addEventListener('submit',function(e){
      e.preventDefault();
      var email=(subForm.email.value||'').trim(),freq=subForm.frequency?subForm.frequency.value:'Weekly';
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){if(subMsg){subMsg.className='sub-msg err';subMsg.textContent='Please enter a valid email address.';}return;}
      if(WEB3FORMS_KEY==="YOUR_WEB3FORMS_ACCESS_KEY"){
        if(subMsg){subMsg.className='sub-msg ok';subMsg.textContent='Subscribed for '+freq.toLowerCase()+' digests! (Demo mode — add your Web3Forms key to collect these.)';}subForm.reset();return;
      }
      var btn=subForm.querySelector('button[type=submit]');btn.disabled=true;
      fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:'New digest subscriber — INFITEX',type:'Newsletter subscription',email:email,frequency:freq})})
      .then(function(r){return r.json();}).then(function(res){
        if(subMsg){if(res.success){subMsg.className='sub-msg ok';subMsg.textContent='You\'re in! Confirmation will follow by email.';subForm.reset();}
          else{subMsg.className='sub-msg err';subMsg.textContent='Could not subscribe. Please try again.';}}
      }).catch(function(){if(subMsg){subMsg.className='sub-msg err';subMsg.textContent='Network error. Please try again.';}})
      .finally(function(){btn.disabled=false;});
    });
  }
  /* ---- 10. Indicative savings calculator ---- */
  var calcRate=$('calcRate'),calcHours=$('calcHours'),calcPct=$('calcPct'),calcOut=$('calcOut'),calcPctLabel=$('calcPctLabel');
  function recalc(){
    if(!calcRate||!calcHours||!calcPct||!calcOut)return;
    var rate=parseFloat(calcRate.value)||0, hours=parseFloat(calcHours.value)||0, pct=parseFloat(calcPct.value)||0;
    if(calcPctLabel)calcPctLabel.textContent=pct+'%';
    var monthly=rate*hours*4.33*(pct/100);
    calcOut.textContent='A$'+Math.round(monthly).toLocaleString('en-AU');
  }
  [calcRate,calcHours,calcPct].forEach(function(el){if(el)el.addEventListener('input',recalc);});
  recalc();

  /* ---- 11. Section scroller (home quick-jump) ---- */
  var scroller=document.querySelector('.section-scroller');
  if(scroller){
    var ssInner=scroller.querySelector('.ss-inner');
    var ssLinks=[].slice.call(scroller.querySelectorAll('a'));
    var ssMap={};
    ssLinks.forEach(function(a){var id=a.getAttribute('href').slice(1);if(document.getElementById(id))ssMap[id]=a;});
    function ssActivate(id){
      ssLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href').slice(1)===id);});
      var a=ssMap[id];
      if(a&&ssInner){var t=a.offsetLeft-(ssInner.clientWidth/2)+(a.clientWidth/2);ssInner.scrollTo({left:Math.max(0,t),behavior:'smooth'});}
    }
    if('IntersectionObserver' in window){
      var ssObs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)ssActivate(e.target.id);});},{rootMargin:'-45% 0px -50% 0px',threshold:0});
      Object.keys(ssMap).forEach(function(id){ssObs.observe(document.getElementById(id));});
    }
  }

  /* ---- 12. Site search ---- */
  var SEARCH_INDEX=[
    /* Pages */
    {t:"Home — INFITEX Global Advisory",u:"index.html",g:"Page",k:"home overview white-label outsourcing accounting bookkeeping australia digitech back office digital presence"},
    {t:"Outsourcing — full scope & services",u:"outsourcing.html",g:"Page",k:"outsourcing scope services bookkeeping bas ias tax smsf financials payroll turnaround recurring jobs engagement"},
    {t:"Digitech — websites, hosting & SEO",u:"digitech.html",g:"Page",k:"digitech website design domain hosting seo google business profile email maintenance online presence"},
    {t:"Privacy Policy",u:"privacy.html",g:"Page",k:"privacy policy data protection personal information cross border app8"},
    {t:"Terms & Conditions",u:"terms.html",g:"Page",k:"terms conditions agreement legal liability"},
    {t:"Sitemap",u:"sitemap.html",g:"Page",k:"sitemap site map pages sections index"},
    /* Home sections */
    {t:"Pick the help you need — our two divisions",u:"index.html#divisions",g:"Section",k:"divisions outsourcing digitech choose services"},
    {t:"How it works",u:"index.html#how",g:"Section",k:"how it works process onboarding workflow slot into your practice"},
    {t:"Engagement models",u:"index.html#models",g:"Section",k:"engagement models dedicated staff per job ad hoc flexible pricing pilot"},
    {t:"The full Australian compliance cycle",u:"index.html#outsourcing-overview",g:"Section",k:"compliance cycle bas tax financials lodgement australia"},
    {t:"Security — your clients' data stays protected",u:"index.html#security",g:"Section",k:"security data protection role based access confidentiality iso 27001 roadmap traceable"},
    {t:"Get found, look professional, stay online",u:"index.html#digitech-overview",g:"Section",k:"digitech website seo hosting domain google business profile"},
    {t:"Indicative savings calculator",u:"index.html#savings",g:"Section",k:"savings calculator cost estimate how much save hourly rate"},
    {t:"About — a dependable extension of your team",u:"index.html#about",g:"Section",k:"about who we are native to your stack team extension dependable"},
    {t:"Key Australian compliance dates",u:"index.html#calendar",g:"Section",k:"key dates compliance calendar deadlines bas lodgement ato reminders"},
    {t:"Start with a low-risk pilot",u:"index.html#pilot",g:"Section",k:"pilot trial low risk no lock in test quality batch"},
    {t:"Contact us",u:"index.html#contact",g:"Section",k:"contact get in touch enquiry email whatsapp phone quote pricing"},
    {t:"Subscribe — compliance digests",u:"index.html#subscribe",g:"Section",k:"subscribe newsletter digest daily weekly monthly reminders updates"},
    /* Services */
    {t:"Bookkeeping & reconciliations",u:"outsourcing.html",g:"Service",k:"bookkeeping reconciliation bank rec data entry xero myob quickbooks"},
    {t:"BAS / IAS preparation",u:"outsourcing.html",g:"Service",k:"bas ias business activity statement gst preparation lodgement quarterly monthly"},
    {t:"Payroll & STP",u:"outsourcing.html",g:"Service",k:"payroll stp single touch payroll superannuation wages pay run"},
    {t:"Tax returns — company, trust, individual",u:"outsourcing.html",g:"Service",k:"tax return company trust individual partnership sole trader income tax"},
    {t:"SMSF annual accounts",u:"outsourcing.html",g:"Service",k:"smsf self managed super fund annual accounts bgl class audit support"},
    {t:"Year-end financials (EOFY)",u:"outsourcing.html",g:"Service",k:"financials year end eofy workpapers reports statements"},
    {t:"Website design & build",u:"digitech.html",g:"Service",k:"website design build webflow wordpress landing page responsive"},
    {t:"Domains, hosting & email",u:"digitech.html",g:"Service",k:"domain hosting email dns cloudflare netlify setup management"},
    {t:"SEO & Google Business Profile",u:"digitech.html",g:"Service",k:"seo search engine optimisation google business profile local visibility ranking"}
  ];
  /* FAQ entries (kept in sync with the home FAQ list; searchable site-wide) */
  var FAQ_INDEX=[
    ["faq-clients","Do you contact our clients?","No. We work entirely behind the scenes as a white-label team — every client conversation and sign-off stays with your practice."],
    ["faq-registered","Are you a registered Australian tax or BAS agent?","No, and we don't give tax advice to your clients. Your practice remains the registered tax/BAS agent and keeps full sign-off."],
    ["faq-signoff","Who is responsible for lodgement and sign-off?","Your practice. You review every job, you lodge, and you keep the client relationship. We never act as the agent of record."],
    ["faq-tasks","What accounting and bookkeeping tasks can you take on?","Bookkeeping, AP/AR, payroll and STP, BAS/IAS, year-end financials, company and trust tax returns, SMSF accounts and workpapers."],
    ["faq-software","Which software do you work in?","Natively in XPM, Xero and FYI Docs, plus MYOB, QuickBooks, Reckon, Dext, Hubdoc, BGL/Class and Karbon."],
    ["faq-security","How do you keep our clients' data secure?","Role-based access, named individuals, confidentiality agreements and careful data-handling aligned to your firm's security policy."],
    ["faq-review","How does your maker–checker review work?","Every job runs through a preparer and a senior reviewer before it reaches you — consistent quality, fewer review points."],
    ["faq-turnaround","How quickly can you turn work around?","Turnaround is agreed up front to fit your lodgement calendar — recurring jobs on a set rhythm, one-off work to your deadlines."],
    ["faq-pilot","Can we start with a small pilot or trial?","Yes — a low-risk pilot on a small batch, no setup fees and no long lock-in, so you can prove the quality before committing."],
    ["faq-contract","Do we have to sign a long-term contract?","No long lock-in. Scale up or down, switch engagement models, or pause as your practice's needs change."],
    ["faq-timezone","How do you handle the India–Australia time-zone difference?","We progress work through your evening so it's ready when your team logs on, and align hours where you need live overlap."],
    ["faq-pricing","How does pricing work?","Pricing depends on work type, volume and turnaround. No published rates — contact us for the best pricing for your practice."],
    ["faq-digitech","Can you also build our website and handle SEO?","Yes — our Digitech division manages domains, websites, hosting, email, Google Business Profile and search visibility."]
  ];
  FAQ_INDEX.forEach(function(f){SEARCH_INDEX.push({t:f[1],u:"index.html#"+f[0],g:"FAQ",k:f[2],snip:f[2]});});

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function highlight(text,terms){
    var out=esc(text);
    terms.forEach(function(t){
      if(t.length<2)return;
      var re=new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');
      out=out.replace(re,'<mark>$1</mark>');
    });
    return out;
  }
  function scoreEntry(e,terms){
    var title=e.t.toLowerCase(), keys=(e.k||'').toLowerCase(), hay=title+' '+keys, hit=0, all=true;
    terms.forEach(function(t){
      var inTitle=title.indexOf(t)>-1, inKeys=keys.indexOf(t)>-1;
      if(!inTitle&&!inKeys){all=false;return;}
      if(inTitle)hit+=title.indexOf(t)===0?6:4;
      if(inKeys)hit+=2;
    });
    if(!all)hit=hit*0.25;            /* partial (OR) matches rank far lower */
    if(e.g==='Page')hit+=0.5;        /* gentle nudge so canonical pages surface */
    return hit;
  }
  function runSearch(q){
    var terms=q.toLowerCase().split(/\s+/).filter(function(w){return w.length>0;});
    if(!terms.length)return [];
    var scored=[];
    SEARCH_INDEX.forEach(function(e){var s=scoreEntry(e,terms);if(s>0)scored.push({e:e,s:s});});
    scored.sort(function(a,b){return b.s-a.s;});
    return scored.slice(0,8).map(function(x){return x.e;});
  }

  var sOverlay=$('searchOverlay'),sInput=$('searchInput'),sResults=$('searchResults'),
      sToggle=$('searchToggle'),sClear=$('searchClear');
  var sActiveIdx=-1, sCurrent=[];
  function tagClass(g){return g==='FAQ'?'sr-faq':(g==='Service'?'sr-svc':'');}
  function renderResults(list,terms){
    sCurrent=list; sActiveIdx=-1;
    if(!list.length){
      sResults.innerHTML='<div class="search-empty">No matches for that search.<span>Try “BAS”, “SMSF”, “pricing”, “security” or “website”.</span></div>';
      return;
    }
    var order=['Page','Section','Service','FAQ'],label={Page:'Pages',Section:'Sections',Service:'Services',FAQ:'FAQs'};
    var html='', idx=0; sCurrent=[];
    order.forEach(function(g){
      var grp=list.filter(function(e){return e.g===g;});
      if(!grp.length)return;
      html+='<div class="sr-group">'+label[g]+'</div>';
      grp.forEach(function(e){
        sCurrent.push(e);
        var snip=e.snip||e.k||'';
        html+='<a class="sr-item" role="option" data-idx="'+idx+'" href="'+e.u+'">'+
          '<span class="sr-title">'+(g!=='Page'?'<span class="sr-tag '+tagClass(g)+'">'+g+'</span>':'')+
          '<span>'+highlight(e.t,terms)+'</span></span>'+
          (snip?'<span class="sr-snippet">'+highlight(snip.slice(0,150),terms)+'</span>':'')+'</a>';
        idx++;
      });
    });
    sResults.innerHTML=html;
  }
  function defaultResults(){
    var picks=SEARCH_INDEX.filter(function(e){return e.g==='Page'||e.u.indexOf('#faq-')>-1;}).slice(0,7);
    sCurrent=picks; sActiveIdx=-1;
    var html='<div class="sr-group">Popular</div>', idx=0;
    picks.forEach(function(e){
      html+='<a class="sr-item" role="option" data-idx="'+idx+'" href="'+e.u+'">'+
        '<span class="sr-title">'+(e.g!=='Page'?'<span class="sr-tag '+tagClass(e.g)+'">'+e.g+'</span>':'')+'<span>'+esc(e.t)+'</span></span>'+
        (e.snip?'<span class="sr-snippet">'+esc(e.snip.slice(0,150))+'</span>':'')+'</a>'; idx++;
    });
    sResults.innerHTML=html;
  }
  var sDebounce;
  function onSearchInput(){
    var q=sInput.value.trim();
    if(sClear)sClear.classList.toggle('show',q.length>0);
    clearTimeout(sDebounce);
    sDebounce=setTimeout(function(){
      if(!q){defaultResults();return;}
      var terms=q.toLowerCase().split(/\s+/).filter(Boolean);
      renderResults(runSearch(q),terms);
    },120);
  }
  function openSearch(prefill){
    if(!sOverlay)return; if(typeof closePopovers==='function')closePopovers(); if(a11yPanel)a11yPanel.classList.remove('open');
    sOverlay.classList.add('open');
    if(prefill!=null){sInput.value=prefill;}
    if(sInput.value.trim()){onSearchInput();}else{defaultResults();}
    setTimeout(function(){sInput.focus();},60);
  }
  function closeSearch(){if(sOverlay)sOverlay.classList.remove('open');}
  function setActive(i){
    var items=sResults.querySelectorAll('.sr-item');
    if(!items.length)return;
    sActiveIdx=(i+items.length)%items.length;
    items.forEach(function(el,n){el.classList.toggle('active',n===sActiveIdx);});
    var act=items[sActiveIdx]; if(act)act.scrollIntoView({block:'nearest'});
  }
  if(sToggle)sToggle.addEventListener('click',function(){openSearch();});
  if(sInput)sInput.addEventListener('input',onSearchInput);
  if(sClear)sClear.addEventListener('click',function(){sInput.value='';sClear.classList.remove('show');defaultResults();sInput.focus();});
  if(sOverlay)sOverlay.addEventListener('click',function(e){if(e.target===sOverlay)closeSearch();});
  if(sResults)sResults.addEventListener('mousemove',function(e){
    var a=e.target.closest&&e.target.closest('.sr-item'); if(a){var i=parseInt(a.getAttribute('data-idx'),10);if(!isNaN(i))setActive(i);}
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='/'&&sOverlay&&!sOverlay.classList.contains('open')){
      var tag=(document.activeElement&&document.activeElement.tagName)||'';
      if(tag!=='INPUT'&&tag!=='TEXTAREA'&&tag!=='SELECT'&&!document.activeElement.isContentEditable){e.preventDefault();openSearch();}
      return;
    }
    if(!sOverlay||!sOverlay.classList.contains('open'))return;
    if(e.key==='Escape'){e.preventDefault();closeSearch();}
    else if(e.key==='ArrowDown'){e.preventDefault();setActive(sActiveIdx+1);}
    else if(e.key==='ArrowUp'){e.preventDefault();setActive(sActiveIdx-1);}
    else if(e.key==='Enter'){
      var items=sResults.querySelectorAll('.sr-item'),act=items[sActiveIdx]||items[0];
      if(act){window.location.href=act.getAttribute('href');closeSearch();}
    }
  });

  /* Open a FAQ from a #faq-… hash (deep links from search / other pages) */
  function openFaqFromHash(){
    var h=location.hash;
    if(h.indexOf('#faq-')!==0)return;
    var d=document.getElementById(h.slice(1));
    if(d&&d.tagName==='DETAILS'){
      if(faqListWrap){faqListWrap.classList.remove('collapsed');faqListWrap.style.maxHeight='none';}
      if(faqToggleAll){faqToggleAll.setAttribute('aria-expanded','true');if(faqToggleAll.childNodes[0])faqToggleAll.childNodes[0].nodeValue='Hide all questions ';}
      d.open=true;
      setTimeout(function(){d.scrollIntoView({behavior:prefersReduced?'auto':'smooth',block:'center'});},90);
    }
  }

  /* ---- 13. FAQ spotlight carousel (auto-rotating) ---- */
  var faqList=$('faqList'),faqSpotlight=$('faqSpotlight'),
      faqToggleWrap=$('faqToggleWrap'),faqToggleAll=$('faqToggleAll'),faqListWrap=$('faqListWrap');
  if(faqList&&faqSpotlight){
    var details=[].slice.call(faqList.querySelectorAll('details'));
    if(details.length){
      var items=details.map(function(d){
        var sum=d.querySelector('summary'), ans=d.querySelector('p');
        return {q:sum?sum.textContent:'', a:ans?ans.innerHTML:'', id:d.id};
      });
      var track=document.createElement('div'); track.className='fs-track';
      items.forEach(function(it,i){
        var slide=document.createElement('div'); slide.className='fs-slide'+(i===0?' active':'');
        slide.innerHTML='<div class="fs-q"><span class="fs-ic">Q</span><span>'+esc(it.q)+'</span></div>'+
                        '<div class="fs-a">'+it.a+'</div>';
        track.appendChild(slide);
      });
      var bar=document.createElement('div'); bar.className='fs-bar';
      var dots=document.createElement('div'); dots.className='fs-dots';
      items.forEach(function(it,i){
        var b=document.createElement('button'); b.className='fs-dot'+(i===0?' active':'');
        b.setAttribute('aria-label','Show question '+(i+1)); b.setAttribute('data-i',i); dots.appendChild(b);
      });
      var nav=document.createElement('div'); nav.className='fs-nav';
      nav.innerHTML='<button class="fs-prev" aria-label="Previous question"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>'+
                    '<button class="fs-next" aria-label="Next question"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>';
      bar.appendChild(dots); bar.appendChild(nav);
      var prog=document.createElement('div'); prog.className='fs-progress';
      faqSpotlight.innerHTML=''; faqSpotlight.appendChild(track); faqSpotlight.appendChild(bar); faqSpotlight.appendChild(prog);
      faqSpotlight.hidden=false;

      var slides=track.querySelectorAll('.fs-slide'),dotEls=dots.querySelectorAll('.fs-dot');
      var cur=0,timer=null,progTimer=null,DUR=6500,paused=false;
      function show(n){
        cur=(n+slides.length)%slides.length;
        slides.forEach(function(s,i){s.classList.toggle('active',i===cur);});
        dotEls.forEach(function(d,i){d.classList.toggle('active',i===cur);});
      }
      function clearTimers(){if(timer)clearInterval(timer);if(progTimer)clearInterval(progTimer);timer=progTimer=null;prog.style.width='0';}
      function start(){
        if(prefersReduced||paused)return;
        clearTimers();
        var elapsed=0; prog.style.width='0';
        progTimer=setInterval(function(){elapsed+=120;prog.style.width=Math.min(100,(elapsed/DUR)*100)+'%';},120);
        timer=setInterval(function(){show(cur+1);elapsed=0;prog.style.width='0';},DUR);
      }
      function restart(){clearTimers();start();}
      dots.addEventListener('click',function(e){var b=e.target.closest('.fs-dot');if(b){show(parseInt(b.getAttribute('data-i'),10));restart();}});
      nav.querySelector('.fs-prev').addEventListener('click',function(){show(cur-1);restart();});
      nav.querySelector('.fs-next').addEventListener('click',function(){show(cur+1);restart();});
      faqSpotlight.addEventListener('mouseenter',function(){paused=true;clearTimers();});
      faqSpotlight.addEventListener('mouseleave',function(){paused=false;start();});
      faqSpotlight.addEventListener('focusin',function(){paused=true;clearTimers();});
      faqSpotlight.addEventListener('focusout',function(){paused=false;start();});
      document.addEventListener('visibilitychange',function(){if(document.hidden){clearTimers();}else if(!paused){start();}});
      start();

      /* collapse the full list behind a toggle (progressive enhancement) */
      if(faqToggleWrap&&faqToggleAll&&faqListWrap){
        faqToggleWrap.hidden=false;
        if(location.hash.indexOf('#faq-')!==0)faqListWrap.classList.add('collapsed');
        faqToggleAll.addEventListener('click',function(){
          var collapsed=faqListWrap.classList.contains('collapsed');
          if(collapsed){
            faqListWrap.classList.remove('collapsed');
            faqListWrap.style.maxHeight=faqListWrap.scrollHeight+'px';
            faqToggleAll.setAttribute('aria-expanded','true');
            faqToggleAll.childNodes[0].nodeValue='Hide all questions ';
            setTimeout(function(){faqListWrap.style.maxHeight='none';},400);
          }else{
            faqListWrap.style.maxHeight=faqListWrap.scrollHeight+'px';
            requestAnimationFrame(function(){faqListWrap.classList.add('collapsed');faqListWrap.style.maxHeight='0';});
            faqToggleAll.setAttribute('aria-expanded','false');
            faqToggleAll.childNodes[0].nodeValue='Browse all questions ';
          }
        });
      }
    }
  }
  openFaqFromHash();
  window.addEventListener('hashchange',openFaqFromHash);

  /* ---- 14. Open search from ?q= (sitelinks SearchAction) ---- */
  (function(){
    var m=location.search.match(/[?&]q=([^&]*)/);
    if(m&&sOverlay){var q=decodeURIComponent(m[1].replace(/\+/g,' '));if(q)setTimeout(function(){openSearch(q);},250);}
  })();

})();
