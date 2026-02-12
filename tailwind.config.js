/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#cde0dc',
          gray: '#8b908f',
          yellow: '#efe8ce',
          gold: '#8e7549',
          greenDark: '#242f23',
          brown: '#281811',
          text: '#8b908f'
        }
      },
      fontFamily: {
        sans: ['Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Atkinson Hyperlegible Mono', 'monospace'],
        serif: ['NanumMyeongjo', 'serif']
      },
      fontSize: {
        'ui-xs': ['0.6875rem', { lineHeight: '1.4' }],  // 11px
        'ui-sm': ['0.75rem', { lineHeight: '1.4' }],     // 12px
        'ui-base': ['0.8125rem', { lineHeight: '1.5' }], // 13px
        'ui-md': ['0.875rem', { lineHeight: '1.5' }],    // 14px
        'ui-lg': ['0.9375rem', { lineHeight: '1.5' }],   // 15px
        'ui-xl': ['1rem', { lineHeight: '1.5' }],        // 16px
        'ui-2xl': ['1.125rem', { lineHeight: '1.4' }],   // 18px
        'ui-3xl': ['1.25rem', { lineHeight: '1.4' }],    // 20px
        'ui-4xl': ['1.5rem', { lineHeight: '1.2' }],     // 24px
        'ui-5xl': ['1.75rem', { lineHeight: '1.2' }],    // 28px
        'ui-6xl': ['2rem', { lineHeight: '1.2' }],       // 32px
        'ui-7xl': ['2.125rem', { lineHeight: '1.2' }],   // 34px
        'ui-8xl': ['3rem', { lineHeight: '1.1' }],       // 48px
        'ui-9xl': ['5.0625rem', { lineHeight: '1' }]     // 81px
      }
    }
  },
  plugins: []
};
