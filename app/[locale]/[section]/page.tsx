import Link from "next/link";
import { AiOutlineMail, AiOutlineArrowRight } from "react-icons/ai";
import { copy, Locale } from "../../../lib/i18n";
import ContactForm from "../../components/contact-form";

const images = {
  artists: "/stitch/hero-stage.jpg",
  services: "/stitch/fanmeeting.jpg",
  about: "/stitch/office.jpg",
  contact: "/stitch/office.jpg",
};

export default function Section({
  params,
}: {
  params: { locale: Locale; section: string };
}) {
  const t = copy[params.locale] || copy["zh-hant"];
  const section = params.section as keyof typeof images;
  if (section === "services")
    return (
      <main className="subpage services-page">
        <div className="container sub-intro">
          <div className="eyebrow">MIRAI STAGE / SERVICES</div>
          <h1>
            {params.locale === "en"
              ? "Professional Production & Artist Services"
              : t.nav[1]}
          </h1>
          <p>{t.collabText}</p>
        </div>
        <div className="container service-grid">
          {[
            [
              "活動企劃與製作",
              "提供從概念發想到現場執行的全方位服務。",
              "/stitch/fanmeeting.jpg",
            ],
            [
              "藝人合作與協調",
              "建立跨地區的溝通橋樑，專業協助日本頂尖藝人。",
              "/stitch/team.jpg",
            ],
            [
              "聲優、藝人見面會及音樂展演",
              "打造高規格的互動體驗與專屬時刻。",
              "/stitch/artist.jpg",
            ],
            [
              "跨地區娛樂項目製作",
              "策劃跨國巡演與文化交流專案。",
              "/stitch/reference-4.jpg",
            ],
            [
              "官方周邊企劃製作與授權",
              "提供高品質的官方周邊商品設計與授權服務。",
              "/stitch/reference-5.jpg",
            ],
          ].map(([title, text, image], i) => (
            <article
              className={"service-card " + (i === 0 ? "service-featured" : "")}
              key={title}
            >
              <div className="service-mark">{i + 1}</div>
              <h2>{title}</h2>
              <p>{text}</p>
              <img src={image} alt="" />
              <Link href={"/" + params.locale + "/contact"}>了解更多 →</Link>
            </article>
          ))}
        </div>
      </main>
    );
  if (section === "contact") {
    const f = t.contact;
    const formLabels = {
      ...f,
      success:
        params.locale === "zh-hant"
          ? "訊息已成功發送，我們會盡快聯絡您。"
          : params.locale === "zh-hans"
            ? "留言已成功发送，我们会尽快联系您。"
            : params.locale === "ja"
              ? "メッセージを送信しました。近日中にご連絡いたします。"
              : "Your message was sent successfully. We will contact you shortly.",
      error:
        params.locale === "zh-hant"
          ? "訊息發送失敗，請稍後再試。"
          : params.locale === "zh-hans"
            ? "留言发送失败，请稍后再试。"
            : params.locale === "ja"
              ? "送信に失敗しました。しばらくしてから再試行してください。"
              : "Unable to send the message right now. Please try again later.",
      sending:
        params.locale === "zh-hant"
          ? "發送中…"
          : params.locale === "zh-hans"
            ? "发送中…"
            : params.locale === "ja"
              ? "送信中…"
              : "Sending…",
    };
    return (
      <main className="subpage contact-page">
        <div className="container sub-intro">
          <div className="eyebrow">MIRAI STAGE / CONTACT</div>
          <h1>{params.locale === "en" ? "Get in Touch" : t.nav[3]}</h1>
          <p>{t.heroText}</p>
        </div>
        <div className="container contact-grid">
          <aside className="contact-card">
            <div className="contact-icon">✦</div>
            <h2>{t.nav[3]}</h2>
            <p>{t.collabText}</p>
            <a className="email-link" href="mailto:business@miraistage.com">
              <AiOutlineMail aria-hidden="true" />
              <span>business@miraistage.com</span>
            </a>
            <img src={images.contact} alt="Mirai Stage office" />
          </aside>
          <ContactForm
            labels={formLabels}
            title={params.locale === "en" ? "Send a Message" : f.message}
          />
        </div>
      </main>
    );
  }
  if (section === "artists")
    return (
      <main className="subpage artists-page">
        <section className="artist-hero">
          <img src={images.artists} alt="Live stage" />
          <div className="artist-overlay">
            <div className="eyebrow">MIRAI STAGE / ARTISTS</div>
            <h1 className={'locale-' + params.locale}>
              {params.locale === "en"
                ? "Connecting Talents, Creating Memories."
                : t.heroTitle}
            </h1>
            <p>{t.heroText}</p>
            <div>
              <Link
                className="btn btn-primary"
                href={"/" + params.locale + "/contact"}
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
        <section className="container artist-story">
          <img src="/stitch/artist.jpg" alt="Artist portrait" />
          <div>
            <div className="eyebrow">ABOUT MIRAI STAGE</div>
            <h2>{t.heroTitle}</h2>
            <p>{t.collabText}</p>
            <Link className="story-link" href={"/" + params.locale + "/about"}>
              <span>{t.nav[2]}</span>
              <AiOutlineArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="section section-white">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">OUR EXPERTISE</div>
              <h2>{t.philosophy}</h2>
            </div>
            <div className="cards">
              {t.cards.map((c) => (
                <article className="card" key={c[1]}>
                  <div className="icon">{c[0]}</div>
                  <h3>{c[1]}</h3>
                  <p>{c[2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  return (
    <main className="subpage about-page">
      <div className="container about-hero">
        <div>
          <div className="eyebrow">MIRAI STAGE / ABOUT</div>
          <h1>
            {params.locale === "en"
              ? "Bridging Cultures Through Entertainment"
              : t.heroTitle}
          </h1>
          <p>{t.heroText}</p>
          <Link
            className="btn btn-primary"
            href={"/" + params.locale + "/services"}
          >
            {t.cta}
          </Link>
        </div>
        <img src={images.about} alt="Mirai Stage office" />
      </div>
      <section className="section section-white">
        <div className="container split">
          <div>
            <div className="eyebrow">OUR STORY</div>
            <h2>{t.heroTitle}</h2>
            <p>{t.collabText}</p>
          </div>
          <img
            className="about-image"
            src="/stitch/team.jpg"
            alt="Mirai Stage team"
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">OUR VALUES</div>
            <h2>{t.philosophy}</h2>
          </div>
          <div className="cards">
            {t.cards.map((c) => (
              <article className="card" key={c[1]}>
                <div className="icon">{c[0]}</div>
                <h3>{c[1]}</h3>
                <p>{c[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
