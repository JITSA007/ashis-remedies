import { Link } from 'react-router-dom';
import { Map, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soil-50 dark:bg-night-900 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-24 h-24 bg-soil-200 dark:bg-night-800 rounded-full flex items-center justify-center mx-auto text-soil-500">
          <Map className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-soil-900 dark:text-soil-100">Lost in the Woods?</h1>
        <p className="text-soil-600 dark:text-soil-400 text-lg">
          The path you are looking for has been overgrown or does not exist.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl font-bold transition-all"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
}