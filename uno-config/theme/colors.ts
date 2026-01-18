// theme/colors.ts
// OKLCH color format for perceptual uniformity and better palette generation
// L = Lightness (0-100%), C = Chroma (0-0.4), H = Hue (0-360)

export const colors = {
    // Brand colors - core identity colors
    brand: {
        primary: 'oklch(44% 0.213 263)',    // #0040c5 - Main brand color
        secondary: 'oklch(71% 0.149 234)',  // #00b0f0 - Supporting brand color
    },

    // Primary blues - main blue palette
    blue: {
        ultralight: 'oklch(93% 0.032 256)', // #dbeafe
        lightest: 'oklch(62% 0.188 260)',   // #3b82f6
        light: 'oklch(57% 0.237 260)',      // #0069ff
        default: 'oklch(51% 0.206 260)',    // #005ad7
        medium: 'oklch(34% 0.139 261)',     // #02307d
        darker: 'oklch(25% 0.099 259)',     // #001e50
        darkest: 'oklch(17% 0.058 256)',    // #000f28
        wrc: 'oklch(38% 0.261 264)',        // #0000c8 - Special WRC color
    },

    // Secondary colors - accent palette (cyan-blue tones)
    accent: {
        light: 'oklch(65% 0.143 238)',      // #0099da
        medium: 'oklch(59% 0.158 248)',     // #0082d6
        default: 'oklch(59% 0.130 238)',    // #0087c1
        dark: 'oklch(51% 0.121 241)',       // #006ea6
        darker: 'oklch(38% 0.111 251)',     // #00437a
        deepBlue: 'oklch(22% 0.051 261)',   // #0c1a32
    },

    // Neutral colors - grayscale
    neutral: {
        lightest: 'oklch(97% 0.003 265)',   // #f3f4f6
        lighter: 'oklch(93% 0.006 265)',    // #e5e7eb
        light: 'oklch(79% 0.016 261)',      // #b5bbc5
        default: 'oklch(71% 0.019 261)',    // #9ca3af
        dark: 'oklch(56% 0.018 233)',       // #6a767d
        darker: 'oklch(45% 0.026 257)',     // #4b5563
    },

    // Slate colors - gray-blue palette
    slate: {
        light: 'oklch(55% 0.041 257)',      // #64748B
        default: 'oklch(45% 0.037 257)',    // #475569
        dark: 'oklch(37% 0.039 257)',       // #334155
        darkest: 'oklch(28% 0.037 260)',    // #1e293b
    },

    // System colors - functional colors
    system: {
        success: 'oklch(70% 0.149 163)',    // #10B981 - Green
        warning: 'oklch(84% 0.164 84)',     // #FBBF24 - Yellow
        error: 'oklch(64% 0.208 25)',       // #EF4444 - Red
        info: 'oklch(62% 0.188 260)',       // #3B82F6 - Blue
    },

    // States - interaction states
    state: {
        overlay: 'oklch(0% 0 0 / 0.06)',    // Overlay & Hover state
        disabled: 'oklch(0% 0 0 / 0.12)',   // Disabled state
    }
};

// Export types for TypeScript
export type Colors = typeof colors;
export type ColorShade = keyof typeof colors;
