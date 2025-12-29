import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import remediesData from '../data/remedies.json';
import RemedyCard from '../components/remedies/RemedyCard';

export default function Remedies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique symptoms for the filter list
  const allSymptoms = useMemo(() => {
    const symptoms = new Set(remediesData.flatMap(r => r.symptoms));
    return ['All', ...Array.from(symptoms)];
  }, []);

  // Filter Logic
  const filteredRemedies = useMemo(() => {
    return remediesData.filter(remedy => {
      const matchesSearch = remedy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            remedy.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || remedy.symptoms.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900">
      <Helmet>
        <title>The Apothecary | Ashi's Remedies</title>
        <meta name="description" content="Browse our database of Ayurvedic cures, verified by tradition and science." />
      </Helmet>

      {/* Search Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-leaf-800 dark:text-leaf-300 mb-6">
          The Ayurvedic Apothecary
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-soil-400" />
          </div>
          <input
            type="text"
            placeholder="Search for 'Cough', 'Ginger', or 'Sleep'..."
            className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-night-800 border-2 border-soil-100 dark:border-night-700 focus:border-leaf-500 focus:ring-4 focus:ring-leaf-100 dark:focus:ring-leaf-900 transition-all text-soil-900 dark:text-soil-100 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {allSymptoms.slice(0, 8).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-leaf-600 text-white shadow-md transform scale-105'
                  : 'bg-white dark:bg-night-800 text-soil-600 dark:text-soil-400 border border-soil-200 dark:border-night-700 hover:bg-leaf-50 dark:hover:bg-night-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredRemedies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRemedies.map((remedy) => (
              <motion.div
                key={remedy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <RemedyCard remedy={remedy} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-soil-500">No remedies found for that search. Try "Tea" or "Cold".</p>
          </div>
        )}
      </div>

    </div>
  );
}