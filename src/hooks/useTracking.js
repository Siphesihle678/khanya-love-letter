import { useEffect } from 'react'

// API endpoint - update this with your Railway API URL
const API_URL = import.meta.env.VITE_API_URL || ''

export default function useTracking() {
  useEffect(() => {
    const trackVisit = () => {
      const visitData = {
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      // Store in localStorage as backup
      const visits = JSON.parse(localStorage.getItem('app_visits') || '[]')
      visits.push({ ...visitData, timestamp: new Date().toISOString() })
      localStorage.setItem('app_visits', JSON.stringify(visits))
      localStorage.setItem('last_visit', new Date().toISOString())

      // Send to API if URL is configured
      if (API_URL) {
        fetch(`${API_URL}/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitData),
        }).catch((error) => {
          console.warn('Failed to track visit:', error)
        })
      }
    }

    trackVisit()
  }, [])
}

