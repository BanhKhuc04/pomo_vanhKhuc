import React from 'react'
import { ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { CHARACTER_OPTIONS, DEFAULT_CHARACTER_CONFIG, normalizeCharacterConfig } from '../../data/characterOptions'
import ProgressHeader from './components/ProgressHeader'
import AvatarPreview from './components/AvatarPreview'
import CustomizationPanel from './components/CustomizationPanel'

export default function AvatarCreatorScreen({ initial, onSave, onClose, mode = 'screen' }) {
  const [draft, setDraft] = React.useState(() =>
    normalizeCharacterConfig(initial || DEFAULT_CHARACTER_CONFIG)
  )
  const [previewTick, setPreviewTick] = React.useState(0)

  const set = React.useCallback((field, value) => {
    setDraft(prev => {
      if (prev[field] === value) return prev
      return { ...prev, [field]: value }
    })
    setPreviewTick(t => t + 1)
  }, [])

  const handleContinue = () => {
    if (typeof onSave === 'function') onSave(draft)
  }

  const isModal = mode === 'modal'
  const ctaLabel = initial ? 'Save Avatar' : 'Continue'

  return (
    <div className={isModal ? 'relative w-full bg-[#060716] text-white' : 'relative min-h-[100dvh] w-full bg-[#060716] text-white'}>
      {/* Outer atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[80px] opacity-70"
             style={{ background: 'radial-gradient(circle at 30% 30%, #6D28D9 0%, rgba(109,40,217,0) 60%)' }} />
        <div className="absolute top-24 -right-24 w-[520px] h-[520px] rounded-full blur-[90px] opacity-70"
             style={{ background: 'radial-gradient(circle at 60% 40%, #1D4ED8 0%, rgba(29,78,216,0) 62%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] blur-[110px] opacity-50"
             style={{ background: 'radial-gradient(circle at 50% 70%, rgba(236,72,153,0.45) 0%, rgba(236,72,153,0) 60%)' }} />
      </div>

      {/* Mobile frame */}
      <div className={isModal ? 'relative mx-auto w-full max-w-[430px]' : 'relative mx-auto w-full max-w-[430px] min-h-[100dvh] sm:py-8'}>
        <div className={isModal
          ? 'relative rounded-[36px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden'
          : 'relative min-h-[100dvh] sm:min-h-0 sm:rounded-[36px] sm:border sm:border-white/10 sm:shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden'}>
          <div className={isModal
            ? 'smooth-ui font-app antialiased relative flex flex-col px-5 pt-5 pb-5'
            : 'smooth-ui font-app antialiased relative flex min-h-[100dvh] flex-col px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(18px,env(safe-area-inset-bottom))]'}>
            <ProgressHeader
              step={1}
              total={3}
              title="Create your avatar"
              subtitle="Make it feel like you"
            />

            {isModal && typeof onClose === 'function' && (
              <button
                onClick={onClose}
                aria-label="Close"
                title="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            )}

            <div className="relative flex-1 min-h-0 flex items-center justify-center py-4">
              <AvatarPreview config={draft} tick={previewTick} />
            </div>

            <CustomizationPanel
              value={draft}
              options={CHARACTER_OPTIONS}
              onChange={set}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="mt-4 w-full rounded-2xl px-5 py-4 font-semibold tracking-wide text-[15px] text-white shadow-[0_18px_50px_rgba(109,40,217,0.35)] border border-white/10"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 55%, #EC4899 120%)',
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={18} />
                {ctaLabel}
                <ChevronRight size={18} />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
