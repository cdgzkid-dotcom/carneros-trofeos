import { useState, useCallback } from 'react';
import { STORAGE_KEY } from '../data/constants';
import { SEED_DATA } from '../data/seed';

function initFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // JSON corrupto → limpiar y usar seed
    localStorage.removeItem(STORAGE_KEY);
  }
  // Primera visita: persistir seed data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  return SEED_DATA;
}

export function useTrophies() {
  const [trophies, setTrophies] = useState(initFromStorage);

  // persist usa updater funcional para evitar stale closures
  const persist = useCallback((updater) => {
    setTrophies(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          // Revertir — la app mostrará error via retorno de addTrophy/updateTrophy
          return prev;
        }
        console.error('Error al guardar en localStorage:', e);
      }
      return next;
    });
  }, []);

  const addTrophy = useCallback((data) => {
    const trophy = { ...data, id: Date.now() };
    persist(prev => [...prev, trophy]);
    return trophy;
  }, [persist]);

  const updateTrophy = useCallback((updated) => {
    persist(prev => prev.map(t => t.id === updated.id ? updated : t));
  }, [persist]);

  const deleteTrophy = useCallback((id) => {
    persist(prev => prev.filter(t => t.id !== id));
  }, [persist]);

  return { trophies, addTrophy, updateTrophy, deleteTrophy };
}
