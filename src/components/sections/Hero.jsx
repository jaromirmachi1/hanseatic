import { HERO_IMG } from "../../config/images";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Hanseatic – úvod">
      <div className="hero-media" aria-hidden="true">
        <img
          src={HERO_IMG}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-scrim" aria-hidden="true" />
      </div>

      <div className="container container--hero hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">Základ prostoru.</span>
          <span className="hero-title-line">Přesnost provedení.</span>
        </h1>

        <div className="hero-actions">
          <a className="btn" href="#materials">
            Prozkoumat materiály
          </a>
          <a className="btn btn--ghost" href="#contact">
            Vyžádat nabídku
          </a>
        </div>
      </div>
    </section>
  );
}
