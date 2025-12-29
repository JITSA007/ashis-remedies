import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { read, utils } from 'xlsx';
import { 
  Lock, Upload, FileSpreadsheet, Users, Link as LinkIcon, 
  Check, AlertCircle, LayoutDashboard, UserCircle, 
  FileQuestion, Activity, Save, Plus, Trash2, Edit2, X, ChevronRight, Download, Globe, Eye, Pause, Play, PenTool,
  Search, Share2, Settings, ExternalLink, Copy, MessageCircle, ThumbsUp, ThumbsDown, Image as ImageIcon, Feather
} from 'lucide-react';

// Import Data Sources (Initial Fallbacks)
import founderDataRaw from '../data/founder.json';
import quizDataRaw from '../data/quiz.json';
import bodyZonesDataRaw from '../data/body_zones.json';
import remediesDataRaw from '../data/remedies.json';

// Import New Components
import SeoManager from '../components/admin/SeoManager';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- 1. DATA STATES (With LocalStorage Persistence) ---
  const [remedies, setRemedies] = useState(() => {
    const saved = localStorage.getItem('admin_remedies');
    return saved ? JSON.parse(saved) : remediesDataRaw;
  });
  
  const [isManualRemedy, setIsManualRemedy] = useState(false);
  const [editingRemedyId, setEditingRemedyId] = useState(null); 
  const [newRemedy, setNewRemedy] = useState({
    title: '', description: '', ingredients: '', preparation: '', symptoms: '', image: ''
  });
  
  // Guest System States
  const [guestLinks, setGuestLinks] = useState([
    { id: 1709123, token: 'demo-token', url: `${window.location.origin}/guest-editor/demo-token`, status: 'Active', created: '2024-01-15' }
  ]);
  const [pendingReviews, setPendingReviews] = useState([
    { id: 1, title: 'Healing with Tulsi', author: 'Dr. A. Sharma', date: '2024-01-20', status: 'Pending', content: "Tulsi, or Holy Basil..." }
  ]);
  const [previewPost, setPreviewPost] = useState(null); 
  const [publishedUrl, setPublishedUrl] = useState(null); 

  // --- COMMUNITY & BLOG STATES ---
  const [pendingStories, setPendingStories] = useState([]);
  const [liveStories, setLiveStories] = useState([]);
  const [expertArticles, setExpertArticles] = useState([]); // New State for Expert Insights

  // Load Data from LocalStorage on mount
  useEffect(() => {
    const loadData = () => {
      // 1. User Stories
      const pending = JSON.parse(localStorage.getItem('pending_stories') || '[]');
      if (pending.length === 0) {
        pending.push({
          id: 999, user: "Demo User", location: "Delhi", remedy: "Neem Paste", story: "Great for acne!", tags: ["Skin"], date: new Date().toLocaleDateString()
        });
      }
      const live = JSON.parse(localStorage.getItem('approved_stories') || '[]');
      if (live.length === 0) {
        live.push(
          { id: 101, user: "Priya K.", location: "Jaipur", remedy: "Clove Oil", story: "Saved my toothache!", likes: 45, verified: true, tags: ["Dental"] },
          { id: 103, user: "Sarah J.", location: "London", remedy: "Ashwagandha", story: "Better sleep.", likes: 89, verified: true, tags: ["Sleep"] }
        );
      }

      // 2. Expert Articles (Blog)
      const experts = JSON.parse(localStorage.getItem('approved_expert_articles') || '[]');
      if (experts.length === 0) {
        experts.push({
          id: 1,
          title: "The Science of Turmeric",
          author: "Dr. A. Sharma",
          role: "Ayurvedic Practitioner",
          preview: "Curcumin is not just a spice; it's a potent anti-inflammatory agent...",
          date: "Oct 12, 2024",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
          readTime: "5 min read"
        });
      }

      setPendingStories(pending);
      setLiveStories(live);
      setExpertArticles(experts);
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Approve User Story (Community)
  const approveStory = (story) => {
    const newLive = [{ ...story, verified: true, likes: 0 }, ...liveStories];
    const newPending = pendingStories.filter(s => s.id !== story.id);
    setLiveStories(newLive);
    setPendingStories(newPending);
    localStorage.setItem('approved_stories', JSON.stringify(newLive));
    localStorage.setItem('pending_stories', JSON.stringify(newPending));
    showNotification("Story Approved & Published!");
  };

  const rejectStory = (id) => {
    const newPending = pendingStories.filter(s => s.id !== id);
    setPendingStories(newPending);
    localStorage.setItem('pending_stories', JSON.stringify(newPending));
    showNotification("Story Rejected");
  };

  const deleteLiveStory = (id) => {
    const newLive = liveStories.filter(s => s.id !== id);
    setLiveStories(newLive);
    localStorage.setItem('approved_stories', JSON.stringify(newLive));
    showNotification("Story Deleted");
  };

  const deleteExpertArticle = (id) => {
    const newArticles = expertArticles.filter(a => a.id !== id);
    setExpertArticles(newArticles);
    localStorage.setItem('approved_expert_articles', JSON.stringify(newArticles));
    showNotification("Article Deleted");
  };

  // Editable Data States (With Persistence)
  const [founderProfile, setFounderProfile] = useState(() => {
    const saved = localStorage.getItem('admin_founder');
    return saved ? JSON.parse(saved) : founderDataRaw;
  });
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const saved = localStorage.getItem('admin_quiz');
    return saved ? JSON.parse(saved) : quizDataRaw;
  });
  const [bodyZones, setBodyZones] = useState(() => {
    const saved = localStorage.getItem('admin_body_zones');
    return saved ? JSON.parse(saved) : bodyZonesDataRaw;
  });
  const [activeZoneId, setActiveZoneId] = useState('head');
  
  // SEO Settings
  const [seoSettings, setSeoSettings] = useState(() => {
    const saved = localStorage.getItem('site_seo_config');
    return saved ? JSON.parse(saved) : {
      siteTitle: "Ashi's Remedies",
      titleSeparator: "|",
      tagline: "Ayurvedic Wisdom",
      metaDescription: "Discover ancient Ayurvedic remedies powered by modern AI.",
      keywords: "Ayurveda, Home Remedies, AI Health",
      ogImage: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3",
      robots: "index, follow",
      jsonLdType: "Organization"
    };
  });

  // Notifications
  const [notification, setNotification] = useState(null);
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- SAVE GLOBAL HANDLER ---
  const handleSaveGlobal = () => {
    localStorage.setItem('site_seo_config', JSON.stringify(seoSettings));
    localStorage.setItem('admin_remedies', JSON.stringify(remedies));
    localStorage.setItem('admin_founder', JSON.stringify(founderProfile));
    localStorage.setItem('admin_quiz', JSON.stringify(quizQuestions));
    localStorage.setItem('admin_body_zones', JSON.stringify(bodyZones));
    
    document.title = `${seoSettings.siteTitle} ${seoSettings.titleSeparator} ${seoSettings.tagline}`;
    showNotification("All Data Saved to Database!");
  };

  // --- HELPER: TEMPLATES ---
  const downloadTemplate = (type) => { /* Same as before */ };

  // --- AUTHENTICATION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid Credentials');
  };

  // --- 1. REMEDIES LOGIC ---
  const handleFileUpload = async (e) => { /* Same as before */ };

  // Improved Image Selection (Base64 for persistence)
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRemedy({ ...newRemedy, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditRemedy = (remedy) => {
    setEditingRemedyId(remedy.id);
    setNewRemedy({
      title: remedy.title,
      description: remedy.description,
      symptoms: Array.isArray(remedy.symptoms) ? remedy.symptoms.join(', ') : remedy.symptoms,
      ingredients: Array.isArray(remedy.ingredients) ? remedy.ingredients.join(', ') : remedy.ingredients,
      preparation: Array.isArray(remedy.preparation) ? remedy.preparation.join('; ') : remedy.preparation,
      image: remedy.image || ''
    });
    setIsManualRemedy(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addManualRemedy = () => {
    const formattedRemedy = {
      title: newRemedy.title,
      description: newRemedy.description,
      symptoms: newRemedy.symptoms.split(',').map(s => s.trim()),
      ingredients: newRemedy.ingredients.split(',').map(s => s.trim()),
      preparation: newRemedy.preparation.split(';').map(s => s.trim()),
      image: newRemedy.image || "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=600"
    };

    if (editingRemedyId) {
      const updatedList = remedies.map(r => r.id === editingRemedyId ? { ...r, ...formattedRemedy } : r);
      setRemedies(updatedList);
      showNotification("Remedy Updated!");
      setEditingRemedyId(null);
    } else {
      const remedy = { ...formattedRemedy, id: `manual_${Date.now()}` };
      setRemedies([remedy, ...remedies]);
      showNotification("New Remedy Added!");
    }
    
    setNewRemedy({ title: '', description: '', ingredients: '', preparation: '', symptoms: '', image: '' });
    setIsManualRemedy(false);
  };

  // --- 2. GUEST SYSTEM LOGIC ---
  const generateLink = () => { 
    const token = Math.random().toString(36).substring(7);
    const newLink = { id: Date.now(), token, url: `${window.location.origin}/guest-editor/${token}`, status: 'Active', created: new Date().toLocaleDateString() };
    setGuestLinks([newLink, ...guestLinks]); 
    showNotification('New Guest Link Generated');
  };
  const toggleLinkStatus = (id) => {
    setGuestLinks(guestLinks.map(link => link.id === id ? { ...link, status: link.status === 'Active' ? 'Paused' : 'Active' } : link));
  };
  const deleteLink = (id) => {
    setGuestLinks(guestLinks.filter(link => link.id !== id));
    showNotification('Link deleted');
  };
  const openPreview = (post) => setPreviewPost(post);
  
  // FIX: Publish to Expert Articles (Not User Stories)
  const approvePost = (id, title) => {
    const post = pendingReviews.find(p => p.id === id);
    
    if (post) {
      // Create Article Object
      const newArticle = {
        id: post.id,
        title: post.title,
        author: post.author,
        role: "Guest Expert",
        preview: post.content.substring(0, 150) + "...", // Create snippet
        content: post.content, // Save full content
        date: post.date,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600", // Default Image
        readTime: "5 min read"
      };
      
      const newArticles = [newArticle, ...expertArticles];
      setExpertArticles(newArticles);
      localStorage.setItem('approved_expert_articles', JSON.stringify(newArticles));
    }

    setPendingReviews(pendingReviews.filter(p => p.id !== id));
    
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const finalUrl = `${window.location.origin}/community`; 
    setPublishedUrl(finalUrl);
    setPreviewPost(null);
    showNotification("Guest Post Published to Expert Insights!");
  };

  // --- 3. FOUNDER EDITOR LOGIC ---
  const updateFounderBio = (field, value) => {
    setFounderProfile({
      ...founderProfile,
      profile: { ...founderProfile.profile, [field]: value }
    });
  };
  
  const updateFounderHalf = (half, field, value) => {
    setFounderProfile({
      ...founderProfile,
      halves: { 
        ...founderProfile.halves, 
        [half]: { ...founderProfile.halves[half], [field]: value } 
      }
    });
  };

  const addTimelineEvent = () => {
    const newEvent = { year: "2024", role: "New Role", company: "Company", desc: "Description" };
    setFounderProfile({ ...founderProfile, timeline: [newEvent, ...founderProfile.timeline] });
  };
  
  // Fixed: Correctly updates timeline events using map for safety
  const updateTimelineEvent = (idx, field, value) => {
    const updatedTimeline = founderProfile.timeline.map((event, i) => 
      i === idx ? { ...event, [field]: value } : event
    );
    setFounderProfile({ ...founderProfile, timeline: updatedTimeline });
  };

  const deleteTimelineEvent = (idx) => {
    const newTimeline = [...founderProfile.timeline];
    newTimeline.splice(idx, 1);
    setFounderProfile({ ...founderProfile, timeline: newTimeline });
  };

  // --- 4. QUIZ & BODY ---
  const addQuestion = () => setQuizQuestions([...quizQuestions, { id: Date.now(), question: "New Q?", category: "General", options: [{ text: "Opt 1", type: "vata" }], allowOther: false }]);
  const updateQuestion = (idx, field, value) => { const u = [...quizQuestions]; u[idx] = { ...u[idx], [field]: value }; setQuizQuestions(u); };
  const deleteQuestion = (idx) => { const u = [...quizQuestions]; u.splice(idx, 1); setQuizQuestions(u); };
  const updateOption = (qIdx, optIdx, field, value) => { const u = [...quizQuestions]; u[qIdx].options[optIdx][field] = value; setQuizQuestions(u); };
  const addOptionToQuestion = (qIdx) => { const u = [...quizQuestions]; u[qIdx].options.push({ text: "New", type: "vata" }); setQuizQuestions(u); };
  const removeOptionFromQuestion = (qIdx, optIdx) => { const u = [...quizQuestions]; u[qIdx].options.splice(optIdx, 1); setQuizQuestions(u); };
  
  const updateZoneInfo = (id, field, value) => setBodyZones({...bodyZones, [id]: {...bodyZones[id], [field]: value}});
  const addSymptom = (zoneId) => setBodyZones({...bodyZones, [zoneId]: {...bodyZones[zoneId], symptoms: [...bodyZones[zoneId].symptoms, {name:"New", type:"common"}]}});
  const updateSymptom = (zoneId, idx, field, value) => { const s = [...bodyZones[zoneId].symptoms]; s[idx][field] = value; setBodyZones({...bodyZones, [zoneId]: {...bodyZones[zoneId], symptoms: s}}); };
  const removeSymptom = (zoneId, idx) => { const s = [...bodyZones[zoneId].symptoms]; s.splice(idx, 1); setBodyZones({...bodyZones, [zoneId]: {...bodyZones[zoneId], symptoms: s}}); };
  const handleQuizUpload = () => {}; 

  // --- RENDER ---
  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-soil-50 dark:bg-night-900 px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-night-800 p-8 rounded-3xl shadow-xl max-w-md w-full border border-soil-200 dark:border-night-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-leaf-100 dark:bg-night-700 rounded-full flex items-center justify-center mx-auto mb-4 text-leaf-600 dark:text-leaf-400"><Lock className="w-8 h-8" /></div>
          <h2 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100">Admin Access</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" placeholder="Password (admin123)" className="w-full px-4 py-3 rounded-xl border border-soil-300 dark:border-night-600 bg-soil-50 dark:bg-night-900 outline-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="w-full py-3 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl shadow-lg">Unlock Dashboard</button>
        </form>
      </motion.div>
    </div>
  );

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'community', label: 'Community Manager', icon: MessageCircle },
    { id: 'upload', label: 'Remedies', icon: Upload },
    { id: 'guests', label: 'Guest Invites', icon: Users },
    { id: 'seo', label: 'SEO Suite', icon: Globe },
    { id: 'founder', label: 'Founder', icon: UserCircle },
    { id: 'quiz', label: 'Dosha Quiz', icon: FileQuestion },
    { id: 'body', label: 'Body Zones', icon: Activity },
  ];

  return (
    <div className="min-h-screen pt-20 bg-soil-50 dark:bg-night-900 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-64 bg-white dark:bg-night-800 border-r border-soil-200 dark:border-night-700 lg:min-h-screen p-4 flex lg:block space-x-4 lg:space-x-0 lg:space-y-2 sticky top-20 z-10 overflow-x-auto">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all w-full text-left whitespace-nowrap ${activeTab === item.id ? 'bg-leaf-100 dark:bg-night-700 text-leaf-700 dark:text-leaf-300 font-bold' : 'text-soil-600 dark:text-soil-400 hover:bg-soil-100 dark:hover:bg-night-700'}`}>
            <item.icon className="w-5 h-5" /><span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-soil-900 dark:text-soil-100 capitalize">{menuItems.find(i => i.id === activeTab)?.label}</h1>
          <button onClick={handleSaveGlobal} className="flex items-center px-4 py-2 bg-soil-900 dark:bg-soil-100 text-white dark:text-night-900 rounded-lg font-bold hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4 mr-2" /> Save System
          </button>
        </div>

        <AnimatePresence>
          {notification && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-24 right-8 bg-leaf-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center">
              <Check className="w-5 h-5 mr-2" />{notification}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700"><div className="text-soil-500 text-sm">Total Remedies</div><div className="text-3xl font-bold text-soil-900 dark:text-soil-100">{remedies.length}</div></div>
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700"><div className="text-soil-500 text-sm">Pending Stories</div><div className="text-3xl font-bold text-orange-500">{pendingStories.length}</div></div>
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700"><div className="text-soil-500 text-sm">Live Stories</div><div className="text-3xl font-bold text-leaf-600">{liveStories.length}</div></div>
          </div>
        )}

        {/* --- NEW TAB: COMMUNITY MANAGER --- */}
        {activeTab === 'community' && (
          <div className="space-y-8 max-w-5xl">
            {/* Pending Stories Queue */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
              <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" /> Pending Approval ({pendingStories.length})
              </h3>
              {pendingStories.length === 0 ? (
                <p className="text-sm text-orange-600/60 italic">No new stories to review.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pendingStories.map(story => (
                    <div key={story.id} className="bg-white dark:bg-night-800 p-4 rounded-xl shadow-sm border border-orange-200 dark:border-orange-900/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-bold text-soil-900 dark:text-soil-100">{story.remedy}</span>
                          <span className="text-xs text-soil-500 ml-2">by {story.user} from {story.location}</span>
                        </div>
                        <div className="text-xs text-soil-400">{story.date}</div>
                      </div>
                      <p className="text-sm text-soil-600 dark:text-soil-300 mb-4 italic">"{story.story}"</p>
                      <div className="flex justify-end space-x-3">
                        <button onClick={() => rejectStory(story.id)} className="flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200">
                          <ThumbsDown className="w-3 h-3 mr-1" /> Reject
                        </button>
                        <button onClick={() => approveStory(story)} className="flex items-center px-3 py-1.5 bg-leaf-600 text-white rounded-lg text-xs font-bold hover:bg-leaf-700">
                          <ThumbsUp className="w-3 h-3 mr-1" /> Approve & Publish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Stories List */}
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <h3 className="font-bold text-soil-900 dark:text-soil-100 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-leaf-500" /> Live User Stories ({liveStories.length})
              </h3>
              <div className="overflow-y-auto max-h-[300px] space-y-2">
                {liveStories.map(story => (
                  <div key={story.id} className="flex justify-between items-center p-3 border-b border-soil-100 dark:border-night-700 hover:bg-soil-50 dark:hover:bg-night-700/50 transition-colors">
                    <div>
                      <span className="font-medium text-soil-800 dark:text-soil-200 block">{story.remedy}</span>
                      <span className="text-xs text-soil-400">by {story.user} • {story.likes} Likes</span>
                    </div>
                    <button onClick={() => deleteLiveStory(story.id)} className="p-2 text-soil-400 hover:text-red-500 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. REMEDIES MANAGER */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setIsManualRemedy(!isManualRemedy); setEditingRemedyId(null); setNewRemedy({ title: '', description: '', ingredients: '', preparation: '', symptoms: '', image: '' }); }} className={`flex items-center px-4 py-2 text-sm rounded-lg font-bold border transition-colors ${isManualRemedy ? 'bg-soil-200 text-soil-800 border-soil-300' : 'bg-white dark:bg-night-800 text-leaf-600 border-leaf-200'}`}><PenTool className="w-4 h-4 mr-2" /> {isManualRemedy ? "Cancel" : "Add New / Edit"}</button>
              <button onClick={() => downloadTemplate('remedies')} className="flex items-center px-4 py-2 text-sm bg-white dark:bg-night-800 border border-soil-300 dark:border-night-600 rounded-lg text-soil-600 dark:text-soil-300 hover:bg-soil-50 dark:hover:bg-night-700"><Download className="w-4 h-4 mr-2" /> Template</button>
            </div>
            
            {isManualRemedy ? (
              <div className="bg-white dark:bg-night-800 p-6 rounded-3xl border border-soil-200 dark:border-night-700 space-y-4">
                <h3 className="text-xl font-bold text-soil-900 dark:text-soil-100 mb-4">{editingRemedyId ? "Edit Remedy" : "New Remedy Details"}</h3>
                
                <div className="flex gap-6 items-start">
                  <div className="flex-1 space-y-4">
                    <input className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Remedy Title" value={newRemedy.title} onChange={e => setNewRemedy({...newRemedy, title: e.target.value})} />
                    <textarea className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Description" value={newRemedy.description} onChange={e => setNewRemedy({...newRemedy, description: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                      <input className="p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Symptoms (comma sep)" value={newRemedy.symptoms} onChange={e => setNewRemedy({...newRemedy, symptoms: e.target.value})} />
                      <input className="p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Ingredients (comma sep)" value={newRemedy.ingredients} onChange={e => setNewRemedy({...newRemedy, ingredients: e.target.value})} />
                    </div>
                  </div>
                  
                  {/* Image Handling */}
                  <div className="w-1/3">
                    <div className="border-2 border-dashed border-soil-300 dark:border-night-600 rounded-xl p-4 text-center">
                      {newRemedy.image ? (
                        <div className="relative">
                          <img src={newRemedy.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                          <button onClick={() => setNewRemedy({...newRemedy, image: ''})} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><X className="w-3 h-3" /></button>
                        </div>
                      ) : (
                        <div className="h-32 flex flex-col items-center justify-center text-soil-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                      
                      <div className="mt-2 space-y-2">
                        <input className="w-full p-2 text-xs border rounded bg-transparent" placeholder="Paste Image URL" value={newRemedy.image} onChange={e => setNewRemedy({...newRemedy, image: e.target.value})} />
                        <div className="relative">
                          <button className="w-full py-1 bg-soil-100 dark:bg-night-700 text-xs font-bold rounded">Upload File (Saved)</button>
                          <input type="file" accept="image/*" onChange={handleImageSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={addManualRemedy} className="w-full py-3 bg-leaf-600 text-white rounded-xl font-bold hover:bg-leaf-700">{editingRemedyId ? "Update Remedy" : "Save to Database"}</button>
              </div>
            ) : (
              <div className="bg-white dark:bg-night-800 p-8 rounded-3xl border border-dashed border-soil-300 dark:border-night-600 text-center max-w-2xl mx-auto">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-leaf-500 mb-4" />
                <h3 className="text-xl font-bold text-soil-900 dark:text-soil-100 mb-2">Upload Remedies Excel</h3>
                <div className="relative inline-block"><button className="px-6 py-3 bg-soil-900 dark:bg-soil-100 text-white dark:text-night-900 rounded-xl font-bold flex items-center"><Upload className="w-5 h-5 mr-2" />Select File</button><input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" /></div>
              </div>
            )}

            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <h4 className="font-bold text-soil-500 mb-4">Database ({remedies.length})</h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {remedies.map((r, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b border-soil-100 dark:border-night-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-soil-100 overflow-hidden shrink-0">
                        <img src={r.image || "https://images.unsplash.com/photo-1515543904379-3d757afe72e3"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-medium text-soil-800 dark:text-soil-200 block">{r.title}</span>
                        <span className="text-xs text-soil-400">{r.ingredients && r.ingredients.length} ingredients</span>
                      </div>
                    </div>
                    <button onClick={() => handleEditRemedy(r)} className="p-2 text-leaf-600 hover:bg-leaf-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. GUEST SYSTEM */}
        {activeTab === 'guests' && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center"><h3 className="text-lg font-bold text-soil-900 dark:text-soil-100">Guest Access</h3><button onClick={generateLink} className="px-4 py-2 bg-leaf-600 text-white rounded-lg font-bold flex items-center"><Plus className="w-4 h-4 mr-2" /> Create Link</button></div>
            
            {/* Pending Reviews */}
            {pendingReviews.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Pending Reviews</h3>
                <div className="space-y-3">{pendingReviews.map(r => (<div key={r.id} className="flex justify-between p-4 bg-white dark:bg-night-800 rounded-xl shadow-sm"><div><div className="font-bold text-soil-900 dark:text-soil-100">{r.title}</div><div className="text-xs text-soil-500">by {r.author}</div></div><div className="flex space-x-3"><button onClick={()=>openPreview(r)} className="px-4 py-2 bg-soil-100 dark:bg-night-700 rounded-lg text-sm font-bold">Preview</button><button onClick={()=>approvePost(r.id, r.title)} className="px-4 py-2 bg-leaf-600 text-white rounded-lg text-sm font-bold">Publish</button></div></div>))}</div>
              </div>
            )}

            {/* Published Articles List */}
            {expertArticles.length > 0 && (
              <div className="bg-leaf-50 dark:bg-night-800/50 p-6 rounded-2xl border border-leaf-100 dark:border-night-700">
                <h3 className="font-bold text-leaf-800 dark:text-leaf-300 mb-4 flex items-center"><Feather className="w-5 h-5 mr-2" /> Published Articles ({expertArticles.length})</h3>
                <div className="space-y-2">
                  {expertArticles.map(article => (
                    <div key={article.id} className="flex justify-between items-center p-3 bg-white dark:bg-night-900 rounded-xl border border-soil-100 dark:border-night-600">
                      <div>
                        <span className="font-bold text-soil-900 dark:text-soil-100 block">{article.title}</span>
                        <span className="text-xs text-soil-500">by {article.author}</span>
                      </div>
                      <button onClick={() => deleteExpertArticle(article.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link List */}
            <div className="space-y-3 pt-6 border-t border-soil-200 dark:border-night-700">
              <h4 className="text-xs font-bold text-soil-500 uppercase mb-2">Active Invite Links</h4>
              {guestLinks.map((link) => (<div key={link.id} className={`p-4 rounded-xl border ${link.status==='Active'?'bg-white dark:bg-night-800':'bg-red-50 dark:bg-red-900/10'} flex justify-between items-center`}><div><div className="text-sm font-mono text-soil-600 dark:text-soil-300 truncate">{link.url}</div></div><div className="flex space-x-2"><button onClick={()=>toggleLinkStatus(link.id)} className="p-2 hover:bg-soil-100 rounded-lg">{link.status==='Active'?<Pause className="w-4 h-4"/>:<Play className="w-4 h-4"/>}</button><button onClick={()=>deleteLink(link.id)} className="p-2 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 className="w-4 h-4"/></button></div></div>))}
            </div>
          </div>
        )}

        {/* 4. SEO SUITE */}
        {activeTab === 'seo' && <SeoManager settings={seoSettings} onUpdate={setSeoSettings} />}

        {/* 5. FOUNDER EDITOR */}
        {activeTab === 'founder' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <h3 className="font-bold text-lg mb-4 text-soil-900 dark:text-soil-100">Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-soil-500 mb-1">Name</label><input className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" value={founderProfile.profile.name} onChange={(e) => updateFounderBio('name', e.target.value)} /></div>
                <div><label className="block text-xs font-bold text-soil-500 mb-1">Headline</label><input className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" value={founderProfile.profile.headline} onChange={(e) => updateFounderBio('headline', e.target.value)} /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-soil-500 mb-1">Bio</label><textarea rows={3} className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" value={founderProfile.profile.bio} onChange={(e) => updateFounderBio('bio', e.target.value)} /></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-l-4 border-leaf-500">
                <h3 className="font-bold text-leaf-600 mb-4">The Professor (Tech)</h3>
                <textarea rows={4} className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600 mb-2" value={founderProfile.halves.tech.description} onChange={(e) => updateFounderHalf('tech', 'description', e.target.value)} />
              </div>
              <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-r-4 border-soil-500">
                <h3 className="font-bold text-soil-600 mb-4">The Farmer (Soil)</h3>
                <textarea rows={4} className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600 mb-2" value={founderProfile.halves.soil.description} onChange={(e) => updateFounderHalf('soil', 'description', e.target.value)} />
              </div>
            </div>

            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-soil-900 dark:text-soil-100">Timeline</h3><button onClick={addTimelineEvent} className="text-xs bg-leaf-100 text-leaf-700 px-2 py-1 rounded hover:bg-leaf-200 flex items-center"><Plus className="w-3 h-3 mr-1" /> Add</button></div>
              <div className="space-y-4">{founderProfile.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-soil-50 dark:bg-night-900 rounded-xl relative group">
                  <button onClick={() => deleteTimelineEvent(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input className="font-bold bg-transparent border-b border-transparent focus:border-leaf-500 outline-none text-soil-900 dark:text-soil-100" value={event.role} onChange={(e) => updateTimelineEvent(idx, 'role', e.target.value)} />
                    <input className="text-right text-sm text-soil-500 bg-transparent outline-none" value={event.year} onChange={(e) => updateTimelineEvent(idx, 'year', e.target.value)} />
                    <input className="col-span-2 text-sm text-leaf-600 bg-transparent outline-none" value={event.company} onChange={(e) => updateTimelineEvent(idx, 'company', e.target.value)} />
                    <textarea className="col-span-2 text-sm text-soil-600 dark:text-soil-400 bg-transparent outline-none resize-none" value={event.desc} onChange={(e) => updateTimelineEvent(idx, 'desc', e.target.value)} />
                  </div>
                </div>
              ))}</div>
            </div>
          </div>
        )}

        {/* 6. QUIZ */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="font-bold text-lg text-soil-900 dark:text-soil-100">Questions ({quizQuestions.length})</h3><button onClick={addQuestion} className="px-4 py-2 bg-leaf-100 text-leaf-700 rounded-lg font-bold"><Plus className="w-4 h-4 mr-2" /> Add</button></div>
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
                <div className="flex justify-between mb-4"><span className="text-xs font-bold uppercase text-soil-400 bg-soil-100 px-2 py-1 rounded">Q {idx + 1}</span><button onClick={() => deleteQuestion(idx)} className="text-red-400"><Trash2 className="w-4 h-4" /></button></div>
                <input className="w-full text-lg font-bold mb-4 bg-transparent border-b border-soil-200 dark:border-night-600 outline-none text-soil-900 dark:text-soil-100" value={q.question} onChange={(e) => updateQuestion(idx, 'question', e.target.value)} />
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <input className="flex-1 p-2 text-sm bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={opt.text} onChange={(e) => updateOption(idx, optIdx, 'text', e.target.value)} />
                      <select className="p-2 text-sm bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={opt.type} onChange={(e) => updateOption(idx, optIdx, 'type', e.target.value)}><option value="vata">Vata</option><option value="pitta">Pitta</option><option value="kapha">Kapha</option></select>
                      <button onClick={() => removeOptionFromQuestion(idx, optIdx)} className="text-soil-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => addOptionToQuestion(idx)} className="text-xs text-leaf-600 font-bold mt-2 hover:underline">+ Add Option</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. BODY */}
        {activeTab === 'body' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-2">
              {Object.keys(bodyZones).map((zoneId) => (
                <button key={zoneId} onClick={() => setActiveZoneId(zoneId)} className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center ${activeZoneId === zoneId ? 'bg-leaf-600 text-white shadow-md' : 'bg-white dark:bg-night-800 text-soil-600 dark:text-soil-400'}`}><span className="font-bold capitalize">{bodyZones[zoneId].name}</span><ChevronRight className="w-4 h-4" /></button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-night-800 p-6 rounded-3xl shadow-sm border border-soil-200 dark:border-night-700">
              <h3 className="font-bold text-xl text-soil-900 dark:text-soil-100 mb-6 flex items-center"><Edit2 className="w-5 h-5 mr-2 text-leaf-500" /> Editing: {bodyZones[activeZoneId].name}</h3>
              <div className="space-y-4 mb-8">
                <div><label className="block text-xs font-bold text-soil-500 mb-1">Description</label><textarea rows={2} className="w-full p-3 rounded-xl bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" value={bodyZones[activeZoneId].description} onChange={(e) => updateZoneInfo(activeZoneId, 'description', e.target.value)} /></div>
              </div>
              <div className="border-t border-soil-100 dark:border-night-600 pt-6">
                <div className="flex justify-between items-center mb-4"><h4 className="font-bold text-soil-800 dark:text-soil-200">Symptoms</h4><button onClick={() => addSymptom(activeZoneId)} className="text-xs bg-leaf-100 text-leaf-700 px-3 py-1 rounded-full font-bold">+ Add</button></div>
                <div className="space-y-2">{bodyZones[activeZoneId].symptoms.map((s, idx) => (<div key={idx} className="flex gap-2 items-center p-2 bg-soil-50 dark:bg-night-900 rounded-lg group"><input className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-soil-800 dark:text-soil-200" value={s.name} onChange={(e) => updateSymptom(activeZoneId, idx, 'name', e.target.value)} /><select className="bg-white dark:bg-night-800 text-xs border border-soil-200 dark:border-night-700 rounded px-2 py-1 outline-none" value={s.type} onChange={(e) => updateSymptom(activeZoneId, idx, 'type', e.target.value)}><option value="common">Common</option><option value="female">Female</option><option value="male">Male</option></select><button onClick={() => removeSymptom(activeZoneId, idx)} className="text-soil-400 hover:text-red-500"><X className="w-4 h-4" /></button></div>))}</div>
              </div>
            </div>
          </div>
        )}

        {/* MODALS */}
        <AnimatePresence>
          {previewPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-night-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-soil-200 dark:border-night-700 flex justify-between items-center sticky top-0 bg-white dark:bg-night-900 z-10"><h3 className="font-bold text-xl text-soil-900 dark:text-soil-100">Reviewing: {previewPost.title}</h3><button onClick={() => setPreviewPost(null)} className="p-2 hover:bg-soil-100 dark:hover:bg-night-800 rounded-full"><X className="w-6 h-6" /></button></div>
                <div className="p-8"><div className="prose dark:prose-invert max-w-none"><p className="text-lg leading-relaxed">{previewPost.content}</p></div></div>
                <div className="p-6 border-t border-soil-200 dark:border-night-700 flex justify-end space-x-3 bg-soil-50 dark:bg-night-950"><button onClick={() => setPreviewPost(null)} className="px-6 py-3 rounded-xl font-bold text-soil-600 hover:bg-soil-200 dark:text-soil-300">Close</button><button onClick={() => approvePost(previewPost.id, previewPost.title)} className="px-6 py-3 bg-leaf-600 text-white rounded-xl font-bold shadow-lg hover:bg-leaf-700">Approve & Publish</button></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {publishedUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-night-800 p-8 rounded-3xl shadow-2xl max-w-md text-center border-4 border-leaf-500">
                <div className="w-20 h-20 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-6 text-leaf-600"><Check className="w-10 h-10" /></div>
                <h3 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2">Published Successfully!</h3>
                <div className="flex items-center space-x-2 bg-soil-100 dark:bg-night-900 p-3 rounded-xl border border-soil-200 dark:border-night-700 mb-6"><input readOnly value={publishedUrl} className="bg-transparent flex-1 text-sm font-mono text-soil-600 dark:text-soil-300 outline-none" /><button onClick={() => navigator.clipboard.writeText(publishedUrl)} className="p-2 hover:bg-white dark:hover:bg-night-800 rounded-lg text-leaf-600"><Copy className="w-4 h-4" /></button></div>
                <div className="flex space-x-3"><button onClick={() => setPublishedUrl(null)} className="flex-1 py-3 bg-soil-200 dark:bg-night-700 text-soil-800 dark:text-soil-200 rounded-xl font-bold hover:opacity-90">Close</button></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}