import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, MessageCircleMore, Sparkles, X } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'

const SUPPORT_QR_SRC = '/images/support/vietcombank-qr.jpg'
const SUPPORT_BANNER_SRC = '/images/support/thankyou.png'
const SUPPORT_FEEDBACK_URL = 'https://forms.gle/25Qn8ho3WeK41k1d6'

export function SupportFloatingButton({ onClick }) {
  const { t, playSfx } = usePomo()

  return (
    <button
      type="button"
      onClick={() => {
        playSfx('CLICK')
        onClick?.()
      }}
      className="fixed left-3 bottom-3 sm:left-4 sm:bottom-4 z-[180] app-primary-btn rounded-2xl px-3.5 py-2.5 shadow-[0_14px_28px_rgba(76,53,184,0.34)] transition-transform hover:-translate-y-0.5"
      aria-label={t('support.open')}
      title={t('support.open')}
    >
      <span className="flex items-center gap-2">
        <span className="text-[16px]">💖</span>
        <span className="pixel-text text-[8px] sm:text-[9px] uppercase whitespace-nowrap">{t('common.support')}</span>
      </span>
    </button>
  )
}

export default function SupportModal({ isOpen, onClose }) {
  const { t, playSfx } = usePomo()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center p-4"
          style={{ background: 'var(--app-overlay)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="app-modal-shell w-[min(94vw,1040px)] max-h-[calc(100dvh-48px)] overflow-hidden rounded-[30px] flex flex-col"
          >
            <div className="app-modal-header flex items-center justify-between px-5 py-4">
              <div>
                <h2 className="pixel-text text-[12px] uppercase tracking-[0.11em] app-main-text">{t('support.title')}</h2>
                <p className="retro-text text-[16px] leading-none app-muted mt-1">{t('support.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="app-secondary-btn w-10 h-10 rounded-xl flex items-center justify-center"
                aria-label={t('support.closeSupport')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 min-h-0 p-4 sm:p-5 lg:p-6 overflow-y-auto lg:overflow-hidden custom-scrollbar">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-5 lg:items-stretch min-h-full">
                <section className="app-section-card rounded-[28px] p-0 overflow-hidden flex flex-col h-full">
                  <div
                    className="relative overflow-hidden bg-[#120F2E] min-h-[250px] sm:min-h-[280px] lg:min-h-[318px]"
                    style={{
                      borderBottom: '1px solid rgba(138,111,252,0.26)',
                      boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.04), 0 20px 42px rgba(53,33,126,0.2)',
                    }}
                  >
                    <img
                      src={SUPPORT_BANNER_SRC}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 block h-full w-full object-cover object-center scale-[1.035]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, rgba(12,10,32,0.08) 0%, rgba(12,10,32,0.12) 38%, rgba(12,10,32,0.3) 82%, rgba(12,10,32,0.5) 100%)',
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at 16% 22%, rgba(138,111,252,0.18) 0%, rgba(138,111,252,0.02) 32%, rgba(0,0,0,0) 56%), radial-gradient(circle at 86% 18%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0.02) 26%, rgba(0,0,0,0) 46%)',
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        boxShadow: 'inset 0 -24px 38px rgba(8,7,24,0.22), 0 0 42px rgba(111,76,230,0.1)',
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12">
                      <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm" style={{ borderColor: 'rgba(178,156,255,0.28)', background: 'rgba(19,16,46,0.62)' }}>
                        <Heart size={14} fill="currentColor" className="text-[#F7B94A]" />
                        <span className="pixel-text text-[8px] uppercase text-white">{t('support.title')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5 text-center flex-1 flex flex-col justify-between gap-4">
                    <div>
                    <h3 className="retro-text text-[21px] sm:text-[23px] lg:text-[25px] leading-[1.08] app-main-text">
                      {t('support.heading')}
                    </h3>

                    <p className="retro-text mx-auto mt-2.5 max-w-[420px] text-[14px] lg:text-[15px] leading-[1.28]" style={{ color: 'color-mix(in srgb, var(--app-text-main) 70%, transparent 30%)' }}>
                      {t('support.description')}
                    </p>
                    </div>

                    <div
                      className="mt-4 rounded-2xl border px-4 py-3 text-left h-[110px] lg:h-[112px] overflow-hidden"
                      style={{ borderColor: 'rgba(138,111,252,0.22)', background: 'rgba(21,18,47,0.56)' }}
                    >
                      <div className="mx-auto flex h-full w-full max-w-[308px] flex-col justify-start">
                      <div className="flex min-h-[16px] items-center gap-2 app-kicker">
                        <Sparkles size={14} className="text-[#F7B94A]" />
                        <span className="pixel-text text-[8px] uppercase app-main-text">{t('support.scanLabel')}</span>
                      </div>
                      <p className="retro-text mt-2 text-[13px] lg:text-[14px] leading-[1.24] text-[#D8D0F8]">
                        {t('support.qrNote')}
                      </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section
                  className="rounded-[28px] border p-4 sm:p-5 lg:p-5 text-left flex flex-col h-full"
                  style={{
                    borderColor: 'rgba(138,111,252,0.34)',
                    background: 'linear-gradient(180deg, rgba(41,30,97,0.96) 0%, rgba(20,18,49,0.96) 100%)',
                    boxShadow: '0 18px 40px rgba(15,12,38,0.38), 0 0 0 1px rgba(138,111,252,0.12), 0 0 28px rgba(111,76,230,0.22)',
                  }}
                >
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="pixel-text text-[8px] uppercase app-kicker">{t('support.scanLabel')}</div>
                          <div className="retro-text mt-1 text-[15px] lg:text-[17px] leading-none text-[#F3EEFF]">{t('support.qrTitle')}</div>
                        </div>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(138,111,252,0.32)', background: 'rgba(255,255,255,0.06)' }}>
                          <Heart size={16} fill="currentColor" className="text-[#F7B94A]" />
                        </span>
                      </div>

                      <p className="retro-text mt-2.5 text-[13px] lg:text-[14px] leading-[1.22] text-[#D8D0F8]">
                        {t('support.qrHelp')}
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-3">
                      <div className="rounded-2xl bg-white p-3 shadow-[0_14px_28px_rgba(4,7,22,0.16)] max-w-[250px] sm:max-w-[280px] lg:max-w-[260px] w-full mx-auto">
                        <img
                          src={SUPPORT_QR_SRC}
                          alt={t('support.qrAlt')}
                          className="block w-full h-auto rounded-xl"
                        />
                      </div>

                      <div
                        className="rounded-2xl border px-4 py-3 h-[110px] lg:h-[112px] overflow-hidden"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
                      >
                        <div className="mx-auto flex h-full w-full max-w-[308px] flex-col justify-start">
                        <div className="flex min-h-[16px] items-center app-kicker">
                          <div className="pixel-text text-[8px] uppercase text-[#E9E0FF]">Vietcombank</div>
                        </div>
                        <p className="retro-text mt-2 text-[13px] lg:text-[14px] leading-[1.24] text-[#D8D0F8]">
                          {t('support.qrNote')}
                        </p>
                        </div>
                      </div>

                      <div
                        className="rounded-2xl border px-4 py-4 sm:px-4.5 sm:py-4.5"
                        style={{
                          borderColor: 'rgba(138,111,252,0.26)',
                          background: 'linear-gradient(180deg, rgba(38,28,92,0.94) 0%, rgba(23,18,56,0.96) 100%)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 30px rgba(10,8,28,0.24), 0 0 24px rgba(111,76,230,0.12)',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
                            style={{
                              borderColor: 'rgba(138,111,252,0.32)',
                              background: 'linear-gradient(180deg, rgba(123,92,255,0.2) 0%, rgba(56,189,248,0.08) 100%)',
                              boxShadow: '0 8px 20px rgba(76,53,184,0.18)',
                            }}
                          >
                            <MessageCircleMore size={18} className="text-[#E7D7FF]" />
                          </span>
                          <div className="min-w-0">
                            <div className="pixel-text text-[8px] uppercase tracking-[0.11em] text-[#F3EEFF]">
                              {t('support.feedbackTitle')}
                            </div>
                            <p className="retro-text mt-2 text-[13px] lg:text-[14px] leading-[1.26] text-[#D8D0F8]">
                              {t('support.feedbackDescription')}
                            </p>
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 1 }}
                          onClick={() => {
                            playSfx('CLICK')
                            window.open(SUPPORT_FEEDBACK_URL, '_blank', 'noopener,noreferrer')
                          }}
                          className="mt-4 app-primary-btn w-full rounded-xl px-4 py-3 text-white shadow-[0_14px_30px_rgba(76,53,184,0.26)]"
                          style={{
                            boxShadow: '0 14px 30px rgba(76,53,184,0.26), 0 0 22px rgba(111,76,230,0.14)',
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ y: [0, -1.5, 0] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                              className="inline-flex"
                            >
                              <MessageCircleMore size={16} />
                            </motion.span>
                            <span className="pixel-text text-[8px] uppercase">{t('support.feedbackButton')}</span>
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="app-footer-bar px-5 py-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 pixel-text text-[8px] uppercase transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(138,111,252,0.3)',
                  color: '#F3EEFF',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'rgba(247,185,74,0.18)'
                  event.currentTarget.style.borderColor = 'rgba(247,185,74,0.62)'
                  event.currentTarget.style.color = '#FFD67A'
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  event.currentTarget.style.borderColor = 'rgba(138,111,252,0.3)'
                  event.currentTarget.style.color = '#F3EEFF'
                }}
              >
                {t('support.closeButton')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
