import './FAB.css';

export default function FAB({ isAdmin, onLoginClick, onAdd, onLogout }) {
  return (
    <div className="fab">
      {isAdmin ? (
        <>
          <button className="fab-btn fab-add" onClick={onAdd}>
            ➕ Agregar Trofeo
          </button>
          <button className="fab-btn fab-logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button className="fab-btn fab-admin" onClick={onLoginClick}>
          🔐 Administrar
        </button>
      )}
    </div>
  );
}
