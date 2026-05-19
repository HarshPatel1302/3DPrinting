"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { materials } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

export function Materials() {
  const [activeId, setActiveId] = useState<string | null>(materials[0]?.id ?? null);
  const active = materials.find((m) => m.id === activeId) ?? materials[0];

  return (
    <div
      id="materials"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="materials-heading"
    >
      <SectionHeader
        eyebrow="Materials"
        titleId="materials-heading"
        title="Filaments tuned to the job."
        subtitle="Hover a spool to see where it shines. We confirm feasibility for high-temp or specialty blends at quote time."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
          {materials.map((m) => {
            const isActive = m.id === activeId;
            return (
              <motion.button
                key={m.id}
                type="button"
                onMouseEnter={() => setActiveId(m.id)}
                onFocus={() => setActiveId(m.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-filament-cyan",
                  isActive
                    ? "border-filament-cyan/50 bg-filament-cyan/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20",
                )}
                aria-pressed={isActive}
                aria-label={`${m.name} — ${m.short}`}
              >
                <motion.div
                  className="relative h-14 w-14 rounded-full border-4 border-black/50 shadow-inner"
                  style={{
                    background: `conic-gradient(from 180deg, ${m.color}, #111, ${m.color})`,
                  }}
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="absolute inset-2 rounded-full bg-[#0c0d0f]/90" />
                  <div
                    className="absolute left-1/2 top-1.5 h-7 w-2 -translate-x-1/2 rounded-sm opacity-90"
                    style={{ backgroundColor: m.color }}
                  />
                </motion.div>
                <span className="font-heading text-sm font-medium text-white">
                  {m.name}
                </span>
                <span className="text-center text-xs text-muted-foreground">
                  {m.short}
                </span>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-2xl border border-white/10 glass-panel p-5"
            role="region"
            aria-live="polite"
            aria-label="Material details"
          >
            <h3 className="font-heading text-lg font-semibold text-filament-cyan">
              {active?.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">
                Best for:{" "}
              </strong>
              {active?.bestFor}
            </p>
          </motion.div>
        </AnimatePresence>
    </div>
  );
}
