import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Outfits from './pages/Outfits';
import Skincare from './pages/Skincare';
import Affirmations from './pages/Affirmations';
import HealthyDiet from './pages/HealthyDiet';
import Journal from './pages/Journal';
import Progress from './pages/Progress';
import Chat from './pages/Chat';
import Shop from './pages/Shop';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import useStore from './store';

// Protected Route component
function ProtectedRoute({ children }) {
  // Demo mode: allow access without login
  return children;
}

// Rotate Phone Warning for mobile users
function RotatePhoneWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('rotateWarningDismissed') === 'true';
  });

  useEffect(() => {
    const checkOrientation = () => {
      // Check if mobile (narrow screen) AND portrait mode
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowWarning(isMobile && isPortrait && !dismissed);
    };

    // Check immediately
    checkOrientation();

    // Check on resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', () => {
      // Small delay for orientation change to take effect
      setTimeout(checkOrientation, 100);
    });

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setShowWarning(false);
    sessionStorage.setItem('rotateWarningDismissed', 'true');
  };

  if (!showWarning) return null;

  return (
    <div className="rotate-warning-overlay" style={{ display: 'flex' }}>
      <div className="rotate-warning-card">
        <div className="rotate-phone-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ff69b4" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
          </svg>
          <div className="rotate-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ff69b4" strokeWidth="2">
              <path d="M23 4v6h-6"/>
              <path d="M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </div>
        </div>
        <h3>rotate your phone</h3>
        <p>for the best experience, please rotate your device to landscape mode</p>
        <button 
          className="rotate-dismiss-btn"
          onClick={handleDismiss}
        >
          continue anyway
        </button>
      </div>
    </div>
  );
}

function App() {
  const { user } = useStore();
  const location = useLocation();
  
  // Pages where navbar should be hidden
  const hideNavbar = ['/welcome', '/login', '/register'].includes(location.pathname);

  return (
    <div className="app">
      <RotatePhoneWarning />
      <AudioPlayer />
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/welcome" element={user ? <Navigate to="/" replace /> : <Welcome />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
          <Route path="/outfits" element={<ProtectedRoute><Outfits /></ProtectedRoute>} />
          <Route path="/skincare" element={<ProtectedRoute><Skincare /></ProtectedRoute>} />
          <Route path="/affirmations" element={<ProtectedRoute><Affirmations /></ProtectedRoute>} />
          <Route path="/healthy-diet" element={<ProtectedRoute><HealthyDiet /></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Catch all - redirect to welcome if not authenticated */}
          <Route path="*" element={<Navigate to={user ? "/" : "/welcome"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;



