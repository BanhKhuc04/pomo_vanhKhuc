import React, { useEffect, useState } from 'react'
import { Settings, Trophy, Volume2, VolumeX, User } from 'lucide-react'
import { PomoProvider, usePomo } from './context/PomoContext'
import AvatarCreatorScreen from './screens/AvatarCreator/AvatarCreatorScreen'
import AvatarCreatorModal from './screens/AvatarCreator/AvatarCreatorModal'

// Scene
import PixelRoom from './components/Scene/PixelRoom'

// Timer
import TimerDisplay from './components/Timer/TimerDisplay'
import TimerControls from './components/Timer/TimerControls'
import SessionTabs from './components/Timer/SessionTabs'
import SessionCounter from './components/Timer/SessionCounter'

// Stats & Tasks
import StatsPanel from './components/Stats/StatsPanel'
import WeeklyStats from './components/Stats/WeeklyStats'
import AchievementsSummary from './components/Stats/AchievementsSummary'
import TaskList from './components/Stats/TaskList'
import StreakBadge from './components/Stats/StreakBadge'
import AchievementsModal from './components/Stats/AchievementsModal'

// Settings modal
import SettingsModal from './components/Settings/SettingsModal'

// UI
import PixelToastContainer from './components/UI/PixelToast'

// ─── Icon button helper ─────────────────────────────────────────────────────
function IconBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#43357A] rounded-lg bg-[#111230] hover:bg-[#17173B] transition-colors text-textMuted hover:text-textMain shadow-[inset_0_0_10px_rgba(109,87,212,0.15)]"
    >
      {children}
    </button>
  )
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ onOpenSettings, onOpenAchievements, onEditCharacter }) {
  const { muted, setMuted, playSfx } = usePomo()
  const [avatarImgFailed, setAvatarImgFailed] = useState(false)

  return (
    <header
      className="shrink-0 w-full flex items-center justify-between px-4 sm:px-6 border-b border-[#43357A] bg-gradient-to-r from-[#17103A] via-[#110E34] to-[#0C0E29] shadow-[0_12px_34px_rgba(4,4,22,0.55)]"
      style={{ height: 62 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[20px] inline-block" style={{ filter: 'drop-shadow(0 0 8px rgba(248,94,168,0.42))' }}>🍅</span>
        <span className="pixel-text text-[13px] sm:text-[14px] text-textMain tracking-[0.12em] whitespace-nowrap">POMO TIME</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <StreakBadge compact />

        <IconBtn onClick={() => { playSfx('CLICK'); setMuted(m => !m) }} label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </IconBtn>

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenAchievements() }} label="Achievements">
          <Trophy size={16} />
        </IconBtn>

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenSettings() }} label="Settings">
          <Settings size={16} />
        </IconBtn>

        {/* Edit Character Avatar Icon */}
        <button
          onClick={() => { playSfx('CLICK'); onEditCharacter() }}
          title="Edit Character"
          className="ml-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#111230] border border-[#43357A] flex items-center justify-center overflow-hidden hover:bg-[#17173B] transition-colors shadow-[inset_0_0_10px_rgba(109,87,212,0.16)]"
          aria-label="Edit avatar"
        >
          {!avatarImgFailed ? (
            <img
              src="/images/avatar/base/idle.png"
              alt="Avatar"
              className="w-8 h-8 object-contain pixelated"
              style={{ transform: 'translateY(4px) scale(0.98)' }}
              onError={() => setAvatarImgFailed(true)}
            />
          ) : (
            <User size={18} className="text-textMuted" />
          )}
        </button>
      </div>
    </header>
  )
}

// ─── Timer Panel ─────────────────────────────────────────────────────────────
function TimerPanel() {
  return (
    <div
      className="w-full min-h-[340px] lg:min-h-[370px] flex flex-col items-center justify-center gap-5 px-6 py-6 sm:px-8 sm:py-7 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 30% 14%, rgba(85,53,192,0.34) 0%, rgba(24,22,63,0.95) 52%, rgba(12,14,34,0.98) 100%)'
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-9 left-[22%] w-56 h-32 bg-[#7C3AED]/24 blur-[62px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-64 h-36 bg-[#2563EB]/20 blur-[78px] pointer-events-none rounded-full" />
      <div className="absolute inset-[10px] rounded-[16px] border border-[#594A96]/60 shadow-[inset_0_0_30px_rgba(98,74,191,0.2)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center w-full gap-5">
        <SessionTabs />
        <TimerDisplay />
        <SessionCounter />
        <TimerControls />
      </div>
    </div>
  )
}

// ─── Keyboard Shortcuts strip ─────────────────────────────────────────────────
function ShortcutsBar() {
  return (
    <div className="dashboard-card shrink-0 px-4 py-3.5 min-h-[92px]">
      <div className="dashboard-title mb-2 flex items-center gap-2">
        <span>⌨️</span>
        <span>Shortcuts</span>
      </div>
      <span className="retro-text text-[20px] leading-none text-textMuted flex items-center justify-start gap-2 flex-wrap">
        <span className="bg-panelDeep border border-panelBorder rounded px-1.5 py-0.5 text-[10px] pixel-text text-textMain">Space</span>
        = Start/Pause
        <span className="opacity-30">•</span>
        <span className="bg-panelDeep border border-panelBorder rounded px-1.5 py-0.5 text-[10px] pixel-text text-textMain">R</span>
        = Reset
        <span className="opacity-30">•</span>
        <span className="bg-panelDeep border border-panelBorder rounded px-1.5 py-0.5 text-[10px] pixel-text text-textMain">M</span>
        = Mute
      </span>
    </div>
  )
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
function MainLayout({ onOpenSettings, onOpenAchievements, onEditCharacter }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#090B1F] text-textMain">
      <Header
        onOpenSettings={onOpenSettings}
        onOpenAchievements={onOpenAchievements}
        onEditCharacter={onEditCharacter}
      />

      <main className="flex-1 min-h-0 w-[96vw] max-w-[1560px] mx-auto py-4 lg:py-5
                       grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(420px,1fr)]
                       gap-4 lg:gap-[18px] overflow-y-auto lg:overflow-hidden">

        {/* LEFT: Room + Timer */}
        <section className="flex flex-col gap-4 lg:gap-[18px] min-h-0 order-2 lg:order-1 lg:h-full">
          <div className="dashboard-card relative overflow-hidden aspect-[16/9] min-h-[290px] lg:min-h-[450px] border-[#55479A] shadow-[0_20px_52px_rgba(4,7,28,0.62),inset_0_0_0_1px_rgba(132,106,228,0.28)]">
            <PixelRoom />
          </div>
          <div className="dashboard-card shrink-0 overflow-hidden border-[#55479A] shadow-[0_20px_52px_rgba(4,7,28,0.62),inset_0_0_0_1px_rgba(132,106,228,0.25)]">
            <TimerPanel />
          </div>
        </section>

        {/* RIGHT sidebar */}
        <aside className="min-h-0 order-1 lg:order-2 lg:h-full lg:overflow-hidden pb-2 pr-1 flex flex-col gap-3 lg:gap-2.5 lg:grid lg:grid-rows-[auto_auto_minmax(0,1fr)_auto_auto]">
          <StatsPanel />
          <WeeklyStats />
          <TaskList />
          <AchievementsSummary />
          <ShortcutsBar />
        </aside>
      </main>
    </div>
  )
}

// ─── AppShell ─────────────────────────────────────────────────────────────────
function AppShell() {
  const [settingsOpen, setSettingsOpen]       = useState(false)
  const [achievementsOpen, setAchievementsOpen] = useState(false)
  const [editAvatarOpen, setEditAvatarOpen]   = useState(false)

  const { characterConfig, saveCharacterConfig } = usePomo()

  // First-time setup: characterConfig is null → show onboarding screen
  const showSetup = !characterConfig

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  if (showSetup) {
    return (
      <AvatarCreatorScreen
        initial={null}
        onSave={saveCharacterConfig}
      />
    )
  }

  return (
    <>
      <MainLayout
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onEditCharacter={() => setEditAvatarOpen(true)}
      />

      <AvatarCreatorModal
        isOpen={editAvatarOpen}
        onClose={() => setEditAvatarOpen(false)}
        onSave={saveCharacterConfig}
        initial={characterConfig}
      />

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AchievementsModal isOpen={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <PixelToastContainer />
    </>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <PomoProvider>
      <AppShell />
    </PomoProvider>
  )
}
