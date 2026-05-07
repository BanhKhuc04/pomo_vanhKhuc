import React, { useEffect, useState } from 'react'
import { Settings, Trophy, Volume2, VolumeX } from 'lucide-react'
import { PomoProvider, usePomo } from './context/PomoContext'
import ProfileSetupScreen from './screens/Profile/ProfileSetupScreen'
import ProfileModal from './screens/Profile/ProfileModal'
import UserAvatar from './components/Profile/UserAvatar'

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
import SupportModal, { SupportFloatingButton } from './components/Support/SupportModal'
import YouTubeMusicBridge from './components/Audio/YouTubeMusicBridge'

// UI
import PixelToastContainer from './components/UI/PixelToast'

// ─── Icon button helper ─────────────────────────────────────────────────────
function IconBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="app-icon-btn h-9 w-9 rounded-lg transition-colors flex items-center justify-center sm:h-10 sm:w-10"
    >
      {children}
    </button>
  )
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ onOpenSettings, onOpenAchievements, onOpenProfile, profile, appName }) {
  const { muted, setMuted, playSfx, t } = usePomo()
  return (
    <header
      className="app-header-shell app-topbar shrink-0 w-full flex items-center justify-between px-3 sm:px-4 lg:px-6"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[20px] inline-block" style={{ filter: 'drop-shadow(0 0 8px rgba(248,94,168,0.42))' }}>🍅</span>
        <span className="pixel-text text-[10px] sm:text-[11px] lg:text-[12px] tracking-[0.08em] truncate max-w-[120px] sm:max-w-[180px] lg:max-w-[320px] app-main-text">{appName}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <StreakBadge compact />

        <IconBtn onClick={() => { playSfx('CLICK'); setMuted(m => !m) }} label={muted ? t('header.unmute') : t('header.mute')}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </IconBtn>

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenAchievements() }} label={t('header.achievements')}>
          <Trophy size={16} />
        </IconBtn>

        <IconBtn onClick={() => { playSfx('CLICK'); onOpenSettings() }} label={t('header.settings')}>
          <Settings size={16} />
        </IconBtn>

        {/* Profile */}
        <button
          onClick={() => { playSfx('CLICK'); onOpenProfile() }}
          title={t('header.openProfile')}
          className="app-icon-btn ml-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center overflow-hidden transition-colors"
          aria-label={t('header.openProfile')}
        >
          <UserAvatar profile={profile} size="sm" className="h-8 w-8 sm:h-9 sm:w-9" />
        </button>
      </div>
    </header>
  )
}

// ─── Timer Panel ─────────────────────────────────────────────────────────────
function TimerPanel() {
  return (
    <div
      className="timer-panel-shell w-full flex flex-col items-center justify-center gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 30% 14%, rgba(85,53,192,0.28) 0%, color-mix(in srgb, var(--app-panel-soft) 88%, rgba(24,22,63,0.12) 12%) 52%, var(--app-bg-elevated) 100%)'
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-9 left-[22%] w-56 h-32 bg-[#7C3AED]/24 blur-[62px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-64 h-36 bg-[#2563EB]/20 blur-[78px] pointer-events-none rounded-full" />
      <div className="absolute inset-[10px] rounded-[16px] border border-[#594A96]/60 shadow-[inset_0_0_30px_rgba(98,74,191,0.2)] pointer-events-none" />
      
      <div className="timer-panel-inner relative z-10 flex flex-col items-center w-full gap-4">
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
  const { t } = usePomo()
  return (
    <div className="dashboard-card shortcut-card shrink-0 px-4 py-3">
      <div className="dashboard-title mb-2 flex items-center gap-2">
        <span>⌨️</span>
        <span>{t('header.shortcuts')}</span>
      </div>
      <span className="retro-text text-[15px] sm:text-[16px] leading-none app-muted flex items-center justify-start gap-2 flex-wrap">
        <span className="app-inline-surface rounded px-1.5 py-0.5 text-[9px] pixel-text app-main-text">Space</span>
        = {t('header.startPause')}
        <span className="opacity-30">•</span>
        <span className="app-inline-surface rounded px-1.5 py-0.5 text-[9px] pixel-text app-main-text">R</span>
        = {t('header.reset')}
        <span className="opacity-30">•</span>
        <span className="app-inline-surface rounded px-1.5 py-0.5 text-[9px] pixel-text app-main-text">M</span>
        = {t('header.muteShortcut')}
      </span>
    </div>
  )
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
function MainLayout({ onOpenSettings, onOpenAchievements, onOpenProfile, profile, appName }) {
  return (
    <div className="app-shell dashboard-shell">
      <Header
        onOpenSettings={onOpenSettings}
        onOpenAchievements={onOpenAchievements}
        onOpenProfile={onOpenProfile}
        profile={profile}
        appName={appName}
      />

      <main className="dashboard-main">

        {/* LEFT: Room + Timer */}
        <section className="dashboard-column dashboard-primary order-2 xl:order-1">
          <div className="dashboard-scroll custom-scrollbar">
          <div className="dashboard-card scene-stage relative overflow-hidden">
            <PixelRoom />
          </div>
          <div className="dashboard-card timer-card-shell shrink-0 overflow-hidden">
            <TimerPanel />
          </div>
          </div>
        </section>

        {/* RIGHT sidebar */}
        <aside className="dashboard-column dashboard-sidebar order-1 xl:order-2 custom-scrollbar">
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
  const [profileOpen, setProfileOpen]         = useState(false)
  const [supportOpen, setSupportOpen]         = useState(false)

  const { profile, saveProfile, settings } = usePomo()

  const showSetup = !profile

  useEffect(() => {
    document.documentElement.classList.add('theme-ready')
  }, [])

  if (showSetup) {
    return (
      <ProfileSetupScreen
        initial={null}
        onSave={saveProfile}
      />
    )
  }

  return (
    <>
      <MainLayout
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        profile={profile}
        appName={settings.appName}
      />

      <SupportFloatingButton onClick={() => setSupportOpen(true)} />

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onOpenProfile={() => setProfileOpen(true)}
      />
      <AchievementsModal isOpen={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
      <YouTubeMusicBridge />
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
