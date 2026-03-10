'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Target, Zap, Users, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  { icon: Target, title: 'Cielený tréning', desc: 'Personalizované tréningové plány prispôsobené tvojim cieľom a kondícii.' },
  { icon: Zap, title: 'Moderné vybavenie', desc: 'Najnovšie stroje a pomôcky pre cardio, silový aj funkčný tréning.' },
  { icon: Users, title: 'Komunita', desc: 'Vstúp do skupiny motivovaných ľudí, ktorí si navzájom pomáhajú rásť.' },
  { icon: Award, title: 'Certifikovaní tréneri', desc: 'Náš tím má medzinárodné certifikácie a roky praktických skúseností.' },
];

export const AboutBlok = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.about-image', {
      x: -80, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-image', start: 'top 75%' },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.about-text', start: 'top 75%' },
    });
    tl.from('.about-text > *', { x: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' })
      .from('.about-feature', { y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.4');

    gsap.from('.about-red-line', {
      scaleY: 0, duration: 1.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-red-line', start: 'top 80%' },
    });
  }, { scope: containerRef });

  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--black-mid)] overflow-hidden">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image side */}
          <div className="about-image relative">
            <div className="relative aspect-[4/5] rounded-none overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80"
                alt="Tréner v IronForge fitness centre"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/50 to-transparent" />
            </div>
            {/* Decorative red border */}
            <div className="absolute -bottom-6 -right-6 w-[70%] h-[70%] border-2 border-[var(--crimson)] -z-10" />
            {/* Experience box */}
            <div className="absolute bottom-8 left-8 bg-[var(--crimson)] px-6 py-4">
              <div className="font-display text-5xl text-white leading-none">10</div>
              <div className="font-body text-xs text-white/80 uppercase tracking-widest mt-1">Rokov<br/>Excelentnosti</div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-text">
            <div className="flex items-center gap-3 mb-4">
              <div className="about-red-line w-1 h-16 bg-[var(--crimson)] origin-top" />
              <div>
                <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--crimson)] font-600">O nás</span>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--white)] leading-none uppercase mt-1">
                  Nie sme len<br /><span className="text-[var(--crimson)]">posilňovňa</span>
                </h2>
              </div>
            </div>

            <p className="font-body text-[var(--grey-light)] text-base font-300 leading-relaxed mb-4">
              IronForge Fitness je prémiové tréningové centrum, kde sa stretáva špičkové vybavenie, profesionálny prístup a komunita ľudí odhodlaných meniť sa k lepšiemu.
            </p>
            <p className="font-body text-[var(--grey-light)] text-base font-300 leading-relaxed mb-10">
              Od roku 2014 sme pomohli tisíckam ľudí dosiahnuť ich ciele — či už ide o chudnutie, budovanie svalov, zlepšenie kondície alebo jednoducho zdravší životný štýl.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="about-feature flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[var(--black-light)] group-hover:bg-[var(--crimson)] flex items-center justify-center transition-colors duration-300">
                    <Icon size={18} className="text-[var(--crimson)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="font-display text-lg text-[var(--white)] uppercase tracking-wide">{title}</div>
                    <div className="font-body text-sm text-[var(--grey-light)] font-300 mt-1 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
