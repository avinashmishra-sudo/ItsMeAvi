import { CheckCircle2, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

export default function StrengthsSection() {
  const { strengths } = portfolioData;

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-[#faf9f5] border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-blue" />
            <span>Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            What I Bring to a Team
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            A combination of autonomy, practical ownership, and multidisciplinary adaptability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {strengths.map((str, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 font-mono text-xs font-bold flex items-center justify-center">
                  0{idx + 1}
                </div>
                <p className="text-sm sm:text-base font-medium text-navy-950 leading-relaxed">
                  {str}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center space-x-1.5 text-xs text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue" />
                <span>Verified Strength</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
