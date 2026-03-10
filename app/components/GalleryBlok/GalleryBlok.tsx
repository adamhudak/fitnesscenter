'use client';
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
    alt: 'Cardio zóna',
    label: 'Cardio Zóna',
    // col 1-3, row 1-3 (veľký ľavý)
    style: 'col-start-1 col-end-3 row-start-1 row-end-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
    alt: 'Silový tréning',
    label: 'Silový Tréning',
    // col 3, row 1
    style: 'col-start-3 col-end-4 row-start-1 row-end-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    alt: 'Funkčná zóna',
    label: 'Funkčná Zóna',
    // col 4, row 1
    style: 'col-start-4 col-end-5 row-start-1 row-end-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    alt: 'Skupinové lekcie',
    label: 'Skupinové Lekcie',
    // col 3-5, row 2 (wide bottom middle)
    style: 'col-start-3 col-end-5 row-start-2 row-end-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    alt: 'Osobný tréner',
    label: 'Osobný Tréner',
    // col 1-3, row 3 (wide bottom left)
    style: 'col-start-1 col-end-3 row-start-3 row-end-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80',
    alt: 'Šatne a relax',
    label: 'Relax & Regenerácia',
    // col 3-5, row 3
    style: 'col-start-3 col-end-5 row-start-3 row-end-4',
  },
];

export const GalleryBlok = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useGSAP(() => {
    gsap.from('.gallery-header > *', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-header', start: 'top 80%' },
    });

    gsap.from('.gallery-item', {
      scale: 0.92, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 75%' },
    });
  }, { scope: containerRef });

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--black)] overflow-hidden">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="gallery-header flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--crimson)] font-600">Galéria</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--white)] leading-none uppercase mt-1">
              Náš<br /><span className="text-[var(--crimson)]">Priestor</span>
            </h2>
          </div>
          <p className="font-body text-sm text-[var(--grey-light)] font-300 max-w-xs leading-relaxed">
            Prémiové vybavenie, priestranné sály a útulné šatne — všetko navrhnuté pre maximálny výkon.
          </p>
        </div>

        {/* Masonry-style CSS grid */}
        <div
          className="gallery-grid grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(3, 220px)',
          }}
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.alt}
              className={`gallery-item relative overflow-hidden cursor-pointer group ${item.style}`}
              onClick={() => setLightbox({ src: item.src, label: item.label })}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[var(--black)]/0 group-hover:bg-[var(--black)]/55 transition-all duration-400" />

              {/* Red top line reveal */}
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[var(--crimson)] group-hover:w-full transition-all duration-500" />

              {/* Label + zoom icon */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-white uppercase tracking-widest">
                    {item.label}
                  </span>
                  <div className="w-8 h-8 bg-[var(--crimson)] flex items-center justify-center flex-shrink-0">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 gap-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 w-10 h-10 bg-[var(--crimson)] flex items-center justify-center text-white hover:bg-[var(--crimson-light)] transition-colors">
            <X size={20} />
          </button>
          <div className="relative w-full max-w-4xl" style={{ aspectRatio: '16/9' }}>
            <Image
              src={lightbox.src}
              alt={lightbox.label}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <span className="font-display text-xl text-white uppercase tracking-widest">{lightbox.label}</span>
        </div>
      )}
    </section>
  );
};
