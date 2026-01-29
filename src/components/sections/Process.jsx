import vinylCloseup from "../../assets/vinylCloseup.jpg";

export default function Process() {
  return (
    <section
      className="section section--stone"
      id="process"
      aria-label="Řemeslo a proces"
    >
      <div className="container process">
        <div className="process-copy">
          <p className="eyebrow">Řemeslo</p>
          <h2 className="h2">Pečlivé plánování. Precizní pokládka.</h2>
          <p className="section-lede">
            Spolupracujeme s architekty, staviteli i majiteli, aby každý povrch
            působil čistě ve světle, stínu i čase.
          </p>

          <ol className="process-steps">
            <li>
              <strong>Konzultace</strong> — klidná, detailní specifikace.
            </li>
            <li>
              <strong>Příprava</strong> — vyrovnání podkladu a kontrola
              vlhkosti.
            </li>
            <li>
              <strong>Pokládka</strong> — přesný rastr, těsné spáry, tiché
              hrany.
            </li>
            <li>
              <strong>Dokončení</strong> — ochranné úpravy a dlouhodobé
              doporučení.
            </li>
          </ol>
        </div>

        <figure className="process-media" aria-label="Fotografie řemesla">
          <img
            src={vinylCloseup}
            alt="Detail řemesla - precizní pokládka podlahové krytiny s detailním pohledem na spojení prken"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
