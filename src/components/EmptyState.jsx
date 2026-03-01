import './EmptyState.css';

export default function EmptyState({ discipline, isAdmin }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{discipline === 'flag' ? '🚩' : '🏟️'}</div>
      <h3>Sin trofeos aún</h3>
      <p>{isAdmin ? 'Agrega el primero con ➕' : 'Próximamente...'}</p>
    </div>
  );
}
