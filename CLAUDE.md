# CLAUDE.md — Carneros Football Club · Sala de Trofeos

> **INSTRUCCIÓN OBLIGATORIA:** Lee este archivo COMPLETO antes de comenzar cualquier tarea
> en este proyecto. Contiene las reglas de identidad visual, arquitectura y comportamientos
> que deben respetarse en todo momento. No modifiques nada sin haberlo leído.

---

## Qué es este proyecto

**Sala de Trofeos** es una web app estática de gestión de trofeos para **Carneros Football Club**,
una organización deportiva de Guadalajara, Jalisco. Permite a las mesas directivas registrar,
editar y mostrar los logros del club en dos disciplinas: Football Americano y Flag Football.

**Usuarios:** mesas directivas internas (no público técnico). La app debe ser extremadamente
simple de operar.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| UI Framework | React 18 |
| Bundler | Vite 7 |
| Estilos | CSS puro — **sin Tailwind, sin CSS Modules, sin librerías UI** |
| Persistencia | `localStorage` (clave: `carneros_v3`) |
| Routing | **No hay routing** — app de una sola página (SPA sin React Router) |
| Deploy | Vercel — push a `main` en GitHub despliega automáticamente |
| Fuentes | Google Fonts: Bebas Neue + Montserrat (cargadas en `index.html`) |

**Regla crítica de estilos:** Cada componente tiene su propio archivo `.css` al lado del `.jsx`.
Los estilos globales y variables CSS de marca viven en `src/index.css`. No usar inline styles
salvo para valores dinámicos (ej: `animationDelay`). No agregar Tailwind ni ninguna librería
de UI externa.

---

## Identidad visual — Manual Oficial Carneros 2025

### Colores (definidos como CSS custom properties en `src/index.css`)

```css
--azul:        #0B55AD   /* Color dominante — botones, tabs activos, cards americano */
--azul-dark:   #073a78   /* Gradientes de fondo */
--azul-light:  #1a6fd4   /* Hover states */
--oro:         #C9A84C   /* SOLO stats destacadas y separadores — no usar en otra parte */
--bg:          #06152e   /* Fondo general de la app */
--bg2:         #0a1f45   /* Fondo de modales */
--flag-accent: #28a870   /* SOLO cuando la disciplina activa es Flag Football */
--blanco:      #ffffff
--gris:        #5B5B5B
```

### Reglas de uso de color

- **Azul** (`--azul`) es el color dominante en toda la UI
- **Oro** (`--oro`) SOLO para números en la stats bar y el separador del header
- **Verde** (`--flag-accent`) SOLO cuando el usuario está en la vista de Flag Football:
  tabs activos, filtros activos, cards, botón submit del formulario
- El fondo siempre es `--bg` (`#06152e`) con grid y gradiente radial definidos en `body::before` / `body::after`

### Tipografías

- **Display / Títulos:** `Bebas Neue` (Google Fonts) — usar con `font-family: 'Bebas Neue', cursive`
- **Cuerpo / UI:** `Montserrat` (Google Fonts) — pesos: 400, 500, 600, 700, 800
- **Fallbacks:** Arial / Helvetica / sans-serif
- **NO usar** ninguna otra tipografía

### Animaciones CSS (definidas en `src/index.css`, reutilizables globalmente)

```css
glowPulse  /* Pulsación del logo en el header — box-shadow azul */
fadeUp     /* Cards aparecen desde abajo al renderizar */
slideUp    /* Modales aparecen desde abajo al abrirse */
```

- `fadeUp` en cards: delay escalonado `Math.min(index * 55, 400)` ms
- No agregar animaciones pesadas ni librerías de animación

---

## Estructura de carpetas

```
carneros-trofeos/
├── public/
├── src/
│   ├── main.jsx              — Punto de entrada React
│   ├── App.jsx               — Raíz: todo el estado UI + handlers + composición
│   ├── index.css             — Variables CSS de marca + reset + animaciones globales
│   │
│   ├── data/
│   │   ├── constants.js      — STORAGE_KEY, PASSWORD, CATS, AM_TEAMS, FL_TEAMS, filtros
│   │   └── seed.js           — 7 trofeos de ejemplo (se cargan solo en primera visita)
│   │
│   ├── hooks/
│   │   └── useTrophies.js    — CRUD + localStorage. API: { trophies, addTrophy,
│   │                            updateTrophy, deleteTrophy }
│   │
│   ├── utils/
│   │   └── filters.js        — filterTrophies(trophies, discipline, filter) — función pura
│   │
│   └── components/
│       ├── Header.jsx / .css
│       ├── StatsBar.jsx / .css       — Stats siempre globales (no filtradas)
│       ├── DisciplineTabs.jsx / .css
│       ├── FilterBar.jsx / .css      — Scroll horizontal mobile, wrap tablet+
│       ├── TrophyGrid.jsx / .css
│       ├── TrophyCard.jsx / .css
│       ├── EmptyState.jsx / .css
│       ├── AdminBadge.jsx / .css     — Badge top-right visible solo con isAdmin
│       ├── FAB.jsx / .css            — Floating action button bottom-right
│       ├── Toast.jsx / .css          — Notificación bottom-center, auto-dismiss 3s
│       ├── Footer.jsx / .css
│       │
│       ├── modals/
│       │   ├── LoginModal.jsx / .css
│       │   └── TrophyFormModal.jsx / .css
│       │
│       └── ui/
│           ├── Modal.jsx / .css      — Wrapper genérico con focus trap + Escape + portal
│           ├── Tag.jsx / .css        — Pill de categoría/disciplina
│           └── ImageUpload.jsx / .css — Upload base64 con warning >500KB
│
├── index.html                — Google Fonts cargadas aquí
├── vercel.json               — Rewrite SPA: /* → /index.html
├── vite.config.js
└── package.json
```

---

## Modelo de datos — Objeto Trophy

```js
{
  id:         number,          // Date.now() al crear
  discipline: 'americano' | 'flag',
  name:       string,          // Nombre del torneo/trofeo (requerido)
  year:       number,          // Año temporada (1985-2099, requerido)
  category:   'campeonato' | 'subcampeonato' | 'individual' | 'participacion',
  teamCat:    string,          // Valor del select (ej: "Rabbits (9-10 años)") o ""
  desc:       string,          // Descripción libre, puede ser vacío
  img:        string | null,   // base64 data URL o null
}
```

**Persistencia:** `localStorage['carneros_v3']` = `JSON.stringify(Trophy[])`.
El seed data de 7 trofeos se carga SOLO si `localStorage` está vacío (primera visita).

---

## Disciplinas y categorías

### 🏈 Football Americano

| Valor en `teamCat` | Label corto |
|---|---|
| `Rabbits (9-10 años)` | Rabbits |
| `Hornets (11 años)` | Hornets |
| `Irons (12 años)` | Irons |
| `Falcons (13 años)` | Falcons |
| `Tauros (14 años)` | Tauros |
| `Ponys (15 años)` | Ponys |
| `Juvenil Única (15-18 años)` | Juvenil Única |

### 🚩 Flag Football

| Valor en `teamCat` | Label corto |
|---|---|
| `U6 (4-5-6 años)` | U6 |
| `U8 (7-8 años)` | U8 |
| `U10 (9-10 años)` | U10 |
| `U12 (11-12 años)` | U12 |
| `U14 (13-14 años)` | U14 |
| `U15 Juvenil (15+ años)` | U15 Juvenil |

---

## Comportamientos específicos — Respetar siempre

1. **Stats siempre globales:** Los 4 números de la stats bar reflejan el total de `trophies[]`,
   nunca el subconjunto filtrado.

2. **Reset de filtro al cambiar disciplina:** Al hacer click en otro tab → `setFilter('all')`.

3. **Auto-switch de disciplina al guardar:** Si se guarda un trofeo de disciplina diferente
   a la activa → `setDiscipline(formData.discipline)` + `setFilter('all')`.

4. **Sesión admin no persiste:** `isAdmin` vive solo en `useState`. Nunca en localStorage.
   Al recargar la página el usuario queda como público.

5. **Un solo filtro activo:** El sistema de filtros usa un string único (`'all'`, `'campeonato'`,
   `'cat:Rabbits'`). No son filtros combinables.

6. **Enter en password → login:** El input de contraseña dispara login con `onKeyDown Enter`.

7. **Backdrop click cierra modal:** `onClick` en el overlay, si `e.target === e.currentTarget`.

8. **Escape cierra modal:** Implementado en `Modal.jsx` vía `useEffect` con `keydown` listener.

9. **Focus trap en modales:** `Modal.jsx` implementa focus trap manual (sin librerías) usando
   `requestAnimationFrame` + listener de Tab/Shift+Tab.

10. **Cards ordenadas DESC por año:** `filterTrophies()` siempre retorna ordenado `b.year - a.year`.

11. **Delay fadeUp capeado:** `Math.min(index * 55, 400)` ms — máximo 400ms sin importar
    cuántas cards haya.

---

## Contraseña de admin

**Ubicación:** `src/data/constants.js` → `export const PASSWORD = 'carneros2025'`

Para cambiarla: editar el valor de `PASSWORD` en ese archivo. La contraseña es visible
en el bundle JS (intencional — no hay backend, es solo protección visual para uso interno).

---

## Imágenes

- Se guardan como base64 en localStorage
- Warning visible si el archivo supera 500 KB (no bloquea, solo informa)
- `QuotaExceededError` capturado en `useTrophies.js` → revierte el estado sin crashear
- Límite práctico: ~5MB total de localStorage. Con muchos trofeos + imágenes grandes puede
  llenarse. La app lo maneja graciosamente.

---

## Deploy en Vercel

El proyecto ya tiene `vercel.json` con rewrite SPA:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Pasos para el primer deploy:**

```bash
# 1. Crear repo en GitHub llamado "carneros-trofeos"
# 2. Conectar remote y hacer push
git remote add origin https://github.com/<usuario>/carneros-trofeos.git
git push -u origin main

# 3. En vercel.com → "Add New Project" → Import Git Repository
# 4. Framework Preset: Vite (detección automática)
# 5. Deploy → URL: carneros-trofeos.vercel.app
```

**Deploys subsecuentes:** automáticos en cada `git push origin main`.

**Build command:** `npm run build` (Vite lo configura automáticamente)
**Output directory:** `dist`
**Node version:** 18+ (cualquier versión moderna funciona)

---

## Formato de respuesta esperado de Claude Code

Al terminar cada fase o tarea, responder con:

```
✅ Listo
[Resumen de una línea de lo que se completó]
```

---

## QA — Estado al cierre del proyecto (2026-03-01)

### Build
- `npm run build` sin errores ni warnings ✅

### Funcionalidad Core — verificado en Chrome
| Check | Estado |
|---|---|
| Seed carga en primera visita | ✅ |
| Seed NO recarga si hay datos | ✅ |
| Stats son globales (no filtradas) | ✅ |
| Cambiar tab → filtro resetea a "Todos" | ✅ |
| Cards ordenadas año DESC | ✅ |
| CRUD completo persiste tras F5 | ✅ |
| Auto-switch disciplina al agregar | ✅ |
| Enter en password ejecuta login | ✅ |
| Sesión se pierde al recargar | ✅ |
| Toast aparece y desaparece en 3s | ✅ (~3700ms medido) |
| Backdrop click y Escape cierran modales | ✅ |
| Confirmar antes de eliminar | ✅ |
| FAB/Badge solo visibles en /admin con sesión | ✅ |

### Imágenes — verificado en Chrome
| Check | Estado |
|---|---|
| Preview inmediato tras seleccionar | ✅ |
| Warning visible >500KB | ✅ |
| Toast de error si localStorage se llena (QuotaExceededError) | ✅ |
| Card sin imagen muestra emoji placeholder | ✅ |
| Quitar imagen funciona en edición | ✅ |

### Responsive — verificado via CSS + Chrome DevTools
| Breakpoint | Estado | Notas |
|---|---|---|
| 320px | ✅ | StatsBar 2×2 grid (@480px media query), sin overflow horizontal |
| 375px | ✅ | Grid 1 col, filtros scroll horizontal |
| 640px | ✅ | Filtros en wrap |
| 1024px | ✅ | Grid 3 cols |
| 1280px+ | ✅ | Grid 4 cols, max-width centrado |

> Nota: Chrome no permite ventana <500px. Breakpoint 320/375px verificado
> mediante análisis directo de CSS (`flex: 1 1 45%` → 2 stats por fila).

### Cross-browser
| Browser | Estado | Notas |
|---|---|---|
| Chrome 120+ | ✅ Verificado completo | QA completo incluyendo CRUD |
| Safari 17+ (macOS) | ✅ Visual OK | Vista pública, /admin modal, backdrop-filter blur — CRUD no verificado (permisos de teclado bloqueados en AppleScript) |
| Firefox | ⚠️ Pendiente | No instalado en máquina de desarrollo — riesgo bajo dado stack estándar (CSS puro, localStorage, sin APIs nativas) |
| iOS Safari | ⚠️ Pendiente | Sin dispositivo disponible — pendiente verificación manual del cliente |

### URL de producción
**https://carneros-trofeos.vercel.app** — deploy automático en cada push a `main`
GitHub: `https://github.com/cdgzkid-dotcom/carneros-trofeos`
