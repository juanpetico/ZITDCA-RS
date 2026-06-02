# DEPLOY — ZIT'DCA RS

## Cloudflare Pages

### Opción 1: Conectar repositorio Git

1. Sube el proyecto a GitHub (o GitLab/Bitbucket).
2. Ve a [Cloudflare Pages](https://pages.cloudflare.com/) > Create a project > Connect to Git.
3. Selecciona el repositorio.
4. Configura el build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (raíz del repo)
5. Haz clic en "Save and Deploy".

### Opción 2: Deploy manual con Wrangler

```bash
# Instalar Wrangler globalmente (una vez)
npm install -g wrangler

# Build del proyecto
npm run build

# Deploy a Cloudflare Pages (primera vez — crea el proyecto)
npx wrangler pages deploy dist --project-name zitdca-rs
```

### Variables de entorno

No se requieren variables de entorno. El sitio es 100% estático.

---

## Antes de publicar — Checklist OBLIGATORIO

Edita `src/data/site.ts` y reemplaza **todos** los `// TODO`:

- [ ] `whatsapp`: número en formato internacional sin `+` ni espacios (ej: `5255XXXXXXXX`)
- [ ] `phone`: número de teléfono para mostrar
- [ ] `email`: correo de contacto
- [ ] `url`: dominio real (ej: `https://zitdcars.com`)
- [ ] `address`: dirección física del taller
- [ ] `mapsUrl`: enlace de Google Maps a la ubicación real
- [ ] `social.facebook`: URL de la página de Facebook
- [ ] `social.instagram`: URL del perfil de Instagram
- [ ] Precios reales en cada servicio (`precioDesde`)

### Fotos reales

- **Hero:** reemplaza `src/assets/hero.jpg` con foto real del taller (alta resolución, horizontal).
- **Galería:** agrega fotos a `src/assets/galeria/` (ver comentario en `Galeria.astro`).
- **Logo:** reemplaza `src/assets/logo.jpg` con logo de alta calidad.

### Mapa de Google

En `src/components/Ubicacion.astro`, sigue las instrucciones del comentario para agregar el iframe real de Google Maps.

---

## Conectar dominio

1. En Cloudflare Pages > tu proyecto > "Custom domains".
2. Agrega tu dominio (ej: `zitdcars.com`).
3. Sigue las instrucciones para agregar registros DNS.
4. Actualiza `site.url` en `src/data/site.ts` con el dominio final.
5. Haz un nuevo deploy.

---

## Rendimiento esperado

- Lighthouse Performance: ≥ 90 (mobile)
- Lighthouse Accessibility: ≥ 95
- Core Web Vitals: AVIF/WebP generado por Astro, fuentes self-hosted
- JS bundle: ~132 KB (GSAP + Lenis, solo carga en navegadores que lo soportan)
