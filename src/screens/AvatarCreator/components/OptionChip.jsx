import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function OptionChip({ selected, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'shrink-0 rounded-full px-4 py-2 border text-[13px] font-semibold transition-colors whitespace-nowrap',
        selected
          ? 'border-white/45 bg-white/15 text-white shadow-[0_14px_45px_rgba(124,58,237,0.20)]'
          : 'border-white/10 bg-white/5 text-white/70'
      )}
    >
      {children}
    </motion.button>
  )
}

