import { useState, useEffect } from 'react';
import { Moon, Sun, Cloud, Calendar, BookOpen, Wind, Droplets, Sunrise, Sunset, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const shlokas = [
    { text: "Shariram Adyam Khalu Dharma Sadhanam", meaning: "The body is the primary instrument for health and dharma." },
    { text: "Arogyam Paramam Bhagyam", meaning: "Health is the supreme wealth." },
    { text: "Ahara Shuddhau Sattva Shuddhih", meaning: "Pure food creates a pure mind." },
    { text: "Sarve Bhavantu Sukhinah", meaning: "May all be happy and free from illness." }
  ];

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('en-IN', options);

    const knownNewMoon = new Date('2024-01-11').getTime();
    const cycle = 29.53 * 24 * 60 * 60 * 1000;
    const diff = today.getTime() - knownNewMoon;
    const phase = (diff % cycle) / cycle;

    let paksha = phase < 0.5 ? "Shukla Paksha" : "Krishna Paksha";
    let dayInCycle = Math.floor(phase * 29.53);
    if (dayInCycle > 15) dayInCycle -= 15;
    if (dayInCycle === 0) dayInCycle = 1;
    
    const tithis = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"];
    
    const nakshatras = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya"];
    const yogas = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Sobhana"];
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    setDateInfo({
      date: dateStr,
      tithi: tithis[dayInCycle - 1] || "Purnima",
      paksha: paksha,
      nakshatra: nakshatras[dayOfYear % nakshatras.length],
      yoga: yogas[dayOfYear % yogas.length],
      moonPhase: phase,
      shloka: shlokas[Math.floor(Math.random() * shlokas.length)],
      sunrise: "06:42 AM",
      sunset: "05:54 PM"
    });
  }, []);

  // Helper to draw a dynamic Moon Phase SVG
  const renderMoonVisual = () => {
    const isWaxing = dateInfo.moonPhase < 0.5;
    return (
      <div className="relative w-16 h-16 flex items-center justify-center bg-indigo-950 rounded-full shadow-inner border border-white/10">
        <div className={`absolute w-10 h-10 rounded-full bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.4)]`}></div>
        {/* Shadow Overlay to create phase */}
        <div 
          className="absolute w-10 h-10 rounded-full bg-indigo-950 transition-all duration-1000"
          style={{
            left: isWaxing ? 'auto' : '0',
            right: isWaxing ? '0' : 'auto',
            transform: `scaleX(${1 - (dateInfo.moonPhase * 2)})`,
            opacity: dateInfo.moonPhase === 0.5 ? 0 : 1
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-orange-50/50 dark:bg-night-800/80 backdrop-blur-md rounded-3xl border border-orange-200 dark:border-night-600 shadow-xl overflow-hidden flex flex-col h-full transition-all">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100/50 to-transparent dark:from-night-900/50 p-5 border-b border-orange-200 dark:border-night-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white dark:bg-night-800 rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 tracking-widest">Dainik Panchang</p>
            <span className="font-serif font-bold text-soil-900 dark:text-soil-100">{dateInfo.date}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow space-y-8">
        
        {/* LUNAR DATA (Beautifully Aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-6">
            {renderMoonVisual()}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-soil-400 uppercase tracking-widest flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-orange-400" /> Phase
              </h4>
              <p className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 leading-none">
                {dateInfo.tithi}
              </p>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase">
                {dateInfo.paksha}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-l border-soil-200/50 dark:border-night-700 pl-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-soil-400 block mb-1">Nakshatra</span>
              <p className="font-bold text-soil-800 dark:text-soil-200">{dateInfo.nakshatra}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-soil-400 block mb-1">Yoga</span>
              <p className="font-bold text-soil-800 dark:text-soil-200">{dateInfo.yoga}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Sunrise className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-soil-700 dark:text-soil-300">{dateInfo.sunrise}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sunset className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-bold text-soil-700 dark:text-soil-300">{dateInfo.sunset}</span>
            </div>
          </div>
        </div>

        {/* WEATHER MODULE */}
        <div className="bg-white/40 dark:bg-night-900/40 p-5 rounded-2xl border border-soil-200/50 dark:border-night-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Cloud className="w-12 h-12 text-blue-500 animate-pulse" />
            <div>
              <div className="text-3xl font-bold text-soil-900 dark:text-soil-100">28°C</div>
              <p className="text-xs font-bold text-soil-500 uppercase tracking-widest">Jaipur • Clear Skies</p>
            </div>
          </div>
          <div className="flex space-x-6 text-sm font-medium text-soil-600 dark:text-soil-300">
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-2 text-soil-400" /> 12 km/h
            </div>
            <div className="flex items-center">
              <Droplets className="w-4 h-4 mr-2 text-soil-400" /> 45%
            </div>
          </div>
        </div>

        {/* WISDOM (Centered & Elegant) */}
        <div className="pt-6 border-t border-orange-100 dark:border-night-700 text-center relative">
          <BookOpen className="w-8 h-8 text-orange-100 dark:text-night-700 absolute top-2 left-1/2 -translate-x-1/2 -z-10" />
          <p className="font-serif italic text-xl text-soil-800 dark:text-soil-100 mb-2 leading-relaxed">
            "{dateInfo.shloka.text}"
          </p>
          <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest opacity-80">
            {dateInfo.shloka.meaning}
          </p>
        </div>

      </div>
    </div>
  );
}