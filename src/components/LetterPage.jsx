import { motion as Motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import content from '../content/khanya.json'
import useTypewriter from '../hooks/useTypewriter'
import HomeButton from './HomeButton.jsx'

const { title, body, highlight } = content.letter

export default function LetterPage() {
  const navigate = useNavigate()
  const typedHighlight = useTypewriter(highlight, 35)

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center py-12 px-4">
      <HomeButton />
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl rounded-[32px] bg-white/80 px-8 py-10 shadow-2xl shadow-khanyaPink/10 border border-white/40"
      >
        <p className="uppercase text-xs tracking-[0.4em] text-khanyaPinkDeep/50">
          Chapter Zero
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mt-2 text-khanyaPinkDeep">
          {title}
        </h2>

        <div className="mt-8 space-y-6 font-handwriting text-lg leading-relaxed text-khanyaPinkDeep/90">
          {body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-khanyaPink/30 bg-ivory/80 px-6 py-4">
          <p className="font-handwriting text-xl text-khanyaPink">
            {typedHighlight}
            <span className="opacity-60">{typedHighlight ? '|' : ''}</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-between">
          <button
            className="px-6 py-3 rounded-full border border-khanyaPinkDeep/40 text-khanyaPinkDeep hover:bg-white transition"
            onClick={() => navigate('/rose')}
          >
            Back to Rose
          </button>
          <button
            className="px-6 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 hover:scale-[1.02] transition"
            onClick={() => navigate('/chapters')}
          >
            Continue to Chapters
          </button>
        </div>
      </Motion.div>
    </div>
  )
}

