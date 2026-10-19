export default function TopBar({ theme, onToggleTheme, onOpenNav }) {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onOpenNav} aria-label="Open navigation">
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="topbar-spacer" />
      <button
        className="theme-btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 1.5v2.5M10 16v2.5M1.5 10h2.5M16 10h2.5M3.9 3.9l1.8 1.8M14.3 14.3l1.8 1.8M16.1 3.9l-1.8 1.8M5.7 14.3l-1.8 1.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M15.5 12.5A7 7 0 0 1 7.5 4.5 7 7 0 1 0 15.5 12.5z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
