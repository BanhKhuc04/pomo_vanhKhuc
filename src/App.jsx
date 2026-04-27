import React, { useState } from 'react'
import { Settings, Trophy, Volume2, VolumeX } from 'lucide-react'
import { PomoProvider, usePomo } from './context/PomoContext'

// Scene components - Phòng học pixel art
import PixelRoom from './components/Scene/PixelRoom'

// Timer components - Đồng hồ + nút điều khiển
import TimerDisplay from './components/Timer/TimerDisplay'
import TimerControls from './components/Timer/TimerControls'
import SessionTabs from './components/Timer/SessionTabs'
import SessionCounter from './components/Timer/SessionCounter'

// Stats components - Thống kê + vườn cây + streak
import StatsPanel from './components/Stats/StatsPanel'
import Garden from './components/Stats/Garden'
import TaskList from './components/Stats/TaskList'
import StreakBadge from './components/Stats/StreakBadge'
import AchievementsModal from './components/Stats/AchievementsModal'

// Settings modal - Tùy chỉnh app
import SettingsModal from './components/Settings/SettingsModal'

// UI primitives - Thành phần giao diện cơ bản
import PixelButton from './components/UI/PixelButton'
import PixelCard from './components/UI/PixelCard'
import ThemeToggle from './components/UI/ThemeToggle'
import PixelToastContainer from './components/UI/PixelToast'

/**
 * Header - Thanh trên cùng:
 * - Logo "POMO TIME"
 * - Streak badge (số ngày học liên tục)
 * - Các nút toggle: mute, theme, achievements, settings
 */
function Header({ onOpenSettings, onOpenAchievements }) {
  const { muted, setMuted, playSfx } = usePomo()

  return (
    <header className="w-full pixel-border-thick pixel-shadow no-rounded bg-pink dark:bg-purple-900 px-3 sm:px-4 py-2 mb-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        {/* Logo + tên app */}
        <h1 className="pixel-text text-sm sm:text-lg text-ink dark:text-cream flex items-center gap-2">
          <span className="text-2xl animate-pixel-bounce inline-block">🍅</span>
          <span>POMO TIME</span>
        </h1>

        {/* Cụm điều khiển bên phải */}
        <div className="flex items-center gap-2 flex-wrap">
          <StreakBadge compact />

          {/* Nút mute/unmute âm thanh */}
          <PixelButton
            variant="wood"
            size="icon"
            onClick={() => { playSfx('CLICK'); setMuted(m => !m) }}
            ariaLabel={muted ? 'Unmute' : 'Mute'}
          >
            {muted
              ? <VolumeX size={18} className="text-ink dark:text-cream" />
              : <Volume2 size={18} className="text-ink dark:text-cream" />}
          </PixelButton>

          {/* Nút chuyển dark/light */}
          <ThemeToggle />

          {/* Nút mở modal achievements */}
          <PixelButton
            variant="wood"
            size="icon"
            onClick={() => { playSfx('CLICK'); onOpenAchievements() }}
            ariaLabel="Open achievements"
          >
            <Trophy size={18} className="text-ink dark:text-cream" />
          </PixelButton>

          {/* Nút mở modal settings */}
          <PixelButton
            variant="wood"
            size="icon"
            onClick={() => { playSfx('CLICK'); onOpenSettings() }}
            ariaLabel="Open settings"
          >
            <Settings size={18} className="text-ink dark:text-cream" />
          </PixelButton>
        </div>
      </div>
    </header>
  )
}

/**
 * MainLayout - Bố cục Single Page:
 * - Mobile: stack dọc (Stats trên → Scene → Timer → Garden)
 * - Desktop: 2 cột (LEFT = Scene + Timer, RIGHT = Stats + Garden + Hint)
 */
function MainLayout({ onOpenSettings, onOpenAchievements }) {
  return (
    <div className="min-h-screen w-full px-3 sm:px-5 py-3 transition-colors duration-500">
      <Header
        onOpenSettings={onOpenSettings}
        onOpenAchievements={onOpenAchievements}
      />

      {/* Container chính: grid 1 cột (mobile) → 5 cột (desktop) để Scene/Timer chiếm 3, Stats chiếm 2 */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* CỘT TRÁI: Scene + Timer (3/5) */}
        <section className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
          {/* Phòng học pixel: cửa sổ, nội thất, nhân vật, mèo, nến */}
          <PixelRoom />

          {/* Card Timer: tabs mode + đồng hồ + chấm session + nút điều khiển */}
          <PixelCard accent="cream" className="flex flex-col gap-3 items-center !p-3 sm:!p-4">
            <SessionTabs />
            <TimerDisplay />
            <SessionCounter />
            <TimerControls />
          </PixelCard>
        </section>

        {/* CỘT PHẢI: Stats + Garden + Hint (2/5) */}
        <aside className="lg:col-span-2 flex flex-col gap-4 order-1 lg:order-2">
          {/* Bảng thống kê hôm nay */}
          <StatsPanel />

          {/* Danh sách công việc */}
          <TaskList />

          {/* Vườn 8 cây */}
          <Garden />

          {/* Card hướng dẫn phím tắt - nhỏ gọn */}
          <PixelCard accent="pink" className="!p-3 text-center">
            <div className="retro-text text-base text-ink dark:text-cream leading-snug">
              ⌨️ <strong>Space</strong> = Start/Pause &nbsp;·&nbsp;
              <strong>R</strong> = Reset
            </div>
          </PixelCard>
        </aside>
      </main>

      {/* Footer nhỏ ở cuối */}
      <footer className="max-w-6xl mx-auto mt-4 text-center retro-text text-base text-ink/60 dark:text-cream/60">
        Made with 💕 in pixel art • Stay focused, friend ✨
      </footer>
    </div>
  )
}

/**
 * AppShell - Quản lý state đóng/mở của 2 modal (Settings, Achievements)
 * và render Toast container ở góc màn hình
 */
function AppShell() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [achievementsOpen, setAchievementsOpen] = useState(false)

  return (
    <>
      <MainLayout
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
      />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AchievementsModal isOpen={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <PixelToastContainer />
    </>
  )
}

/**
 * App - Root component, bọc PomoProvider để cung cấp global state
 * (timer, settings, stats, garden, streak, achievements, theme, sound)
 */
export default function App() {
  return (
    <PomoProvider>
      <AppShell />
    </PomoProvider>
  )
}
