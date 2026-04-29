"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { services } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Box,
  Boxes,
  Briefcase,
  FileCheck2,
  Gift,
  Layers,
  PenLine,
  Puzzle,
  Shapes,
  Sparkles,
  Wrench,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  PenLine,
  Boxes,
  Shapes,
  Sparkles,
  Puzzle,
  Wrench,
  Gift,
  Briefcase,
  Layers,
  FileCheck2,
};

function ServiceIcon({ name }: { name: string }) {
  const Icon = SERVICE_ICONS[name] ?? Box;
  return <Icon className="h-6 w-6 text-filament-cyan" aria-hidden />;
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 150, damping: 20 });
  const ry = useSpring(y, { stiffness: 150, damping: 20 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    y.set(-py * 10);
    x.set(px * 12);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={reduce ? undefined : { transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services"
          titleId="services-heading"
          title="Every layer earns its keep."
          subtitle="Whether you are shipping a prototype, replacing a broken clip, or printing something unforgettable — we scope the process to the outcome."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <TiltCard className="h-full">
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-shadow hover:border-filament-cyan/35 hover:shadow-[0_0_32px_-12px_rgba(34,211,238,0.35)] sm:p-6 metallic-edge">
                  <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-black/40 p-3">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
