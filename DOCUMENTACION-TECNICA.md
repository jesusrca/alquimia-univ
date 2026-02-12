# 📘 Documentación Técnica del Proyecto
## Quibayo 2026 - Universidad de la Alquimia

**Versión:** 1.0  
**Fecha:** 29 de enero de 2026  
**Tipo:** Landing Page de Evento

---

## 📋 Índice

1. [Información General](#información-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Sistema de Diseño](#sistema-de-diseño)
4. [Componentes y Bloques](#componentes-y-bloques)
5. [Secciones del Landing](#secciones-del-landing)
6. [Criterios de Diseño](#criterios-de-diseño)
7. [Especificaciones Técnicas](#especificaciones-técnicas)
8. [Accesibilidad](#accesibilidad)
9. [Performance](#performance)

---

## 📊 Información General

### Descripción del Proyecto
Landing page para el evento "Quibayo 2026", un retiro de transformación organizado por la Universidad de la Alquimia en el Monumento Natural Centro María Lionza, Yaracuy, Venezuela.

### Objetivo
Informar sobre el evento, mostrar el programa, paquetes disponibles y facilitar la inscripción de participantes.

### Tecnologías Principales
- **HTML5** - Estructura semántica
- **CSS3** - Estilos con sistema de design tokens
- **JavaScript (ES6+)** - Interactividad y animaciones
- **GSAP 3.12.2** - Animaciones avanzadas
- **Swiper.js 11** - Carruseles y sliders
- **Lenis 1.0.29** - Smooth scroll

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos

```
alquimia-univ/
├── index.html                 # Página principal
├── css/
│   └── styles.css            # Estilos principales (1,800+ líneas)
├── js/
│   └── main.js               # JavaScript principal (600+ líneas)
├── assets/                    # Imágenes y recursos
│   ├── Paisaje-Landing-hero.jpg
│   ├── slide01.jpg
│   ├── alimentacion.jpg
│   ├── terapias.jpg
│   ├── hospedaje_*.jpg
│   └── *.svg                 # Iconos y logos
├── fonts/
│   ├── Inter_Tight/
│   ├── NanumMyeongjo/
│   └── Atkinson_Hyperlegible_Mono/
└── docs/
    ├── MEJORAS-IMPLEMENTADAS.md
    ├── MEJORAS-MEDIA-PRIORIDAD.md
    └── RESUMEN-COMPLETO.md
```

### Metodología CSS
- **BEM (Block Element Modifier)** - Nomenclatura de clases
- **Mobile-First** - Diseño responsive desde móvil
- **Design Tokens** - Sistema de variables CSS
- **Utility Classes** - Clases auxiliares reutilizables

---

## 🎨 Sistema de Diseño

### Paleta de Colores

#### Colores Principales
```css
--color-text-primary: #000000      /* Negro - Texto principal */
--color-text-secondary: #6b6f6e    /* Gris oscuro - Texto secundario (WCAG AA) */
--color-text-tertiary: #8b908f     /* Gris medio - Elementos decorativos */
--color-text-white: #ffffff        /* Blanco - Texto sobre fondos oscuros */
```

#### Colores de Fondo
```css
--color-bg: #ffffff                /* Blanco - Fondo principal */
--color-bg-light: #f5f5f5          /* Gris claro - Fondos alternos */
```

#### Colores de Borde
```css
--color-border: rgba(255, 255, 255, 0.3)  /* Blanco semi-transparente */
--color-border-dark: #000000               /* Negro - Bordes principales */
--color-border-light: #e5e5e5              /* Gris claro - Bordes sutiles */
```

#### Colores de Paquetes
```css
/* Paquete A (Oscuro) */
background: #8b908f
text: #C3D9D5

/* Paquete B (Claro) */
background: #D2DFDD
text: #727272
```

### Tipografía

#### Familias Tipográficas

**1. NanumMyeongjo (Serif)**
- **Uso:** Títulos principales (h1)
- **Peso:** 400 (Regular)
- **Carácter:** Elegante, tradicional, espiritual
- **Ejemplo:** "Quibayo 2026"

```css
font-family: 'NanumMyeongjo', serif;
```

**2. Inter Tight (Sans-serif)**
- **Uso:** Cuerpo de texto, subtítulos, UI
- **Peso:** Variable (100-900)
- **Carácter:** Moderno, limpio, legible
- **Ejemplo:** Descripciones, párrafos

```css
font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
```

**3. Atkinson Hyperlegible Mono (Monospace)**
- **Uso:** Labels, botones, navegación
- **Peso:** 400 (Regular), 700 (Bold)
- **Carácter:** Técnico, accesible, distintivo
- **Ejemplo:** "INSCRÍBETE", "VER PROGRAMA"

```css
font-family: 'Atkinson Hyperlegible Mono', monospace;
```

#### Escala Tipográfica (Modular)

| Variable | Tamaño | Uso Principal |
|----------|--------|---------------|
| `--font-size-xs` | 0.6875rem (11px) | Labels pequeños, navegación |
| `--font-size-sm` | 0.75rem (12px) | Section labels, metadatos |
| `--font-size-base` | 0.8125rem (13px) | Botones, inputs |
| `--font-size-md` | 0.875rem (14px) | Texto secundario |
| `--font-size-lg` | 0.9375rem (15px) | Botones destacados |
| `--font-size-xl` | 1rem (16px) | Texto base |
| `--font-size-2xl` | 1.125rem (18px) | Párrafos destacados |
| `--font-size-3xl` | 1.25rem (20px) | Subtítulos pequeños |
| `--font-size-4xl` | 1.5rem (24px) | Subtítulos medianos |
| `--font-size-5xl` | 1.75rem (28px) | Subtítulos grandes |
| `--font-size-6xl` | 2rem (32px) | Títulos de sección |
| `--font-size-7xl` | 2.125rem (34px) | Títulos destacados |
| `--font-size-8xl` | 3rem (48px) | Títulos principales móvil |
| `--font-size-9xl` | 5.0625rem (81px) | Hero title desktop |

#### Line Heights

```css
--line-height-tight: 1      /* Títulos grandes */
--line-height-snug: 1.2     /* Títulos medianos */
--line-height-normal: 1.4   /* Párrafos cortos */
--line-height-relaxed: 1.5  /* Texto body */
--line-height-loose: 1.6    /* Texto largo */
```

### Sistema de Espaciado

#### Escala de Espaciado (Múltiplos de 10px)

```css
--space-1: 0.625rem    /* 10px - Espacios mínimos */
--space-2: 1.25rem     /* 20px - Espacios pequeños */
--space-3: 1.875rem    /* 30px - Espacios medianos */
--space-4: 2.5rem      /* 40px - Espacios estándar */
--space-5: 3.125rem    /* 50px - Espacios grandes */
--space-6: 3.75rem     /* 60px - Separación de elementos */
--space-7: 5rem        /* 80px - Separación de grupos */
--space-8: 6.25rem     /* 100px - Separación de bloques */
--space-9: 7.5rem      /* 120px - Separación de secciones */
```

#### Aplicación del Espaciado

| Contexto | Variable | Uso |
|----------|----------|-----|
| Padding botón | `0.875rem 1.75rem` | 14px 28px |
| Margin entre elementos | `var(--space-2)` | 20px |
| Margin entre bloques | `var(--space-5)` | 50px |
| Padding de sección | `var(--space-9) 0` | 120px 0 |
| Gap en grid | `var(--space-7)` | 80px |

### Breakpoints Responsive

```css
--breakpoint-sm: 40rem     /* 640px - Móvil grande */
--breakpoint-md: 48rem     /* 768px - Tablet */
--breakpoint-lg: 64rem     /* 1024px - Desktop pequeño */
--breakpoint-xl: 80rem     /* 1280px - Desktop grande */
```

#### Media Queries Estandarizadas

```css
/* Tablet y menor */
@media (max-width: 48rem) { }

/* Tablet grande y menor */
@media (max-width: 56.25rem) { }

/* Desktop pequeño y menor */
@media (max-width: 64rem) { }
```

### Transiciones y Animaciones

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 600ms cubic-bezier(0.33, 1, 0.68, 1)
--transition-slower: 1.5s ease-out
```

#### Curvas de Animación

- **Fast (150ms):** Hover states, micro-interacciones
- **Base (300ms):** Transiciones estándar, botones
- **Slow (600ms):** Acordeones, menú móvil
- **Slower (1.5s):** Animaciones de entrada, reveals

### Z-index Scale

```css
--z-base: 1          /* Elementos base */
--z-dropdown: 10     /* Dropdowns */
--z-sticky: 100      /* Header sticky */
--z-fixed: 1000      /* Elementos fijos */
--z-modal: 10000     /* Modales */
--z-popover: 100000  /* Tooltips, popovers */
```

---

## 🧩 Componentes y Bloques

### 1. **Preloader**

**Descripción:** Animación de carga inicial con logo SVG animado.

**Estructura:**
```html
<div id="preloader">
  <div class="preloader-content"></div>
</div>
```

**Características:**
- Fade in del logo SVG
- Duración: 1.5s
- Fade out del preloader: 0.8s
- Z-index: 99999

**Animación GSAP:**
- Paths opacity: 0 → 1
- Fill opacity: 0 → 1
- Ease: power2.out

---

### 2. **Header / Navegación**

**Descripción:** Barra de navegación fija con logo y menú.

**Estructura:**
```html
<header class="header">
  <div class="header__container">
    <div class="header__logo">
      <svg>...</svg>
    </div>
    <button class="menu-toggle">...</button>
    <nav class="nav">
      <a href="#inicio" class="nav__link">INICIO</a>
      ...
    </nav>
  </div>
</header>
```

**Características:**
- Posición: Absolute (sobre hero)
- Padding: 40px 60px (desktop), 30px 40px (tablet)
- Logo height: 32px
- Nav gap: 80px

**Responsive:**
- **Desktop:** Navegación horizontal
- **Tablet (<64rem):** Menú hamburguesa
- **Móvil:** Menú fullscreen overlay

**Interactividad:**
- Menú toggle con animación de hamburguesa
- Smooth scroll a secciones
- Focus states visibles
- Navegación por teclado (Tab, Enter)

---

### 3. **Botones**

**Descripción:** Sistema de botones con variantes.

**Variantes:**

**3.1. Botón Principal**
```css
.btn {
  font-family: var(--font-mono);
  font-size: var(--font-size-base);
  padding: 0.875rem 1.75rem;
  border: 1px solid var(--color-border-dark);
  background: transparent;
  transition: all var(--transition-base);
}

.btn:hover {
  background-color: var(--color-text-primary);
  color: var(--color-text-white);
}
```

**3.2. Botón Outline**
```css
.btn--outline {
  border-color: var(--color-border-light);
  color: var(--color-text-secondary);
}

.btn--outline:hover {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}
```

**Estados:**
- `:hover` - Fondo negro, texto blanco
- `:focus-visible` - Outline 2px, offset 2px
- `:active` - Sin cambios adicionales

---

### 4. **Formulario de Email**

**Descripción:** Input de email con botón de envío integrado.

**Estructura:**
```html
<form class="hero__form">
  <label for="heroEmail" class="visually-hidden">...</label>
  <input type="email" id="heroEmail" class="hero__email-input" />
  <button type="submit" class="hero__submit">
    <svg>...</svg>
  </button>
</form>
```

**Características:**
- Background: rgba(255, 255, 255, 0.2)
- Backdrop-filter: blur(8px)
- Padding: 18px 60px 18px 24px
- Botón posicionado absolute a la derecha
- Validación HTML5 (required, type="email")

**Accesibilidad:**
- Label visualmente oculto pero accesible
- ARIA labels
- Focus state visible

---

### 5. **Scroll Indicator**

**Descripción:** Icono Phi animado que indica scroll.

**Estructura:**
```html
<div class="scroll-indicator" id="phi-icon">
  <img src="assets/phi-icon.svg" alt="Phi Icon" />
</div>
```

**Características:**
- Posición: Absolute, bottom 50px, centrado
- Tamaño: 27x36px
- Clickeable y navegable por teclado
- Smooth scroll a primera sección

**Interactividad:**
- Click → Scroll a #sobre-evento
- Enter/Space → Mismo comportamiento
- ARIA: role="button", tabindex="0"

---

### 6. **Section Label**

**Descripción:** Etiqueta superior de sección.

**Estructura:**
```html
<span class="section__label">SOBRE NUESTRO EVENTO</span>
```

**Características:**
- Font: Atkinson Hyperlegible Mono
- Size: 12px (0.75rem)
- Color: #6b6f6e
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Margin-bottom: 50px (100px en secciones destacadas)

---

### 7. **Carrusel Infinito**

**Descripción:** Carrusel de imágenes con movimiento continuo.

**Tecnología:** Swiper.js

**Configuración:**
```javascript
{
  slidesPerView: "auto",
  spaceBetween: 24,
  loop: true,
  speed: 8000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  grabCursor: true
}
```

**Características:**
- Movimiento continuo (marquee effect)
- Velocidad: 8000ms
- Transición: linear
- Responsive: 80vw móvil, 33.333vw desktop

---

### 8. **Slider de Naturaleza**

**Descripción:** Slider de imágenes full-width con controles.

**Tecnología:** Swiper.js

**Estructura:**
```html
<div class="nature-swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide" data-title="Título">
      <img src="..." class="full-width-image" />
    </div>
  </div>
</div>
<div class="slider-footer">
  <h2 class="slider-caption">Título dinámico</h2>
  <div class="slider-navigation">
    <button class="slider-prev">ANTERIOR</button>
    <button class="slider-next">SIGUIENTE</button>
  </div>
</div>
```

**Características:**
- Height: 80vh (min 400px)
- Navegación: Botones + teclado + swipe
- Caption dinámico según slide activo
- Transición de caption: fade out/in

**Animación de Caption:**
```javascript
// Fade out
captionEl.style.opacity = 0;
// Cambiar texto
captionEl.textContent = newTitle;
// Fade in
captionEl.style.opacity = 1;
```

---

### 9. **Acordeón del Programa**

**Descripción:** Acordeón de días con itinerarios expandibles.

**Estructura:**
```html
<div class="program-day is-active">
  <div class="program-day__header">
    <span class="program-day__date">30. 10</span>
    <span class="program-day__name">Jueves</span>
    <span class="program-day__toggle">Ocultar itinerario</span>
  </div>
  <div class="program-day__content">
    <div class="program-day__inner">
      <div class="program-schedule">
        <div class="program-item">
          <span class="program-item__time">9:00 AM</span>
          <span class="program-item__activity">Actividad</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Características:**
- Grid layout: 150px 1fr auto
- Animación: grid-template-rows (0fr → 1fr)
- Duración: 600ms cubic-bezier(0.33, 1, 0.68, 1)
- Fondo gris (#f5f5f5) cuando activo
- Solo un día abierto a la vez

**Interactividad:**
- Click en header para expandir/contraer
- Enter/Space para navegación por teclado
- ARIA: role="button", aria-expanded
- Actualización dinámica de texto toggle

---

### 10. **Tarjetas de Paquetes**

**Descripción:** Dos columnas con paquetes A y B.

**Estructura:**
```html
<div class="packages-grid">
  <div class="package-column">
    <h3 class="package-title">Paquete A</h3>
    <div class="package-box package-box--dark">
      <div class="package-content">
        <span class="package-label">INCLUYE</span>
        <ul class="package-list">...</ul>
      </div>
      <div class="package-price-block">
        <span class="package-label">INVERSIÓN</span>
        <span class="package-price">USD$ 800</span>
      </div>
    </div>
    <a href="#" class="btn btn--outline">INSCRÍBETE</a>
  </div>
</div>
```

**Características:**
- Grid: 2 columnas (1 en móvil)
- Gap: 20px
- Min-height: 600px
- Padding: 60px 40px

**Variantes:**
- **Dark:** Background #8b908f, texto #C3D9D5
- **Light:** Background #D2DFDD, texto #727272

---

### 11. **Tarjetas de Servicios**

**Descripción:** Imágenes full-width con texto superpuesto.

**Estructura:**
```html
<div class="service-card">
  <img src="..." class="service-card__image" />
  <div class="service-card__content">
    <h3 class="service-card__title">Alimentación</h3>
    <p class="service-card__text">Descripción...</p>
  </div>
</div>
```

**Características:**
- Height: 600px (500px tablet, auto móvil)
- Image: object-fit cover
- Hover: scale(1.03)
- Content: Grid 200px minmax(300px, 450px)
- Text shadow para legibilidad

---

### 12. **Tarjetas de Hospedaje**

**Descripción:** Grid de opciones con parallax en imágenes.

**Estructura:**
```html
<div class="lodging-item">
  <div class="lodging-item__price">USD$ 30</div>
  <div class="lodging-item__image-wrapper">
    <img src="..." class="lodging-item__image" />
  </div>
  <div class="lodging-item__name">Habitación matrimonial</div>
</div>
```

**Características:**
- Grid: 250px 600px 1fr
- Gap: 40px
- Image aspect-ratio: 4/3
- Parallax: yPercent -15 → 15

**Animación GSAP:**
```javascript
gsap.fromTo(image,
  { yPercent: -15, scale: 1.1 },
  { yPercent: 15, scale: 1.1, scrub: true }
);
```

---

### 13. **Footer**

**Descripción:** Pie de página con información y enlaces.

**Estructura:**
```html
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__logo">...</div>
        <p class="footer__description">...</p>
      </div>
      <div class="footer__nav">...</div>
      <div class="footer__contact">...</div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">...</p>
      <div class="footer__socials">...</div>
    </div>
  </div>
</footer>
```

**Características:**
- Background: #000
- Color: #fff
- Grid: 2fr 1fr 1fr (desktop)
- Padding: 100px 0 40px
- Logo: Invertido con filter

---

## 📄 Secciones del Landing

### Orden de Secciones

1. **Preloader** - Animación de carga
2. **Hero** - Imagen principal con título y formulario
3. **Sobre el Evento** - Descripción + carrusel infinito
4. **Viaje de Transformación** - Texto + slider de naturaleza
5. **Programa** - Acordeón de itinerarios por día
6. **Paquetes** - Opciones A y B + requisitos
7. **Servicios** - Alimentación y terapias
8. **Hospedaje** - Opciones de alojamiento
9. **Footer** - Información de contacto

---

### Sección 1: Hero

**ID:** `#inicio`  
**Clase:** `.hero-section`

**Elementos:**
- Header con navegación
- Imagen de fondo (1920x1080)
- Overlay gradiente
- Título principal (h1)
- Subtítulo de ubicación
- Fechas del evento
- Formulario de inscripción
- Scroll indicator

**Dimensiones:**
- Height: 100vh (min 800px)
- Content: Centrado vertical y horizontalmente
- Max-width content: 800px

**Animaciones:**
- Hero title: translateY(30px) → 0, opacity 0 → 1
- Stagger delay: 0.1s entre elementos
- Duración: 2s ease power3.out

---

### Sección 2: Sobre el Evento

**ID:** `#sobre-evento`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Section label: "SOBRE NUESTRO EVENTO"
- Título (h2): Descripción del evento
- Botones de acción (2)
- Icono Phi decorativo
- Carrusel infinito de imágenes

**Layout:**
- Padding: 100px 0 0
- Label margin-bottom: 100px
- Title max-width: 900px
- Carrusel: Full-width, sin padding

**Carrusel:**
- Tipo: Infinito (marquee)
- Velocidad: 8000ms
- Slides: 6 imágenes (3 únicas duplicadas)
- Responsive: 80vw móvil, 33.333vw desktop

---

### Sección 3: Viaje de Transformación

**ID:** `#transformacion-viaje`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Section label: "UN NUEVO VIAJE DE TRANSFORMACIÓN"
- Grid: Texto + Logo animado
- Slider de naturaleza full-width
- Caption dinámico
- Botones de navegación

**Layout:**
- Grid: 1fr 200px (desktop)
- Label margin-bottom: 100px
- Grid margin-bottom: 100px

**Slider:**
- Height: 80vh (min 400px)
- Tipo: Navegable con botones
- Caption: Cambia según slide activo
- Transición: Fade out/in

**Logo Animado (GSAP):**
- Stroke drawing animation
- Fill fade in
- Scale up sutil
- Trigger: ScrollTrigger top 70%

---

### Sección 4: Programa

**ID:** `#programa`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Título de sección (h2): "Programa"
- Descripción del programa
- Acordeón de 3 días

**Layout:**
- Header grid: 1fr 1.2fr (desktop)
- Gap: 80px
- Margin-bottom: 100px

**Acordeón:**
- Días: Jueves, Viernes, Sábado
- Primer día abierto por defecto
- Fondo gris cuando activo
- Animación suave (600ms)

**Itinerarios:**
- Grid: 150px 1fr
- Padding-left: 150px (alineado con fecha)
- Border-top entre items

---

### Sección 5: Paquetes

**ID:** `#paquetes`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Grid de 2 paquetes
- Paquete A (oscuro): USD$ 800
- Paquete B (claro): USD$ 600
- Sección de requisitos

**Layout:**
- Grid: 2 columnas (1 en móvil)
- Gap: 20px
- Margin-bottom: 120px

**Requisitos:**
- Grid: 1fr 2fr
- Gap: 80px
- 3 requisitos listados

---

### Sección 6: Servicios

**ID:** `#servicios`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Section label: "OFRECEMOS"
- 2 tarjetas de servicios
  - Alimentación
  - Terapias

**Layout:**
- Flex column
- Gap: 0 (sin espacio entre tarjetas)
- Full-width images

**Tarjetas:**
- Height: 600px (500px tablet)
- Image hover: scale(1.03)
- Text grid: 200px minmax(300px, 450px)

---

### Sección 7: Hospedaje

**ID:** `#hospedaje`  
**Clase:** `.section .reveal-up`

**Elementos:**
- Título: "Hospedaje"
- Descripción del hospedaje
- 3 opciones con precio
  - Matrimonial: USD$ 30
  - Triple: USD$ 50
  - Litera: USD$ 15
- 2 opciones sin precio
  - Espacio camas portátiles
  - Espacio carpas
- Footer informativo

**Layout:**
- Grid: 250px 600px 1fr
- Gap: 40px, 120px vertical
- Parallax en imágenes

**Animación:**
- Precio: translateY(30px → -30px)
- Nombre: translateY(60px → -60px)
- Imagen: yPercent(-15% → 15%)

---

### Sección 8: Footer

**Clase:** `.footer`

**Elementos:**
- Logo invertido
- Descripción de la universidad
- Enlaces de navegación
- Información de contacto
- Copyright
- Redes sociales (IG, FB, YT)

**Layout:**
- Grid: 2fr 1fr 1fr (desktop)
- Gap: 80px
- Padding: 100px 0 40px

**Responsive:**
- Tablet: 2 columnas
- Móvil: 1 columna

---

## 🎯 Criterios de Diseño

### Principios de Diseño

#### 1. **Minimalismo Elegante**
- Uso generoso de espacio en blanco
- Tipografía como elemento principal
- Paleta de colores reducida y sofisticada
- Imágenes de alta calidad

#### 2. **Jerarquía Visual Clara**
- Títulos grandes y llamativos
- Subtítulos en gris para contraste
- Labels en mayúsculas para organización
- Espaciado consistente

#### 3. **Movimiento Sutil**
- Animaciones suaves y naturales
- Transiciones coherentes (300ms-600ms)
- Parallax discreto
- Hover states sutiles

#### 4. **Accesibilidad Primero**
- Contraste WCAG AA (4.5:1)
- Navegación por teclado completa
- Focus states visibles
- ARIA labels apropiados
- Soporte para reduced motion

### Decisiones de Diseño

#### Tipografía
- **Serif para títulos:** Aporta elegancia y espiritualidad
- **Sans-serif para cuerpo:** Legibilidad y modernidad
- **Monospace para UI:** Distinción técnica y claridad

#### Colores
- **Negro y blanco:** Contraste máximo, elegancia
- **Grises:** Jerarquía visual sin saturación
- **Transparencias:** Modernidad y profundidad

#### Espaciado
- **Múltiplos de 10:** Consistencia matemática
- **Espacios generosos:** Respiración visual
- **Ritmo vertical:** Flujo de lectura natural

#### Animaciones
- **Reveal on scroll:** Descubrimiento progresivo
- **Parallax:** Profundidad y dinamismo
- **Smooth scroll:** Navegación fluida

---

## 🔧 Especificaciones Técnicas

### HTML

#### Estructura Semántica
```html
<header>     <!-- Navegación -->
<section>    <!-- Secciones de contenido -->
<article>    <!-- Contenido independiente -->
<aside>      <!-- Contenido relacionado -->
<footer>     <!-- Pie de página -->
```

#### Meta Tags
```html
<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO -->
<title>Quibayo 2026 - Universidad de la Alquimia</title>
<meta name="description" content="...">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
```

#### Preload de Recursos Críticos
```html
<link rel="preload" href="fonts/..." as="font" type="font/ttf" crossorigin>
```

### CSS

#### Metodología BEM
```css
/* Block */
.program-day { }

/* Element */
.program-day__header { }
.program-day__content { }

/* Modifier */
.program-day.is-active { }
.package-box--dark { }
```

#### Custom Properties (Variables)
```css
:root {
  /* 60+ variables organizadas */
  --color-*
  --font-*
  --space-*
  --breakpoint-*
  --transition-*
  --z-*
}
```

#### Unidades Relativas
- **rem:** Todas las dimensiones (escalable)
- **em:** Letter-spacing, line-height
- **%:** Widths, aspect ratios
- **vw/vh:** Full-width/height elements

### JavaScript

#### Librerías Externas
```javascript
// Smooth Scroll
Lenis (1.0.29)

// Animaciones
GSAP (3.12.2)
ScrollTrigger (3.12.2)

// Sliders
Swiper.js (11)
```

#### Funciones Principales

**1. Preloader**
```javascript
async function initPreloader()
// Carga y anima SVG del logo
```

**2. Hero Animation**
```javascript
function startHeroAnimation()
// Anima elementos del hero con GSAP
```

**3. Smooth Scroll**
```javascript
const lenis = new Lenis({ ... })
// Scroll suave en toda la página
```

**4. Acordeón**
```javascript
function toggleAccordion(day)
// Expande/contrae días del programa
```

**5. Reveal Animations**
```javascript
function initReveals()
// Intersection Observer para reveals
```

**6. Debounce/Throttle**
```javascript
function debounce(func, wait)
function throttle(func, limit)
// Optimización de eventos
```

#### Optimizaciones
- Debounce en scroll events (100ms)
- Throttle en header scroll (100ms)
- Cleanup de Intersection Observers
- Lazy loading de imágenes

---

## ♿ Accesibilidad

### Cumplimiento WCAG 2.1 AA

#### Nivel A
✅ 1.1.1 Non-text Content  
✅ 1.3.1 Info and Relationships  
✅ 1.4.1 Use of Color  
✅ 2.1.1 Keyboard  
✅ 2.1.2 No Keyboard Trap  
✅ 2.4.1 Bypass Blocks  
✅ 3.1.1 Language of Page  
✅ 4.1.1 Parsing  
✅ 4.1.2 Name, Role, Value  

#### Nivel AA
✅ 1.4.3 Contrast (Minimum) - 4.5:1  
✅ 1.4.5 Images of Text  
✅ 2.3.3 Animation from Interactions  
✅ 2.4.7 Focus Visible  
✅ 3.2.4 Consistent Identification  

### Características de Accesibilidad

#### Navegación por Teclado
- Tab para navegar
- Enter/Space para activar
- Escape para cerrar menú
- Flechas en sliders

#### ARIA
```html
<!-- Roles -->
role="button"
role="navigation"

<!-- States -->
aria-expanded="true/false"
aria-label="Descripción"

<!-- Properties -->
tabindex="0"
```

#### Focus Management
- Outline visible en todos los elementos
- Skip to main content link
- Focus trap en menú móvil
- Restauración de focus

#### Contraste de Colores
| Combinación | Ratio | Cumple |
|-------------|-------|--------|
| #000 sobre #fff | 21:1 | ✅ AAA |
| #6b6f6e sobre #fff | 4.5:1 | ✅ AA |
| #fff sobre #000 | 21:1 | ✅ AAA |

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ⚡ Performance

### Core Web Vitals

#### LCP (Largest Contentful Paint)
- **Target:** <2.5s
- **Optimizaciones:**
  - Preload de fuentes críticas
  - Dimensiones explícitas en imágenes
  - Lazy loading de imágenes no críticas
  - Hero image optimizada

#### CLS (Cumulative Layout Shift)
- **Target:** <0.1
- **Optimizaciones:**
  - Width/height en todas las imágenes
  - Aspect-ratio en contenedores
  - Sin contenido dinámico sin reserva de espacio

#### FID (First Input Delay)
- **Target:** <100ms
- **Optimizaciones:**
  - Scripts con defer
  - Debounce/throttle en eventos
  - Event delegation
  - Cleanup de observers

### Optimizaciones Implementadas

#### Imágenes
```html
<!-- Dimensiones explícitas -->
<img width="1920" height="1080" />

<!-- Lazy loading -->
<img loading="lazy" />

<!-- Formatos modernos (recomendado) -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

#### JavaScript
```javascript
// Debounce scroll events
const handleScroll = debounce(() => {
  // Código
}, 100);

// Cleanup observers
observer.unobserve(target);

// Lazy load scripts
<script defer>
```

#### CSS
```css
/* Will-change para animaciones */
will-change: opacity, transform;

/* Contain para aislamiento */
contain: layout style paint;

/* Content-visibility para lazy rendering */
content-visibility: auto;
```

### Métricas Esperadas

| Métrica | Valor | Estado |
|---------|-------|--------|
| Performance | 90+ | ✅ Bueno |
| Accessibility | 95+ | ✅ Bueno |
| Best Practices | 90+ | ✅ Bueno |
| SEO | 95+ | ✅ Bueno |

---

## 📦 Dependencias

### CDN
```html
<!-- Lenis Smooth Scroll -->
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Swiper -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### Fuentes
- Inter Tight (Variable)
- NanumMyeongjo (Regular)
- Atkinson Hyperlegible Mono (Regular, Bold)

---

## 🚀 Deployment

### Checklist Pre-Deploy
- [ ] Minificar CSS
- [ ] Minificar JavaScript
- [ ] Optimizar imágenes (WebP, AVIF)
- [ ] Configurar caché headers
- [ ] Habilitar compresión Gzip/Brotli
- [ ] Configurar CSP headers
- [ ] Probar en múltiples navegadores
- [ ] Validar HTML
- [ ] Lighthouse audit >90

### Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📝 Notas de Desarrollo

### Convenciones de Código

#### CSS
- BEM para nomenclatura
- Variables para valores reutilizables
- Mobile-first media queries
- Comentarios por sección

#### JavaScript
- ES6+ syntax
- Funciones documentadas con JSDoc
- Event delegation donde sea posible
- Cleanup de recursos

#### HTML
- Semántica correcta
- ARIA donde sea necesario
- Atributos de accesibilidad
- SEO meta tags

---

**Documentación creada por:** Antigravity AI Assistant  
**Última actualización:** 29 de enero de 2026  
**Versión:** 1.0
