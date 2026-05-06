"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CONTACT, extraTimelapses } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TimelapsesGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      id="timelapses-more"
      className="scroll-mt-24 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="timelapses-more-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="More timelapses"
          titleId="timelapses-more-heading"
          title="A peek at the rest of the bench."
          subtitle="Short loops from recent jobs — multi-color passes, miniatures, and quick utility prints."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {extraTimelapses.map((clip, i) => (
            <motion.article
              key={clip.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 metallic-edge shadow-[0_18px_48px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="relative aspect-video w-full bg-black">
                <video
                  className="h-full w-full object-cover"
                  poster={clip.posterSrc}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduce}
                  controls={!!reduce}
                  preload="metadata"
                  aria-label={clip.headline}
                >
                  {clip.webmSrc ? (
                    <source src={clip.webmSrc} type="video/webm" />
                  ) : null}
                  <source src={clip.src} type="video/mp4" />
                </video>
              </div>
              <div className="border-t border-white/10 px-4 py-3 sm:px-5">
                <h3 className="font-heading text-sm font-semibold text-white sm:text-base">
                  {clip.headline}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {clip.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-white/20 bg-white/5 hover:bg-white/10",
            )}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Watch more on Instagram · {CONTACT.instagramHandle}
          </a>
          <p className="text-[11px] text-muted-foreground">
            New reels go up on {CONTACT.instagramHandle} as jobs finish.
          </p>
        </div>
      </div>
    </section>
  );
}
