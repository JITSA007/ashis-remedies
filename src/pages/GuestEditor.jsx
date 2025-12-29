import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenTool, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function GuestEditor() {
  const { token } = useParams(); // Grabs the "xyz" from /guest-editor/xyz
  const [status, setStatus] = useState('writing'); // writing, submitting, success
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  // Mock Validation: In a real app, we would check the server if this token is valid
  const isValidToken = token && token.length > 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate network delay
    setTimeout(() => {
      setStatus('success');
      // Here we would send formData to the backend
      console.log('Blog Post Submitted:', formData);
    }, 1500);
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100">Invalid or Expired Link</h2>
        <p className="text-soil-600 mt-2">Please ask the administrator for a new invite.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-soil-50 dark:bg-night-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center space-x-3">
          <div className="p-2 bg-leaf-100 dark:bg-night-800 rounded-lg text-leaf-600 dark:text-leaf-400">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-soil-900 dark:text-soil-100">
              Guest Contributor Portal
            </h1>
            <p className="text-sm text-soil-500 font-mono">Session Token: {token}</p>
          </div>
        </div>

        {/* Success State */}
        {status === 'success' ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 dark:bg-night-800 border border-green-200 dark:border-green-900 rounded-3xl p-8 text-center"
          >
            <div className="inline-block p-4 bg-green-100 rounded-full text-green-600 mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-soil-900 dark:text-soil-100 mb-2">Submission Received!</h2>
            <p className="text-soil-600 dark:text-soil-300">
              Thank you for your contribution. The admin team will review your article shortly.
            </p>
          </motion.div>
        ) : (
          /* Writing Form */
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-night-800 rounded-3xl p-8 shadow-sm border border-soil-100 dark:border-night-700 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2">
                Article Title
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-soil-300 dark:border-night-600 bg-soil-50 dark:bg-night-900 text-soil-900 dark:text-soil-100 focus:ring-2 focus:ring-leaf-500 outline-none transition-all"
                placeholder="e.g., The Healing Power of Ashwagandha"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2">
                Author Name
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-soil-300 dark:border-night-600 bg-soil-50 dark:bg-night-900 text-soil-900 dark:text-soil-100 focus:ring-2 focus:ring-leaf-500 outline-none transition-all"
                placeholder="Dr. Jane Doe"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2">
                Content
              </label>
              <textarea
                required
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-soil-300 dark:border-night-600 bg-soil-50 dark:bg-night-900 text-soil-900 dark:text-soil-100 focus:ring-2 focus:ring-leaf-500 outline-none transition-all"
                placeholder="Share your Ayurvedic knowledge here..."
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-8 py-3 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

      </div>
    </div>
  );
}