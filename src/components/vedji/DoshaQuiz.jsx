import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Flame, Mountain, RefreshCcw, Sparkles, Brain, CheckCircle, Circle } from 'lucide-react';
import quizData from '../../data/quiz.json';

export default function DoshaQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [customInputs, setCustomInputs] = useState({}); // Stores "Other" text
  const [status, setStatus] = useState('quiz'); // 'quiz', 'analyzing', 'result'
  const [result, setResult] = useState(null);
  const [otherText, setOtherText] = useState(''); // Temp state for current text input

  const currentQuestion = quizData[step];

  // Handle standard option selection
  const handleAnswer = (type) => {
    // If user typed something in "Other", save it
    if (otherText.trim()) {
      setCustomInputs({ ...customInputs, [currentQuestion.id]: otherText });
      setOtherText(''); // Clear for next Q
    }

    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    nextStep(newScores);
  };

  // Handle "Other" submission (counts as 0 points but saves text for AI)
  const handleOtherSubmit = () => {
    if (!otherText.trim()) return;
    setCustomInputs({ ...customInputs, [currentQuestion.id]: otherText });
    setOtherText('');
    // "Other" doesn't add to score directly in this simple logic, 
    // or we could assign a default weight. For now, we just move on.
    nextStep(scores); 
  };

  const nextStep = (currentScores) => {
    if (step < quizData.length - 1) {
      setStep(step + 1);
    } else {
      setStatus('analyzing');
      // Simulate AI processing delay
      setTimeout(() => {
        calculateResult(currentScores);
      }, 3000);
    }
  };

  const calculateResult = (finalScores) => {
    // Find dominant dosha
    const winner = Object.keys(finalScores).reduce((a, b) => 
      finalScores[a] > finalScores[b] ? a : b
    );
    setResult(winner);
    setStatus('result');
  };

  const resetQuiz = () => {
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setCustomInputs({});
    setStep(0);
    setResult(null);
    setStatus('quiz');
  };

  const doshaInfo = {
    vata: {
      title: "Vata (Air & Ether)",
      desc: "You are creative and energetic but prone to anxiety and dry skin. Your custom inputs suggest a need for grounding routines.",
      aiAdvice: "Based on your input about irregular habits, Ashi AI recommends warm, oily foods and a strict sleep schedule.",
      icon: <Wind className="w-12 h-12 text-blue-400" />
    },
    pitta: {
      title: "Pitta (Fire & Water)",
      desc: "You are sharp and ambitious but prone to inflammation. Your responses indicate high internal heat.",
      aiAdvice: "Ashi AI detected mentions of stress. Focus on cooling foods like cucumber and avoid spicy curries.",
      icon: <Flame className="w-12 h-12 text-red-500" />
    },
    kapha: {
      title: "Kapha (Earth & Water)",
      desc: "You are calm and loyal but prone to lethargy. Your answers suggest a stable but slow metabolism.",
      aiAdvice: "To counter the heaviness mentioned in your sleep patterns, Ashi AI suggests vigorous exercise and pungent spices like ginger.",
      icon: <Mountain className="w-12 h-12 text-green-600" />
    }
  };

  return (
    <div className="bg-white dark:bg-night-800 rounded-3xl p-8 shadow-lg border border-soil-100 dark:border-night-700 max-w-2xl mx-auto min-h-[500px] flex flex-col justify-center">
      
      {/* PHASE 1: THE QUIZ */}
      {status === 'quiz' && (
        <motion.div
          key="question"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="mb-6 flex justify-between items-center text-sm font-bold text-soil-400">
            <span>Question {step + 1}/{quizData.length}</span>
            <span className="uppercase tracking-widest text-xs bg-soil-100 dark:bg-night-700 px-2 py-1 rounded">
              {currentQuestion.category}
            </span>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-8">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {/* Standard Options */}
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.type)}
                className="w-full text-left p-4 rounded-xl border-2 border-soil-200 dark:border-night-600 hover:border-leaf-500 dark:hover:border-leaf-400 hover:bg-leaf-50 dark:hover:bg-night-700 transition-all font-medium text-soil-700 dark:text-soil-200 flex items-center group"
              >
                <span className="mr-4 text-soil-300 group-hover:text-leaf-500 transition-colors">
                  <Circle className="w-5 h-5" />
                </span>
                {option.text}
              </button>
            ))}

            {/* "Other" Option (If Enabled) */}
            {currentQuestion.allowOther && (
              <div className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Other? Write your own answer..."
                    className="w-full pl-4 pr-12 py-4 rounded-xl border-2 border-soil-200 dark:border-night-600 bg-transparent focus:border-leaf-500 outline-none transition-all text-soil-700 dark:text-soil-200"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleOtherSubmit();
                    }}
                  />
                  <button 
                    onClick={handleOtherSubmit}
                    disabled={!otherText.trim()}
                    className="absolute right-2 top-2 bottom-2 px-3 bg-leaf-100 dark:bg-night-700 text-leaf-700 dark:text-leaf-300 rounded-lg text-xs font-bold uppercase tracking-wide disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 2: AI ANALYZING */}
      {status === 'analyzing' && (
        <motion.div
          key="analyzing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-t-leaf-500 border-r-transparent border-b-leaf-200 border-l-transparent rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center text-leaf-600">
              <Brain className="w-10 h-10 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-soil-900 dark:text-soil-100">Consulting Ashi AI...</h3>
            <p className="text-soil-500 dark:text-soil-400 mt-2">
              Analyzing {Object.keys(customInputs).length} custom notes & {quizData.length} data points.
            </p>
          </div>
        </motion.div>
      )}

      {/* PHASE 3: RESULT */}
      {status === 'result' && result && (
        <motion.div
          key="result"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="inline-block p-6 rounded-full bg-soil-50 dark:bg-night-900 mb-6 shadow-sm">
            {doshaInfo[result].icon}
          </div>
          
          <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 bg-leaf-100 dark:bg-night-900 rounded-full text-leaf-700 dark:text-leaf-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>AI Diagnosis Complete</span>
          </div>

          <h3 className="text-4xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2 capitalize">
            {doshaInfo[result].title}
          </h3>
          
          <div className="bg-soil-50 dark:bg-night-900 rounded-2xl p-6 mb-8 text-left">
             <p className="text-lg text-soil-800 dark:text-soil-200 mb-4 leading-relaxed font-medium">
              {doshaInfo[result].desc}
            </p>
            <div className="flex items-start space-x-3 p-4 bg-white dark:bg-night-800 rounded-xl border border-leaf-100 dark:border-night-600">
              <Brain className="w-5 h-5 text-leaf-500 flex-shrink-0 mt-1" />
              <div>
                <span className="block text-xs font-bold text-leaf-500 uppercase mb-1">Ashi AI Insight</span>
                <p className="text-sm text-soil-600 dark:text-soil-400 italic">
                  "{doshaInfo[result].aiAdvice}"
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetQuiz}
            className="inline-flex items-center px-8 py-3 bg-soil-800 dark:bg-soil-100 text-white dark:text-night-900 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Retake Analysis
          </button>
        </motion.div>
      )}
    </div>
  );
}