import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import content from '../content/khanya.json'
import HomeButton from './HomeButton.jsx'

const { quote, cta, giftLink, personalMessage } = content.finale

export default function FinalReveal() {
  const [showMessage, setShowMessage] = useState(false)

  function openGift() {
    if (giftLink.startsWith('http')) {
      window.open(giftLink, '_blank', 'noopener')
    } else {
      window.location.href = giftLink
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 py-12 text-center">
      <HomeButton />
      <Motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-72 h-72"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-khanyaPink to-khanyaPinkDeep blur-3xl opacity-30" />
        <Motion.div
          className="absolute inset-0 rounded-full border border-khanyaPink/40 flex items-center justify-center"
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 6 }}
        >
          <svg viewBox="0 0 200 200" className="w-56 h-56">
            <Motion.path
              d="M100 30 C140 20 170 60 150 90 C130 120 160 140 130 160 C110 175 90 170 80 150 C60 180 30 170 30 140 C30 110 50 90 70 80 C40 60 60 30 100 30 Z"
              fill="none"
              stroke="#B13F6C"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </svg>
        </Motion.div>
      </Motion.div>

      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-2xl font-serif text-khanyaPinkDeep max-w-2xl"
      >
        {quote}
      </Motion.p>

      <div className="mt-10 flex flex-col gap-4 items-center w-full max-w-md">
        {personalMessage && (
          <Motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            type="button"
            onClick={() => setShowMessage(!showMessage)}
            className="w-full px-8 py-3 rounded-full border-2 border-khanyaPinkDeep/40 bg-white/80 text-khanyaPinkDeep font-medium shadow-lg hover:scale-105 hover:bg-white hover:border-khanyaPinkDeep/60 transition-all duration-200"
          >
            {showMessage ? 'Close Personal Message' : personalMessage.title}
          </Motion.button>
        )}

        <Motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={openGift}
          className="w-full px-8 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 hover:scale-105 transition-transform duration-200"
        >
          {cta}
        </Motion.button>
      </div>

      <AnimatePresence>
        {personalMessage && showMessage && (
          <Motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 w-full max-w-3xl rounded-[32px] bg-white/85 px-8 py-10 shadow-2xl shadow-khanyaPink/10 border border-white/60 text-left max-h-[60vh] overflow-y-auto"
          >
            <p className="font-handwriting text-lg leading-relaxed text-khanyaPinkDeep/90 whitespace-pre-line">
              {personalMessage.content}
            </p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

