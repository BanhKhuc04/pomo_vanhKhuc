import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle, Target } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask, activeTaskId, setActiveTaskId, playSfx, t } = usePomo()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    addTask(inputValue)
    setInputValue('')
  }

  const activeTask = tasks.find(t => t.id === activeTaskId)
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="dashboard-card task-card flex flex-col overflow-hidden min-h-[280px] sm:min-h-[300px]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b shrink-0" style={{ borderColor: 'var(--app-card-border)' }}>
        <h3 className="dashboard-title flex items-center gap-2">
          <span style={{ color: 'var(--app-accent)' }}>🗒️</span> {t('tasks.title')}
        </h3>
        {tasks.length > 0 && (
          <span className="pixel-text text-[8px] opacity-75 tracking-tight app-muted">{completedCount}/{tasks.length}</span>
        )}
      </div>

      <div className="px-4 py-2 border-b shrink-0" style={{ borderColor: 'var(--app-card-border)', background: 'linear-gradient(90deg, color-mix(in srgb, var(--app-panel-soft) 88%, transparent 12%), var(--app-panel-deep))' }}>
        <div className="flex items-center justify-between gap-3">
          <span className="pixel-text text-[8px] uppercase tracking-tight" style={{ color: 'var(--app-success)' }}>{t('tasks.activeTask')}</span>
          {activeTask && !activeTask.completed ? (
            <button
              onClick={() => setActiveTaskId(null)}
              className="pixel-text text-[8px] uppercase tracking-tight"
              style={{ color: 'var(--app-accent-secondary)' }}
            >
              {t('tasks.change')}
            </button>
          ) : null}
        </div>
        {activeTask && !activeTask.completed ? (
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className="retro-text text-[17px] leading-none truncate app-main-text">• {activeTask.text}</span>
            <span className="retro-text text-[15px] leading-none shrink-0" style={{ color: 'var(--app-warm)' }}>🍅 {activeTask.pomoCount || 0}</span>
          </div>
        ) : (
          <div className="mt-1.5 retro-text text-[15px] leading-none app-muted">{t('tasks.noActiveTask')}</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 px-4 pt-2.5 pb-2 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('tasks.placeholder')}
          className="app-input flex-1 px-3 py-2 rounded-lg retro-text text-[17px] leading-none focus:outline-none transition-colors"
          style={{ minWidth: 0 }}
        />
        <button
          type="submit"
          className="app-primary-btn w-10 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-[0.96]"
        >
          <Plus size={16} />
        </button>
      </form>

      {/* Task list — internal scroll only */}
      <div className="overflow-y-auto flex-1 min-h-0 px-4 py-2 space-y-1.5 custom-scrollbar">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-5 retro-text text-[15px] leading-none app-muted opacity-75">
              <span className="block text-[18px] mb-2">🎯</span>
              <span className="italic">{t('tasks.empty')}</span>
            </motion.div>
          ) : (
            tasks.map((task) => {
              const isActive = activeTaskId === task.id
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={clsx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-200 group',
                    isActive ? 'bg-vioDark/15' : ''
                  )}
                  style={{
                    background: isActive ? 'var(--app-accent-soft)' : 'color-mix(in srgb, var(--app-panel-deep) 88%, transparent 12%)',
                    borderColor: isActive ? 'var(--app-accent)' : 'var(--app-card-border)',
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="transition-colors shrink-0"
                    style={{ color: 'var(--app-accent)' }}
                  >
                    {task.completed ? <CheckCircle2 size={16} className="app-muted opacity-55" /> : <Circle size={16} />}
                  </button>

                  {/* Task text + click to set active */}
                  <button
                    className="flex-1 flex items-center gap-2 min-w-0 text-left"
                    onClick={() => {
                      if (!task.completed) {
                        playSfx('CLICK')
                        setActiveTaskId(isActive ? null : task.id)
                      }
                    }}
                    disabled={task.completed}
                  >
                    <span className={`retro-text text-[17px] leading-none truncate ${task.completed ? 'line-through app-muted opacity-45' : 'app-main-text'}`}>
                      {task.text}
                    </span>
                    {task.pomoCount > 0 && (
                      <span className="retro-text text-[14px] leading-none shrink-0" style={{ color: 'var(--app-warm)' }}>🍅 {task.pomoCount}</span>
                    )}
                  </button>

                  {/* Active indicator */}
                  {isActive && !task.completed && (
                    <Target size={14} className="shrink-0 animate-pulse" style={{ color: 'var(--app-accent)' }} />
                  )}

                  {!isActive && !task.completed && (
                    <button
                      onClick={() => {
                        playSfx('CLICK')
                        setActiveTaskId(task.id)
                      }}
                      className="pixel-text text-[8px] border rounded-md px-2 py-1 shrink-0 app-main-text"
                      style={{ borderColor: 'var(--app-card-border)', background: 'var(--app-panel-soft)' }}
                    >
                      {t('tasks.set')}
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0 app-muted"
                    aria-label={t('tasks.deleteTask')}
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Active Task Summary */}
      <div className="px-4 py-2 shrink-0 flex items-center justify-end border-t min-h-[38px]" style={{ borderColor: 'var(--app-card-border)', background: 'color-mix(in srgb, var(--app-panel-deep) 60%, transparent 40%)' }}>
        {tasks.filter(t => t.completed).length > 0 && (
          <button
            onClick={() => tasks.filter(t => t.completed).forEach(t => deleteTask(t.id))}
            className="pixel-text text-[8px] uppercase transition-colors tracking-tight app-muted"
          >
            {t('tasks.clearDone')}
          </button>
        )}
      </div>
    </div>
  )
}
