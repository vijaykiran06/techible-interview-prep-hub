import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/publicRoutes'; 
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default App;