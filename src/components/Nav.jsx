import { useCallback } from 'react';

export default function Nav({ lenisRef }) {
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    if (href === '#') {
      if (lenisRef?.current) lenisRef.current.scrollTo(0);
      return;
    }
    const target = document.querySelector(href);
    if (target && lenisRef?.current) lenisRef.current.scrollTo(target, { offset: 0 });
  }, [lenisRef]);

  return (
    <nav className="nav" id="nav">
      <a href="#" className="nav-logo" data-magnetic data-cursor="HOME" onClick={(e) => handleNavClick(e, '#')}>
        B<span className="nav-logo-accent">T</span>
      </a>
      <div className="nav-links">
        <a href="#work" className="nav-link" data-magnetic data-cursor="WORK" onClick={(e) => handleNavClick(e, '#work')}>/WORK</a>
        <a href="#about" className="nav-link" data-magnetic data-cursor="ABOUT" onClick={(e) => handleNavClick(e, '#about')}>/ABOUT</a>
        <a href="#contact" className="nav-link" data-magnetic data-cursor="CONTACT" onClick={(e) => handleNavClick(e, '#contact')}>/CONTACT</a>
        </div>
    </nav>
  );
}
