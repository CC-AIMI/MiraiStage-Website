import {locales, Locale, copy} from '../../lib/i18n';
import Link from 'next/link';
import SiteHeader from '../components/site-header';
import SocialLinks from '../components/social-links';
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export default function Layout({children,params}:{children:React.ReactNode;params:{locale:Locale}}){const l=params.locale;const t=copy[l]||copy['zh-hant'];return <><SiteHeader locale={l} labels={t.nav} joinLabel={t.join}/>{children}<footer className="footer"><div className="container"><div className="footer-inner"><div><div className="brand" style={{color:'#fff'}}>未来舞台</div><p>{t.footer}</p><SocialLinks/></div><div className="footer-links">{locales.map(x=><Link key={x} href={'/'+x}>{({'zh-hant':'繁中','zh-hans':'简中','en':'EN','ja':'日本語'} as Record<string,string>)[x]}</Link>)}</div></div><div className="footer-bottom"><small>{t.copyright}</small></div></div></footer></>}
