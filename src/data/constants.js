// ─── PERSISTENCIA ───
export const STORAGE_KEY = 'carneros_v3';

// ─── AUTENTICACIÓN (sin auth real — solo protección visual) ───
// NOTA: Esta contraseña es visible en el bundle. Es intencional — la app es estática
// y sin backend. No almacenar datos sensibles reales en esta app.
export const PASSWORD = 'carneros2025';

// ─── CATEGORÍAS DE LOGRO ───
export const CATS = {
  campeonato:    { label: 'Campeonato',        icon: '🥇', cls: 'tag-cat-campeonato' },
  subcampeonato: { label: 'Subcampeonato',     icon: '🥈', cls: 'tag-cat-subcampeonato' },
  individual:    { label: 'Premio Individual', icon: '⭐', cls: 'tag-cat-individual' },
  participacion: { label: 'Participación',     icon: '🏅', cls: 'tag-cat-participacion' },
};

// ─── EQUIPOS FOOTBALL AMERICANO ───
export const AM_TEAMS = [
  { value: 'Rabbits (9-10 años)',         label: 'Rabbits' },
  { value: 'Hornets (11 años)',            label: 'Hornets' },
  { value: 'Irons (12 años)',              label: 'Irons' },
  { value: 'Falcons (13 años)',            label: 'Falcons' },
  { value: 'Tauros (14 años)',             label: 'Tauros' },
  { value: 'Ponys (15 años)',              label: 'Ponys' },
  { value: 'Juvenil Única (15-18 años)',   label: 'Juvenil Única' },
];

// ─── EQUIPOS FLAG FOOTBALL ───
export const FL_TEAMS = [
  { value: 'U6 (4-5-6 años)',             label: 'U6' },
  { value: 'U8 (7-8 años)',               label: 'U8' },
  { value: 'U10 (9-10 años)',             label: 'U10' },
  { value: 'U12 (11-12 años)',            label: 'U12' },
  { value: 'U14 (13-14 años)',            label: 'U14' },
  { value: 'U15 Juvenil (15+ años)',      label: 'U15 Juvenil' },
];

export const TEAMS_BY_DISCIPLINE = {
  americano: AM_TEAMS,
  flag:      FL_TEAMS,
};

// ─── FILTROS ───
// Formato: { v: valor del filtro, l: label }
export const F_AM = [
  { v: 'all',                         l: 'Todos' },
  { v: 'campeonato',                  l: '🥇 Campeonatos' },
  { v: 'subcampeonato',               l: '🥈 Subcampeonatos' },
  { v: 'individual',                  l: '⭐ Individuales' },
  { v: 'participacion',               l: '🏅 Participación' },
  { v: 'cat:Rabbits',                 l: 'Rabbits' },
  { v: 'cat:Hornets',                 l: 'Hornets' },
  { v: 'cat:Irons',                   l: 'Irons' },
  { v: 'cat:Falcons',                 l: 'Falcons' },
  { v: 'cat:Tauros',                  l: 'Tauros' },
  { v: 'cat:Ponys',                   l: 'Ponys' },
  { v: 'cat:Juvenil',                 l: 'Juvenil Única' },
];

export const F_FL = [
  { v: 'all',                         l: 'Todos' },
  { v: 'campeonato',                  l: '🥇 Campeonatos' },
  { v: 'subcampeonato',               l: '🥈 Subcampeonatos' },
  { v: 'individual',                  l: '⭐ Individuales' },
  { v: 'participacion',               l: '🏅 Participación' },
  { v: 'cat:U6',                      l: 'U6' },
  { v: 'cat:U8',                      l: 'U8' },
  { v: 'cat:U10',                     l: 'U10' },
  { v: 'cat:U12',                     l: 'U12' },
  { v: 'cat:U14',                     l: 'U14' },
  { v: 'cat:U15',                     l: 'U15 Juvenil' },
];

export const FILTERS_BY_DISCIPLINE = {
  americano: F_AM,
  flag:      F_FL,
};
