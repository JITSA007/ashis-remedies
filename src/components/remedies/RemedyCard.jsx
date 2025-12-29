import { useState } from 'react';
import { Clock, Beaker, Scroll, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RemedyCard({ remedy }) {
  const [viewMode, setViewMode] = useState('tradition'); // 'tradition' or 'science'

  return (
    <div className="bg-white dark:bg-night-800 rounded-3xl overflow-hidden shadow-lg border border-soil-100 dark:border-night-700 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={remedy.image} 
          alt={remedy.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-night-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-leaf-600 dark:text-leaf-400 flex items-center shadow-sm">
          <Clock className="w-3 h-3 mr-1" />
          {remedy.timeToMake}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2">
          {remedy.title}
        </h3>
        
        {/* Symptoms Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {remedy.symptoms.slice(0, 3).map((symptom, idx) => (
            <span key={idx} className="px-2 py-1 bg-soil-100 dark:bg-night-700 text-soil-600 dark:text-soil-300 text-xs rounded-md">
              {symptom}
            </span>
          ))}
        </div>

        <p className="text-soil-600 dark:text-soil-400 text-sm mb-6 flex-grow">
          {remedy.description}
        </p>

        {/* The Toggle Section */}
        <div className="bg-soil-50 dark:bg-night-900 rounded-xl p-1 mb-4 border border-soil-200 dark:border-night-700">
          <div className="flex relative">
            {/* Sliding Background */}
            <motion.div 
              className="absolute top-0 bottom-0 w-1/2 bg-white dark:bg-night-800 rounded-lg shadow-sm"
              initial={false}
              animate={{ x: viewMode === 'science' ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button 
              onClick={() => setViewMode('tradition')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold flex items-center justify-center space-x-1 transition-colors ${viewMode === 'tradition' ? 'text-soil-800 dark:text-soil-100' : 'text-soil-500'}`}
            >
              <Scroll className="w-3 h-3" />
              <span>Tradition</span>
            </button>
            <button 
              onClick={() => setViewMode('science')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold flex items-center justify-center space-x-1 transition-colors ${viewMode === 'science' ? 'text-leaf-600 dark:text-leaf-400' : 'text-soil-500'}`}
            >
              <Beaker className="w-3 h-3" />
              <span>Science</span>
            </button>
          </div>
          
          <div className="mt-3 px-2 pb-2 min-h-[60px]">
             <AnimatePresence mode="wait">
              <motion.p
                key={viewMode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`text-xs leading-relaxed ${viewMode === 'science' ? 'text-leaf-700 dark:text-leaf-300' : 'text-soil-700 dark:text-gold-400'}`}
              >
                {viewMode === 'tradition' ? remedy.tradition : remedy.science}
              </motion.p>
             </AnimatePresence>
          </div>
        </div>

        {/* Expand Button (Placeholder for Detail View) */}
        <button className="w-full py-2 border border-leaf-200 dark:border-leaf-800 text-leaf-600 dark:text-leaf-400 rounded-xl text-sm font-semibold hover:bg-leaf-50 dark:hover:bg-night-700 transition-colors flex items-center justify-center">
          <ChefHat className="w-4 h-4 mr-2" />
          View Preparation
        </button>

      </div>
    </div>
  );
}