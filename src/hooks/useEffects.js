import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => { lenis.destroy(); };
  }, []);

  return lenisRef;
}

export function useEffects(ready) {
  const lenisRef = useRef(null);

  // Lenis
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [ready]);

  // Magnetic hover
  useEffect(() => {
    if (!ready) return;
    const cleanups = [];

    const attach = () => {
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    };

    attach();
    const observer = new MutationObserver(() => {
      cleanups.forEach(fn => fn());
      cleanups.length = 0;
      attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach(fn => fn());
    };
  }, [ready]);

  // Scroll reveals + stats + lang bars
  useEffect(() => {
    if (!ready) return;
    let rafId = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        if (el.closest('.hero')) return;
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          delay: (i % 3) * 0.1,
        });
      });

      document.querySelectorAll('.lang-fill').forEach(fill => {
        const width = fill.getAttribute('data-width');
        gsap.to(fill, { width: width + '%', duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: fill, start: 'top 90%' } });
      });

      document.querySelectorAll('.stat-number').forEach(stat => {
        const text = stat.textContent;
        const isPlus = text.includes('+');
        const num = parseInt(text);
        if (!isNaN(num)) {
          const obj = { val: 0 };
          gsap.to(obj, { val: num, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: stat, start: 'top 90%' },
            onUpdate: () => { stat.textContent = Math.round(obj.val) + (isPlus ? '+' : ''); }
          });
        }
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  // Parallax
  useEffect(() => {
    if (!ready) return;
    let rafId = requestAnimationFrame(() => {
      gsap.to('.hero-title-line:first-child', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.hero-title-outline', {
        yPercent: -25, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  // Work hover
  useEffect(() => {
    if (!ready) return;
    const cleanups = [];
    document.querySelectorAll('.work-item').forEach(item => {
      const onEnter = () => gsap.to(item, { backgroundColor: 'rgba(245, 245, 240, 0.02)', duration: 0.3 });
      const onLeave = () => gsap.to(item, { backgroundColor: 'transparent', duration: 0.3 });
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, [ready]);

  // Nav scroll
  useEffect(() => {
    if (!ready) return;
    const nav = document.getElementById('nav');
    if (!nav) return;
    let lastScroll = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      nav.style.opacity = scrollY > 100 ? (scrollY > lastScroll ? '0' : '1') : '1';
      lastScroll = scrollY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [ready]);

  // Cursor hover labels
  useEffect(() => {
    if (!ready) return;
    const cleanups = [];
    const attach = () => {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        const onEnter = () => {
          document.body.classList.add('cursor-hover');
          const label = document.querySelector('.cursor-label');
          if (label) label.textContent = el.getAttribute('data-cursor');
        };
        const onLeave = () => {
          document.body.classList.remove('cursor-hover');
          const label = document.querySelector('.cursor-label');
          if (label) label.textContent = '';
        };
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    };

    attach();
    const observer = new MutationObserver(() => {
      cleanups.forEach(fn => fn());
      cleanups.length = 0;
      attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach(fn => fn());
    };
  }, [ready]);

  return lenisRef;
}
