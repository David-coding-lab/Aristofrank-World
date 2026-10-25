
import Link from "next/link";

interface HeroSectionProps {
  ButtonLink?: string;
  HeroText: string;
  HeroSubText: string;
}

function HeroSection({
  ButtonLink,
  HeroText,
  HeroSubText,
}: HeroSectionProps) {
  return (
    <section
      className="
        relative flex w-full items-center justify-center
        overflow-hidden bg-[#171611] bg-cover bg-center
        bg-no-repeat px-5 py-20 text-center
        sm:min-h-105 sm:py-24
        lg:min-h-123.75 lg:py-28
      "
      style={{
        backgroundImage: "url('/assets/hero_bg.png')",
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        <h1
          className="
            max-w-3xl font-['Open_Sans',sans-serif]
            text-3xl font-bold leading-tight text-white
            sm:text-4xl
            md:text-5xl
            lg:text-[60px] lg:leading-[1.35]
          "
        >
          {HeroText}
        </h1>

        <p
          className="
            mt-3 max-w-4xl font-['Open_Sans',sans-serif]
            text-base font-semibold leading-relaxed
            text-sand
            sm:mt-4 sm:text-lg
            md:text-xl
            lg:text-xl lg:leading-[1.4]
          "
        >
          {HeroSubText}
        </p>

        {ButtonLink && (
          <Link
            href="/media"
            className="
              mt-6 inline-flex items-center justify-center
              rounded-md bg-accent px-6 py-3
              font-semibold text-[#171611]
              transition-colors hover:bg-white
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-white
            "
          >
            {ButtonLink}
          </Link>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
