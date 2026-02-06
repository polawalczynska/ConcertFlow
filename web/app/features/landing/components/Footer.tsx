import { Link } from "@remix-run/react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2">
                ConcertFlow
              </h2>
            </Link>
            <p className="text-slate-500 text-sm">
              Streamlining concert production worldwide
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-slate-400 hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 ConcertFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

