// icon.config.ts
import type { IconCollectionJSON } from '@iconify/types'

// Import specific icon collections
import antDesignIcons from '@iconify-json/ant-design/icons.json'
import biIcons from '@iconify-json/bi/icons.json'
import bxIcons from '@iconify-json/bx/icons.json'
import carbonIcons from '@iconify-json/carbon/icons.json'
import elIcons from '@iconify-json/el/icons.json'
import eosIcons from '@iconify-json/eos-icons/icons.json'
import fluentIcons from '@iconify-json/fluent/icons.json'
import fluentEmojiIcons from '@iconify-json/fluent-emoji/icons.json'
import laIcons from '@iconify-json/la/icons.json'
import octiconIcons from '@iconify-json/octicon/icons.json'
import uilIcons from '@iconify-json/uil/icons.json'
import simpleIcons from '@iconify-json/simple-icons/icons.json'
import iconParkOutlineIcons from '@iconify-json/icon-park-outline/icons.json'
import flowbiteIcons from '@iconify-json/flowbite/icons.json'
import phIcons from '@iconify-json/ph/icons.json'
import icIcons from '@iconify-json/ic/icons.json'
import materialSymbolsLightIcons from '@iconify-json/material-symbols-light/icons.json'
import etIcons from '@iconify-json/et/icons.json'
import systemUiconsIcons from '@iconify-json/system-uicons/icons.json'

interface IconConfig {
  include: {
    [key: string]: string[];
  }
}

// Mapping of collection names to their full icon sets
const iconCollections: { [key: string]: IconCollectionJSON } = {
  'ant-design': antDesignIcons,
  'bi': biIcons,
  'bx': bxIcons,
  'carbon': carbonIcons,
  'el': elIcons,
  'eos-icons': eosIcons,
  'fluent': fluentIcons,
  'fluent-emoji': fluentEmojiIcons,
  'la': laIcons,
  'octicon': octiconIcons,
  'uil': uilIcons,
  'simple-icons': simpleIcons,
  'icon-park-outline': iconParkOutlineIcons,
  'flowbite': flowbiteIcons,
  'ph': phIcons,
  'ic': icIcons,
  'material-symbols-light': materialSymbolsLightIcons,
  'et': etIcons,
  'system-uicons': systemUiconsIcons
}

export const iconConfig: IconConfig = {
  include: {
    mdi: [
      // Social
      "npm", 
      "github", 
      "facebook", 
      "instagram",
      
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
    // ... reszta konfiguracji ikon tak jak w oryginalnym pliku
  }
}

// Helper functions
export function getIconCollection(name: keyof typeof iconCollections) {
  return iconCollections[name]
}

export function hasIcon(collectionName: keyof typeof iconCollections, iconName: string): boolean {
  const collection = iconCollections[collectionName]
  if (!collection) return false
  
  // Check if the icon is in the include list
  const includeList = iconConfig.include[collectionName]
  if (includeList && !includeList.includes(iconName)) {
    return false
  }
  
  return collection.icons?.[iconName] !== undefined
}

export function getIncludedIcons(collectionName: keyof typeof iconCollections) {
  return iconConfig.include[collectionName] || []
}

// Export everything
export {
  iconCollections,
  IconConfig
}

export default iconConfig