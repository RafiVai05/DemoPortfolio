/* ═══════════════════════════════════════════════
   RAFIVAI PORTFOLIO — FORZA HORIZON THEME
   script.js
   ─────────────────────────────────────────────
   ⚠️  EMAILJS SETUP (required for contact form):
   1. Go to https://www.emailjs.com and sign up free
   2. Add a Gmail service → copy your Service ID
   3. Create an Email Template with variables:
        {{from_name}}, {{from_email}}, {{message}}
      Set "To Email" to: basirridwan7123@gmail.com
      Copy your Template ID
   4. Go to Account → API Keys → copy your Public Key
   5. Replace the three placeholder strings below:
        EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID
═══════════════════════════════════════════════ */

const EMAILJS_PUBLIC_KEY   = "YOUR_PUBLIC_KEY";       // ← replace
const EMAILJS_SERVICE_ID   = "YOUR_SERVICE_ID";       // ← replace
const EMAILJS_TEMPLATE_ID  = "YOUR_TEMPLATE_ID";      // ← replace

// Init EmailJS
(function(){
  if(typeof emailjs !== "undefined"){
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();


/* ══════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════ */
const cursorRing = document.getElementById("cursorRing");
const cursorDot  = document.getElementById("cursorDot");

let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
let ringX  = mouseX, ringY = mouseY;

// Track mouse
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top  = mouseY + "px";

  // Color gradient based on horizontal position
  const ratio = mouseX / window.innerWidth; // 0 → 1
  let r, g, b;
  if(ratio < 0.5){
    // left = blue (0,212,255) → center = white
    const t = ratio * 2;
    r = Math.round(0   + t * 255);
    g = Math.round(212 + t * 43);
    b = 255;
  } else {
    // center = white → right = orange (255,107,0)
    const t = (ratio - 0.5) * 2;
    r = 255;
    g = Math.round(255 - t * 148);
    b = Math.round(255 - t * 255);
  }
  const col = `rgb(${r},${g},${b})`;
  cursorRing.style.borderColor = col;
  cursorDot.style.background   = col;
});

// Smooth ring follow
function animateCursor(){
  const ease = 0.14;
  ringX += (mouseX - ringX) * ease;
  ringY += (mouseY - ringY) * ease;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover state on interactive elements
const hoverTargets = "a, button, input, textarea, .project-card, .skill-card, .edu-card, .pill, .soc-btn";
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursorRing.style.opacity = "0";
  cursorDot.style.opacity  = "0";
});
document.addEventListener("mouseenter", () => {
  cursorRing.style.opacity = "1";
  cursorDot.style.opacity  = "1";
});


/* ══════════════════════════════════════
   2. DATE & TIME WIDGET
══════════════════════════════════════ */
function updateClock(){
  const now = new Date();
  const days  = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const months= ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const hh = String(now.getHours()).padStart(2,"0");
  const mm = String(now.getMinutes()).padStart(2,"0");
  const ss = String(now.getSeconds()).padStart(2,"0");
  const day = days[now.getDay()];
  const mon = months[now.getMonth()];
  const dd  = String(now.getDate()).padStart(2,"0");
  const yr  = now.getFullYear();

  document.getElementById("dtTime").textContent = `${hh}:${mm}:${ss}`;
  document.getElementById("dtDate").textContent = `${day}, ${mon} ${dd} ${yr}`;
}
updateClock();
setInterval(updateClock, 1000);


/* ══════════════════════════════════════
   3. TYPEWRITER EFFECT
══════════════════════════════════════ */
const roles = [
  "CSE Student at AIUB",
  "Researcher",
  "Valorant Player",
  "Video Editor",
  "Photo Editor & Color Grader",
  "Content Creator",
  "Public Speaker",
  "Programmer",
];
let roleIdx = 0, charIdx = 0, deleting = false;
const twEl = document.getElementById("typewriterText");

function typewriter(){
  const current = roles[roleIdx];
  if(!deleting){
    twEl.textContent = current.slice(0, ++charIdx);
    if(charIdx === current.length){
      deleting = true;
      setTimeout(typewriter, 2200);
      return;
    }
  } else {
    twEl.textContent = current.slice(0, --charIdx);
    if(charIdx === 0){
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typewriter, deleting ? 42 : 72);
}
setTimeout(typewriter, 1200);


/* ══════════════════════════════════════
   4. PARTICLE CANVAS (speed stars)
══════════════════════════════════════ */
(function(){
  const canvas = document.getElementById("particleCanvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize(){
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = ["#ff6b00","#00d4ff","#ffcc00","#ffffff"];

  function Particle(){
    this.reset = function(){
      this.x   = Math.random() * W;
      this.y   = Math.random() * H;
      this.len = Math.random() * 40 + 8;
      this.speed = Math.random() * 2.5 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.width   = Math.random() * 1.2 + 0.2;
      this.color   = COLORS[Math.floor(Math.random()*COLORS.length)];
    };
    this.reset();
    this.x = Math.random() * W; // distribute initially
  }

  for(let i=0;i<80;i++) particles.push(new Particle());

  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      // horizontal streak
      const grad = ctx.createLinearGradient(p.x-p.len, p.y, p.x+4, p.y);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, p.color + Math.floor(p.opacity*255).toString(16).padStart(2,"0"));
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth   = p.width;
      ctx.moveTo(p.x - p.len, p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      p.x += p.speed;
      if(p.x - p.len > W) p.reset(), p.x = -p.len;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ══════════════════════════════════════
   5. NAVBAR — scroll shrink + active link
══════════════════════════════════════ */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // shrink
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // active link highlight
  let current = "";
  sections.forEach(s => {
    if(window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle("active", l.dataset.section === current);
  });
});


/* ══════════════════════════════════════
   6. HAMBURGER MENU
══════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksEl.classList.toggle("open");
});
navLinksEl.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksEl.classList.remove("open");
  });
});


/* ══════════════════════════════════════
   7. SCROLL REVEAL (sections + elements)
══════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.1, rootMargin:"0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach((el, i) => {
  // stagger cards automatically
  if(el.closest(".projects-grid") || el.closest(".edu-grid")){
    const idx = Array.from(el.parentElement.children).indexOf(el);
    el.style.setProperty("--delay", `${idx * 0.12}s`);
  }
  revealObserver.observe(el);
});


/* ══════════════════════════════════════
   8. SKILL BARS — animate on enter
══════════════════════════════════════ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const bars = entry.target.querySelectorAll(".skill-bar");
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.style.getPropertyValue("--w");
        }, i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.2 });

document.querySelectorAll(".skills-grid").forEach(g => skillObserver.observe(g));


/* ══════════════════════════════════════
   9. PROJECT CARDS — tilt on hover
══════════════════════════════════════ */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-5px) rotateX(${-dy*4}deg) rotateY(${dx*4}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


/* ══════════════════════════════════════
   10. CONTACT FORM + EMAILJS + TOAST
══════════════════════════════════════ */
const form    = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const toast   = document.getElementById("toast");
const toastErr= document.getElementById("toastError");

let toastTimer = null;

function showToast(el){
  if(toastTimer) clearTimeout(toastTimer);
  toast.classList.remove("show");
  toastErr.classList.remove("show");
  // force reflow so the animation retriggers
  void el.offsetWidth;
  el.classList.add("show");
  toastTimer = setTimeout(() => el.classList.remove("show"), 4500);
}

function setBtnLoading(loading){
  const idle = sendBtn.querySelector(".btn-idle");
  const spin = sendBtn.querySelector(".btn-loading");
  idle.style.display  = loading ? "none"   : "inline-flex";
  spin.style.display  = loading ? "inline-flex" : "none";
  sendBtn.disabled    = loading;
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const name  = document.getElementById("fromName").value.trim();
  const email = document.getElementById("fromEmail").value.trim();
  const msg   = document.getElementById("fromMsg").value.trim();

  if(!name || !email || !msg) return;

  setBtnLoading(true);

  const templateParams = {
    from_name:  name,
    from_email: email,
    message:    msg,
    to_email:   "basirridwan7123@gmail.com",
  };

  try {
    if(typeof emailjs === "undefined") throw new Error("EmailJS not loaded");
    if(EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") throw new Error("EmailJS not configured");

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    form.reset();
    showToast(toast);
  } catch(err){
    console.error("EmailJS error:", err);
    showToast(toastErr);
  }

  setBtnLoading(false);
});


/* ══════════════════════════════════════
   11. SMOOTH SCROLL for nav links
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior:"smooth" });
    }
  });
});


/* ══════════════════════════════════════
   12. SECTION ENTRANCE ANIMATION
      (hero elements via CSS keyframes,
       but we also trigger them here)
══════════════════════════════════════ */
window.addEventListener("DOMContentLoaded", () => {
  // Ensure hero name lines are visible
  document.querySelectorAll(".name-line").forEach(el => {
    el.style.willChange = "opacity, transform";
  });
});


/* ══════════════════════════════════════
   13. BACKGROUND PARALLAX (subtle)
══════════════════════════════════════ */
const heroSection = document.querySelector(".hero-section");
const heroContent = document.querySelector(".hero-content");
const gridFloor   = document.querySelector(".hero-grid-floor");

window.addEventListener("scroll", () => {
  const sy = window.scrollY;
  if(sy < window.innerHeight){
    if(heroContent) heroContent.style.transform = `translateY(${sy * 0.25}px)`;
    if(gridFloor)   gridFloor.style.transform   = `perspective(600px) rotateX(72deg) translateY(${sy * 0.15}px)`;
  }
});


/* ══════════════════════════════════════
   14. EDUCATION CARD counter animation
══════════════════════════════════════ */
// Pulse glow on award card periodically
const awardCard = document.querySelector(".edu-card.award");
if(awardCard){
  setInterval(() => {
    awardCard.style.boxShadow = "0 0 30px rgba(255,204,0,.25)";
    setTimeout(() => awardCard.style.boxShadow = "", 600);
  }, 4000);
}


/* ══════════════════════════════════════
   15. RIPPLE on button click
══════════════════════════════════════ */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.18);
      transform:scale(0);
      animation:rippleAnim .55s ease-out forwards;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform:scale(3); opacity:0; }
  }
`;
document.head.appendChild(rippleStyle);

console.log(
  "%c[RAFIVAI PORTFOLIO]%c Loaded. Welcome to the arena.",
  "color:#ff6b00;font-family:monospace;font-weight:bold;font-size:14px",
  "color:#00d4ff;font-family:monospace;font-size:13px"
);
