import { CONTACT, SITE, getSiteUrl } from "@/lib/constants";

/** Rich LocalBusiness graph + printer offers. Replace contact fields in constants when deploying. */
export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService", "ManufacturingService"],
        "@id": `${baseUrl}/#business`,
        name: CONTACT.businessName,
        description: SITE.description,
        url: baseUrl,
        telephone: CONTACT.phone,
        email: CONTACT.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: CONTACT.city,
          streetAddress: CONTACT.addressLine,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: { "@type": "Place", name: CONTACT.city },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Bambu Lab P1S Combo printing",
              description:
                "Enclosed CoreXY, AMS multi-color and multi-material production.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Creality Ender-3 S1 Pro printing",
              description:
                "Direct-drive extruder, high-temperature printing, flexible and engineering materials.",
            },
          },
        ],
      },
    ],
  };
}
