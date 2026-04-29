"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryItems } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

function scrollToQuote() {
  document.getElementById("quote")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Work"
          titleId="gallery-heading"
          title="Quality you can see before the first layer."
          subtitle="Representative portfolio stills (Pexels stock). Swap in photos of your real prints and printers when you have them."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.45 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] metallic-edge"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-filament-cyan">
                  Stock photo
                </span>
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5">
                      {item.material}
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5">
                      {item.printTimeLabel}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="mt-3 w-full rounded-full"
                    onClick={scrollToQuote}
                  >
                    Print something like this
                  </Button>
                </div>
              </div>
              <div className="border-t border-white/10 px-3 py-2">
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
