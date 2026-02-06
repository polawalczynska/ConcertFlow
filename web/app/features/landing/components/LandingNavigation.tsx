import { Link } from "@remix-run/react";
import { Music } from "lucide-react";

export function LandingNavigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-main rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 group-hover:scale-105 transition-all">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 via-purple-main to-purple-dark bg-clip-text text-transparent leading-tight">
                  ConcertFlow
                </h1>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Event Management</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-slate-600 hover:text-purple-700 px-4 py-2.5 rounded-lg hover:bg-purple-50 transition-all font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-purple-600 to-purple-main text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

