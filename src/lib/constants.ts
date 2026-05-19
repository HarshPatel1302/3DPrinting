/**
 * Site & contact — single source of truth for The Print Patel.
 * Real photos live in /public/gallery, real timelapses in /public/videos.
 */
export const CONTACT = {
  businessName: "The Print Patel",
  /** E.164-style; shown and used in tel: links. */
  phone: "+91 79770 51147",
  /** Digits only, no + — used in https://wa.me/. Same number as phone (India +91). */
  whatsapp: "917977051147",
  email: "harshchoudhary882.hc@gmail.com",
  city: "Kharghar, Navi Mumbai",
  addressLine: "Pickup & local delivery — DM to confirm",
  instagramHandle: "@theprintpatel",
  instagramUrl: "https://instagram.com/theprintpatel",
  businessHours: "Open 24/7 · Every day",
  tagline: "Imagine it. Patel prints it.",
  bioBlurb:
    "Your friendly Patel for 3D prints — Gifts • Prototypes • Jugaad parts. Filament made, Patel approved.",
  dmCta: "DM karo, print kari daishu.",
} as const;

export const SITE = {
  title:
    "The Print Patel | Custom 3D Printing — Imagine it. Patel prints it.",
  description:
    "The Print Patel — your friendly Patel for custom 3D printing. Gifts, prototypes, jugaad parts and multi-color prints on Bambu Lab P1S Combo and Creality Ender-3 S1 Pro. DM karo, print kari daishu.",
  keywords: [
    "The Print Patel",
    "theprintpatel",
    "3D printing service",
    "custom 3D printing India",
    "3D printed gifts",
    "jugaad parts",
    "prototype printing",
    "multi-color 3D printing",
    "AMS PLA prints",
    "PLA printing",
    "PETG printing",
    "TPU printing",
    "STL OBJ 3MF printing",
    "Bambu Lab P1S Combo",
    "Creality Ender-3 S1 Pro",
    "small batch 3D printing",
    "Kharghar 3D printing",
    "Navi Mumbai 3D printing",
  ],
} as const;

export function getSiteUrl(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function waMeLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailtoQuote(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const trustBadges = [
  { label: "Multi-color prints" },
  { label: "High-detail printing" },
  { label: "Functional parts" },
  { label: "Fast turnaround" },
  { label: "Custom & jugaad orders" },
] as const;

export const printers = [
  {
    id: "p1s",
    name: "Bambu Lab P1S Combo",
    tagline: "Enclosed speed. AMS color.",
    bullets: [
      "Fully enclosed CoreXY workhorse",
      "Print speeds up to 500 mm/s (typical jobs tuned for quality)",
      "256 × 256 × 256 mm build volume",
      "AMS multi-color & multi-material workflows",
      "Ideal for clean, accurate, professional & multi-color output",
    ],
    accent: "cyan" as const,
  },
  {
    id: "ender",
    name: "Creality Ender-3 S1 Pro",
    tagline: "Direct drive. High temp. Flexibles.",
    bullets: [
      "Sprite full-metal direct-drive extruder",
      "Hotend up to 300 °C for demanding materials",
      "CR Touch auto bed leveling",
      "PEI spring steel magnetic bed",
      "Strong for prototypes, TPU, and functional parts",
    ],
    accent: "green" as const,
  },
] as const;

export type ServiceItem = {
  key: string;
  title: string;
  description: string;
  icon: string;
};

export const services: ServiceItem[] = [
  {
    key: "designprint",
    title: "Design-to-print service",
    description:
      "From napkin sketch to printable file — guidance on CAD, tolerances, and build orientation.",
    icon: "PenLine",
  },
  {
    key: "proto",
    title: "Product prototyping",
    description:
      "Validate fit, feel, and function before you invest in tooling.",
    icon: "Boxes",
  },
  {
    key: "custom",
    title: "Custom 3D models",
    description: "Bring us a concept or CAD — we help you get to a printable part.",
    icon: "Shapes",
  },
  {
    key: "mini",
    title: "Miniatures & collectibles",
    description: "Crisp details for display pieces you will be proud to show off.",
    icon: "Sparkles",
  },
  {
    key: "replace",
    title: "Replacement parts",
    description: "Recreate discontinued clips, knobs, housings, and brackets.",
    icon: "Puzzle",
  },
  {
    key: "functional",
    title: "Functional & jugaad parts",
    description:
      "Brackets, mounts, fixes — parts that need to hold loads or solve a real-world hack.",
    icon: "Wrench",
  },
  {
    key: "gifts",
    title: "Personalized gifts",
    description: "Nameplates, mementos, anime/pop-culture pieces, one-of-one objects with story.",
    icon: "Gift",
  },
  {
    key: "samples",
    title: "Business samples",
    description: "Lookbooks, shelf demos, and client-facing models that sell the idea.",
    icon: "Briefcase",
  },
  {
    key: "batch",
    title: "Small-batch production",
    description: "Consistent short runs when injection molding is not practical yet.",
    icon: "Layers",
  },
  {
    key: "stl",
    title: "STL / OBJ / 3MF prep",
    description:
      "Mesh cleanup, slicing support, thickness checks, and print-ready delivery.",
    icon: "FileCheck2",
  },
];

export type MaterialItem = {
  id: string;
  name: string;
  short: string;
  bestFor: string;
  color: string;
};

export const materials: MaterialItem[] = [
  {
    id: "pla",
    name: "PLA",
    short: "Crisp & approachable",
    bestFor: "Decorative pieces, early prototypes, gifts, and display models.",
    color: "#22d3ee",
  },
  {
    id: "plap",
    name: "PLA+",
    short: "Tougher everyday",
    bestFor: "More durable everyday parts while staying easy to print.",
    color: "#67e8f9",
  },
  {
    id: "petg",
    name: "PETG",
    short: "Strong & chemical resistant",
    bestFor: "Stronger functional parts, mechanical brackets, outdoor exposure.",
    color: "#34d399",
  },
  {
    id: "tpu",
    name: "TPU",
    short: "Flexible & shock absorbing",
    bestFor: "Grips, bumpers, vibration dampers, living hinges.",
    color: "#a78bfa",
  },
  {
    id: "absasa",
    name: "ABS / ASA",
    short: "Heat resistant",
    bestFor: "Higher-temp use; enclosure-supported jobs where specified.",
    color: "#fb923c",
  },
  {
    id: "multi",
    name: "Multi-color (AMS)",
    short: "Brand-ready color",
    bestFor: "Logos, nameplates, gifts, and multi-color display models.",
    color: "#f472b6",
  },
  {
    id: "specialty",
    name: "Specialty",
    short: "Ask about spools",
    bestFor: "Wood/metal fill, CF blends, and other filaments when the job fits.",
    color: "#fde047",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Send your file or idea",
    body: "STL, OBJ, or 3MF — or sketches and photos if you need design help first.",
  },
  {
    step: 2,
    title: "Review and quote",
    body: "We review geometry, material fit, and timeline — then send a clear quote.",
  },
  {
    step: 3,
    title: "Material and color selection",
    body: "Choose filament, color, and finish goals; we confirm what works on each printer.",
  },
  {
    step: 4,
    title: "Slicing and print preparation",
    body: "Orientation, supports, and toolpaths tuned for strength and surface quality.",
  },
  {
    step: 5,
    title: "Printing and quality check",
    body: "Tracked runs, inspection, and cleanup so the part matches the plan.",
  },
  {
    step: 6,
    title: "Pickup or delivery",
    body: "Local pickup or shipping — coordinated with your deadline.",
  },
] as const;

export type PrinterMotionClip = {
  id: string;
  headline: string;
  caption: string;
  src: string;
  webmSrc?: string;
  posterSrc?: string;
  /** Optional credit metadata (only stock clips need this). */
  creditLabel?: string;
  creditHref?: string;
};

/** Featured timelapses captured on our own printers. */
export const printerMotionClips: readonly PrinterMotionClip[] = [
  {
    id: "tl-feature-1",
    headline: "Long-run timelapse on the P1S",
    caption:
      "A full job condensed into a minute — clean layer lines, AMS-ready, zero drama.",
    src: "/videos/tl-feature-1.mp4",
    webmSrc: "/videos/tl-feature-1.webm",
    posterSrc: "/videos/tl-feature-1.jpg",
  },
  {
    id: "tl-feature-2",
    headline: "Layers stacking, real time",
    caption:
      "Watch a part grow line by line — the satisfying part of additive manufacturing.",
    src: "/videos/tl-feature-2.mp4",
    webmSrc: "/videos/tl-feature-2.webm",
    posterSrc: "/videos/tl-feature-2.jpg",
  },
] as const;

/** More timelapses for the grid section under the featured pair. */
export const extraTimelapses: readonly PrinterMotionClip[] = [
  {
    id: "tl-extra-1",
    headline: "Multi-color pass",
    caption: "AMS swapping colors mid-print — branded plaques and gifts.",
    src: "/videos/tl-extra-1.mp4",
    webmSrc: "/videos/tl-extra-1.webm",
    posterSrc: "/videos/tl-extra-1.jpg",
  },
  {
    id: "tl-extra-2",
    headline: "Detail run on small parts",
    caption: "Crisp infill and steady extrusion on miniature work.",
    src: "/videos/tl-extra-2.mp4",
    webmSrc: "/videos/tl-extra-2.webm",
    posterSrc: "/videos/tl-extra-2.jpg",
  },
  {
    id: "tl-extra-3",
    headline: "Quick print, no fuss",
    caption: "A short print captured end to end — practical, repeatable jobs.",
    src: "/videos/tl-extra-3.mp4",
    webmSrc: "/videos/tl-extra-3.webm",
    posterSrc: "/videos/tl-extra-3.jpg",
  },
] as const;

export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  material: string;
  printTimeLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** Stock photos render a "Stock photo" overlay; local prints do not. */
  stock?: boolean;
};

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "p-katana",
    category: "Gifts & cosplay",
    title: "Two-tone katana display piece",
    material: "PLA · purple + black wrap",
    printTimeLabel: "Multi-part assembly",
    imageSrc: "/gallery/katana-purple.png",
    imageAlt:
      "Display katana with grey blade, black tsuba and purple wrapped handle, 3D printed by The Print Patel",
  },
  {
    id: "p-keyholder",
    category: "Functional parts",
    title: "Wall-mount key holder shelf",
    material: "PLA · black",
    printTimeLabel: "Single-piece print",
    imageSrc: "/gallery/key-holder.png",
    imageAlt:
      "Black 3D-printed wall-mounted key holder with arched shelf and five hooks holding keys",
  },
  {
    id: "p-gengar",
    category: "Miniatures & collectibles",
    title: "Gengar collectible figure",
    material: "PLA · purple, painted accents",
    printTimeLabel: "Painted finish",
    imageSrc: "/gallery/gengar.png",
    imageAlt:
      "Purple Gengar Pokemon figure, 3D printed and hand-painted with red eyes and white teeth",
  },
  {
    id: "g3",
    category: "Functional parts",
    title: "Replacement hinge block",
    material: "PETG",
    printTimeLabel: "~3h est.",
    imageSrc:
      "https://images.pexels.com/photos/4339335/pexels-photo-4339335.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Functional plastic bracket printed in light gray filament",
    stock: true,
  },
  {
    id: "g5",
    category: "Multi-color prints",
    title: "Logo plaque (AMS)",
    material: "AMS · PLA",
    printTimeLabel: "~4h est.",
    imageSrc:
      "https://images.pexels.com/photos/8961124/pexels-photo-8961124.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Colorful plastic pieces arranged after 3D printing",
    stock: true,
  },
  {
    id: "g8",
    category: "Functional parts",
    title: "Cable management clip",
    material: "PETG",
    printTimeLabel: "~2h est.",
    imageSrc:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Small sturdy clips and organizers printed from plastic",
    stock: true,
  },
] as const;

export const whyChooseUs = [
  {
    title: "Fast turnaround",
    body: "Quick iteration from file to part — without factory lead times.",
  },
  {
    title: "Multi-color printing",
    body: "AMS workflows on the P1S Combo for logos, gifts, and display models.",
  },
  {
    title: "Functional material support",
    body: "PETG, TPU, higher-temp options on the Ender-3 S1 Pro when the part works for a living.",
  },
  {
    title: "Two-printer capability",
    body: "Enclosed CoreXY plus direct-drive — we route each job to the right machine.",
  },
  {
    title: "Quality checks",
    body: "Layer quality, key dimensions, and cosmetics inspected before handoff.",
  },
  {
    title: "Beginner-friendly guidance",
    body: "No file yet? We help you go from idea to a printable plan with clear steps.",
  },
  {
    title: "Honest pricing",
    body: "Quotes from material, time, and complexity — not hidden add-ons.",
  },
] as const;

export const faqItems = [
  {
    q: "What file formats do you accept?",
    a: "STL, OBJ, and 3MF are ideal. STEP/STP can work for quoting in many cases — ask if you are unsure.",
  },
  {
    q: "Can you print without an STL file?",
    a: "Yes — photos, sketches, or reference parts are enough to start. Design and prep may be quoted separately.",
  },
  {
    q: "How long does printing take?",
    a: "It depends on size, layer height, material, and complexity. Every quote includes a time estimate.",
  },
  {
    q: "Which material should I choose?",
    a: "Looks-first → PLA/PLA+. Stronger indoor parts → PETG. Flexible → TPU. Heat exposure → ask about ABS/ASA and printer fit.",
  },
  {
    q: "Can you print multi-color?",
    a: "Yes — the Bambu Lab P1S Combo with AMS supports multi-color and multi-material prints.",
  },
  {
    q: "What is the maximum print size?",
    a: "Roughly up to 256 × 256 × 256 mm on the P1S when the part fits in one piece; larger ideas may need splitting.",
  },
  {
    q: "How is pricing calculated?",
    a: "From model size, material, print time, weight, finishing, and complexity. Rush jobs may include a priority fee.",
  },
  {
    q: "Do you deliver?",
    a: "Local pickup and shipping are available depending on your location — confirmed in the quote.",
  },
] as const;
