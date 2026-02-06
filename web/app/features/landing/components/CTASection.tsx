import { Link } from "@remix-run/react";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-main to-pink-600"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[10%] w-4 h-4 bg-white/20 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-20 right-[15%] w-6 h-6 bg-white/15 rounded-full animate-bounce-subtle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-[20%] w-5 h-5 bg-white/20 rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-[25%] w-3 h-3 bg-white/25 rounded-full animate-bounce-subtle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>Start for free, no credit card required</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your{" "}
          <span className="relative">
            Concert Production?
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-amber-300 rounded-full"></div>
          </span>
        </h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow for seamless event management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="group border-2 border-white/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white transition-all duration-300"
          >
            Sign In
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

