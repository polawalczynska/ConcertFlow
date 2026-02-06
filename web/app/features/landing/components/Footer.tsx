import { Music, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-slate-800">
          {/* Logo section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">ConcertFlow</h2>
              <p className="text-xs text-slate-500">Event Management Platform</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#" className="hover:text-red-400 transition-colors">Features</a>
            <a href="#" className="hover:text-red-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-red-400 transition-colors">About</a>
            <a href="#" className="hover:text-red-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-red-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-400 transition-colors">Terms</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2026 ConcertFlow. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for event professionals
          </p>
        </div>
      </div>
    </footer>
  );
}

