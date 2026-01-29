export default function Gallery() {
  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1200&fit=crop&q=80",
      alt: "Moderní dřevěná podlaha v minimalistickém interiéru",
      aspect: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&q=80",
      alt: "Elegantní obývací prostor s prémiovou podlahovou krytinou",
      aspect: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop&q=80",
      alt: "Detail textury dřevěné podlahy v přirozeném světle",
      aspect: "square",
    },
  ];

  return (
    <section className="section gallery" id="gallery" aria-label="Galerie">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Galerie</p>
            <h2 className="h2">Světlo, textura, proporce.</h2>
          </div>
          <p className="section-lede">
            Prozkoumejte naše realizace v klidné sekvenci povrchů a prostorů.
          </p>
        </header>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <article
              key={index}
              className={`gallery-item gallery-item--${item.aspect}`}
            >
              <div className="gallery-item-media">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
