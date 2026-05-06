import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function OptionChip({ selected, onClick, children, className }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ y: 2, scale: 0.98 }}
      className={clsx(
        'shrink-0 rounded-[22px] border-[3px] text-[13px] transition-colors shadow-[0_5px_0_#D7B680]',
        selected
          ? 'border-[#8B5E34] bg-[#FCE7B2] text-[#4B3425]'
          : 'border-[#D5B27B] bg-[#FFF7E8] text-[#6B4A2E]',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
