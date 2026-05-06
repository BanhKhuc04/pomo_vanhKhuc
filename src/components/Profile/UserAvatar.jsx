import React from 'react'
import clsx from 'clsx'
import { User } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'

export default function UserAvatar({ profile, size = 'md', className }) {
  const { t } = usePomo()
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-20 w-20',
    lg: 'h-28 w-28',
    xl: 'h-36 w-36',
  }

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[18px] border shadow-[inset_0_0_0_1px_rgba(118,93,210,0.18),0_10px_28px_rgba(3,6,20,0.16)]',
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      style={{
        borderColor: 'var(--app-card-border)',
        background: 'linear-gradient(180deg, var(--app-panel-soft) 0%, var(--app-panel-deep) 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.24),transparent_42%),radial-gradient(circle_at_72%_80%,rgba(56,189,248,0.16),transparent_38%)]" />
      {profile?.avatarImage ? (
        <img
          src={profile.avatarImage}
          alt={profile.displayName || t('profile.currentAvatar')}
          className="relative z-[1] h-full w-full object-cover"
        />
      ) : (
        <div className="relative z-[1] flex h-full w-full items-center justify-center text-[#C8CDEE]">
          <div className="flex h-[68%] w-[68%] items-center justify-center rounded-[22px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" style={{ borderColor: 'var(--app-card-border)', background: 'var(--app-panel-deep)' }}>
            <User size={24} />
          </div>
        </div>
      )}
    </div>
  )
}
