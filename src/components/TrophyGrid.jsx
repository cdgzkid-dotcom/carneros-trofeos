import TrophyCard from './TrophyCard';
import EmptyState from './EmptyState';
import './TrophyGrid.css';

const SECTION_LABELS = {
  americano: {
    title: 'FOOTBALL AMERICANO',
    sub:   'Rabbits · Hornets · Irons · Falcons · Tauros · Ponys · Juvenil Única',
  },
  flag: {
    title: 'FLAG FOOTBALL',
    sub:   'U6 · U8 · U10 · U12 · U14 · U15 Juvenil',
  },
};

export default function TrophyGrid({ trophies, discipline, isAdmin, onEdit, onDelete }) {
  const { title, sub } = SECTION_LABELS[discipline] || {};

  return (
    <main className="main">
      <p className="section-title">{title}</p>
      <p className="section-subtitle">{sub}</p>
      <div className="trophy-grid">
        {trophies.length === 0 ? (
          <EmptyState discipline={discipline} isAdmin={isAdmin} />
        ) : (
          trophies.map((t, i) => (
            <TrophyCard
              key={t.id}
              trophy={t}
              index={i}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </main>
  );
}
