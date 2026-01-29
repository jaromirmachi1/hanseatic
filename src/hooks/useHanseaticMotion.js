import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Hanseatic motion system
 * - calm easing + long durations
 * - ScrollTrigger scrub where appropriate (hero scale + gallery)
 * - optional Lenis smooth scrolling (kept subtle)
 *
 * Uses gsap.context to scope selectors and cleanup safely during HMR/dev.
 */
export function useHanseaticMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef?.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 3), // close to power2.out
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    gsap.defaults({ ease: "power2.out" });

    const ctx = gsap.context(() => {
      // Header: soft fade on load (not scroll)
      gsap.fromTo(
        ".site-header",
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 1.6, ease: "power2.out", delay: 0.05 }
      );

      // Hero: text fade-in + scroll-linked scale on background
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

      // Materials: stagger fade-up on scroll
      gsap.fromTo(
        ".material-card",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#materials",
            start: "top 72%",
            once: true,
          },
        }
      );

      // Process: gentle text slide + image clip reveal
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

      // Gallery: staggered grid items with parallax on scroll
      const galleryItems = gsap.utils.toArray(".gallery-item");
      if (galleryItems.length) {
        // Staggered fade-up reveal
        gsap.fromTo(
          galleryItems,
          { autoAlpha: 0, y: 32, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".gallery",
              start: "top 75%",
              once: true,
            },
          }
        );

        // Subtle parallax on scroll for each item
        galleryItems.forEach((item, index) => {
          gsap.fromTo(
            item.querySelector(".gallery-item-media img"),
            { y: 0 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
      }

      // CTA: minimal fade-up
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
    }, root);

    // Refresh after load (accounts for image decoding/layout).
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
      try {
        lenis.destroy();
      } catch {
        // ignore
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(lenis?.raf);
    };
  }, [rootRef]);
}
