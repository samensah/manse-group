/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== MOBILE HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.querySelectorAll('span').forEach((s, i) => {
    if (open) {
      if (i === 0) s.style.transform = 'translateY(7px) rotate(45deg)';
      if (i === 1) s.style.opacity  = '0';
      if (i === 2) s.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s.style.transform = '';
      s.style.opacity   = '';
    }
  });
});

/* close nav on link click */
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* ===== ACTIVE NAV LINK ===== */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ===== FADE-IN ON SCROLL ===== */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Opening email…';

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const subject = `New Contact Form Submission from ${firstName} ${lastName}`;
  const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;

  const mailtoLink = `mailto:sammens008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  setTimeout(() => {
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 800);
});

/* Articles filter + pagination are handled inline in articles.html */

/* ===== NAV DROPDOWN (Resources menu) ===== */
document.querySelectorAll('.nav-item-dropdown').forEach(item => {
  const trigger = item.querySelector('.nav-dropdown-trigger');
  trigger?.addEventListener('click', e => {
    // on mobile the dropdown is toggled; on desktop CSS hover handles it
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});

/* ===== COOKIE CONSENT ===== */
(function () {
  const CONSENT_KEY = 'manse_cookie_consent';
  const banner      = document.getElementById('cookieBanner');
  if (!banner) return;

  function applyConsent(state) {
    localStorage.setItem(CONSENT_KEY, state);
    // Update GA4 consent mode
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: state === 'granted' ? 'granted' : 'denied' });
    }
    // Load Tawk.to live chat only on consent
    if (state === 'granted') loadTawkTo();
    banner.classList.remove('visible');
  }

  // Only show banner if user hasn't decided yet — show immediately on first visit
  if (!localStorage.getItem(CONSENT_KEY)) {
    banner.classList.add('visible');
  } else if (localStorage.getItem(CONSENT_KEY) === 'granted') {
    loadTawkTo();
  }

  document.getElementById('cookieAccept')?.addEventListener('click', () => applyConsent('granted'));
  document.getElementById('cookieDecline')?.addEventListener('click', () => applyConsent('denied'));
})();

/* ===== TAWK.TO LIVE CHAT ===== */
function loadTawkTo() {
  if (window.Tawk_API) return; // already loaded
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://embed.tawk.to/6a2394128705f01c35097189/1jqdfkqfv';
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');
  document.head.appendChild(s);
}

/* ===== FAVICON — rendered with Inter via canvas ===== */
(function () {
  function drawFavicon() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    /* navy circle */
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0B1F3A';
    ctx.fill();

    /* white "M" in Inter */
    ctx.fillStyle    = '#FFFFFF';
    ctx.font         = '800 40px Inter, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', size / 2, size / 2 + 1);

    /* swap out the SVG favicon with the canvas PNG */
    const existing = document.querySelector("link[rel='icon']");
    const link     = existing || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = canvas.toDataURL('image/png');
    if (!existing) document.head.appendChild(link);
  }

  /* wait for Inter to be ready before drawing */
  if (document.fonts && document.fonts.load) {
    document.fonts.load('800 40px Inter').then(drawFavicon).catch(drawFavicon);
  } else {
    window.addEventListener('load', drawFavicon);
  }
})();
