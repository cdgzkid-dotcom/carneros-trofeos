import './StatsBar.css';

export default function StatsBar({ trophies }) {
  const total = trophies.length;
  const am    = trophies.filter(t => t.discipline === 'americano').length;
  const fl    = trophies.filter(t => t.discipline === 'flag').length;
  const camp  = trophies.filter(t => t.category === 'campeonato').length;

  return (
    <div className="stats-bar">
      <div className="stat"><span className="stat-num">{total}</span><span className="stat-label">Total trofeos</span></div>
      <div className="stat"><span className="stat-num">{am}</span><span className="stat-label">🏈 Americano</span></div>
      <div className="stat"><span className="stat-num">{fl}</span><span className="stat-label">🚩 Flag</span></div>
      <div className="stat"><span className="stat-num">{camp}</span><span className="stat-label">Campeonatos</span></div>
    </div>
  );
}
