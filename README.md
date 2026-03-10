# IronForge Fitness — Next.js Website

Prémiový fitness web s červeno-čiernou farebnou paletou.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP + @gsap/react (animácie)
- Lucide React (ikony)

## Sekcie
- **Header** — sticky navigácia s hamburger menu na mobile
- **Hero** — fullscreen úvod so štatistikami a animáciami
- **About** — o nás s obrázkom, funkciami a GSAP reveal
- **Gallery** — foto grid s lightboxom
- **Price List** — 3 plány (Štart / Pro / Elite)
- **Contact** — formulár + kontaktné info
- **Footer** — CTA strip, linky, sociálne siete

## Spustenie

```bash
npm install
npm run dev
```

Otvor [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Poznámky
- Fotky sú z Unsplash (pre produkciu nahraď vlastnými)
- Google Fonts: Bebas Neue (nadpisy) + Barlow (text)
- CSS premenné pre farby sú v `app/globals.css`
