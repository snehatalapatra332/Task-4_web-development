/* Portfolio page JS:
   - mobile nav toggle
   - smooth scrolling & active link
   - carousel (auto + manual)
   - contact form opens mailto with prefilled values
*/

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '0.6rem';
      } else {
        nav.style.display = '';
        nav.style.flexDirection = '';
        nav.style.gap = '';
      }
    });
  }

  // SMOOTH SCROLL & ACTIVE LINKS
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('main section'));
  function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let found = null;
    for (const s of sections) {
      if (s.offsetTop <= scrollPos) found = s;
    }
    links.forEach(l => l.classList.remove('active'));
    if (found) {
      const id = found.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.add('active');
    }
  }
  links.forEach(l => l.addEventListener('click', (e) => {
    const href = l.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const tgt = document.querySelector(href);
      if (tgt) tgt.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }));
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // CAROUSEL

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

function goToSlide(n) {
  currentSlide = n;
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

updateCarousel();


  // build dots
  slides.forEach((s, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to slide ${idx+1}`);
    dot.addEventListener('click', () => { stopAuto(); goTo(idx); startAuto(); });
    dotsEl.appendChild(dot);
  });

  function updateDots() {
    const dots = dotsEl.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    if (dots[current]) dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { stopAuto(); prev(); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
  });

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }
  goTo(0);
  startAuto();

  // CONTACT FORM -> opens mail client
  const sendBtn = document.getElementById('send-mail');
  const status = document.getElementById('send-status');
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('visitor-name').value.trim();
    const email = document.getElementById('visitor-email').value.trim();
    const message = document.getElementById('visitor-message').value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      status.style.color = '#b91c1c';
      setTimeout(()=> status.textContent = '', 3000);
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:sneha.talapatra@example.com?subject=${subject}&body=${body}`;
    // open mail client
    window.location.href = mailto;
    status.textContent = 'Opening your email client...';
    status.style.color = '#065f46';
    setTimeout(()=> status.textContent = '', 3000);
  });
});

// FADE-IN on scroll (projects, contact, about)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.project-card, .contact-card, .contact-info, .about-section').forEach((el) => {
  observer.observe(el);
});
