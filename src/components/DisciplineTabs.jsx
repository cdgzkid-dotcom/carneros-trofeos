import './DisciplineTabs.css';

export default function DisciplineTabs({ discipline, onChange }) {
  return (
    <div className="discipline-tabs">
      <button
        className={`disc-tab ${discipline === 'americano' ? 'active-americano' : ''}`}
        onClick={() => onChange('americano')}
      >
        🏈 Football Americano
      </button>
      <button
        className={`disc-tab ${discipline === 'flag' ? 'active-flag' : ''}`}
        onClick={() => onChange('flag')}
      >
        🚩 Flag Football
      </button>
    </div>
  );
}
