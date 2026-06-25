/* ── Cursor ────────────────────────────── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  spawnSparkle(mx, my);
});

function lerp(a, b, t) { return a + (b - a) * t; }

function animRing() {
  rx = lerp(rx, mx, 0.13);
  ry = lerp(ry, my, 0.13);
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .btn, .skill-pill, .card, .project-card, .stat-box').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hovered'); ring.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hovered'); ring.classList.remove('hovered'); });
});

/* ── Sparkles ──────────────────────────── */
const colors = ['#824879','#C1527A','#a76ca0','#d7a8cb','#e8b4d0'];
let lastSparkle = 0;

function spawnSparkle(x, y) {
  const now = Date.now();
  if (now - lastSparkle < 80) return;
  lastSparkle = now;
  const s = document.createElement('div');
  s.className = 'sparkle';
  const angle = Math.random() * 360;
  const dist = 18 + Math.random() * 22;
  s.style.cssText = `
    left:${x}px; top:${y}px;
    background:${colors[Math.floor(Math.random()*colors.length)]};
    --tx:${Math.cos(angle)*dist}px;
    --ty:${Math.sin(angle)*dist}px;
    width:${5+Math.random()*5}px;
    height:${5+Math.random()*5}px;
    transform:translate(-50%,-50%);
  `;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 620);
}

/* ── Navbar scroll shadow ──────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Scroll reveal ─────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));
/* ── Typing Animation ───────────────── */

const roles = [
  "Building intelligent systems",
  "AI Enthusiast",
  "Computer Engineering Student",
  "Software Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingEl = document.querySelector(".typing-text");

function typeEffect() {

  const current = roles[roleIndex];

  if (!deleting) {
    typingEl.textContent = current.substring(0, charIndex++);
  } else {
    typingEl.textContent = current.substring(0, charIndex--);
  }

  if (!deleting && charIndex > current.length) {
    deleting = true;
    setTimeout(typeEffect, 1500);
    return;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();