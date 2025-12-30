import { motion } from 'framer-motion';
import { Cpu, Sprout, Award, BookOpen, MapPin, Quote, Lightbulb, Target, Sparkles, ShieldCheck, Zap, Globe, Users, Microscope, Database, FlaskConical } from 'lucide-react';

// Embedded data to ensure the file is self-contained and runnable
const founderData = {
  profile: {
    name: "Jitendra Prajapat",
    headline: "PhD Scholar | AI Researcher | Social Innovator | Organic Farmer",
    location: "Jaipur, Rajasthan, India",
    bio: "A visionary researcher bridging the gap between high-frequency silicon and the ancient intelligence of the soil."
  },
  halves: {
    tech: {
      title: "The Silicon Path",
      description: "Dedicated to the rigorous pursuit of computational excellence and data-driven discovery.",
      points: [
        "PhD Researcher focusing on AI-driven medical diagnostics.",
        "Certified Ethical Hacker (CEH) with expertise in Cybersecurity.",
        "Developer of predictive models for global health crises.",
        "Advocate for ethical AI and data privacy in rural ecosystems."
      ]
    },
    soil: {
      title: "The Native Soil",
      description: "Rooted in the ancestral wisdom of Rajasthani farming and traditional Ayurvedic ecology.",
      points: [
        "Organic Farmer practicing regenerative agriculture in Jaipur.",
        "Conservator of rare medicinal herbs and native seed varieties.",
        "Translator of ancient Sanskrit texts into modern wellness logic.",
        "Social Innovator bringing sustainable water solutions to local farms."
      ]
    }
  },
  timeline: [
    {
      year: "2024",
      role: "Founder & Lead Researcher",
      company: "Ashi's Remedies",
      desc: "Launched the world's first AI-Ayurveda bridge, merging real-time cosmic data with traditional pharmacy."
    },
    {
      year: "2022",
      role: "PhD Researcher (AI/ML)",
      company: "Advanced Healthcare Analytics",
      desc: "Pioneered research in using machine learning to diagnose complex pulmonary issues in underprivileged areas."
    },
    {
      year: "2019",
      role: "Cybersecurity Consultant",
      company: "SecureSystems Lab",
      desc: "Developed ethical hacking frameworks for protecting medical data across fragmented digital infrastructures."
    },
    {
      year: "2015",
      role: "Regenerative Agriculture Lead",
      company: "Prajapat Ancestral Farms",
      desc: "Began the transition of family farms to 100% organic and sustainable practices."
    }
  ]
};

export default function Founder() {
  const { profile, halves, timeline } = founderData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mb-24"
      >
        <div className="relative w-48 h-48 mx-auto mb-10 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative w-full h-full bg-white dark:bg-slate-900 rounded-full shadow-2xl flex items-center justify-center text-6xl overflow-hidden border-4 border-white dark:border-slate-800">
            <img 
              src="https://media.licdn.com/dms/image/v2/D5603AQHuj35hjCbmAQ/profile-displayphoto-scale_400_400/B56ZolRX86JQAkbYm90?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=S5j7-D_J5X8AX8V8M5Y&_nc_ht=media.licdn.com&oh=00_AfC-U6O6V6H7H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6" 
              alt={profile.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { 
                e.target.style.display = 'none'; // Hide broken image if link fails
                // The fallback emoji/icon would be handled by a sibling element if we added one, 
                // but hiding the broken image is the priority fix.
              }}
            />
            {/* Fallback Icon (Hidden by default, you could toggle visibility with state if needed, but basic onerror hide works for build fix) */}
            <span className="absolute z-[-1] font-serif opacity-50">JP</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-700">
            <Award className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
          {profile.name}
        </h1>
        <p className="text-2xl md:text-3xl text-emerald-700 dark:text-emerald-400 italic font-medium max-w-3xl mx-auto leading-relaxed">
          "{profile.headline}"
        </p>
        
        <div className="flex flex-wrap items-center justify-center mt-10 gap-6 text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm">
            <MapPin className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">Cybersecurity Expert</span>
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm">
            <FlaskConical className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">PhD Researcher</span>
          </div>
        </div>
      </motion.div>

      {/* 2. PHILOSOPHY: THE TECH MEETS SOIL MANIFESTO */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-32 p-10 md:p-16 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 relative"
      >
        <Quote className="absolute top-10 right-10 w-24 h-24 text-emerald-500/10 -z-0" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <div className="w-16 h-1 bg-emerald-500 rounded-full" />
              <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">
                The "Tech Meets Soil" Philosophy
              </h2>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs">
                Ancient Roots • Algorithmic Intelligence
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit">
                <Lightbulb className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Jitendra's vision for <span className="text-emerald-600 font-bold italic">Ashi's Remedies</span> stems from a profound observation: as our digital world expands, our biological connection to nature withers. He believes that nature is the ultimate high-speed network, carrying terabytes of ancestral healing data in its DNA.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                As a PhD researcher in AI and a Social Innovator, he uses automated algorithms to decode ancient Rajasthani healing rituals. The mission is simple yet radical: to ensure that the "Soil" that sustains our life remains accessible through the "Silicon" that dominates our time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. DUAL IDENTITY CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 px-4">
        
        {/* The Silicon Pillar */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border-t-8 border-emerald-500 hover:shadow-emerald-500/10 transition-all"
        >
          <div className="flex items-center space-x-6 mb-10">
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/50 rounded-3xl group-hover:rotate-6 transition-transform">
              <Cpu className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{halves.tech.title}</h2>
              <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest mt-1">Innovation & Security</p>
            </div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            {halves.tech.description}
          </p>
          <motion.ul variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-6">
            {halves.tech.points.map((point, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-start space-x-4">
                <div className="mt-1.5 h-3 w-3 bg-emerald-500 rounded-full shadow-lg shrink-0" />
                <span className="text-lg text-slate-700 dark:text-slate-200 leading-tight">{point}</span>
              </motion.li>
            ))}
            <motion.li variants={itemVariants} className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3 text-emerald-600 font-bold text-lg">
              <Microscope className="w-6 h-6" />
              <span>Computational Healthcare Specialist</span>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* The Native Pillar */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative bg-emerald-900 text-white p-12 rounded-[3.5rem] shadow-2xl border-t-8 border-amber-500 hover:shadow-amber-500/10 transition-all"
        >
          <div className="flex items-center space-x-6 mb-10">
            <div className="p-5 bg-emerald-800 rounded-3xl group-hover:-rotate-6 transition-transform">
              <Sprout className="h-12 w-12 text-amber-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold">{halves.soil.title}</h2>
              <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mt-1">Ayurveda & Ecology</p>
            </div>
          </div>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed font-medium">
            {halves.soil.description}
          </p>
          <motion.ul variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-6">
            {halves.soil.points.map((point, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-start space-x-4">
                <div className="mt-1.5 h-3 w-3 bg-amber-400 rounded-full shadow-lg shrink-0" />
                <span className="text-lg text-emerald-50 leading-tight">{point}</span>
              </motion.li>
            ))}
            <motion.li variants={itemVariants} className="pt-6 border-t border-emerald-800 flex items-center space-x-3 text-amber-400 font-bold text-lg">
              <Database className="w-6 h-6" />
              <span>Guardian of Ancient Rajasthani Elixirs</span>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>

      {/* 4. EXPANDED MISSION & IMPACT GRID */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">Core Dimensions</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xl">Merging cross-disciplinary expertise for a holistic future.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Microscope, title: "Academic Rigor", text: "Applying PhD-level research methodologies to validate the biochemical efficacy of herbal remedies.", color: "text-blue-500" },
            { icon: Users, title: "Social Impact", text: "Implementing sustainable health solutions for rural communities who are disconnected from mainstream medical access.", color: "text-rose-500" },
            { icon: ShieldCheck, title: "Data Ethics", text: "As an Ethical Hacker, ensuring the privacy of user biological data is protected by industry-leading security protocols.", color: "text-emerald-500" },
            { icon: Zap, title: "Royal Heritage", text: "Systematizing Rajasthani court traditions of wellness for modern diagnostic platforms.", color: "text-amber-500" },
            { icon: Globe, title: "Global Scaling", text: "Bridging local farming products with international quality standards through tech-enabled transparency.", color: "text-purple-500" },
            { icon: Target, title: "Future Vision", text: "Building a future where your digital health twin is synced with your biological rhythms and seasonal shifts.", color: "text-sky-500" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <item.icon className={`w-10 h-10 mb-6 ${item.color}`} />
              <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. THE EVOLUTIONARY JOURNEY (TIMELINE) */}
      <div className="max-w-5xl mx-auto px-4 mb-40">
        <div className="flex flex-col items-center mb-20 text-center">
          <Target className="w-16 h-16 text-emerald-500 mb-6" />
          <h3 className="text-5xl font-serif font-bold text-slate-900 dark:text-slate-100">
            A Journey Through Silicon & Soil
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-xl">A decade of pioneering the intersection of disciplines.</p>
        </div>
        
        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/30 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Bullet */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <BookOpen className="w-7 h-7" />
              </div>
              
              {/* Timeline Card */}
              <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-4rem)] p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-6 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full text-lg font-bold tracking-tight">
                    {item.year}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-3xl text-slate-900 dark:text-slate-100 mb-2">{item.role}</h4>
                <div className="text-xl font-bold text-emerald-600 mb-6">{item.company}</div>
                <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. CALL TO ACTION / VISION STATEMENT */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <div className="bg-emerald-600 dark:bg-emerald-950/60 p-16 md:p-24 rounded-[4rem] shadow-[0_35px_60px_-15px_rgba(16,185,129,0.3)] text-white relative overflow-hidden">
          <Sparkles className="absolute top-10 left-10 w-20 h-20 opacity-10 animate-pulse" />
          <div className="relative z-10">
            <h3 className="text-5xl font-serif font-bold mb-8">Engineering a Wellness Legacy</h3>
            <p className="text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              "We are not merely digitizing ancient remedies; we are architecting a legacy of intelligence. One that honors the timeless wisdom of the earth as fiercely as it embraces the exponential potential of technology."
            </p>
            <div className="flex justify-center space-x-10">
              <div className="flex flex-col items-center">
                <Award className="w-10 h-10 mb-2 text-amber-400" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">Excellence</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-10 h-10 mb-2 text-emerald-300" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">Integrity</span>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb className="w-10 h-10 mb-2 text-amber-200" />
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">Vision</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}