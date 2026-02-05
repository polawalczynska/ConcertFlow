import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-main via-purple-600 to-purple-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Start your free trial today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <span className="block">Concert Production?</span>
        </h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Join thousands of coordinators, budget managers, and technical teams who trust ConcertFlow to deliver flawless events.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl shadow-purple-900/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-purple-200 text-sm mb-4">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
            <span className="text-lg font-semibold tracking-wide">Live Nation</span>
            <span className="text-lg font-semibold tracking-wide">AEG Presents</span>
            <span className="text-lg font-semibold tracking-wide">Ticketmaster</span>
            <span className="text-lg font-semibold tracking-wide">Eventbrite</span>
          </div>
        </div>
      </div>
    </section>
  );
}

