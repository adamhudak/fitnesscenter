'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dumbbell, Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = {
  centrum: [
    { label: 'O nás', href: '#about' },
    { label: 'Galéria', href: '#gallery' },
    { label: 'Tím trénerov', href: '#about' },
    { label: 'Blog', href: '#' },
  ],
  clenstvo: [
    { label: 'Plán Štart', href: '#price' },
    { label: 'Plán Pro', href: '#price' },
    { label: 'Plán Elite', href: '#price' },
    { label: '7-dňová skúška zadarmo', href: '#contact' },
  ],
  kontakt: [
    { label: 'Kontaktovať nás', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Zmluvné podmienky', href: '#' },
    { label: 'Ochrana súkromia', href: '#' },
  ],
};

export const FooterBlok = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.footer-col', {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.footer-col', start: 'top 90%' },
    });
  }, { scope: containerRef });

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={containerRef} className="bg-[var(--black-mid)] border-t border-[var(--grey)] overflow-hidden">

      {/* CTA strip */}
      <div className="bg-[var(--crimson)] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl text-white uppercase leading-tight">
              Pripravený začať svoju<br />transformáciu?
            </div>
          </div>
          <button
            onClick={() => scrollTo('#contact')}
            className="flex-shrink-0 font-display tracking-widest uppercase bg-white text-[var(--crimson)] hover:bg-[var(--white-pure)] px-8 py-4 text-sm transition-all duration-200 hover:scale-105"
          >
            Vyskúšaj zadarmo 7 dní
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="footer-col">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={scrollTop}>
              <div className="w-9 h-9 bg-[var(--crimson)] flex items-center justify-center rotate-12">
                <Dumbbell size={18} className="text-white -rotate-12" />
              </div>
              <span className="font-display text-2xl text-[var(--white)] tracking-widest uppercase">
                Iron<span className="text-[var(--crimson)]">Forge</span>
              </span>
            </div>
            <p className="font-body text-sm text-[var(--grey-light)] font-300 leading-relaxed mb-6">
              Prémiové fitness centrum v Bratislave. Tréningová excelentnosť od roku 2014.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 border border-[var(--grey)] flex items-center justify-center text-[var(--grey-light)] hover:border-[var(--crimson)] hover:text-[var(--crimson)] transition-colors">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries({ Centrum: LINKS.centrum, Členstvo: LINKS.clenstvo, Pomoc: LINKS.kontakt }).map(([title, links]) => (
            <div key={title} className="footer-col">
              <div className="font-display text-sm tracking-[0.2em] uppercase text-[var(--white)] mb-5">{title}</div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="font-body text-sm text-[var(--grey-light)] hover:text-[var(--crimson)] transition-colors font-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--grey)] py-5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body text-xs text-[var(--grey-mid)]">
            © 2024 IronForge Fitness s.r.o. Všetky práva vyhradené.
          </span>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 font-body text-xs text-[var(--grey-mid)] hover:text-[var(--crimson)] transition-colors uppercase tracking-widest"
          >
            <ArrowUp size={14} /> Späť hore
          </button>
        </div>
      </div>
    </footer>
  );
};
