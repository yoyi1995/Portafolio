# Portafolio — Jordy Diaz

Portafolio personal single-page, dark theme, animado.

## Stack
- HTML5 semántico
- CSS3 (custom properties, grid, animaciones)
- JavaScript vanilla (sin dependencias)

## Personalizar
- Reemplaza `jordiyeak@gmail.com`, números de WhatsApp y URLs de LinkedIn/GitHub en `index.html`.
- Actualiza los enlaces `#` de los proyectos con los repos reales (`href="https://github.com/tu-user/tu-repo"`).
- Las stats en el hero usan `data-count` (línea ~50 en `index.html`).

## Correr local
```bash
# Opción 1
open index.html

# Opción 2 (con servidor)
python3 -m http.server 8080
# http://localhost:8080
```

## Desplegar
Sube la carpeta a Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.
Es 100% estático, así que funciona en cualquier hosting.
