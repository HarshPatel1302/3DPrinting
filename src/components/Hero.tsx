"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AnimatedFilament } from "@/components/AnimatedFilament";

const ThreePrinterScene = dynamic(
  () =>
    import("@/components/ThreePrinterScene").then((m) => m.ThreePrinterScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(52vh,420px)] min-h-[240px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]"
        aria-hidden
      >
        <div className="h-8 w-8 animate-pulse rounded-full bg-filament-cyan/30" />
      </div>
    ),
  },
);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100dvh] overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 carbon-noise" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-filament-cyan/25 bg-filament-cyan/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-filament-cyan"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Bambu Lab P1S Combo · Creality Ender-3 S1 Pro
          </motion.p>
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.05 }}
            className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem] md:leading-[1.08]"
          >
            Imagine it.{" "}
            <span className="text-gradient-brand">Patel prints it.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Your friendly Patel for 3D prints — gifts, prototypes, and the kind of
            jugaad parts that actually solve a problem. Multi-color AMS workflows,
            direct-drive flexibility, filament made and{" "}
            <em className="not-italic text-foreground/90">Patel approved</em>.{" "}
            {CONTACT.dmCta}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.18 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              className="glow-cyan rounded-full border border-filament-cyan/40 bg-filament-cyan/90 text-carbon hover:bg-filament-cyan"
              onClick={() => scrollToId("quote")}
            >
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 transition-shadow hover:bg-white/10 hover:shadow-[0_0_28px_-8px_rgba(34,211,238,0.45)]"
              onClick={() => scrollToId("gallery")}
            >
              Browse work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 transition-shadow hover:bg-white/10 hover:shadow-[0_0_28px_-8px_rgba(34,211,238,0.45)]"
              onClick={() => scrollToId("capabilities")}
            >
              Hardware &amp; materials
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-filament-cyan/15 via-transparent to-filament-green/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 metallic-edge glass-panel">
            <div className="absolute left-0 right-0 top-0 z-10 px-2 pt-3">
              <AnimatedFilament className="w-full opacity-90" />
            </div>
            <div className="relative z-[1] pt-10">
              <ThreePrinterScene reducedMotion={!!reduce} />
            </div>
            <button
              type="button"
              onClick={() => scrollToId("timelapses")}
              className="focus-ring block w-full border-t border-white/10 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-filament-cyan"
            >
              Stylized layer preview · live timelapses below ↓
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
