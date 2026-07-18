import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function ProjectModal({ project, onClose, lenisRef }) {
  const modalRef = useRef(null);

  const close = useCallback(() => {
    if (!modalRef.current) return;
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
        document.body.style.overflow = '';
        if (lenisRef?.current) lenisRef.current.start();
      }
    });
  }, [onClose, lenisRef]);

  useEffect(() => {
    if (!project || !modalRef.current) return;
    document.body.style.overflow = 'hidden';
    if (lenisRef?.current) lenisRef.current.stop();

    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.fromTo('.modal-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, close, lenisRef]);

  if (!project) return null;

  return (
    <div
      className="project-modal active"
      ref={modalRef}
      onClick={(e) => { if (e.target === modalRef.current) close(); }}
    >
      <button className="modal-close" data-cursor="CLOSE" data-magnetic onClick={close}>&times;</button>
      <div className="modal-content">
        <div className="modal-hero">
          <h2 className="modal-project-name">{project.name}</h2>
          <p className="modal-project-desc">{project.desc}</p>
        </div>
        <div className="modal-meta">
          <div className="modal-meta-item">
            <label>TECHNOLOGY</label>
            <span>{project.lang}</span>
          </div>
          <div className="modal-meta-item">
            <label>YEAR</label>
            <span>{project.year}</span>
          </div>
          <div className="modal-meta-item">
            <label>STATUS</label>
            <span>{project.status}</span>
          </div>
        </div>
        <div className="modal-body">
          <p>{project.details}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link">GITHUB &rarr;</a>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="modal-link">LIVE SITE &rarr;</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
