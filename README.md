# Red Arbor Talent

App móvil para explorar ofertas de trabajo remoto, con favoritos, búsqueda, filtros y soporte para inglés y español.

---

## Cómo ejecutar la aplicación

### Requisitos

- Node.js (recomendado LTS)
- npm o yarn
- [Expo Go](https://expo.dev/go) en el móvil (opcional) o emulador/simulador

### Pasos

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Arrancar el proyecto**

   ```bash
   npx expo start
   ```

3. **Abrir la app**

   - Escanea el QR con **Expo Go** (Android/iOS), o
   - Pulsa `a` para Android o `i` para iOS en la terminal (con emulador abierto), o
   - Pulsa `w` para abrir en el navegador (web).

**Nota:** Si usas Expo Go, verás primero el splash de Expo; el splash personalizado (logo + marca) se ve en un build nativo:

```bash
npx expo prebuild
npx expo run:android   # o  npx expo run:ios
```

---

## Qué es y qué hace

- **Listado de trabajos remotos** desde la [API de Remotive](https://remotive.com/api/remote-jobs): búsqueda por texto, filtro por categoría y tipo de contrato, orden por fecha o empresa.
- **Favoritos** guardados en el dispositivo (persistentes).
- **Detalle de cada oferta**: descripción en HTML, enlace para aplicar, compartir y marcar/desmarcar favorito.
- **Preferencias**: modo claro/oscuro y idioma (EN / ES).
- **Internacionalización (i18n)** con inglés como base y español como traducción.

---

## Cómo está construida

- **Expo (SDK 54)** + **React Native** + **TypeScript**.
- **Expo Router**: navegación basada en archivos (file-based routing).
- **Zustand**: estado global (jobs, categorías, favoritos, preferencias).
- **React Native Paper**: componentes y temas (Material Design).
- **i18next** + **react-i18next**: traducciones; locale sincronizado con preferencias.
- **Moti** + **Reanimated**: animaciones (splash, listas, estados vacíos).

### Estructura de navegación

```
Root (Stack)
├── (drawer)          ← Drawer lateral (menú)
│   └── (tabs)        ← Tabs inferiores
│       ├── index     → Lista de trabajos (con FilterBar)
│       └── favoritos → Trabajos guardados
└── job/[id]          → Detalle de un trabajo (pantalla en el Stack)
```

- **Drawer:** menú lateral con logo, preferencias (tema e idioma).
- **Tabs:** “Jobs” (listado con búsqueda y filtros) y “Favorites”.
- **job/[id]:** pantalla de detalle a la que se llega desde una JobCard (en lista o favoritos).

### Estructura del código

- **`app/`** — Rutas (Expo Router): `_layout.tsx`, `(drawer)`, `(tabs)`, `job/[id].tsx`.
- **`components/`** — Componentes reutilizables en kebab-case (`error-state.tsx`, `filter-bar.tsx`, `job-card.tsx`, etc.). Los más complejos tienen carpeta propia con `styles.ts` y `constants.ts` (ej. `animated-splash/`, `drawer-content/`).
- **`stores/`** — Zustand: jobs (y caché), favoritos, preferencias, splash.
- **`services/`** — Cliente de la API Remotive (fetch, reintentos, validación de URLs).
- **`lib/`** — Utilidades (i18n, `formatDate`, `getInitials`/`hashColor` para avatares).
- **`locales/`** — Traducciones (`en.json`, `es.json` u otros según idiomas soportados).

---

## Reglas de traducciones (i18n)

El proyecto sigue dos convenciones para que las traducciones sean claras y fáciles de mantener:

1. **La key es el texto en idioma base (inglés)**  
   No se usan keys genéricas (`greeting`, `error_unknown`). La key es el mismo texto que se muestra en inglés. Así, al leer el código o los JSON, se entiende qué se verá en pantalla sin abrir la app.

   ```json
   { "Something went wrong": "Something went wrong" }   // en
   { "Something went wrong": "Algo salió mal" }         // es
   ```

2. **Variables explícitas en la key con `{{variable}}`**  
   Si el texto lleva interpolación, la key incluye el placeholder. Así se ve qué variables usa cada cadena y se evitan keys ambiguas.

   ```json
   { "Hi user {{name}}": "Hi user {{name}}" }       // en
   { "Hi user {{name}}": "Hola usuario {{name}}" }   // es
   ```

Con esto se mantiene un único idioma de referencia (inglés) en las keys y se reducen errores al añadir nuevos textos o variables.

---

## Comandos útiles

| Comando              | Descripción                    |
|----------------------|--------------------------------|
| `npm start`          | Inicia Expo (igual que `npx expo start`) |
| `npm run ios`        | Abre en simulador iOS         |
| `npm run android`    | Abre en emulador Android      |
| `npm run lint`       | Ejecuta el linter             |

---

## Recursos

- [Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Remotive API](https://remotive.com/api/remote-jobs)
