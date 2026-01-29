export default function CTA() {
  return (
    <section className="section cta" id="contact" aria-label="Vyžádat nabídku">
      <div className="container container--content cta-inner">
        <p className="eyebrow">Další krok</p>
        <h2 className="h2">Vyžádejte si nabídku.</h2>
        <p className="section-lede">
          Napište nám prostor, termín a směr materiálu. Odpovíme jasně — bez
          šumu.
        </p>

        <form className="cta-form" autoComplete="on">
          <label className="field">
            <span className="field-label">Jméno</span>
            <input
              className="field-input"
              type="text"
              name="name"
              placeholder="Vaše jméno"
            />
          </label>

          <label className="field">
            <span className="field-label">E-mail</span>
            <input
              className="field-input"
              type="email"
              name="email"
              placeholder="vy@studio.cz"
            />
          </label>

          <label className="field field--full">
            <span className="field-label">Projekt</span>
            <textarea
              className="field-input field-input--textarea"
              name="project"
              rows="4"
              placeholder="Metry čtvereční, lokalita, preferovaný materiál…"
            />
          </label>

          <div className="cta-actions">
            <button className="btn" type="button">
              Odeslat poptávku
            </button>
            <p className="fineprint">
              Toto je statická ukázka. Formulář později napojte na backend.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
