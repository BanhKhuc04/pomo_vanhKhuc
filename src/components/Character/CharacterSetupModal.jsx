import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, User, Sparkles } from 'lucide-react'
import AvatarCharacter from './AvatarCharacter'
import { CHARACTER_OPTIONS, DEFAULT_CHARACTER_CONFIG, normalizeCharacterConfig } from '../../data/characterOptions'
import { AVATAR_LAYER_TRANSFORMS } from '../../data/avatarAssets'

/**
 * CharacterSetupModal — Game-style character creator.
 *
 * Props:
 *   isOpen:  boolean
 *   onClose: () => void
 *   onSave:  (config) => void
 *   initial: characterConfig | null
 */
export default function CharacterSetupModal({ isOpen, onClose, onSave, initial }) {
  const [draft, setDraft] = useState(() => normalizeCharacterConfig(initial || DEFAULT_CHARACTER_CONFIG))
  const [assetStatus, setAssetStatus] = useState({})

  React.useEffect(() => {
    if (isOpen) {
      setDraft(normalizeCharacterConfig(initial || DEFAULT_CHARACTER_CONFIG))
      setAssetStatus({})
    }
  }, [isOpen, initial])

  const set = (field, value) => setDraft(prev => ({ ...prev, [field]: value }))
  
  const handleAssetStatusChange = React.useCallback((layer, status) => {
    setAssetStatus(prev => {
      if (prev[layer] === status) return prev
      return { ...prev, [layer]: status }
    })
  }, [])
  const isNew = !initial

  const handleSave = () => { onSave(draft); onClose() }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="char-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          style={{ background: 'rgba(13,11,26,0.94)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            key="char-modal-panel"
            initial={{ scale: 0.9, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-4xl flex flex-col border-2 border-panelBorder no-rounded overflow-hidden"
            style={{
              maxHeight: '94vh',
              background: '#17142B',
              boxShadow: '0 0 60px #7C3AED30, 6px 6px 0 #0D0B1A',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-panelBorder shrink-0"
                 style={{ background: 'linear-gradient(90deg, #211D3F 0%, #2D1F5E 100%)' }}>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles size={14} className="text-amber" />
                  <h2 className="pixel-text text-[11px] text-textMain">
                    {isNew ? 'Create Your Coder' : 'Edit Your Coder'}
                  </h2>
                </div>
                <p className="retro-text text-base text-textMuted">
                  {isNew ? 'Customize your focus companion' : 'Change your character look'}
                </p>
              </div>
              {!isNew && (
                <button onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center border-2 border-panelBorder hover:border-neonPink text-textMuted hover:text-neonPink transition-colors no-rounded"
                  style={{ background: '#17142B' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* ── 2-column body ── */}
            <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">

              {/* ─── LEFT: Live Preview ─── */}
              <div className="sm:w-64 flex-none flex flex-col items-center gap-4 border-b-2 sm:border-b-0 sm:border-r-2 border-panelBorder p-5"
                   style={{ background: '#1A1640' }}>

                {/* Mini room preview */}
                <div className="relative border-2 border-panelBorder overflow-hidden flex items-end justify-center"
                     style={{ width: 200, height: 200, background: 'linear-gradient(180deg, #0D0B1A 0%, #17142B 55%, #1E1A3A 100%)', flexShrink: 0 }}>
                  {/* Stars */}
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute select-none animate-twinkle"
                         style={{ fontSize: 7+i%3, color: i%3===0?'#FBBF24':'#FFF3D6',
                           top: `${5+(i*7)%45}%`, left: `${8+(i*13)%80}%`,
                           opacity: 0.5, animationDelay: `${i*0.35}s` }}>
                      ✦
                    </div>
                  ))}
                  {/* Moon */}
                  <div className="absolute top-4 right-6 text-2xl">🌙</div>

                  {/* City silhouette */}
                  {[
                    { l:'5%', w:12, h:30 }, { l:'14%',w:8,  h:20 },
                    { l:'21%',w:16, h:38 }, { l:'38%',w:10, h:26 },
                    { l:'50%',w:14, h:34 }, { l:'64%',w:8,  h:18 },
                    { l:'72%',w:18, h:40 }, { l:'88%',w:10, h:28 },
                  ].map((b, i) => (
                    <div key={i} className="absolute bottom-0"
                         style={{ left:b.l, width:b.w, height:b.h, background:'#0D0B1A' }}>
                      {/* Building windows */}
                      {[...Array(3)].map((_,j) => (
                        <div key={j} className="absolute w-[3px] h-[3px]"
                             style={{ top:`${20+j*28}%`, left:'30%',
                               background: Math.random()>0.5?'#FBBF24':'transparent' }} />
                      ))}
                    </div>
                  ))}

                  {/* Desk line */}
                  <div className="absolute left-0 right-0 border-t border-panelBorder"
                       style={{ bottom: 46, background:'#241F45', height:6 }} />

                  {/* Monitor on desk */}
                  <div className="absolute"
                       style={{ bottom: 52, right: 28 }}>
                    <div className="border border-panelBorder flex items-center justify-center"
                         style={{ width:28, height:20, background:'#1E1B4B', boxShadow:'0 0 6px #4F46E560' }}>
                      <div className="flex flex-col gap-[2px] w-full px-1">
                        {[...Array(4)].map((_,i) => (
                          <div key={i} className="h-[2px] rounded-none"
                               style={{ background:['#7C3AED','#4F46E5','#A78BFA','#818CF8'][i], width:`${[80,60,90,50][i]}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="w-[2px] h-3 bg-panelBorder mx-auto" />
                    <div className="h-[2px] w-8 bg-panelBorder" />
                  </div>

                  {/* Lamp */}
                  <div className="absolute" style={{ bottom:52, left:24 }}>
                    <div className="border border-amber/60" style={{ width:16, height:8, background:'#FBBF24', boxShadow:'0 4px 8px #FBBF2450' }} />
                    <div className="w-[2px] h-8 bg-panelBorder mx-auto" />
                  </div>

                  {/* Avatar */}
                  <div className="absolute" style={{ bottom: 48, left:'50%', transform:'translateX(-50%)' }}>
                    <AvatarCharacter 
                      config={draft} 
                      animationState="idle" 
                      size="lg" 
                      useAssets={true}
                      onAssetStatusChange={handleAssetStatusChange}
                    />
                  </div>
                </div>

                {/* Dev Mode Asset Debugger */}
                {import.meta.env.DEV && (
                  <div className="w-full p-2 border-2 border-panelBorder bg-[#0D0B1A] text-left">
                    <div className="text-vio pixel-text text-[8px] mb-1.5 border-b-2 border-panelBorder pb-1 flex justify-between">
                      <span>ASSET PIPELINE</span>
                      <span>{Object.values(assetStatus).filter(v => v === 'loaded').length}/5 PNGs</span>
                    </div>
                    {['base', 'outfit', 'hair', 'glasses', 'accessory'].map(layer => {
                      const status = assetStatus[layer] || 'waiting'
                      let color = '#A9A1C8' // waiting
                      let text = 'WAITING'
                      if (status === 'loaded') { color = '#10B981'; text = 'PNG LOADED' }
                      if (status === 'fallback') { color = '#F59E0B'; text = 'CSS FALLBACK' }
                      if (status === 'missing') { color = '#6B7280'; text = 'NOT APPLICABLE' }
                      
                      const tf = AVATAR_LAYER_TRANSFORMS[layer]
                      const tfString = tf && (tf.x !== 0 || tf.y !== 0 || tf.scale !== 1)
                        ? ` (x:${tf.x} y:${tf.y} s:${tf.scale})`
                        : ''

                      return (
                        <div key={layer} className="flex justify-between items-center retro-text text-[10px] mb-1">
                          <span className="text-textMain capitalize">{layer}<span className="text-vio">{tfString}</span></span>
                          <span style={{ color }}>{text}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Character name input */}
                <div className="w-full">
                  <label className="pixel-text text-[8px] text-textMuted uppercase block mb-1.5">
                    <User size={10} className="inline mr-1" />Character Name
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={draft.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your coder name"
                    className="w-full border-2 border-panelBorder bg-panelDeep text-textMain px-3 py-2 retro-text text-lg no-rounded focus:outline-none focus:border-vio/60 placeholder:text-textMuted/50"
                  />
                </div>

                {/* Pet selection (compact, in preview column) */}
                <div className="w-full">
                  <label className="pixel-text text-[8px] text-textMuted uppercase block mb-1.5">Desk Pet</label>
                  <div className="flex gap-2">
                    {CHARACTER_OPTIONS.pet.map(o => (
                      <OptionChip key={o.id} active={draft.pet === o.id} onClick={() => set('pet', o.id)}>
                        {o.emoji} {o.label}
                      </OptionChip>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── RIGHT: Options ─── */}
              <div className="flex-1 min-h-0 overflow-y-auto p-5">

                {/* Section: Hair */}
                <Section title="Hair Style">
                  <div className="flex flex-wrap gap-2">
                    {CHARACTER_OPTIONS.hairStyle.map(o => (
                      <OptionChip key={o.id} active={draft.hairStyle === o.id} onClick={() => set('hairStyle', o.id)}>
                        {o.emoji} {o.label}
                      </OptionChip>
                    ))}
                  </div>
                </Section>

                <Section title="Hair Color">
                  <div className="flex gap-3 flex-wrap">
                    {CHARACTER_OPTIONS.hairColor.map(o => (
                      <ColorSwatch key={o.id} color={o.hex} label={o.label}
                        active={draft.hairColor === o.id} onClick={() => set('hairColor', o.id)} />
                    ))}
                  </div>
                </Section>

                <Section title="Glasses">
                  <div className="flex flex-wrap gap-2">
                    {CHARACTER_OPTIONS.glasses.map(o => (
                      <OptionChip key={o.id} active={draft.glasses === o.id} onClick={() => set('glasses', o.id)}>
                        {o.emoji} {o.label}
                      </OptionChip>
                    ))}
                  </div>
                </Section>

                <Section title="Outfit Style">
                  <div className="flex flex-wrap gap-2">
                    {CHARACTER_OPTIONS.outfit.map(o => (
                      <OptionChip key={o.id} active={draft.outfit === o.id} onClick={() => set('outfit', o.id)}>
                        {o.emoji} {o.label}
                      </OptionChip>
                    ))}
                  </div>
                </Section>

                <Section title="Outfit Color">
                  <div className="flex gap-3 flex-wrap">
                    {CHARACTER_OPTIONS.outfitColor.map(o => (
                      <ColorSwatch key={o.id} color={o.hex} label={o.label}
                        active={draft.outfitColor === o.id} onClick={() => set('outfitColor', o.id)} />
                    ))}
                  </div>
                </Section>

                <Section title="Accessory" border={false}>
                  <div className="flex flex-wrap gap-2">
                    {CHARACTER_OPTIONS.accessory.map(o => (
                      <OptionChip key={o.id} active={draft.accessory === o.id} onClick={() => set('accessory', o.id)}>
                        {o.emoji} {o.label}
                      </OptionChip>
                    ))}
                  </div>
                </Section>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between px-5 py-3 border-t-2 border-panelBorder shrink-0"
                 style={{ background: '#211D3F' }}>
              <p className="retro-text text-base text-textMuted">
                {isNew
                  ? '🎯 You can edit this later with the character icon in the header'
                  : <button onClick={onClose} className="hover:text-textMain transition-colors">Cancel</button>
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="pixel-text text-[10px] text-white px-7 py-3 border-2 border-vio uppercase no-rounded flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                  boxShadow: '0 0 16px #7C3AED50, 2px 2px 0 #0D0B1A',
                }}
              >
                {isNew ? '🚀 Start Focus Journey' : '✅ Save Changes'}
                <ChevronRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Helper UI components ──────────────────────────────────────────────────────

function Section({ title, children, border = true }) {
  return (
    <div className={`mb-5 ${border ? 'pb-5 border-b border-panelBorder/50' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <ChevronRight size={10} className="text-vio" />
        <span className="pixel-text text-[8px] text-textMuted uppercase tracking-widest">{title}</span>
      </div>
      {children}
    </div>
  )
}

function OptionChip({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="retro-text text-base px-4 py-1.5 border-2 uppercase transition-all no-rounded"
      style={{
        background: active ? 'rgba(124,58,237,0.2)' : '#17142B',
        borderColor: active ? '#7C3AED' : '#4B3B78',
        color: active ? '#FFF3D6' : '#A9A1C8',
        boxShadow: active ? '0 0 10px #7C3AED50, inset 0 0 8px #7C3AED15' : 'none',
      }}
    >
      {children}
    </motion.button>
  )
}

function ColorSwatch({ color, label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={label}
      className="flex flex-col items-center gap-1"
    >
      <div className="w-9 h-9 border-2 transition-all no-rounded"
           style={{
             background: color,
             borderColor: active ? '#FBBF24' : '#4B3B78',
             boxShadow: active ? '0 0 10px #FBBF2460, 0 0 4px #FBBF24' : 'none',
           }} />
      <span className="retro-text text-xs"
            style={{ color: active ? '#FBBF24' : '#A9A1C8' }}>
        {label}
      </span>
    </motion.button>
  )
}
