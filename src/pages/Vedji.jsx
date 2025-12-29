import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Bot, MessageSquare, ArrowRight, Stethoscope, Send, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BodyMap from '../components/remedies/BodyMap';
import DoshaQuiz from '../components/vedji/DoshaQuiz';
import remediesData from '../data/remedies.json'; // Importing the Brain

export default function Vedji() {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual', 'quiz', 'ai'
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  // --- ASHI AI STATE ---
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: "Namaste! I am Ashi AI, your Ayurvedic assistant. I can help with:\n• Symptoms (e.g., 'dry cough', 'headache')\n• Ingredients (e.g., 'uses of turmeric')\n• Dosha info (e.g., 'what is pitta?')" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleBodySelect = (part) => {
    setSelectedBodyPart(part);
  };

  // --- AI LOGIC ENGINE (Expanded V2) ---
  const generateResponse = (query) => {
    const lowerQ = query.toLowerCase();
    
    // 1. Greetings & Persona
    if (lowerQ.match(/\b(hi|hello|namaste|hey|greetings)\b/)) {
      return "Namaste! I am Ashi, your Ayurvedic guide. How is your health today? You can ask me about remedies, ingredients, or your body type (Dosha).";
    }
    if (lowerQ.includes("who are you") || lowerQ.includes("what are you")) {
      return "I am Ashi AI, a digital assistant trained on the principles of Ayurveda and modern data science, created to bridge tradition with technology.";
    }
    if (lowerQ.includes("thank")) {
      return "You are very welcome! Nature heals best when shared.";
    }

    // 2. Dosha Specific Knowledge
    if (lowerQ.includes("vata")) {
      return "**Vata (Air & Ether):** The energy of movement.\n• *Signs of Imbalance:* Anxiety, dry skin, constipation, insomnia, feeling cold.\n• *Balancing Tips:* Keep warm, eat cooked/oily foods, maintain a regular routine.";
    }
    if (lowerQ.includes("pitta")) {
      return "**Pitta (Fire & Water):** The energy of transformation.\n• *Signs of Imbalance:* Anger, heartburn, inflammation, skin rashes, perfectionism.\n• *Balancing Tips:* Stay cool, avoid spicy/fried foods, enjoy sweet fruits, and practice moderation.";
    }
    if (lowerQ.includes("kapha")) {
      return "**Kapha (Earth & Water):** The energy of structure.\n• *Signs of Imbalance:* Lethargy, weight gain, congestion, depression, attachment.\n• *Balancing Tips:* Exercise daily, eat light/dry/spicy foods, and wake up early.";
    }

    // 3. Search Remedies by Symptom (Enhanced)
    const matchingRemedies = remediesData.filter(r => 
      r.symptoms.some(s => lowerQ.includes(s.toLowerCase())) ||
      r.title.toLowerCase().includes(lowerQ) ||
      (r.description && r.description.toLowerCase().includes(lowerQ))
    );

    if (matchingRemedies.length > 0) {
      // List top 2 results
      const topPicks = matchingRemedies.slice(0, 2);
      
      let response = `I found ${matchingRemedies.length} remedy${matchingRemedies.length > 1 ? 's' : ''} for you:\n\n`;
      
      topPicks.forEach(pick => {
        const ingredientsList = Array.isArray(pick.ingredients) 
          ? pick.ingredients.join(', ').replace(/ing_/g, '') 
          : pick.ingredients;
          
        response += `🌿 **${pick.title}**\n`;
        response += `• *Uses:* ${ingredientsList}\n`;
        response += `• *Wisdom:* ${pick.tradition}\n\n`;
      });

      if (matchingRemedies.length > 2) {
        response += `*Tip: Check the full Remedies Database for more options.*`;
      }
      return response;
    }

    // 4. Search by Ingredient
    const ingredientMatch = remediesData.filter(r => 
        Array.isArray(r.ingredients) && r.ingredients.some(i => lowerQ.includes(i.replace('ing_', '').toLowerCase()))
    );
    
    if (ingredientMatch.length > 0) {
        const uniqueRemedies = [...new Set(ingredientMatch.map(r => r.title))].slice(0, 3).join(", ");
        return `**${query}** is a powerful ingredient! We use it in remedies like: ${uniqueRemedies}.\nIt is generally good for balancing the body's systems.`;
    }

    // 5. General Wellness Concepts (Fallbacks)
    if (lowerQ.includes("sleep") || lowerQ.includes("insomnia")) {
        return "Sleep issues often relate to high Vata. Try drinking warm milk with nutmeg (Jaiphal) before bed, or massage your feet with warm sesame oil.";
    }
    if (lowerQ.includes("digestion") || lowerQ.includes("stomach") || lowerQ.includes("gas")) {
        return "Digestion (Agni) is the root of health. Ginger tea before meals can ignite your digestive fire. Avoid drinking cold water with food.";
    }
    if (lowerQ.includes("stress") || lowerQ.includes("anxiety")) {
        return "For stress, Ayurveda recommends Ashwagandha and deep breathing (Pranayama). Try to stick to a daily routine (Dinacharya) to calm the mind.";
    }
    if (lowerQ.includes("skin") || lowerQ.includes("acne")) {
        return "Skin issues often reflect Pitta imbalance (heat) or blood impurities. Neem and Turmeric are excellent purifiers. Avoid excessive sour or spicy foods.";
    }

    // 6. Final Fallback
    return "I am still learning the vast ocean of Ayurveda. Try searching for specific symptoms (e.g., 'Headache', 'Cold'), ingredients (e.g., 'Turmeric'), or ask about 'Vata', 'Pitta', or 'Kapha'.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add User Message
    const userMsg = { type: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate Thinking Delay
    setTimeout(() => {
      const responseText = generateResponse(userMsg.text);
      setChatHistory(prev => [...prev, { type: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900 transition-colors duration-300">
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
            
            {/* TAB 1: Visual Body Map */}
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

            {/* TAB 3: Ashi AI (FUNCTIONAL) */}
            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-night-800 rounded-3xl overflow-hidden shadow-lg border border-soil-100 dark:border-night-700 max-w-2xl mx-auto flex flex-col h-[600px]"
              >
                {/* Chat Header */}
                <div className="bg-leaf-600 p-4 flex items-center text-white shrink-0">
                  <div className="p-2 bg-white/20 rounded-full mr-3">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold flex items-center">
                      Ashi AI <span className="ml-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">BETA</span>
                    </h3>
                    <p className="text-xs text-leaf-100">Ayurvedic Intelligence Model v1.0</p>
                  </div>
                </div>
                
                {/* Chat Window */}
                <div className="flex-1 bg-soil-50 dark:bg-night-900 p-4 overflow-y-auto space-y-4">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-leaf-600 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-night-800 text-soil-800 dark:text-soil-200 rounded-tl-none border border-soil-100 dark:border-night-700'
                      }`}>
                        {msg.type === 'bot' && (
                          <div className="flex items-center text-xs font-bold text-leaf-500 mb-1">
                            <Sparkles className="w-3 h-3 mr-1" /> Ashi
                          </div>
                        )}
                        <span className="whitespace-pre-wrap">{msg.text}</span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-night-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 items-center">
                        <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-soil-200 dark:border-night-700 bg-white dark:bg-night-800 shrink-0">
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about a symptom or herb..." 
                      className="flex-grow px-4 py-3 rounded-xl bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-700 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100 placeholder-soil-400" 
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim() || isTyping}
                      className="p-3 bg-leaf-600 hover:bg-leaf-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-md"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-soil-400 mt-2">
                    Ashi AI provides general wellness information, not medical advice.
                  </p>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}