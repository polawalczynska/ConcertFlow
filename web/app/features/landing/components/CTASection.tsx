import { Link } from "@remix-run/react";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-main to-purple-700" />

      {/* Floating orbs for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0V0zm39 0h1v40h-1V0zM0 0h40v1H0V0zm0 39h40v1H0v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-medium text-white/90">Start your free trial today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Ready to Transform Your{" "}
          <span className="relative">
            <span className="relative z-10">Concert Production?</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-white/20 -rotate-1" />
          </span>
        </h2>
        <p className="text-xl sm:text-2xl text-purple-100 mb-10 leading-relaxed">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group relative bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/login"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

