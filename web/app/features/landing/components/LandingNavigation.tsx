import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";

export function LandingNavigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-main to-purple-dark rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-shadow">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent leading-tight">
                  ConcertFlow
                </h1>
                <div className="h-0.5 w-0 group-hover:w-full rounded-full bg-gradient-to-r from-purple-main to-purple-dark transition-all duration-300"></div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-slate-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-main to-purple-dark text-white px-6 py-2.5 rounded-lg shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

