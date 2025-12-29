import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Moon, Sun, HeartPulse } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Detect scroll to make navbar transparent or solid
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Founder', path: '/founder' },
    { name: 'Remedies', path: '/remedies' },
    { name: 'Veda Lab', path: '/veda-lab' },
    { name: 'Vedji', path: '/vedji' }, // Added Vedji
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Leaf className="h-6 w-6 text-leaf-500 transition-transform group-hover:rotate-12" />
            <span className="font-serif font-bold text-xl text-soil-900 dark:text-soil-100">
              Ashi's Remedies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-leaf-500 ${
                  location.pathname === link.path
                    ? 'text-leaf-600 dark:text-leaf-400 font-bold'
                    : 'text-soil-600 dark:text-soil-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-soil-100 dark:hover:bg-night-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gold-500" />
              ) : (
                <Moon className="h-5 w-5 text-leaf-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2">
               {theme === 'dark' ? <Sun className="h-5 w-5 text-gold-500" /> : <Moon className="h-5 w-5 text-leaf-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-soil-800 dark:text-soil-100 hover:text-leaf-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-night-900 border-t border-soil-200 dark:border-night-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-leaf-50 dark:bg-night-800 text-leaf-600 dark:text-leaf-400'
                      : 'text-soil-700 dark:text-soil-300 hover:bg-soil-50 dark:hover:bg-night-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}