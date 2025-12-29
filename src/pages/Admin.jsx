import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { read, utils } from 'xlsx';
import { 
  Lock, Upload, FileSpreadsheet, Users, Link as LinkIcon, 
  Check, AlertCircle, LayoutDashboard, UserCircle, 
  FileQuestion, Activity, Save, Plus, Trash2, Edit2, X, ChevronRight, Download, Globe, Eye, Pause, Play, PenTool,
  Search, Share2, Settings, ExternalLink, Copy, MessageSquare
} from 'lucide-react';

// Import Data Sources (Real Data)
import founderDataRaw from '../data/founder.json';
import quizDataRaw from '../data/quiz.json';
import bodyZonesDataRaw from '../data/body_zones.json';
import remediesDataRaw from '../data/remedies.json';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- 1. DATA STATES ---
  const [remedies, setRemedies] = useState(remediesDataRaw);
  const [isManualRemedy, setIsManualRemedy] = useState(false);
  const [newRemedy, setNewRemedy] = useState({
    title: '', description: '', ingredients: '', preparation: '', symptoms: ''
  });
  
  // Guest System States
  const [guestLinks, setGuestLinks] = useState([
    { id: 1709123, token: 'demo-token', url: `${window.location.origin}/guest-editor/demo-token`, status: 'Active', created: '2024-01-15' }
  ]);
  const [pendingReviews, setPendingReviews] = useState([
    { 
      id: 1, 
      title: 'Healing with Tulsi', 
      author: 'Dr. A. Sharma', 
      date: '2024-01-20', 
      status: 'Pending',
      content: "Tulsi, or Holy Basil, is considered the Queen of Herbs in Ayurveda. It balances Vata and Kapha doshas..." 
    }
  ]);
  const [previewPost, setPreviewPost] = useState(null); // For Modal
  const [publishedUrl, setPublishedUrl] = useState(null); // For Success Popup

  // Editable Data States
  const [founderProfile, setFounderProfile] = useState(founderDataRaw);
  const [quizQuestions, setQuizQuestions] = useState(quizDataRaw);
  const [bodyZones, setBodyZones] = useState(bodyZonesDataRaw);
  const [activeZoneId, setActiveZoneId] = useState('head'); // For Body Map Editor
  
  // --- SEO STATE ---
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
    // 1. Save SEO to Storage (Simulating DB persist)
    localStorage.setItem('site_seo_config', JSON.stringify(seoSettings));
    document.title = `${seoSettings.siteTitle} ${seoSettings.titleSeparator} ${seoSettings.tagline}`;
    
    // 2. Log other data states to console to simulate saving
    console.log("--- SYSTEM SAVE ---");
    console.log("Remedies Count:", remedies.length);
    console.log("Quiz Questions:", quizQuestions);
    console.log("Body Zones:", bodyZones);
    
    showNotification("System State Saved Successfully!");
  };

  // --- HELPER: DOWNLOAD TEMPLATES ---
  const downloadTemplate = (type) => {
    let headers = "";
    let filename = "";
    let content = "";

    if (type === 'remedies') {
      headers = "Title,Description,Symptoms (comma sep),Ingredients (comma sep),Preparation (step1;step2),Tradition Note,Science Note\n";
      content = "Golden Milk,Immunity booster,Cough;Cold,Turmeric;Milk,Heat milk;Add turmeric,Balances Vata,Anti-inflammatory";
      filename = "remedies_template.csv";
    } else if (type === 'quiz') {
      headers = "Question,Category,Option1 Text,Option1 Type,Option2 Text,Option2 Type,Option3 Text,Option3 Type\n";
      content = "Sleep pattern?,Lifestyle,Light,vata,Sound,pitta,Deep,kapha";
      filename = "quiz_template.csv";
    }

    const blob = new Blob([headers + content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // --- AUTHENTICATION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  // --- 1. REMEDIES LOGIC ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);
    
    const formatted = jsonData.map((row, i) => ({
      id: `imported_${Date.now()}_${i}`,
      title: row.Title || "Untitled",
      description: row.Description || "",
      symptoms: row["Symptoms (comma sep)"]?.split(';') || [],
      ingredients: row["Ingredients (comma sep)"]?.split(';') || [],
      preparation: row["Preparation (step1;step2)"]?.split(';') || [],
      tradition: row["Tradition Note"],
      science: row["Science Note"]
    }));

    setRemedies([...remedies, ...formatted]);
    showNotification(`Imported ${formatted.length} remedies.`);
  };

  const addManualRemedy = () => {
    const remedy = {
      id: `manual_${Date.now()}`,
      title: newRemedy.title,
      description: newRemedy.description,
      symptoms: newRemedy.symptoms.split(',').map(s => s.trim()),
      ingredients: newRemedy.ingredients.split(',').map(s => s.trim()),
      preparation: newRemedy.preparation.split(';').map(s => s.trim())
    };
    setRemedies([remedy, ...remedies]);
    setNewRemedy({ title: '', description: '', ingredients: '', preparation: '', symptoms: '' });
    setIsManualRemedy(false);
    showNotification("New Remedy Added!");
  };

  // --- 2. GUEST SYSTEM LOGIC ---
  const generateLink = () => {
    const token = Math.random().toString(36).substring(7);
    const newLink = {
      id: Date.now(),
      token: token,
      url: `${window.location.origin}/guest-editor/${token}`,
      status: 'Active',
      created: new Date().toLocaleDateString()
    };
    setGuestLinks([newLink, ...guestLinks]); 
    showNotification('New Guest Link Generated');
  };

  const toggleLinkStatus = (id) => {
    setGuestLinks(guestLinks.map(link => 
      link.id === id ? { ...link, status: link.status === 'Active' ? 'Paused' : 'Active' } : link
    ));
  };

  const deleteLink = (id) => {
    setGuestLinks(guestLinks.filter(link => link.id !== id));
    showNotification('Link deleted');
  };

  const openPreview = (post) => {
    setPreviewPost(post);
  };

  const approvePost = (id, title) => {
    setPendingReviews(pendingReviews.filter(p => p.id !== id));
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const finalUrl = `${window.location.origin}/blog/${slug}`;
    setPublishedUrl(finalUrl);
    setPreviewPost(null);
  };

  // --- 3. FOUNDER EDITOR LOGIC ---
  const updateFounderBio = (field, value) => {
    setFounderProfile({
      ...founderProfile,
      profile: { ...founderProfile.profile, [field]: value }
    });
  };

  const addTimelineEvent = () => {
    const newEvent = { year: "2024", role: "New Role", company: "Company", desc: "Description" };
    setFounderProfile({
      ...founderProfile,
      timeline: [newEvent, ...founderProfile.timeline]
    });
  };

  const deleteTimelineEvent = (idx) => {
    const newTimeline = [...founderProfile.timeline];
    newTimeline.splice(idx, 1);
    setFounderProfile({ ...founderProfile, timeline: newTimeline });
  };

  // --- 4. QUIZ EDITOR LOGIC ---
  const handleQuizUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);
    
    const newQuestions = jsonData.map((row, idx) => ({
      id: Date.now() + idx,
      question: row.Question || "Untitled",
      category: row.Category || "General",
      options: [
        { text: row["Option1 Text"], type: row["Option1 Type"] },
        { text: row["Option2 Text"], type: row["Option2 Type"] },
        { text: row["Option3 Text"], type: row["Option3 Type"] }
      ],
      allowOther: false
    }));

    setQuizQuestions([...quizQuestions, ...newQuestions]);
    showNotification(`Imported ${newQuestions.length} questions.`);
  };

  const addQuestion = () => {
    const newQ = {
      id: Date.now(),
      question: "New Question?",
      category: "General",
      options: [{ text: "Option A", type: "vata" }, { text: "Option B", type: "pitta" }],
      allowOther: false
    };
    setQuizQuestions([...quizQuestions, newQ]);
  };

  const updateQuestion = (idx, field, value) => {
    const updated = [...quizQuestions];
    updated[idx] = { ...updated[idx], [field]: value };
    setQuizQuestions(updated);
  };

  const deleteQuestion = (idx) => {
    const updated = [...quizQuestions];
    updated.splice(idx, 1);
    setQuizQuestions(updated);
  };

  // **Option Level Editing**
  const updateOption = (qIdx, optIdx, field, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[qIdx].options[optIdx][field] = value;
    setQuizQuestions(updatedQuestions);
  };

  const addOptionToQuestion = (qIdx) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[qIdx].options.push({ text: "New Option", type: "vata" });
    setQuizQuestions(updatedQuestions);
  };

  const removeOptionFromQuestion = (qIdx, optIdx) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[qIdx].options.splice(optIdx, 1);
    setQuizQuestions(updatedQuestions);
  };

  // --- 5. BODY ZONE EDITOR LOGIC ---
  const updateZoneInfo = (id, field, value) => {
    setBodyZones({ ...bodyZones, [id]: { ...bodyZones[id], [field]: value } });
  };

  const addSymptom = (zoneId) => {
    const newSymptom = { name: "New Symptom", type: "common" };
    const updatedZone = { ...bodyZones[zoneId], symptoms: [...bodyZones[zoneId].symptoms, newSymptom] };
    setBodyZones({ ...bodyZones, [zoneId]: updatedZone });
  };

  const removeSymptom = (zoneId, idx) => {
    const newSymptoms = [...bodyZones[zoneId].symptoms];
    newSymptoms.splice(idx, 1);
    setBodyZones({ ...bodyZones, [zoneId]: { ...bodyZones[zoneId], symptoms: newSymptoms } });
  };

  const updateSymptom = (zoneId, idx, field, value) => {
    const newSymptoms = [...bodyZones[zoneId].symptoms];
    newSymptoms[idx] = { ...newSymptoms[idx], [field]: value };
    setBodyZones({ ...bodyZones, [zoneId]: { ...bodyZones[zoneId], symptoms: newSymptoms } });
  };


  // --- VIEW: LOGIN ---
  if (!isAuthenticated) {
    return (
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
  }

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
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

        {/* --- 1. DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
              <div className="text-soil-500 text-sm">Total Remedies</div>
              <div className="text-3xl font-bold text-soil-900 dark:text-soil-100">{remedies.length}</div>
            </div>
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
              <div className="text-soil-500 text-sm">Pending Reviews</div>
              <div className="text-3xl font-bold text-orange-500">{pendingReviews.length}</div>
            </div>
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
              <div className="text-soil-500 text-sm">SEO Health</div>
              <div className="text-3xl font-bold text-leaf-600">Active</div>
            </div>
          </div>
        )}

        {/* --- 2. REMEDIES MANAGER --- */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsManualRemedy(!isManualRemedy)} className={`flex items-center px-4 py-2 text-sm rounded-lg font-bold border transition-colors ${isManualRemedy ? 'bg-soil-200 text-soil-800 border-soil-300' : 'bg-white dark:bg-night-800 text-leaf-600 border-leaf-200'}`}><PenTool className="w-4 h-4 mr-2" /> {isManualRemedy ? "Cancel Manual" : "Add Manually"}</button>
              <button onClick={() => downloadTemplate('remedies')} className="flex items-center px-4 py-2 text-sm bg-white dark:bg-night-800 border border-soil-300 dark:border-night-600 rounded-lg text-soil-600 dark:text-soil-300 hover:bg-soil-50 dark:hover:bg-night-700"><Download className="w-4 h-4 mr-2" /> Template</button>
            </div>
            
            {isManualRemedy ? (
              <div className="bg-white dark:bg-night-800 p-6 rounded-3xl border border-soil-200 dark:border-night-700 space-y-4">
                <h3 className="text-xl font-bold text-soil-900 dark:text-soil-100 mb-4">New Remedy Details</h3>
                <input className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Remedy Title" value={newRemedy.title} onChange={e => setNewRemedy({...newRemedy, title: e.target.value})} />
                <textarea className="w-full p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Description" value={newRemedy.description} onChange={e => setNewRemedy({...newRemedy, description: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input className="p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Symptoms (comma sep)" value={newRemedy.symptoms} onChange={e => setNewRemedy({...newRemedy, symptoms: e.target.value})} />
                  <input className="p-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent" placeholder="Ingredients (comma sep)" value={newRemedy.ingredients} onChange={e => setNewRemedy({...newRemedy, ingredients: e.target.value})} />
                </div>
                <button onClick={addManualRemedy} className="w-full py-3 bg-leaf-600 text-white rounded-xl font-bold hover:bg-leaf-700">Save to Database</button>
              </div>
            ) : (
              <div className="bg-white dark:bg-night-800 p-8 rounded-3xl border border-dashed border-soil-300 dark:border-night-600 text-center max-w-2xl mx-auto">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-leaf-500 mb-4" />
                <h3 className="text-xl font-bold text-soil-900 dark:text-soil-100 mb-2">Upload Remedies Excel</h3>
                <div className="relative inline-block"><button className="px-6 py-3 bg-soil-900 dark:bg-soil-100 text-white dark:text-night-900 rounded-xl font-bold flex items-center"><Upload className="w-5 h-5 mr-2" />Select File</button><input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" /></div>
              </div>
            )}

            {/* Remedies Preview */}
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <h4 className="font-bold text-soil-500 mb-4">Database ({remedies.length})</h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {remedies.map((r, i) => (
                  <div key={i} className="flex justify-between p-3 border-b border-soil-100 dark:border-night-700">
                    <span className="font-medium text-soil-800 dark:text-soil-200">{r.title}</span>
                    <span className="text-xs text-soil-400">{r.ingredients && r.ingredients.length} ingredients</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 3. GUEST SYSTEM --- */}
        {activeTab === 'guests' && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-soil-900 dark:text-soil-100">Guest Access Control</h3>
              <button onClick={generateLink} className="px-4 py-2 bg-leaf-600 text-white rounded-lg font-bold hover:bg-leaf-700 flex items-center"><Plus className="w-4 h-4 mr-2" /> Create Invite Link</button>
            </div>

            {/* Pending Reviews */}
            {pendingReviews.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Pending Reviews ({pendingReviews.length})</h3>
                <div className="space-y-3">
                  {pendingReviews.map(review => (
                    <div key={review.id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-white dark:bg-night-800 rounded-xl shadow-sm gap-4">
                      <div>
                        <div className="font-bold text-soil-900 dark:text-soil-100">{review.title}</div>
                        <div className="text-xs text-soil-500">by {review.author} • {review.date}</div>
                      </div>
                      <div className="flex space-x-3">
                        <button onClick={() => openPreview(review)} className="px-4 py-2 bg-soil-100 dark:bg-night-700 text-soil-700 dark:text-soil-300 rounded-lg text-sm font-bold flex items-center"><Eye className="w-4 h-4 mr-2" /> Preview</button>
                        <button onClick={() => approvePost(review.id, review.title)} className="px-4 py-2 bg-leaf-600 text-white rounded-lg text-sm font-bold flex items-center"><Check className="w-4 h-4 mr-2" /> Publish</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link List */}
            <div className="space-y-3">
              {guestLinks.map((link) => (
                <div key={link.id} className={`p-4 rounded-xl border ${link.status === 'Active' ? 'bg-white dark:bg-night-800 border-soil-200 dark:border-night-700' : 'bg-red-50 dark:bg-red-900/10 border-red-200'} flex justify-between items-center`}>
                  <div className="truncate flex-1 mr-4">
                    <div className="text-sm font-mono text-soil-600 dark:text-soil-300 truncate">{link.url}</div>
                    <div className="text-xs text-soil-400 mt-1">Created: {link.created}</div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${link.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{link.status}</span>
                    <button onClick={() => toggleLinkStatus(link.id)} className="p-2 hover:bg-soil-100 rounded-lg">{link.status === 'Active' ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}</button>
                    <button onClick={() => deleteLink(link.id)} className="p-2 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. SEO SUITE --- */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
            <div className="space-y-6">
              <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
                <h3 className="font-bold text-lg mb-4 flex items-center"><Search className="w-5 h-5 mr-2 text-leaf-500"/> Global Metadata</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-soil-500 block mb-1">Site Title</label><input className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={seoSettings.siteTitle} onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-soil-500 block mb-1">Tagline</label><input className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={seoSettings.tagline} onChange={(e) => setSeoSettings({...seoSettings, tagline: e.target.value})} /></div>
                  </div>
                  <div><label className="text-xs font-bold text-soil-500 block mb-1">Meta Description</label><textarea rows={3} className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={seoSettings.metaDescription} onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})} /></div>
                </div>
              </div>
              <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
                <h3 className="font-bold text-lg mb-4 flex items-center"><Share2 className="w-5 h-5 mr-2 text-blue-500"/> Social Media</h3>
                <div className="space-y-4">
                  <div><label className="text-xs font-bold text-soil-500 block mb-1">OG Image URL</label><div className="flex gap-2"><input className="flex-1 p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600" value={seoSettings.ogImage} onChange={(e) => setSeoSettings({...seoSettings, ogImage: e.target.value})} /><div className="w-10 h-10 rounded bg-gray-100 overflow-hidden"><img src={seoSettings.ogImage} alt="Preview" className="w-full h-full object-cover" /></div></div></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Google Search Preview</h4>
                <div className="font-sans">
                  <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">{seoSettings.siteTitle} {seoSettings.titleSeparator} {seoSettings.tagline}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{seoSettings.metaDescription}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. FOUNDER EDITOR (Restored) --- */}
        {activeTab === 'founder' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <h3 className="font-bold text-lg mb-4 text-soil-900 dark:text-soil-100">Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-soil-500 mb-1">Full Name</label><input type="text" value={founderProfile.profile.name} onChange={(e) => updateFounderBio('name', e.target.value)} className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-soil-500 mb-1">Bio</label><textarea rows={3} value={founderProfile.profile.bio} onChange={(e) => updateFounderBio('bio', e.target.value)} className="w-full p-2 rounded-lg bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" /></div>
              </div>
            </div>
            <div className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-soil-900 dark:text-soil-100">Timeline</h3><button onClick={addTimelineEvent} className="text-xs bg-leaf-100 text-leaf-700 px-2 py-1 rounded hover:bg-leaf-200 flex items-center"><Plus className="w-3 h-3 mr-1" /> Add Event</button></div>
              <div className="space-y-4">
                {founderProfile.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-soil-50 dark:bg-night-900 rounded-xl relative group">
                    <button onClick={() => deleteTimelineEvent(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input className="font-bold bg-transparent border-b border-transparent focus:border-leaf-500 outline-none text-soil-900 dark:text-soil-100" value={event.role} onChange={(e) => { const newT = [...founderProfile.timeline]; newT[idx].role = e.target.value; setFounderProfile({...founderProfile, timeline: newT}); }} />
                      <input className="text-right text-sm text-soil-500 bg-transparent outline-none" value={event.year} onChange={(e) => { const newT = [...founderProfile.timeline]; newT[idx].year = e.target.value; setFounderProfile({...founderProfile, timeline: newT}); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 6. QUIZ EDITOR (Restored & Fixed) --- */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl space-y-8">
            <div className="bg-soil-50 dark:bg-night-800 p-6 rounded-2xl border-2 border-dashed border-soil-300 dark:border-night-600 flex justify-between items-center">
              <div><h3 className="font-bold text-soil-900 dark:text-soil-100">Import Questions</h3></div>
              <div className="flex space-x-3"><button onClick={() => downloadTemplate('quiz')} className="flex items-center px-4 py-2 text-xs bg-white dark:bg-night-900 border border-soil-300 dark:border-night-600 rounded-lg"><Download className="w-3 h-3 mr-2" /> Sample</button><div className="relative"><button className="flex items-center px-4 py-2 text-xs bg-leaf-600 text-white rounded-lg font-bold"><Upload className="w-3 h-3 mr-2" /> Upload Excel</button><input type="file" accept=".xlsx, .csv" onChange={handleQuizUpload} className="absolute inset-0 opacity-0 cursor-pointer" /></div></div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center"><h3 className="font-bold text-lg text-soil-900 dark:text-soil-100">Question Bank ({quizQuestions.length})</h3><button onClick={addQuestion} className="flex items-center px-4 py-2 bg-leaf-100 text-leaf-700 rounded-lg font-bold hover:bg-leaf-200"><Plus className="w-4 h-4 mr-2" /> Add Manual</button></div>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white dark:bg-night-800 p-6 rounded-2xl shadow-sm border border-soil-200 dark:border-night-700">
                  <div className="flex justify-between mb-4"><span className="text-xs font-bold uppercase text-soil-400 bg-soil-100 dark:bg-night-700 px-2 py-1 rounded">Question {idx + 1}</span><button onClick={() => deleteQuestion(idx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></div>
                  <input className="w-full text-lg font-bold mb-4 bg-transparent border-b border-soil-200 dark:border-night-600 focus:border-leaf-500 outline-none text-soil-900 dark:text-soil-100" value={q.question} onChange={(e) => updateQuestion(idx, 'question', e.target.value)} />
                  <div className="border-t border-soil-100 dark:border-night-600 pt-4">
                    <h4 className="text-xs font-bold text-soil-500 mb-2">Answers & Scoring</h4>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 7. BODY ZONE EDITOR (Restored) --- */}
        {activeTab === 'body' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-bold text-soil-500 uppercase tracking-widest mb-4">Select Zone</h3>
              {Object.keys(bodyZones).map((zoneId) => (
                <button key={zoneId} onClick={() => setActiveZoneId(zoneId)} className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center ${activeZoneId === zoneId ? 'bg-leaf-600 text-white shadow-md' : 'bg-white dark:bg-night-800 text-soil-600 dark:text-soil-400 hover:bg-leaf-50 dark:hover:bg-night-700'}`}><span className="font-bold capitalize">{bodyZones[zoneId].name}</span><ChevronRight className="w-4 h-4" /></button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-night-800 p-6 rounded-3xl shadow-sm border border-soil-200 dark:border-night-700">
              <h3 className="font-bold text-xl text-soil-900 dark:text-soil-100 mb-6 flex items-center"><Edit2 className="w-5 h-5 mr-2 text-leaf-500" /> Editing: {bodyZones[activeZoneId].name}</h3>
              <div className="space-y-4 mb-8">
                <div><label className="block text-xs font-bold text-soil-500 mb-1">Description</label><textarea rows={2} className="w-full p-3 rounded-xl bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-600" value={bodyZones[activeZoneId].description} onChange={(e) => updateZoneInfo(activeZoneId, 'description', e.target.value)} /></div>
              </div>
              <div className="border-t border-soil-100 dark:border-night-600 pt-6">
                <div className="flex justify-between items-center mb-4"><h4 className="font-bold text-soil-800 dark:text-soil-200">Symptoms & Ailments</h4><button onClick={() => addSymptom(activeZoneId)} className="text-xs bg-leaf-100 text-leaf-700 px-3 py-1 rounded-full hover:bg-leaf-200 font-bold">+ Add Symptom</button></div>
                <div className="space-y-2">
                  {bodyZones[activeZoneId].symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex gap-2 items-center p-2 bg-soil-50 dark:bg-night-900 rounded-lg group">
                      <input className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-soil-800 dark:text-soil-200" value={symptom.name} onChange={(e) => updateSymptom(activeZoneId, idx, 'name', e.target.value)} />
                      <select className="bg-white dark:bg-night-800 text-xs border border-soil-200 dark:border-night-700 rounded px-2 py-1 outline-none" value={symptom.type} onChange={(e) => updateSymptom(activeZoneId, idx, 'type', e.target.value)}><option value="common">Common</option><option value="female">Female</option><option value="male">Male</option></select>
                      <button onClick={() => removeSymptom(activeZoneId, idx)} className="text-soil-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODALS --- */}
        <AnimatePresence>
          {previewPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-night-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-soil-200 dark:border-night-700 flex justify-between items-center sticky top-0 bg-white dark:bg-night-900 z-10">
                  <h3 className="font-bold text-xl text-soil-900 dark:text-soil-100">Reviewing: {previewPost.title}</h3>
                  <button onClick={() => setPreviewPost(null)} className="p-2 hover:bg-soil-100 dark:hover:bg-night-800 rounded-full"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-8">
                  <div className="mb-6 flex items-center space-x-3 text-sm text-soil-500">
                    <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-700 font-bold">{previewPost.author[0]}</div>
                    <div><p className="font-bold text-soil-900 dark:text-soil-100">{previewPost.author}</p><p>{previewPost.date}</p></div>
                  </div>
                  <div className="prose dark:prose-invert max-w-none"><p className="text-lg leading-relaxed">{previewPost.content}</p></div>
                </div>
                <div className="p-6 border-t border-soil-200 dark:border-night-700 flex justify-end space-x-3 bg-soil-50 dark:bg-night-950">
                  <button onClick={() => setPreviewPost(null)} className="px-6 py-3 rounded-xl font-bold text-soil-600 hover:bg-soil-200 dark:text-soil-300">Close</button>
                  <button onClick={() => approvePost(previewPost.id, previewPost.title)} className="px-6 py-3 bg-leaf-600 text-white rounded-xl font-bold shadow-lg hover:bg-leaf-700">Approve & Publish</button>
                </div>
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
                <p className="text-soil-600 dark:text-soil-300 mb-6">The article is now live on your blog.</p>
                <div className="flex items-center space-x-2 bg-soil-100 dark:bg-night-900 p-3 rounded-xl border border-soil-200 dark:border-night-700 mb-6"><input readOnly value={publishedUrl} className="bg-transparent flex-1 text-sm font-mono text-soil-600 dark:text-soil-300 outline-none" /><button onClick={() => navigator.clipboard.writeText(publishedUrl)} className="p-2 hover:bg-white dark:hover:bg-night-800 rounded-lg text-leaf-600"><Copy className="w-4 h-4" /></button></div>
                <div className="flex space-x-3"><button onClick={() => setPublishedUrl(null)} className="flex-1 py-3 bg-soil-200 dark:bg-night-700 text-soil-800 dark:text-soil-200 rounded-xl font-bold hover:opacity-90">Close</button><a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-leaf-600 text-white rounded-xl font-bold hover:bg-leaf-700 flex items-center justify-center">View Post <ExternalLink className="w-4 h-4 ml-2" /></a></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}