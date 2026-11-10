import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'reflections-thought-cabinet-v1';
const CabinetContext = createContext({ saved: [], toggle: () => {} });

export function CabinetProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? [...new Set(parsed.filter(value => typeof value === 'string'))] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
    catch { /* The cabinet still works for this visit when storage is unavailable. */ }
  }, [saved]);

  const toggle = useCallback((id) => {
    setSaved(current => current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id]);
  }, []);

  return (
    <CabinetContext.Provider value={{ saved, toggle }}>
      {children}
    </CabinetContext.Provider>
  );
}

export const useCabinet = () => useContext(CabinetContext);
