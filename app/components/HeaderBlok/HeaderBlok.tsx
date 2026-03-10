'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X, Dumbbell } from 'lucide-react';

const NAV_LINKS = [
  { label: 'O nás', href: '#about' },
  { label: 'Galéria', href: '#gallery' },
  { label: 'Cenník', href: '#price' },
  { label: 'Kontakt', href: '#contact' },
];

export const HeaderBlok = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(() => {
    gsap.from('.header-logo', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.header-nav-item', {
      y: -20, opacity: 0, duration: 0.6,
      stagger: 0.1, ease: 'power3.out', delay: 0.3,
    });
    gsap.from('.header-cta', { scale: 0.8, opacity: 0, duration: 0.6, delay: 0.7, ease: 'back.out(1.5)' });
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-[var(--black)]/95 backdrop-blur-md border-b border-[var(--grey)]' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="header-logo flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('#hero')}>
          <div className="w-9 h-9 bg-[var(--crimson)] flex items-center justify-center rotate-12">
            <Dumbbell size={18} className="text-white -rotate-12" />
          </div>
          <span className="font-display text-2xl text-[var(--white)] tracking-widest uppercase">
            Iron<span className="text-[var(--crimson)]">Forge</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="header-nav-item font-body text-sm font-600 tracking-widest uppercase text-[var(--grey-light)] hover:text-[var(--crimson)] transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo('#contact')}
          className="header-cta hidden md:block font-display tracking-widest text-sm uppercase bg-[var(--crimson)] hover:bg-[var(--crimson-light)] text-white px-6 py-2.5 transition-all duration-200 hover:scale-105"
        >
          Začni dnes
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--black-mid)] border-t border-[var(--grey)] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-body text-sm font-600 tracking-widest uppercase text-[var(--white)] text-left hover:text-[var(--crimson)] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="font-display tracking-widest text-sm uppercase bg-[var(--crimson)] text-white px-6 py-3 mt-2"
          >
            Začni dnes
          </button>
        </div>
      )}
    </header>
  );
};
