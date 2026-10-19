import { Link } from 'react-router-dom';
import { parseInline, reflectionUrl } from '../utils.js';

export function Inline({ text }) {
  return (
    <>
      {parseInline(text).map((p, i) => {
        if (typeof p === 'string') return p;
        if (p.t === 'b') return <strong key={i}>{p.text}</strong>;
        if (p.t === 'i') return <em key={i}>{p.text}</em>;
        if (p.t === 'a') {
          const to = reflectionUrl(p.target);
          if (to) return <Link key={i} to={to}>{p.text}</Link>;
          return <span key={i}>{p.text}</span>;
        }
        return null;
      })}
    </>
  );
}

export function Callout({ variant, text }) {
  return (
    <aside className={`callout callout-${variant}`}>
      <span className="callout-label">{variant === 'tip' ? 'Tip' : 'Note'}</span>
      <p>
        <Inline text={text} />
      </p>
    </aside>
  );
}

export function Blocks({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'p') return <p key={i}><Inline text={b.text} /></p>;
        if (b.type === 'subtitle')
          return (
            <h4 key={i} className="block-subtitle">
              {b.text}
            </h4>
          );
        if (b.type === 'callout') return <Callout key={i} variant={b.variant} text={b.text} />;
        if (b.type === 'table')
          return (
            <div key={i} className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {b.header.map((h, j) => (
                      <th key={j} style={{ textAlign: b.align[j] || 'left' }}>
                        <Inline text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k} style={{ textAlign: b.align[k] || 'left' }}>
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return null;
      })}
    </>
  );
}

export function Phrase({ text, large = false }) {
  return (
    <blockquote className={`phrase${large ? ' phrase-large' : ''}`}>
      <Inline text={text} />
    </blockquote>
  );
}
