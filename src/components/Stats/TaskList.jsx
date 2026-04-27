import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import PixelCard from '../UI/PixelCard'
import PixelButton from '../UI/PixelButton'
import { usePomo } from '../../context/PomoContext'

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = usePomo()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    addTask(inputValue)
    setInputValue('')
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <PixelCard accent="pink" title="📝 Focus Tasks">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 pixel-border no-rounded bg-cream dark:bg-nightCard text-ink dark:text-cream px-3 py-2 retro-text text-sm focus:outline-none focus:ring-2 focus:ring-orange/50"
        />
        <PixelButton type="submit" size="sm" variant="primary" className="!min-h-[40px]">
          <Plus size={18} />
        </PixelButton>
      </form>

      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center py-4 retro-text text-sm text-ink/60 dark:text-cream/60"
            >
              No tasks yet. Add one to stay focused! ✨
            </motion.div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 p-2 pixel-border bg-cream/50 dark:bg-nightCard/50 group"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-orange dark:text-star hover:scale-110 transition-transform"
                >
                  {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                
                <span className={`flex-1 retro-text text-sm truncate ${task.completed ? 'line-through opacity-50' : 'text-ink dark:text-cream'}`}>
                  {task.text}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition-all p-1"
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {tasks.length > 0 && (
        <div className="mt-3 pt-2 border-t-2 border-ink/5 dark:border-cream/5 flex justify-between items-center text-[10px] uppercase pixel-text text-ink/60 dark:text-cream/60">
          <span>{completedCount}/{tasks.length} Done</span>
          <button 
            onClick={() => tasks.filter(t => t.completed).forEach(t => deleteTask(t.id))}
            className="hover:text-rose-500 transition-colors"
          >
            Clear Completed
          </button>
        </div>
      )}
    </PixelCard>
  )
}
