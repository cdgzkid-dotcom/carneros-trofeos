import { useState, useMemo, useCallback, useRef } from 'react';
import { useTrophies } from './hooks/useTrophies';
import { filterTrophies } from './utils/filters';

import Header         from './components/Header';
import StatsBar        from './components/StatsBar';
import DisciplineTabs  from './components/DisciplineTabs';
import FilterBar       from './components/FilterBar';
import TrophyGrid      from './components/TrophyGrid';
import AdminBadge      from './components/AdminBadge';
import FAB             from './components/FAB';
import Toast           from './components/Toast';
import Footer          from './components/Footer';
import LoginModal      from './components/modals/LoginModal';
import TrophyFormModal from './components/modals/TrophyFormModal';

export default function App() {
  // ── Datos ──
  const { trophies, addTrophy, updateTrophy, deleteTrophy } = useTrophies();

  // ── UI State ──
  const [discipline,  setDiscipline]  = useState('americano');
  const [filter,      setFilter]      = useState('all');
  const [isAdmin,     setIsAdmin]     = useState(false);
  const [toast,       setToast]       = useState(null);
  const [modal,       setModal]       = useState(null); // 'login' | 'form' | null
  const [editTarget,  setEditTarget]  = useState(null); // Trophy | null

  const toastTimer   = useRef(null);
  const editTargetRef = useRef(null);
  editTargetRef.current = editTarget;

  // ── Derivado ──
  const filtered = useMemo(
    () => filterTrophies(trophies, discipline, filter),
    [trophies, discipline, filter]
  );

  // ── Helpers ──
  const showToast = useCallback((msg, cls = 'am') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, cls });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Handlers ──
  const handleDisciplineChange = useCallback((d) => {
    setDiscipline(d);
    setFilter('all');
  }, []);

  const handleLogin = useCallback(() => {
    setIsAdmin(true);
    setModal(null);
    showToast('✅ Bienvenido al panel admin', 'am');
  }, [showToast]);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
    showToast('👋 Sesión cerrada', 'am');
  }, [showToast]);

  const handleOpenAdd = useCallback(() => {
    setEditTarget(null);
    setModal('form');
  }, []);

  const handleOpenEdit = useCallback((trophy) => {
    setEditTarget(trophy);
    setModal('form');
  }, []);

  const handleDelete = useCallback((trophy) => {
    if (!window.confirm(`¿Eliminar "${trophy.name}"?`)) return;
    deleteTrophy(trophy.id);
    showToast('🗑️ Eliminado', 'am');
  }, [deleteTrophy, showToast]);

  const handleSave = useCallback((formData) => {
    // Leer editTarget desde ref para evitar closures stale
    const target = editTargetRef.current;
    if (target) {
      updateTrophy({ ...formData, id: target.id });
      showToast('✅ Trofeo actualizado', formData.discipline === 'flag' ? 'fl' : 'am');
    } else {
      addTrophy(formData);
      showToast('🏆 Trofeo agregado', formData.discipline === 'flag' ? 'fl' : 'am');
      // Auto-switch a la disciplina del trofeo guardado
      if (formData.discipline !== discipline) {
        setDiscipline(formData.discipline);
        setFilter('all');
      }
    }
    setModal(null);
    setEditTarget(null);
  }, [updateTrophy, addTrophy, showToast, discipline]);

  const handleCloseModal = useCallback(() => {
    setModal(null);
    setEditTarget(null);
  }, []);

  return (
    <>
      <AdminBadge isAdmin={isAdmin} />

      <Header />

      <StatsBar trophies={trophies} />

      <DisciplineTabs discipline={discipline} onChange={handleDisciplineChange} />

      <FilterBar
        discipline={discipline}
        filter={filter}
        onFilterChange={setFilter}
      />

      <TrophyGrid
        trophies={filtered}
        discipline={discipline}
        isAdmin={isAdmin}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <Footer />

      <FAB
        isAdmin={isAdmin}
        onLoginClick={() => setModal('login')}
        onAdd={handleOpenAdd}
        onLogout={handleLogout}
      />

      <Toast toast={toast} />

      <LoginModal
        isOpen={modal === 'login'}
        onLogin={handleLogin}
        onClose={handleCloseModal}
      />

      <TrophyFormModal
        isOpen={modal === 'form'}
        onClose={handleCloseModal}
        onSave={handleSave}
        editTarget={editTarget}
        defaultDiscipline={discipline}
      />
    </>
  );
}
