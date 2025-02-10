export const COLORS = {
  // Brand Colors
  brand: [
    { name: "primary", value: "#0040c5" },
    { name: "secondary", value: "#00b0f0" }
  ],

  // Primary Blues 
  blue: [
    { name: "ultralight", value: "#dbeafe" },  
    { name: "lightest", value: "#3b82f6" },
    { name: "light", value: "#0069ff" },
    { name: "default", value: "#005ad7" }, 
    { name: "medium", value: "#02307d" },
    { name: "darker", value: "#001e50" },
    { name: "darkest", value: "#000f28" },
    { name: "wrc", value: "#0000c8" }
  ],

  // Accent Colors
  accent: [
    { name: "lightest", value: "#00b0f0" },
    { name: "light", value: "#0099da" },
    { name: "default", value: "#0087c1" },
    { name: "dark", value: "#006ea6" },
    { name: "darker", value: "#00437a" },
    { name: "deepBlue", value: "#0c1a32" }
  ],

  // Neutral Colors
  neutral: [
    { name: "lightest", value: "#f3f4f6" },
    { name: "lighter", value: "#e5e7eb" },
    { name: "light", value: "#b5bbc5" },
    { name: "default", value: "#9ca3af" },
    { name: "dark", value: "#6a767d" },
    { name: "darker", value: "#4b5563"},
    { name: "black", value: "#000000" }
  ],

  // Slate Colors  
  slate: [
    { name: "light", value: "#64748B" },
    { name: "default", value: "#475569" },
    { name: "dark", value: "#334155" },
    { name: "darker", value: "#1e293b" },  // Previously 'darkest'
    { name: "darkest", value: "#0f172a" }  // New shade added
  ],

  // System Colors
  system: [
    { name: "success", value: "#10B981" },
    { name: "warning", value: "#FBBF24" },
    { name: "error", value: "#EF4444" }, 
    { name: "info", value: "#3B82F6" }
  ],

  // State Colors
  state: [
    { name: "overlay", value: "rgb(0 0 0 / 0.06)" },
    { name: "disabled", value: "rgb(0 0 0 / 0.12)" }, 
  ]
};

export const TYPOGRAPHY = {
  scale: [
    { name: "h1", size: "22pt", weight: "400" },
    { name: "h2", size: "17pt", weight: "500" },
    { name: "h3", size: "13pt", weight: "600" },
    { name: "h4", size: "13pt", weight: "500" },
    { name: "body", size: "13pt", weight: "400" },
    { name: "button", size: "13pt", weight: "400" },
    { name: "caption", size: "10pt", weight: "400" }
  ]
};

export const FONTS = {
  types: [
    { name: "sans", value: "font-textregular" },
    { name: "text-regular", value: "font-textregular" },
    { name: "text-bold", value: "font-textbold" },
    { name: "head-bold", value: "font-headbold" },
    { name: "head-regular", value: "font-headregular" },
    { name: "head-light", value: "font-headlight" },
    { name: "text-light", value: "font-textlight" },
    { name: "mono", value: "font-novamono" }
  ]
};

export const SHADOWS = {  
  types: [
    { name: "xs", value: "0px 2px 4px rgba(0, 0, 0, 0.08)" },
    { name: "sm", value: "0px 4px 8px rgba(0, 0, 0, 0.125)" },
    { name: "md", value: "0px 8px 16px rgba(0, 0, 0, 0.125)" },
    { name: "lg", value: "0px 16px 32px rgba(0, 0, 0, 0.125)" },
    { name: "xl", value: "0px 32px 64px rgba(0, 0, 0, 0.125)" },    
    { name: "2xl", value: "0px 64px 128px rgba(0, 0, 0, 0.125)" }
  ]
};