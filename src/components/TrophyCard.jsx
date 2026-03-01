import { CATS } from '../data/constants';
import Tag from './ui/Tag';
import './TrophyCard.css';

export default function TrophyCard({ trophy, isAdmin, onEdit, onDelete, index }) {
  const cat  = CATS[trophy.category] || {};
  const isF  = trophy.discipline === 'flag';
  const delay = Math.min(index * 55, 400);

  return (
    <div
      className={`trophy-card ${isF ? 'flag-card' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {trophy.img ? (
        <img className="card-img" src={trophy.img} alt={trophy.name} />
      ) : (
        <div className="card-img-placeholder">
          {cat.icon || '🏆'}
        </div>
      )}

      <div className="card-body">
        <div className="card-meta">
          <span className="card-year">{trophy.year}</span>
          <Tag cls={cat.cls} icon={cat.icon} text={cat.label} />
          <Tag
            cls={`tag-disc-${trophy.discipline}`}
            icon={isF ? '🚩' : '🏈'}
            text={isF ? 'Flag' : 'Americano'}
          />
        </div>

        <h3 className="card-title">{trophy.name}</h3>

        {trophy.teamCat && (
          <p className="card-teamcat">📋 {trophy.teamCat}</p>
        )}

        {trophy.desc && (
          <p className="card-desc">{trophy.desc}</p>
        )}

        {isAdmin && (
          <div className="card-actions">
            <button className="btn-edit" onClick={() => onEdit(trophy)}>
              ✏️ Editar
            </button>
            <button className="btn-delete" onClick={() => onDelete(trophy)}>
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
