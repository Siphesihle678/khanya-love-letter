import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import content from '../content/khanya.json'
import Gallery from './Gallery.jsx'
import HomeButton from './HomeButton.jsx'

const chapters = content.chapters

export default function Chapters() {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const current = chapters[index]

  function next() {
    setIndex((prev) => (prev + 1) % chapters.length)
  }

  function prev() {
    setIndex((prev) => (prev - 1 + chapters.length) % chapters.length)
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center pt-12 pb-16 px-4">
      <HomeButton />
      <p className="text-sm uppercase tracking-[0.3em] text-khanyaPinkDeep/60">
        Chapters
      </p>
      <h2 className="text-3xl font-serif mt-2 text-khanyaPinkDeep">
        {current.title}
      </h2>

      <div className="w-full max-w-4xl mt-8">
        <AnimatePresence mode="wait">
          <Motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] bg-white/85 px-8 py-10 shadow-2xl shadow-khanyaPink/10 border border-white/60"
          >
            <ChapterContent chapter={current} />
          </Motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-3">
          <NavButton direction="back" onClick={prev}>
            Previous
          </NavButton>
          <Dots count={chapters.length} activeIndex={index} onSelect={setIndex} />
          <NavButton direction="forward" onClick={next}>
            Next
          </NavButton>
        </div>

        <button
          className="px-6 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 hover:scale-[1.02] transition"
          onClick={() => navigate('/finale')}
        >
          Final Reveal
        </button>
      </div>
    </div>
  )
}

function ChapterContent({ chapter }) {
  if (chapter.type === 'gallery') {
    return (
      <div className="space-y-6">
        {chapter.description && (
          <div className="text-lg text-khanyaPinkDeep/85 font-handwriting leading-relaxed">
            <p className="whitespace-pre-line">{chapter.description}</p>
          </div>
        )}
        <Gallery images={chapter.content} />
      </div>
    )
  }

  const paragraphs = typeof chapter.content === 'string' 
    ? chapter.content.split('\n\n').filter(p => p.trim())
    : [chapter.content]

  return (
    <div className="text-lg text-khanyaPinkDeep/85 font-handwriting leading-relaxed space-y-4">
      {paragraphs.map((para, idx) => (
        <p key={idx} className="whitespace-pre-line">
          {para}
        </p>
      ))}
      {chapter.type === 'future' && (
        <p className="italic">I&apos;m ready when you are.</p>
      )}
    </div>
  )
}

function NavButton({ children, direction, onClick }) {
  const icon = direction === 'back' ? '←' : '→'
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-full border border-khanyaPinkDeep/40 text-sm hover:bg-white transition"
    >
      {direction === 'back' ? (
        <span>
          {icon} {children}
        </span>
      ) : (
        <span>
          {children} {icon}
        </span>
      )}
    </button>
  )
}

function Dots({ count, activeIndex, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(idx)}
          className={`h-3 w-3 rounded-full transition ${
            idx === activeIndex ? 'bg-khanyaPink' : 'bg-khanyaPink/30'
          }`}
          aria-label={`Go to chapter ${idx + 1}`}
        />
      ))}
    </div>
  )
}

