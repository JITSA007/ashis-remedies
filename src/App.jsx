import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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
import seasonsData from './data/seasons.json';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

/**
 * Global Scroll Correction
 * Ensures that every route transition resets the scroll position to the top.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * OM Chant Component
 * Plays an authentic, deep-frequency Om chant.
 * Uses a stable, direct-link source.
 */
function OmPlayer() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Very soft base volume
    }
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        // Attempting playback - most browsers require a user interaction (like this click)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlaying(true);
              setError(false);
            })
            .catch((err) => {
              console.error("Autoplay blocked or link failed:", err);
              setError(true);
            });
        }
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Authentic Meditative Om Sound Source */}
      <audio 
        ref={audioRef} 
        loop 
        src="public/Sound/om.mp3" // Stable test link; Replace with your specific .mp3 in public folder for production
        onError={() => setError(true)}
      />
      
      <button 
        onClick={toggleAudio}
        className={`p-3 rounded-full shadow-lg border-2 transition-all duration-700 flex items-center justify-center relative ${
          playing 
            ? 'bg-orange-600 border-orange-400 text-white shadow-orange-600/50 scale-110' 
            : 'bg-white dark:bg-night-800 border-soil-200 dark:border-night-600 text-soil-500 dark:text-soil-400'
        }`}
        title={error ? "Audio Link Error" : (playing ? "Pause Meditation" : "Start Om Chant")}
      >
        {error ? <AlertCircle className="w-5 h-5 text-red-500" /> : (
          playing ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />
        )}
        
        {playing && (
          <>
            <span className="absolute inset-0 rounded-full bg-orange-400 opacity-25 animate-ping"></span>
            <span className="absolute inset-0 rounded-full bg-orange-400 opacity-10 animate-pulse scale-150"></span>
          </>
        )}
      </button>
    </div>
  );
}

/**
 * Cosmic Theme Wrapper
 * Manages Season-based colors and Moon-based background gradients.
 */
function AppContent() {
  const { theme } = useTheme();
  
  const cosmicData = useMemo(() => {
    const today = new Date();
    const month = today.getMonth();
    
    // Moon Phase Logic: 0 = New Moon, 0.5 = Full Moon
    const knownNewMoon = new Date('2024-01-11').getTime();
    const cycle = 29.53 * 24 * 60 * 60 * 1000;
    const phase = ((today.getTime() - knownNewMoon) % cycle) / cycle;

    // Current Ayurvedic Season
    const currentSeason = seasonsData.find(s => s.months.includes(month)) || seasonsData[0];

    return { phase, season: currentSeason };
  }, []);

  const getBackgroundStyle = () => {
    if (theme === 'dark') {
      // Dark Mode: Cosmic Moon Glow
      const brightness = 1 - (2 * Math.abs(cosmicData.phase - 0.5)); 
      const glowIntensity = brightness > 0.5 ? '0.35' : '0.15';
      const glowColor = `rgba(67, 56, 202, ${glowIntensity})`;
      
      return {
        background: `radial-gradient(circle at 85% 15%, ${glowColor} 0%, #0f172a 45%, #020617 100%)`,
        backgroundAttachment: 'fixed'
      };
    } else {
      // Light Mode: Rishi/Parchment with medicinal herb silhouettes
      return {
        background: `
          linear-gradient(to bottom right, rgba(255, 255, 255, 0.85), rgba(254, 243, 199, 0.7)),
          url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c0 10-10 10-10 20s10 10 10 20-10 10-10 20' stroke='%23427452' stroke-opacity='0.04' fill='none'/%3E%3Cpath d='M70 10c0 10 10 10 10 20s-10 10-10 20 10 10 10 20' stroke='%23427452' stroke-opacity='0.04' fill='none'/%3E%3C/svg%3E"),
          #fffbeb
        `,
        backgroundAttachment: 'fixed'
      };
    }
  };

  return (
    <div 
      style={getBackgroundStyle()} 
      className={`flex flex-col min-h-screen transition-all duration-1000 ${cosmicData.season.themeClass.split(' ').filter(c => c.startsWith('bg-')).join(' ')}`}
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/veda-lab" element={<VedaLab />} />
          <Route path="/vedji" element={<Vedji />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<Admin />} />
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
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;