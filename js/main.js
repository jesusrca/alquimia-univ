/**
 * Universidad Alquimia - Quibayo 2026
 * Main JavaScript File
 */

// ============================================
// Force Scroll to Top on Reload
// ============================================
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ============================================
// Hero Entrance Animation (Triggered by Preloader)
// ============================================
function startHeroAnimation() {
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 2 } });

  heroTl.fromTo(".hero__title",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.1 }
  )
    .fromTo(".hero__location",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.5"
    )
    .fromTo(".hero__dates",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.5"
    )
    .fromTo(".hero__form",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.5"
    );
}

// ============================================
// Preloader Animation
// ============================================
async function initPreloader() {
  const container = document.querySelector('.preloader-content');
  const preloader = document.getElementById('preloader');

  if (!container || !preloader) {
    startHeroAnimation(); // Fallback
    return;
  }

  try {
    // Reuse the same intricate SVG
    const response = await fetch('assets/174e3b42b6e852b56e5244f2aca1bb877cbabef0.svg');
    const svgText = await response.text();

    container.innerHTML = svgText;
    const svg = container.querySelector('svg');

    if (!svg) { throw new Error("No SVG found"); }

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    const paths = svg.querySelectorAll('path');

    // Initial state: Hidden
    gsap.set(paths, {
      opacity: 0,
      fill: "#1a1a1a",
      fillOpacity: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloader, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => {
            preloader.remove();
            startHeroAnimation();
          }
        });
      }
    });

    // Simple Fade In Animation (No line drawing)
    tl.to(paths, {
      opacity: 1,
      fillOpacity: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    // Hold for a moment
    tl.to({}, { duration: 0.5 });

  } catch (err) {
    console.error("Preloader error:", err);
    preloader.style.display = 'none';
    startHeroAnimation();
  }
}

// Start everything on load
window.addEventListener('load', initPreloader);

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
    let delayAcc = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('active')) {
        // Add stagger delay relative to the batch
        entry.target.style.transitionDelay = `${0.2 + delayAcc}s`;
        entry.target.classList.add('active');
        delayAcc += 0.15;
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

  // Close other accordion items
  const allDays = document.querySelectorAll('.program-day');
  allDays.forEach(item => {
    if (item !== day) {
      item.classList.remove('is-active');
      const toggle = item.querySelector('.program-day__toggle');
      if (toggle) toggle.textContent = 'Ver itinerario';
    }
  });

  // Toggle current item
  if (isActive) {
    day.classList.remove('is-active');
    const toggleBtn = day.querySelector('.program-day__toggle');
    if (toggleBtn) toggleBtn.textContent = 'Ver itinerario';
  } else {
    day.classList.add('is-active');
    const toggleBtn = day.querySelector('.program-day__toggle');
    if (toggleBtn) toggleBtn.textContent = 'Ocultar itinerario';
  }

  // Update Lenis/Scroll after transition
  // We wait a bit for the animation to complete or be in progress
  setTimeout(() => {
    if (typeof lenis !== 'undefined') {
      lenis.resize();
    }
    // Also trigger a window resize event as a fallback for other libraries
    window.dispatchEvent(new Event('resize'));
  }, 600);
}

// ============================================
// Journey Logo Drawing Animation
// ============================================
async function initJourneyLogoAnimation() {
  const container = document.querySelector('#phi-target');
  if (!container) return;

  try {
    // Fetch the large SVG to avoid inlining issues/limitations
    const response = await fetch('assets/174e3b42b6e852b56e5244f2aca1bb877cbabef0.svg');
    const svgText = await response.text();

    // Inject and setup
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    const paths = svg.querySelectorAll('path');

    // Initial state: transparent with light stroke
    gsap.set(paths, {
      stroke: "#8B908F",
      strokeWidth: 0.8,
      fillOpacity: 0,
      opacity: 0
    });

    // Create ScrollTriggered Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#transformacion-viaje",
        start: "top 70%",
        once: true
      }
    });

    // 1. Fade in the lines first
    tl.to(paths, {
      opacity: 1,
      duration: 1,
      stagger: 0.002,
      ease: "power2.out"
    });

    // 2. Animate the path drawing (constructing)
    // We use a safe way to get length for many paths
    paths.forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power1.inOut"
      }, 0.5); // Start slightly after fade in
    });

    // 3. Fade in the fills once drawing is mostly done
    tl.to(paths, {
      fillOpacity: 0.8,
      duration: 2,
      stagger: 0.003,
      ease: "power1.inOut"
    }, "-=1.5");

    // 4. Subtle scale up for a premium feel
    tl.from(svg, {
      scale: 0.95,
      duration: 3,
      ease: "power2.out"
    }, 0);

  } catch (err) {
    console.error("Failed to load or animate SVG:", err);
  }
}

// Call on load
window.addEventListener('load', initJourneyLogoAnimation);

// ============================================
// Initialize
// ============================================
console.log('Quibayo 2026 - Universidad de la Alquimia');
console.log('Website initialized successfully');
