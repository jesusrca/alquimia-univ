# Guia de estilos (tokens + componentes)

## Enfoque del proyecto

- Sistema visual basado en **tokens de diseno**.
- Implementacion de UI con **Tailwind utilities** y estructura por componentes.
- CSS legacy se mantiene para secciones antiguas; bloques nuevos usan Tailwind.

## Tokens de diseno (Tailwind)

Configurados en `tailwind.config.js`.

Build local:

- `npm run build:tailwind` (genera `css/tailwind.css`)
- `npm run watch:tailwind` (watch en desarrollo)

### Color

- `brand.green`: `#CDE0DC` (green-alquimia)
- `brand.gray`: `#8B908F` (gray-alquimia / bordes y acentos)
- `brand.yellow`: `#EFE8CE` (yellow-alquimia)
- `brand.gold`: `#8E7549` (gold-alquimia)
- `brand.greenDark`: `#242F23` (green-dark-alquimia)
- `brand.brown`: `#281811` (brown-alquimia)
- `brand.text`: `#8B908F` (texto base secundario)

### Tipografia

- `font-sans`: Inter Tight
- `font-mono`: Atkinson Hyperlegible Mono
- `font-serif`: NanumMyeongjo

## Componentes UI (segun diseno)

## 1) Recomendaciones

- Fondo crema: `bg-brand-yellow`
- Layout 2 columnas: `grid grid-cols-[250px_minmax(0,1fr)] gap-10`
- Label lateral: `font-mono text-sm tracking-[0.1em] uppercase`
- Texto de contenido: `font-mono text-sm uppercase tracking-[0.08em] leading-[1.7]`
- Grid de items numerados: `grid grid-cols-4 gap-x-6 gap-y-10`

## 2) CTA Preguntas

- Fondo verde suave: `bg-brand-green`
- Contenedor centrado: `min-h-[300px] flex items-center justify-center gap-[120px]`
- Titulo serif: `font-serif text-[52px]`
- Boton outline: `border border-brand-gray font-mono text-sm uppercase tracking-[0.08em]`

## 3) Footer

- Fondo oscuro: `bg-brand-brown`
- Texto dorado: `text-brand-gold`
- Layout principal: `grid grid-cols-[minmax(0,1fr)_320px] grid-rows-[auto_1fr]`
- Datos de contacto: `grid grid-cols-2 gap-y-9 gap-x-20`
- Tipografia contacto: `font-mono text-[30px] uppercase`

## Responsive

- Recomendaciones: `max-md:grid-cols-1`
- CTA: `max-md:flex-col` y reduce `min-h`
- Footer: `max-md:grid-cols-1` + contactos a una sola columna

## Convenciones para nuevos estilos

1. Siempre crear/usar token en `tailwind.config.js` antes de meter hex directo.
2. Preferir utilidades Tailwind en el HTML para bloques nuevos.
3. Si un patron se repite 3+ veces, convertirlo en componente reutilizable.
4. Mantener tipografia en mayusculas solo donde el diseno lo exige.
