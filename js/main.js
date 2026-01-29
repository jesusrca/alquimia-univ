/**
 * Universidad Alquimia - Quibayo 2026
 * Main JavaScript File
 */

// ============================================
// Lenis Smooth Scroll
// ============================================
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// ============================================
// Mobile Menu
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  const navLinks = mainNav.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// Scroll Indicator
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
      lenis.scrollTo(firstSection, {
        offset: 0,
        duration: 1.5,
      });
    }
  });
}

// ============================================
// Hero Email Form
// ============================================
const heroEmailForm = document.getElementById('heroEmailForm');

if (heroEmailForm) {
  heroEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = heroEmailForm.querySelector('.hero__email-input');
    const email = emailInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showNotification('Por favor ingresa un correo electrónico válido', 'error');
      return;
    }

    // Here you would normally send the email to your backend
    console.log('Email submitted:', email);

    // Show success message
    showNotification('¡Gracias por tu interés! Te contactaremos pronto.', 'success');

    // Clear the form
    emailInput.value = '';
  });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    backgroundColor: type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3',
    color: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: '10000',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out',
  });

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// Enhanced Scroll Reveal
// ============================================
const revealObserverOptions = {
  threshold: 0.01, // Trigger as soon as 1% is visible
  rootMargin: '0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, revealObserverOptions);

// Function to initialize reveal elements
function initReveals() {
  const elements = document.querySelectorAll('.reveal-up');

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.05 });

  elements.forEach(el => observer.observe(el));

  // Fallback: Check on scroll manually (for safe measure)
  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('active');
      }
    });
  });
}

// Kick off
initReveals();
window.addEventListener('load', initReveals);

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      lenis.scrollTo(targetElement, {
        offset: -80, // Account for fixed header
        duration: 1.2,
      });
    }
  });
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ============================================
// Program Accordion
// ============================================
function toggleAccordion(element) {
  const day = element.parentElement;
  const isActive = day.classList.contains('is-active');

  // Close other accordion items (optional, but requested for modern effect)
  const allDays = document.querySelectorAll('.program-day');
  allDays.forEach(item => {
    item.classList.remove('is-active');
    const toggle = item.querySelector('.program-day__toggle');
    if (toggle) toggle.textContent = 'Ver itinerario';
  });

  if (!isActive) {
    day.classList.add('is-active');
    const toggleBtn = day.querySelector('.program-day__toggle');
    if (toggleBtn) toggleBtn.textContent = 'Ocultar itinerario';
  }
}

// ============================================
// Initialize
// ============================================
console.log('Quibayo 2026 - Universidad de la Alquimia');
console.log('Website initialized successfully');
