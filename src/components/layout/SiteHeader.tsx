"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Primary nav order matches scroll order on the home page (Gallery → … → Contact). */
const nav = [
  { href: "/#gallery", label: "Work" },
  { href: "/#timelapses", label: "Timelapses" },
  { href: "/#capabilities", label: "Capabilities & Materials" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process & Trust" },
  { href: "/#quote", label: "Quote" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6">
        <Link
          href="/"
          aria-label="The Print Patel — home"
          className="focus-ring font-heading rounded-md text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-filament-cyan md:text-xl"
        >
          The Print Patel
        </Link>

        <nav
          className="hidden max-w-xl flex-wrap items-center justify-center gap-x-0 gap-y-1 md:flex lg:max-w-2xl xl:max-w-none"
          aria-label="Primary"
        >
          {nav.map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              className="focus-ring rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground lg:px-3 lg:text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="focus-ring flex rounded-lg p-2 text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "glass-panel mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl md:hidden",
            )}
            aria-label="Mobile primary"
          >
            <ul className="flex flex-col p-2">
              {nav.map(({ href, label }) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className="focus-ring block rounded-xl px-4 py-3 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#quote"
                  className="focus-ring m-2 block rounded-full border border-filament-cyan/40 bg-filament-cyan/90 py-3 text-center font-semibold text-carbon"
                  onClick={() => setOpen(false)}
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
