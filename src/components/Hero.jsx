import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroCanvas from './HeroCanvas';

export default function Hero({ visible }) {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-title-line:first-child', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-title-outline', { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2');
  }, [visible]);

  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero-content">
        <div className="hero-eyebrow" data-reveal>FRONTEND DEVELOPER</div>
        <h1 className="hero-title" data-reveal>
          <span className="hero-title-line">BALAMURUGAN</span>
          <span className="hero-title-line hero-title-outline">T</span>
        </h1>
        <div className="hero-bottom" data-reveal>
          <div className="hero-location">BASED IN INDIA</div>
          <div className="hero-status">
            <span className="status-dot"></span> AVAILABLE FOR WORK
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator" data-reveal>
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}