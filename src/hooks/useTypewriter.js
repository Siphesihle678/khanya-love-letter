import { useEffect, useState } from 'react'

export default function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const resetFrame = requestAnimationFrame(() => setDisplayed(''))
    if (!text) {
      return () => cancelAnimationFrame(resetFrame)
    }

    let i = 0
    const interval = window.setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(interval)
      }
    }, speed)

    return () => {
      cancelAnimationFrame(resetFrame)
      window.clearInterval(interval)
    }
  }, [text, speed])

  return displayed
}

