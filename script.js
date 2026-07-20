// ====== NAVBAR SCROLL ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

const closeMenu = () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});

// ====== SCROLL REVEAL ======
const revealTargets = document.querySelectorAll(
  '.service-card, .why-card, .step, .about-grid, .contact-card, .about-highlights .highlight-item'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 100 + 'ms';
  revealObserver.observe(el);
});

// ====== CONTACT FORM (Google Forms submission) ======
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const location = document.getElementById('location').value.trim();

    if (!name || !phone || !service || !location) {
      [{ id: 'name', val: name }, { id: 'phone', val: phone },
       { id: 'service', val: service }, { id: 'location', val: location }].forEach(({ id, val }) => {
        const el = document.getElementById(id);
        if (!val) el.style.borderColor = '#ef4444';
        else el.style.borderColor = '';
      });
      return;
    }

    contactForm.submit();

    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  });

  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
}

// ====== SMOOTH ACTIVE LINK HIGHLIGHTING ======
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navItems.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active-link');
  });
}, { passive: true });

// ====== STATS COUNTER ANIMATION ======
const stats = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = el.textContent;
      const num    = parseInt(target);
      const suffix = target.replace(/[0-9]/g, '');
      let start    = 0;
      const step   = Math.ceil(num / 50);
      const timer  = setInterval(() => {
        start = Math.min(start + step, num);
        el.textContent = start + suffix;
        if (start >= num) clearInterval(timer);
      }, 30);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
stats.forEach(s => statsObserver.observe(s));






