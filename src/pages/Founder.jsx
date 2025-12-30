import { motion } from 'framer-motion';
import { Cpu, Sprout, Award, BookOpen, MapPin } from 'lucide-react';
import founderData from '../data/founder.json';

export default function Founder() {
  const { profile, halves, timeline } = founderData;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-leaf-400 to-soil-400 rounded-full mb-6 shadow-xl flex items-center justify-center text-4xl">
          {https://media.licdn.com/dms/image/v2/D5603AQHuj35hjCbmAQ/profile-displayphoto-scale_400_400/B56ZolRX86JQAk-/0/1761561904715?e=1768435200&v=beta&t=_QOiyLv72xGQafwZrKl8QheIv2GKeLzZySmW-VET5Uk}
          👨‍🏫
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-leaf-800 dark:text-leaf-300 mb-2">
          {profile.name}
        </h1>
        <p className="text-xl text-soil-600 dark:text-soil-400 italic">
          "{profile.headline}"
        </p>
        <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-soil-500">
          <MapPin className="h-4 w-4" />
          <span>{profile.location}</span>
        </div>
      </motion.div>

      {/* The Dual Nature (Split Cards) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* The Tech Side */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-night-800 p-8 rounded-3xl shadow-lg border-l-4 border-leaf-500"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-leaf-100 dark:bg-leaf-900 rounded-xl">
              <Cpu className="h-8 w-8 text-leaf-600" />
            </div>
            <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100">{halves.tech.title}</h2>
          </div>
          <p className="text-soil-600 dark:text-soil-300 mb-6 leading-relaxed">
            {halves.tech.description}
          </p>
          <ul className="space-y-3">
            {halves.tech.points.map((point, index) => (
              <li key={index} className="flex items-center space-x-2 text-soil-700 dark:text-soil-200">
                <span className="h-2 w-2 bg-leaf-500 rounded-full" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The Soil Side */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-leaf-50 dark:bg-night-700 p-8 rounded-3xl shadow-lg border-r-4 border-soil-500"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-soil-200 dark:bg-night-600 rounded-xl">
              <Sprout className="h-8 w-8 text-soil-700 dark:text-gold-500" />
            </div>
            <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100">{halves.soil.title}</h2>
          </div>
          <p className="text-soil-600 dark:text-soil-300 mb-6 leading-relaxed">
            {halves.soil.description}
          </p>
          <ul className="space-y-3">
            {halves.soil.points.map((point, index) => (
              <li key={index} className="flex items-center space-x-2 text-soil-700 dark:text-soil-200">
                <span className="h-2 w-2 bg-soil-500 rounded-full" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-serif font-bold text-center text-soil-800 dark:text-soil-200 mb-12">
          The Journey
        </h3>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-soil-300 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-soil-100 group-[.is-active]:bg-leaf-500 text-soil-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <BookOpen className="w-5 h-5" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white dark:bg-night-800 rounded-2xl border border-soil-100 dark:border-night-700 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-leaf-600 dark:text-leaf-400">{item.year}</span>
                </div>
                <h4 className="font-bold text-lg text-soil-900 dark:text-soil-100">{item.role}</h4>
                <div className="text-sm font-medium text-soil-500 mb-2">{item.company}</div>
                <p className="text-soil-600 dark:text-soil-400 text-sm leading-snug">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}