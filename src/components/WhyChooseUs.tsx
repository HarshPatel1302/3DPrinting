"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { whyChooseUs } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Check } from "lucide-react";

function AnimatedStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-filament-cyan/25 bg-filament-cyan/5 px-5 py-4 text-center"
    >
      <p className="font-heading text-4xl font-bold tabular-nums text-filament-cyan">
        {n}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <div
      id="why-us"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="why-heading"
    >
      <SectionHeader
        eyebrow="Trust"
        titleId="why-heading"
        title="Why founders and makers trust us."
        subtitle="Studio-grade workflow without the studio gatekeeping — built for iteration, honesty, and parts that survive real use."
      />
      <div className="mt-8 grid grid-cols-2 gap-4">
        <AnimatedStat value={2} label="Printers online" />
        <AnimatedStat value={500} label="mm/s peak (P1S class)" />
      </div>
      <ul className="mt-6 grid gap-3">
        {whyChooseUs.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-filament-green/30 bg-filament-green/10">
                <Check className="h-4 w-4 text-filament-green" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
