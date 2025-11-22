import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

// API endpoint - update this with your Railway API URL
const API_URL = import.meta.env.VITE_API_URL || ''

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    
    const feedbackData = {
      message: feedback,
    }

    // Store in localStorage as backup
    const allFeedback = JSON.parse(localStorage.getItem('app_feedback') || '[]')
    allFeedback.push({ ...feedbackData, timestamp: new Date().toISOString() })
    localStorage.setItem('app_feedback', JSON.stringify(allFeedback))

    // Send to API if URL is configured
    if (API_URL) {
      fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      }).catch((error) => {
        console.warn('Failed to send feedback:', error)
      })
    }

    setSubmitted(true)
    setFeedback('')
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
    }, 3000)
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <Motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3 rounded-full border-2 border-khanyaPinkDeep/40 bg-white/80 text-khanyaPinkDeep font-medium shadow-lg hover:scale-105 hover:bg-white hover:border-khanyaPinkDeep/60 transition-all duration-200"
      >
        {isOpen ? 'Close' : 'Share Your Thoughts'}
      </Motion.button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 rounded-[32px] bg-white/85 px-6 py-6 shadow-2xl shadow-khanyaPink/10 border border-white/60"
          >
            {submitted ? (
              <div className="text-center">
                <p className="text-khanyaPink font-handwriting text-lg">
                  Thank you for sharing your thoughts! 💕
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <p className="text-sm text-khanyaPinkDeep/70 mb-2 font-serif">
                    What did you think?
                  </p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="w-full px-4 py-3 rounded-2xl border border-khanyaPink/30 bg-ivory/50 font-handwriting text-khanyaPinkDeep focus:outline-none focus:border-khanyaPink focus:ring-2 focus:ring-khanyaPink/20 resize-none"
                    rows="5"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-khanyaPink text-ivory font-medium shadow-lg shadow-khanyaPink/30 hover:scale-105 transition-transform duration-200"
                >
                  Send
                </button>
              </form>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

