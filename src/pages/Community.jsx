import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, MessageCircle, Share2, BadgeCheck, PenTool, BookOpen, Feather, X, Send } from 'lucide-react';

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [expertArticles, setExpertArticles] = useState([]); // State for Expert Articles
  
  // New Story Form State
  const [newStory, setNewStory] = useState({
    user: '', location: '', remedy: '', story: '', tags: ''
  });

  // Load Real Data from LocalStorage
  useEffect(() => {
    const loadData = () => {
      // 1. Load User Stories
      const savedStories = localStorage.getItem('approved_stories');
      if (savedStories) {
        setStories(JSON.parse(savedStories));
      } else {
        // Fallback Mock Data if empty
        setStories([
          {
            id: 101, user: "Priya K.", location: "Jaipur", remedy: "Clove Oil for Toothache", story: "My grandmother always kept a small bottle of clove oil...", likes: 45, verified: true, tags: ["Dental"]
          },
          {
            id: 103, user: "Sarah J.", location: "London", remedy: "Ashwagandha Milk", story: "Been drinking this before bed for a month...", likes: 89, verified: true, tags: ["Sleep"]
          }
        ]);
      }

      // 2. Load Expert Articles (The Missing Link!)
      const savedArticles = localStorage.getItem('approved_expert_articles');
      if (savedArticles) {
        setExpertArticles(JSON.parse(savedArticles));
      } else {
        // Fallback Mock Data
        setExpertArticles([
          {
            id: 1, title: "The Science of Turmeric", author: "Dr. A. Sharma", role: "Ayurvedic Practitioner",
            preview: "Curcumin is not just a spice; it's a potent anti-inflammatory agent...", date: "Oct 12, 2024",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600"
          }
        ]);
      }
    };

    loadData();
    // Listen for updates (e.g., if Admin publishes while this tab is open)
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleSubmitStory = (e) => {
    e.preventDefault();
    
    // Create story object
    const storyObj = {
      id: Date.now(),
      ...newStory,
      tags: newStory.tags.split(',').map(t => t.trim()),
      likes: 0,
      verified: false, // Default unverified
      date: new Date().toLocaleDateString()
    };

    // Save to Pending Queue (Admin will approve)
    const existingPending = JSON.parse(localStorage.getItem('pending_stories') || '[]');
    localStorage.setItem('pending_stories', JSON.stringify([storyObj, ...existingPending]));

    // Reset and Close
    setNewStory({ user: '', location: '', remedy: '', story: '', tags: '' });
    setShowStoryModal(false);
    alert("Story submitted for review! An admin will approve it shortly.");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900 transition-colors duration-300">
      <Helmet>
        <title>The Healing Circle | Community & Blog</title>
        <meta name="description" content="Join the Ashi's Remedies community. Read expert articles and shared home cures." />
      </Helmet>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-bold mb-4"
        >
          <Heart className="w-4 h-4 fill-current" /><span>Community First</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-6">The Healing Circle</h1>
        <p className="text-xl text-soil-600 dark:text-soil-300 max-w-2xl mx-auto">Ancient wisdom is best shared. Explore expert insights and real stories.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Expert Blog Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-leaf-100 dark:bg-leaf-900 rounded-lg"><Feather className="w-6 h-6 text-leaf-600 dark:text-leaf-400" /></div>
            <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100">Expert Insights</h2>
          </div>
          
          {expertArticles.length === 0 ? (
            <div className="text-center p-8 bg-white dark:bg-night-800 rounded-3xl border border-soil-200 dark:border-night-700">
              <p className="text-soil-500">No expert articles published yet. Check back soon!</p>
            </div>
          ) : (
            expertArticles.map((article) => (
              <motion.article key={article.id} className="bg-white dark:bg-night-800 rounded-3xl overflow-hidden shadow-sm border border-soil-100 dark:border-night-700 hover:shadow-md transition-shadow group flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-leaf-600 dark:text-leaf-400 mb-2 uppercase tracking-wider"><span>{article.role}</span><span>•</span><span>{article.date}</span></div>
                    <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-3 group-hover:text-leaf-600 transition-colors">{article.title}</h3>
                    <p className="text-soil-600 dark:text-soil-400 line-clamp-2">{article.preview}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-soil-200 flex items-center justify-center text-xs font-bold text-soil-600">{article.author ? article.author[0] : 'E'}</div>
                      <span className="text-sm font-medium text-soil-900 dark:text-soil-200">{article.author}</span>
                    </div>
                    <button className="text-sm font-bold text-leaf-600 hover:underline">Read Article →</button>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* RIGHT: User Stories */}
        <div className="lg:col-span-4 space-y-8">
          {/* CTA Box */}
          <div className="bg-leaf-600 rounded-3xl p-8 text-white text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <PenTool className="w-10 h-10 mx-auto mb-4 text-leaf-100" />
            <h3 className="text-xl font-bold mb-2">Share Your Remedy</h3>
            <p className="text-leaf-100 text-sm mb-6">Have a family recipe that works wonders?</p>
            <button onClick={() => setShowStoryModal(true)} className="w-full py-3 bg-white text-leaf-700 rounded-xl font-bold hover:bg-leaf-50 transition-colors shadow-sm">Write a Story</button>
          </div>

          {/* Stories Feed */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg"><MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" /></div>
              <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100">User Stories</h2>
            </div>
            <div className="space-y-4">
              {stories.length === 0 ? <p className="text-soil-500 italic">No stories yet. Be the first!</p> : stories.map((story) => (
                <motion.div key={story.id} className="bg-white dark:bg-night-800 p-5 rounded-2xl border border-soil-100 dark:border-night-700 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2"><span className="font-bold text-soil-900 dark:text-soil-100">{story.user}</span><span className="text-xs text-soil-400">• {story.location}</span></div>
                    {story.verified && <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md text-[10px] font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"><BadgeCheck className="w-3 h-3" /><span>VERIFIED</span></div>}
                  </div>
                  <h4 className="font-serif font-bold text-lg text-leaf-700 dark:text-leaf-400 mb-2">{story.remedy}</h4>
                  <p className="text-sm text-soil-600 dark:text-soil-300 leading-relaxed mb-4">"{story.story}"</p>
                  <div className="flex items-center justify-between pt-3 border-t border-soil-50 dark:border-night-700">
                    <div className="flex space-x-2">{story.tags.map(tag => (<span key={tag} className="text-[10px] bg-soil-100 dark:bg-night-700 text-soil-500 px-2 py-1 rounded-full">#{tag}</span>))}</div>
                    <button className="flex items-center space-x-1 text-xs font-bold text-soil-400 hover:text-red-500 transition-colors"><Heart className="w-3 h-3" /><span>{story.likes}</span></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-night-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
              <button onClick={() => setShowStoryModal(false)} className="absolute top-4 right-4 p-2 hover:bg-soil-100 dark:hover:bg-night-700 rounded-full"><X className="w-6 h-6" /></button>
              <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-6">Submit Your Story</h3>
              <form onSubmit={handleSubmitStory} className="space-y-4">
                <input required placeholder="Your Name" className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" value={newStory.user} onChange={e => setNewStory({...newStory, user: e.target.value})} />
                <input required placeholder="Location (City)" className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" value={newStory.location} onChange={e => setNewStory({...newStory, location: e.target.value})} />
                <input required placeholder="Remedy Name" className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" value={newStory.remedy} onChange={e => setNewStory({...newStory, remedy: e.target.value})} />
                <textarea required rows={4} placeholder="Tell us your story..." className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" value={newStory.story} onChange={e => setNewStory({...newStory, story: e.target.value})} />
                <input placeholder="Tags (comma separated)" className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" value={newStory.tags} onChange={e => setNewStory({...newStory, tags: e.target.value})} />
                <button type="submit" className="w-full py-3 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl flex items-center justify-center"><Send className="w-4 h-4 mr-2" /> Submit for Review</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}