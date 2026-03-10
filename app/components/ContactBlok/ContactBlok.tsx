'use client';
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INFO = [
  { icon: MapPin, label: 'Adresa', value: 'Športová 12, 831 04 Bratislava' },
  { icon: Phone, label: 'Telefón', value: '+421 900 123 456' },
  { icon: Mail, label: 'Email', value: 'info@ironforge.sk' },
  { icon: Clock, label: 'Otváracie hodiny', value: 'Po–Pi: 06:00–22:00\nSo–Ne: 08:00–20:00' },
];

export const ContactBlok = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', plan: '' });

  useGSAP(() => {
    gsap.from('.contact-info-item', {
      x: -40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-info', start: 'top 75%' },
    });
    gsap.from('.contact-form', {
      x: 60, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 75%' },
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[var(--black)] overflow-hidden">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--crimson)] font-600">Kontakt</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--white)] leading-none uppercase mt-1">
            Pridaj sa <span className="text-[var(--crimson)]">k nám</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Info */}
          <div className="contact-info">
            <p className="font-body text-[var(--grey-light)] font-300 leading-relaxed mb-10">
              Máš otázky? Chceš sa prísť pozrieť? Napíš nám alebo zavolaj — radi ti pomôžeme vybrať ten správny plán.
            </p>

            <div className="flex flex-col gap-6">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="contact-info-item flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--crimson)]/10 border border-[var(--crimson)]/30 flex items-center justify-center">
                    <Icon size={18} className="text-[var(--crimson)]" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-[var(--grey-mid)] uppercase tracking-widest mb-1">{label}</div>
                    <div className="font-body text-[var(--white)] whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form bg-[var(--black-card)] border border-[var(--grey)] p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle size={48} className="text-[var(--crimson)]" />
                <h3 className="font-display text-3xl text-[var(--white)] uppercase">Správa odoslaná!</h3>
                <p className="font-body text-[var(--grey-light)] font-300">Ozveme sa ti do 24 hodín.</p>
                <button
                  onClick={() => setSent(false)}
                  className="font-display tracking-widest uppercase text-sm bg-[var(--crimson)] text-white px-6 py-3 mt-2 hover:bg-[var(--crimson-light)] transition-colors"
                >
                  Odoslať ďalšiu
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h3 className="font-display text-2xl text-[var(--white)] uppercase tracking-wide">Napíš nám</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-[var(--grey-mid)] uppercase tracking-widest block mb-2">Meno</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ján Novák"
                      className="w-full bg-[var(--black-light)] border border-[var(--grey)] text-[var(--white)] font-body px-4 py-3 text-sm outline-none focus:border-[var(--crimson)] transition-colors placeholder:text-[var(--grey-mid)]"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-[var(--grey-mid)] uppercase tracking-widest block mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@email.sk"
                      className="w-full bg-[var(--black-light)] border border-[var(--grey)] text-[var(--white)] font-body px-4 py-3 text-sm outline-none focus:border-[var(--crimson)] transition-colors placeholder:text-[var(--grey-mid)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-[var(--grey-mid)] uppercase tracking-widest block mb-2">Záujem o plán</label>
                  <select
                    value={form.plan}
                    onChange={(e) => setForm({ ...form, plan: e.target.value })}
                    className="w-full bg-[var(--black-light)] border border-[var(--grey)] text-[var(--white)] font-body px-4 py-3 text-sm outline-none focus:border-[var(--crimson)] transition-colors"
                  >
                    <option value="">Vyber plán...</option>
                    <option value="start">Štart — 29€/mes</option>
                    <option value="pro">Pro — 49€/mes</option>
                    <option value="elite">Elite — 89€/mes</option>
                    <option value="trial">7-dňová skúšobná doba</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs text-[var(--grey-mid)] uppercase tracking-widest block mb-2">Správa</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tvoja správa alebo otázka..."
                    rows={4}
                    className="w-full bg-[var(--black-light)] border border-[var(--grey)] text-[var(--white)] font-body px-4 py-3 text-sm outline-none focus:border-[var(--crimson)] transition-colors placeholder:text-[var(--grey-mid)] resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-3 font-display tracking-widest uppercase bg-[var(--crimson)] hover:bg-[var(--crimson-light)] text-white py-4 text-sm transition-all duration-200 hover:gap-4 group"
                >
                  Odoslať správu <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
