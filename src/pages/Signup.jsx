import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Check, Sparkles } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signup(formData.name, formData.email, formData.password, selectedPlan);
    navigate('/remedies');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-soil-50 dark:bg-night-900">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-soil-900 dark:text-soil-100 mb-2">Join the Circle</h1>
        <p className="text-soil-600 dark:text-soil-400">Start your journey to holistic health today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* Left: Form */}
        <div className="bg-white dark:bg-night-800 p-8 rounded-3xl shadow-xl border border-soil-200 dark:border-night-700 h-fit">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-1">Full Name</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent outline-none focus:ring-2 focus:ring-leaf-500 text-soil-900 dark:text-soil-100"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-1">Email</label>
              <input 
                required type="email"
                className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent outline-none focus:ring-2 focus:ring-leaf-500 text-soil-900 dark:text-soil-100"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-1">Password</label>
              <input 
                required type="password"
                className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent outline-none focus:ring-2 focus:ring-leaf-500 text-soil-900 dark:text-soil-100"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-3">Select Your Plan</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setSelectedPlan('free')}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${selectedPlan === 'free' ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-900/20' : 'border-soil-200 dark:border-night-600 opacity-60'}`}
                >
                  <div className="font-bold text-lg text-soil-900 dark:text-soil-100">Free</div>
                  <div className="text-xs text-soil-500">Basic Access</div>
                </div>
                <div 
                  onClick={() => setSelectedPlan('pro')}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden ${selectedPlan === 'pro' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-soil-200 dark:border-night-600 opacity-60'}`}
                >
                  <div className="absolute top-0 right-0 bg-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg text-white">RECOMMENDED</div>
                  <div className="font-bold text-lg text-soil-900 dark:text-soil-100 flex items-center">Pro <Sparkles className="w-3 h-3 ml-1 text-amber-500" /></div>
                  <div className="text-xs text-soil-500">Full Access</div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl shadow-lg mt-4 disabled:opacity-50">
              {isSubmitting ? 'Creating Account...' : 'Complete Signup'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-soil-500">
            Already have an account? <Link to="/login" className="text-leaf-600 font-bold hover:underline">Login</Link>
          </div>
        </div>

        {/* Right: Plan Comparison */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-night-800 p-6 rounded-3xl border border-soil-200 dark:border-night-700">
            <h3 className="font-bold text-xl mb-4 text-soil-900 dark:text-soil-100">Plan Comparison</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-soil-100 dark:border-night-700 pb-2">
                <span className="text-soil-600 dark:text-soil-300">Remedy Database</span>
                <div className="flex gap-4 text-sm font-bold"><span className="text-soil-400">Basic</span><span className="text-leaf-600">Full</span></div>
              </li>
              <li className="flex items-center justify-between border-b border-soil-100 dark:border-night-700 pb-2">
                <span className="text-soil-600 dark:text-soil-300">Scientific Analysis</span>
                <div className="flex gap-4 text-sm font-bold"><span className="text-soil-400">Locked</span><span className="text-leaf-600">Unlocked</span></div>
              </li>
              <li className="flex items-center justify-between border-b border-soil-100 dark:border-night-700 pb-2">
                <span className="text-soil-600 dark:text-soil-300">Veda Lab (Alchemy)</span>
                <div className="flex gap-4 text-sm font-bold"><span className="text-soil-400">Locked</span><span className="text-leaf-600">Unlimited</span></div>
              </li>
              <li className="flex items-center justify-between border-b border-soil-100 dark:border-night-700 pb-2">
                <span className="text-soil-600 dark:text-soil-300">Vedji Clinic AI</span>
                <div className="flex gap-4 text-sm font-bold"><span className="text-soil-400">Limited</span><span className="text-leaf-600">Unlimited</span></div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}