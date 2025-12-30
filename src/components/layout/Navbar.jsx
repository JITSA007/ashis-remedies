import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext'; // Import Auth
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isPro, isAdmin } = useAuth(); // Auth Hook
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define Links based on Auth Status
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Founder', path: '/founder' },
  ];

  const privateLinks = [
    { name: 'Remedies', path: '/remedies' },
    { name: 'Community', path: '/community' },
  ];

  // Pro features
  const proLinks = [
    { name: 'Veda Lab', path: '/veda-lab' },
    { name: 'Vedji Clinic', path: '/vedji' },
  ];

  const activeLinks = user 
    ? [...publicLinks, ...privateLinks, ...(isPro || isAdmin ? proLinks : [])] 
    : publicLinks;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <Leaf className="h-6 w-6 text-leaf-500 transition-transform group-hover:rotate-12" />
            <span className="font-serif font-bold text-xl text-soil-900 dark:text-soil-100">Ashi's Remedies</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {activeLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors hover:text-leaf-500 ${location.pathname === link.path ? 'text-leaf-600 dark:text-leaf-400 font-bold' : 'text-soil-600 dark:text-soil-300'}`}>
                {link.name}
              </Link>
            ))}
            
            {/* Pro Badge (Upsell) */}
            {user && !isPro && !isAdmin && (
              <Link to="/signup" className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold hover:bg-amber-200">
                Upgrade Pro
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-soil-200 dark:border-night-700">
                <span className="text-sm font-bold text-soil-800 dark:text-soil-200 flex items-center">
                  <User className="w-4 h-4 mr-1" /> {user.name}
                </span>
                <button onClick={handleLogout} title="Logout" className="text-soil-500 hover:text-red-500"><LogOut className="w-5 h-5" /></button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-4 border-l border-soil-200 dark:border-night-700">
                <Link to="/login" className="text-sm font-bold text-soil-600 hover:text-leaf-600">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-leaf-600 text-white rounded-full text-sm font-bold hover:bg-leaf-700 transition-transform hover:scale-105 shadow-md">
                  Join Free
                </Link>
              </div>
            )}

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-soil-100 dark:hover:bg-night-800 transition-colors">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-gold-500" /> : <Moon className="h-5 w-5 text-leaf-600" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-soil-800 dark:text-soil-100 hover:text-leaf-500">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-night-900 border-t border-soil-200 dark:border-night-700">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {activeLinks.map((link) => (
                <Link key={link.name} to={link.path} className="block px-3 py-2 rounded-md text-base font-medium text-soil-700 dark:text-soil-300 hover:bg-soil-50 dark:hover:bg-night-800">
                  {link.name}
                </Link>
              ))}
              {!user && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Link to="/login" className="text-center py-2 border rounded-lg">Login</Link>
                  <Link to="/signup" className="text-center py-2 bg-leaf-600 text-white rounded-lg">Sign Up</Link>
                </div>
              )}
              {user && (
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 font-bold">Logout</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}