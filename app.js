'use strict';
document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const previews = [...document.querySelectorAll('video.preview')];
const dialog = document.querySelector('#video-dialog');
const player = document.querySelector('#full-video');
const heroVideo = document.querySelector('#hero-video');
const previewToggle = document.querySelector('.preview-toggle');
let previewPaused = reduceMotion.matches;
let returnFocus;
const visibleVideos = new Set();
function syncPlayback() {
  previews.forEach(video => {
    const canPlay = visibleVideos.has(video) && !document.hidden && !dialog.open && !video.closest('[hidden]') && !reduceMotion.matches && !(video === heroVideo && previewPaused);
    if (canPlay) video.play().catch(() => {}); else video.pause();
  });
}
function syncToggle() {
  const paused = heroVideo.paused;
  previewToggle.textContent = paused ? '▶' : 'Ⅱ';
  previewToggle.setAttribute('aria-label', paused ? 'Play preview' : 'Pause preview');
  previewToggle.setAttribute('aria-pressed', String(!paused));
}
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) visibleVideos.add(entry.target); else visibleVideos.delete(entry.target); });
  syncPlayback();
}, {threshold:.15});
previews.forEach(video => videoObserver.observe(video));
heroVideo.addEventListener('play', syncToggle);
heroVideo.addEventListener('pause', syncToggle);
previewToggle.addEventListener('click', () => {
  if(heroVideo.paused) { previewPaused = false; heroVideo.play().catch(() => {}); }
  else { previewPaused = true; heroVideo.pause(); }
});
syncToggle();
document.addEventListener('visibilitychange', () => { if(document.hidden) player.pause(); syncPlayback(); });
reduceMotion.addEventListener('change', () => { previewPaused = reduceMotion.matches; syncPlayback(); syncToggle(); });
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), {threshold:.08});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
function setPage(name) {
  const target = name === 'igaming' ? 'igaming' : 'portfolio';
  document.body.classList.toggle('gaming-theme', target === 'igaming');
  document.querySelectorAll('.page').forEach(page => { page.hidden = page.id !== target; page.classList.toggle('page-enter',page.id === target); });
  document.querySelectorAll('[data-page]').forEach(link => {
    const active = link.dataset.page === target;
    link.classList.toggle('active',active);
    if(active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  syncPlayback();
}
document.querySelectorAll('[data-page]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  setPage(link.dataset.page);
  history.pushState(null,'',link.dataset.page === 'igaming' ? '#igaming' : '#');
  window.scrollTo({top:0,behavior:'instant'});
}));
function syncHash(){
  const hash=location.hash;
  if(hash==='#igaming' || hash==='#gaming-private') setPage('igaming');
  else if(hash !== '#contact') setPage('portfolio');
}
window.addEventListener('hashchange',syncHash);
window.addEventListener('popstate',syncHash);
syncHash();
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  returnFocus = button;
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  document.querySelector('.video-error').hidden = true;
  document.querySelector('#video-download').href = button.dataset.video;
  player.src = button.dataset.video;
  dialog.showModal();
  document.body.classList.add('modal-open');
  syncPlayback();
  player.play().catch(() => {});
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) {const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close();} });
dialog.addEventListener('close', () => {
  player.pause(); player.removeAttribute('src'); player.load();
  document.body.classList.remove('modal-open');
  syncPlayback(); returnFocus?.focus({preventScroll:true});
});
player.addEventListener('error', () => { if(player.getAttribute('src')) document.querySelector('.video-error').hidden=false; });
let scrollQueued=false;
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{document.body.classList.toggle('scrolled',window.scrollY>20);scrollQueued=false;});}},{passive:true});

// Draw a continuous path in document space; scroll changes only the stroke length.
(() => {
  const main = document.querySelector('main');
  const svg = document.querySelector('.scroll-thread');
  const path = svg.querySelector('.thread-light');
  const track = svg.querySelector('.thread-track');
  const tip = svg.querySelector('.thread-tip');
  let length = 0, height = 1, queued = false;
  function draw() {
    queued = false;
    if (!length) return;
    const top = main.getBoundingClientRect().top;
    const progress = Math.max(0,Math.min(1,(innerHeight * .72 - top) / height));
    let low = 0, high = length;
    const targetY = progress * height;
    for(let i=0;i<13;i++) {
      const middle = (low+high)/2;
      if(path.getPointAtLength(middle).y < targetY) low = middle; else high = middle;
    }
    const end = reduceMotion.matches ? length : (low+high)/2;
    path.style.strokeDashoffset = length - end;
    const point = path.getPointAtLength(end);
    tip.setAttribute('cx', point.x); tip.setAttribute('cy', point.y);
  }
  function requestDraw() { if(!queued) { queued = true; requestAnimationFrame(draw); } }
  function build() {
    const w = main.clientWidth; height = main.offsetHeight;
    if(!w || !height) return;
    const mobile = w < 761;
    const left = w * (mobile ? .055 : .07), right = w * (mobile ? .945 : .93);
    const segments = Math.max(3,Math.round(height/(mobile ? 620 : 800)));
    const step = height / segments;
    let d = `M ${w*.68} 0`;
    for(let i=0;i<segments;i++) {
      const startY = i * step, endY = (i+1) * step;
      const x = i % 2 === 0 ? right : left;
      const prev = i === 0 ? w*.68 : i%2===0 ? left : right;
      d += ` C ${prev} ${startY+step*.5}, ${x} ${endY-step*.5}, ${x} ${endY}`;
    }
    svg.setAttribute('viewBox',`0 0 ${w} ${height}`);
    path.setAttribute('d',d); track.setAttribute('d',d);
    length = path.getTotalLength(); path.style.strokeDasharray = length;
    draw();
  }
  new ResizeObserver(build).observe(main);
  addEventListener('scroll',requestDraw,{passive:true});
  reduceMotion.addEventListener('change',draw);
  build();
})();
