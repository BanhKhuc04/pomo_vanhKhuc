import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AvatarCreatorScreen from './AvatarCreatorScreen'

export default function AvatarCreatorModal({ isOpen, initial, onClose, onSave }) {
  React.useEffect(() => {
    if (!isOpen) return
    const prev = document.documentElement.dataset.modal
    document.documentElement.dataset.modal = 'avatar'
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      if (prev === undefined) delete document.documentElement.dataset.modal
      else document.documentElement.dataset.modal = prev
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="avatar-creator-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-5"
          style={{ background: 'rgba(95, 70, 45, 0.22)', backdropFilter: 'blur(8px)' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.()
          }}
        >
          <motion.div
            key="avatar-creator-panel"
            initial={{ scale: 0.96, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="w-full max-w-6xl"
            style={{ maxHeight: '94vh' }}
          >
            <AvatarCreatorScreen
              mode="modal"
              initial={initial}
              onSave={(cfg) => {
                onSave?.(cfg)
                onClose?.()
              }}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
