import { useState, useCallback, useRef } from 'react';
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

  // Ref para acceder al estado actual sin stale closures en persist
  const trophiesRef = useRef(trophies);
  trophiesRef.current = trophies;

  // persist: computa next, guarda en localStorage y actualiza estado.
  // Retorna true si guardó, false si hubo QuotaExceededError.
  const persist = useCallback((updater) => {
    const prev = trophiesRef.current;
    const next = updater(prev);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setTrophies(next);
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // No actualizar estado — el storage está lleno, mantener prev
        return false;
      }
      console.error('Error al guardar en localStorage:', e);
      setTrophies(next);
      return true;
    }
  }, []);

  const addTrophy = useCallback((data) => {
    const trophy = { ...data, id: Date.now() };
    return persist(prev => [...prev, trophy]);
  }, [persist]);

  const updateTrophy = useCallback((updated) => {
    return persist(prev => prev.map(t => t.id === updated.id ? updated : t));
  }, [persist]);

  const deleteTrophy = useCallback((id) => {
    persist(prev => prev.filter(t => t.id !== id));
  }, [persist]);

  return { trophies, addTrophy, updateTrophy, deleteTrophy };
}
