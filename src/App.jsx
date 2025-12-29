import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Volume2, VolumeX } from 'lucide-react';

// OM Chant Component
function OmPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // Toggle Audio
  const toggleAudio = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/03/09/audio_039603099c.mp3?filename=om-chant-18548.mp3" />
      <button 
        onClick={toggleAudio}
        className={`p-3 rounded-full shadow-lg border-2 transition-all duration-500 flex items-center justify-center ${
          playing 
            ? 'bg-orange-500 border-orange-300 text-white shadow-orange-500/50 scale-110' 
            : 'bg-white dark:bg-night-800 border-soil-200 dark:border-night-600 text-soil-500 dark:text-soil-400'
        }`}
        title={playing ? "Pause Om Chant" : "Play Om Chant"}
      >
        {playing ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </div>
  );
}

function AppContent() {
  const { theme } = useTheme();
  
  // 1. Calculate Cosmic Data (Season & Moon)
  const cosmicData = useMemo(() => {
    const today = new Date();
    const month = today.getMonth();
    
    // Moon Phase (0 = New, 0.5 = Full, 1 = New)
    const knownNewMoon = new Date('2024-01-11').getTime();
    const cycle = 29.53 * 24 * 60 * 60 * 1000;
    const diff = today.getTime() - knownNewMoon;
    const phase = (diff % cycle) / cycle;

    // Current Season
    const currentSeason = seasonsData.find(s => s.months.includes(month)) || seasonsData[0];

    return { phase, season: currentSeason };
  }, []);

  // 2. Generate Dynamic Styles based on Theme + Cosmic Data
  const getBackgroundStyle = () => {
    if (theme === 'dark') {
      // Moon Logic: Darker near New Moon (0/1), Brighter/Blue near Full Moon (0.5)
      const brightness = 1 - (2 * Math.abs(cosmicData.phase - 0.5)); // 0(new) to 1(full)
      // Base dark color -> Moon Glow color
      const color1 = '#0f172a'; // Slate 900
      const color2 = '#1e1b4b'; // Indigo 950
      
      // Dynamic Radial Gradient simulating moon glow from top-right
      return {
        background: `radial-gradient(circle at 70% 20%, ${brightness > 0.5 ? '#312e81' : '#1e293b'} 0%, ${color1} 60%, #020617 100%)`,
        backgroundAttachment: 'fixed'
      };
    } else {
      // Rishi/Light Logic: Warm Earthy Tones + Seasonal Tint
      // We use the seasonal theme class but enforce a specific "parchment" feel
      return {
        // Fallback gradient combined with a subtle texture overlay URL (simulated via CSS pattern)
        backgroundImage: `
          linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,247,237,0.8)), 
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6d3d1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundColor: '#fef3c7', // Amber-50 base
        backgroundAttachment: 'fixed'
      };
    }
  };

  return (
    <div style={getBackgroundStyle()} className="flex flex-col min-h-screen transition-all duration-1000">
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