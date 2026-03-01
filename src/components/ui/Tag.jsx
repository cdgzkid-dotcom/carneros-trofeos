import './Tag.css';

/**
 * Pill de categoría o disciplina
 * Props:
 *   cls  {string} — clase CSS de variante (ej: 'tag-cat-campeonato', 'tag-disc-flag')
 *   icon {string} — emoji
 *   text {string} — label
 */
export default function Tag({ cls, icon, text }) {
  return (
    <span className={`card-tag ${cls || ''}`}>
      {icon} {text}
    </span>
  );
}
