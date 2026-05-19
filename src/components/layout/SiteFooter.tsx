import Link from "next/link";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT, waMeLink } from "@/lib/constants";

const footerNav = [
  { href: "/#gallery", label: "Work" },
  { href: "/#timelapses", label: "Timelapses" },
  { href: "/#capabilities", label: "Capabilities & Materials" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process & Trust" },
  { href: "/#quote", label: "Quote" },
  { href: "/#contact", label: "Contact" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 px-4 pt-16 pb-8 sm:px-6 lg:px-10">
      {/* glow strip at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-filament-cyan/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60rem] -translate-x-1/2 rounded-full bg-filament-cyan/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* main grid */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="focus-ring inline-block rounded-md font-heading text-2xl font-semibold tracking-tight text-foreground hover:text-filament-cyan"
            >
              {CONTACT.businessName}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {CONTACT.tagline} {CONTACT.bioBlurb}
            </p>
            <p className="mt-4 max-w-sm text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
              The Workshop
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Bambu Lab P1S Combo + Creality Ender-3 S1 Pro
              <br />
              <span className="text-muted-foreground/70">
                Clear quotes · {CONTACT.dmCta}
              </span>
            </p>
          </div>

          {/* sitemap */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/90">
              On this page
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {footerNav.map(({ href, label }) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className="focus-ring group inline-flex items-center gap-1 rounded-sm text-muted-foreground transition-colors hover:text-filament-cyan"
                  >
                    <span className="h-px w-3 bg-white/15 transition-all group-hover:w-5 group-hover:bg-filament-cyan" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/90">
              Reach us
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={waMeLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex items-start gap-2 rounded-sm text-muted-foreground hover:text-filament-cyan"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-filament-cyan" />
                  <span className="underline-offset-4 group-hover:underline">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
                  className="focus-ring group flex items-start gap-2 rounded-sm text-muted-foreground hover:text-filament-green"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-filament-green" />
                  <span className="underline-offset-4 group-hover:underline">
                    {CONTACT.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="focus-ring group flex items-start gap-2 rounded-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="break-all underline-offset-4 group-hover:underline">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex items-start gap-2 rounded-sm text-muted-foreground hover:text-filament-orange"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-filament-orange" />
                  <span className="underline-offset-4 group-hover:underline">
                    {CONTACT.instagramHandle}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  {CONTACT.city}
                  <br />
                  <span className="text-xs text-muted-foreground/70">
                    {CONTACT.businessHours}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {year} {CONTACT.businessName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-filament-green shadow-[0_0_8px_var(--filament-green)]" />
            Filament made, Patel approved.
          </p>
        </div>
      </div>
    </footer>
  );
}
