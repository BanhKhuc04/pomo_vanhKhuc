import React, { useState } from 'react'
import { Settings, Trophy, Volume2, VolumeX, User } from 'lucide-react'
import { PomoProvider, usePomo } from './context/PomoContext'

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
import Garden from './components/Stats/Garden'
import TaskList from './components/Stats/TaskList'
import StreakBadge from './components/Stats/StreakBadge'
import AchievementsModal from './components/Stats/AchievementsModal'

// Character
import CharacterSetupModal from './components/Character/CharacterSetupModal'

// Settings modal
import SettingsModal from './components/Settings/SettingsModal'

// UI
import PixelToastContainer from './components/UI/PixelToast'
import ThemeToggle from './components/UI/ThemeToggle'

// ─── Icon button helper ─────────────────────────────────────────────────────
function IconBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-8 h-8 flex items-center justify-center border border-panelBorder rounded-md bg-panelDeep hover:bg-panelBorder transition-colors text-textMuted hover:text-textMain"
    >
      {children}
    </button>
  )
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ onOpenSettings, onOpenAchievements, onEditCharacter }) {
  const { muted, setMuted, playSfx } = usePomo()

  return (
    <header
      className="shrink-0 w-full flex items-center justify-between px-4 sm:px-6 border-b border-panelBorder bg-panel"
      style={{ height: 52 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-xl inline-block" style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.5))' }}>🍅</span>
        <span className="pixel-text text-sm sm:text-base text-textMain tracking-widest">POMO TIME</span>
        <span className="text-vioDark text-xs ml-1">✧</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <StreakBadge compact />

        <IconBtn onClick={() => { playSfx('CLICK'); setMuted(m => !m) }} label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </IconBtn>

        <ThemeToggle />

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenAchievements() }} label="Achievements">
          <Trophy size={15} />
        </IconBtn>

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenSettings() }} label="Settings">
          <Settings size={15} />
        </IconBtn>

        {/* Edit Character Avatar Icon */}
        <button
          onClick={() => { playSfx('CLICK'); onEditCharacter() }}
          title="Edit Character"
          className="ml-1 w-9 h-9 rounded bg-panelDeep border border-panelBorder flex items-center justify-center overflow-hidden hover:border-vio transition-colors"
        >
          <img src="/images/avatar/base/idle.png" alt="Avatar" className="w-8 h-8 object-contain pixelated" style={{ transform: 'translateY(4px)' }} onError={(e) => e.target.style.display='none'} />
        </button>
      </div>
    </header>
  )
}

// ─── Timer Panel ─────────────────────────────────────────────────────────────
function TimerPanel() {
  return (
    <div
      className="w-full rounded-xl border border-panelBorder bg-panel flex flex-col items-center justify-center gap-6 p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-vioDark/10 blur-[80px] pointer-events-none rounded-full" />
      
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
    <div className="shrink-0 px-3 py-1 text-center opacity-60">
      <span className="retro-text text-[13px] text-textMuted flex items-center justify-center gap-2">
        <span className="bg-panelDeep border border-panelBorder rounded px-1.5 py-0.5 text-[10px] pixel-text text-textMain">Space</span> = Start/Pause
        <span className="mx-2 opacity-30">·</span>
        <span className="bg-panelDeep border border-panelBorder rounded px-1.5 py-0.5 text-[10px] pixel-text text-textMain">R</span> = Reset
      </span>
    </div>
  )
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
function MainLayout({ onOpenSettings, onOpenAchievements, onEditCharacter }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-void">
      <Header
        onOpenSettings={onOpenSettings}
        onOpenAchievements={onOpenAchievements}
        onEditCharacter={onEditCharacter}
      />

      <main className="flex-1 min-h-0 p-4 sm:p-6 gap-4 sm:gap-6
                       grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]
                       overflow-y-auto lg:overflow-hidden max-w-[1600px] mx-auto w-full">

        {/* LEFT: Room + Timer */}
        <section className="flex flex-col gap-4 sm:gap-6 min-h-0 order-2 lg:order-1 lg:h-full">
          <div className="relative rounded-xl overflow-hidden border border-panelBorder shadow-xl" style={{ flex: '1 1 auto', minHeight: 0 }}>
            <PixelRoom />
          </div>
          <div className="shrink-0">
            <TimerPanel />
          </div>
        </section>

        {/* RIGHT sidebar */}
        <aside className="flex flex-col gap-4 min-h-0 order-1 lg:order-2 lg:overflow-y-auto lg:h-full pb-6 custom-scrollbar">
          <StatsPanel />
          <WeeklyStats />
          <TaskList />
          <Garden />
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
  const [editCharOpen, setEditCharOpen]       = useState(false)

  const { characterConfig, saveCharacterConfig } = usePomo()

  // First-time setup: characterConfig is null → show onboarding modal
  const showSetup = !characterConfig

  return (
    <>
      <MainLayout
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onEditCharacter={() => setEditCharOpen(true)}
      />

      {/* First-time character setup */}
      <CharacterSetupModal
        isOpen={showSetup}
        onClose={() => {}}           /* can't close without saving on first run */
        onSave={saveCharacterConfig}
        initial={null}
      />

      {/* Edit character (re-open from header) */}
      <CharacterSetupModal
        isOpen={!showSetup && editCharOpen}
        onClose={() => setEditCharOpen(false)}
        onSave={(cfg) => { saveCharacterConfig(cfg); setEditCharOpen(false) }}
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
