import { Routes, Route, Navigate } from 'react-router-dom'
import AiLearningHub from './pages/AiLearningHub'
import AiTopicPage from './pages/AiTopicPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/learn/ai" replace />} />
      <Route path="/learn/ai" element={<AiLearningHub />} />
      <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
    </Routes>
  )
}