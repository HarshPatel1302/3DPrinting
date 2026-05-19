import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Hero } from "@/components/Hero";
import { PrinterShowcase } from "@/components/PrinterShowcase";
import { Services } from "@/components/Services";
import { Materials } from "@/components/Materials";
import { Process } from "@/components/Process";
import { QuoteForm } from "@/components/QuoteForm";
import { Gallery } from "@/components/Gallery";
import { PrinterMotionSection } from "@/components/PrinterMotionSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <FloatingCTA />
      <main id="main">
        <Hero />
        <Gallery />
        <PrinterMotionSection />
        <section
          id="capabilities"
          aria-label="Capabilities and materials"
          className="scroll-mt-24 border-y border-white/5 bg-black/20 px-4 py-20 md:scroll-mt-28 sm:px-6 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <PrinterShowcase />
            <Materials />
          </div>
        </section>
        <Services />
        <section
          aria-label="Process and trust"
          className="border-y border-white/5 bg-black/25 px-4 py-20 sm:px-6 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Process />
            <WhyChooseUs />
          </div>
        </section>
        <QuoteForm />
        <section
          aria-label="Contact and frequently asked questions"
          className="border-y border-white/5 bg-black/20 px-4 py-20 sm:px-6 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            <Contact />
            <FAQ />
          </div>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
