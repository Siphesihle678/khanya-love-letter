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
      console.error('Audio loading error:', err)
      console.error('Audio element error:', audio.error)
      console.error('Tried to load:', SONG.src)
      console.error('Audio network state:', audio.networkState)
      console.error('Audio ready state:', audio.readyState)
    }

    // Handle when audio can start playing
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadeddata', () => {
      console.log('Audio data loaded')
    })

    // Try to load the audio
    audio.load().catch((err) => {
      console.error('Failed to load audio:', err)
    })

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  const startPlaylist = () => {
    return new Promise((resolve, reject) => {
      if (hasStarted) {
        resolve()
        return
      }

      const audio = audioRef.current
      if (!audio) {
        console.error('Audio element not initialized')
        reject(new Error('Audio element not initialized'))
        return
      }

      // Wait for audio to be ready if it's not yet
      const attemptPlay = () => {
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
              console.error('Failed to play audio:', err)
              console.error('Audio element state:', {
                readyState: audio.readyState,
                networkState: audio.networkState,
                error: audio.error,
              })
              reject(err)
            })
        } else {
          // Fallback for older browsers
          setIsPlaying(true)
          setHasStarted(true)
          resolve()
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
        
        // Timeout after 3 seconds
        setTimeout(() => {
          audio.removeEventListener('canplaythrough', handleCanPlay)
          if (!hasStarted) {
            console.warn('Audio took too long to load, attempting to play anyway')
            attemptPlay()
          }
        }, 3000)
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
