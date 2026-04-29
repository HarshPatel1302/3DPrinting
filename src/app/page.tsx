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
        <div id="capabilities" className="scroll-mt-24 md:scroll-mt-28">
          <PrinterShowcase />
          <Materials />
        </div>
        <Services />
        <Process />
        <QuoteForm />
        <WhyChooseUs />
        <FAQ />
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}
