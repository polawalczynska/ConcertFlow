import { Link } from "@remix-run/react";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-pink-700 to-pink-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Start your free trial today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <br />
          <span className="text-pink-200">Concert Production?</span>
        </h2>

        <p className="text-xl sm:text-2xl text-pink-100/90 mb-10 max-w-2xl mx-auto">
          Join coordinators, budget managers, and technical teams who trust ConcertFlow to deliver flawless events.
        </p>

        {/* Benefits list */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-pink-100">
          {["No credit card required", "14-day free trial", "Cancel anytime"].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="group bg-white text-pink-700 px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-pink-900/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="group border-2 border-white/30 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
