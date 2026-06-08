# Mirador Los Volcanes — Programa Patrimonial Minero

Landing page comercial para el programa de inversión inmobiliaria exclusivo para socios del **Sindicato Nº1 Chuquicamata**, ubicado en Fundo Mirador Los Volcanes, Puerto Octay, Región de los Lagos.

## Descripción

Sitio web de una sola página (landing page) diseñado para presentar y comercializar 50 cupos exclusivos de inversión en terrenos de 5.000 m² con vista a los volcanes Osorno, Puntiagudo y Calbuco.

## Características

- Tour Virtual 360° embebido en el hero (lanube360.com)
- Galería de fotos reales del fundo con lightbox
- Calculadora de ingresos Airbnb interactiva
- Mapa de conectividad colapsable en móvil
- Formulario de contacto con validación
- Diseño responsive (mobile-first)
- Animaciones de scroll reveal
- WhatsApp flotante
- FAQ con acordeón

## Estructura

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── gallery-1.webp … gallery-6.webp
│       ├── infografia-ubicacion.webp
│       ├── hero-volcanes.jpg
│       └── casa-25m2.jpg, casa-65m2.jpg, casa-80m2.jpg
├── politica-privacidad.html
└── terminos-condiciones.html
```

## Stack

HTML5 · CSS3 (custom properties, grid, flexbox) · JavaScript vanilla

Sin frameworks ni dependencias externas. Fuente: [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) vía Google Fonts.

## Deploy

Proyecto desplegado en Vercel. Para correr localmente:

```bash
# Con Python
python -m http.server 8080

# Con Node
npx serve .
```

---

Proyecto desarrollado para **Programa Patrimonial Minero** · Puerto Octay, Región de los Lagos · 2026
