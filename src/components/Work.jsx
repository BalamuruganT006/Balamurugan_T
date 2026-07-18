import { workItems } from '../data/projects';

export default function Work({ onProjectClick }) {
  const handleClick = (e, item) => {
    if (!item.external) {
      e.preventDefault();
      onProjectClick(item.id);
    }
  };

  return (
    <section className="section work" id="work">
      <div className="section-header" data-reveal>
        <span className="section-number">01</span>
        <span className="section-title">SELECTED WORK</span>
        <span className="section-count">08 PROJECTS</span>
      </div>

      <div className="work-grid">
        {workItems.map((item, idx) => (
          <a
            key={item.id}
            href={item.href}
            className="work-item"
            data-reveal
            data-cursor={item.external ? 'OPEN' : 'VIEW'}
            onClick={(e) => handleClick(e, item)}
          >
            <div className="work-item-index">{String(idx + 1).padStart(2, '0')}</div>
            <div className="work-item-content">
              <h3 className="work-item-title">{item.title}</h3>
              <p className="work-item-desc">{item.desc}</p>
            </div>
            <div className="work-item-meta">
              <span className="work-item-tag">{item.tag}</span>
              <span className="work-item-year">{item.year}</span>
            </div>
            <div className="work-item-preview" data-preview>
              <div className={`preview-gradient ${item.gradient}`}></div>
              <span className="preview-cta">{item.external ? 'OPEN LIVE' : 'VIEW PROJECT'}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
