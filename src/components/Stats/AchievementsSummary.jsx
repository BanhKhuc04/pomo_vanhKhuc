import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { ACHIEVEMENTS } from '../../data/achievements'
import { GARDEN_SIZE, PLANT_STAGES } from '../../data/constants'

const MILESTONE_ICONS = ['🏆', '⭐', '🌸', '🎯', '💎', '🌙', '🔥', '🪴']

export default function AchievementsSummary() {
  const { garden, unlockedCount } = usePomo()
  const plots = garden?.plots || []
  const rewardUnlocked = plots.filter(p => p > PLANT_STAGES.EMPTY).length
  const completion = GARDEN_SIZE > 0 ? rewardUnlocked / GARDEN_SIZE : 0
  const litBadges = Math.round(completion * MILESTONE_ICONS.length)
  const achievementsTotal = ACHIEVEMENTS.length

  return (
    <div
      className="dashboard-card shrink-0 overflow-hidden"
      style={{ minHeight: 124, maxHeight: 146 }}
    >
      <div className="px-4 py-2 border-b border-panelBorder/35 flex items-center justify-between bg-gradient-to-r from-[#1A153A] to-[#15112E]">
        <h3 className="dashboard-title flex items-center gap-2">
          <span className="text-amber">🏆</span> ACHIEVEMENTS
        </h3>
        <span className="pixel-text text-[8px] text-[#CBC2EA] tracking-tight">
          {rewardUnlocked}/{GARDEN_SIZE} unlocked
        </span>
      </div>

      <div className="px-4 py-2">
        <div className="h-2 rounded-full border border-[#52458E] bg-[#111230] overflow-hidden shadow-[inset_0_2px_8px_rgba(2,4,14,0.65)]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.max(4, Math.round(completion * 100))}%`,
              background: 'linear-gradient(90deg, #6E42F1 0%, #FBBF24 100%)',
              boxShadow: '0 0 10px rgba(132,102,242,0.35)',
            }}
          />
        </div>

        <div className="mt-2 grid grid-cols-8 gap-1">
          {MILESTONE_ICONS.map((icon, index) => {
            const unlocked = index < litBadges
            return (
              <div
                key={`${icon}-${index}`}
                className="h-6 rounded-md border flex items-center justify-center text-[12px]"
                style={{
                  background: unlocked
                    ? 'linear-gradient(180deg,#201D4B 0%,#151336 100%)'
                    : 'linear-gradient(180deg,#15122E 0%,#0F0D23 100%)',
                  borderColor: unlocked ? '#6E5AC0' : '#3A345E',
                  opacity: unlocked ? 1 : 0.55,
                  boxShadow: unlocked ? 'inset 0 0 0 1px rgba(196,172,255,0.25)' : 'none',
                }}
              >
                {icon}
              </div>
            )
          })}
        </div>

        <div className="mt-1.5 flex items-center justify-end">
          <span className="pixel-text text-[8px] text-amber">{unlockedCount}/{achievementsTotal} goals</span>
        </div>
      </div>
    </div>
  )
}
