import React from 'react'
import clsx from 'clsx'
import { ChevronRight, Sparkles, X } from 'lucide-react'
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

  React.useEffect(() => {
    setDraft(normalizeCharacterConfig(initial || DEFAULT_CHARACTER_CONFIG))
    setPreviewTick(0)
  }, [initial])

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
  const ctaLabel = initial ? 'Save Avatar' : 'Start My Journey'

  return (
    <div
      className={clsx(
        'smooth-ui font-app antialiased relative overflow-hidden text-[#4B3425]',
        isModal ? 'w-full' : 'min-h-[100dvh] w-full'
      )}
      style={{
        background: 'linear-gradient(180deg, #CFE8FF 0%, #E7F2FF 28%, #F8F3E7 68%, #E9D8BA 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[36vh] bg-[radial-gradient(circle_at_top,#FFFFFFAA_0%,#FFFFFF55_24%,transparent_62%)]" />
        <div className="absolute -top-14 left-[3%] h-40 w-40 rounded-full bg-white/55 blur-3xl" />
        <div className="absolute top-14 right-[10%] h-28 w-28 rounded-full bg-[#FFF7E8]/80 blur-2xl" />
        <div className="absolute left-[12%] top-[15%] h-9 w-16 rounded-full bg-white/85 shadow-[22px_6px_0_0_rgba(255,255,255,0.75)]" />
        <div className="absolute right-[18%] top-[18%] h-8 w-14 rounded-full bg-white/80 shadow-[18px_5px_0_0_rgba(255,255,255,0.7)]" />
        <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-[linear-gradient(180deg,rgba(168,198,134,0)_0%,rgba(168,198,134,0.2)_38%,rgba(123,174,115,0.48)_100%)]" />
        <div className="absolute bottom-0 left-[-6%] h-48 w-[34%] rounded-t-[999px] bg-[#A8C686]" />
        <div className="absolute bottom-0 left-[24%] h-40 w-[32%] rounded-t-[999px] bg-[#93BD80]" />
        <div className="absolute bottom-0 right-[-8%] h-52 w-[38%] rounded-t-[999px] bg-[#7BAE73]" />
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-60"
            style={{
              width: index % 2 === 0 ? 8 : 6,
              height: index % 2 === 0 ? 8 : 6,
              left: `${5 + ((index * 7.2) % 90)}%`,
              top: `${14 + ((index * 10.2) % 72)}%`,
              background: index % 4 === 0 ? '#E7C66B' : index % 4 === 1 ? '#FFFFFF' : index % 4 === 2 ? '#C86B5A' : '#7DA8D6',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      <div className={clsx('relative mx-auto w-full max-w-7xl', isModal ? 'px-3 py-3 sm:px-5' : 'px-4 py-[max(18px,env(safe-area-inset-top))] sm:px-6 lg:px-8 lg:py-10')}>
        <div className="relative overflow-hidden rounded-[34px] border-[4px] border-[#8B5E34] bg-[#FFF7E8]/96 shadow-[0_12px_0_#D7B680,0_28px_70px_rgba(91,66,40,0.24)]">
          <div className="absolute inset-x-0 top-0 h-5 bg-[linear-gradient(90deg,#A9784A_0%,#C89B6D_36%,#E7C66B_70%,#C89B6D_100%)]" />
          <div className="absolute inset-x-0 top-5 h-2 bg-[#EBD6AF]" />

          {isModal && typeof onClose === 'function' && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close avatar creator"
              title="Close avatar creator"
              className="absolute right-4 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-[16px] border-[3px] border-[#8B5E34] bg-[#F6EBD3] text-[#7B5633] shadow-[0_4px_0_#D5B27B] transition-transform hover:-translate-y-0.5"
            >
              <X size={18} />
            </button>
          )}

          <div className={clsx('relative p-4 pt-10 sm:p-6 sm:pt-12 lg:p-8 lg:pt-14', isModal ? 'max-h-[88vh] overflow-y-auto custom-scrollbar' : 'min-h-[100dvh] lg:min-h-0')}>
            <ProgressHeader
              step={1}
              total={3}
              title="Create your cozy avatar"
              subtitle="Make a little character that feels like you before you begin your focus journey."
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(360px,0.92fr)_minmax(0,1.08fr)] lg:items-start">
              <AvatarPreview config={draft} tick={previewTick} />

              <div className="flex min-w-0 flex-col gap-4">
                <CustomizationPanel
                  value={draft}
                  options={CHARACTER_OPTIONS}
                  onChange={set}
                />

                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ y: 2, scale: 0.99 }}
                  onClick={handleContinue}
                  className="w-full rounded-[24px] border-[4px] border-[#8B5E34] bg-[#E7C66B] px-5 py-4 text-[#4B3425] shadow-[0_8px_0_#C89B6D,0_18px_28px_rgba(123,82,41,0.22)]"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[14px] border-[3px] border-[#8B5E34] bg-[#FFF7E8]">
                      <Sparkles size={18} />
                    </span>
                    <span className="pixel-text text-[11px] uppercase tracking-[0.12em]">
                      {ctaLabel}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-[14px] border-[3px] border-[#8B5E34] bg-[#FFF7E8]">
                      <ChevronRight size={18} />
                    </span>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
