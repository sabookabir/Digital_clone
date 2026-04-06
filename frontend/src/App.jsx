import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Interaction from './pages/Interaction';
import Auth from './pages/Auth';
import Analysis from './pages/Analysis';
import FeedbackModal from './components/FeedbackModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>Connecting Neural Links...</div>;
    return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/interact" element={
              <ProtectedRoute><Interaction /></ProtectedRoute>
            } />
            <Route path="/analyze" element={
              <ProtectedRoute><Analysis /></ProtectedRoute>
            } />
          </Routes>
          <FeedbackModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
