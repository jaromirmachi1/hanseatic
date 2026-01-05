import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Local “mock photo” SVGs (offline-friendly).
import heroImg from "./assets/photo-hero.svg";
import processImg from "./assets/photo-process.svg";
import woodImg from "./assets/material-wood.svg";
import vinylImg from "./assets/material-vinyl.svg";
import carpetImg from "./assets/material-carpet.svg";
import stoneImg from "./assets/material-stone.svg";
import g1 from "./assets/photo-gallery-01.svg";
import g2 from "./assets/photo-gallery-02.svg";
import g3 from "./assets/photo-gallery-03.svg";

export default function App() {
  useEffect(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  useLayoutEffect(() => {
    // Respect reduced motion.
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) return undefined;

    // Optional smooth scrolling (Lenis)
    // - Keeps motion calm and consistent
    // - Syncs ScrollTrigger on each Lenis scroll tick
    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 3), // close to power2.out
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Shared defaults: calm timing and easing.
    gsap.defaults({ ease: "power2.out" });

    // 1) Header: soft fade on load (not scroll)
    gsap.fromTo(
      ".site-header",
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 1.6, ease: "power2.out", delay: 0.05 }
    );

    // 2) Hero: text fade-in + scroll-linked scale on background
    gsap.fromTo(
      ".hero-content",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 2.1, ease: "power2.out", delay: 0.15 }
    );

    gsap.fromTo(
      ".hero-media img",
      { scale: 1.02 },
      {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    // 3) Materials: stagger fade-up on scroll
    gsap.fromTo(
      ".material-card",
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: "#materials", start: "top 72%", once: true },
      }
    );

    // 4) Process: gentle text slide + image clip reveal
    gsap.fromTo(
      ".process-copy > *",
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process", start: "top 75%", once: true },
      }
    );

    gsap.fromTo(
      ".process-media",
      { clipPath: "inset(0 0 100% 0 round 22px)" },
      {
        clipPath: "inset(0 0 0% 0 round 22px)",
        duration: 2.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process",
          start: "top 72%",
          end: "bottom 55%",
        },
      }
    );

    // 5) Gallery: pinned, scrubbed crossfades between edge-to-edge images
    const panels = gsap.utils.toArray(".gallery-panel");
    if (panels.length) {
      gsap.set(panels, {
        autoAlpha: 0,
        scale: 1.04,
        transformOrigin: "center",
      });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1.01 });

      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".gallery",
          start: "top top",
          end: `+=${Math.max(2400, panels.length * 1200)}`,
          scrub: 1.15,
          pin: ".gallery-pin",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < panels.length; i += 1) {
        tl.to(
          panels[i - 1],
          { autoAlpha: 0, scale: 1.02, duration: 1.1 },
          "+=0.35"
        );
        tl.to(panels[i], { autoAlpha: 1, scale: 1.0, duration: 1.2 }, "<");
      }

      gsap.fromTo(
        ".gallery-copy",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.8,
          ease: "power1.out",
          scrollTrigger: { trigger: ".gallery", start: "top 90%", once: true },
        }
      );
    }

    // 6) CTA: minimal fade-up
    gsap.fromTo(
      ".cta-inner",
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta", start: "top 78%", once: true },
      }
    );

    // Cleanup on unmount (important in React dev mode / HMR).
    return () => {
      try {
        lenis.destroy();
      } catch {
        // ignore
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Hanseatic home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Hanseatic</span>
          </a>

          <nav className="nav" aria-label="Primary">
            <a className="nav-link" href="#materials">
              Materials
            </a>
            <a className="nav-link" href="#process">
              Craft
            </a>
            <a className="nav-link" href="#gallery">
              Gallery
            </a>
            <a className="nav-link nav-link--cta" href="#contact">
              Request a quote
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-label="Hanseatic hero">
          <div className="hero-media" aria-hidden="true">
            <img
              src={heroImg}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="hero-scrim" aria-hidden="true" />
          </div>

          <div className="container hero-content">
            <p className="eyebrow">Premium flooring, quietly confident.</p>
            <h1 className="hero-title">
              Scandinavian calm. Architectural precision.
            </h1>
            <p className="hero-subtitle">
              Hanseatic delivers refined surfaces for residential and commercial
              spaces—crafted with restraint, installed with care, finished with
              longevity in mind.
            </p>

            <div className="hero-actions">
              <a className="btn" href="#materials">
                Explore materials
              </a>
              <a className="btn btn--ghost" href="#contact">
                Request a quote
              </a>
            </div>

            <p className="hero-note">Scroll slowly</p>
          </div>
        </section>

        <section className="section" id="materials" aria-label="Materials">
          <div className="container">
            <header className="section-head">
              <div>
                <p className="eyebrow">Materials</p>
                <h2 className="h2">Surface, tone, texture.</h2>
              </div>
              <p className="section-lede">
                Curated options for modern interiors—each selected for
                tactility, performance, and understated warmth.
              </p>
            </header>

            <div className="materials-grid">
              <article className="material-card">
                <div className="material-media">
                  <img
                    src={woodImg}
                    alt="Warm wood flooring texture"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="h3">Wood</h3>
                <p className="muted">
                  Natural grain, matte finish, soft underfoot.
                </p>
              </article>

              <article className="material-card">
                <div className="material-media">
                  <img
                    src={vinylImg}
                    alt="Minimal vinyl flooring surface"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="h3">Vinyl</h3>
                <p className="muted">
                  Quiet durability—ideal for high-traffic zones.
                </p>
              </article>

              <article className="material-card">
                <div className="material-media">
                  <img
                    src={carpetImg}
                    alt="Textured carpet surface in neutral tones"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="h3">Carpet</h3>
                <p className="muted">
                  Soft acoustics, subtle texture, calm spaces.
                </p>
              </article>

              <article className="material-card">
                <div className="material-media">
                  <img
                    src={stoneImg}
                    alt="Stone flooring surface in pale beige tones"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="h3">Stone</h3>
                <p className="muted">
                  Quiet mass, clean lines, timeless presence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section section--stone"
          id="process"
          aria-label="Craft and process"
        >
          <div className="container process">
            <div className="process-copy">
              <p className="eyebrow">Craft</p>
              <h2 className="h2">Measured planning. Precise installation.</h2>
              <p className="section-lede">
                We work with architects, builders, and homeowners to ensure each
                surface reads cleanly across light, shadow, and time.
              </p>

              <ol className="process-steps">
                <li>
                  <strong>Consult</strong> — a calm, detailed specification
                  session.
                </li>
                <li>
                  <strong>Prepare</strong> — subfloor leveling and moisture
                  control.
                </li>
                <li>
                  <strong>Install</strong> — accurate layout, tight seams, quiet
                  edges.
                </li>
                <li>
                  <strong>Finish</strong> — protective treatments and long-term
                  guidance.
                </li>
              </ol>
            </div>

            <figure className="process-media" aria-label="Craft photography">
              <img
                src={processImg}
                alt="Craft detail placeholder image"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="gallery" id="gallery" aria-label="Gallery">
          <div className="gallery-pin">
            <div className="gallery-track" aria-hidden="true">
              <figure className="gallery-panel">
                <img
                  src={g1}
                  alt="Gallery image 1"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="gallery-panel">
                <img
                  src={g2}
                  alt="Gallery image 2"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="gallery-panel">
                <img
                  src={g3}
                  alt="Gallery image 3"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="gallery-overlay">
              <div className="container gallery-copy">
                <p className="eyebrow">Gallery</p>
                <h2 className="h2">Light, texture, proportion.</h2>
                <p className="muted">
                  Scroll to move through a calm sequence of surfaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section cta"
          id="contact"
          aria-label="Request a quote"
        >
          <div className="container cta-inner">
            <p className="eyebrow">Next</p>
            <h2 className="h2">Request a quote.</h2>
            <p className="section-lede">
              Tell us the space, the timeline, and the material direction. We’ll
              respond with clarity—and no noise.
            </p>

            <form className="cta-form" autoComplete="on">
              <label className="field">
                <span className="field-label">Name</span>
                <input
                  className="field-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                />
              </label>

              <label className="field">
                <span className="field-label">Email</span>
                <input
                  className="field-input"
                  type="email"
                  name="email"
                  placeholder="you@studio.com"
                />
              </label>

              <label className="field field--full">
                <span className="field-label">Project</span>
                <textarea
                  className="field-input field-input--textarea"
                  name="project"
                  rows="4"
                  placeholder="Square meters, location, preferred material…"
                />
              </label>

              <div className="cta-actions">
                <button className="btn" type="button">
                  Send request
                </button>
                <p className="fineprint">
                  This is a static demo. Hook the form to your backend later.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p className="muted">
            © <span id="year" /> Hanseatic Flooring. Quiet luxury, built to
            last.
          </p>
          <p className="muted">Images are local SVG placeholders.</p>
        </div>
      </footer>
    </>
  );
}
