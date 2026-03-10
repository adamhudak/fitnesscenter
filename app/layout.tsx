import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IronForge Fitness | Tréningové centrum",
  description:
    "Prémiové fitness centrum s moderným vybavením, osobnými trénermi a skupinovými lekciami. Začni svoju transformáciu ešte dnes.",
  openGraph: {
    title: "IronForge Fitness | Tréningové centrum",
    description: "Prémiové fitness centrum. Začni svoju transformáciu.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${bebasNeue.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  );
}
