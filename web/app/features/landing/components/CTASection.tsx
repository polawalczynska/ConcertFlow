import { Link } from "@remix-run/react";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
          <Zap className="w-4 h-4" />
          <span>Start managing concerts like a pro</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <span className="block text-purple-200">Concert Production?</span>
        </h2>
        <p className="text-xl text-purple-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow to deliver flawless events
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group relative bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-black/20 hover:shadow-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            to="/login"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

