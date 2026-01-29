import woodImg from "../../assets/material-wood.svg";
import pvcImg from "../../assets/pvc.webp";
import carpetImg from "../../assets/carpet.webp";
import stoneImg from "../../assets/stone.webp";

export default function Materials() {
  return (
    <section className="section" id="materials" aria-label="Materiály">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Materiály</p>
            <h2 className="h2">Povrch, tón, textura.</h2>
          </div>
          <p className="section-lede">
            Kurátorovaný výběr pro moderní interiéry — s důrazem na hmat,
            odolnost a klidné teplo.
          </p>
        </header>

        <div className="materials-grid">
          <article className="material-card">
            <div className="material-media">
              <img
                src={woodImg}
                alt="Teplá textura dřevěné podlahy"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="h3">Dřevo</h3>
            <p className="muted">
              Přirozená kresba, matný vzhled, příjemné na došlap.
            </p>
          </article>

          <article className="material-card">
            <div className="material-media">
              <img
                src={pvcImg}
                alt="PVC podlaha (vinyl) – detail povrchu"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="h3">Vinyl</h3>
            <p className="muted">Tichá odolnost — ideální do vytížených zón.</p>
          </article>

          <article className="material-card">
            <div className="material-media">
              <img
                src={carpetImg}
                alt="Koberec – detail textury"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="h3">Koberec</h3>
            <p className="muted">
              Měkčí akustika, jemná textura, klidné prostory.
            </p>
          </article>

          <article className="material-card">
            <div className="material-media">
              <img
                src={stoneImg}
                alt="Kámen – detail povrchu"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="h3">Kámen</h3>
            <p className="muted">
              Tichá hmota, čisté linie, nadčasová přítomnost.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
