export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="section-header" data-reveal>
        <span className="section-number">03</span>
        <span className="section-title">CONTACT</span>
      </div>

      <div className="contact-content">
        <div className="contact-cta" data-reveal>
          <p className="contact-big-text">
            Let's build<br />something <span className="contact-accent">together.</span>
          </p>
        </div>

        <div className="contact-links" data-reveal>
          <a href="mailto:bala4256t@gmail.com" className="contact-link-large" data-magnetic data-cursor="EMAIL">
            <span className="contact-link-label">EMAIL</span>
            <span className="contact-link-value">bala4256t@gmail.com</span>
            <span className="contact-link-arrow">&rarr;</span>
          </a>
          <a href="https://github.com/BalamuruganT006" target="_blank" rel="noopener noreferrer" className="contact-link-large" data-magnetic data-cursor="GITHUB">
            <span className="contact-link-label">GITHUB</span>
            <span className="contact-link-value">github.com/BalamuruganT006</span>
            <span className="contact-link-arrow">&rarr;</span>
          </a>
          <a href="https://x.com/BALAMURUGA84545" target="_blank" rel="noopener noreferrer" className="contact-link-large" data-magnetic data-cursor="TWITTER">
            <span className="contact-link-label">TWITTER / X</span>
            <span className="contact-link-value">@BALAMURUGA84545</span>
            <span className="contact-link-arrow">&rarr;</span>
          </a>
          <a href="https://www.linkedin.com/in/balamurugan-t4256" target="_blank" rel="noopener noreferrer" className="contact-link-large" data-magnetic data-cursor="LINKEDIN">
            <span className="contact-link-label">LINKEDIN</span>
            <span className="contact-link-value">linkedin.com/in/balamurugan-t4256</span>
            <span className="contact-link-arrow">&rarr;</span>
          </a>
        </div>

        <div className="contact-footer" data-reveal>
          <div className="contact-footer-left">
            <span>DESIGNED & DEVELOPED BY BALAMURUGAN T</span>
          </div>
          <div className="contact-footer-right">
            <span>&copy; 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
