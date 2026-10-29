import Link from "next/link";
import { copy, Locale } from "../../lib/i18n";
export default function Home({ params }: { params: { locale: Locale } }) {
  const t = copy[params.locale] || copy["zh-hant"];
  return (
    <main>
      <section className="hero hero-banner">
        <img
          className="hero-image"
          src="/stitch/hero-stage.jpg"
          alt="現場舞台製作"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow">{t.heroEyebrow}</div>
          <h1 className={'locale-' + params.locale}>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <Link
              className="btn btn-primary"
              href={"/" + params.locale + "/services"}
            >
              {t.cta}
            </Link>
            <Link
              className="btn btn-light"
              href={"/" + params.locale + "/about"}
            >
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">MIRAI / VALUES</div>
            <h2>{t.philosophy}</h2>
            <p>{t.philosophyText}</p>
          </div>
          <div className="cards">
            {t.cards.map((c, i) => (
              <article className={"card " + (i === 2 ? "dark" : "")} key={c[1]}>
                <div className="icon">{c[0]}</div>
                <h3>{c[1]}</h3>
                <p>{c[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div>
            <div className="eyebrow">PRODUCTION PARTNERS</div>
            <h2>{t.collab}</h2>
            <p>{t.collabText}</p>
            <Link
              href={"/" + params.locale + "/contact"}
              className="btn btn-ghost"
            >
              {t.past} ↗
            </Link>
          </div>
          <div className="gallery">
            <img src="/stitch/office.jpg" alt="團隊協作" />
            <img src="/stitch/fanmeeting.jpg" alt="舞台製作" />
          </div>
        </div>
      </section>
    </main>
  );
}
