import { features } from "~/features/landing/data/features";

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, slate 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 font-semibold text-sm tracking-wider uppercase mb-4">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-main to-purple-dark bg-clip-text text-transparent">
              Manage Concerts
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful tools designed to streamline every aspect of concert production
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-main to-purple-dark rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

