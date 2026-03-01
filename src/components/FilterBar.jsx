import { FILTERS_BY_DISCIPLINE } from '../data/constants';
import './FilterBar.css';

export default function FilterBar({ discipline, filter, onFilterChange }) {
  const pills = FILTERS_BY_DISCIPLINE[discipline] || [];

  return (
    <div className="filters-wrap">
      <div className="filter-row scrollbar-hide">
        {pills.map(p => (
          <button
            key={p.v}
            className={`filter-btn ${filter === p.v ? 'active-' + discipline : ''}`}
            onClick={() => onFilterChange(p.v)}
          >
            {p.l}
          </button>
        ))}
      </div>
    </div>
  );
}
