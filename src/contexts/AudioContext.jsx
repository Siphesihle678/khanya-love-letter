/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import useAudioPlaylist from '../hooks/useAudioPlaylist'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const audio = useAudioPlaylist()

  return <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

