/* ==========================================
   POWERWASH PRO - Interactive JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Sticky Navbar ----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile Menu ----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ---- Before/After Sliders ----
  document.querySelectorAll('[data-ba-slider]').forEach(slider => {
    const rangeInput = slider.querySelector('input[type="range"]');
    const afterImg = slider.querySelector('.ba-after');
    const divider = slider.querySelector('.ba-divider');
    const handle = slider.querySelector('.ba-handle');

    const updateSlider = (value) => {
      const percent = value;
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      divider.style.left = `${percent}%`;
      handle.style.left = `${percent}%`;
    };

    rangeInput.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    // Touch/mouse drag support
    let isDragging = false;

    const getPercent = (e) => {
      const rect = slider.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    };

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      const percent = getPercent(e);
      rangeInput.value = percent;
      updateSlider(percent);
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      const percent = getPercent(e);
      rangeInput.value = percent;
      updateSlider(percent);
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const percent = getPercent(e);
        rangeInput.value = percent;
        updateSlider(percent);
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const percent = getPercent(e);
        rangeInput.value = percent;
        updateSlider(percent);
      }
    }, { passive: true });

    document.addEventListener('mouseup', () => { isDragging = false; });
    document.addEventListener('touchend', () => { isDragging = false; });

    // Initialize
    updateSlider(50);
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Counter Animation ----
  const counterElements = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          entry.target.textContent = current + '+';

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // ---- Floating CTA / Back to Top ----
  const floatingCta = document.getElementById('floatingCta');
  const backToTop = document.getElementById('backToTop');

  const handleFloatingCta = () => {
    floatingCta.classList.toggle('visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', handleFloatingCta, { passive: true });
  handleFloatingCta();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Form Handling ----
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('form-submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;

    if (!name || !phone || !service) {
      // Shake the button
      submitBtn.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => { submitBtn.style.animation = ''; }, 500);
      return;
    }

    // Simulate form submission
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Estimate Requested!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #2E7D32, #4CAF50)';

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed; top: 24px; right: 24px; z-index: 10000;
        background: linear-gradient(135deg, #2E7D32, #4CAF50);
        color: white; padding: 16px 28px; border-radius: 12px;
        font-weight: 600; font-size: 0.95rem;
        box-shadow: 0 8px 30px rgba(46,125,50,0.3);
        animation: slideIn 0.4s ease-out;
        display: flex; align-items: center; gap: 10px;
      `;
      successMsg.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Thank you! We'll contact you within 24 hours.
      `;
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.4s ease-in forwards';
        setTimeout(() => successMsg.remove(), 400);
      }, 4000);

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });

  // ---- Phone Number Formatting ----
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);

    if (value.length >= 7) {
      e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 4) {
      e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      e.target.value = `(${value}`;
    }
  });

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#42A5F5';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Parallax-lite on hero ----
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }
});

// ---- Inject Keyframe Animations ----
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  @keyframes slideIn {
    from { transform: translateX(120%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(120%); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);
