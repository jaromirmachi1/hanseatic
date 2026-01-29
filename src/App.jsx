import { useRef } from "react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Materials from "./components/sections/Materials.jsx";
import Process from "./components/sections/Process.jsx";
import Gallery from "./components/sections/Gallery.jsx";
import CTA from "./components/sections/CTA.jsx";
import { useHanseaticMotion } from "./hooks/useHanseaticMotion.js";

export default function App() {
  const rootRef = useRef(null);
  useHanseaticMotion(rootRef);

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Materials />
        <div className="shared-aurora-wrapper">
          <Process />
          <Gallery />
        </div>
        <About />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
