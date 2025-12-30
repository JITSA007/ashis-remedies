import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    navigate('/remedies'); // Redirect to protected area
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-soil-50 dark:bg-night-900">
      <div className="w-full max-w-md bg-white dark:bg-night-800 p-8 rounded-3xl shadow-xl border border-soil-200 dark:border-night-700">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-leaf-100 dark:bg-leaf-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-leaf-600 dark:text-leaf-400">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-soil-900 dark:text-soil-100">Welcome Back</h2>
          <p className="text-soil-500 dark:text-soil-400 mt-2">Enter the sanctuary of wellness.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-soil-700 dark:text-soil-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-night-600 bg-transparent focus:ring-2 focus:ring-leaf-500 outline-none text-soil-900 dark:text-soil-100"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? 'Unlocking...' : 'Login'}
            {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-soil-500 dark:text-soil-400">
          New to Ashi's Remedies?{' '}
          <Link to="/signup" className="text-leaf-600 font-bold hover:underline">
            Create an Account
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-soil-100 dark:border-night-700 text-center text-xs text-soil-400">
          <p>Admin Login: admin@ashi.com / admin123</p>
        </div>
      </div>
    </div>
  );
}