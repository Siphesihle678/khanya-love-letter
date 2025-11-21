import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'

export default function HomeButton() {
  const navigate = useNavigate()

  return (
    <Motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-khanyaPink/30 text-khanyaPinkDeep hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
      aria-label="Return home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </Motion.button>
  )
}


