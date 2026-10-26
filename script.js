// Mobile Navigation Toggle
const nav = document.getElementById('mainNav');
const menu = document.getElementById('menuToggle');

if (menu && nav) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// Reveal Animation on Scroll with IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
} else {
  // Fallback for older browsers
  revealElements.forEach(el => el.classList.add('visible'));
}

// Interactive Cursor Glow Tracker
const glow = document.querySelector('.cursor-glow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// Back to Top Button
const topBtn = document.getElementById('scrollTopBtn');
if (topBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
