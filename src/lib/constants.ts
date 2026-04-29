/**
 * Site & contact — replace placeholders with your real business details.
 * REPLACE: Real photos — Bambu Lab P1S Combo, Creality Ender-3 S1 Pro, customer prints in /public/gallery.
 * REPLACE: WhatsApp digits (CONTACT.whatsapp), phone, email, address, Instagram.
 */
export const CONTACT = {
  businessName: "LayerForge 3D",
  /** E.164-style; shown and used in tel: links */
  phone: "+1 (555) 000-0000",
  /** Digits only, no + — used in https://wa.me/ */
  whatsapp: "15550000000",
  email: "hello@layerforge3d.com",
  city: "Your City, Region",
  addressLine: "Pickup by appointment — update this address",
  instagramHandle: "@layerforge3d",
  instagramUrl: "https://instagram.com/layerforge3d",
  linkedinUrl: "https://linkedin.com/company/layerforge3d",
  businessHours: "Mon–Sat · 9:00–18:00 (local time)",
} as const;

export const SITE = {
  title: "LayerForge 3D | Custom 3D Printing Services",
  description:
    "Professional 3D printing services for prototypes, custom parts, miniatures, gifts, and small-batch production using Bambu Lab P1S Combo and Creality Ender-3 S1 Pro.",
  keywords: [
    "3D printing service",
    "custom 3D printing",
    "prototype printing",
    "PLA printing",
    "PETG printing",
    "TPU printing",
    "multi-color 3D printing",
    "STL OBJ 3MF printing",
    "design to print",
    "Bambu Lab P1S Combo",
    "Creality Ender-3 S1 Pro",
    "local 3D printing",
    "small batch 3D printing",
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
  { label: "Custom orders" },
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
    title: "Functional parts",
    description:
      "Brackets, mounts, and parts that need to hold loads or survive wear.",
    icon: "Wrench",
  },
  {
    key: "gifts",
    title: "Personalized gifts",
    description: "Nameplates, mementos, and one-of-one objects with story.",
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

/** Muted looping B-roll (Pexels, free to use). Swap for your own printer footage anytime. */
export const printerMotionClips = [
  {
    id: "motion-a",
    headline: "Layers stacking in real time",
    caption:
      "Stock FDM clip (Pexels / Pixabay). Replace with your Bambu Lab P1S Combo timelapse when ready.",
    src: "https://videos.pexels.com/video-files/855255/855255-hd_1280_720_25fps.mp4",
    creditLabel: "Video · Pixabay on Pexels",
    creditHref: "https://www.pexels.com/video/3d-printer-printing-855255/",
  },
  {
    id: "motion-b",
    headline: "Hot end, steady motion",
    caption:
      "Stock close-up clip (Pexels). Replace with your Creality Ender-3 S1 Pro B-roll when ready.",
    src: "https://videos.pexels.com/video-files/30318835/12996667_1920_1080_25fps.mp4",
    creditLabel: "Video · Jakub Zerdzicki on Pexels",
    creditHref:
      "https://www.pexels.com/video/vibrant-3d-printer-in-action-with-neon-lighting-30318835/",
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
};

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "g1",
    category: "Prototypes",
    title: "Ergonomic shell prototype",
    material: "PETG",
    printTimeLabel: "~14h est.",
    imageSrc:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Gray 3D printer creating a plastic part on the build plate",
  },
  {
    id: "g2",
    category: "Miniatures",
    title: "Character bust study",
    material: "PLA",
    printTimeLabel: "~9h est.",
    imageSrc:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Detailed small plastic figure from additive manufacturing",
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
  },
  {
    id: "g4",
    category: "Gifts",
    title: "Custom nameplate",
    material: "PLA+",
    printTimeLabel: "~5h est.",
    imageSrc:
      "https://images.pexels.com/photos/6893997/pexels-photo-6893997.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Decorative printed object with smooth plastic finish",
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
  },
  {
    id: "g6",
    category: "Tools and fixtures",
    title: "Assembly jig",
    material: "PLA+",
    printTimeLabel: "~6h est.",
    imageSrc:
      "https://images.pexels.com/photos/6779716/pexels-photo-6779716.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Workshop desk with 3D printer and printed mechanical parts",
  },
  {
    id: "g7",
    category: "Prototypes",
    title: "Mechanical housing draft",
    material: "PLA",
    printTimeLabel: "~12h est.",
    imageSrc:
      "https://images.pexels.com/photos/6153741/pexels-photo-6153741.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Prototype enclosure components beside a 3D printer",
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
  },
  {
    id: "g9",
    category: "Miniatures",
    title: "Terrain detail piece",
    material: "PLA",
    printTimeLabel: "~7h est.",
    imageSrc:
      "https://images.pexels.com/photos/9246760/pexels-photo-9246760.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Fine-detail terrain or hobby piece from a filament printer",
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
