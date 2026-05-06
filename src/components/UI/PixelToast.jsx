import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import clsx from 'clsx'
import { usePomo } from '../../context/PomoContext'

const TYPE_STYLES = {
  success: 'bg-mint border-emerald-700 dark:bg-emerald-900 dark:border-emerald-300',
  info: 'bg-lavender border-indigo-700 dark:bg-indigo-900 dark:border-indigo-300',
  achievement: 'bg-pink border-rose-700 dark:bg-rose-900 dark:border-rose-300',
  warning: 'bg-orange border-orangeDark dark:bg-amber-900 dark:border-amber-300'
}

export default function PixelToastContainer() {
  const { toasts, removeToast, t } = usePomo()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-[90vw] sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={clsx(
              'pixel-border pixel-shadow no-rounded p-3 pr-10 relative text-ink dark:text-cream',
              TYPE_STYLES[toast.type] || TYPE_STYLES.info
            )}
          >
            {toast.title && (
              <div className="pixel-text text-[10px] sm:text-xs mb-1 uppercase">{toast.title}</div>
            )}
            <div className="retro-text text-lg leading-tight">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-1 right-1 p-1 hover:bg-black/10 dark:hover:bg-white/10"
              aria-label={t('stats.closeToast')}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
