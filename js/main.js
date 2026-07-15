
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ── CURSOR ──
const cd=document.getElementById('curd'), cr=document.getElementById('curr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;gsap.to(cd,{x:mx,y:my,duration:.1,ease:'none'});} );
(function aR(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cr.style.left=Math.round(rx)+'px';cr.style.top=Math.round(ry)+'px';requestAnimationFrame(aR)})();
document.querySelectorAll('a,button,.srv-c,.pc,.why-pt,.ts-c,.pr-c,.sh-c,.dig-c').forEach(el=>{
  el.addEventListener('mouseenter',()=>{gsap.to(cd,{width:20,height:20,duration:.3});gsap.to(cr,{width:64,height:64,opacity:.15,duration:.3})});
  el.addEventListener('mouseleave',()=>{gsap.to(cd,{width:8,height:8,duration:.3});gsap.to(cr,{width:44,height:44,opacity:.5,duration:.3})});
});

// ── PROGRESS ──
const pb=document.getElementById('prog');
window.addEventListener('scroll',()=>{
  const p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  pb.style.width=p+'%';
  document.getElementById('nav').classList.toggle('sc',window.scrollY>60);
});

// ── LOADER GSAP ──
const tl=gsap.timeline({onComplete:startSite});
tl.to('.ld-logo',{opacity:1,y:0,duration:.8,ease:'power3.out'},0.3)
  .to('.ld-sub',{opacity:1,y:0,duration:.6,ease:'power2.out'},0.9)
  .to('.ld-num',{opacity:1,duration:.4},1.1)
  .to('.ld-fill',{width:'100%',duration:2,ease:'power2.inOut'},0.5);

// counter
let n=0;
const ni=setInterval(()=>{
  n=Math.min(n+Math.floor(Math.random()*6+2),99);
  document.getElementById('ldnum').textContent=n+'%';
  if(n>=99)clearInterval(ni);
},40);

function startSite(){
  document.getElementById('ldnum').textContent='100%';
  gsap.to('#loader',{opacity:0,scale:1.06,duration:.8,ease:'power2.in',onComplete:()=>{
    document.getElementById('loader').remove();
    initAnimations();
    setTimeout(initLightbox, 500);
  }});
}

function initAnimations(){
  // NAV
  gsap.to('#navlogo',{opacity:1,x:0,duration:.7,ease:'back.out(1.7)',delay:.1});
  gsap.to('.n-links li',{opacity:1,y:0,duration:.6,stagger:.08,ease:'power3.out',delay:.2});
  gsap.to('.n-cta',{opacity:1,y:0,duration:.6,ease:'back.out(1.7)',delay:.7});
  // Fallback - ensure nav always visible
  setTimeout(()=>{
    document.getElementById('navlogo').style.opacity='1';
    document.querySelectorAll('.n-links li').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
    document.querySelector('.n-cta').style.opacity='1';
  }, 3500);

  // HERO - Cinematic entrance
  const htl = gsap.timeline({delay:.2});
  htl.to('.h-badge',{opacity:1,y:0,duration:.8,ease:'power3.out'})
     .to('.h-title .line span',{y:'0%',opacity:1,duration:1,stagger:.18,ease:'power4.out'},'+=.05')
     .to('.h-sub',{opacity:1,y:0,duration:.8,ease:'power2.out'},'-=.5')
     .to('.h-btns',{opacity:1,y:0,duration:.7,ease:'power2.out'},'-=.4')
     .to('.h-trust',{opacity:1,y:0,duration:.6,ease:'power2.out'},'-=.3')
     .to('.h-cards',{opacity:1,x:0,duration:.9,ease:'back.out(1.4)'},'-=.4')
     .to('.sc-ind',{opacity:1,y:0,duration:.6},'-=.3')
     .to('#fwa',{opacity:1,scale:1,rotation:0,duration:.7,ease:'back.out(1.7)'},'-=.2');

  // HERO SLIDESHOW - 3 sec smooth fade
  const slides = document.querySelectorAll('.h-slide');
  let si = 0;
  setInterval(() => {
    slides[si].classList.remove('on');
    si = (si + 1) % slides.length;
    slides[si].classList.add('on');
  }, 3000);

  // PARTICLES
  const ptc=document.getElementById('pts');
  for(let i=0;i<40;i++){
    const p=document.createElement('div');p.className='pt';
    const sz=Math.random()*2+1;
    p.style.cssText=`left:${Math.random()*100}%;top:${55+Math.random()*45}%;width:${sz}px;height:${sz}px;--d:${3+Math.random()*7}s;--e:${Math.random()*8}s`;
    ptc.appendChild(p);
  }

  // SCROLL ANIMATIONS
  // Stats
  gsap.utils.toArray('.st-it').forEach((el,i)=>{
    gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power3.out',delay:i*.1,
      scrollTrigger:{trigger:'#stats',start:'top 85%'}});
  });

  // GSAP Counter Animation with bounce
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseInt(el.dataset.count);
    const obj = {val: 0};
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Flash animation on the stat item
        gsap.from(el.closest('.st-it'), {
          scale: .85,
          opacity: 0,
          duration: .6,
          ease: 'back.out(1.7)'
        });
        // Count up with GSAP
        gsap.to(obj, {
          val: target,
          duration: 2.4,
          ease: 'power2.out',
          delay: 0.2,
          onUpdate: () => {
            const v = Math.floor(obj.val);
            el.textContent = target >= 1000 ? v.toLocaleString() + '+' : v + '+';
          },
          onComplete: () => {
            // Bounce effect on complete
            gsap.fromTo(el,
              {scale: 1.15, color: '#0A1628'},
              {scale: 1, color: '#0A1628', duration: .5, ease: 'elastic.out(1,.4)'}
            );
          }
        });
      }
    });
  });

  // Stats items - always visible, animate on scroll
  gsap.fromTo('.st-it',
    {y: 30, opacity: 0},
    {y: 0, opacity: 1, duration: .7, stagger: .12, ease: 'power3.out',
     scrollTrigger: {trigger: '#stats', start: 'top 90%', once: true}
    }
  );

  // Generic scroll reveals
  gsap.utils.toArray('.gsap-fade').forEach(el=>{
    gsap.to(el,{opacity:1,duration:.8,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });
  gsap.utils.toArray('.gsap-up').forEach((el,i)=>{
    gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });
  gsap.utils.toArray('.gsap-left').forEach(el=>{
    gsap.to(el,{opacity:1,x:0,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 80%'}});
  });
  gsap.utils.toArray('.gsap-right').forEach(el=>{
    gsap.to(el,{opacity:1,x:0,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 80%'}});
  });
  gsap.utils.toArray('.gsap-scale').forEach((el,i)=>{
    gsap.to(el,{opacity:1,scale:1,duration:.9,ease:'back.out(1.4)',
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });

  // Service cards stagger
  gsap.utils.toArray('.srv-c').forEach((el,i)=>{
    gsap.to(el,{opacity:1,scale:1,duration:.8,delay:i*.08,ease:'back.out(1.4)',
      scrollTrigger:{trigger:'#services',start:'top 70%'}});
  });

  // Digital cards stagger
  gsap.utils.toArray('.dig-c').forEach((el,i)=>{
    gsap.to(el,{opacity:1,y:0,duration:.7,delay:i*.06,ease:'power3.out',
      scrollTrigger:{trigger:'#digital',start:'top 70%'}});
  });

  // Portfolio cards stagger
  gsap.utils.toArray('.pc').forEach((el,i)=>{
    gsap.to(el,{opacity:1,scale:1,duration:.8,delay:i*.1,ease:'back.out(1.2)',
      scrollTrigger:{trigger:'#portfolio',start:'top 75%'}});
  });

  // Testimonials stagger
  gsap.utils.toArray('.ts-c').forEach((el,i)=>{
    gsap.to(el,{opacity:1,scale:1,duration:.8,delay:i*.12,ease:'back.out(1.4)',
      scrollTrigger:{trigger:'#testimonials',start:'top 75%'}});
  });

  // Pricing stagger
  gsap.utils.toArray('.pr-c').forEach((el,i)=>{
    gsap.to(el,{opacity:1,scale:1,duration:.8,delay:i*.12,ease:'back.out(1.4)',
      scrollTrigger:{trigger:'#pricing',start:'top 75%'}});
  });

  // Why badge bounce
  gsap.to('.why-bdg',{y:-10,rotation:1,duration:3,ease:'power1.inOut',yoyo:true,repeat:-1,delay:1});

  // Parallax on portfolio
  document.querySelectorAll('.pc').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*8;
      const y=((e.clientY-r.top)/r.height-.5)*8;
      c.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
    c.addEventListener('mouseleave',()=>c.style.backgroundPosition='center');
  });

  // Magnetic buttons
  document.querySelectorAll('.bwa,.bgh,.bdk,.bwg,.n-cta').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.22;
      const y=(e.clientY-r.top-r.height/2)*.22;
      gsap.to(btn,{x,y,duration:.4,ease:'power2.out'});
    });
    btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}) );
  });

  // 3D tilt on service cards
  document.querySelectorAll('.srv-c').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*16;
      const y=((e.clientY-r.top)/r.height-.5)*-16;
      gsap.to(c,{rotateX:y,rotateY:x,duration:.4,ease:'power2.out',transformStyle:'preserve-3d'});
    });
    c.addEventListener('mouseleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.6,ease:'elastic.out(1,.4)'}) );
  });

  // 3D tilt on showcase cards
  document.querySelectorAll('.sh-c').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*12;
      const y=((e.clientY-r.top)/r.height-.5)*-12;
      gsap.to(c,{rotateX:y,rotateY:x,duration:.4,ease:'power2.out',transformStyle:'preserve-3d'});
    });
    c.addEventListener('mouseleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.6,ease:'elastic.out(1,.4)'}) );
  });

  // Why us points stagger
  gsap.utils.toArray('.why-pt').forEach((el,i)=>{
    gsap.from(el,{x:-40,opacity:0,duration:.7,delay:i*.1,ease:'power3.out',
      scrollTrigger:{trigger:'#why',start:'top 70%'}});
  });
}

// PORTFOLIO TABS
function portTab(btn, tab) {
  document.querySelectorAll('.port-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.port-pane').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('port-' + tab).classList.add('active');
  gsap.from('#port-' + tab + ' .port-item', {
    y: 40, opacity: 0, scale: .92,
    duration: .7, stagger: .08,
    ease: 'back.out(1.4)'
  });
  // Re-init lightbox for new tab items
  lbImgs = [];
  setTimeout(initLightbox, 100);
}

// LIGHTBOX
let lbImgs = [], lbIdx = 0;

function initLightbox() {
  // Collect all port-item images
  document.querySelectorAll('.port-item').forEach((item, i) => {
    const imgDiv = item.querySelector('.port-img');
    const ttl = item.querySelector('.port-item-ttl');
    const sub = item.querySelector('.port-item-sub');
    const tag = item.querySelector('.port-item-tag');
    if (!imgDiv) return;
    
    // Get background image URL
    const style = imgDiv.style.backgroundImage;
    const url = style.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
    
    item.setAttribute('data-lb-idx', lbImgs.length);
    lbImgs.push({
      url: url,
      caption: (tag ? tag.textContent : '') + ' · ' + (ttl ? ttl.textContent : ''),
      sub: sub ? sub.textContent : ''
    });
    
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      lbOpen(parseInt(item.getAttribute('data-lb-idx')));
    });
  });
}

function lbOpen(idx) {
  if (lbImgs.length === 0) return;
  lbIdx = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  const ctr = document.getElementById('lightbox-counter');
  
  img.src = lbImgs[idx].url;
  cap.textContent = lbImgs[idx].caption;
  ctr.textContent = (idx + 1) + ' / ' + lbImgs.length;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  gsap.from(img, {scale:.85, opacity:0, duration:.4, ease:'back.out(1.7)'});
}

function lbNav(dir) {
  const total = lbImgs.length;
  lbIdx = (lbIdx + dir + total) % total;
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  const ctr = document.getElementById('lightbox-counter');
  
  gsap.to(img, {opacity:0, x: dir*30, duration:.2, onComplete: () => {
    img.src = lbImgs[lbIdx].url;
    cap.textContent = lbImgs[lbIdx].caption;
    ctr.textContent = (lbIdx + 1) + ' / ' + lbImgs.length;
    gsap.fromTo(img, {opacity:0, x:-dir*30}, {opacity:1, x:0, duration:.3, ease:'power2.out'});
  }});
}

function lbClose(e) {
  if (e && e.target !== document.getElementById('lightbox') && e.target !== document.getElementById('lightbox-close')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
});

// MOBILE MENU
const hbg=document.getElementById('hbg'),mob=document.getElementById('mob');
hbg.addEventListener('click',()=>{hbg.classList.toggle('op');mob.classList.toggle('op')});
function cM(){hbg.classList.remove('op');mob.classList.remove('op')}


// ═══════════ MIND-BLOWING ANIMATION UPGRADES ═══════════

// 1. SMOOTH SCROLL with Lenis
let lenis;
try {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });
  function lenisRaf(time) {
    lenis.raf(time);
    requestAnimationFrame(lenisRaf);
  }
  requestAnimationFrame(lenisRaf);
  // ScrollTrigger sync
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
} catch(e) { console.log('Lenis not loaded'); }

// 2. THREE.JS PARTICLE FIELD in hero
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 400;
  
  function resize() {
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);
  
  // Gold star particles
  const count = 180;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random() - .5) * 1200;
    pos[i*3+1] = (Math.random() - .5) * 800;
    pos[i*3+2] = (Math.random() - .5) * 400;
    sizes[i] = Math.random() * 3 + .5;
    speeds[i] = Math.random() * .3 + .1;
  }
  
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const mat = new THREE.PointsMaterial({
    color: 0xD4A017,
    size: 1.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: .7
  });
  
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  
  // Lines connecting nearby particles
  const lineMat = new THREE.LineBasicMaterial({ color: 0xD4A017, transparent: true, opacity: .06 });
  
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - .5) * 2;
    mouseY = -(e.clientY / window.innerHeight - .5) * 2;
  });
  
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame += .003;
    
    const p = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i*3+1] += speeds[i] * .2;
      if (p[i*3+1] > 400) p[i*3+1] = -400;
    }
    geo.attributes.position.needsUpdate = true;
    
    points.rotation.y = frame * .03 + mouseX * .08;
    points.rotation.x = mouseY * .05;
    camera.position.x += (mouseX * 20 - camera.position.x) * .02;
    camera.position.y += (mouseY * 10 - camera.position.y) * .02;
    
    renderer.render(scene, camera);
  }
  animate();
})();

// 3. ENHANCED MAGNETIC CURSOR
(function enhanceCursor() {
  const dot = document.getElementById('curd');
  const ring = document.getElementById('curr');
  
  const magnetTargets = document.querySelectorAll('a,button,.srv-c,.pc,.why-pt,.ts-c,.pr-c,.sh-c,.dig-c');
  
  magnetTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
      gsap.to(ring, { borderColor: 'rgba(212,160,23,.8)', duration: .3 });
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
      gsap.to(ring, { borderColor: 'rgba(212,160,23,.5)', duration: .3 });
    });
  });
})();

// 4. RIPPLE EFFECT on all buttons
(function addRipple() {
  document.querySelectorAll('.bwa,.bgh,.bdk,.bwg,.n-cta,.pr-btn,.f-btn').forEach(btn => {
    btn.classList.add('ripple-btn');
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const size = Math.max(r.width, r.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
})();

// 5. GLOWING MOUSE TRAIL
(function mouseTrail() {
  const trail = [];
  const trailCount = 8;
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `position:fixed;width:${4-i*.3}px;height:${4-i*.3}px;background:rgba(212,160,23,${.6-i*.07});border-radius:50%;pointer-events:none;z-index:99990;transform:translate(-50%,-50%);transition:all ${.05+i*.04}s`;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }
  
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  
  function updateTrail() {
    let px = mx, py = my;
    trail.forEach((t, i) => {
      t.x += (px - t.x) * (i === 0 ? 1 : .35);
      t.y += (py - t.y) * (i === 0 ? 1 : .35);
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      px = t.x; py = t.y;
    });
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
})();

// 6. SERVICE CARD SPOTLIGHT (mouse-follow radial gradient)
document.querySelectorAll('.srv-c,.dig-c,.pr-c,.ts-c').forEach(card => {
  card.style.position = 'relative';
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212,160,23,.07) 0%, transparent 50%), var(--navy2)`;
  });
  card.addEventListener('mouseleave', e => {
    card.style.background = '';
  });
});

// 7. SCROLL-TRIGGERED SECTION GLOW
const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('glow-active');
    }
  });
}, { threshold: .3 });

document.querySelectorAll('#services,#digital,#portfolio,#pricing,#testimonials,#why').forEach(sec => {
  glowObserver.observe(sec);
});

// 8. TEXT SCRAMBLE effect on hero title hover
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const old = this.el.innerText;
    const len = Math.max(old.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const from = old[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < .28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--gold);opacity:.5">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) { this.resolve(); }
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
}

// Apply scramble to a headline element (badge text)
const badge = document.querySelector('.h-badge');
if (badge) {
  badge.classList.add('h-badge-float');
}

// 9. ADVANCED 3D TILT on portfolio items
document.querySelectorAll('.port-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const r = item.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 20;
    const y = ((e.clientY - r.top) / r.height - .5) * -20;
    gsap.to(item, {
      rotateX: y, rotateY: x,
      transformPerspective: 600,
      duration: .4, ease: 'power2.out'
    });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, { rotateX: 0, rotateY: 0, duration: .8, ease: 'elastic.out(1,.4)' });
  });
});

// 10. PARALLAX SCROLL on hero content
gsap.to('.h-content', {
  y: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});

gsap.to('.hero-orb-1', {
  y: -120, x: 40,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 2
  }
});

// 11. STAGGER REVEAL with clip-path on section headers
gsap.utils.toArray('.sec-t,.section-title,.h-sec-t').forEach(el => {
  gsap.fromTo(el,
    { clipPath: 'inset(0 100% 0 0)', opacity: .5 },
    { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }
  );
});

// 12. COUNTER animate with comma formatting — upgrade existing
document.querySelectorAll('.st-num').forEach(el => {
  gsap.fromTo(el,
    { scale: .6, opacity: 0 },
    { scale: 1, opacity: 1, duration: .8, ease: 'back.out(2)',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }
  );
});

// 13. WHY US animated check marks
document.querySelectorAll('.why-pt').forEach((pt, i) => {
  gsap.fromTo(pt,
    { x: -60, opacity: 0, filter: 'blur(4px)' },
    { x: 0, opacity: 1, filter: 'blur(0px)', duration: .8, delay: i * .12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#why', start: 'top 70%', once: true }
    }
  );
});

// 14. NAV link indicator animation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.n-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = 'var(--gold)';
        } else {
          a.style.color = '';
        }
      });
    }
  });
}, { threshold: .4 });

sections.forEach(s => navObserver.observe(s));

// 15. FLOATING TESTIMONIAL CARDS entrance
gsap.utils.toArray('.ts-c').forEach((card, i) => {
  const dir = i % 2 === 0 ? -40 : 40;
  gsap.fromTo(card,
    { x: dir, opacity: 0, rotateZ: i % 2 === 0 ? -2 : 2 },
    { x: 0, opacity: 1, rotateZ: 0, duration: 1, delay: i * .15,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '#testimonials', start: 'top 75%', once: true }
    }
  );
});

// 16. HERO TITLE — split by chars for epic entrance
setTimeout(() => {
  const h1Lines = document.querySelectorAll('.h-title .line span');
  if (h1Lines.length === 0) return;
  // Already animated by existing code — add glitch data attr
  h1Lines.forEach(span => {
    span.setAttribute('data-text', span.textContent);
    span.classList.add('glitch-word');
  });
}, 3000);

// 17. SCROLL INDICATOR pulse
const scrollInd = document.querySelector('.sc-ind');
if (scrollInd) {
  gsap.to(scrollInd, {
    y: 8, duration: 1.2, ease: 'power1.inOut',
    yoyo: true, repeat: -1
  });
}

// 18. GOLD DIVIDER lines animated draw-in
gsap.utils.toArray('.sec-div, hr').forEach(el => {
  gsap.fromTo(el,
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    }
  );
});

// 19. PAGE TRANSITION on internal nav clicks
document.querySelectorAll('.mob a, .n-links a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    const overlay = document.getElementById('page-transition');
    if (!overlay) { document.querySelector(target)?.scrollIntoView({behavior:'smooth'}); return; }
    
    gsap.to(overlay, {
      clipPath: 'inset(0% 0 0 0)', duration: .4, ease: 'power3.in',
      onComplete: () => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'instant' });
        gsap.to(overlay, {
          clipPath: 'inset(0 0 100% 0)', duration: .5, delay: .1, ease: 'power3.out'
        });
      }
    });
  });
});

// 20. INTERACTIVE STAR FIELD on hover in hero
const heroSection = document.getElementById('hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
      canvas.style.transform = `translate(${(x-.5)*10}px,${(y-.5)*8}px)`;
    }
  });
}

// 21. PRICING CARD HOVER — 3D flip reveal
document.querySelectorAll('.pr-c').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -12, scale: 1.02, duration: .4, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, scale: 1, duration: .6, ease: 'elastic.out(1,.5)' });
  });
});

// 22. DIGITAL CARDS slide-in from alternating sides  
gsap.utils.toArray('.dig-c').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 80, opacity: 0, rotateX: 15 },
    { y: 0, opacity: 1, rotateX: 0, duration: .9, delay: i * .08,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#digital', start: 'top 70%', once: true }
    }
  );
});

// 23. LOGO pulse on load
gsap.fromTo('#navlogo svg',
  { filter: 'drop-shadow(0 0 0px rgba(212,160,23,0))' },
  { filter: 'drop-shadow(0 0 12px rgba(212,160,23,.5))',
    duration: 1.5, ease: 'power2.out',
    delay: 2, yoyo: true, repeat: 3 }
);

console.log('%c🚀 Printsy — Mind-Blowing Mode Active', 'color:#D4A017;font-size:16px;font-weight:bold;background:#0A1628;padding:8px 16px;border-radius:8px');

