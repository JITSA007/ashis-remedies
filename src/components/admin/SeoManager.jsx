import { Search, Share2, Settings, Eye } from 'lucide-react';

export default function SeoManager({ settings, onUpdate }) {
  
  const handleChange = (field, value) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
      {/* Left: Settings Inputs */}
      <div className="space-y-6">
        
        {/* Global Metadata */}
        <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
          <h3 className="font-bold text-lg mb-4 flex items-center text-soil-900 dark:text-soil-100">
            <Search className="w-5 h-5 mr-2 text-leaf-500"/> Global Metadata
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-soil-500 block mb-1">Site Title</label>
                <input 
                  className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100" 
                  value={settings.siteTitle} 
                  onChange={(e) => handleChange('siteTitle', e.target.value)} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-soil-500 block mb-1">Separator</label>
                <input 
                  className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100" 
                  value={settings.titleSeparator} 
                  onChange={(e) => handleChange('titleSeparator', e.target.value)} 
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-soil-500 block mb-1">Tagline</label>
              <input 
                className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100" 
                value={settings.tagline} 
                onChange={(e) => handleChange('tagline', e.target.value)} 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-soil-500 block mb-1">Meta Description</label>
              <textarea 
                rows={3} 
                className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100" 
                value={settings.metaDescription} 
                onChange={(e) => handleChange('metaDescription', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
          <h3 className="font-bold text-lg mb-4 flex items-center text-soil-900 dark:text-soil-100">
            <Share2 className="w-5 h-5 mr-2 text-blue-500"/> Social Media
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-soil-500 block mb-1">OG Image URL</label>
              <div className="flex gap-2">
                <input 
                  className="flex-1 p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100" 
                  value={settings.ogImage} 
                  onChange={(e) => handleChange('ogImage', e.target.value)} 
                />
                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden border border-soil-200">
                  <img src={settings.ogImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white dark:bg-night-800 p-6 rounded-2xl border border-soil-200 dark:border-night-700">
          <h3 className="font-bold text-lg mb-4 flex items-center text-soil-900 dark:text-soil-100">
            <Settings className="w-5 h-5 mr-2 text-gray-500"/> Advanced
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-soil-500 block mb-1">Robots.txt</label>
              <select 
                className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 outline-none text-soil-900 dark:text-soil-100" 
                value={settings.robots} 
                onChange={(e) => handleChange('robots', e.target.value)}
              >
                <option value="index, follow">Index, Follow</option>
                <option value="noindex, nofollow">No Index (Hidden)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-soil-500 block mb-1">JSON-LD Type</label>
              <select 
                className="w-full p-2 bg-soil-50 dark:bg-night-900 rounded border border-soil-200 dark:border-night-600 outline-none text-soil-900 dark:text-soil-100" 
                value={settings.jsonLdType} 
                onChange={(e) => handleChange('jsonLdType', e.target.value)}
              >
                <option value="Organization">Organization</option>
                <option value="Person">Person</option>
                <option value="MedicalBusiness">Medical Business</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live Previews */}
      <div className="space-y-6">
        {/* Google Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Google Search Preview</h4>
          <div className="font-sans">
            <div className="flex items-center text-sm text-gray-800 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs text-gray-600 font-bold">A</div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-900 font-medium">{settings.siteTitle}</span>
                <span className="text-xs text-gray-500">https://ashisremedies.com</span>
              </div>
            </div>
            <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
              {settings.siteTitle} {settings.titleSeparator} {settings.tagline}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {settings.metaDescription || "No description provided."}
            </p>
          </div>
        </div>

        {/* Social Preview */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Facebook / Social Share</h4>
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden max-w-sm mx-auto shadow-sm">
            <div className="h-40 bg-gray-200 overflow-hidden relative">
              {settings.ogImage ? (
                <img src={settings.ogImage} className="w-full h-full object-cover" alt="OG" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><Eye className="w-8 h-8"/></div>
              )}
            </div>
            <div className="p-3 bg-[#f0f2f5] border-t border-gray-200">
              <div className="text-xs text-gray-500 uppercase font-bold">ASHISREMEDIES.COM</div>
              <div className="font-bold text-gray-900 leading-tight my-1 truncate">
                {settings.siteTitle}: {settings.tagline}
              </div>
              <div className="text-xs text-gray-600 line-clamp-1">
                {settings.metaDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}