'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { ArrowDown, ChevronRight } from 'lucide-react';

export const HeroBlok = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set('.hero-image', { willChange: 'transform, opacity' });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' })
      .from('.hero-title-line', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.2')
      .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-btns', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-stats-item', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
      .from('.hero-image', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
      .add(() => { gsap.set('.hero-image', { willChange: 'auto' }); });

    // Floating badge animation
    gsap.to('.hero-badge', {
      y: -12, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });

    // Diagonal line animation
    gsap.from('.hero-diagonal', { scaleX: 0, duration: 1.5, ease: 'power3.out', delay: 1 });
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-[var(--black)] flex items-center overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, var(--crimson) 40px, var(--crimson) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--crimson) 40px, var(--crimson) 41px)' }}
      />

      {/* Red accent bar left */}
      <div className="absolute left-0 top-0 w-1 h-full bg-[var(--crimson)]" />

      {/* Image — right half */}
      <div className="absolute right-0 top-0 w-[50%] h-full">
        <div className="relative w-full h-full hero-image">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80"
            alt="Fitness centrum tréning"
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)] via-[var(--black)]/60 to-transparent" />
        </div>
      </div>

      {/* Floating badge */}
      <div className="hero-badge absolute right-[8%] top-[20%] hidden lg:flex flex-col items-center justify-center w-28 h-28 bg-[var(--crimson)] rotate-12 z-10">
        <span className="font-display text-3xl text-white leading-none -rotate-12">10+</span>
        <span className="font-body text-[10px] text-white uppercase tracking-widest -rotate-12 mt-1">rokov skúseností</span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-[600px]">
          <div className="hero-tag flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[var(--crimson)]" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--crimson)] font-600">
              #1 Fitness centrum v meste
            </span>
          </div>

          <h1 className="font-display leading-none mb-6 overflow-hidden">
            <div className="hero-title-line text-[clamp(4rem,10vw,8rem)] text-[var(--white)] uppercase">Formuj</div>
            <div className="hero-title-line text-[clamp(4rem,10vw,8rem)] text-[var(--crimson)] uppercase tracking-widest">Svoju</div>
            <div className="hero-title-line text-[clamp(4rem,10vw,8rem)] text-[var(--white)] uppercase">Budúcnosť</div>
          </h1>

          <p className="hero-sub font-body text-[var(--grey-light)] text-lg font-300 leading-relaxed mb-8 max-w-md">
            Prémiové tréningové vybavenie, profesionálni tréneri a komunita, ktorá ťa motivuje každý deň. Tvoja transformácia začína tu.
          </p>

          <div className="hero-btns flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => scrollTo('#price')}
              className="flex items-center gap-2 font-display tracking-widest uppercase bg-[var(--crimson)] hover:bg-[var(--crimson-light)] text-white px-8 py-4 text-lg transition-all duration-200 hover:scale-105 hover:gap-3"
            >
              Vybrať plán <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scrollTo('#about')}
              className="flex items-center gap-2 font-display tracking-widest uppercase border border-[var(--grey-mid)] hover:border-[var(--crimson)] text-[var(--white)] px-8 py-4 text-lg transition-all duration-200 hover:text-[var(--crimson)]"
            >
              Zistiť viac
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { num: '2 500+', label: 'Spokojných členov' },
              { num: '15', label: 'Trénerov' },
              { num: '60+', label: 'Skupinových lekcií / týždeň' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stats-item">
                <div className="font-display text-3xl text-[var(--crimson)]">{stat.num}</div>
                <div className="font-body text-xs text-[var(--grey-light)] uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--grey-mid)] hover:text-[var(--crimson)] transition-colors z-10"
      >
        <span className="font-body text-xs tracking-widest uppercase">Scrolluj</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};
