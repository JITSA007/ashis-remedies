import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const phoneNumber = "919664301637";
    const encodedMessage = encodeURIComponent(message || "Hello, I am interested in Ashi's Remedies.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-soil-200 dark:border-night-700 w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold text-sm">Chat with Vedji</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSend} className="p-4">
              <p className="text-xs text-soil-500 dark:text-soil-400 mb-3">
                Hi there! 👋 How can we help you with your health today?
              </p>
              <textarea
                autoFocus
                rows="3"
                className="w-full p-3 text-sm bg-soil-50 dark:bg-night-900 border border-soil-200 dark:border-night-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-soil-900 dark:text-soil-100 placeholder-soil-400"
                placeholder="I have a question about..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full mt-3 py-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" /> Start Chat
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1da851] rounded-full shadow-lg flex items-center justify-center text-white transition-colors relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </motion.button>

    </div>
  );
}