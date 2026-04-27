import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HAIR_COLOR_HEX, OUTFIT_COLOR_HEX, SKIN_HEX } from '../../data/characterOptions'
import { getAvatarAssetPaths, AVATAR_LAYER_TRANSFORMS } from '../../data/avatarAssets'

/**
 * AvatarCharacter — layer-based pixel-art CSS coder avatar WITH ASSET PIPELINE.
 *
 * Props:
 *   config:         characterConfig object
 *   animationState: 'idle' | 'typing' | 'relax' | 'celebrate'
 *   size:           'sm' | 'md' | 'lg' | 'xl'
 *   useAssets:      boolean (default true) — if true, tries to load PNG assets first.
 *
 * It uses <AssetLayer> to attempt loading a PNG for each layer.
 * If the PNG is missing or fails to load, it gracefully falls back to the CSS version.
 */

// ─── Size table ──────────────────────────────────────────────────────────────
const SIZES = {
  sm: { W: 36, H: 52, head: 14, body: 18, arm: 6, border: 1.5 },
  md: { W: 56, H: 78, head: 22, body: 28, arm: 9,  border: 2   },
  lg: { W: 76, H: 106,head: 30, body: 38, arm: 12, border: 2.5 },
  xl: { W: 120,H: 168,head: 48, body: 60, arm: 18, border: 3   },
}

// ─── Colors ──────────────────────────────────────────────────────────────────
const DARK_BORDER = '#0D0B1A'
const SKIN        = SKIN_HEX
const EYE_COLOR   = '#1A1A2E'
const PANTS_COLOR = '#1E1B4B'
const SHOE_COLOR  = '#17142B'

function darken(hex, amt = 30) {
  try {
    const n = parseInt(hex.replace('#',''), 16)
    const r = Math.max(0, ((n>>16)&0xff) - amt)
    const g = Math.max(0, ((n>>8) &0xff) - amt)
    const b = Math.max(0, ((n>>0) &0xff) - amt)
    return `rgb(${r},${g},${b})`
  } catch { return hex }
}

function lighten(hex, amt = 30) {
  try {
    const n = parseInt(hex.replace('#',''), 16)
    const r = Math.min(255, ((n>>16)&0xff) + amt)
    const g = Math.min(255, ((n>>8) &0xff) + amt)
    const b = Math.min(255, ((n>>0) &0xff) + amt)
    return `rgb(${r},${g},${b})`
  } catch { return hex }
}

// ─── Asset Layer Component ───────────────────────────────────────────────────

/**
 * Tries to load `src`. If it fails or is null, renders `fallback`.
 * Ensures full container size covering and pixelated rendering.
 */
function AssetLayer({ name, src, zIndex, fallback, onStatusChange, transform }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
    if (!src && onStatusChange) onStatusChange(name, 'missing')
  }, [src, name, onStatusChange])

  const handleLoad = () => {
    setLoaded(true)
    if (onStatusChange) onStatusChange(name, 'loaded')
  }

  const handleFail = () => {
    setFailed(true)
    if (onStatusChange) onStatusChange(name, 'fallback')
  }

  if (!src) return <>{fallback}</>

  const transformStyle = transform ? `translate(${transform.x || 0}px, ${transform.y || 0}px) scale(${transform.scale || 1})` : 'none'

  return (
    <>
      <img
        src={src}
        onError={handleFail}
        onLoad={handleLoad}
        className="pixelated"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'contain', pointerEvents: 'none', zIndex,
          display: failed ? 'none' : 'block',
          transform: transformStyle,
          transformOrigin: 'center center',
        }}
      />
      {/* Show fallback while loading, or if failed */}
      {(failed || !loaded) && fallback}
    </>
  )
}

// ─── CSS Layer sub-components ────────────────────────────────────────────────

function HairLayer({ hairStyle, hairColor, W, H, border }) {
  const col = HAIR_COLOR_HEX[hairColor] || HAIR_COLOR_HEX.black
  const headW = W * 0.62
  const x0 = (W - headW) / 2
  const topH = H * 0.10
  const sideH = H * 0.055
  const sideW = W * 0.055

  const shared = { position:'absolute', background: col, imageRendering: 'pixelated', zIndex: 3 }

  if (hairStyle === 'short') return (
    <>
      <div style={{ ...shared, top: H*0.01, left: x0, width: headW, height: topH, borderTop: `${border}px solid ${DARK_BORDER}` }} />
      <div style={{ ...shared, top: H*0.01 + topH, left: x0 - sideW*0.5, width: sideW, height: sideH }} />
      <div style={{ ...shared, top: H*0.01 + topH, right: x0 - sideW*0.5, width: sideW, height: sideH }} />
    </>
  )
  if (hairStyle === 'messy') {
    const spikes = [
      { left: x0 + headW*0.1,  width: headW*0.14, height: topH*1.2, top: H*0.01 - topH*0.3 },
      { left: x0 + headW*0.3,  width: headW*0.16, height: topH*1.5, top: H*0.01 - topH*0.6 },
      { left: x0 + headW*0.52, width: headW*0.15, height: topH*1.3, top: H*0.01 - topH*0.5 },
      { left: x0 + headW*0.7,  width: headW*0.12, height: topH,     top: H*0.01 - topH*0.2 },
    ]
    return (
      <>
        <div style={{ ...shared, top: H*0.01, left: x0, width: headW, height: topH }} />
        {spikes.map((sp, i) => <div key={i} style={{ ...shared, ...sp }} />)}
        <div style={{ ...shared, top: H*0.01 + topH, left: x0 - sideW*0.5, width: sideW, height: sideH*1.4 }} />
        <div style={{ ...shared, top: H*0.01 + topH, right: x0 - sideW*0.5, width: sideW, height: sideH*1.4 }} />
      </>
    )
  }
  if (hairStyle === 'side') {
    return (
      <>
        <div style={{ ...shared, top: H*0.01, left: x0 - headW*0.12, width: headW*1.12, height: topH*0.9 }} />
        <div style={{ ...shared, top: H*0.01 + topH*0.9, left: x0 - headW*0.12, width: headW*0.35, height: sideH }} />
        <div style={{ ...shared, top: H*0.01 + topH*0.9, right: x0 - sideW*0.5, width: sideW, height: sideH }} />
      </>
    )
  }
  return null
}

function GlassesLayer({ glasses, W, H, border }) {
  if (!glasses || glasses === 'none') return null
  const headW = W * 0.62
  const x0    = (W - headW) / 2
  // We add H*0.01 to eyeY to account for the head's top offset relative to the container
  const headTop = H * 0.01
  const eyeY  = headTop + (W * 0.92) * 0.17 
  const lensW = headW * 0.33
  const lensH = (W * 0.92) * 0.065
  const gap   = headW * 0.04
  const frameColor = '#A78BFA'

  const lensStyle = {
    position: 'absolute', width: lensW, height: lensH, top: eyeY,
    border: `${border*0.8}px solid ${frameColor}`, background: 'rgba(167,139,250,0.08)',
    imageRendering: 'pixelated', zIndex: 4
  }

  return (
    <>
      <div style={{ ...lensStyle, left: x0 + headW*0.05, borderRadius: glasses === 'round' ? '50%' : 0 }} />
      <div style={{ ...lensStyle, left: x0 + headW*0.05 + lensW + gap, borderRadius: glasses === 'round' ? '50%' : 0 }} />
      <div style={{ position:'absolute', top: eyeY + lensH*0.4, left: x0 + headW*0.05 + lensW, width: gap, height: Math.max(1, border*0.6), background: frameColor, zIndex: 4 }} />
      <div style={{ position:'absolute', top: eyeY + lensH*0.4, left: x0 - W*0.04, width: W*0.04, height: Math.max(1, border*0.6), background: frameColor, zIndex: 4 }} />
      <div style={{ position:'absolute', top: eyeY + lensH*0.4, left: x0 + headW*0.05 + lensW*2 + gap, width: W*0.04, height: Math.max(1, border*0.6), background: frameColor, zIndex: 4 }} />
    </>
  )
}

function OutfitLayer({ outfit, outfitColor, bodyW, bodyH, bodyTop, bodyX, border }) {
  const col    = OUTFIT_COLOR_HEX[outfitColor] || OUTFIT_COLOR_HEX.purple
  const dark   = darken(col, 35)
  const light  = lighten(col, 20)

  // Outfit is wrapped in a container that matches the torso's position
  const containerStyle = {
    position:'absolute', top: bodyTop, left: bodyX, width: bodyW, height: bodyH,
    border: `${border}px solid ${DARK_BORDER}`, imageRendering: 'pixelated',
    overflow: 'visible', zIndex: 2
  }

  // NOTE: using BODY_W and BODY_H from upper scope directly to keep code clean since we are just moving the logic
  const W = bodyW; const H = bodyH;

  let inner = null
  if (outfit === 'hoodie') {
    inner = (
      <>
        <div style={{ position:'absolute', top:0, left: W*0.2, right: W*0.2, height: H*0.18, background: dark, borderRadius: '0 0 2px 2px' }} />
        <div style={{ position:'absolute', top: H*0.18, left:0, right:0, bottom:0, background: col }} />
        <div style={{ position:'absolute', bottom: H*0.1, left: '50%', transform: 'translateX(-50%)', width: W*0.38, height: H*0.26, border: `${Math.max(1,border*0.7)}px solid ${dark}`, borderRadius: '0 0 2px 2px', background: dark }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height: H*0.08, background: dark }} />
      </>
    )
  } else if (outfit === 'tshirt') {
    inner = (
      <>
        <div style={{ position:'absolute', inset:0, background: col }} />
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width: W*0.25, height: H*0.20, background: SKIN, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div style={{ position:'absolute', top: H*0.05, left: -W*0.01, width: W*0.14, height: H*0.25, background: dark }} />
        <div style={{ position:'absolute', top: H*0.05, right: -W*0.01, width: W*0.14, height: H*0.25, background: dark }} />
      </>
    )
  } else if (outfit === 'sweater') {
    inner = (
      <>
        <div style={{ position:'absolute', inset:0, background: col }} />
        <div style={{ position:'absolute', top:0, left: W*0.25, right: W*0.25, height: H*0.22, background: dark }} />
        {[0.3, 0.5, 0.7].map((yPct, i) => (
          <div key={i} style={{ position:'absolute', top: H*yPct, left: W*0.05, right: W*0.05, height: Math.max(1, H*0.05), background: light, opacity: 0.5 }} />
        ))}
      </>
    )
  }

  return <div style={containerStyle}>{inner}</div>
}

function AccessoryLayer({ accessory, W, H, border, bodyTop, bodyX, BODY_W, ARM_W, HEAD_W }) {
  if (!accessory || accessory === 'none') return null
  
  if (accessory === 'headphones') {
    const headW = W * 0.62
    const x0    = (W - headW) / 2
    const arcH  = H * 0.14
    const cupW  = W * 0.065
    const cupH  = H * 0.055

    return (
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:5 }}>
        <div style={{ position:'absolute', top: H*0.015, left: x0 - cupW*0.3, right: x0 - cupW*0.3, height: arcH, border: `${Math.max(2, border)}px solid #7C3AED`, borderBottom: 'none', borderRadius: '50% 50% 0 0 / 80% 80% 0 0', background: 'transparent' }} />
        <div style={{ position:'absolute', top: H*0.015 + arcH - cupH*0.5, left: x0 - cupW*0.8, width: cupW, height: cupH, background: '#7C3AED', borderRadius: 2, border: `${Math.max(1,border*0.6)}px solid #5B21B6` }} />
        <div style={{ position:'absolute', top: H*0.015 + arcH - cupH*0.5, right: x0 - cupW*0.8, width: cupW, height: cupH, background: '#7C3AED', borderRadius: 2, border: `${Math.max(1,border*0.6)}px solid #5B21B6` }} />
      </div>
    )
  }
  
  if (accessory === 'coffee') {
    return (
      <div style={{ position:'absolute', top: bodyTop + BODY_W*0.75*0.3, left: bodyX + BODY_W + ARM_W + 2, fontSize: Math.max(10, HEAD_W*0.55), zIndex: 5 }}>
        ☕
      </div>
    )
  }
  return null
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function AvatarCharacter({ 
  config: incomingConfig, 
  animationState = 'idle', 
  size = 'md', 
  useAssets = true,
  onAssetStatusChange 
}) {
  const shouldReduceMotion = useReducedMotion()
  const config = incomingConfig || {}
  const sz = SIZES[size] || SIZES.md
  const { W, H, head: HEAD_W, body: BODY_W, arm: ARM_W, border: BORDER } = sz

  const hairStyle   = config.hairStyle   || 'messy'
  const hairColor   = config.hairColor   || 'black'
  const glasses     = config.glasses     || 'none'
  const outfit      = config.outfit      || 'hoodie'
  const outfitColor = config.outfitColor || 'purple'
  const accessory   = config.accessory   || 'none'

  const HEAD_H  = HEAD_W * 0.92
  const BODY_H  = BODY_W * 0.75
  const ARM_H   = BODY_H * 0.85
  const LEG_W   = BODY_W * 0.35
  const LEG_H   = BODY_H * 0.65
  const bodyX   = (W - BODY_W) / 2
  const headX   = (W - HEAD_W) / 2
  const bodyTop = HEAD_H * 1.05 + H * 0.01

  const outfitBg = OUTFIT_COLOR_HEX[outfitColor] || OUTFIT_COLOR_HEX.purple

  // Asset paths
  const assets = useAssets ? getAvatarAssetPaths(config, animationState) : {}

  // ─── Motion variants ────────────────────────────────────────────────────────
  const noMotion = shouldReduceMotion

  const bodyAnim = noMotion ? {} : {
    idle:      { animate: { scaleY:[1,1.02,1], y:[0,-1,0] }, transition: { duration:3.5, repeat:Infinity, ease:'easeInOut' } },
    typing:    { animate: { y:[0,-2.5,0] }, transition: { duration:0.22, repeat:Infinity } },
    relax:     { animate: { rotate:[-1.2,1.2,-1.2], y:[0,-2,0] }, transition: { duration:4.5, repeat:Infinity, ease:'easeInOut' } },
    celebrate: { animate: { y:[0,-14,0,-9,0] }, transition: { duration:0.45, repeat:4, ease:'easeOut' } },
  }[animationState] || {}

  const blinkAnim = noMotion ? {} : {
    idle:      { animate: { scaleY:[1,1,0.06,1,1] }, transition: { duration:4.5, repeat:Infinity, times:[0,0.42,0.46,0.5,1] } },
    typing:    { animate: { scaleY:[1,0.06,1] }, transition: { duration:3.2, repeat:Infinity } },
    relax:     { animate: { scaleY:0.4 }, transition:{} },
    celebrate: { animate: { scaleY:[1,0.06,1,0.06,1] }, transition: { duration:0.5, repeat:2 } },
  }[animationState] || {}

  return (
    <div style={{ position:'relative', width:W, height:H, display:'inline-block', imageRendering:'pixelated' }}>

      {/* ── Celebrate sparkles ── */}
      {animationState === 'celebrate' && !noMotion && (
        <>
          {['✨','⭐','✨'].map((s,i) => (
            <motion.div key={i}
              style={{ position:'absolute', top: -H*0.2, left:`${25+i*25}%`, fontSize: HEAD_W*0.35, pointerEvents:'none', zIndex:20 }}
              animate={{ opacity:[0,1,0], y:[0,-H*0.4] }}
              transition={{ duration:0.7, delay:i*0.15, repeat:2 }}>
              {s}
            </motion.div>
          ))}
        </>
      )}

      {/* ── Full character body wrapper ── */}
      <motion.div
        animate={bodyAnim.animate}
        transition={bodyAnim.transition}
        style={{ position:'absolute', inset:0 }}
      >
        {/* ════ [LAYER: BASE] (Head, Neck, Arms, Legs) ════ */}
        <AssetLayer name="base" src={assets.base} zIndex={1} onStatusChange={onAssetStatusChange} transform={AVATAR_LAYER_TRANSFORMS?.base} fallback={
          <>
            {/* Head/Skin */}
            <div style={{ position:'absolute', top: H*0.01, left: headX, width: HEAD_W, height: HEAD_H, background: SKIN, border: `${BORDER}px solid ${DARK_BORDER}`, zIndex: 2 }}>
              <motion.div animate={blinkAnim.animate} transition={blinkAnim.transition} style={{ position:'absolute', top:'38%', left:0, right:0, display:'flex', justifyContent:'space-around', padding:`0 ${HEAD_W*0.14}px`, transformOrigin:'center' }}>
                <div style={{ width:Math.max(2,HEAD_W*0.14), height:Math.max(2,HEAD_W*0.14), background:EYE_COLOR }} />
                <div style={{ width:Math.max(2,HEAD_W*0.14), height:Math.max(2,HEAD_W*0.14), background:EYE_COLOR }} />
              </motion.div>
              <div style={{ position:'absolute', bottom:'16%', left:'28%', right:'28%', height: Math.max(1, BORDER*0.8), background: EYE_COLOR }} />
            </div>

            {/* Neck */}
            <div style={{ position:'absolute', top: H*0.01 + HEAD_H - 1, left: (W - HEAD_W*0.32)/2, width: HEAD_W*0.32, height: Math.max(3, H*0.04), background: SKIN, border: `${Math.max(1,BORDER*0.7)}px solid ${DARK_BORDER}`, zIndex: 1 }} />

            {/* Arms */}
            <motion.div animate={!noMotion && animationState === 'typing' ? { rotate:[-8,4,-8] } : { rotate:0 }} transition={{ duration:0.2, repeat:animationState==='typing'?Infinity:0 }} style={{ position:'absolute', top: bodyTop + BODY_H*0.1, left: bodyX - ARM_W + BORDER, width: ARM_W, height: ARM_H, background: outfitBg, border: `${BORDER}px solid ${DARK_BORDER}`, transformOrigin: 'top center', zIndex:1 }}>
              <div style={{ position:'absolute', bottom:-Math.max(2,BORDER), left:'15%', width: ARM_W*0.7, height: Math.max(3,ARM_W*0.35), background:SKIN, border:`${Math.max(1,BORDER*0.6)}px solid ${DARK_BORDER}` }} />
            </motion.div>
            <motion.div animate={!noMotion && animationState === 'typing' ? { rotate:[8,-4,8] } : { rotate:0 }} transition={{ duration:0.2, repeat:animationState==='typing'?Infinity:0, delay:0.1 }} style={{ position:'absolute', top: bodyTop + BODY_H*0.1, left: bodyX + BODY_W - BORDER, width: ARM_W, height: ARM_H, background: outfitBg, border: `${BORDER}px solid ${DARK_BORDER}`, transformOrigin: 'top center', zIndex:1 }}>
              <div style={{ position:'absolute', bottom:-Math.max(2,BORDER), left:'15%', width: ARM_W*0.7, height: Math.max(3,ARM_W*0.35), background:SKIN, border:`${Math.max(1,BORDER*0.6)}px solid ${DARK_BORDER}` }} />
            </motion.div>

            {/* Legs */}
            <div style={{ position:'absolute', top: bodyTop + BODY_H - BORDER, left: bodyX + BODY_W*0.1, display:'flex', gap: BODY_W*0.08, zIndex:1 }}>
              <div style={{ width:LEG_W, height:LEG_H, background:PANTS_COLOR, border:`${BORDER}px solid ${DARK_BORDER}` }}>
                <div style={{ position:'absolute', bottom:0, width:'100%', height:LEG_H*0.25, background:SHOE_COLOR }} />
              </div>
              <div style={{ width:LEG_W, height:LEG_H, background:PANTS_COLOR, border:`${BORDER}px solid ${DARK_BORDER}`, position:'relative' }}>
                <div style={{ position:'absolute', bottom:0, width:'100%', height:LEG_H*0.25, background:SHOE_COLOR }} />
              </div>
            </div>
          </>
        } />

        {/* ════ [LAYER: OUTFIT] ════ */}
        <AssetLayer name="outfit" src={assets.outfit} zIndex={2} onStatusChange={onAssetStatusChange} transform={AVATAR_LAYER_TRANSFORMS?.outfit} fallback={
          <OutfitLayer outfit={outfit} outfitColor={outfitColor} bodyW={BODY_W} bodyH={BODY_H} bodyTop={bodyTop} bodyX={bodyX} border={BORDER} />
        } />

        {/* ════ [LAYER: HAIR] ════ */}
        <AssetLayer name="hair" src={assets.hair} zIndex={3} onStatusChange={onAssetStatusChange} transform={AVATAR_LAYER_TRANSFORMS?.hair} fallback={
          <HairLayer hairStyle={hairStyle} hairColor={hairColor} W={W} H={H} border={BORDER} />
        } />

        {/* ════ [LAYER: GLASSES] ════ */}
        <AssetLayer name="glasses" src={assets.glasses} zIndex={4} onStatusChange={onAssetStatusChange} transform={AVATAR_LAYER_TRANSFORMS?.glasses} fallback={
          <GlassesLayer glasses={glasses} W={W} H={H} border={BORDER} />
        } />

        {/* ════ [LAYER: ACCESSORY] ════ */}
        <AssetLayer name="accessory" src={assets.accessory} zIndex={5} onStatusChange={onAssetStatusChange} transform={AVATAR_LAYER_TRANSFORMS?.accessory} fallback={
          <AccessoryLayer accessory={accessory} W={W} H={H} border={BORDER} bodyTop={bodyTop} bodyX={bodyX} BODY_W={BODY_W} ARM_W={ARM_W} HEAD_W={HEAD_W} />
        } />

      </motion.div>
    </div>
  )
}
