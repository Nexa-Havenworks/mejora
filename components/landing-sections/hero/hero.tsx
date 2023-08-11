import Image from "next/image";
import { HeroSearch } from "./hero-search";
import { HeroBadges } from "./hero-badges";

export const Hero = () => {
  return (
    <section className="flex items-center space-x-10">
      <div className="flex flex-col w-1/2 overflow-hidden space-y-4">
        <h1 className="font-semibold sm:text-3xl md:text-4xl lg:text-5xl leading-[120%] mb-6">
          Unlock <span className="text-[#4542B2]">Mentorship</span> success with
          Mejora
        </h1>
        <h2 className="sm:text-lg md:text-xl lg:text-2xl leading-[120%] mb-6">
          A platform encompassing community, industry, and global betterment
        </h2>
        <HeroSearch />
        <HeroBadges />
      </div>
      <div className="w-1/2 min-w-[275px]">
        <Image
          src="/hero.svg"
          alt="hero image"
          height="517"
          width="550"
          priority
        />
      </div>
    </section>
  );
};
