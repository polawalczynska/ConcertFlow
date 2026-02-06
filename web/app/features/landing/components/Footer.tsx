import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-main to-purple-dark rounded-lg flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ConcertFlow</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-slate-400 hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2026 ConcertFlow. All rights reserved.</p>
            <p className="text-slate-500">The modern concert management platform</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

