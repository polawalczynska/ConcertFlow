import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";

export function LandingNavigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 group-hover:scale-105 transition-all">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                  ConcertFlow
                </h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100/80 transition-all font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
