import './AdminBadge.css';

export default function AdminBadge({ isAdmin }) {
  if (!isAdmin) return null;
  return (
    <div className="admin-badge">⚙️ Modo Admin</div>
  );
}
