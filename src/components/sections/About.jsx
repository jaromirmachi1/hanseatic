export default function About() {
  return (
    <section className="section" id="about" aria-label="O společnosti">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">O společnosti</p>
            <h2 className="h2">Hanseatic</h2>
          </div>
          <p className="section-lede">
            Hanseatic působí na trhu od roku <strong>1990</strong>. Specializujeme
            se na dovoz podlahových krytin a příslušenství z celého světa.
          </p>
        </header>

        <div className="about-copy">
          <p className="muted">
            Stavíme na dlouholetých zkušenostech v mezinárodním obchodu a pečlivém
            výběru moderních, kvalitních materiálů.
          </p>
          <p className="muted">
            Sledujeme technologický vývoj a přinášíme řešení, která spojují
            funkčnost, design a dlouhodobou hodnotu.
          </p>
        </div>
      </div>
    </section>
  );
}


