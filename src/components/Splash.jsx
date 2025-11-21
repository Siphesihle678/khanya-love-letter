import { motion as Motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import content from '../content/khanya.json'
import { useAudio } from '../contexts/AudioContext.jsx'

const { tagline, dedication, signature } = content.splash

export default function Splash() {
  const navigate = useNavigate()
  const { startPlaylist } = useAudio()

  function handleBegin() {
    startPlaylist()
    navigate('/rose')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-center px-6">
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-64 h-64"
      >
        <RoseOutline />
      </Motion.div>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-base uppercase tracking-[0.3em] text-khanyaPinkDeep/70"
      >
        {tagline}
      </Motion.p>

      <Motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-3xl md:text-4xl font-serif mt-2"
      >
        {dedication}
      </Motion.h1>

      <Motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={handleBegin}
        className="mt-8 px-8 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 hover:scale-105 transition-transform duration-200"
      >
        Begin
      </Motion.button>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-6 text-sm text-khanyaPinkDeep/70 font-serif"
      >
        {signature}
      </Motion.p>
    </div>
  )
}

function RoseOutline() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Stem */}
      <Motion.path
        d="M100 180 L100 120"
        stroke="#2d5016"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Left Leaf */}
      <Motion.path
        d="M100 150 Q85 145 80 140 Q85 135 90 140 Q95 145 100 150"
        stroke="#2d5016"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Right Leaf */}
      <Motion.path
        d="M100 150 Q115 145 120 140 Q115 135 110 140 Q105 145 100 150"
        stroke="#2d5016"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.7 }}
      />

      {/* Inner Petals - Center */}
      <Motion.path
        d="M100 80 Q95 75 90 80 Q95 85 100 80"
        stroke="#B13F6C"
        strokeWidth="2"
        fill="rgba(177, 63, 108, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 1 }}
      />
      <Motion.path
        d="M100 80 Q105 75 110 80 Q105 85 100 80"
        stroke="#B13F6C"
        strokeWidth="2"
        fill="rgba(177, 63, 108, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 1.1 }}
      />

      {/* Middle Layer Petals */}
      <Motion.path
        d="M100 85 Q85 80 80 90 Q85 95 90 95 Q95 95 100 90"
        stroke="#B13F6C"
        strokeWidth="2.5"
        fill="rgba(177, 63, 108, 0.25)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 1.3 }}
      />
      <Motion.path
        d="M100 85 Q115 80 120 90 Q115 95 110 95 Q105 95 100 90"
        stroke="#B13F6C"
        strokeWidth="2.5"
        fill="rgba(177, 63, 108, 0.25)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 1.4 }}
      />
      <Motion.path
        d="M100 90 Q100 75 100 85 Q95 90 100 95 Q105 90 100 85"
        stroke="#B13F6C"
        strokeWidth="2.5"
        fill="rgba(177, 63, 108, 0.25)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Outer Layer Petals - Large */}
      <Motion.path
        d="M100 90 Q70 85 70 110 Q75 120 85 115 Q90 110 95 105 Q97 100 100 95"
        stroke="#D75A8B"
        strokeWidth="2.5"
        fill="rgba(215, 90, 139, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 1.7 }}
      />
      <Motion.path
        d="M100 90 Q130 85 130 110 Q125 120 115 115 Q110 110 105 105 Q103 100 100 95"
        stroke="#D75A8B"
        strokeWidth="2.5"
        fill="rgba(215, 90, 139, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 1.8 }}
      />
      <Motion.path
        d="M100 95 Q100 70 100 90 Q90 95 85 100 Q90 105 95 100 Q100 95 100 90"
        stroke="#D75A8B"
        strokeWidth="2.5"
        fill="rgba(215, 90, 139, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 1.9 }}
      />
      <Motion.path
        d="M100 95 Q100 70 100 90 Q110 95 115 100 Q110 105 105 100 Q100 95 100 90"
        stroke="#D75A8B"
        strokeWidth="2.5"
        fill="rgba(215, 90, 139, 0.2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 2 }}
      />

      {/* Bloom Animation - Subtle scale effect */}
      <Motion.g
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 2.2 }}
      >
        {/* Additional detail petals */}
        <Motion.path
          d="M100 88 Q92 82 88 88 Q92 94 100 90"
          stroke="#B13F6C"
          strokeWidth="1.5"
          fill="rgba(177, 63, 108, 0.15)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 2.3 }}
        />
        <Motion.path
          d="M100 88 Q108 82 112 88 Q108 94 100 90"
          stroke="#B13F6C"
          strokeWidth="1.5"
          fill="rgba(177, 63, 108, 0.15)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 2.4 }}
        />
      </Motion.g>
    </svg>
  )
}

