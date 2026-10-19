import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Blocks, Phrase } from '../components/Blocks.jsx';
import { chapters, meta } from '../utils.js';
import ReflectionExplorer from '../components/ReflectionExplorer.jsx';

export default function ChapterPage() {
  const { chapterSlug, reflectionSlug } = useParams();
  const chapter = chapters.find((c) => c.slug === chapterSlug);

  useEffect(() => {
    document.title = chapter
      ? `${chapter.title} — ${meta.title}`
      : meta.title;
  }, [chapter]);

  useEffect(() => {
    if (reflectionSlug) {
      const el = document.getElementById(reflectionSlug);
      if (el) {
        el.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [chapterSlug, reflectionSlug]);

  if (!chapter) return <Navigate to="/" replace />;

  return (
    <div className="page chapter-page">
      <header className="chapter-header">
        <h2>{chapter.title}</h2>
        <Phrase text={chapter.phrase} large />
      </header>

      {chapter.reflections.map((r) => (
        <section
          key={r.slug}
          id={r.slug}
          className={`reflection${reflectionSlug === r.slug ? ' is-target' : ''}`}
        >
          <h3>
            <span className="reflection-number">{r.number}</span>
            <span className="reflection-title-text">{r.title}</span>
          </h3>
          <Phrase text={r.phrase} />
          <div className="reflection-body">
            <Blocks blocks={r.blocks} />
          </div>
          <ReflectionExplorer chapterSlug={chapter.slug} reflectionSlug={r.slug} />
        </section>
      ))}
    </div>
  );
}
