import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const preloaderRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const counter = counterRef.current;
    const bar = barRef.current;
    const preloader = preloaderRef.current;
    let count = 0;
    const target = 100;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      count = Math.round(eased * target);
      counter.textContent = count;
      bar.style.width = count + '%';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            onComplete();
          }
        });
      }
    }
    requestAnimationFrame(update);
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-inner">
        <div className="preloader-counter" ref={counterRef}>0</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" ref={barRef}></div>
        </div>
        <div className="preloader-label">LOADING</div>
      </div>
    </div>
  );
}
