import { motion } from 'framer-motion';
import { Cpu, Sprout, Award, BookOpen, MapPin, Quote, Lightbulb, Target, Sparkles } from 'lucide-react';
import founderData from '../data/founder.json';

export default function Founder() {
  const { profile, halves, timeline } = founderData;

  // Animation variants for staggered list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900 transition-colors duration-500">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-leaf-400 to-soil-400 rounded-full mb-8 shadow-2xl flex items-center justify-center text-5xl overflow-hidden group border-4 border-white dark:border-night-700">
          <img 
            src="https://media.licdn.com/dms/image/v2/D5603AQHuj35hjCbmAQ/profile-displayphoto-scale_400_400/B56ZolRX86JQAkbYm90?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=S5j7-D_J5X8AX8V8M5Y&_nc_ht=media.licdn.com&oh=00_AfC-U6O6V6H7H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6H6" 
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="absolute z-[-1]">👨‍🏫</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-leaf-800 dark:text-leaf-300 mb-4 tracking-tight">
          {profile.name}
        </h1>
        <p className="text-2xl text-soil-600 dark:text-soil-400 italic font-medium max-w-2xl mx-auto leading-relaxed">
          "{profile.headline}"
        </p>
        <div className="flex items-center justify-center mt-6 space-x-3 text-soil-500 dark:text-soil-400">
          <MapPin className="h-5 w-5 text-leaf-500" />
          <span className="font-semibold tracking-wide uppercase text-sm">{profile.location}</span>
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-24 p-8 md:p-12 bg-white dark:bg-night-800 rounded-[3rem] shadow-sm border border-soil-100 dark:border-night-700 relative overflow-hidden"
      >
        <Quote className="absolute top-8 right-8 w-24 h-24 text-leaf-50 dark:text-night-700 -z-0" />
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-gold-500" />
            The Core Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-lg text-soil-700 dark:text-soil-300 leading-relaxed">
              Jitendra's vision for <span className="text-leaf-600 font-bold italic">Ashi's Remedies</span> is born from a critical observation: as technology advances, our connection to ancestral wellness diminishes. He believes that the most sophisticated code is already written in nature's DNA, and our job is to use modern computational tools to decode and preserve this ancient logic for future generations.
            </p>
            <p className="text-lg text-soil-700 dark:text-soil-300 leading-relaxed">
              Whether he is researching AI-driven diagnostics for global health crises or implementing sustainable water solutions for rural farmers, the mission remains the same: **Empowerment through Intelligence.** This platform is a digital bridge, ensuring that the "Soil" that sustains us remains accessible through the "Silicon" that connects us.
            </p>
          </div>
        </div>
      </motion.div>

      {/* The Dual Nature (Split Cards) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 px-4">
        
        {/* The Tech Side */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-night-800 p-10 rounded-[2.5rem] shadow-xl border-l-8 border-leaf-500 relative group"
        >
          <div className="flex items-center space-x-5 mb-8">
            <div className="p-4 bg-leaf-100 dark:bg-leaf-900/50 rounded-2xl transform transition-transform group-hover:rotate-12">
              <Cpu className="h-10 w-10 text-leaf-600 dark:text-leaf-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-soil-900 dark:text-soil-100">{halves.tech.title}</h2>
              <span className="text-xs font-bold text-leaf-500 uppercase tracking-tighter">Silicon / Innovation</span>
            </div>
          </div>
          <p className="text-lg text-soil-600 dark:text-soil-300 mb-8 leading-relaxed font-medium">
            {halves.tech.description}
          </p>
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-4"
          >
            {halves.tech.points.map((point, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-center space-x-3 text-soil-700 dark:text-soil-200">
                <div className="h-2 w-2 bg-leaf-500 rounded-full shadow-[0_0_8px_rgba(86,146,104,0.5)]" />
                <span className="text-lg">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* The Soil Side */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-leaf-50 dark:bg-night-800 p-10 rounded-[2.5rem] shadow-xl border-r-8 border-soil-500 relative group"
        >
          <div className="flex items-center space-x-5 mb-8">
            <div className="p-4 bg-soil-200 dark:bg-night-700 rounded-2xl transform transition-transform group-hover:-rotate-12">
              <Sprout className="h-10 w-10 text-soil-700 dark:text-gold-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-soil-900 dark:text-soil-100">{halves.soil.title}</h2>
              <span className="text-xs font-bold text-soil-500 uppercase tracking-tighter">Soil / Tradition</span>
            </div>
          </div>
          <p className="text-lg text-soil-600 dark:text-soil-300 mb-8 leading-relaxed font-medium">
            {halves.soil.description}
          </p>
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-4"
          >
            {halves.soil.points.map((point, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-center space-x-3 text-soil-700 dark:text-soil-200">
                <div className="h-2 w-2 bg-soil-500 rounded-full shadow-[0_0_8px_rgba(117,106,78,0.5)]" />
                <span className="text-lg">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <Target className="w-12 h-12 text-leaf-500 mb-4" />
          <h3 className="text-4xl font-serif font-bold text-soil-800 dark:text-soil-100">
            The Evolutionary Journey
          </h3>
          <p className="text-soil-500 mt-2">A decade of bridging industry and earth.</p>
        </div>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-soil-200 dark:before:via-night-700 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-night-900 bg-soil-100 dark:bg-night-800 text-soil-500 group-hover:bg-leaf-500 group-hover:text-white transition-all duration-300 shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <BookOpen className="w-6 h-6" />
              </div>
              
              {/* Card Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 bg-white dark:bg-night-800 rounded-[2rem] border border-soil-100 dark:border-night-700 shadow-md hover:shadow-xl transition-all duration-300 group-hover:border-leaf-200 dark:group-hover:border-leaf-900">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-4 py-1 bg-leaf-50 dark:bg-night-700 text-leaf-600 dark:text-leaf-400 rounded-full text-sm font-bold tracking-tight">
                    {item.year}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-2xl text-soil-900 dark:text-soil-100 mb-1">{item.role}</h4>
                <div className="text-base font-semibold text-leaf-500 mb-4">{item.company}</div>
                <p className="text-soil-600 dark:text-soil-400 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing Call to Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-32 text-center pb-20"
      >
        <div className="bg-leaf-600 dark:bg-leaf-900/40 p-12 rounded-[3rem] shadow-2xl border border-leaf-500/30 text-white">
          <h3 className="text-3xl font-serif font-bold mb-4">Cultivating the Future</h3>
          <p className="text-xl text-leaf-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            "We are not just building a repository of remedies; we are creating a legacy of intelligence. One that values the wisdom of the earth as much as the potential of the algorithm."
          </p>
          <div className="flex justify-center space-x-6">
            <Award className="w-8 h-8 opacity-50" />
            <Sparkles className="w-8 h-8 opacity-50" />
            <Lightbulb className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
