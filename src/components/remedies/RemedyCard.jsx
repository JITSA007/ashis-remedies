import { useState } from 'react';
import { Clock, Beaker, Scroll, ChefHat, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function RemedyCard({ remedy }) {
  const [viewMode, setViewMode] = useState('tradition');
  const { isPro } = useAuth(); // Check if user is Pro

  return (
    <div className="relative bg-white dark:bg-night-800 rounded-3xl overflow-hidden shadow-lg border border-soil-100 dark:border-night-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={remedy.image || "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=600"} 
          alt={remedy.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-night-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-leaf-600 dark:text-leaf-400 flex items-center shadow-sm">
          <Clock className="w-3 h-3 mr-1" />
          {remedy.timeToMake || "10 mins"}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-bold mb-2 text-soil-900 dark:text-soil-100">
          {remedy.title}
        </h3>
        
        {/* Symptoms Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {remedy.symptoms && remedy.symptoms.map((symptom, idx) => (
            <span key={idx} className="px-2 py-1 text-[10px] uppercase font-bold rounded-md bg-soil-100 dark:bg-night-700 text-soil-600 dark:text-soil-300">
              {symptom}
            </span>
          ))}
        </div>

        <p className="text-soil-600 dark:text-soil-400 text-sm mb-6 flex-grow">
          {remedy.description}
        </p>

        {/* The Toggle Section (Pro Gated) */}
        <div className="rounded-xl p-1 mb-4 border bg-soil-50 dark:bg-night-900 border-soil-200 dark:border-night-700 relative overflow-hidden">
          <div className="flex relative z-10">
            <motion.div 
              className="absolute top-0 bottom-0 w-1/2 rounded-lg shadow-sm bg-white dark:bg-night-800"
              initial={false}
              animate={{ x: viewMode === 'science' ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button onClick={() => setViewMode('tradition')} className={`relative z-10 w-1/2 py-2 text-xs font-bold flex items-center justify-center space-x-1 transition-colors ${viewMode === 'tradition' ? 'text-soil-800 dark:text-soil-100' : 'text-soil-500'}`}>
              <Scroll className="w-3 h-3" /><span>Tradition</span>
            </button>
            <button onClick={() => setViewMode('science')} className={`relative z-10 w-1/2 py-2 text-xs font-bold flex items-center justify-center space-x-1 transition-colors ${viewMode === 'science' ? 'text-leaf-600 dark:text-leaf-400' : 'text-soil-500'}`}>
              <Beaker className="w-3 h-3" /><span>Science</span>
            </button>
          </div>
          
          <div className="mt-3 px-2 pb-2 min-h-[60px] relative">
             <AnimatePresence mode="wait">
              <motion.p
                key={viewMode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`text-xs leading-relaxed ${viewMode === 'science' ? 'text-leaf-700 dark:text-leaf-300' : 'text-soil-700 dark:text-amber-200'}`}
              >
                {/* LOGIC: If mode is Science AND user is NOT Pro, show blur */}
                {viewMode === 'science' && !isPro ? (
                  <span className="blur-sm select-none">
                    Scientific analysis indicates that the chemical composition of this herb interacts with...
                  </span>
                ) : (
                  viewMode === 'tradition' ? (remedy.tradition || "Traditional wisdom...") : (remedy.science || "Scientific analysis...")
                )}
              </motion.p>
             </AnimatePresence>

             {/* Pro Lock Overlay */}
             {viewMode === 'science' && !isPro && (
               <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-night-900/50 backdrop-blur-[1px] rounded-lg">
                 <Link to="/signup" className="flex items-center px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors">
                   <Lock className="w-3 h-3 mr-1" /> Unlock Pro
                 </Link>
               </div>
             )}
          </div>
        </div>

        <button className="w-full py-2 border rounded-xl text-sm font-semibold transition-colors flex items-center justify-center border-leaf-200 dark:border-leaf-800 text-leaf-600 dark:text-leaf-400 hover:bg-leaf-50 dark:hover:bg-night-700">
          <ChefHat className="w-4 h-4 mr-2" /> View Preparation
        </button>

      </div>
    </div>
  );
}