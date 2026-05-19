"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  CONTACT,
  printerMotionClips,
  extraTimelapses,
  type PrinterMotionClip,
} from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ClipCard({
  clip,
  index,
  size,
}: {
  clip: PrinterMotionClip;
  index: number;
  size: "lg" | "sm";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-black/50 metallic-edge shadow-[0_18px_48px_-40px_rgba(0,0,0,0.9)]",
        size === "lg" && "md:rounded-3xl",
      )}
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
        <h3
          className={cn(
            "font-heading font-semibold text-white",
            size === "lg" ? "text-base sm:text-lg" : "text-sm sm:text-base",
          )}
        >
          {clip.headline}
        </h3>
        <p
          className={cn(
            "mt-1.5 leading-relaxed text-muted-foreground",
            size === "lg" ? "text-sm" : "text-xs sm:text-sm",
          )}
        >
          {clip.caption}
        </p>
        {clip.creditHref ? (
          <a
            href={clip.creditHref}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-3 inline-block text-xs text-filament-cyan/90 underline-offset-4 hover:underline"
          >
            {clip.creditLabel}
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function PrinterMotionSection() {
  return (
    <section
      id="timelapses"
      className="scroll-mt-24 border-y border-white/5 bg-black/35 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="timelapses-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Timelapses"
          titleId="timelapses-heading"
          title="See the printers in motion."
          subtitle="Real timelapses from our own Bambu Lab P1S Combo and Creality Ender-3 S1 Pro — muted and looping. Featured pair up top, plus a few more from the bench."
          className="max-w-3xl"
        />

        {/* Featured pair */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {printerMotionClips.map((clip, i) => (
            <ClipCard key={clip.id} clip={clip} index={i} size="lg" />
          ))}
        </div>

        {/* More clips */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {extraTimelapses.map((clip, i) => (
            <ClipCard key={clip.id} clip={clip} index={i} size="sm" />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
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
          <p className="max-w-lg text-center text-[11px] leading-relaxed text-muted-foreground">
            Filmed in our workshop. New reels go up on {CONTACT.instagramHandle}{" "}
            as jobs finish.
          </p>
        </div>
      </div>
    </section>
  );
}
