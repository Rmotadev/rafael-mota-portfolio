import { Footer } from "@/components/Footer";
import { FxLayer } from "@/components/fx/FxLayer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { TechStrip } from "@/components/sections/TechStrip";

export default function Home() {
  return (
    <MotionProvider>
      <div className="noise pointer-events-none fixed inset-0 z-[60] opacity-[0.025] mix-blend-overlay" aria-hidden />
      <FxLayer />
      <Header />
      <main id="conteudo">
        <Hero />
        <TechStrip />
        <About />
        <Services />
        <Resume />
        <Projects />
        <Statement />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
