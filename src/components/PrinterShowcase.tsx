"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { printers } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const filamentColors = ["#22d3ee", "#4ade80", "#fb923c", "#f472b6"];

function AmsFeedVisualization() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative mx-auto h-36 w-full max-w-sm"
      aria-hidden
    >
      <svg viewBox="0 0 200 120" className="h-full w-full">
        {filamentColors.map((c, i) => {
          const y = 18 + i * 14;
          const d = `M10 ${y} Q 55 ${y - 4} 100 60 T 170 55`;
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke={c}
                strokeWidth="3"
                strokeLinecap="round"
                opacity={0.85}
                initial={{ pathLength: reduce ? 1 : 0.15 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduce ? 0.3 : 1.8,
                  repeat: reduce ? 0 : Infinity,
                  repeatType: "loop",
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                r="4"
                fill={c}
                filter="url(#glowDot)"
              >
                <animateMotion
                  dur={`${3 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </motion.circle>
            </g>
          );
        })}
        <defs>
          <filter id="glowDot">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="absolute bottom-2 right-8 rounded-lg border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-mono text-filament-cyan">
        AMS · 4 feeds
      </div>
    </div>
  );
}

function EnderMotionVisualization() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative mx-auto h-36 w-full max-w-sm"
      aria-hidden
    >
      <div className="absolute inset-x-6 top-8 h-1 rounded-full bg-white/10" />
      <div className="absolute inset-x-6 bottom-6 h-12 rounded-md border border-white/15 bg-gradient-to-t from-white/5 to-transparent" />
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <motion.div
          className="h-14 w-16 rounded border border-white/20 bg-black/60 shadow-lg shadow-black/50"
          animate={reduce ? { x: 0 } : { x: [-48, 48, -48] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="mx-auto mt-1 h-2 w-8 rounded-sm bg-filament-orange/80" />
          <motion.div
            className="mx-auto mt-2 h-6 w-1.5 rounded-full bg-gradient-to-b from-filament-cyan to-filament-orange"
            animate={reduce ? {} : { scaleY: [1, 1.08, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>
      </div>
      <p className="absolute bottom-1 left-0 right-0 text-center font-mono text-[10px] text-muted-foreground">
        Open frame · direct drive path
      </p>
    </div>
  );
}

export function PrinterShowcase() {
  return (
    <div aria-labelledby="printers-heading">
      <SectionHeader
        eyebrow="Capabilities"
        titleId="printers-heading"
        title="Two printers. One clean standard."
        subtitle="An enclosed CoreXY speed platform paired with a versatile direct-drive workhorse — your job lands on the machine that fits."
      />
      <div className="mt-8 grid gap-5">
          {printers.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-5 metallic-edge shadow-[0_24px_60px_-30px_rgba(0,0,0,0.75)] transition-shadow duration-300 hover:border-filament-cyan/30 hover:shadow-[0_28px_70px_-28px_rgba(34,211,238,0.2)]",
                p.accent === "cyan"
                  ? "from-filament-cyan/10 via-transparent to-transparent"
                  : "from-filament-green/10 via-transparent to-transparent",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl",
                  p.accent === "cyan"
                    ? "bg-filament-cyan/20"
                    : "bg-filament-green/15",
                )}
              />
              <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-filament-cyan">{p.tagline}</p>
              <details className="group/details mt-5 rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04]">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white">
                  <span>Specs & features</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open/details:rotate-180"
                    aria-hidden
                  />
                </summary>
                <ul className="space-y-2 px-4 pb-4 text-sm text-muted-foreground">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-filament-cyan"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </details>
              <div className="mt-8 border-t border-white/10 pt-6">
                {p.id === "p1s" ? (
                  <AmsFeedVisualization />
                ) : (
                  <EnderMotionVisualization />
                )}
              </div>
            </motion.article>
          ))}
      </div>
    </div>
  );
}
