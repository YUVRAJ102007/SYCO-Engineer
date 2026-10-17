import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgGradient: string;
  image: string;
  accentColor: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'FLAGSHIP LAUNCH • 2026 EDITION',
    title: 'NexusCore 15 AI & Gaming',
    subtitle: '13th Gen Intel Core i7 • RTX 4050 6GB • 16GB DDR5',
    description: 'Engineered for machine learning computation, software compilation, and ultra-smooth 144Hz AAA gaming. Experience desktop-grade power anywhere.',
    ctaText: 'Shop Tech Deals',
    ctaLink: '/products?category=Electronics',
    secondaryCtaText: 'Ask AI Assistant',
    secondaryCtaLink: '/assistant',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'text-cyan-400',
  },
  {
    id: 'slide-2',
    badge: 'STUDIO ACOUSTICS • 40% OFF',
    title: 'SoundPulse Ultra ANC Series',
    subtitle: 'Industry-Leading 45dB Active Noise Cancellation',
    description: 'Immerse in pure acoustic fidelity with 60-hour marathon battery life, LDAC Hi-Res certification, and instant multipoint pairing across all devices.',
    ctaText: 'Explore Audio',
    ctaLink: '/products?category=Electronics',
    secondaryCtaText: 'Deals of the Day',
    secondaryCtaLink: '/deals',
    bgGradient: 'from-slate-950 via-aura-950 to-slate-900',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'text-amber-400',
  },
  {
    id: 'slide-3',
    badge: 'SMART HOME • CAFE EXPERIENCE',
    title: 'OmniBrew Barista & Smart Living',
    subtitle: '15-Bar Italian Crema Extraction at Home',
    description: 'Transform your daily routine with precision thermo-block espresso brewing, smart ambient Scandinavian lighting, and medical-grade HEPA air purification.',
    ctaText: 'Upgrade Your Home',
    ctaLink: '/products?category=Home%20%26%20Kitchen',
    secondaryCtaText: 'Compare Specs',
    secondaryCtaLink: '/compare',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'text-emerald-400',
  },
];

export const HeroBannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[currentSlide];

  return (
    <div
      className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4 border border-slate-800 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`transition-all duration-700 bg-gradient-to-r ${slide.bgGradient} min-h-[460px] sm:min-h-[500px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4 animate-fade-in z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-wider uppercase text-slate-200">
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-sans">
              {slide.title}
            </h1>

            <p className={`text-base sm:text-xl font-bold ${slide.accentColor}`}>
              {slide.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={slide.ctaLink}
                className="px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to={slide.secondaryCtaLink}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl backdrop-blur-md border border-white/20 transition flex items-center gap-2"
              >
                <Sparkles size={16} className="text-aura-300" />
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Featured In Deal</span>
                  <p className="text-xs font-bold text-white truncate">{slide.title}</p>
                </div>
                <Link
                  to={slide.ctaLink}
                  className="px-3 py-1.5 bg-aura-600 hover:bg-aura-500 text-white text-xs font-bold rounded-lg transition"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/10 backdrop-blur-md transition shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/10 backdrop-blur-md transition shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Dots / Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
