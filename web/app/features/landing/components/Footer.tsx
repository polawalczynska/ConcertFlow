import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-main to-purple-dark rounded-lg flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">ConcertFlow</span>
              <p className="text-sm text-slate-500">Perfect concerts, seamless workflow.</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link to="/login" className="text-sm hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 ConcertFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
