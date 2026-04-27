import React from 'react'
import clsx from 'clsx'
import PixelModal from '../UI/PixelModal'
import { ACHIEVEMENTS } from '../../data/achievements'
import { usePomo } from '../../context/PomoContext'

export default function AchievementsModal({ isOpen, onClose }) {
  const { isAchievementUnlocked, unlockedCount } = usePomo()
  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title={`🏆 Achievements (${unlockedCount}/${ACHIEVEMENTS.length})`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map(a => {
          const unlocked = isAchievementUnlocked(a.id)
          return (
            <div
              key={a.id}
              className={clsx(
                'pixel-border pixel-shadow-sm no-rounded p-3 flex items-center gap-3 transition-all',
                unlocked
                  ? 'bg-mint dark:bg-emerald-800'
                  : 'bg-cream dark:bg-purple-900 opacity-70'
              )}
            >
              <div className={clsx(
                'text-3xl sm:text-4xl pixel-emoji w-12 h-12 flex items-center justify-center pixel-border bg-cream dark:bg-night',
                !unlocked && 'grayscale'
              )}>
                {unlocked ? a.emoji : '❓'}
              </div>
              <div className="flex-1">
                <div className="pixel-text text-[10px] sm:text-xs text-ink dark:text-cream mb-1">
                  {a.name}
                </div>
                <div className="retro-text text-base text-ink/80 dark:text-cream/80 leading-tight">
                  {a.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PixelModal>
  )
}
