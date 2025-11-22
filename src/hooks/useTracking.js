import { useEffect } from 'react'

// Simple tracking - logs when app is opened
// You can extend this to send to an API endpoint later
export default function useTracking() {
  useEffect(() => {
    const trackVisit = () => {
      const visitData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      // Store in localStorage (you can see this in browser dev tools)
      const visits = JSON.parse(localStorage.getItem('app_visits') || '[]')
      visits.push(visitData)
      localStorage.setItem('app_visits', JSON.stringify(visits))
      localStorage.setItem('last_visit', new Date().toISOString())

      // Optional: Send to an API endpoint
      // Uncomment and add your API endpoint when ready:
      /*
      fetch('YOUR_API_ENDPOINT/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitData),
      }).catch(console.error)
      */
    }

    trackVisit()
  }, [])
}

