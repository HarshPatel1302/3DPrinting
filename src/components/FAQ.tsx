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
    <div
      id="faq"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="faq-heading"
    >
      <SectionHeader
        eyebrow="FAQ"
        titleId="faq-heading"
        title="Straight answers — no buzzwords."
      />
      <Accordion className="mt-8 w-full rounded-2xl border border-white/10 glass-panel p-2">
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
  );
}
