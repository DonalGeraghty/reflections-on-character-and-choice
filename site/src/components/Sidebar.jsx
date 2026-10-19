import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BranchedMenu from './BranchedMenu.jsx';
import { chapters, meta, reflectionIndex } from '../utils.js';

const HOME = '__home';

const THEME_COLORS = {
  light: { color: '#2e2a24', accentColor: '#8a5a34', lineColor: '#c6b9a4' },
  dark: { color: 'var(--ink)', accentColor: 'var(--accent)', lineColor: 'var(--rule)' },
};

export default function Sidebar({ open, onClose, theme = 'light' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, chapterSlug, reflectionSlug] = location.pathname.split('/');

  const items = useMemo(() => {
    const list = [{ label: 'Guiding Principles', value: HOME }];
    for (const ch of chapters) {
      if (ch.reflections.length === 0) {
        list.push({ label: ch.title, value: ch.slug });
      } else {
        list.push({
          label: ch.title,
          children: ch.reflections.map((r) => ({
            value: `${ch.slug}/${r.slug}`,
            label: `${r.number}. ${r.title}`,
          })),
        });
      }
    }
    return list;
  }, []);

  const activeIndex = HOME_VALUE_INDEX(chapterSlug, items);
  const activeValue = location.pathname === '/'
    ? HOME
    : reflectionSlug
      ? `${chapterSlug}/${reflectionSlug}`
      : '';

  const handleSelect = (value) => {
    navigate(value === HOME ? '/' : `/${value}`);
    onClose();
  };

  return (
    <nav className={`sidebar${open ? ' open' : ''}`} aria-label="Chapters">
      <Link
        to="/"
        className="sidebar-title"
        onClick={() => {
          navigate('/');
          onClose();
        }}
      >
        Reflections on Character
        <br />
        &amp; Choice
      </Link>
      <p className="sidebar-subtitle">{meta.subtitle}</p>
      <BranchedMenu
        key={location.pathname}
        items={items}
        defaultOpen={activeValue === HOME ? -1 : [activeIndex]}
        defaultActive={activeValue}
        onSelect={handleSelect}
        {...THEME_COLORS[theme]}
        width={250}
        rowHeight={34}
        indent={44}
        trunk={14}
        radius={9}
        fontSize={14}
      />
      <p className="sidebar-foot">
        {reflectionIndex.size} reflections across {chapters.length} chapters.
      </p>
    </nav>
  );
}

function HOME_VALUE_INDEX(chapterSlug, items) {
  if (!chapterSlug) return -1;
  const idx = chapters.findIndex((c) => c.slug === chapterSlug);
  // items[0] is the Guiding Principles leaf, so chapters are offset by one
  return idx >= 0 ? idx + 1 : -1;
}
