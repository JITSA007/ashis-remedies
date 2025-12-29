import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import FireflyParticles from '../components/effects/FireflyParticles';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>Ashi's Remedies | Tech Meets Soil</title>
        <meta name="description" content="Discover ancient Ayurvedic remedies powered by modern AI. A project by Jitendra Prajapat bridging technology and nature." />
      </Helmet>
      
      {/* Background Effects */}
      <FireflyParticles />
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-leaf-100 dark:bg-night-800 rounded-full text-leaf-700 dark:text-leaf-300 text-sm font-medium mb-4 shadow-sm border border-leaf-200 dark:border-night-700">
            <Sparkles className="w-4 h-4" />
            <span>Ayurveda Reimagined with AI</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-soil-900 dark:text-soil-100">
            Tech Meets <span className="text-leaf-600 dark:text-leaf-500 italic">Soil</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-soil-600 dark:text-soil-300 max-w-2xl mx-auto leading-relaxed">
            Discover ancient remedies powered by modern intelligence. 
            From the farm to your pharmacy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
            <Link 
              to="/remedies" 
              className="px-8 py-4 bg-leaf-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-leaf-700 transition-transform hover:scale-105 flex items-center"
            >
              Explore Remedies
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/veda-lab" 
              className="px-8 py-4 bg-white dark:bg-night-800 text-soil-800 dark:text-soil-200 border border-soil-200 dark:border-night-600 rounded-full font-bold text-lg shadow-sm hover:bg-soil-50 dark:hover:bg-night-700 transition-colors flex items-center"
            >
              <Leaf className="mr-2 w-5 h-5 text-leaf-500" />
              Enter Veda Lab
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}