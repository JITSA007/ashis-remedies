import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Founder from './pages/Founder';
import Remedies from './pages/Remedies';
import VedaLab from './pages/VedaLab';
import Vedji from './pages/Vedji'; // New Page
import Admin from './pages/Admin';
import GuestEditor from './pages/GuestEditor';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-soil-50 dark:bg-night-900 transition-colors duration-300">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/remedies" element={<Remedies />} />
              <Route path="/veda-lab" element={<VedaLab />} />
              <Route path="/vedji" element={<Vedji />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/guest-editor/:token" element={<GuestEditor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;