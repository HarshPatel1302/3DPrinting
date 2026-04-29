"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const items = section.querySelectorAll<HTMLElement>("[data-process-step]");
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const fill = item.querySelector<HTMLElement>("[data-layer-fill]");
        if (!fill) return;
        if (prefersReduce) {
          gsap.set(fill, { scaleY: 1 });
          return;
        }
        gsap.fromTo(
          fill,
          { transformOrigin: "50% 100%", scaleY: 0.08 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 52%",
              scrub: 0.6,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-24 relative px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="process-heading"
    >
      <div className="pointer-events-none absolute left-8 top-40 bottom-32 hidden w-px bg-gradient-to-b from-filament-cyan/40 via-white/10 to-filament-green/30 md:block lg:left-[max(2rem,calc(50%-28rem))]" />
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="How it works"
          titleId="process-heading"
          title="A process you can track like layers on a build plate."
          subtitle="Transparent steps from your first file to the part in your hand — no black-box surprises."
          align="center"
          className="mx-auto max-w-2xl text-center"
        />
        <ol className="relative mt-14 space-y-8">
          {processSteps.map((step) => (
            <li
              key={step.step}
              data-process-step
              className={cn(
                "relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 metallic-edge",
              )}
            >
              <div
                className="absolute left-0 top-0 h-1 w-full overflow-hidden rounded-t-2xl bg-white/5"
                aria-hidden
              >
                <div
                  data-layer-fill
                  className="h-full w-full bg-gradient-to-r from-filament-cyan via-filament-green to-filament-orange opacity-90"
                />
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs text-filament-cyan">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
