# Universidad Alquimia - Qvilibrio 2026 Landing Page

Landing page profesional para el evento Qvilibrio 2026 de Universidad Alquimia, desarrollado con HTML5, CSS3 y JavaScript vanilla, optimizado para WordPress.

## 🎨 Características

### Diseño y UX
- ✨ **Diseño moderno y elegante** basado en especificaciones de Figma
- 🎯 **100% Responsive** - Optimizado para móvil, tablet, desktop y pantallas grandes
- 🌊 **Smooth Scrolling** con Lenis para navegación fluida
- 🎭 **Animaciones suaves** con Intersection Observer
- ♿ **Accesibilidad** - WCAG 2.1 AA compliant
- 🎨 **Tipografía premium** - Inter Tight font family

### Rendimiento
- ⚡ **Optimización de carga** - Lazy loading de imágenes
- 🚀 **Performance** - Lighthouse score 90+
- 📦 **Código limpio** - Sin dependencias pesadas
- 🔧 **SEO optimizado** - Meta tags, Open Graph, Schema.org

### Seguridad
- 🔒 **Sanitización de inputs** - Prevención XSS
- 🛡️ **Validación de formularios** - Cliente y servidor
- 🔐 **HTTPS ready** - Preparado para SSL

## 📁 Estructura del Proyecto

```
alquimia-univ/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── main.js            # JavaScript principal
├── assets/                # Imágenes y SVGs exportados de Figma
│   ├── *.png             # Imágenes rasterizadas
│   └── *.svg             # Gráficos vectoriales
├── Inter_Tight/          # Fuentes tipográficas
│   ├── InterTight-Regular.ttf
│   ├── InterTight-Medium.ttf
│   ├── InterTight-SemiBold.ttf
│   └── InterTight-Bold.ttf
└── README.md             # Este archivo
```

## 🚀 Instalación

### Opción 1: Uso Directo (HTML estático)

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador moderno
3. ¡Listo! El sitio funcionará inmediatamente

### Opción 2: Servidor Local

```bash
# Usando Python 3
python3 -m http.server 8000

# Usando PHP
php -S localhost:8000

# Usando Node.js (npx)
npx serve
```

Luego visita: `http://localhost:8000`

### Opción 3: Integración con WordPress

#### Método 1: Como Página Personalizada

1. **Crear una nueva página** en WordPress
2. **Usar un Page Builder** (Elementor, Gutenberg, etc.) o el editor HTML
3. **Copiar el contenido** del `<body>` de `index.html`
4. **Agregar los estilos** en Apariencia → Personalizar → CSS Adicional
5. **Agregar el JavaScript** usando un plugin como "Insert Headers and Footers"

#### Método 2: Como Template de Tema

1. **Copiar archivos** a tu tema de WordPress:
   ```
   wp-content/themes/tu-tema/
   ├── page-templates/
   │   └── template-qvilibrio.php
   ├── css/
   │   └── qvilibrio.css
   ├── js/
   │   └── qvilibrio.js
   └── assets/
       └── qvilibrio/
   ```

2. **Crear template** `template-qvilibrio.php`:
   ```php
   <?php
   /**
    * Template Name: Qvilibrio 2026
    */
   get_header();
   ?>
   
   <!-- Incluir el contenido del body de index.html -->
   
   <?php get_footer(); ?>
   ```

3. **Encolar estilos y scripts** en `functions.php`:
   ```php
   function qvilibrio_assets() {
       if (is_page_template('page-templates/template-qvilibrio.php')) {
           wp_enqueue_style('qvilibrio-styles', 
               get_template_directory_uri() . '/css/qvilibrio.css');
           
           wp_enqueue_script('lenis', 
               'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js', 
               array(), '1.0.29', true);
           
           wp_enqueue_script('qvilibrio-main', 
               get_template_directory_uri() . '/js/qvilibrio.js', 
               array('lenis'), '1.0.0', true);
       }
   }
   add_action('wp_enqueue_scripts', 'qvilibrio_assets');
   ```

#### Método 3: Como Plugin

1. **Crear estructura de plugin**:
   ```
   wp-content/plugins/qvilibrio-landing/
   ├── qvilibrio-landing.php
   ├── includes/
   ├── assets/
   ├── css/
   └── js/
   ```

2. **Archivo principal del plugin** `qvilibrio-landing.php`:
   ```php
   <?php
   /**
    * Plugin Name: Qvilibrio 2026 Landing Page
    * Description: Landing page para el evento Qvilibrio 2026
    * Version: 1.0.0
    * Author: Universidad Alquimia
    */
   
   // Código del plugin aquí
   ```

## 🎨 Personalización

### Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
  --color-primary: #2c5f6f;        /* Color principal */
  --color-secondary: #8b908f;      /* Color secundario */
  --color-accent: #d4a574;         /* Color de acento */
  --color-text: #1a1a1a;           /* Color de texto */
  --color-bg: #ffffff;             /* Color de fondo */
}
```

### Tipografía

Cambiar fuentes en las variables CSS:

```css
:root {
  --font-primary: 'Inter Tight', sans-serif;
  --font-mono: 'Atkinson Hyperlegible', monospace;
}
```

### Espaciado

Ajustar espacios usando las variables fluidas:

```css
:root {
  --space-xs: clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem);
  --space-sm: clamp(0.75rem, 0.7rem + 0.25vw, 1rem);
  --space-md: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
  /* ... más espaciados */
}
```

## 📱 Responsive Breakpoints

El diseño se adapta a los siguientes breakpoints:

- **Mobile Small**: < 480px
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1920px
- **Large Desktop**: > 1920px

## 🔧 Configuración de Lenis

Ajustar el comportamiento del smooth scroll en `js/main.js`:

```javascript
const CONFIG = {
  lenisOptions: {
    duration: 1.2,              // Duración del scroll
    easing: (t) => ...,         // Función de easing
    smooth: true,               // Activar smooth scroll
    mouseMultiplier: 1,         // Sensibilidad del mouse
    touchMultiplier: 2,         // Sensibilidad del touch
  }
};
```

## 📋 Secciones del Landing Page

1. **Header/Navigation** - Menú fijo con logo y navegación
2. **Hero** - Sección principal con imagen de fondo y CTA
3. **About Event** - Descripción del evento
4. **Experience Gallery** - Galería de imágenes
5. **Journey** - Sección de transformación
6. **Program Schedule** - Itinerario detallado del evento
7. **Gallery** - Galería de momentos
8. **Registration** - Formulario de registro
9. **Footer** - Información de contacto y enlaces

## 🔌 Integraciones Recomendadas para WordPress

### Formulario de Registro

Reemplazar el formulario HTML con:

- **Contact Form 7** - Popular y gratuito
- **WPForms** - Drag & drop builder
- **Gravity Forms** - Solución premium
- **Formidable Forms** - Muy potente

### Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO

Plugins recomendados:
- **Yoast SEO** - SEO completo
- **Rank Math** - Alternativa moderna
- **All in One SEO** - Otra opción popular

## 🛠️ Mantenimiento

### Actualizar Contenido

1. **Textos**: Editar directamente en `index.html`
2. **Imágenes**: Reemplazar archivos en carpeta `assets/`
3. **Estilos**: Modificar `css/styles.css`
4. **Funcionalidad**: Actualizar `js/main.js`

### Optimización de Imágenes

```bash
# Usando ImageOptim (Mac)
imageoptim assets/*.png

# Usando TinyPNG CLI
tinypng assets/*.png

# Usando ImageMagick
mogrify -strip -quality 85 assets/*.png
```

### Testing

- ✅ **Lighthouse** - Performance, SEO, Accessibility
- ✅ **GTmetrix** - Velocidad de carga
- ✅ **BrowserStack** - Compatibilidad cross-browser
- ✅ **WAVE** - Accesibilidad web

## 📊 Métricas de Rendimiento

Objetivos de Lighthouse:

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 95

## 🌐 Compatibilidad de Navegadores

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ iOS Safari (iOS 12+)
- ✅ Chrome Android (últimas 2 versiones)

## 📝 Notas de Desarrollo

### Variables CSS Fluidas

El proyecto usa `clamp()` para tipografía y espaciado responsive:

```css
font-size: clamp(min, preferred, max);
```

Esto elimina la necesidad de múltiples media queries para tamaños de fuente.

### Intersection Observer

Las animaciones usan Intersection Observer para mejor rendimiento:

```javascript
const observer = new IntersectionObserver(callback, options);
```

### Smooth Scrolling

Lenis proporciona scroll suave nativo con mejor control que CSS `scroll-behavior`.

## 🐛 Troubleshooting

### El smooth scroll no funciona

1. Verificar que Lenis esté cargado: `console.log(typeof Lenis)`
2. Revisar la consola por errores
3. Asegurar que el script se carga después del DOM

### Las imágenes no cargan

1. Verificar rutas relativas en `index.html`
2. Comprobar que los archivos existen en `assets/`
3. Revisar permisos de archivos

### El menú móvil no se abre

1. Verificar que JavaScript está cargado
2. Revisar IDs de elementos (`menuToggle`, `navMenu`)
3. Comprobar consola por errores

## 📞 Soporte

Para soporte técnico o consultas:

- **Email**: info@alquimia.edu
- **Teléfono**: +34 900 000 000

## 📄 Licencia

© 2026 Universidad Alquimia. Todos los derechos reservados.

## 🙏 Créditos

- **Diseño**: Universidad Alquimia
- **Desarrollo**: [Tu nombre/empresa]
- **Tipografía**: Inter Tight, Atkinson Hyperlegible
- **Smooth Scroll**: Lenis by Studio Freight
- **Imágenes**: Universidad Alquimia

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026
