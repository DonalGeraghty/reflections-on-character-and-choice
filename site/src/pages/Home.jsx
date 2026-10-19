import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Callout, Phrase } from '../components/Blocks.jsx';
import { chapters, meta, principles, reflectionUrl } from '../utils.js';

export default function Home() {
  useEffect(() => {
    document.title = meta.title;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <h1>{meta.title}</h1>
        <p className="hero-subtitle">{meta.subtitle}</p>
        {meta.tip && <Callout variant={meta.tip.variant} text={meta.tip.text} />}
      </header>

      <section className="principles" aria-labelledby="principles-heading">
        <h2 id="principles-heading" className="visually-hidden">
          Guiding Principles
        </h2>
        <Phrase text={principles.phrase} large />
        {principles.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <div className="themes">
          {principles.themes.map((t) => (
            <article key={t.title} className="theme-card">
              <h3>
                {t.emoji && <span aria-hidden="true">{t.emoji}</span>} {t.title}
              </h3>
              <p>{t.text}</p>
              {t.links?.length > 0 && (
                <p className="theme-links">
                  <span className="theme-links-label">Explore</span>
                  {t.links.map((l, i) => {
                    const to = reflectionUrl(l.target);
                    return to ? (
                      <Link key={i} to={to}>
                        {l.label}
                      </Link>
                    ) : (
                      <span key={i}>{l.label}</span>
                    );
                  })}
                </p>
              )}
            </article>
          ))}
        </div>

        {principles.outro.map((p, i) => (
          <p key={i} className="principles-outro">
            {p}
          </p>
        ))}
      </section>

      <section className="chapter-index" aria-labelledby="chapters-heading">
        <h2 id="chapters-heading">Chapters</h2>
        <ul>
          {chapters.map((ch) => (
            <li key={ch.slug}>
              <Link to={`/${ch.slug}`}>
                {ch.title}
                <span className="chapter-count">
                  {ch.reflections.length === 0
                    ? 'in preparation'
                    : `${ch.reflections.length} reflection${ch.reflections.length === 1 ? '' : 's'}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
