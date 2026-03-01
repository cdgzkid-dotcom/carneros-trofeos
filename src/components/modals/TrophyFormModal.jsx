import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ImageUpload from '../ui/ImageUpload';
import { AM_TEAMS, FL_TEAMS } from '../../data/constants';
import './TrophyFormModal.css';

const EMPTY_FORM = {
  discipline: 'americano',
  name:       '',
  year:       new Date().getFullYear(),
  category:   '',
  teamCat:    '',
  desc:       '',
  img:        null,
};

export default function TrophyFormModal({ isOpen, onClose, onSave, editTarget, defaultDiscipline }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // Poblar formulario al abrir
  useEffect(() => {
    if (!isOpen) return;
    if (editTarget) {
      setForm({ ...editTarget });
    } else {
      setForm({ ...EMPTY_FORM, discipline: defaultDiscipline || 'americano' });
    }
  }, [isOpen, editTarget, defaultDiscipline]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const isEdit    = !!editTarget;
  const isFlagDisc = form.discipline === 'flag';
  const teams      = isFlagDisc ? FL_TEAMS : AM_TEAMS;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="panel-header">
        <span className="panel-title">{isEdit ? 'EDITAR TROFEO' : 'NUEVO TROFEO'}</span>
        <button className="panel-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* DISCIPLINA */}
        <div className="form-group">
          <label>Disciplina *</label>
          <div className="disc-toggle">
            <button
              type="button"
              className={`disc-toggle-btn ${form.discipline === 'americano' ? 'sel-americano' : ''}`}
              onClick={() => set('discipline', 'americano')}
            >
              🏈 Football Americano
            </button>
            <button
              type="button"
              className={`disc-toggle-btn ${form.discipline === 'flag' ? 'sel-flag' : ''}`}
              onClick={() => set('discipline', 'flag')}
            >
              🚩 Flag Football
            </button>
          </div>
        </div>

        {/* NOMBRE */}
        <div className="form-group">
          <label htmlFor="f-name">Nombre del torneo / trofeo *</label>
          <input
            id="f-name"
            type="text"
            value={form.name}
            placeholder="Ej: Campeonato Nacional ONEFA 2024"
            onChange={(e) => set('name', e.target.value)}
            required
          />
        </div>

        {/* AÑO + CATEGORÍA */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="f-year">Año / Temporada *</label>
            <input
              id="f-year"
              type="number"
              value={form.year}
              placeholder="2024"
              min="1985"
              max="2099"
              onChange={(e) => set('year', parseInt(e.target.value) || '')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="f-category">Tipo de logro *</label>
            <select
              id="f-category"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="campeonato">🥇 Campeonato</option>
              <option value="subcampeonato">🥈 Subcampeonato</option>
              <option value="individual">⭐ Premio Individual</option>
              <option value="participacion">🏅 Participación</option>
            </select>
          </div>
        </div>

        {/* CATEGORÍA DEL EQUIPO */}
        <div className="form-group">
          <label htmlFor="f-teamcat">Categoría del equipo</label>
          <select
            id="f-teamcat"
            value={form.teamCat}
            onChange={(e) => set('teamCat', e.target.value)}
          >
            <option value="">General / Organización</option>
            {teams.map(t => (
              <option key={t.value} value={t.value}>{t.value}</option>
            ))}
          </select>
        </div>

        {/* DESCRIPCIÓN */}
        <div className="form-group">
          <label htmlFor="f-desc">Descripción</label>
          <textarea
            id="f-desc"
            value={form.desc}
            placeholder="Detalles del logro, jugadores destacados, torneo..."
            onChange={(e) => set('desc', e.target.value)}
          />
        </div>

        {/* FOTO */}
        <div className="form-group">
          <label>Foto del trofeo (opcional)</label>
          <ImageUpload value={form.img} onChange={(v) => set('img', v)} />
        </div>

        <button
          type="submit"
          className={`btn-primary ${isFlagDisc ? 'flag-mode' : 'am-mode'}`}
        >
          {isEdit ? '💾 ACTUALIZAR' : '🏆 GUARDAR TROFEO'}
        </button>
      </form>
    </Modal>
  );
}
