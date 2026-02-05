import { Link } from "@remix-run/react";
import { ArrowRight, Music2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-main via-purple-600 to-purple-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[length:32px_32px]" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-purple-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
          <Music2 className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <br />
          <span className="text-purple-200">Concert Production?</span>
        </h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow
          to deliver flawless events every time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl shadow-purple-900/30 hover:shadow-2xl hover:shadow-purple-900/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
          >
            Sign In
          </Link>
        </div>

        <p className="text-purple-200/70 text-sm mt-8">
          No credit card required. Start organizing your next event today.
        </p>
      </div>
    </section>
  );
}
