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

  function readForm(prefix){
    return {
      name:(($(prefix+'Name')||{}).value||'').trim(),
      email:(($(prefix+'Email')||{}).value||'').trim(),
      mobile:(($(prefix+'Mobile')||{}).value||'').trim(),
      company:(($(prefix+'Company')||{}).value||'').trim(),
      interest:(($(prefix+'Interest')||{}).value||'').trim(),
      message:(($(prefix+'Message')||{}).value||'').trim()
    };
  }
  function validate(prefix,d){
    var err=$(prefix+'Err');
    if(!d.name||!d.message){if(err)err.classList.add('show');return false;}
    if(err)err.classList.remove('show');return true;
  }
  function buildLines(d){
    var L=['Hello INFITEX Global Advisory,','','Name: '+d.name];
    if(d.email)L.push('Email: '+d.email);
    if(d.mobile)L.push('Mobile: '+d.mobile);
    if(d.company)L.push('Company: '+d.company);
    L.push('Interested in: '+d.interest);
    L.push('Message: '+d.message);
    return L;
  }
  if($('waSend'))$('waSend').addEventListener('click',function(){
    var d=readForm('wa'); if(!validate('wa',d))return;
    var text=buildLines(d).join('\n');
    var url='https://wa.me/'+CONFIG.whatsappNumber+'?text='+encodeURIComponent(text);
    window.open(url,'_blank','noopener'); closePopovers();
  });
  if($('emSend'))$('emSend').addEventListener('click',function(){
    var d=readForm('em'); if(!validate('em',d))return;
    var subject='Website enquiry — '+(d.interest||'INFITEX')+(d.company?(' ('+d.company+')'):'');
    var body=buildLines(d).join('\r\n');
    var url='mailto:'+CONFIG.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    window.location.href=url; closePopovers();
  });

  /* ---- 8. Main contact form (Web3Forms) ---- */
  var WEB3FORMS_KEY="YOUR_WEB3FORMS_ACCESS_KEY";
  function showMsg(el,type,text){if(el){el.className='form-msg '+type;el.textContent=text;}}
  var form=$('contactForm'),formMsg=$('formMsg');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name=form.name.value.trim(),email=form.email.value.trim(),msg=form.message.value.trim();
      if(!name||!email||!msg){showMsg(formMsg,'err','Please complete your name, email and message.');return;}
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){showMsg(formMsg,'err','Please enter a valid email address.');return;}
      if(WEB3FORMS_KEY==="YOUR_WEB3FORMS_ACCESS_KEY"){
        showMsg(formMsg,'ok','Thanks '+name.split(' ')[0]+'! (Demo mode — add your free Web3Forms key in app.js to receive these by email.)');form.reset();return;
      }
      var btn=form.querySelector('button[type=submit]');btn.disabled=true;var label=btn.innerHTML;btn.textContent='Sending…';
      var data={access_key:WEB3FORMS_KEY,subject:'New enquiry — INFITEX website',name:name,email:email,
        phone:form.phone?form.phone.value:'',company:form.company?form.company.value:'',
        interest:form.interest?form.interest.value:'',message:msg};
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

})();
