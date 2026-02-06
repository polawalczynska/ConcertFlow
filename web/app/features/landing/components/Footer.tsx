import { Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">ConcertFlow</span>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Copyright */}
          <p className="text-sm text-slate-500">
            &copy; 2026 ConcertFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

