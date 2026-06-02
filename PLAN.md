# PLAN MAESTRO — Sitio web ZIT'DCA RS

> Documento de instrucciones generado por Opus 4.8 (orquestador).
> Ejecutado por sub-agentes Sonnet. Esta es la **fuente de verdad**.
> Toda la copy del sitio va en **español** con acentos correctos.

---

## 0. Objetivo del producto

Landing page de una sola página (long-scroll), de alto rendimiento y con
animaciones scroll-triggered, para un taller mecánico / performance automotriz.
La página es el paso de **validación/confianza** del embudo:

`Facebook Marketplace → Messenger → ESTA WEB → WhatsApp Business`

La meta de la web NO es que lean: es que **confíen y den clic a WhatsApp**.
Por eso hay CTAs a WhatsApp en el hero, en secciones clave y un botón flotante
siempre visible.

---

## 1. Stack técnico (NO sustituir)

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | **Astro** (último estable) | Output **static** (default). 0 JS por defecto. |
| Estilos | **Tailwind CSS v4** | Vía plugin `@tailwindcss/vite` + `@import "tailwindcss"` en `global.css`. NO usar la vieja integración `@astrojs/tailwind`. |
| Scroll animations | **GSAP + ScrollTrigger** | `npm i gsap` |
| Smooth scroll | **Lenis** | `npm i lenis` |
| Fuentes | **@fontsource** | Headings: `@fontsource/oswald` (condensada, deportiva). Body: `@fontsource-variable/inter`. Self-host = sin CLS. |
| Imágenes | **astro:assets** `<Image>` | Genera AVIF/WebP responsive. Fuentes en `src/assets/`. |
| Deploy | **Cloudflare Pages** | Build `npm run build`, output `dist/`. Static. |

Node 24 / npm 11 ya verificados en el entorno (Windows + PowerShell).

---

## 2. Estructura de archivos objetivo

```
ZITDCAT RS/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── hero.jpg          # copiar desde ../HERO.jpg
│   │   └── logo.jpg          # copiar desde "../ZITDCA RS.jpg"
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Servicios.astro
│   │   ├── Precios.astro
│   │   ├── Galeria.astro
│   │   ├── PorQue.astro
│   │   ├── Ubicacion.astro
│   │   ├── Footer.astro
│   │   ├── WhatsAppFAB.astro
│   │   └── RevLine.astro      # línea roja decorativa que se "dibuja"
│   ├── data/
│   │   └── site.ts           # config central editable (placeholders)
│   ├── layouts/
│   │   └── Base.astro
│   ├── scripts/
│   │   └── animations.ts     # init Lenis + GSAP/ScrollTrigger
│   ├── styles/
│   │   └── global.css        # @import tailwind + tokens + base
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── DEPLOY.md
└── PLAN.md
```

---

## 3. Sistema de diseño (design tokens)

Paleta derivada de la marca (auto azul, rines dorados, líneas rojas, fondo negro):

```
--color-bg:        #0A0B0D   /* negro asfalto */
--color-surface:   #121418   /* tarjetas */
--color-surface-2: #1A1D23
--color-blue:      #1E5BFF   /* azul eléctrico (primario) */
--color-blue-glow: #3D74FF
--color-red:       #E10600   /* rojo racing (acento / CTA secundario) */
--color-gold:      #C9A24B   /* dorado rines (detalles sutiles) */
--color-silver:    #C8CDD4   /* texto metálico / logo */
--color-text:      #EAECEF
--color-text-dim:  #9AA1AC
--color-whatsapp:  #25D366
```

Definir estos tokens como CSS custom properties en `:root` dentro de `global.css`
y exponerlos a Tailwind v4 con `@theme` (sintaxis Tailwind 4) para usar clases
como `bg-bg`, `text-silver`, `text-blue`, etc.

Tipografía:
- Headings: **Oswald** (500/600/700), `text-transform: uppercase` en títulos de sección, tracking ligeramente abierto.
- Body: **Inter** variable.
- Escala fluida con `clamp()` para títulos hero.

Estética general:
- Fondo negro con textura sutil de asfalto/grano (radial-gradient + noise opcional via SVG, MUY sutil).
- Tarjetas tipo glassmorphism oscuro: `bg-surface/60`, `backdrop-blur`, borde `1px` con glow azul sutil en hover.
- Acentos: líneas rojas finas inclinadas (motivo de marca).
- Bordes redondeados medios (`rounded-xl`), sombras profundas.
- Botón WhatsApp primario en `--color-whatsapp`; CTA secundarios con glow azul/rojo.

---

## 4. Contenido / datos (`src/data/site.ts`)

Centralizar TODO lo editable aquí. Exportar objetos tipados. Marcar claramente
los placeholders con comentarios `// TODO: reemplazar`.

```ts
export const site = {
  name: "ZIT'DCA RS",
  tagline: "Performance & Servicio Automotriz",
  description: "Taller especializado en mantenimiento y performance...",
  // TODO: reemplazar con datos reales antes de publicar
  whatsapp: "52XXXXXXXXXX",        // formato internacional sin + ni espacios
  whatsappMsg: "Hola ZIT'DCA RS, vengo de su página y quiero agendar un servicio.",
  phone: "+52 XXX XXX XXXX",
  email: "contacto@zitdcars.com",
  url: "https://zitdcars.com",
  address: "Calle Ejemplo 123, Colonia, Ciudad, Estado, C.P.",
  mapsUrl: "https://maps.google.com/?q=...",
  hours: [
    { d: "Lunes a Viernes", h: "9:00 – 19:00" },
    { d: "Sábado", h: "9:00 – 14:00" },
    { d: "Domingo", h: "Cerrado" },
  ],
  social: { facebook: "https://facebook.com/...", instagram: "https://instagram.com/..." },
};

// Helper para link de WhatsApp con mensaje prellenado:
export const waLink = (msg = site.whatsappMsg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
```

Servicios (8 tarjetas). Precios placeholder "Desde $X,XXX" con `// TODO`:

1. **Afinación mayor y menor** — icono motor/bujía
2. **Diagnóstico computarizado** — icono escáner OBD
3. **Frenos** — icono disco de freno
4. **Suspensión y dirección** — icono amortiguador
5. **Cambio de aceite y filtros** — icono gota
6. **Sistema eléctrico** — icono batería/rayo
7. **Alineación y balanceo** — icono volante/llanta
8. **Performance / Reprogramación ECU** — icono turbo (servicio estrella de la marca)

Cada servicio: `{ id, titulo, descripcion (1 línea), precioDesde, destacado?: boolean }`.
Marcar "Performance / ECU" como `destacado: true`.

Iconos: usar SVG inline simples (line-art, stroke `currentColor`, 1.5px). NO
librería externa de iconos para no inflar el bundle.

Estadísticas (contadores animados) — placeholders:
- `+500` Autos atendidos
- `+10` Años de experiencia
- `100%` Garantía en mano de obra
- `4.9★` Calificación de clientes

"Por qué elegirnos" (3-4 puntos): Diagnóstico honesto · Refacciones de calidad ·
Garantía por escrito · Atención directa con el técnico.

---

## 5. Secciones (orden de scroll) y comportamiento

Cada sección es un componente `.astro`. `index.astro` las compone dentro de
`Base.astro`. Todas responsive mobile-first (la mayoría del tráfico es móvil).

### 5.1 Nav (`Nav.astro`)
- Fija arriba, transparente sobre el hero; al hacer scroll > 60px gana
  `bg-bg/80 backdrop-blur` + borde inferior sutil (toggle por clase con JS).
- Logo a la izquierda (imagen logo), links ancla a secciones (Servicios, Precios,
  Trabajos, Contacto) + botón "WhatsApp".
- En móvil: logo + botón WhatsApp (sin menú hamburguesa complejo; links opcionales).

### 5.2 Hero (`Hero.astro`)
- Imagen `hero.jpg` a pantalla completa (`min-h-[100svh]`) vía `<Image>` astro:assets,
  con overlay degradado oscuro a la izquierda para legibilidad del texto.
- Contenido alineado a la izquierda (sobre el espacio negativo):
  - Eyebrow pequeño: "TALLER ESPECIALIZADO".
  - H1 grande (Oswald, clamp): nombre + tagline. Ej: "ZIT'DCA RS — Tu auto al máximo rendimiento".
  - Subtítulo 1 línea.
  - 2 botones: **[Agendar por WhatsApp]** (verde, primario) y **[Ver servicios]** (ghost, ancla).
- Indicador de scroll abajo (chevron animado).
- **Animación carga:** timeline GSAP — eyebrow → h1 → sub → botones, stagger fade+slideUp.
- **Animación scroll:** parallax sutil de la imagen hero (yPercent ~10-15) y fade-out del contenido al salir.

### 5.3 RevLine (`RevLine.astro`)
- Divisor decorativo: línea roja diagonal (SVG `path`) que se "dibuja" con
  `strokeDashoffset` animado por ScrollTrigger conforme entra en viewport.
- Reutilizable entre secciones.

### 5.4 Servicios (`Servicios.astro`)
- Título de sección + grid responsive (1 col móvil / 2 / 4 desktop).
- 8 tarjetas glass con icono SVG, título, descripción, "Desde $X" y mini-CTA
  "Cotizar por WhatsApp" (waLink con mensaje específico del servicio).
- La tarjeta `destacado` tiene borde/acento azul-rojo.
- **Animación:** reveal escalonado (stagger) con `ScrollTrigger.batch`, fade+slideUp.
  Hover: leve `translateY(-4px)` + glow.

### 5.5 Stats / Contadores (puede vivir dentro de PorQue o sección propia)
- Fila de 4 métricas. **Animación:** count-up de 0 al valor cuando entra en viewport
  (tween de un objeto + onUpdate). Respeta reduced-motion (mostrar valor final directo).

### 5.6 Precios (`Precios.astro`)
- Tabla/lista oscura "Lista de precios oficiales" — refuerza confianza.
- Filas: servicio · precio desde. Nota al pie: "Precios de referencia; el costo
  final depende del diagnóstico. Cotiza sin compromiso."
- CTA: "Cotizar mi servicio por WhatsApp".
- **Animación:** filas con reveal en cascada.

### 5.7 Galería / Trabajos recientes (`Galeria.astro`)
- "Trabajos recientes" — prueba social.
- **Scroll horizontal anclado (pinned)** con GSAP ScrollTrigger en desktop:
  el contenedor se fija y las tarjetas se desplazan horizontalmente con el scroll
  vertical. En móvil/reduced-motion: fallback a scroll horizontal con
  `scroll-snap` (sin pin).
- Usar placeholders: 6 tarjetas con imagen del hero/logo o bloques de color con
  etiqueta ("Próximamente: foto de trabajo"). Dejar claro en comentario cómo
  sustituir por fotos reales en `src/assets/galeria/`.

### 5.8 PorQue (`PorQue.astro`)
- 3-4 razones con icono + texto. Reveal escalonado.

### 5.9 Ubicación (`Ubicacion.astro`)
- Dirección, horario (de `site.hours`), botones [Cómo llegar (Maps)] y [WhatsApp].
- Mapa embebido opcional (iframe Google Maps) — usar lazy `loading="lazy"`.

### 5.10 Footer (`Footer.astro`)
- Logo, nombre, redes, copyright dinámico (`new Date().getFullYear()`),
  links ancla, aviso pequeño.

### 5.11 WhatsAppFAB (`WhatsAppFAB.astro`)
- Botón flotante fijo abajo-derecha, verde WhatsApp, icono + "WhatsApp".
- Aparece tras hacer scroll > 1 viewport (fade/scale in). Pulso sutil opcional.
- `aria-label`, abre `waLink()` en `_blank` `rel="noopener"`.

---

## 6. Animaciones (`src/scripts/animations.ts`) — reglas estrictas

Punto de entrada único, importado como módulo desde `Base.astro` con
`<script>` (Astro lo bundlea). Inicializa todo en `DOMContentLoaded`.

**Implementación base:**
- Crear instancia **Lenis** (smooth scroll). Integrar con GSAP:
  ```ts
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- `gsap.registerPlugin(ScrollTrigger)`.
- Cada bloque de animación seleccionado por `data-*` o clase para desacoplar del markup.

**Reglas de rendimiento (OBLIGATORIAS):**
- Animar **solo `transform` y `opacity`**. Prohibido animar `width/height/top/left/margin`.
- Usar `ScrollTrigger` / `ScrollTrigger.batch`, NUNCA listeners `scroll` manuales.
- `will-change` solo donde haga falta y quitarlo al terminar.
- Imágenes vía astro:assets (AVIF/WebP, `loading="lazy"` salvo el hero que es `eager`/priority).
- **`prefers-reduced-motion`**: si el usuario lo activa → NO inicializar Lenis ni
  animaciones de entrada; mostrar todo en estado final (sin opacidad 0). Los
  count-ups muestran el valor final directo. El pin horizontal se desactiva.
- Meta Lighthouse móvil: **Performance ≥ 90, Accesibilidad ≥ 95**.

**Accesibilidad:**
- Estados de foco visibles en links/botones.
- `alt` descriptivo en imágenes; iconos decorativos `aria-hidden`.
- Contraste AA mínimo sobre el fondo oscuro.
- Estructura semántica: `header/nav/main/section/footer`, un solo `<h1>`.

---

## 7. SEO / meta (`Base.astro`)

- `<title>` y `<meta name="description">` desde `site`.
- Open Graph + Twitter Card (usar `hero.jpg` como `og:image`).
- `lang="es"`, charset, viewport, `theme-color` (#0A0B0D).
- JSON-LD `AutoRepair` / `LocalBusiness` (schema.org) con nombre, dirección,
  teléfono, horario, geo — mejora el SEO local (clave para un taller).
- `canonical`, favicon.
- `sitemap` opcional vía `@astrojs/sitemap`.

---

## 8. Deploy (`DEPLOY.md`)

Documentar para Cloudflare Pages:
- Conectar repo o subir con `wrangler`.
- **Framework preset:** Astro. **Build command:** `npm run build`. **Output:** `dist`.
- Variables: ninguna obligatoria (sitio estático). 
- Pasos para conectar dominio cuando exista.
- Recordatorio: reemplazar placeholders en `src/data/site.ts` (WhatsApp, dirección,
  dominio, redes) ANTES de publicar.

---

## 9. Criterios de aceptación (verificar al final)

1. `npm install` y `npm run build` terminan **sin errores**. `dist/` generado.
2. `npm run dev` levanta y la página se ve completa en desktop y móvil (probar responsive).
3. Todas las secciones del punto 5 presentes y con contenido en español correcto.
4. Animaciones funcionan: carga del hero, reveals al scroll, contadores, rev-line,
   galería horizontal, FAB de WhatsApp aparece al hacer scroll.
5. Todos los CTAs de WhatsApp usan `waLink()` y apuntan al placeholder.
6. `prefers-reduced-motion` respetado (probar activándolo).
7. Sin errores en consola del navegador.
8. Placeholders claramente marcados con `// TODO` en `site.ts`.

---

## 10. Fases de ejecución (sub-agentes Sonnet)

**FASE A — Fundación (1 sub-agente Sonnet):**
Scaffolding manual (no usar el generador interactivo de Astro), config, deps,
design tokens, fuentes, copiar imágenes a `src/assets/`, `site.ts`, `Base.astro`,
`Nav.astro`, `Footer.astro`, `global.css`, y un `index.astro` mínimo que
**compile** (`npm run build` OK). Entregable: proyecto que buildea.

**FASE B — Secciones + animaciones (1 sub-agente Sonnet):**
Implementar Hero, Servicios, Precios, Galería, PorQue, Stats, Ubicación,
WhatsAppFAB, RevLine + `animations.ts` (Lenis + GSAP) cumpliendo TODAS las reglas
de la sección 6. Verificar build final y criterios de aceptación del punto 9.
Escribir `DEPLOY.md`.
