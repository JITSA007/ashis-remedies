import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Snowflake, Flower, Wind, ThermometerSnowflake, Leaf, ArrowRight } from 'lucide-react';
import seasonsData from '../../data/seasons.json';

export default function SeasonalWidget() {
  // Determine current season based on month
  const currentSeason = useMemo(() => {
    const month = new Date().getMonth(); // 0-11
    return seasonsData.find(s => s.months.includes(month)) || seasonsData[0];
  }, []);

  const getIcon = (iconName) => {
    const icons = { Sun, CloudRain, Snowflake, Flower, Wind, ThermometerSnowflake };
    const Icon = icons[iconName] || Sun;
    return <Icon className="w-8 h-8 text-white" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-night-800 border border-soil-100 dark:border-night-700"
    >
      {/* Decorative Header Background */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-r ${currentSeason.themeClass.replace('bg-', '')} opacity-80`} />
      
      <div className="relative p-8 pt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-leaf-600 shadow-lg flex items-center justify-center shrink-0 rotate-3 transform hover:rotate-6 transition-transform">
            {getIcon(currentSeason.icon)}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-md text-xs font-bold text-soil-800 dark:text-soil-200 uppercase tracking-wider border border-soil-200/20">
                Current Ritu (Season)
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-soil-900 dark:text-soil-100">
              {currentSeason.name}
            </h2>
            <p className="text-lg text-soil-600 dark:text-soil-300 italic">
              "{currentSeason.tagline}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Rituals */}
          <div className="space-y-4">
            <h3 className="flex items-center text-sm font-bold text-leaf-600 uppercase tracking-wide">
              <Leaf className="w-4 h-4 mr-2" /> Recommended Rituals
            </h3>
            <ul className="space-y-3">
              {currentSeason.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start text-soil-700 dark:text-soil-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 mt-2 mr-3 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Foods */}
          <div>
            <h3 className="flex items-center text-sm font-bold text-orange-600 uppercase tracking-wide mb-4">
              <Sun className="w-4 h-4 mr-2" /> Seasonal Foods
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentSeason.foods.map((food, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-soil-100 dark:bg-night-900 text-soil-700 dark:text-soil-200 text-sm font-medium border border-soil-200 dark:border-night-700"
                >
                  {food}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-soil-100 dark:border-night-700">
              <a href="/remedies" className="inline-flex items-center text-sm font-bold text-leaf-600 hover:text-leaf-700 hover:underline">
                Find recipes with these ingredients <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}