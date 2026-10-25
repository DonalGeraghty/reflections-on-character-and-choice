import { useId, useState } from 'react';
import './ReflectionExplorer.css';
import GuidedExplorer, { BudgetExplorer } from './GuidedExplorer.jsx';
import { explorerDefinitions } from '../content/explorers.js';

function Explorer({ title, prompt, options, children }) {
  const headingId = useId();
  return (
    <aside className="reflection-explorer" aria-labelledby={headingId}>
      <h4 id={headingId}>{title}</h4>
      <p className="explorer-prompt">{prompt}</p>
      {options}
      <div className="explorer-result" aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </aside>
  );
}

function Choices({ label, items, selected, onSelect }) {
  return (
    <div className="explorer-choices" role="group" aria-label={label}>
      {items.map((item, index) => (
        <button key={item.label} type="button" aria-pressed={selected === index}
          onClick={() => onSelect(index)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

const effortStages = [
  { label: 'Before', title: 'The effort is closest.',
    text: 'A run or an open book can seem less appealing than staying comfortable. The reluctance to begin is only one part of the experience.',
    reminder: 'Recall the whole pattern before deciding.' },
  { label: 'During', title: 'Resistance often eases.',
    text: 'Once the run begins or the book is opened, attention can move from the effort of starting to the activity itself.',
    reminder: 'Make the beginning manageable.' },
  { label: 'After', title: 'The effort has passed; satisfaction remains.',
    text: 'Experience has shown satisfaction in having made the effort. That memory deserves a place in the next decision.',
    reminder: 'Carry this feeling into the next reluctant moment.' },
];

function EffortExplorer() {
  const [selected, setSelected] = useState(0);
  const stage = effortStages[selected];
  return (
    <Explorer title="See beyond the beginning"
      prompt="Follow the same activity through three moments."
      options={<Choices label="Moment in the activity" items={effortStages}
        selected={selected} onSelect={setSelected} />}>
      <div className="explorer-progress" aria-hidden="true">
        {effortStages.map((step, index) => (
          <span key={step.label} className={index <= selected ? 'is-reached' : ''} />
        ))}
      </div>
      <strong>{stage.title}</strong>
      <p>{stage.text}</p>
      <p className="explorer-reminder">{stage.reminder}</p>
    </Explorer>
  );
}

const conversationChoices = [
  { label: 'The words chosen', category: 'Within reach',
    text: 'Choose an honest, considerate reply. The care taken with the response is available even when agreement remains uncertain.',
    action: 'Prepare a clear point and make room to listen.' },
  { label: 'The chance of agreement', category: 'Open to influence',
    text: 'Listening and explaining carefully may help understanding. Agreement still depends on another person’s judgement.',
    action: 'Give the conversation care without demanding a particular result.' },
  { label: 'The other person’s decision', category: 'Beyond control',
    text: 'Another person’s decision cannot be chosen on their behalf. A boundary or a decision about future contact remains possible.',
    action: 'Decide what response is reasonable now.' },
];

function ControlExplorer() {
  const [selected, setSelected] = useState(0);
  const choice = conversationChoices[selected];
  return (
    <Explorer title="Find the part within reach"
      prompt="In a difficult conversation, where can attention usefully go?"
      options={<Choices label="Part of the conversation" items={conversationChoices}
        selected={selected} onSelect={setSelected} />}>
      <span className="explorer-category">{choice.category}</span>
      <p>{choice.text}</p>
      <p className="explorer-reminder">{choice.action}</p>
    </Explorer>
  );
}

const timeChoices = [
  { label: 'Work', title: 'Attention has a task.',
    text: 'Choose one useful piece of work and give it attention. A quiet period becomes an opportunity to make a deliberate beginning.',
    question: 'What deserves attention in this time?' },
  { label: 'Rest', title: 'Rest has permission.',
    text: 'Allow a pause, a hobby or simple enjoyment. The time has a purpose without needing to produce an achievement.',
    question: 'What would make this time restful or enjoyable?' },
  { label: 'Drifting', title: 'The time passes without a choice.',
    text: 'Moving between websites and short videos can fill a quiet hour while offering little satisfaction or restoration.',
    question: 'Would work or rest be more welcome now?' },
];

function TimeExplorer() {
  const [selected, setSelected] = useState(0);
  const choice = timeChoices[selected];
  return (
    <Explorer title="Give a quiet moment a purpose"
      prompt="The same spare hour can take different shapes."
      options={<Choices label="How the time is spent" items={timeChoices}
        selected={selected} onSelect={setSelected} />}>
      <strong>{choice.title}</strong>
      <p>{choice.text}</p>
      <p className="explorer-reminder">{choice.question}</p>
    </Explorer>
  );
}

const explorers = {
  'living-with-intention/11-remember-how-it-feels-afterwards': EffortExplorer,
  'living-with-intention/13-avoid-the-space-between-work-and-rest': TimeExplorer,
  'stoic-wisdom/1-recognise-what-is-up-to-us': ControlExplorer,
  'money/1-begin-with-a-budget': BudgetExplorer,
};

export const explorerKeys = [...Object.keys(explorers), ...Object.keys(explorerDefinitions)];

export default function ReflectionExplorer({ chapterSlug, reflectionSlug }) {
  const key = `${chapterSlug}/${reflectionSlug}`;
  const Component = explorers[key];
  if (Component) return <Component />;
  const definition = explorerDefinitions[key];
  return definition ? <GuidedExplorer definition={definition} /> : null;
}
