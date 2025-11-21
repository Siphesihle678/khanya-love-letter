import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import content from '../content/khanya.json'
import HomeButton from './HomeButton.jsx'

const { traits, rose } = content

export default function RoseInteractive() {
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0)
  const navigate = useNavigate()

  const allRevealed = currentTraitIndex >= traits.length
  const currentTrait = traits[currentTraitIndex] || null

  function triggerSoftVibration() {
    if (navigator?.vibrate) {
      navigator.vibrate(15)
    }
  }

  function handleRevealNext() {
    if (currentTraitIndex < traits.length) {
      triggerSoftVibration()
      setCurrentTraitIndex((prev) => prev + 1)
    }
  }

  function handleReset() {
    setCurrentTraitIndex(0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 py-10 text-center">
      <HomeButton />

      <p className="text-sm uppercase tracking-[0.3em] text-khanyaPinkDeep/60 mb-2">
        {rose.instruction}
      </p>
      <p className="text-xs text-khanyaPinkDeep/70 mb-4 max-w-md">
        Tap the rose to reveal what I adore about you. All {traits.length} traits must be revealed to continue.
      </p>
      {currentTraitIndex > 0 && (
        <p className="text-xs font-medium text-khanyaPink mb-4">
          {currentTraitIndex} of {traits.length} traits revealed
        </p>
      )}

      {/* Simple Rose Display */}
      <Motion.div
        className="relative w-64 h-64 mt-4 cursor-pointer"
        onClick={handleRevealNext}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Stem */}
          <path
            d="M100 180 L100 120"
            stroke="#2d5016"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <path
            d="M100 150 Q85 145 80 140 Q85 135 90 140 Q95 145 100 150"
            stroke="#2d5016"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M100 150 Q115 145 120 140 Q115 135 110 140 Q105 145 100 150"
            stroke="#2d5016"
            strokeWidth="3"
            fill="none"
          />
          {/* Rose - Simple but beautiful */}
          <circle cx="100" cy="90" r="35" fill="rgba(215,90,139,0.4)" stroke="#B13F6C" strokeWidth="2" />
          <circle cx="100" cy="85" r="25" fill="rgba(215,90,139,0.6)" stroke="#B13F6C" strokeWidth="2" />
          <circle cx="100" cy="80" r="15" fill="rgba(177,63,108,0.8)" stroke="#B13F6C" strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-khanyaPinkDeep/60 font-medium">Tap to reveal</p>
        </div>
      </Motion.div>

      {/* Trait Display */}
      <AnimatePresence mode="wait">
        {currentTrait && (
          <Motion.div
            key={currentTraitIndex}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="mt-8 w-full max-w-md rounded-2xl bg-white/90 px-6 py-4 shadow-lg shadow-khanyaPink/20 border border-khanyaPink/30"
          >
            <p className="text-base font-handwriting text-khanyaPinkDeep leading-relaxed">
              {currentTrait}
            </p>
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-8">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-full border border-khanyaPinkDeep/40 text-sm hover:bg-white transition"
        >
          {rose.reset}
        </button>
        <button
          type="button"
          onClick={() => allRevealed && navigate('/letter')}
          disabled={!allRevealed}
          className="px-6 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 transition-transform duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
        >
          {rose.cta}
        </button>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-base font-serif text-khanyaPinkDeep/80 max-w-md"
          >
            {rose.closingMessage}
          </Motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

