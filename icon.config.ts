// icon.config.ts

interface IconConfig {
  include: {
    [key: string]: string[];
  };
  collections?: {
    [key: string]: () => Promise<any>;
  };
}

// List of all supported collections
export const iconCollections = [
  'ant-design',
  'bi',
  'bx',
  'carbon',
  'circle-flags',
  'ei',
  'el',
  'eos-icons',
  'et',
  'flowbite',
  'fluent',
  'fluent-emoji',
  'ic',
  'icon-park-outline',
  'la',
  'material-symbols-light',
  'mdi',
  'noto-v1',
  'octicon',
  'ph',
  'simple-icons',
  'system-uicons',
  'uil',
  'lucide',
  'vscode-icons',
  'streamline-freehand-color',
] as const;

export type IconCollectionName = typeof iconCollections[number];

export const iconConfig: IconConfig = {
  include: {
    mdi: [
      // Social
      "npm", 
      "github", 
      "facebook", 
      "instagram",
      "youtube",

      // Notes & Content
      "post-it-note-edit-outline",
      
      // Car related
      "car-hatchback",
      "car-door", 
      "car-side",
      "car-windshield-outline",
      "car-light-alert",
      "car-tire-alert",
      "car-light-dimmed",
      "car-light-fog",
      "car-light-high",
      "car-parking-lights",
      "car-esp",
      "car-brake-abs",
      "car-horn",
      "engine-outline",
      
      // Climate & Temperature
      "fan",
      "fan-off",
      "air-conditioner",
      "coolant-temperature",
      
      // Alerts & Warnings
      "car-brake-alert",
      "car-traction-control",
      
      // Other
      "card-text-outline",
      "fuel",
      "oil",
      "hazard-lights",
      "credit-card-outline"
    ],

    "ant-design": [
      "menu-fold-outlined",
      "menu-unfold-outlined",
      "menu-outlined",
      "bars-outlined",
      "appstore-outlined",
      "cluster-outlined",
      "audit-outlined",
      "build-twotone",
      "home-outlined",
      "close-outlined"
    ],

    bi: [
      "credit-card",
      "emoji-smile",
      "envelope-open",
      "folder",
      "graph-up",
      "list-check",
      "list-task",
      "qr-code",
      "tag",
      "tags",
      "text-indent-left",
      "text-indent-right",
      "x"
    ],

    bx: [
      "arrow-back",
      "check",
      "detail",
      "file",
      "car",
      "credit-card",
      "barcode",
      "qr"
    ],

    carbon: [
      "language",
      "checkmark",
      "home",
      "dicom-overlay"
    ],

    el: [
      "star-empty",
      "star",
      "heart-empty",
      "heart",
      "map-marker",
      "fire",
      "quote-right",
      "qrcode",
      "car",
      "indent-left",
      "indent-right",
      "ok"
    ],

    'eos-icons': [
      "three-dots-loading",
      "bubble-loading",
      "loading",
      "installing"
    ],

    fluent: [
      "share-android-24-regular",
      "checkmark-24-filled",
      "tag-24-regular",
      "tag-multiple-24-regular"
    ],

    "fluent-emoji": [
      "cookie",
      "construction",
      "warning",
      "wrench"
    ],

    la: [
      "arrow-right",
      "arrow-left",
      "car",
      "car-side"
    ],

    octicon: [
      "chevron-left-24",
      "x-24",
      "alert-24",
      "graph-24",
      "comment-24",
      "comment-discussion-24",
      "clock-24",
      "star-24",
      "star-fill-24",
      "file-media-24",
      "heart-24",
      "heart-fill-24",
      "project-roadmap-24",
      "location-24",
      "info-24",
      "mark-github-16"
    ],

    uil: [
      "map-marker",
      "envelope",
      "phone",
      "tag-alt"
    ],

    lucide: [
      "book-text",
      "brain",
      "camera",
      "car-front",
      "car",
      "circle",
      "circuit-board",
      "codesandbox",
      "component",
      "cpu",
      "disc-2",
      "fan",
      "folder",
      "info",
      "lamp",
      "lightbulb",
      "link",
      "package",
      "qr-code",
      "radio",
      "scan-qr-code",
      "settings",
      "split",
      "trash-2",
      "warehouse",
      "wind",
      "wrench",
    ],

    "simple-icons": [
      "astro",
      "ebay",
      "allegro",
      "volkswagen",
      "audi",
      "skoda",
      "seat",
      "whatsapp",
      "x",
      "facebook",
      "messenger",
      "instagram",
      "telegram",
      "carrd"
    ],

    "icon-park-outline": [
      "shopping-bag",
      "comment",
      "comments",
      "tag-one"
    ],

    flowbite: [
      "arrow-left-outline",
      "arrow-right-outline",
      "angle-left-outline",
      "angle-right-outline",
      "chevron-left-outline",
      "chevron-right-outline",
      "map-location-outline",
      "map-pin-alt-solid",
      "x-outline",
      "messages-outline",
      "arrow-down-to-bracket-outline",
      "check-outline",
      "plus-outline",
      "edit-outline",
    ],

    ph: [
      'images-light',
      'image-square-thin',
      'cat-thin',
      'copy-simple-light',
      'engine-bold',
    ],

    ic: [
      'sharp-photo-library'
    ],

    'material-symbols-light': [
      'broken-image-outline'
    ],

    et: [
      'documents'
    ],

    'system-uicons': [
      'document-justified'
    ],

    'vscode-icons': [
      'file-type-astro',
      'file-type-unocss',
      'file-type-vue',
      'file-type-typescript',
      'file-type-node',
      'file-type-npm'
    ],

    'streamline-freehand-color': [
      'data-transfer-document-module',
      'design-process-drawing-board',
      'app-window-source-code',
      'app-window-layout',
      'database',
      'module-building-blocks',
      'layouts-array-1',
      'archive-box',
      'donation-charity-donate-box'
    ]
  },
  collections: {
    "streamline-freehand-color": () => import("@iconify-json/streamline-freehand-color/icons.json")
  }
};

// Helpers
export function isIconIncluded(collection: IconCollectionName, iconName: string): boolean {
  return iconConfig.include[collection]?.includes(iconName) ?? false;
}

export function getIncludedIcons(collection: IconCollectionName): string[] {
  return iconConfig.include[collection] || [];
}

export function getAllIncludedIcons(): { [key in IconCollectionName]?: string[] } {
  return iconConfig.include;
}

export default iconConfig;