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
  'uil'
];

export const getIconifyPackages = () => 
  iconCollections.map(name => `@iconify-json/${name}`);