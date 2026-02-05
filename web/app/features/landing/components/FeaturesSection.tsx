import { features } from "~/features/landing/data/features";

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Manage Concerts
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A complete toolkit designed for modern concert production teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradients = [
              'from-purple-500 to-indigo-500',
              'from-pink-500 to-rose-500',
              'from-blue-500 to-cyan-500',
              'from-amber-500 to-orange-500',
              'from-emerald-500 to-teal-500',
              'from-violet-500 to-purple-500',
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={feature.title}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-100/0 to-purple-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
