"use client";

import { CONTACT, waMeLink } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <div
      id="contact"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="contact-heading"
    >
      <div>
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
      </div>
    </div>
  );
}
