"use client";

import { waMeLink } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, SendHorizonal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function scrollQuote() {
  document.getElementById("quote")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function FloatingCTA() {
  const reduce = useReducedMotion();
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6"
      role="navigation"
      aria-label="Quick actions"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href={waMeLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "glow-cyan inline-flex rounded-full border border-filament-cyan/40 bg-filament-cyan text-carbon shadow-lg hover:bg-filament-cyan/90",
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">WhatsApp</span>
        </a>
      </motion.div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
      >
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full border border-white/15 bg-black/70 backdrop-blur-md hover:bg-black/85"
          type="button"
          onClick={scrollQuote}
        >
          <SendHorizonal className="h-4 w-4" />
          <span className="ml-2">Quote</span>
        </Button>
      </motion.div>
    </div>
  );
}
