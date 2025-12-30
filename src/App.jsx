import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Updated imports
import { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Founder from './pages/Founder';
import Remedies from './pages/Remedies';
import VedaLab from './pages/VedaLab';
import Vedji from './pages/Vedji';
import Community from './pages/Community';
import Admin from './pages/Admin';
import GuestEditor from './pages/GuestEditor';
import NotFound from './pages/NotFound';
import Login from './pages/Login';   // New
import Signup from './pages/Signup'; // New
import seasonsData from './data/seasons.json';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ... OmPlayer Component (Keeping existing logic) ...
function OmPlayer() { /* ... existing code ... */ return <div className="fixed bottom-6 left-6 z-50">...</div>; }

// --- AUTH GUARDS ---
const ProtectedRoute = ({ children, requirePro = false }) => {
  const { user, isPro, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (requirePro && !isPro && !isAdmin) return <Navigate to="/remedies" />; // Redirect Free users trying to access Pro pages
  return children;
};

function AppContent() {
  const { theme } = useTheme();
  // ... Cosmic Logic (Keeping existing code) ...
  const cosmicData = useMemo(() => { return { phase: 0.5, season: seasonsData[0] }; }, []); // Simplified for brevity in this response
  const getBackgroundStyle = () => { /* ... existing code ... */ return {}; };

  return (
    <div style={getBackgroundStyle()} className={`flex flex-col min-h-screen transition-all duration-1000`}>
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Private Routes (Any Logged In User) */}
          <Route path="/remedies" element={<ProtectedRoute><Remedies /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          
          {/* Pro Routes (Paid Members Only) */}
          <Route path="/veda-lab" element={<ProtectedRoute requirePro={true}><VedaLab /></ProtectedRoute>} />
          <Route path="/vedji" element={<ProtectedRoute requirePro={true}><Vedji /></ProtectedRoute>} />
          
          {/* Admin */}
          <Route path="/admin" element={<Admin />} /> {/* Admin has its own internal login check */}
          
          <Route path="/guest-editor/:token" element={<GuestEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <OmPlayer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* Wrap everything in Auth */}
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;