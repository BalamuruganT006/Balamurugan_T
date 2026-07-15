/* =============================================
   BALAMURUGAN T — PORTFOLIO
   Main Application Script
   ============================================= */

// --- Project Data ---
const projects = {
  skeduler: {
    name: "SKEDULER",
    desc: "An automated timetable generator that takes the headache out of scheduling. Built to handle complex constraints and produce clean, conflict-free timetables for educational institutions.",
    lang: "JavaScript",
    year: "2026",
    status: "Deployed",
    url: "skeduler-nu.vercel.app",
    github: "https://github.com/BalamuruganT006/Skeduler_",
    stars: "1",
    details: "Skeduler automates the process of generating conflict-free timetables. It handles room allocations, teacher availability, and subject constraints to produce optimized schedules. Built with a clean UI and deployed on Vercel for instant access."
  },
  blockter: {
    name: "BLOCKTER: NEON FRONTIER",
    desc: "A futuristic arcade game where geometry meets light-speed reflexes. Navigate procedurally generated arenas, chain combos, and survive the neon rhythm.",
    lang: "JavaScript",
    year: "2026",
    status: "Deployed",
    url: "https://blockter-game-m8uv.vercel.app",
    github: "https://github.com/BalamuruganT006/blockter_game",
    details: "Blockter is an electrifying, fast-paced block manipulation game inspired by classic arcade action and modern audiovisual design. Navigate procedurally generated arenas, chain combos with modular block types (Reflective, Phantom, Magnetic, Time-Slip), and push deeper into a world of shifting blocks, pulse-synced music, and gravity-defying combos. Features dynamic rhythm-synced levels, a combo & multiplier system for high-score chasing, and visual effects like bloom, scanlines, and chromatic aberration."
  },
  pitracer: {
    name: "PI-TRACER",
    desc: "A high-fidelity execution visualizer for Python. Transform abstract code logic into interactive, step-by-step flow diagrams to debug with clarity.",
    lang: "Python",
    year: "2026",
    status: "Active",
    github: "https://github.com/BalamuruganT006/Pi-Tracer",
    details: "Pi-Tracer transforms how you understand Python code execution. Instead of staring at console output, watch your code come alive through interactive flow diagrams. Step through each line, see variable states, trace execution paths. A debugging experience that actually makes sense."
  },
  crisesfication: {
    name: "CRISESFICATION",
    desc: "A crisis classification system built with TypeScript. Designed to categorize and respond to different severity levels of incidents.",
    lang: "TypeScript",
    year: "2026",
    status: "Active",
    github: "https://github.com/BalamuruganT006/Crisesfication1",
    details: "Crisesfication provides a structured approach to incident classification. Using TypeScript's type system, it defines clear severity levels and response protocols, ensuring consistent handling across different crisis scenarios."
  },
  maxver: {
    name: "MAXVER",
    desc: "An AI personal assistant built with Python. Designed to help with everyday tasks through natural language interaction.",
    lang: "Python",
    year: "2025",
    status: "Active",
    github: "https://github.com/BalamuruganT006/MAXver",
    details: "MAXver is a personal AI assistant that leverages Python to provide intelligent task management and natural language understanding. Built to be lightweight yet capable, it demonstrates practical AI integration in everyday tools."
  },
  invoice: {
    name: "INVOICE GENERATOR",
    desc: "An automated invoice builder built with TypeScript. Generate professional invoices with minimal effort.",
    lang: "TypeScript",
    year: "2025",
    status: "Active",
    github: "https://github.com/BalamuruganT006/Invoice-generator",
    details: "A streamlined invoice generation tool that eliminates the manual overhead of creating professional invoices. Built with TypeScript for type safety and reliability, it handles calculations, formatting, and PDF generation."
  },
  max: {
    name: "MAX 5.0",
    desc: "An AI framework built with Python. A personal project exploring AI capabilities and framework design.",
    lang: "Python",
    year: "2026",
    status: "Active",
    github: "https://github.com/BalamuruganT006/MAX-5.0",
    details: "MAX 5.0 represents an evolution in personal AI frameworks. Built entirely in Python, it explores advanced AI capabilities while maintaining a clean, extensible architecture. A playground for pushing the boundaries of what's possible."
  }
};

// --- Initialize Lenis Smooth Scroll ---
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// --- Custom Cursor ---
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow
  function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover effects for elements with data-cursor
  const hoverElements = document.querySelectorAll('[data-cursor]');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      cursorLabel.textContent = el.getAttribute('data-cursor');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      cursorLabel.textContent = '';
    });
  });
}

// --- Magnetic Hover ---
function initMagnetic() {
  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.3;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// --- Preloader ---
function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    const bar = document.getElementById('preloaderBar');
    const mainContent = document.getElementById('mainContent');

    let count = 0;
    const target = 100;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Eased progress
      const eased = 1 - Math.pow(1 - progress, 3);
      count = Math.round(eased * target);

      counter.textContent = count;
      bar.style.width = count + '%';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Preloader complete
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            mainContent.style.opacity = '1';
            resolve();
          }
        });
      }
    }

    requestAnimationFrame(update);
  });
}

// --- Scroll Reveal Animations ---
function initScrollReveals() {
  gsap.registerPlugin(ScrollTrigger);

  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach((el, i) => {
    // Skip hero elements (they get their own animation)
    if (el.closest('.hero')) return;

    gsap.fromTo(el, {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: (i % 3) * 0.1,
    });
  });

  // Language bars animation
  const langFills = document.querySelectorAll('.lang-fill');
  langFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    gsap.to(fill, {
      width: width + '%',
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: fill,
        start: 'top 90%',
      }
    });
  });

  // Stat number count-up
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const text = stat.textContent;
    const isPlus = text.includes('+');
    const num = parseInt(text);

    if (!isNaN(num)) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
        },
        onUpdate: () => {
          stat.textContent = Math.round(obj.val) + (isPlus ? '+' : '');
        }
      });
    }
  });
}

// --- Hero Entrance Animation ---
function animateHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .fromTo('.hero-title-line:first-child', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-title-outline', { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.6')
    .fromTo('.hero-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2');
}

// --- Nav Scroll Behavior ---
function initNav() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      nav.style.opacity = scrollY > lastScroll ? '0' : '1';
    } else {
      nav.style.opacity = '1';
    }
    lastScroll = scrollY;
  });
}

// --- Smooth Scroll to Sections ---
function initSmoothNav() {
  const navLinks = document.querySelectorAll('[data-nav]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0 });
      }
    });
  });

  // Logo click scrolls to top
  document.getElementById('navLogo').addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0);
    }
  });
}

// --- Project Modal ---
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  // Open modal for internal projects
  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', (e) => {
      const projectKey = link.getAttribute('data-project');
      const project = projects[projectKey];

      // Only open modal for internal projects (not external links)
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        openModal(project);
      }
    });
  });

  function openModal(project) {
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal-hero">
        <h2 class="modal-project-name">${project.name}</h2>
        <p class="modal-project-desc">${project.desc}</p>
      </div>
      <div class="modal-meta">
        <div class="modal-meta-item">
          <label>TECHNOLOGY</label>
          <span>${project.lang}</span>
        </div>
        <div class="modal-meta-item">
          <label>YEAR</label>
          <span>${project.year}</span>
        </div>
        <div class="modal-meta-item">
          <label>STATUS</label>
          <span>${project.status}</span>
        </div>
      </div>
      <div class="modal-body">
        <p>${project.details}</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:2rem;">
          ${project.github ? `<a href="${project.github}" target="_blank" class="modal-link">GITHUB &rarr;</a>` : ''}
          ${project.url ? `<a href="${project.url}" target="_blank" class="modal-link">LIVE SITE &rarr;</a>` : ''}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.fromTo('.modal-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
  }

  function closeModal() {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      }
    });
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// --- Work Item Hover Effects ---
function initWorkHover() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        backgroundColor: 'rgba(245, 245, 240, 0.02)',
        duration: 0.3
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        backgroundColor: 'transparent',
        duration: 0.3
      });
    });
  });
}

// --- Parallax Effects ---
function initParallax() {
  gsap.to('.hero-title-line:first-child', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });

  gsap.to('.hero-title-outline', {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for preloader
  await initPreloader();

  // Init all systems
  initLenis();
  initCursor();
  initMagnetic();
  initNav();
  initSmoothNav();
  initProjectModal();
  initWorkHover();

  // Init GSAP after a tick
  requestAnimationFrame(() => {
    initScrollReveals();
    initParallax();
    animateHero();
  });
});
