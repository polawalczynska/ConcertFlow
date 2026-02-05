import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-main via-purple-600 to-purple-dark" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,white_0%,transparent_50%)]" />
      </div>

      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg" />

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Start your journey today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Transform Your Concert Production?
        </h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow
          to deliver flawless events.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
