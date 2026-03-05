// theme/typography.ts
interface FontFamily {
    [key: string]: string[];
  }
  
  interface FontSize {
    [key: string]: string;
  }
  
  interface Typography {
    fontFamily: FontFamily;
    fontSize: FontSize;
  }
  
  export const typography: Typography = {
    fontFamily: {
      sans: ['vw_textregular', 'system-ui', 'ui-sans-serif'],
      novamono: ['Nova Mono'],
      mono: ['Nova Mono'],
      headlight: ['vw_headlight', 'vw_headlight_fallback', 'system-ui'],
      headregular: ['vw_headregular', 'vw_headregular_fallback', 'system-ui'],
      headbold: ['vw_headbold'],
      textlight: ['vw_textlight'],
      textregular: ['vw_textregular'],
      textbold: ['vw_textbold']
    },
    fontSize: {
      xxs: '.625rem',
    }
  };