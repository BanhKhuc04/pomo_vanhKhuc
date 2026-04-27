import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle, Target } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask, activeTaskId, setActiveTaskId, playSfx } = usePomo()
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
    <div className="dashboard-card flex flex-col overflow-hidden min-h-[300px] lg:min-h-0 lg:h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-panelBorder/35 shrink-0">
        <h3 className="dashboard-title flex items-center gap-2">
          <span className="text-vio">🗒️</span> FOCUS TASKS
        </h3>
        {tasks.length > 0 && (
          <span className="pixel-text text-[8px] text-textMuted opacity-75 tracking-tight">{completedCount}/{tasks.length}</span>
        )}
      </div>

      <div className="px-4 py-2 border-b border-panelBorder/35 bg-gradient-to-r from-[#171238] to-[#120F2A] shrink-0">
        <div className="flex items-center justify-between gap-3">
          <span className="pixel-text text-[8px] text-[#7EF77B] uppercase tracking-tight">Active Task</span>
          {activeTask && !activeTask.completed ? (
            <button
              onClick={() => setActiveTaskId(null)}
              className="pixel-text text-[8px] text-[#75A5FF] hover:text-[#A5C2FF] uppercase tracking-tight"
            >
              Change
            </button>
          ) : null}
        </div>
        {activeTask && !activeTask.completed ? (
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className="retro-text text-[21px] leading-none text-textMain truncate">• {activeTask.text}</span>
            <span className="retro-text text-[18px] leading-none text-amber shrink-0">🍅 {activeTask.pomoCount || 0}</span>
          </div>
        ) : (
          <div className="mt-1.5 retro-text text-[18px] leading-none text-textMuted">No active task selected</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 px-4 pt-2.5 pb-2 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 border border-panelBorder bg-panelDeep/70 text-textMain px-3 py-2 rounded-lg retro-text text-[20px] leading-none focus:outline-none focus:border-vio/60 transition-colors placeholder:text-textMuted/45"
          style={{ minWidth: 0 }}
        />
        <button
          type="submit"
          className="bg-gradient-to-b from-[#6A45E6] to-[#4A2BAF] hover:brightness-110 text-white w-10 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-[0.96] border border-[#8C6CFD] shadow-[0_12px_28px_rgba(76,53,184,0.36)]"
        >
          <Plus size={16} />
        </button>
      </form>

      {/* Task list — internal scroll only */}
      <div className="overflow-y-auto flex-1 min-h-0 px-4 py-2 space-y-1.5 custom-scrollbar">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-5 retro-text text-[18px] leading-none text-textMuted opacity-75">
              <span className="block text-[18px] mb-2">🎯</span>
              <span className="italic">No tasks yet. Add one to stay focused.</span>
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
                    isActive ? 'bg-vioDark/15 border-vio/45' : 'bg-panelDeep/45 border-panelBorder/35'
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-vio hover:text-amber transition-colors shrink-0"
                  >
                    {task.completed ? <CheckCircle2 size={16} className="text-textMuted opacity-55" /> : <Circle size={16} />}
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
                    <span className={`retro-text text-[20px] leading-none truncate ${task.completed ? 'line-through text-textMuted opacity-45' : 'text-textMain'}`}>
                      {task.text}
                    </span>
                    {task.pomoCount > 0 && (
                      <span className="retro-text text-[16px] leading-none text-amber/85 shrink-0">🍅 {task.pomoCount}</span>
                    )}
                  </button>

                  {/* Active indicator */}
                  {isActive && !task.completed && (
                    <Target size={14} className="text-vio shrink-0 animate-pulse" />
                  )}

                  {!isActive && !task.completed && (
                    <button
                      onClick={() => {
                        playSfx('CLICK')
                        setActiveTaskId(task.id)
                      }}
                      className="pixel-text text-[8px] text-textMain border border-panelBorder rounded-md px-2 py-1 hover:border-vio shrink-0"
                    >
                      Set
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-textMuted hover:text-neonPink transition-all shrink-0"
                    aria-label="Delete task"
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
      <div className="px-4 py-2 shrink-0 flex items-center justify-end border-t border-panelBorder/30 bg-panelDeep/25">
        {tasks.filter(t => t.completed).length > 0 && (
          <button
            onClick={() => tasks.filter(t => t.completed).forEach(t => deleteTask(t.id))}
            className="pixel-text text-[8px] text-textMuted hover:text-neonPink uppercase transition-colors tracking-tight"
          >
            Clear Done
          </button>
        )}
      </div>
    </div>
  )
}
