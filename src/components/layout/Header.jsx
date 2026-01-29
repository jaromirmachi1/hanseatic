import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="container container--nav header-inner">
          <a
            className="brand"
            href="#top"
            aria-label="Hanseatic – domů"
            onClick={closeMenu}
          >
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Hanseatic</span>
          </a>

          <button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`nav-toggle-icon ${isMenuOpen ? "nav-toggle-icon--open" : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <nav className="nav nav--desktop" aria-label="Hlavní navigace">
            <a className="nav-link" href="#about">
              O nás
            </a>
            <a className="nav-link" href="#materials">
              Materiály
            </a>
            <a className="nav-link" href="#process">
              Řemeslo
            </a>
            <a className="nav-link" href="#gallery">
              Galerie
            </a>
            <a className="nav-link nav-link--cta" href="#contact">
              Vyžádat nabídku
            </a>
          </nav>
        </div>
      </header>

      <nav
        className={`nav nav--mobile ${isMenuOpen ? "nav--open" : ""}`}
        aria-label="Hlavní navigace"
      >
        <div className="nav-mobile-content">
          <div className="nav-mobile-header">
            <span className="nav-mobile-eyebrow">Navigace</span>
          </div>
          <div className="nav-mobile-links">
            <a
              className="nav-link nav-link--mobile"
              href="#about"
              onClick={closeMenu}
            >
              <span className="nav-link-text">O nás</span>
              <span className="nav-link-number">01</span>
            </a>
            <a
              className="nav-link nav-link--mobile"
              href="#materials"
              onClick={closeMenu}
            >
              <span className="nav-link-text">Materiály</span>
              <span className="nav-link-number">02</span>
            </a>
            <a
              className="nav-link nav-link--mobile"
              href="#process"
              onClick={closeMenu}
            >
              <span className="nav-link-text">Řemeslo</span>
              <span className="nav-link-number">03</span>
            </a>
            <a
              className="nav-link nav-link--mobile"
              href="#gallery"
              onClick={closeMenu}
            >
              <span className="nav-link-text">Galerie</span>
              <span className="nav-link-number">04</span>
            </a>
            <a
              className="nav-link nav-link--mobile nav-link--cta"
              href="#contact"
              onClick={closeMenu}
            >
              <span className="nav-link-text">Vyžádat nabídku</span>
              <span className="nav-link-number">05</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
