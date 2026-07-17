/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

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

/* ===== PRE-LAUNCH FRONT DOOR ===== */
(function () {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="launch-gate" id="launchGate" data-launch-date="2026-09-01T09:00:00+01:00" role="dialog" aria-modal="true" aria-labelledby="launchTitle">
      <div class="launch-orb launch-orb-one" aria-hidden="true"></div>
      <div class="launch-orb launch-orb-two" aria-hidden="true"></div>
      <div class="launch-grid-pattern" aria-hidden="true"></div>

      <header class="launch-header">
        <a href="index.html" class="launch-logo" aria-label="Manse Group home">
          <span class="launch-logo-mark">M</span>
          <span>
            <strong>MANSE <em>Group</em></strong>
            <small>Advisory &amp; Analytics</small>
          </span>
        </a>
        <a class="launch-contact-link" href="mailto:manse.advisoryanalytics@gmail.com">Talk to us <span aria-hidden="true">↗</span></a>
      </header>

      <main class="launch-main">
        <section class="launch-copy">
          <div class="launch-kicker"><span></span> A smarter financial partner is taking shape</div>
          <h1 id="launchTitle">Clarity for your finances.<br><span>Confidence for what’s next.</span></h1>
          <p class="launch-intro">MANSE combines intelligent financial technology with real human expertise—giving UK businesses sharper insight, simpler compliance and more time to grow.</p>

          <form class="launch-form" id="launchWaitlistForm" novalidate>
            <label for="launchEmail">Be first to know when we launch</label>
            <div class="launch-form-row">
              <input type="email" id="launchEmail" name="email" placeholder="Enter your work email" autocomplete="email" required>
              <button type="submit">Join the waitlist <span aria-hidden="true">→</span></button>
            </div>
            <p class="launch-form-note" id="launchFormNote">No noise. Just our launch announcement and useful financial insight.</p>
          </form>

          <div class="launch-trust">
            <span>AI-powered</span><span>Human-led</span><span>Built for UK businesses</span>
          </div>
        </section>

        <aside class="launch-panel" aria-label="Launch countdown">
          <div class="launch-panel-top">
            <span class="launch-status"><i></i> Building in progress</span>
            <span class="launch-edition">01 / 26</span>
          </div>
          <div class="launch-panel-copy">
            <p>We go live</p>
            <h2>01 September 2026</h2>
          </div>
          <div class="launch-countdown" id="launchCountdown" aria-live="polite">
            <div><strong data-unit="days">00</strong><span>Days</span></div>
            <b>:</b>
            <div><strong data-unit="hours">00</strong><span>Hours</span></div>
            <b>:</b>
            <div><strong data-unit="minutes">00</strong><span>Mins</span></div>
            <b>:</b>
            <div><strong data-unit="seconds">00</strong><span>Secs</span></div>
          </div>
          <div class="launch-progress" aria-hidden="true"><span></span></div>
          <div class="launch-panel-footer">
            <p><strong>Early access</strong><br>Waitlist members get first priority.</p>
            <span class="launch-arrow" aria-hidden="true">↗</span>
          </div>
        </aside>
      </main>

    </div>
  `);

  const gate = document.getElementById('launchGate');

  const launchMain = gate.querySelector('.launch-main');
  const countdown = document.getElementById('launchCountdown');
  const waitlistForm = document.getElementById('launchWaitlistForm');
  const formNote = document.getElementById('launchFormNote');
  const launchAt = new Date(gate.dataset.launchDate).getTime();
  const coveredPage = [...document.body.children].filter(element => element !== gate && element.tagName !== 'SCRIPT');

  document.body.classList.add('launch-locked');
  coveredPage.forEach(element => element.setAttribute('inert', ''));

  function fitLaunchPage() {
    launchMain.style.transform = '';
    launchMain.style.transformOrigin = '';
    gate.classList.remove('launch-compact', 'launch-tight');

    if (launchMain.scrollHeight > launchMain.clientHeight + 1) {
      gate.classList.add('launch-compact');
    }

    if (launchMain.scrollHeight > launchMain.clientHeight + 1) {
      gate.classList.add('launch-tight');
    }

    if (launchMain.scrollHeight > launchMain.clientHeight + 1) {
      const fitScale = Math.min(1, (launchMain.clientHeight - 2) / launchMain.scrollHeight);
      launchMain.style.transform = `scale(${fitScale})`;
      launchMain.style.transformOrigin = 'center center';
    }
  }

  fitLaunchPage();
  window.addEventListener('resize', fitLaunchPage);
  document.fonts?.ready.then(fitLaunchPage);

  function updateCountdown() {
    const remaining = Math.max(0, launchAt - Date.now());
    const units = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60)
    };

    Object.entries(units).forEach(([unit, value]) => {
      const output = countdown?.querySelector(`[data-unit="${unit}"]`);
      if (output) output.textContent = String(value).padStart(2, '0');
    });
  }

  updateCountdown();
  const timer = window.setInterval(updateCountdown, 1000);

  waitlistForm?.addEventListener('submit', event => {
    event.preventDefault();
    const emailInput = document.getElementById('launchEmail');

    if (!emailInput?.checkValidity()) {
      emailInput?.reportValidity();
      return;
    }

    const subject = 'MANSE pre-launch waitlist request';
    const body = `Please add ${emailInput.value} to the MANSE launch waitlist.`;
    formNote.textContent = 'Your email draft is ready—send it to confirm your place.';
    formNote.classList.add('is-success');
    window.location.href = `mailto:manse.advisoryanalytics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();

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
    // if (state === 'granted') loadTawkTo();
    banner.classList.remove('visible');
  }

  // Only show banner if user hasn't decided yet — show immediately on first visit
  if (!localStorage.getItem(CONSENT_KEY)) {
    banner.classList.add('visible');
  } else if (localStorage.getItem(CONSENT_KEY) === 'granted') {
    // loadTawkTo();
  }

  document.getElementById('cookieAccept')?.addEventListener('click', () => applyConsent('granted'));
  document.getElementById('cookieDecline')?.addEventListener('click', () => applyConsent('denied'));
})();

/* ===== TAWK.TO LIVE CHAT (commented out — uncomment to re-enable) ===== */
/*
function loadTawkTo() {
  if (window.Tawk_API) return;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://embed.tawk.to/6a2394128705f01c35097189/1jqdfkqfv';
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');
  document.head.appendChild(s);
}
*/

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
