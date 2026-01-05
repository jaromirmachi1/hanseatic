/* Hanseatic — calm motion system (GSAP 3 + ScrollTrigger)
   Animation principles:
   - Long durations
   - Ease: power1.out / power2.out
   - No bounce / aggressive motion
   - Use ScrollTrigger scrub where appropriate (hero + gallery)
   - Performance: transform/opacity/clip-path only, no layout thrashing
*/

(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // If GSAP isn't available (e.g. offline without vendored scripts), fail gracefully.
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("[Hanseatic] GSAP/ScrollTrigger not found. Animations disabled.");
    return;
  }

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  gsap.registerPlugin(ScrollTrigger);

  // Optional smooth scrolling (Lenis). Works best when included from CDN.
  const lenis = initLenis();

  // Shared defaults: calm timing and easing.
  gsap.defaults({ ease: "power2.out" });

  // Build animations once fonts/images are ready enough for layout.
  // (We also refresh on window load to account for image decoding.)
  initAnimations({ reduceMotion });
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // -------------------------
  // Reusable animation helpers
  // -------------------------

  function fadeUp(targets, opts = {}) {
    const els = normalizeTargets(targets);
    if (!els.length) return;

    const {
      trigger = els[0],
      start = "top 80%",
      once = true,
      stagger = 0,
      y = 18,
      duration = 1.6,
    } = opts;

    gsap.fromTo(
      els,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: "power2.out",
        stagger,
        scrollTrigger: { trigger, start, once },
      },
    );
  }

  function fadeIn(targets, opts = {}) {
    const els = normalizeTargets(targets);
    if (!els.length) return;

    const { trigger = els[0], start = "top 85%", once = true, duration = 1.8 } = opts;

    gsap.fromTo(
      els,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration, ease: "power1.out", scrollTrigger: { trigger, start, once } },
    );
  }

  function clipReveal(container, opts = {}) {
    const el = typeof container === "string" ? document.querySelector(container) : container;
    if (!el) return;

    const {
      trigger = el,
      start = "top 75%",
      end = "bottom 60%",
      duration = 2.2,
      radius = 22,
    } = opts;

    // Clip-path reveal: avoids layout reflow, looks architectural.
    gsap.fromTo(
      el,
      { clipPath: `inset(0 0 100% 0 round ${radius}px)` },
      {
        clipPath: `inset(0 0 0% 0 round ${radius}px)`,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger, start, end },
      },
    );
  }

  // -------------------------
  // Section timelines
  // -------------------------

  function initAnimations({ reduceMotion }) {
    // Minimal, respectful motion when user prefers reduced motion.
    if (reduceMotion) {
      gsap.set("[data-animate]", { clearProps: "all" });
      gsap.set(".hero-content", { autoAlpha: 1, y: 0 });
      gsap.set(".hero-media img", { scale: 1 });
      gsap.set(".gallery-panel", { autoAlpha: 1, scale: 1 });
      return;
    }

    animateHeader();
    animateHero();
    animateMaterials();
    animateProcess();
    animateGallery();
    animateCTA();
  }

  function animateHeader() {
    // Soft fade-in for header on load (not scroll).
    gsap.fromTo(
      ".site-header",
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 1.6, ease: "power2.out", delay: 0.05 },
    );
  }

  function animateHero() {
    // Hero text: smooth fade + slight rise on load.
    gsap.fromTo(
      ".hero-content",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 2.1, ease: "power2.out", delay: 0.15 },
    );

    // Slow scroll-linked scale on the background image (scrubbed).
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
      },
    );
  }

  function animateMaterials() {
    const cards = document.querySelectorAll(".material-card");
    fadeUp(cards, { trigger: "#materials", stagger: 0.12, y: 20, duration: 1.7, start: "top 72%" });
  }

  function animateProcess() {
    // Text slides in gently.
    fadeUp(".process-copy > *", { trigger: ".process", stagger: 0.08, y: 16, duration: 1.7, start: "top 75%" });

    // Image reveal.
    clipReveal(".process-media", { trigger: ".process", start: "top 72%", end: "bottom 55%", duration: 2.3 });
  }

  function animateGallery() {
    const panels = gsap.utils.toArray(".gallery-panel");
    if (!panels.length) return;

    // Stack panels; cross-fade with subtle scale settling.
    gsap.set(panels, { autoAlpha: 0, scale: 1.04, transformOrigin: "center" });
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
      const prev = panels[i - 1];
      const next = panels[i];

      // Each "beat" feels like a slow editorial cut.
      tl.to(prev, { autoAlpha: 0, scale: 1.02, duration: 1.1 }, "+=0.35");
      tl.to(next, { autoAlpha: 1, scale: 1.0, duration: 1.2 }, "<");
    }

    // Overlay copy also eases in.
    fadeIn(".gallery-copy", { trigger: ".gallery", start: "top 90%", once: true, duration: 1.8 });
  }

  function animateCTA() {
    // Minimal: soft fade-up once.
    fadeUp(".cta-inner", { trigger: ".cta", start: "top 78%", once: true, y: 14, duration: 1.7 });
  }

  // -------------------------
  // Optional smooth scrolling
  // -------------------------

  function initLenis() {
    if (!window.Lenis) return null;

    try {
      const lenis = new Lenis({
        duration: 1.18, // calm
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => 1 - Math.pow(1 - t, 3), // close to power2.out
      });

      // Keep ScrollTrigger in sync with Lenis.
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // If we had to set up a custom scroller proxy, we'd do it here.
      // Lenis v1 works well with the default document scroller in most cases.
      return lenis;
    } catch (e) {
      console.warn("[Hanseatic] Lenis init failed. Falling back to native scroll.", e);
      return null;
    }
  }

  // -------------------------
  // Utilities
  // -------------------------

  function normalizeTargets(targets) {
    if (!targets) return [];
    if (typeof targets === "string") return Array.from(document.querySelectorAll(targets));
    if (targets instanceof Element) return [targets];
    return Array.from(targets);
  }
})();



