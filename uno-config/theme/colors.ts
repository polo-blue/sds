// theme/colors.ts
export const colors = {
    // Brand colors - core identity colors
    brand: {
        primary: '#0040c5',    // Main brand color
        secondary: '#00b0f0',  // Supporting brand color
    },

    // Primary blues - main blue palette
    blue: {
        ultralight: '#dbeafe',
        lightest: '#3b82f6',   // Lightest shade
        light: '#0069ff',
        default: '#005ad7',    // Default/base blue
        medium: '#02307d',
        darker: '#001e50',
        darkest: '#000f28',    // Darkest shade
        wrc: '#0000c8',        // Special WRC color
    },

    // Secondary colors - accent palette
    accent: {
        light: '#0099da',
        default: '#0087c1',    // Default accent
        dark: '#006ea6',
        darker: '#00437a',
        deepBlue: '#0c1a32',
    },

    // Neutral colors - grayscale
    neutral: {
        lightest: '#f3f4f6',   // Lightest gray 
        lighter: '#e5e7eb',
        light: '#b5bbc5',
        default: '#9ca3af',    // Base gray
        dark: '#6a767d',       
        darker: '#4b5563',
    },
      
    // Slate colors - gray-blue palette
    slate: {
        light: '#64748B',
        default: '#475569',
        dark: '#334155',    
        darkest: '#1e293b',
    },

    // System colors - functional colors
    system: {
        success: '#10B981',    // Green - success state
        warning: '#FBBF24',    // Yellow - warning state
        error: '#EF4444',      // Red - error state 
        info: '#3B82F6',       // Blue - information state
    },

    // States - interaction states
    state: {
        overlay: 'rgb(0 0 0 / 0.06)',    // Overlay & Hover state
        disabled: 'rgb(0 0 0 / 0.12)',  // Disabled state
    }
};

// Export types for TypeScript
export type Colors = typeof colors;
export type ColorShade = keyof typeof colors;