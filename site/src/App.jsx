import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import Home from './pages/Home.jsx';
import ChapterPage from './pages/ChapterPage.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [navOpen, setNavOpen] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* private mode: ignore */
    }
  };

  return (
    <div className="app">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} theme={theme} />
      {navOpen && <div className="backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />}
      <div className="main">
        <TopBar theme={theme} onToggleTheme={toggleTheme} onOpenNav={() => setNavOpen(true)} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:chapterSlug/:reflectionSlug" element={<ChapterPage />} />
            <Route path="/:chapterSlug" element={<ChapterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          A personal notebook on character and choice. The manuscript of record is{' '}
          <code>README.md</code> in this repository.
        </footer>
      </div>
    </div>
  );
}
