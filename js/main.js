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
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1200);
});

/* ===== ARTICLES FILTER ===== */
const filterBtns   = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.filter;

    articleCards.forEach(card => {
      const match = tag === 'all' || card.dataset.category === tag;
      card.style.display = match ? '' : 'none';
    });
  });
});
