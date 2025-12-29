import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ToggleLeft, ToggleRight, Scan } from 'lucide-react';
import medicalZonesData from '../../data/body_zones.json'; // Importing the data

export default function BodyMap({ onSelect, activePart }) {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [gender, setGender] = useState('female');

  // --- 1. LOGIC: Medical Data (The "Brain") ---
  // Now loaded from JSON to allow Admin Panel edits
  const medicalZones = medicalZonesData;

  // --- 2. VISUALS: The Body Parts (The "Shape") ---
  // We separate Left/Right parts visually, but map them to the same Logical Zone.
  const getBodyShapes = (g) => [
    {
      id: 'head',
      label: 'Head',
      zoneId: 'head',
      // Head Shape
      d: "M130,30 Q150,15 170,30 Q175,50 170,70 Q160,85 150,85 Q140,85 130,70 Q125,50 130,30 Z"
    },
    {
      id: 'neck',
      label: 'Neck',
      zoneId: 'head',
      // Neck Connector
      d: "M140,75 Q150,85 160,75 L160,95 Q150,105 140,95 Z"
    },
    {
      id: 'l_shoulder',
      label: 'L. Shoulder',
      zoneId: 'limbs',
      // Left Shoulder
      d: g === 'male' 
        ? "M140,95 L110,100 Q100,110 105,130 L135,115 Z" // Broad
        : "M140,95 L120,100 Q115,110 115,125 L138,115 Z" // Narrow
    },
    {
      id: 'r_shoulder',
      label: 'R. Shoulder',
      zoneId: 'limbs',
      // Right Shoulder
      d: g === 'male'
        ? "M160,95 L190,100 Q200,110 195,130 L165,115 Z"
        : "M160,95 L180,100 Q185,110 185,125 L162,115 Z"
    },
    {
      id: 'chest',
      label: 'Chest',
      zoneId: 'chest',
      // Chest Plate
      d: g === 'male'
        ? "M135,115 L165,115 L165,160 Q150,170 135,160 Z" // Square
        : "M138,115 L162,115 L165,160 Q150,175 135,160 Z" // Curved
    },
    {
      id: 'l_arm',
      label: 'L. Arm',
      zoneId: 'limbs',
      // Left Arm
      d: g === 'male'
        ? "M105,130 L100,200 L115,200 L125,130 Z"
        : "M115,125 L110,190 L122,190 L130,125 Z"
    },
    {
      id: 'r_arm',
      label: 'R. Arm',
      zoneId: 'limbs',
      // Right Arm
      d: g === 'male'
        ? "M195,130 L200,200 L185,200 L175,130 Z"
        : "M185,125 L190,190 L178,190 L170,125 Z"
    },
    {
      id: 'l_hand',
      label: 'L. Hand',
      zoneId: 'limbs',
      // Left Hand
      d: g === 'male'
        ? "M100,200 L95,230 L110,230 L115,200 Z"
        : "M110,190 L108,215 L118,215 L122,190 Z"
    },
    {
      id: 'r_hand',
      label: 'R. Hand',
      zoneId: 'limbs',
      // Right Hand
      d: g === 'male'
        ? "M200,200 L205,230 L190,230 L185,200 Z"
        : "M190,190 L192,215 L182,215 L178,190 Z"
    },
    {
      id: 'stomach',
      label: 'Stomach',
      zoneId: 'stomach',
      // Torso
      d: g === 'male'
        ? "M135,160 L165,160 L165,220 L135,220 Z" // Straight
        : "M135,160 L165,160 L170,220 L130,220 Z" // Hourglass taper
    },
    {
      id: 'pelvis',
      label: 'Pelvis',
      zoneId: 'pelvis',
      // Hips
      d: g === 'male'
        ? "M135,220 L165,220 L165,250 L135,250 Z" // Narrow
        : "M130,220 L170,220 L175,260 L125,260 Z" // Wide
    },
    {
      id: 'l_leg',
      label: 'L. Leg',
      zoneId: 'limbs',
      // Left Leg
      d: g === 'male'
        ? "M135,250 L125,380 L145,380 L150,250 Z"
        : "M125,260 L120,380 L140,380 L145,260 Z"
    },
    {
      id: 'r_leg',
      label: 'R. Leg',
      zoneId: 'limbs',
      // Right Leg
      d: g === 'male'
        ? "M165,250 L175,380 L155,380 L150,250 Z"
        : "M175,260 L180,380 L160,380 L155,260 Z"
    },
    {
      id: 'l_foot',
      label: 'L. Foot',
      zoneId: 'limbs',
      // Left Foot
      d: g === 'male'
        ? "M125,380 L115,400 L145,400 L145,380 Z"
        : "M120,380 L115,395 L140,395 L140,380 Z"
    },
    {
      id: 'r_foot',
      label: 'R. Foot',
      zoneId: 'limbs',
      // Right Foot
      d: g === 'male'
        ? "M175,380 L185,400 L155,400 L155,380 Z"
        : "M180,380 L185,395 L160,395 L160,380 Z"
    }
  ];

  const bodyShapes = getBodyShapes(gender);

  const handleSelect = (visualPart) => {
    // 1. Find the logical medical zone (e.g., clicking 'L. Hand' gets 'limbs' data)
    const zoneData = medicalZones[visualPart.zoneId];
    if (!zoneData) return;

    // 2. Filter symptoms by gender
    const filteredSymptoms = zoneData.symptoms
      .filter(s => s.type === 'common' || s.type === gender)
      .map(s => s.name);

    // 3. Send combined data back
    onSelect({
      id: zoneData.name, // Use name as ID for UI consistency
      name: zoneData.name,
      description: zoneData.description,
      symptoms: filteredSymptoms,
      clickedPart: visualPart.label // Track exactly what was clicked
    });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[1/2] flex items-center justify-center select-none bg-black rounded-xl border border-soil-800 overflow-hidden shadow-2xl">
      
      {/* Background: Digital Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* Background: Scanning Line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.8)] z-10 opacity-50"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Top Bar: HUD Interface */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start">
         <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-sky-900/50">
           <Scan className={`w-4 h-4 ${activePart ? 'text-sky-400 animate-spin-slow' : 'text-slate-500'}`} />
           <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
             {activePart ? activePart.clickedPart?.toUpperCase() || 'SCANNING' : 'SYSTEM READY'}
           </span>
         </div>

         <button 
           onClick={() => setGender(prev => prev === 'female' ? 'male' : 'female')}
           className="flex items-center space-x-2 px-3 py-1 bg-black/60 border border-sky-900/50 rounded-sm hover:bg-sky-900/20 transition-colors group"
         >
           <User className="w-3 h-3 text-slate-400 group-hover:text-sky-400" />
           <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-sky-400">
             {gender}
           </span>
           {gender === 'female' ? <ToggleLeft className="w-4 h-4 text-sky-500" /> : <ToggleRight className="w-4 h-4 text-sky-500" />}
         </button>
      </div>

      <svg viewBox="0 0 300 500" className="w-full h-full z-10 p-4 pt-12 relative">
        <defs>
          <filter id="hologramGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M0,4 l4,0" stroke="#000" strokeWidth="1" opacity="0.5" />
          </pattern>
        </defs>

        {/* Central Axis */}
        <line x1="150" y1="20" x2="150" y2="480" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

        {/* Render Granular Body Parts */}
        {bodyShapes.map((part) => {
          // Check if this visual part matches the Active Zone
          // (e.g., if 'Chest' zone is active, the 'Chest' shape lights up)
          // We can also allow clicking specific limbs to light up just that limb.
          // For now, let's light up the specific clicked part, OR all parts in the zone if selected via menu.
          
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
                  opacity: 0.9,
                  fill: isZoneActive ? 'rgba(14, 165, 233, 0.4)' : (isHovered ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.05)'),
                  stroke: isZoneActive ? '#0ea5e9' : (isHovered ? '#38bdf8' : '#1e293b'),
                  strokeWidth: isZoneActive ? 2 : 1,
                  filter: isZoneActive ? 'url(#hologramGlow)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Target Reticle on Active Part */}
              {isZoneActive && (
                 <motion.circle 
                   cx="0" cy="0" r="2" 
                   className="fill-sky-400"
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   // Simple way to center reticle: use bounding box center is hard in SVG react without ref
                   // So we just don't render it per-part to avoid clutter, 
                   // or we rely on the fill highlighting.
                 />
              )}
            </g>
          );
        })}

        {/* Dynamic Label */}
        <text x="150" y="470" textAnchor="middle" className="text-[10px] fill-sky-500 font-mono tracking-widest uppercase opacity-70">
           {hoveredPart || (activePart ? activePart.name : "Select Zone")}
        </text>

      </svg>
      
      {/* Decorative Corner Brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-sky-800 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-sky-800 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-sky-800 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-sky-800 rounded-br-sm pointer-events-none" />

    </div>
  );
}