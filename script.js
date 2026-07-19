// ============================================================
//  PROXY URL — paste your Google Apps Script Web App URL below
// ============================================================
const PROXY_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';
// ============================================================

const TG_BOT_TOKEN = '8832194004:AAFA5D8jBpwNbxfOTCR70Lzb74uczrD6Jco';   // from @BotFather
const TG_CHAT_ID   = '1776805886';     // your personal chat ID
// ============================================================

// ====== NAVBAR SCROLL ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
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

// ====== CONTACT FORM → TELEGRAM BOT ======
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submit-btn');

function validateForm() {
  const fields = [
    { id: 'name',     label: 'Your Name' },
    { id: 'phone',    label: 'Phone Number' },
    { id: 'service',  label: 'Service Required' },
    { id: 'location', label: 'Your Location' }
  ];
  let valid = true;
  fields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#ef4444';
      el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
      valid = false;
    }
  });
  return valid;
}

function buildTelegramMessage(data) {
  const { name, phone, service, location, date, message } = data;
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return (
    '🌴 *New Booking Request – Unnikrishnan V C*\n\n' +
    '👤 *Name:* ' + name + '\n' +
    '📞 *Phone:* ' + phone + '\n' +
    '🛠 *Service:* ' + service + '\n' +
    '📍 *Location:* ' + location + '\n' +
    (date    ? '📅 *Preferred Date:* ' + date    + '\n' : '') +
    (message ? '📝 *Details:* '       + message + '\n' : '') +
    '\n⏰ Submitted: ' + now
  );
}

async function sendToTelegram(text) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:     document.getElementById('name').value.trim(),
      phone:    document.getElementById('phone').value.trim(),
      service:  document.getElementById('service').value,
      location: document.getElementById('location').value.trim(),
      date:     document.getElementById('prefdate')?.value || '',
      message:  document.getElementById('message').value.trim()
    })
  });
  if (!res.ok) throw new Error('Proxy error: ' + res.status);
  return res.json();
},
    body: JSON.stringify({
      chat_id:    TG_CHAT_ID,
      text:       text,
      parse_mode: 'Markdown'
    })
  });
  if (!res.ok) throw new Error('Telegram API error: ' + res.status);
  return res.json();
}

if (contactForm) {
  // Clear red borders on user input
  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.style.borderColor = '';
      el.style.boxShadow   = '';
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Disable button & show loading state
    submitBtn.disabled     = true;
    submitBtn.textContent  = 'Sending...';
    submitBtn.style.opacity = '0.75';

    const formData = {
      name:    document.getElementById('name').value.trim(),
      phone:   document.getElementById('phone').value.trim(),
      service: document.getElementById('service').value,
      location:document.getElementById('location').value.trim(),
      date:    document.getElementById('prefdate')?.value || '',
      message: document.getElementById('message').value.trim()
    };

    try {
      await sendToTelegram(buildTelegramMessage(formData));
      // Success
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } catch (err) {
      // Error — re-enable button and alert
      submitBtn.disabled     = false;
      submitBtn.textContent  = 'Send Booking Request';
      submitBtn.style.opacity = '1';
      console.error(err);
      alert('Could not send your request. Please call directly or try again.');
    }
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



