import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Bot, MessageSquare, ArrowRight, Stethoscope, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BodyMap from '../components/remedies/BodyMap';
import DoshaQuiz from '../components/vedji/DoshaQuiz';

export default function Vedji() {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual', 'quiz', 'ai'
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  const handleBodySelect = (part) => {
    setSelectedBodyPart(part);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900">
      <Helmet>
        <title>Vedji Clinic | Digital Diagnosis</title>
        <meta name="description" content="Consult our digital Ayurvedic doctor. Visual diagnosis, Dosha analysis, and AI recommendations." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-leaf-800 dark:text-leaf-300 mb-4">
            Vedji's Clinic
          </h1>
          <p className="text-soil-600 dark:text-soil-400">
            Advanced diagnostic tools powered by Tradition & AI.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'visual'
                ? 'bg-leaf-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-night-800 text-soil-500 border border-soil-200 dark:border-night-700 hover:bg-leaf-50'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            Visual Checkup
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-leaf-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-night-800 text-soil-500 border border-soil-200 dark:border-night-700 hover:bg-leaf-50'
            }`}
          >
            <Activity className="w-5 h-5 mr-2" />
            Nadi Pariksha
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'ai'
                ? 'bg-leaf-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-night-800 text-soil-500 border border-soil-200 dark:border-night-700 hover:bg-leaf-50'
            }`}
          >
            <Bot className="w-5 h-5 mr-2" />
            Ashi AI
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: Visual Body Map (Split Screen) */}
            {activeTab === 'visual' && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                {/* Left: The Map */}
                <div className="bg-white dark:bg-night-800 p-8 rounded-3xl shadow-sm border border-soil-100 dark:border-night-700 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="flex items-center text-xs font-bold text-leaf-600 uppercase tracking-widest bg-leaf-50 dark:bg-night-900 px-3 py-1 rounded-full">
                      <Stethoscope className="w-3 h-3 mr-1" />
                      Scanner Active
                    </span>
                  </div>
                  <BodyMap onSelect={handleBodySelect} activePart={selectedBodyPart} />
                  <p className="text-center text-xs text-soil-400 mt-6 animate-pulse">
                    Interactive Scanner: Tap highlighted zones to analyze.
                  </p>
                </div>

                {/* Right: The Diagnosis Panel */}
                <div className="flex flex-col h-full justify-center">
                  <AnimatePresence mode="wait">
                    {selectedBodyPart ? (
                      <motion.div
                        key={selectedBodyPart.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-leaf-50 dark:bg-night-800 p-8 rounded-3xl border border-leaf-200 dark:border-night-600 h-full max-h-[500px] flex flex-col"
                      >
                        <div className="mb-6">
                          <h3 className="text-3xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2">
                            {selectedBodyPart.name}
                          </h3>
                          <p className="text-soil-600 dark:text-soil-300 text-sm leading-relaxed">
                            {selectedBodyPart.description}
                          </p>
                        </div>

                        <div className="flex-grow space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                          <h4 className="text-xs font-bold text-soil-400 uppercase tracking-wider mb-2">
                            Common Ailments
                          </h4>
                          {selectedBodyPart.symptoms.map((symptom, idx) => (
                            <Link
                              key={idx}
                              to={`/remedies?filter=${symptom}`}
                              className="group flex items-center justify-between p-4 bg-white dark:bg-night-900 rounded-xl border border-soil-100 dark:border-night-700 hover:border-leaf-500 dark:hover:border-leaf-500 hover:shadow-md transition-all cursor-pointer"
                            >
                              <span className="font-medium text-soil-800 dark:text-soil-200 group-hover:text-leaf-600 dark:group-hover:text-leaf-400">
                                {symptom}
                              </span>
                              <ArrowRight className="w-4 h-4 text-soil-300 group-hover:text-leaf-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-leaf-200 dark:border-night-700 text-center">
                           <p className="text-xs text-soil-500 dark:text-soil-400">
                             Select a symptom above to find specific remedies.
                           </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-soil-50 dark:bg-night-800 p-8 rounded-3xl border-2 border-dashed border-soil-200 dark:border-night-700 h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                      >
                        <div className="w-20 h-20 bg-soil-200 dark:bg-night-700 rounded-full flex items-center justify-center mb-6 text-soil-400">
                          <User className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-soil-800 dark:text-soil-200 mb-2">
                          No Zone Selected
                        </h3>
                        <p className="text-soil-500 dark:text-soil-400 max-w-xs">
                          Please click on a body part in the visual scanner to view potential ailments and Ayurvedic insights.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Dosha Quiz */}
            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DoshaQuiz />
              </motion.div>
            )}

            {/* TAB 3: Ashi AI (Mockup) */}
            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-night-800 rounded-3xl overflow-hidden shadow-lg border border-soil-100 dark:border-night-700 max-w-2xl mx-auto"
              >
                {/* Chat Header */}
                <div className="bg-leaf-600 p-4 flex items-center text-white">
                  <Bot className="w-6 h-6 mr-3" />
                  <div>
                    <h3 className="font-bold">Ashi AI</h3>
                    <p className="text-xs text-leaf-100">Ayurvedic Intelligence Model v1.0</p>
                  </div>
                </div>
                
                {/* Chat Window */}
                <div className="h-80 bg-soil-50 dark:bg-night-900 p-4 overflow-y-auto space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-night-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm text-soil-800 dark:text-soil-200">
                      Namaste! I am Ashi AI. I can check interactions between herbs or suggest remedies for the season. How can I help?
                    </div>
                  </div>
                </div>

                {/* Input Area (Mock) */}
                <div className="p-4 border-t border-soil-200 dark:border-night-700 flex space-x-2">
                  <input 
                    disabled
                    type="text" 
                    placeholder="Coming soon..." 
                    className="flex-grow px-4 py-2 rounded-full bg-soil-100 dark:bg-night-950 border-none focus:ring-2 focus:ring-leaf-500 opacity-50 cursor-not-allowed" 
                  />
                  <button disabled className="p-2 bg-leaf-600 text-white rounded-full opacity-50 cursor-not-allowed">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}