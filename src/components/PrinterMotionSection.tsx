"use client";

import { motion, useReducedMotion } from "framer-motion";
import { printerMotionClips } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

function scrollToQuote() {
  document.getElementById("quote")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function PrinterMotionSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="printer-motion"
      className="scroll-mt-24 border-y border-white/5 bg-black/35 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="printer-motion-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Hardware in action"
          titleId="printer-motion-heading"
          title="See the printers in motion."
          subtitle="Looping reference footage (muted). Replace with your own Bambu Lab and Creality footage anytime — clips below are stock media, not your exact machines."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {printerMotionClips.map((clip, i) => (
            <motion.article
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 metallic-edge shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] md:rounded-3xl"
            >
              <div className="relative aspect-video w-full bg-black">
                <video
                  className="h-full w-full object-cover"
                  src={clip.src}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduce}
                  controls={!!reduce}
                  preload="metadata"
                  aria-label={clip.headline}
                />
              </div>
              <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
                  {clip.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {clip.caption}
                </p>
                <a
                  href={clip.creditHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-3 inline-block text-xs text-filament-cyan/90 underline-offset-4 hover:underline"
                >
                  {clip.creditLabel}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <Button
            type="button"
            size="lg"
            className="rounded-full border border-filament-green/50 bg-filament-green px-10 font-semibold text-carbon shadow-[0_0_32px_-10px_var(--filament-green)] hover:bg-filament-green/90"
            onClick={scrollToQuote}
          >
            Start your project
          </Button>
          <p className="max-w-lg text-center text-[11px] leading-relaxed text-muted-foreground">
            Stock video on{" "}
            <a
              href="https://www.pexels.com/license/"
              className="text-filament-cyan underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pexels
            </a>
            ; not sponsored. Trademarks belong to their owners.
          </p>
        </div>
      </div>
    </section>
  );
}
