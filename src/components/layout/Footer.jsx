import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-soil-100 dark:bg-night-800 border-t border-soil-200 dark:border-night-700 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-leaf-500" />
              <span className="font-serif font-bold text-lg text-soil-900 dark:text-soil-100">
                Ashi's Remedies
              </span>
            </div>
            <p className="text-sm text-soil-600 dark:text-soil-400 leading-relaxed">
              Bridging the gap between ancient wisdom and modern science. 
              Founded by Jitendra Prajapat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-soil-900 dark:text-soil-100 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-soil-600 dark:text-soil-400">
              <li><a href="/remedies" className="hover:text-leaf-500">Remedy Database</a></li>
              <li><a href="/veda-lab" className="hover:text-leaf-500">Veda Lab</a></li>
              <li><a href="/founder" className="hover:text-leaf-500">About Founder</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-soil-900 dark:text-soil-100 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-soil-600 dark:text-soil-400">
              <li>Jaipur, Rajasthan, India</li>
              <li>jitsahere@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-soil-200 dark:border-night-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-soil-500 dark:text-soil-500">
          <p>&copy; {new Date().getFullYear()} Ashi's Remedies. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-3 w-3 text-red-400 mx-1 fill-current" /> and Code
          </p>
        </div>
      </div>
    </footer>
  );
}