import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AvatarCharacter from '../../../components/Character/AvatarCharacter'

export default function AvatarPreview({ config, tick }) {
  const reduce = useReducedMotion()
  const flowerColors = ['#E7C66B', '#C86B5A', '#7DA8D6', '#F6EBD3']
  const summaryChips = [
    { label: 'Hair', value: config?.hairStyle },
    { label: 'Outfit', value: config?.outfit },
    { label: 'Accessory', value: config?.accessory === 'none' ? 'simple' : config?.accessory },
  ]

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="rounded-[28px] border-[4px] border-[#A9784A] bg-[#F6EBD3] p-4 shadow-[0_8px_0_#D7B680,0_16px_30px_rgba(118,87,56,0.18)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="pixel-text text-[10px] uppercase tracking-[0.14em] text-[#8B5E34]">Preview</div>
            <div className="retro-text mt-1 text-[26px] leading-none text-[#4B3425]">Your Character</div>
          </div>
          <div className="rounded-full border-[3px] border-[#A9784A] bg-[#FFF7E8] px-3 py-1.5 pixel-text text-[9px] uppercase tracking-[0.12em] text-[#5F8F5B] shadow-[0_3px_0_#D7B680]">
            Ready to Grow
          </div>
        </div>

        <div className="mt-4 rounded-[26px] border-[4px] border-[#8B5E34] bg-[#FFF7E8] p-3 shadow-[inset_0_4px_0_rgba(255,255,255,0.45)]">
          <div className="relative min-h-[340px] overflow-hidden rounded-[20px] border-[4px] border-[#A9784A] bg-[linear-gradient(180deg,#CFE8FF_0%,#DFF1FF_40%,#F8F3E7_100%)] sm:min-h-[390px]">
            <div className="absolute right-5 top-5 h-14 w-14 rounded-full border-[3px] border-[#E7C66B] bg-[#FFF6C7] shadow-[0_0_0_6px_rgba(255,247,203,0.55)]" />
            <div className="absolute left-[10%] top-[16%] h-8 w-16 rounded-full bg-white/90 shadow-[24px_5px_0_0_rgba(255,255,255,0.82)]" />
            <div className="absolute right-[18%] top-[22%] h-7 w-14 rounded-full bg-white/90 shadow-[20px_4px_0_0_rgba(255,255,255,0.78)]" />
            <div className="absolute inset-x-0 bottom-16 h-28 rounded-t-[999px] bg-[#A8C686]" />
            <div className="absolute inset-x-[-10%] bottom-0 h-24 rounded-t-[999px] bg-[#7BAE73]" />
            <div className="absolute inset-x-[18%] bottom-[58px] h-10 rounded-[20px] border-[4px] border-[#8B5E34] bg-[#C89B6D] shadow-[0_5px_0_#A9784A]" />

            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="absolute bottom-5 flex h-6 w-6 items-end justify-center"
                style={{ left: `${8 + index * 12.5}%` }}
              >
                <div className="absolute bottom-0 h-4 w-1 rounded-full bg-[#5F8F5B]" />
                <div
                  className="absolute bottom-3 h-3 w-3 rounded-full border-2 border-[#FFF7E8]"
                  style={{ background: flowerColors[index % flowerColors.length] }}
                />
              </div>
            ))}

            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute rounded-sm"
                initial={false}
                animate={
                  reduce
                    ? { opacity: 0.7 }
                    : {
                        y: [0, -10, 0],
                        x: [0, index % 2 === 0 ? 4 : -4, 0],
                        opacity: [0.45, 1, 0.55],
                        rotate: [0, 8, -6, 0],
                      }
                }
                transition={
                  reduce
                    ? {}
                    : { duration: 4 + (index % 3) * 0.8, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }
                }
                style={{
                  left: `${14 + ((index * 11) % 72)}%`,
                  top: `${12 + ((index * 9) % 48)}%`,
                  width: index % 2 === 0 ? 8 : 6,
                  height: index % 2 === 0 ? 8 : 6,
                  background: index % 3 === 0 ? '#E7C66B' : index % 3 === 1 ? '#F6EBD3' : '#7DA8D6',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.25)',
                }}
              />
            ))}

            <div className="absolute inset-x-0 bottom-[82px] flex justify-center">
              <motion.div
                key={tick}
                initial={{ y: 10, scale: 0.94, rotate: -1.5 }}
                animate={{ y: 0, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 310, damping: 20 }}
              >
                <motion.div
                  animate={
                    reduce
                      ? {}
                      : {
                          y: [0, -9, 0],
                          rotate: [-0.8, 0.8, -0.8],
                        }
                  }
                  transition={reduce ? {} : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="origin-bottom"
                >
                  <AvatarCharacter config={config} animationState="idle" size="xl" useAssets={false} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {summaryChips.map((chip) => (
            <div
              key={chip.label}
              className="rounded-full border-[3px] border-[#A9784A] bg-[#FFF7E8] px-3 py-1.5 shadow-[0_3px_0_#D7B680]"
            >
              <span className="pixel-text text-[8px] uppercase tracking-[0.12em] text-[#8B5E34]">
                {chip.label}
              </span>
              <span className="ml-2 retro-text text-[18px] capitalize text-[#4B3425]">
                {chip.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
