/**
 * MVP & Extended Asset Checklists
 * 
 * Used for development tracking to see which assets need to be created.
 */

export const MVP_ASSETS = [
  'base/idle.png',
  'base/typing.png',
  'base/relax.png',
  'base/celebrate.png',
  'hair/messy-black.png',
  'glasses/round.png',
  'outfit/hoodie-black.png',
  'accessory/headphones.png',
  'pets/cat-sleep.png',
]

// To generate a full expanded list based on current config options:
import { CHARACTER_OPTIONS } from './characterOptions'

export function getExpandedAssetList() {
  const list = []
  
  // Base
  list.push('base/idle.png', 'base/typing.png', 'base/relax.png', 'base/celebrate.png')
  
  // Hair
  CHARACTER_OPTIONS.hairStyle.forEach(hs => {
    CHARACTER_OPTIONS.hairColor.forEach(hc => {
      list.push(`hair/${hs.id}-${hc.id}.png`)
    })
  })
  
  // Glasses
  CHARACTER_OPTIONS.glasses.forEach(g => {
    if (g.id !== 'none') list.push(`glasses/${g.id}.png`)
  })
  
  // Outfit
  CHARACTER_OPTIONS.outfit.forEach(o => {
    CHARACTER_OPTIONS.outfitColor.forEach(oc => {
      list.push(`outfit/${o.id}-${oc.id}.png`)
    })
  })
  
  // Accessory
  CHARACTER_OPTIONS.accessory.forEach(a => {
    if (a.id !== 'none') list.push(`accessory/${a.id}.png`)
  })

  // Pets
  list.push('pets/cat-idle.png', 'pets/cat-sleep.png')

  return list
}
