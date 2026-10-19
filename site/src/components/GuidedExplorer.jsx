import { useId, useState } from 'react';

function SelectableExplorer({ definition }) {
  const [selected, setSelected] = useState(0);
  const { title, prompt, type, items } = definition;
  const headingId = useId();
  const [label, resultTitle, text] = items[selected];
  return (
    <aside className={`reflection-explorer explorer-${type}`} aria-labelledby={headingId}>
      <h4 id={headingId}>{title}</h4>
      <p className="explorer-prompt">{prompt}</p>
      <div className={`explorer-choices${type === 'compare' ? ' explorer-comparison' : ''}`}
        role="group" aria-label={title}>
        {items.map(([itemLabel, itemTitle], index) => (
          <button key={itemLabel} type="button" aria-pressed={index === selected}
            onClick={() => setSelected(index)}>
            {type === 'steps' && <span className="explorer-step-number" aria-hidden="true">{index + 1}</span>}
            <span>{itemLabel}</span>
            {type === 'compare' && <span className="explorer-comparison-title">{itemTitle}</span>}
          </button>
        ))}
      </div>
      <div className="explorer-result" aria-live="polite" aria-atomic="true">
        {type === 'steps' && (
          <div className="explorer-progress" aria-hidden="true">
            {items.map(([itemLabel], index) => (
              <span key={itemLabel} className={index <= selected ? 'is-reached' : ''} />
            ))}
          </div>
        )}
        <strong>{resultTitle}</strong>
        <p>{text}</p>
        {type === 'steps' && <span className="explorer-position">{label} · {selected + 1} of {items.length}</span>}
      </div>
    </aside>
  );
}

function CheckExplorer({ definition }) {
  const [selected, setSelected] = useState([]);
  const headingId = useId();
  const { title, prompt, items } = definition;
  const toggle = (index) => setSelected((previous) => previous.includes(index)
    ? previous.filter((value) => value !== index) : [...previous, index]);
  return (
    <aside className="reflection-explorer explorer-checks" aria-labelledby={headingId}>
      <h4 id={headingId}>{title}</h4>
      <p className="explorer-prompt">{prompt}</p>
      <div className="explorer-check-list">
        {items.map(([label, text], index) => (
          <div key={label} className="explorer-check">
            <label>
              <input type="checkbox" checked={selected.includes(index)}
                onChange={() => toggle(index)} aria-controls={`${headingId}-${index}`} />
              <span>{label}</span>
            </label>
            <p id={`${headingId}-${index}`} hidden={!selected.includes(index)}>{text}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function RevealExplorer({ definition }) {
  const [revealed, setRevealed] = useState(false);
  const headingId = useId();
  const resultId = useId();
  const { title, prompt, label, text } = definition;
  return (
    <aside className="reflection-explorer explorer-reveal" aria-labelledby={headingId}>
      <h4 id={headingId}>{title}</h4>
      <p className="explorer-prompt">{prompt}</p>
      <div className="explorer-choices">
        <button type="button" aria-expanded={revealed} aria-controls={resultId}
          onClick={() => setRevealed(!revealed)}>
          <span aria-hidden="true">{revealed ? '−' : '+'}</span> {label}
        </button>
      </div>
      <div id={resultId} hidden={!revealed} className="explorer-revealed-space">
        <p>{text}</p>
      </div>
    </aside>
  );
}

const exampleEntries = [
  { label: 'Regular bills', amount: 60 },
  { label: 'Groceries', amount: 20 },
  { label: 'Small purchases', amount: 5 },
  { label: 'Money set aside', amount: 15 },
];

export function BudgetExplorer() {
  const [included, setIncluded] = useState([0, 1]);
  const headingId = useId();
  const total = exampleEntries.reduce((sum, entry, index) => sum + (included.includes(index) ? entry.amount : 0), 0);
  const toggle = (index) => setIncluded((previous) => previous.includes(index)
    ? previous.filter((value) => value !== index) : [...previous, index]);
  return (
    <aside className="reflection-explorer explorer-budget" aria-labelledby={headingId}>
      <h4 id={headingId}>Let the small amounts count</h4>
      <p className="explorer-prompt">An illustrative €100 account. Include or remove entries to see what the record leaves unexplained.</p>
      <div className="explorer-choices" role="group" aria-label="Entries included in the example account">
        {exampleEntries.map((entry, index) => (
          <button key={entry.label} type="button" aria-pressed={included.includes(index)} onClick={() => toggle(index)}>
            {entry.label} · €{entry.amount}
          </button>
        ))}
      </div>
      <div className="explorer-result" aria-live="polite" aria-atomic="true">
        <meter min="0" max="100" value={total} aria-label="Euros accounted for out of 100">€{total} of €100</meter>
        <p><strong>€{total} accounted for</strong> · €{100 - total} unexplained</p>
        <p>Money deliberately kept belongs in the account as surely as money spent.</p>
      </div>
    </aside>
  );
}

export default function GuidedExplorer({ definition }) {
  if (definition.type === 'checks') return <CheckExplorer definition={definition} />;
  if (definition.type === 'reveal') return <RevealExplorer definition={definition} />;
  return <SelectableExplorer definition={definition} />;
}
