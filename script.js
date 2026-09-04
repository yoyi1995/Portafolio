/* ========================================
   Jordy Diaz · Portfolio — interactions
======================================== */

(() => {
  'use strict';

  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Navbar scroll state =====
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Reveal on scroll =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animations
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  // ===== Counter animation =====
  const counters = document.querySelectorAll('.stat__num');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1600;
          const startTime = performance.now();
          const animate = (now) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(eased * target);
            if (t < 1) requestAnimationFrame(animate);
            else el.textContent = target;
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(c => counterObserver.observe(c));

  // ===== Smooth scroll with offset =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===== Active nav link on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');
  const setActive = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--text)';
        a.style.background = 'var(--surface-2)';
      } else {
        a.style.background = '';
      }
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // ===== Particle network background =====
  const canvas = document.getElementById('particles');
  if (canvas && window.matchMedia('(min-width: 720px)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, mouse = { x: -1000, y: -1000 };
    const PARTICLE_COUNT = 70;
    const LINK_DIST = 140;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Update + draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
      });

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }

  // ===== Subtle parallax on hero code card =====
  const heroVisual = document.querySelector('.hero__visual');
  if (heroVisual && window.matchMedia('(min-width: 900px)').matches) {
    const codeCard = heroVisual.querySelector('.code-card');
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (codeCard) {
        codeCard.style.transform = `rotateY(${-6 + x * 8}deg) rotateX(${2 - y * 8}deg) translateY(0)`;
      }
    });
    heroVisual.addEventListener('mouseleave', () => {
      if (codeCard) codeCard.style.transform = '';
    });
  }
})();
