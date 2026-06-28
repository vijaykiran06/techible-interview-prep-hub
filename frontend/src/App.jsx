import { Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './routes/publicRoutes';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/interview-prep" replace />} />
      {publicRoutes}
    </Routes>
  );
}

export default App;