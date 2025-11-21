import { Routes, Route } from 'react-router-dom'
import Splash from './components/Splash.jsx'
import RoseInteractive from './components/RoseInteractive.jsx'
import LetterPage from './components/LetterPage.jsx'
import Chapters from './components/Chapters.jsx'
import FinalReveal from './components/FinalReveal.jsx'
import ComingSoon from './components/ComingSoon.jsx'

function App() {
  return (
    <div className="min-h-screen bg-ivory text-khanyaPinkDeep">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/rose" element={<RoseInteractive />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/finale" element={<FinalReveal />} />
        <Route path="*" element={<ComingSoon title="Coming Soon" />} />
      </Routes>
    </div>
  )
}

export default App
