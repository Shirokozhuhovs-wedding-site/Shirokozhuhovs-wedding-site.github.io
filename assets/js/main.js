```js
const nav = document.getElementById('siteNav');
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('navMenu');
const navLinks = menu ? Array.from(menu.querySelectorAll('a')) : [];
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const sections = Array.from(document.querySelectorAll('main section[id], header[id], main header'));

function closeMenu() {
  if (!menu || !toggle) return;
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

function openMenu() {
  if (!menu || !toggle) return;
  menu.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.contains('is-open');
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('is-open')) return;
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 840) {
      closeMenu();
    }
  }, { passive: true });
}

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }
}, { passive: true });

/* reveal animation safe mode for iPhone/Safari */
let revealObserver = null;

function showAllRevealItems() {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if ('IntersectionObserver' in window) {
  try {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (revealObserver) {
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } catch (e) {
    showAllRevealItems();
  }

  try {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => {
      if (section.id) sectionObserver.observe(section);
    });
  } catch (e) {
    /* do nothing */
  }
} else {
  showAllRevealItems();
}

/* fallback: if Safari does not trigger observer, content still appears */
window.addEventListener('load', () => {
  setTimeout(showAllRevealItems, 300);
});

setTimeout(showAllRevealItems, 800);

const weddingDate = new Date(2026, 5, 27, 15, 0, 0).getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

/* 27 июня 2026, 15:00 по локальному времени устройства */
const weddingDate = new Date(2026, 5, 27, 15, 0, 0);

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (isNaN(diff) || diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

