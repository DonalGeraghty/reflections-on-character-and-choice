import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { chapters, meta } from '../utils.js';
import { thoughtFor, thoughtId } from '../content/cabinet.js';
import { useCabinet } from '../components/CabinetContext.jsx';
import '../components/ThoughtCard.css';

const allReflections = chapters.flatMap(chapter => chapter.reflections.map(reflection => ({
  chapter, reflection, id: thoughtId(reflection.title),
})));

export default function CabinetPage() {
  const { saved, toggle } = useCabinet();
  const [drawn, setDrawn] = useState(null);
  const kept = allReflections.filter(item => saved.includes(item.id));

  useEffect(() => {
    document.title = `Thought Cabinet — ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const draw = () => {
    const possibilities = allReflections.filter(item => item.id !== drawn?.id);
    const source = possibilities.length ? possibilities : allReflections;
    setDrawn(source[Math.floor(Math.random() * source.length)]);
  };

  return (
    <div className="page cabinet-page">
      <header className="cabinet-page-header">
        <span className="thought-card-kicker">An index of convictions</span>
        <h1>The Thought Cabinet</h1>
        <p>Ideas do not become virtues merely by being admired. Choose those worth revisiting, test them against experience, and notice when a strength risks becoming an excess.</p>
        <p className="cabinet-privacy">Your cabinet is kept in this browser, not in an account.</p>
      </header>

      <section className="cabinet-draw" aria-labelledby="cabinet-draw-heading">
        <h2 id="cabinet-draw-heading">Draw a thought</h2>
        <p>Begin anywhere. A useful reflection often arrives before we know why we need it.</p>
        <button className="cabinet-draw-button" type="button" onClick={draw}>Draw a reflection</button>
        {drawn && (
          <div className="cabinet-drawn" aria-live="polite">
            <span className="thought-card-kicker">{drawn.chapter.title}</span>
            <h3>{drawn.reflection.title}</h3>
            <blockquote>{drawn.reflection.phrase}</blockquote>
            <Link to={`/${drawn.chapter.slug}/${drawn.reflection.slug}`}>Read this reflection</Link>
          </div>
        )}
      </section>

      <section className="cabinet-shelf" aria-labelledby="cabinet-shelf-heading">
        <h2 id="cabinet-shelf-heading">Thoughts to revisit <span>({kept.length})</span></h2>
        {kept.length === 0 ? (
          <p className="cabinet-empty">The shelf is empty. Open a Thought Cabinet card beneath any reflection and choose “Keep this thought” when it merits another reading.</p>
        ) : (
          <ul className="cabinet-kept-list">
            {kept.map(({ chapter, reflection, id }) => {
              const thought = thoughtFor(reflection.title);
              return (
                <li key={id}>
                  <span className="thought-card-kicker">{chapter.title}</span>
                  <h3><Link to={`/${chapter.slug}/${reflection.slug}`}>{reflection.title}</Link></h3>
                  <p className="cabinet-kept-phrase">{reflection.phrase}</p>
                  <p><strong>Cultivates:</strong> {thought.cultivates}</p>
                  <p><strong>Keep in mind:</strong> {thought.caution}</p>
                  <button type="button" className="cabinet-remove" onClick={() => toggle(id)}>Remove from cabinet</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
