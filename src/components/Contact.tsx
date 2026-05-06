"use client";

import { CONTACT, waMeLink } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

function scrollQuote() {
  document.getElementById("quote")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 relative px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Contact"
            titleId="contact-heading"
            title="DM karo, print kari daishu."
            subtitle="Fastest on WhatsApp or Instagram DM — email works great for long threads with heavy attachments."
          />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-filament-cyan" />
              <div>
                <p className="font-medium text-white">WhatsApp</p>
                <a
                  className="text-muted-foreground underline-offset-4 hover:text-filament-cyan hover:underline"
                  href={waMeLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message {CONTACT.businessName}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-filament-green" />
              <div>
                <p className="font-medium text-white">Phone</p>
                <a
                  className="text-muted-foreground underline-offset-4 hover:text-filament-green hover:underline"
                  href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
                >
                  {CONTACT.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-filament-orange" />
              <div>
                <p className="font-medium text-white">Location</p>
                <p className="text-muted-foreground">{CONTACT.city}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {CONTACT.addressLine}
                </p>
              </div>
            </li>
            <li>
              <p className="font-medium text-white">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <p className="font-medium text-white">Hours</p>
              <p className="text-muted-foreground">{CONTACT.businessHours}</p>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waMeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-filament-cyan text-carbon hover:bg-filament-cyan/90",
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {CONTACT.instagramHandle}
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 glass-panel p-6 sm:p-8">
          <h3 className="font-heading text-lg font-semibold text-white">
            Quick message
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Prefer the full estimator? Use the quote section above — this is for
            short pings only.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              scrollQuote();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="qc-name">Name</Label>
              <Input id="qc-name" name="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qc-mail">Email</Label>
              <Input id="qc-mail" type="email" name="email" placeholder="you@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qc-msg">Message</Label>
              <Textarea id="qc-msg" rows={3} placeholder="One-liner about your project" />
            </div>
            <Button type="submit" className="w-full rounded-full">
              Open full quote form
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
