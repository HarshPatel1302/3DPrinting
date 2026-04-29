"use client";

import { faqItems } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-y border-white/5 bg-black/20 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          titleId="faq-heading"
          title="Straight answers — no buzzwords."
          align="center"
          className="mx-auto max-w-xl text-center"
        />
        <Accordion className="mt-10 w-full rounded-2xl border border-white/10 glass-panel p-2">
          {faqItems.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger className="px-4 py-3 text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
