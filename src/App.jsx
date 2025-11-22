import { Routes, Route } from 'react-router-dom'
import Splash from './components/Splash.jsx'
import RoseInteractive from './components/RoseInteractive.jsx'
import LetterPage from './components/LetterPage.jsx'
import Chapters from './components/Chapters.jsx'
import FinalReveal from './components/FinalReveal.jsx'
import ComingSoon from './components/ComingSoon.jsx'
import AdminView from './components/AdminView.jsx'
import useTracking from './hooks/useTracking.js'

function App() {
  useTracking() // Track when app is opened

  return (
    <div className="min-h-screen bg-ivory text-khanyaPinkDeep">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/rose" element={<RoseInteractive />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/finale" element={<FinalReveal />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="*" element={<ComingSoon title="Coming Soon" />} />
      </Routes>
    </div>
  )
}

export default App
