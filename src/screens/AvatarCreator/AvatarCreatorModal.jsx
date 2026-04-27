import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AvatarCreatorScreen from './AvatarCreatorScreen'

export default function AvatarCreatorModal({ isOpen, initial, onClose, onSave }) {
  React.useEffect(() => {
    if (!isOpen) return
    const prev = document.documentElement.dataset.modal
    document.documentElement.dataset.modal = 'avatar'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
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
          className="fixed inset-0 z-[220] flex items-center justify-center p-4"
          style={{ background: 'rgba(6,7,22,0.72)', backdropFilter: 'blur(10px)' }}
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
            className="w-full max-w-[460px]"
            style={{ maxHeight: '92vh' }}
          >
            <div className="max-h-[92vh] overflow-hidden rounded-[36px]">
              <div className="max-h-[92vh] overflow-y-auto custom-scrollbar">
                <AvatarCreatorScreen
                  mode="modal"
                  initial={initial}
                  onSave={(cfg) => {
                    onSave?.(cfg)
                    onClose?.()
                  }}
                  onClose={onClose}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
