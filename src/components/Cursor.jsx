import { useEffect, useRef, useCallback } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback(() => {
    const dx = mouseRef.current.x - posRef.current.x;
    const dy = mouseRef.current.y - posRef.current.y;
    posRef.current.x += dx * 0.15;
    posRef.current.y += dy * 0.15;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }
    requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    document.addEventListener('mousemove', onMove);
    requestAnimationFrame(updateCursor);
    return () => document.removeEventListener('mousemove', onMove);
  }, [updateCursor]);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-dot"></div>
      <div className="cursor-circle"></div>
      <span className="cursor-label"></span>
    </div>
  );
}
