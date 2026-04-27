import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import clsx from 'clsx'

export default function PixelModal({ isOpen, onClose, title, children, className = '', maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className={clsx(
              'pixel-border-thick pixel-shadow no-rounded bg-cream dark:bg-nightCard',
              'w-full max-h-[90vh] overflow-y-auto',
              maxWidth,
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b-4 border-ink dark:border-night bg-wood/50 dark:bg-purple-900">
              <h2 className="pixel-text text-sm sm:text-base text-ink dark:text-cream uppercase">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="pixel-border pixel-shadow-sm no-rounded p-1.5 bg-pink dark:bg-rose-700 hover:bg-rose-300 dark:hover:bg-rose-600 active:translate-x-[1px] active:translate-y-[1px]"
                aria-label="Close modal"
              >
                <X size={18} className="text-ink dark:text-cream" />
              </button>
            </div>
            {/* Content */}
            <div className="p-5 retro-text text-lg text-ink dark:text-cream">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
