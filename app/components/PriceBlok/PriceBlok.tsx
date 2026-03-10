'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PLANS = [
  {
    name: 'Štart',
    price: '29',
    period: 'mesiac',
    desc: 'Ideálne pre začiatočníkov a príležitostných návštevníkov.',
    features: [
      'Neobmedzený prístup do posilňovne',
      'Základné kardio vybavenie',
      'Šatne a sprchy',
      '1× vstupná konzultácia',
      'Mobilná aplikácia',
    ],
    missing: ['Skupinové lekcie', 'Osobný tréner', 'Výživové poradenstvo'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '49',
    period: 'mesiac',
    desc: 'Najpopulárnejší plán pre aktívnych členov.',
    features: [
      'Neobmedzený prístup do posilňovne',
      'Všetky tréningové zóny',
      'Neobmedzené skupinové lekcie',
      'Šatne, sprchy, sauna',
      '2× mesačne osobný tréner',
      'Tréningový plán na mieru',
      'Mobilná aplikácia + štatistiky',
    ],
    missing: ['Výživové poradenstvo'],
    highlight: true,
  },
  {
    name: 'Elite',
    price: '89',
    period: 'mesiac',
    desc: 'Kompletná starostlivosť pre tých, čo myslia vážne.',
    features: [
      'Neobmedzený prístup 24/7',
      'Všetky tréningové zóny + VIP priestor',
      'Neobmedzené skupinové lekcie',
      'Šatne, sprchy, sauna, whirlpool',
      'Týždenný osobný tréner',
      'Tréningový plán na mieru',
      'Výživové poradenstvo',
      'Mesačné meranie tela',
      'Prioritná podpora',
    ],
    missing: [],
    highlight: false,
  },
];

export const PriceBlok = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.price-header > *', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.price-header', start: 'top 80%' },
    });

    gsap.from('.price-card', {
      y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.price-grid', start: 'top 75%' },
    });
  }, { scope: containerRef });

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="price" className="py-24 md:py-32 bg-[var(--black-mid)] overflow-hidden">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="price-header text-center mb-16">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--crimson)] font-600">Cenník</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--white)] leading-none uppercase mt-1">
            Vyber Svoj <span className="text-[var(--crimson)]">Plán</span>
          </h2>
          <p className="font-body text-sm text-[var(--grey-light)] font-300 mt-4 max-w-md mx-auto">
            Bez skrytých poplatkov. Kedykoľvek môžeš zmeniť plán alebo zrušiť členstvo.
          </p>
        </div>

        {/* Cards — každá je obalená v pt-6 wrapperovi, aby badge nevysúval Pro kartu */}
        <div className="price-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div key={plan.name} className="price-card pt-6 flex flex-col">
              <div
                className={`relative flex flex-col flex-1 p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  plan.highlight
                    ? 'bg-[var(--crimson)] text-white'
                    : 'bg-[var(--black-card)] border border-[var(--grey)] hover:border-[var(--crimson)]'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[var(--white)] text-[var(--crimson)] px-4 py-1.5 whitespace-nowrap">
                    <Star size={12} fill="currentColor" />
                    <span className="font-display text-sm tracking-widest uppercase">Najpopulárnejší</span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`font-display text-sm tracking-[0.3em] uppercase mb-2 ${plan.highlight ? 'text-white/70' : 'text-[var(--crimson)]'}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-6xl leading-none text-current">{plan.price}€</span>
                    <span className={`font-body text-sm mb-2 ${plan.highlight ? 'text-white/70' : 'text-[var(--grey-light)]'}`}>/ {plan.period}</span>
                  </div>
                  <p className={`font-body text-sm font-300 mt-3 leading-relaxed ${plan.highlight ? 'text-white/80' : 'text-[var(--grey-light)]'}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <Check size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-[var(--crimson)]'}`} />
                      <span className={`font-body text-sm ${plan.highlight ? 'text-white' : 'text-[var(--grey-light)]'}`}>{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f) => (
                    <div key={f} className="flex items-start gap-3 opacity-30">
                      <div className={`w-3.5 h-[1px] mt-2 flex-shrink-0 ${plan.highlight ? 'bg-white' : 'bg-[var(--grey-mid)]'}`} />
                      <span className={`font-body text-sm line-through ${plan.highlight ? 'text-white' : 'text-[var(--grey-mid)]'}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTo('#contact')}
                  className={`font-display tracking-widest uppercase text-sm py-4 transition-all duration-200 hover:scale-105 ${
                    plan.highlight
                      ? 'bg-[var(--white)] text-[var(--crimson)] hover:bg-[var(--white-pure)]'
                      : 'bg-[var(--crimson)] text-white hover:bg-[var(--crimson-light)]'
                  }`}
                >
                  Začni teraz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center font-body text-xs text-[var(--grey-mid)] mt-8 tracking-wide">
          Všetky ceny sú uvedené vrátane DPH. Prvý mesiac bez záväzkov — vyskúšaj zadarmo prvých 7 dní.
        </p>
      </div>
    </section>
  );
};
