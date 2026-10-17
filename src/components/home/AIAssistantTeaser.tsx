import React from 'react';
import { Sparkles, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AIAssistantTeaserProps {
  onOpenAssistant: () => void;
}

export const AIAssistantTeaser: React.FC<AIAssistantTeaserProps> = ({ onOpenAssistant }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-aura-900 to-slate-900 text-white p-8 sm:p-10 border border-aura-700/40 shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-aura-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-wider text-cyan-300">
              <Sparkles size={14} />
              <span>Signature Innovation Feature</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Can't Decide? Meet Your Zenvora Smart Shopping Assistant
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Skip endless filtering. Describe your specific use case, workload requirements, and budget constraints in natural language. Our rule-based reasoning engine cross-examines technical specs, benchmarks, and real stock to explain the perfect fit.
            </p>

            {/* Benefit bullets */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Understands multi-factor constraints (e.g. ML, 16GB, under ₹60k)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Explains transparently why each pick matches your request</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Direct 1-click cart addition & side-by-side comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Modular architecture ready for secure LLM backend integration</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 shadow-glow mb-4">
              <Bot size={36} />
            </div>

            <button
              onClick={onOpenAssistant}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 to-aura-400 hover:from-cyan-300 hover:to-aura-300 text-slate-950 font-black text-sm rounded-xl shadow-xl transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Launch Shopping Assistant</span>
              <ArrowRight size={18} />
            </button>
            <span className="text-[11px] text-slate-400 mt-2">Zero setup required • Instant answers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
