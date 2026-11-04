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
      // `vw_head` and `vw_text` carry their weights as @font-face variants
      // (see src/styles/base/typography.css), so `font-head font-bold` loads
      // the real bold face. Prefer these over the single-weight tokens below:
      // those are one family per face, which forces a font-family switch to
      // get bold and leaves any `font-weight` on the element synthesising one.
      // The `_fallback` families are metric-matched locals that cut CLS on swap.
      head: ['vw_head', 'vw_headregular_fallback', 'system-ui', 'ui-sans-serif'],
      text: ['vw_text', 'system-ui', 'ui-sans-serif'],
      // The page default. `vw_textregular` stays behind `vw_text` so a consumer
      // that has not registered the weight-variant families yet keeps the face
      // it renders today instead of dropping to system-ui.
      sans: ['vw_text', 'vw_textregular', 'system-ui', 'ui-sans-serif'],
      novamono: ['Nova Mono'],
      mono: ['Nova Mono'],
      // Deprecated: one family per face. Kept so the existing call sites across
      // polo.blue, catalog and sale keep rendering; new code uses head/text.
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