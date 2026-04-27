import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle, Target } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'

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
    <div className="border border-panelBorder rounded-xl flex flex-col bg-panel/40 overflow-hidden"
         style={{ maxHeight: 280 }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-panelBorder/30 shrink-0">
        <h3 className="pixel-text text-[10px] text-textMain uppercase tracking-widest flex items-center gap-2">
          <span className="text-vio">📋</span> Focus Tasks
        </h3>
        {tasks.length > 0 && (
          <span className="pixel-text text-[8px] text-textMuted opacity-60 tracking-tighter">{completedCount}/{tasks.length}</span>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 px-4 pt-4 pb-2 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 border border-panelBorder bg-panelDeep/50 text-textMain px-3 py-2 rounded-md retro-text text-sm focus:outline-none focus:border-vio/50 transition-colors placeholder:text-textMuted/40"
          style={{ minWidth: 0 }}
        />
        <button
          type="submit"
          className="bg-vioDark hover:bg-vio text-white w-10 rounded-md flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(139,92,246,0.2)]"
        >
          <Plus size={18} />
        </button>
      </form>

      {/* Task list — internal scroll only */}
      <div className="overflow-y-auto flex-1 px-4 py-2 space-y-1.5 custom-scrollbar min-h-[60px]">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-4 retro-text text-sm text-textMuted opacity-60 italic">
              No tasks yet. Add one to stay focused! ✨
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
                    "flex items-center gap-3 px-3 py-2 rounded-md border transition-all duration-200 group",
                    isActive ? "bg-vioDark/10 border-vio/40" : "bg-panelDeep/30 border-panelBorder/30"
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-vio hover:text-amber transition-colors shrink-0"
                  >
                    {task.completed ? <CheckCircle2 size={16} className="text-textMuted opacity-50" /> : <Circle size={16} />}
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
                    <span className={`retro-text text-sm truncate ${task.completed ? 'line-through text-textMuted opacity-40' : 'text-textMain'}`}>
                      {task.text}
                    </span>
                    {task.pomoCount > 0 && (
                      <span className="retro-text text-xs text-amber/80 shrink-0">🍅{task.pomoCount}</span>
                    )}
                  </button>

                  {/* Active indicator */}
                  {isActive && !task.completed && (
                    <Target size={14} className="text-vio shrink-0 animate-pulse" />
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
      <div className="px-4 py-2 shrink-0 flex items-center justify-between border-t border-panelBorder/20 bg-panelDeep/20">
        {activeTask && !activeTask.completed ? (
          <div className="flex items-center gap-2 min-w-0">
             <div className="w-1.5 h-1.5 rounded-full bg-vio animate-pulse shrink-0" />
             <span className="retro-text text-[11px] text-textMuted truncate">Working on: <span className="text-textMain">{activeTask.text}</span></span>
          </div>
        ) : (
          <span className="retro-text text-[11px] text-textMuted italic opacity-50">Select a task to focus</span>
        )}
        
        {tasks.filter(t => t.completed).length > 0 && (
          <button
            onClick={() => tasks.filter(t => t.completed).forEach(t => deleteTask(t.id))}
            className="pixel-text text-[8px] text-textMuted hover:text-neonPink uppercase transition-colors tracking-tighter"
          >
            Clear Done
          </button>
        )}
      </div>
    </div>
  )
}
