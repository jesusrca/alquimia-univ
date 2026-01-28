/**
 * Universidad Alquimia - Qvilibrio 2026
 * Main JavaScript File
 * 
 * Features:
 * - Lenis smooth scrolling
 * - Mobile menu toggle
 * - Scroll reveal animations
 * - Header scroll effects
 * - Form validation
 * - Performance optimizations
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    lenisOptions: {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    },
    scrollRevealOptions: {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    }
  };

  // ============================================
  // Lenis Smooth Scroll Initialization
  // ============================================
  let lenis;

  function initLenis() {
    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis library not loaded. Smooth scrolling disabled.');
      return;
    }

    lenis = new Lenis(CONFIG.lenisOptions);

    // Lenis request animation frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Anchor link smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          closeMobileMenu();
          
          // Scroll to target
          lenis.scrollTo(target, {
            offset: -80, // Account for fixed header
            duration: 1.5
          });
        }
      });
    });

    console.log('✓ Lenis smooth scrolling initialized');
  }

  // ============================================
  // Mobile Menu
  // ============================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
      const isActive = navMenu.classList.contains('active');
      
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    console.log('✓ Mobile menu initialized');
  }

  function openMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    navMenu.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu || !menuToggle) return;
    
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });

    console.log('✓ Header scroll effects initialized');
  }

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    
    if (!elements.length) return;

    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 50);
          
          // Unobserve after revealing (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    }, CONFIG.scrollRevealOptions);

    elements.forEach(element => {
      observer.observe(element);
    });

    console.log(`✓ Scroll reveal initialized for ${elements.length} elements`);
  }

  // ============================================
  // Form Validation & Submission
  // ============================================
  function initFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!validateForm(data)) {
        return;
      }

      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success
        showNotification('¡Gracias por tu registro! Te contactaremos pronto.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });

    console.log('✓ Form validation initialized');
  }

  function validateForm(data) {
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Por favor, ingresa tu nombre completo');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Por favor, ingresa un correo electrónico válido');
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!data.phone || !phoneRegex.test(data.phone) || data.phone.length < 9) {
      errors.push('Por favor, ingresa un número de teléfono válido');
    }

    // Terms validation
    if (!data.terms) {
      errors.push('Debes aceptar los términos y condiciones');
    }

    if (errors.length > 0) {
      showNotification(errors.join('\n'), 'error');
      return false;
    }

    return true;
  }

  // ============================================
  // Notification System
  // ============================================
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
      existing.remove();
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
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: '9999',
      maxWidth: '400px',
      fontSize: '14px',
      lineHeight: '1.5',
      whiteSpace: 'pre-line',
      animation: 'slideInRight 0.3s ease-out'
    });

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
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
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // ============================================
  // Image Lazy Loading (for older browsers)
  // ============================================
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading is supported
      const images = document.querySelectorAll('img[loading="lazy"]');
      console.log(`✓ Native lazy loading for ${images.length} images`);
    } else {
      // Fallback for older browsers
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
      console.log(`✓ Lazy loading fallback for ${images.length} images`);
    }
  }

  // ============================================
  // Performance Monitoring
  // ============================================
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }
    }

    // Log page load time
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`✓ Page loaded in ${pageLoadTime}ms`);
    });
  }

  // ============================================
  // Active Navigation Link
  // ============================================
  function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to current link
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    console.log('✓ Active navigation tracking initialized');
  }

  // ============================================
  // Security: Sanitize User Input
  // ============================================
  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // ============================================
  // Accessibility: Keyboard Navigation
  // ============================================
  function initKeyboardNavigation() {
    // Trap focus in mobile menu when open
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!navMenu || !menuToggle) return;

    document.addEventListener('keydown', function(e) {
      if (!navMenu.classList.contains('active')) return;

      const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    console.log('✓ Keyboard navigation initialized');
  }

  // ============================================
  // Initialize Everything
  // ============================================
  function init() {
    console.log('🚀 Initializing Universidad Alquimia Landing Page...');

    // Core functionality
    initLenis();
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initFormValidation();
    initActiveNavigation();
    initKeyboardNavigation();
    
    // Performance optimizations
    initLazyLoading();
    monitorPerformance();

    console.log('✅ All systems initialized successfully!');
  }

  // ============================================
  // DOM Ready
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================
  // Expose utilities to global scope (for WordPress)
  // ============================================
  window.AlquimiaLanding = {
    lenis,
    showNotification,
    sanitizeInput,
    closeMobileMenu,
    openMobileMenu
  };

})();
