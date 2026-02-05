import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ConcertFlow</span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              The complete platform for concert planning, team coordination, and flawless execution.
              Built for coordinators, budget managers, and technical teams.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">Features</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">Pricing</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">Integrations</span>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">About</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">Contact</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-default">Careers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} ConcertFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <span className="hover:text-slate-300 transition-colors cursor-default">Privacy Policy</span>
              <span className="hover:text-slate-300 transition-colors cursor-default">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
