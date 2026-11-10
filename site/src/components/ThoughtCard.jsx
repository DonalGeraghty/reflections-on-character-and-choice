import { useId } from 'react';
import { thoughtFor, thoughtId } from '../content/cabinet.js';
import { useCabinet } from './CabinetContext.jsx';
import './ThoughtCard.css';

export default function ThoughtCard({ reflection }) {
  const { saved, toggle } = useCabinet();
  const titleId = useId();
  const id = thoughtId(reflection.title);
  const thought = thoughtFor(reflection.title);
  if (!thought) return null;
  const kept = saved.includes(id);

  return (
    <aside className="thought-card" aria-labelledby={titleId}>
      <details>
        <summary>
          <span className="thought-card-sigil" aria-hidden="true">✧</span>
          <span className="thought-card-heading">
            <span className="thought-card-kicker">Thought Cabinet</span>
            <strong id={titleId}>{reflection.title}</strong>
          </span>
          <span className="thought-card-disclose" aria-hidden="true">+</span>
        </summary>
        <div className="thought-card-content">
          <p className="thought-card-intro">Every principle has a promise—and a limit. Consider both before keeping it.</p>
          <div className="thought-card-pair">
            <div>
              <span className="thought-card-label">What it cultivates</span>
              <p>{thought.cultivates}</p>
            </div>
            <div>
              <span className="thought-card-label">When taken too far</span>
              <p>{thought.caution}</p>
            </div>
          </div>
          <button type="button" className="thought-card-save"
            aria-pressed={kept} onClick={() => toggle(id)}>
            <span aria-hidden="true">{kept ? '✓' : '+'}</span> {kept ? 'Kept in your cabinet' : 'Keep this thought'}
          </button>
          <p className="thought-card-footnote">To keep an idea is not yet to live by it.</p>
        </div>
      </details>
    </aside>
  );
}
