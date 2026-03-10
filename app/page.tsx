import { HeaderBlok } from "@/app/components/HeaderBlok";
import { HeroBlok } from "@/app/components/HeroBlok";
import { AboutBlok } from "@/app/components/AboutBlok";
import { GalleryBlok } from "@/app/components/GalleryBlok";
import { PriceBlok } from "@/app/components/PriceBlok";
import { ContactBlok } from "@/app/components/ContactBlok";
import { FooterBlok } from "@/app/components/FooterBlok";

export default function Home() {
  return (
    <main>
      <HeaderBlok />
      <HeroBlok />
      <AboutBlok />
      <GalleryBlok />
      <PriceBlok />
      <ContactBlok />
      <FooterBlok />
    </main>
  );
}
