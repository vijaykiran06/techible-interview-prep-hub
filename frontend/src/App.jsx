<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom'
import AiLearningHub from './pages/AiLearningHub'
import AiTopicPage from './pages/AiTopicPage'
import './App.css'
=======
import PublicRoutes from './routes/publicRoutes';

function App() {
  return <PublicRoutes />;
}
>>>>>>> 2fc883e04fed6d0f431bc0aa49715f5e149938c0

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/learn/ai" replace />} />
      <Route path="/learn/ai" element={<AiLearningHub />} />
      <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
    </Routes>
  )
}