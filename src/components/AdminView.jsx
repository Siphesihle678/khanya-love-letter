import { useState, useEffect } from 'react'

export default function AdminView() {
  const [visits, setVisits] = useState([])
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      const visitData = JSON.parse(localStorage.getItem('app_visits') || '[]')
      const feedbackData = JSON.parse(localStorage.getItem('app_feedback') || '[]')
      
      setVisits(visitData)
      setFeedback(feedbackData)
    }

    requestAnimationFrame(loadData)
  }, [])

  function clearData() {
    if (confirm('Are you sure you want to clear all tracking data?')) {
      localStorage.removeItem('app_visits')
      localStorage.removeItem('app_feedback')
      setVisits([])
      setFeedback([])
    }
  }

  function exportData() {
    const data = {
      visits,
      feedback,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `khanya-app-data-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-ivory p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-khanyaPinkDeep mb-6">App Analytics</h1>

        <div className="mb-6 flex gap-4">
          <button
            onClick={exportData}
            className="px-4 py-2 rounded-full bg-khanyaPink text-ivory font-medium hover:scale-105 transition"
          >
            Export Data
          </button>
          <button
            onClick={clearData}
            className="px-4 py-2 rounded-full border border-khanyaPinkDeep/40 text-khanyaPinkDeep hover:bg-white transition"
          >
            Clear Data
          </button>
        </div>

        <div className="space-y-8">
          <div className="bg-white/85 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-serif text-khanyaPinkDeep mb-4">
              Visits ({visits.length})
            </h2>
            {visits.length === 0 ? (
              <p className="text-khanyaPinkDeep/70">No visits recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {visits.slice().reverse().map((visit, idx) => (
                  <div key={idx} className="border-b border-khanyaPink/20 pb-2">
                    <p className="text-sm text-khanyaPinkDeep/80">
                      {new Date(visit.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs text-khanyaPinkDeep/60">{visit.url}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/85 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-serif text-khanyaPinkDeep mb-4">
              Feedback ({feedback.length})
            </h2>
            {feedback.length === 0 ? (
              <p className="text-khanyaPinkDeep/70">No feedback received yet.</p>
            ) : (
              <div className="space-y-4">
                {feedback.slice().reverse().map((item, idx) => (
                  <div key={idx} className="border-b border-khanyaPink/20 pb-4">
                    <p className="text-xs text-khanyaPinkDeep/60 mb-2">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <p className="font-handwriting text-khanyaPinkDeep/90 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

