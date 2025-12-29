import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, X, Search, Sparkles, ChefHat } from 'lucide-react';
import ingredientsData from '../data/ingredients.json';
import remediesData from '../data/remedies.json';

export default function VedaLab() {
  const [selectedIng, setSelectedIng] = useState([]);
  const [match, setMatch] = useState(null);

  // Toggle Ingredient Selection
  const toggleIngredient = (id) => {
    if (selectedIng.includes(id)) {
      setSelectedIng(selectedIng.filter(i => i !== id));
      setMatch(null); // Reset result if changed
    } else {
      if (selectedIng.length < 3) { // Limit to 3 for simplicity
        setSelectedIng([...selectedIng, id]);
        setMatch(null);
      }
    }
  };

  // The Alchemy Logic
  const analyzeMixture = () => {
    // 1. Find a remedy that contains ALL selected ingredients
    const found = remediesData.find(remedy => {
      // Check if every selected ingredient is in the remedy's list
      const hasAllSelected = selectedIng.every(id => remedy.ingredients.includes(id));
      // Check if the remedy doesn't have extra essential ingredients (simplified exact match logic)
      const exactMatch = remedy.ingredients.length === selectedIng.length && hasAllSelected;
      
      // For this MVP, we just check if the selected ingredients are a SUBSET of a remedy
      // or if they exactly match. Let's look for a strong match.
      return hasAllSelected;
    });

    if (found) {
      setMatch({ type: 'success', data: found });
    } else {
      setMatch({ type: 'unknown', data: null });
    }
  };

  const resetLab = () => {
    setSelectedIng([]);
    setMatch(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="inline-flex p-4 rounded-full bg-leaf-100 dark:bg-night-800 text-leaf-600 dark:text-leaf-400 mb-4"
          >
            <FlaskConical className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-leaf-800 dark:text-leaf-300 mb-4">
            Veda Lab
          </h1>
          <p className="text-soil-600 dark:text-soil-400 max-w-2xl mx-auto">
            Select up to 3 ingredients from the pantry to simulate an Ayurvedic formulation. 
            Discover hidden remedies by mixing the right elements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: The Pantry (Ingredients List) */}
          <div className="lg:col-span-7 bg-white dark:bg-night-800 rounded-3xl p-6 shadow-sm border border-soil-100 dark:border-night-700">
            <h3 className="text-xl font-bold text-soil-800 dark:text-soil-100 mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              The Pantry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ingredientsData.map((ing) => {
                const isSelected = selectedIng.includes(ing.id);
                return (
                  <motion.button
                    key={ing.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIngredient(ing.id)}
                    className={`relative p-4 rounded-xl text-left transition-all border-2 ${
                      isSelected 
                        ? 'border-leaf-500 bg-leaf-50 dark:bg-night-700 ring-2 ring-leaf-200 dark:ring-leaf-900' 
                        : 'border-transparent bg-soil-50 dark:bg-night-900 hover:border-leaf-200 dark:hover:border-night-600'
                    }`}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white dark:bg-night-950">
                      <img src={ing.image} alt={ing.name} className="w-full h-full object-cover opacity-90" />
                    </div>
                    <div className="font-semibold text-soil-900 dark:text-soil-100">{ing.name}</div>
                    <div className="text-xs text-soil-500 dark:text-soil-400">{ing.hindiName}</div>
                    
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-leaf-500 text-white p-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: The Mortar (Mixing Area) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Bowl */}
            <div className="bg-soil-100 dark:bg-night-800 rounded-3xl p-8 border-2 border-dashed border-soil-300 dark:border-night-600 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
              
              {selectedIng.length === 0 ? (
                <div className="text-center text-soil-400 dark:text-night-500">
                  <FlaskConical className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Add ingredients to begin...</p>
                </div>
              ) : (
                <div className="w-full space-y-3 z-10">
                  <AnimatePresence>
                    {selectedIng.map((id) => {
                      const ing = ingredientsData.find(i => i.id === id);
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-white dark:bg-night-900 p-3 rounded-xl shadow-sm flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <img src={ing.image} alt={ing.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="font-medium text-soil-800 dark:text-soil-100">{ing.name}</span>
                          </div>
                          <button onClick={() => toggleIngredient(id)} className="text-soil-400 hover:text-red-500">
                            <X className="w-5 h-5" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {/* Action Buttons */}
              {selectedIng.length > 0 && (
                <div className="mt-8 flex space-x-4 z-10">
                  <button 
                    onClick={resetLab}
                    className="px-4 py-2 text-soil-600 dark:text-soil-400 hover:bg-white/50 dark:hover:bg-night-900 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={analyzeMixture}
                    className="px-6 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-lg shadow-lg font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Mix</span>
                  </button>
                </div>
              )}
            </div>

            {/* Result Card */}
            <AnimatePresence mode="wait">
              {match && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`rounded-3xl p-6 shadow-xl border-2 ${
                    match.type === 'success' 
                      ? 'bg-leaf-50 dark:bg-night-800 border-leaf-200 dark:border-leaf-900' 
                      : 'bg-soil-50 dark:bg-night-800 border-soil-200 dark:border-night-700'
                  }`}
                >
                  {match.type === 'success' ? (
                    <div className="text-center">
                      <div className="inline-block p-3 bg-leaf-100 dark:bg-night-700 rounded-full text-leaf-600 dark:text-leaf-400 mb-4">
                        <ChefHat className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2">
                        Discovery Unlocked!
                      </h3>
                      <p className="text-leaf-700 dark:text-leaf-400 font-medium text-lg mb-4">
                        {match.data.title}
                      </p>
                      <p className="text-soil-600 dark:text-soil-300 text-sm mb-6">
                        {match.data.description}
                      </p>
                      <a 
                        href="/remedies" 
                        className="inline-block w-full py-3 bg-soil-900 dark:bg-soil-100 text-white dark:text-night-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        View Full Recipe
                      </a>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <h3 className="text-lg font-bold text-soil-800 dark:text-soil-200 mb-2">
                        No Known Remedy
                      </h3>
                      <p className="text-soil-600 dark:text-soil-400 text-sm">
                        This combination doesn't match our ancient texts. Try adding <b>Honey</b> or <b>Ginger</b>?
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}