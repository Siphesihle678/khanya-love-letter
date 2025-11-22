import { useEffect, useRef, useState } from 'react'

// Audio file path - Vite serves files from public folder at root
const SONG = {
  src: "/assets/audio/I can't believe I get to call you mine.mp3",
  name: "I can't believe I get to call you mine",
}

export default function useAudioPlaylist() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const audioRef = useRef(null)

  // Initialize audio element
  useEffect(() => {
    try {
      console.log('Initializing audio with path:', SONG.src)
      const audio = new Audio(SONG.src)
      audio.preload = 'auto'
      audio.loop = true // Simple loop
      audioRef.current = audio

      // Wait for audio to be ready
      const handleCanPlay = () => {
        setIsReady(true)
        console.log('Audio ready to play - readyState:', audio.readyState)
      }

      // Handle loading errors
      const handleError = (err) => {
        console.warn('Audio loading error:', err)
        console.warn('Audio element error:', audio.error)
        console.warn('Tried to load:', SONG.src)
        // Don't throw - just log the error
      }

      // Handle when audio can start playing
      audio.addEventListener('canplaythrough', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('loadeddata', () => {
        console.log('Audio data loaded')
      })

      // Try to load the audio
      audio.load().catch((err) => {
        console.warn('Failed to load audio:', err)
        // Don't throw - audio is optional
      })

      return () => {
        try {
          if (audio) {
            audio.removeEventListener('canplaythrough', handleCanPlay)
            audio.removeEventListener('error', handleError)
            audio.pause()
            audio.src = ''
          }
        } catch (cleanupError) {
          console.warn('Error cleaning up audio:', cleanupError)
        }
      }
    } catch (initError) {
      console.error('Failed to initialize audio:', initError)
      // Don't break the app - audio is optional
    }
  }, [])

  const startPlaylist = () => {
    return new Promise((resolve) => {
      try {
        if (hasStarted) {
          resolve()
          return
        }

        const audio = audioRef.current
        if (!audio) {
          console.warn('Audio element not initialized yet')
          resolve() // Don't block, just resolve
          return
        }

        // Wait for audio to be ready if it's not yet
        const attemptPlay = () => {
          try {
            // Reset to beginning if needed
            if (audio.currentTime > 0) {
              audio.currentTime = 0
            }

            const playPromise = audio.play()

            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('Audio started playing')
                  setIsPlaying(true)
                  setHasStarted(true)
                  resolve()
                })
                .catch((err) => {
                  console.warn('Failed to play audio:', err)
                  // Don't reject, just resolve so navigation isn't blocked
                  resolve()
                })
            } else {
              // Fallback for older browsers
              setIsPlaying(true)
              setHasStarted(true)
              resolve()
            }
          } catch (err) {
            console.warn('Error in attemptPlay:', err)
            resolve() // Always resolve to not block
          }
        }

        // Check if audio is ready
        if (audio.readyState >= 2) {
          // HAVE_CURRENT_DATA or higher - ready to play
          attemptPlay()
        } else {
          // Wait for audio to load
          const handleCanPlay = () => {
            audio.removeEventListener('canplaythrough', handleCanPlay)
            attemptPlay()
          }
          audio.addEventListener('canplaythrough', handleCanPlay)
          
          // Timeout after 2 seconds - don't wait too long
          setTimeout(() => {
            audio.removeEventListener('canplaythrough', handleCanPlay)
            if (!hasStarted) {
              console.warn('Audio taking time to load, attempting to play anyway')
              attemptPlay()
            }
          }, 2000)
        }
      } catch (err) {
        console.error('Error in startPlaylist:', err)
        resolve() // Always resolve to not block navigation
      }
    })
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
