/**
 * Filtra y ordena trofeos por disciplina y filtro activo.
 * Función pura — sin efectos secundarios.
 *
 * @param {Array}  trophies  - Array completo de trofeos
 * @param {string} discipline - 'americano' | 'flag'
 * @param {string} filter    - 'all' | category key | 'cat:TeamPartial'
 * @returns {Array} Nueva array filtrada y ordenada DESC por year
 */
export function filterTrophies(trophies, discipline, filter) {
  let list = trophies.filter(t => t.discipline === discipline);

  if (filter !== 'all') {
    if (filter.startsWith('cat:')) {
      const key = filter.slice(4).toLowerCase();
      list = list.filter(t => (t.teamCat || '').toLowerCase().includes(key));
    } else {
      list = list.filter(t => t.category === filter);
    }
  }

  return [...list].sort((a, b) => b.year - a.year);
}
