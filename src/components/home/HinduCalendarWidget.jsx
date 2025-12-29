import { useState, useEffect } from 'react';
import { Moon, Sun, Cloud, Calendar, BookOpen, Wind, Droplets, Sunrise, Sunset } from 'lucide-react';

export default function HinduCalendarWidget() {
  const [dateInfo, setDateInfo] = useState({
    date: '',
    tithi: '',
    paksha: '',
    nakshatra: '',
    yoga: '',
    moonPhase: 0,
    shloka: { text: '', meaning: '' },
    sunrise: '06:30 AM',
    sunset: '05:45 PM'
  });

  // Database of Wisdom
  const shlokas = [
    { text: "Shariram Adyam Khalu Dharma Sadhanam", meaning: "The body is the primary instrument for the fulfillment of dharma." },
    { text: "Arogyam Paramam Bhagyam", meaning: "Good health is the greatest blessing." },
    { text: "Ahara Shuddhau Sattva Shuddhih", meaning: "Purity of food leads to purity of mind." },
    { text: "Sarve Bhavantu Sukhinah", meaning: "May all beings be happy and free from illness." }
  ];

  useEffect(() => {
    const today = new Date();
    
    // 1. Basic Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('en-IN', options);

    // 2. Simulate Moon Phase & Tithi
    const knownNewMoon = new Date('2024-01-11').getTime();
    const cycle = 29.53 * 24 * 60 * 60 * 1000;
    const diff = today.getTime() - knownNewMoon;
    const phase = (diff % cycle) / cycle;

    let paksha = phase < 0.5 ? "Shukla (Waxing)" : "Krishna (Waning)";
    let dayInCycle = Math.floor(phase * 29.53);
    if (dayInCycle > 15) dayInCycle -= 15;
    if (dayInCycle === 0) dayInCycle = 1;
    
    const tithis = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"];
    const tithiName = tithis[dayInCycle - 1] || "Purnima";

    // Mock calculations for Nakshatra/Yoga based on day of year
    const nakshatras = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya"];
    const yogas = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Sobhana"];
    
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    setDateInfo({
      date: dateStr,
      tithi: tithiName,
      paksha: paksha,
      nakshatra: nakshatras[dayOfYear % nakshatras.length],
      yoga: yogas[dayOfYear % yogas.length],
      moonPhase: phase,
      shloka: shlokas[Math.floor(Math.random() * shlokas.length)],
      sunrise: "06:35 AM",
      sunset: "05:50 PM"
    });
  }, []);

  return (
    <div className="bg-orange-50/80 dark:bg-night-800/80 backdrop-blur-md rounded-3xl border border-orange-200 dark:border-night-600 shadow-xl overflow-hidden flex flex-col h-full">
      
      {/* Header with Date */}
      <div className="bg-orange-100/50 dark:bg-night-900/50 p-4 border-b border-orange-200 dark:border-night-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span className="font-bold text-soil-800 dark:text-soil-200">{dateInfo.date}</span>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-soil-500 dark:text-soil-400 bg-white/50 dark:bg-black/20 px-2 py-1 rounded">
          Jaipur, IN
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        
        {/* LEFT: Vedic Calendar Data */}
        <div className="space-y-6">
          
          {/* Tithi & Moon */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-700">
              <Moon className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-soil-500 dark:text-soil-400 uppercase tracking-wide">Tithi & Paksha</h4>
              <p className="text-lg font-serif font-bold text-soil-900 dark:text-soil-100 leading-tight">
                {dateInfo.tithi}
              </p>
              <p className="text-sm text-soil-600 dark:text-soil-300">{dateInfo.paksha}</p>
            </div>
          </div>

          {/* Nakshatra & Yoga Grid */}
          <div className="grid grid-cols-2 gap-4 bg-white/60 dark:bg-night-900/40 p-4 rounded-xl border border-soil-200/50 dark:border-night-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-soil-400">Nakshatra</span>
              <p className="font-semibold text-soil-800 dark:text-soil-200">{dateInfo.nakshatra}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-soil-400">Yoga</span>
              <p className="font-semibold text-soil-800 dark:text-soil-200">{dateInfo.yoga}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Sunrise className="w-3 h-3 text-orange-500" />
              <span className="text-xs font-medium text-soil-600 dark:text-soil-300">{dateInfo.sunrise}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sunset className="w-3 h-3 text-indigo-500" />
              <span className="text-xs font-medium text-soil-600 dark:text-soil-300">{dateInfo.sunset}</span>
            </div>
          </div>

        </div>

        {/* RIGHT: Weather & Wisdom */}
        <div className="flex flex-col space-y-6">
          
          {/* Weather Widget */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center space-x-3">
              <Cloud className="w-10 h-10 text-blue-500 drop-shadow-sm" />
              <div>
                <div className="text-2xl font-bold text-soil-900 dark:text-soil-100">28°C</div>
                <div className="text-xs font-medium text-soil-500 dark:text-soil-400">Sunny & Clear</div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end text-xs text-soil-500 dark:text-soil-400">
                <Wind className="w-3 h-3 mr-1" /> 12 km/h
              </div>
              <div className="flex items-center justify-end text-xs text-soil-500 dark:text-soil-400">
                <Droplets className="w-3 h-3 mr-1" /> 45%
              </div>
            </div>
          </div>

          {/* Daily Shloka */}
          <div className="flex-grow flex flex-col justify-center text-center p-4 bg-orange-50/50 dark:bg-night-900/30 rounded-2xl border border-orange-100/50 dark:border-night-700/50 relative">
            <BookOpen className="w-6 h-6 text-orange-400 absolute top-3 left-3 opacity-50" />
            <p className="font-serif italic text-lg text-soil-800 dark:text-soil-100 mb-2 leading-relaxed">
              "{dateInfo.shloka.text}"
            </p>
            <p className="text-xs text-soil-500 dark:text-soil-400">
              — {dateInfo.shloka.meaning}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}