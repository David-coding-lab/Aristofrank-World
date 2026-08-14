import Image from "next/image"
import { OutlinedCtaButton } from "@/components/ui/OutlinedCtaButton"

export function HeroHeader() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="text-center lg:text-left">

          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Where Brands Become{" "}
            <span className="text-accent">Legends.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base lg:mx-0">
            we are the architects of legacy, sculpting unforgettable
            brand identities that resonates through time. join us to transform
            vision into and enduring legend
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <OutlinedCtaButton>Forge Your Legacy</OutlinedCtaButton>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt="Aristofrank World — creative agency and artist management"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  )
}
