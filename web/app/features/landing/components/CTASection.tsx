import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Start your free trial today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">
            Concert Production?
          </span>
        </h2>

        <p className="text-xl text-purple-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow to deliver flawless events
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group relative bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl shadow-purple-900/30 hover:shadow-2xl hover:shadow-purple-900/40 transition-all hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            to="/login"
            className="group border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <p className="text-purple-200/70 text-sm mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {['LiveNation', 'AEG', 'Ticketmaster', 'StubHub'].map((company) => (
              <span key={company} className="text-white/80 font-semibold text-lg tracking-wide">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
