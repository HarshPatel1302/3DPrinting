import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between md:gap-8">
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            {CONTACT.businessName}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Professional 3D printing with Bambu Lab P1S Combo and Creality
            Ender-3 S1 Pro — prototypes, multi-color prints, and functional
            parts with clear quotes.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold text-foreground">On this page</p>
          <Link
            href="/#gallery"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Work
          </Link>
          <Link
            href="/#printer-motion"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            In motion
          </Link>
          <Link
            href="/#capabilities"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Capabilities
          </Link>
          <Link
            href="/#materials"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Materials
          </Link>
          <Link
            href="/#services"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Services
          </Link>
          <Link
            href="/#process"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Process
          </Link>
          <Link
            href="/#quote"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Quote
          </Link>
          <Link
            href="/#why-us"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Why us
          </Link>
          <Link
            href="/#faq"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            FAQ
          </Link>
          <Link
            href="/#contact"
            className="text-muted-foreground hover:text-filament-cyan"
          >
            Contact
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="mb-2 text-sm font-semibold text-foreground">Media</p>
          <p>
            Hero scene is stylized. Replace with your own printer photos and
            customer print gallery when available. See placeholder comments in
            code and constants.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {CONTACT.businessName}. All rights reserved.
      </p>
    </footer>
  );
}
