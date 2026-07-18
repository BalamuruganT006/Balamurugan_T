export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-header" data-reveal>
        <span className="section-number">02</span>
        <span className="section-title">ABOUT</span>
      </div>

      <div className="about-content">
        <div className="about-statement" data-reveal>
          <p className="about-big-text">
            I build interfaces that<br />
            <span className="about-accent">feel considered.</span>
          </p>
        </div>

        <div className="about-body" data-reveal>
          <div className="about-text-col">
            <p>
              Frontend developer with a focus on crafting clean, performant web experiences. I work across JavaScript, Python, and TypeScript to ship projects that are both functional and well-designed.
            </p>
            <p>
              From automated timetable generators to AI personal assistants, browser games to collaborative whiteboards, I approach every project with the same principle: make it work, make it right, make it fast.
            </p>
          </div>
        </div>

        <div className="about-pullquote" data-reveal>
          <blockquote>
            "The details are not the details. They make the design."
          </blockquote>
          <cite>- Charles Eames</cite>
        </div>

        <div className="about-stats" data-reveal>
          <div className="stat">
            <span className="stat-number">37</span>
            <span className="stat-label">REPOSITORIES</span>
          </div>
          <div className="stat">
            <span className="stat-number">18</span>
            <span className="stat-label">ORIGINAL PROJECTS</span>
          </div>
          <div className="stat">
            <span className="stat-number">22</span>
            <span className="stat-label">FOLLOWERS</span>
          </div>
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">LANGUAGES</span>
          </div>
        </div>

        <div className="about-languages" data-reveal>
          <h4 className="about-subtitle">TOOLS & LANGUAGES</h4>
          <div className="lang-grid">
            {[
              ['JavaScript', 90], ['Python', 85], ['TypeScript', 75],
              ['Java', 50], ['C#', 40], ['HTML/CSS', 95],
            ].map(([name, width]) => (
              <div className="lang-item" key={name}>
                <span className="lang-name">{name}</span>
                <div className="lang-bar"><div className="lang-fill" data-width={width}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
