import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ToggleLeft, ToggleRight, Scan, Target } from 'lucide-react';

export default function BodyMap({ onSelect, activePart }) {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [gender, setGender] = useState('female');

  // --- 1. LOGIC: Medical Data ---
  const medicalZones = {
    head: {
      name: 'Cranial Zone',
      description: 'Neurological center. Governs Prana (vital life force) and sensory input.',
      symptoms: [
        { name: 'Headache', type: 'common' },
        { name: 'Migraine', type: 'common' },
        { name: 'Insomnia', type: 'common' },
        { name: 'Stress', type: 'common' },
        { name: 'Hormonal Hair Fall', type: 'female' },
        { name: 'Male Pattern Baldness', type: 'male' }
      ]
    },
    chest: {
      name: 'Thoracic Zone',
      description: 'Cardiorespiratory system. Heart, lungs, and bronchial capability.',
      symptoms: [
        { name: 'Asthma', type: 'common' },
        { name: 'Congestion', type: 'common' },
        { name: 'Palpitations', type: 'common' },
        { name: 'Anxiety', type: 'common' },
        { name: 'Breast Tenderness', type: 'female' }
      ]
    },
    stomach: {
      name: 'Abdominal Zone',
      description: 'Digestive system (Agni). Metabolic processing center.',
      symptoms: [
        { name: 'Indigestion', type: 'common' },
        { name: 'Acidity', type: 'common' },
        { name: 'Bloating', type: 'common' },
        { name: 'Liver Issues', type: 'common' },
        { name: 'Diabetes', type: 'common' }
      ]
    },
    pelvis: {
      name: 'Pelvic Zone',
      description: 'Reproductive organs and elimination systems.',
      symptoms: [
        { name: 'Back Pain', type: 'common' },
        { name: 'Constipation', type: 'common' },
        { name: 'UTI', type: 'common' },
        { name: 'Menstrual Cramps', type: 'female' },
        { name: 'PCOS / PCOD', type: 'female' },
        { name: 'Fertility Issues', type: 'female' },
        { name: 'Prostate Health', type: 'male' }
      ]
    },
    limbs: {
      name: 'Musculoskeletal',
      description: 'Joints, muscles, and circulation pathways.',
      symptoms: [
        { name: 'Arthritis', type: 'common' },
        { name: 'Joint Pain', type: 'common' },
        { name: 'Sciatica', type: 'common' },
        { name: 'Muscle Cramps', type: 'common' },
        { name: 'Varicose Veins', type: 'common' }
      ]
    }
  };

  // --- 2. VISUALS: The Body Parts ---
  const getBodyShapes = (g) => [
    { id: 'head', label: 'Head', zoneId: 'head', d: "M130,30 Q150,15 170,30 Q175,50 170,70 Q160,85 150,85 Q140,85 130,70 Q125,50 130,30 Z" },
    { id: 'neck', label: 'Neck', zoneId: 'head', d: "M140,75 Q150,85 160,75 L160,95 Q150,105 140,95 Z" },
    { id: 'l_shoulder', label: 'L. Shoulder', zoneId: 'limbs', d: g === 'male' ? "M140,95 L110,100 Q100,110 105,130 L135,115 Z" : "M140,95 L120,100 Q115,110 115,125 L138,115 Z" },
    { id: 'r_shoulder', label: 'R. Shoulder', zoneId: 'limbs', d: g === 'male' ? "M160,95 L190,100 Q200,110 195,130 L165,115 Z" : "M160,95 L180,100 Q185,110 185,125 L162,115 Z" },
    { id: 'chest', label: 'Chest', zoneId: 'chest', d: g === 'male' ? "M135,115 L165,115 L165,160 Q150,170 135,160 Z" : "M138,115 L162,115 L165,160 Q150,175 135,160 Z" },
    { id: 'l_arm', label: 'L. Arm', zoneId: 'limbs', d: g === 'male' ? "M105,130 L100,200 L115,200 L125,130 Z" : "M115,125 L110,190 L122,190 L130,125 Z" },
    { id: 'r_arm', label: 'R. Arm', zoneId: 'limbs', d: g === 'male' ? "M195,130 L200,200 L185,200 L175,130 Z" : "M185,125 L190,190 L178,190 L170,125 Z" },
    { id: 'l_hand', label: 'L. Hand', zoneId: 'limbs', d: g === 'male' ? "M100,200 L95,230 L110,230 L115,200 Z" : "M110,190 L108,215 L118,215 L122,190 Z" },
    { id: 'r_hand', label: 'R. Hand', zoneId: 'limbs', d: g === 'male' ? "M200,200 L205,230 L190,230 L185,200 Z" : "M190,190 L192,215 L182,215 L178,190 Z" },
    { id: 'stomach', label: 'Stomach', zoneId: 'stomach', d: g === 'male' ? "M135,160 L165,160 L165,220 L135,220 Z" : "M135,160 L165,160 L170,220 L130,220 Z" },
    { id: 'pelvis', label: 'Pelvis', zoneId: 'pelvis', d: g === 'male' ? "M135,220 L165,220 L165,250 L135,250 Z" : "M130,220 L170,220 L175,260 L125,260 Z" },
    { id: 'l_leg', label: 'L. Leg', zoneId: 'limbs', d: g === 'male' ? "M135,250 L125,380 L145,380 L150,250 Z" : "M125,260 L120,380 L140,380 L145,260 Z" },
    { id: 'r_leg', label: 'R. Leg', zoneId: 'limbs', d: g === 'male' ? "M165,250 L175,380 L155,380 L150,250 Z" : "M175,260 L180,380 L160,380 L155,260 Z" },
    { id: 'l_foot', label: 'L. Foot', zoneId: 'limbs', d: g === 'male' ? "M125,380 L115,400 L145,400 L145,380 Z" : "M120,380 L115,395 L140,395 L140,380 Z" },
    { id: 'r_foot', label: 'R. Foot', zoneId: 'limbs', d: g === 'male' ? "M175,380 L185,400 L155,400 L155,380 Z" : "M180,380 L185,395 L160,395 L160,380 Z" }
  ];

  const bodyShapes = getBodyShapes(gender);

  const handleSelect = (visualPart) => {
    const zoneData = medicalZones[visualPart.zoneId];
    if (!zoneData) return;
    const filteredSymptoms = zoneData.symptoms.filter(s => s.type === 'common' || s.type === gender).map(s => s.name);
    onSelect({
      id: zoneData.name,
      name: zoneData.name,
      description: zoneData.description,
      symptoms: filteredSymptoms,
      clickedPart: visualPart.label
    });
  };

  // Re-run selection if gender changes while a part is already active
  useEffect(() => {
    if (activePart && activePart.clickedPart) {
      const currentShape = bodyShapes.find(s => s.label === activePart.clickedPart);
      if (currentShape) {
        handleSelect(currentShape);
      }
    }
  }, [gender]);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[1/2] flex items-center justify-center select-none bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      
      {/* Background: Digital Grid (Lighter & Subtle) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* Background: Scanning Line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.8)] z-10 opacity-60"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Top Bar: HUD Interface */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start">
         <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-md border border-sky-500/30 shadow-lg">
           <Scan className={`w-4 h-4 ${activePart ? 'text-sky-400 animate-spin-slow' : 'text-slate-400'}`} />
           <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
             {activePart ? activePart.clickedPart?.toUpperCase() || 'SCANNING' : 'SYSTEM READY'}
           </span>
         </div>

         <button 
           onClick={() => setGender(prev => prev === 'female' ? 'male' : 'female')}
           className="flex items-center space-x-2 px-3 py-1 bg-slate-800/80 border border-sky-500/30 rounded-md hover:bg-sky-900/40 transition-colors group shadow-lg"
         >
           <User className="w-3 h-3 text-slate-300 group-hover:text-sky-400" />
           <span className="text-[10px] font-bold uppercase text-slate-300 group-hover:text-sky-400">
             {gender}
           </span>
           {gender === 'female' ? <ToggleLeft className="w-4 h-4 text-sky-400" /> : <ToggleRight className="w-4 h-4 text-sky-400" />}
         </button>
      </div>

      <svg viewBox="0 0 300 500" className="w-full h-full z-10 p-4 pt-12 relative">
        <defs>
          <filter id="hologramGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Axis */}
        <line x1="150" y1="20" x2="150" y2="480" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

        {/* Render Body Parts */}
        {bodyShapes.map((part) => {
          const isZoneActive = activePart?.name === medicalZones[part.zoneId]?.name;
          const isHovered = hoveredPart === part.label;
          
          return (
            <g key={part.id} 
               onClick={() => handleSelect(part)} 
               onMouseEnter={() => setHoveredPart(part.label)}
               onMouseLeave={() => setHoveredPart(null)}
               className="cursor-pointer">
              
              <motion.path
                d={part.d}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1, // Increased Base Opacity
                  fill: isZoneActive ? 'rgba(56, 189, 248, 0.6)' : (isHovered ? 'rgba(56, 189, 248, 0.3)' : 'rgba(56, 189, 248, 0.1)'), // Brighter fills
                  stroke: isZoneActive ? '#38bdf8' : (isHovered ? '#7dd3fc' : '#0ea5e9'), // Brighter strokes
                  strokeWidth: isZoneActive ? 3 : 2, // Thicker lines
                  filter: isZoneActive ? 'url(#hologramGlow)' : 'none'
                }}
                transition={{ duration: 0.2 }}
              />
            </g>
          );
        })}

        {/* Dynamic Label */}
        <text x="150" y="470" textAnchor="middle" className="text-[12px] fill-sky-300 font-mono tracking-widest uppercase font-bold opacity-90 shadow-md">
           {hoveredPart || (activePart ? activePart.name : "Select Zone")}
        </text>

      </svg>
      
      {/* Decorative Corner Brackets (Brighter) */}
      <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-sky-600 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-sky-600 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-sky-600 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-sky-600 rounded-br-sm pointer-events-none" />

    </div>
  );
}