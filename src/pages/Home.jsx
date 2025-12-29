import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Leaf, Sparkles, User, Heart, Stethoscope } from 'lucide-react';
import FireflyParticles from '../components/effects/FireflyParticles';
import SeasonalWidget from '../components/home/SeasonalWidget';
import HinduCalendarWidget from '../components/home/HinduCalendarWidget';
import WhatsAppButton from '../components/common/WhatsAppButton';

export default function Home() {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper to scroll to top when clicking internal links
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>Ashi's Remedies | Tech Meets Soil</title>
        <meta name="description" content="Discover ancient Ayurvedic remedies powered by modern AI. A project by Jitendra Prajapat bridging technology and nature." />
      </Helmet>
      
      {/* Background Effects */}
      <FireflyParticles />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-leaf-100/80 dark:bg-night-800/80 backdrop-blur-sm rounded-full text-leaf-700 dark:text-leaf-300 text-sm font-medium mb-4 shadow-sm border border-leaf-200 dark:border-night-700">
            <Sparkles className="w-4 h-4" />
            <span>Ayurveda Reimagined with AI</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-soil-900 dark:text-soil-100 drop-shadow-sm">
            Tech Meets <span className="text-leaf-600 dark:text-leaf-500 italic">Soil</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-soil-600 dark:text-soil-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover ancient remedies powered by modern intelligence. 
            From the farm to your pharmacy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
            <Link 
              to="/remedies" 
              onClick={scrollToTop}
              className="px-8 py-4 bg-leaf-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-leaf-700 transition-transform hover:scale-105 flex items-center"
            >
              Explore Remedies
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/veda-lab" 
              onClick={scrollToTop}
              className="px-8 py-4 bg-white/80 dark:bg-night-800/80 backdrop-blur-sm text-soil-800 dark:text-soil-200 border border-soil-200 dark:border-night-600 rounded-full font-bold text-lg shadow-sm hover:bg-white dark:hover:bg-night-700 transition-colors flex items-center"
            >
              <Leaf className="mr-2 w-5 h-5 text-leaf-500" />
              Enter Veda Lab
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Dynamic Wisdom Grid (Seasonal + Calendar) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SeasonalWidget />
        <HinduCalendarWidget />
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Meet the Founder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-night-800/80 backdrop-blur-sm p-8 rounded-3xl border border-soil-200 dark:border-night-700 hover:shadow-xl transition-all group"
        >
          <div className="w-12 h-12 bg-soil-100 dark:bg-night-700 rounded-full flex items-center justify-center mb-6 text-soil-600 dark:text-soil-300 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-3">Meet the Founder</h3>
          <p className="text-soil-600 dark:text-soil-300 mb-6">
            Jitendra Prajapat — bridging the gap between Silicon chips and Soil. A journey from AI research to organic farming.
          </p>
          <Link to="/founder" onClick={scrollToTop} className="text-leaf-600 font-bold hover:underline flex items-center">
            Read his story <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

        {/* Card 2: Community Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-night-800/80 backdrop-blur-sm p-8 rounded-3xl border border-soil-200 dark:border-night-700 hover:shadow-xl transition-all group"
        >
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-3">The Healing Circle</h3>
          <p className="text-soil-600 dark:text-soil-300 mb-6">
            Join a community of wellness seekers. Share your own home remedies and read verified stories from others.
          </p>
          <Link to="/community" onClick={scrollToTop} className="text-orange-600 font-bold hover:underline flex items-center">
            Join the circle <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

        {/* Card 3: Consult Vedji */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-night-800/80 backdrop-blur-sm p-8 rounded-3xl border border-soil-200 dark:border-night-700 hover:shadow-xl transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-3">Consult Vedji</h3>
          <p className="text-soil-600 dark:text-soil-300 mb-6">
            Not sure what you need? Use our interactive Body Map, take the Dosha Quiz, or chat with Ashi AI.
          </p>
          <Link to="/vedji" onClick={scrollToTop} className="text-blue-600 font-bold hover:underline flex items-center">
            Start diagnosis <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

      </div>

    </div>
  );
}