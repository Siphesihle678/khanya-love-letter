import { useEffect, useRef, useState } from 'react'

const SONG = {
  src: '/assets/audio/I can\'t believe I get to call you mine.mp3',
  name: "I can't believe I get to call you mine",
}

export default function useAudioPlaylist() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(SONG.src)
    audio.preload = 'auto'
    audio.loop = true // Simple loop
    audioRef.current = audio

    // Handle any errors
    audio.addEventListener('error', (err) => {
      console.warn('Audio error:', err)
    })

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  const startPlaylist = () => {
    if (hasStarted) return

    const audio = audioRef.current
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasStarted(true)
        })
        .catch((err) => {
          console.warn('Auto-play prevented:', err)
        })
    }
  }

  const pausePlaylist = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const resumePlaylist = () => {
    const audio = audioRef.current
    if (audio) {
      audio.play().catch((err) => console.warn('Resume failed:', err))
      setIsPlaying(true)
    }
  }

  return {
    startPlaylist,
    pausePlaylist,
    resumePlaylist,
    isPlaying,
    hasStarted,
    currentTrack: SONG,
  }
}
