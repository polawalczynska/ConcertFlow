import { Link } from "@remix-run/react";
import { Music2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-slate-800">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ConcertFlow</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-white transition-colors">
              Get Started
            </Link>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for concert professionals
          </p>
          <p>&copy; 2026 ConcertFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
