import Link from "next/link";
import { CONTACT } from "@/lib/constants";

const footerNav = [
  { href: "/#gallery", label: "Work" },
  { href: "/#printer-motion", label: "In motion" },
  { href: "/#timelapses-more", label: "Timelapses" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#materials", label: "Materials" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#quote", label: "Quote" },
  { href: "/#why-us", label: "Why us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between md:gap-8">
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            {CONTACT.businessName}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {CONTACT.tagline} {CONTACT.bioBlurb}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Bambu Lab P1S Combo + Creality Ender-3 S1 Pro · clear quotes ·{" "}
            {CONTACT.dmCta}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold text-foreground">On this page</p>
          {footerNav.map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              className="text-muted-foreground hover:text-filament-cyan"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="mb-2 text-sm font-semibold text-foreground">Follow</p>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-muted-foreground underline-offset-4 hover:text-filament-cyan hover:underline"
          >
            Instagram · {CONTACT.instagramHandle}
          </a>
          <p className="mt-3 max-w-xs">
            Real photos of recent work and live timelapses across the site —
            updated as new prints come off the bed.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {CONTACT.businessName}. All rights reserved.
      </p>
    </footer>
  );
}
