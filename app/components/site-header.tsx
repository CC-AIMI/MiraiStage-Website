'use client';
import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';
import {useState} from 'react';
import {locales, Locale} from '../../lib/i18n';

const languageLabels: Record<Locale, string> = {'zh-hans':'简','zh-hant':'繁','en':'EN','ja':'日本語'};
const sections = ['artists','services','about','contact'] as const;

export default function SiteHeader({locale, labels, joinLabel}:{locale:Locale; labels:readonly string[]; joinLabel:string}) {
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const suffix = segment ? '/'+segment : '';
  return <header className="nav"><div className="container nav-inner">
    <Link href={'/'+locale} className="brand" aria-label="未来舞台 Mirai Stage">
      <span className="brand-mark"><img src="/logo-mark.png" alt="" /></span>
      <span className="brand-copy"><strong>未来舞台</strong><small>Mirai Stage</small></span>
    </Link>
    <nav className="links" aria-label="主導航">{sections.map((section,index)=><Link key={section} href={'/'+locale+'/'+section} className={segment===section?'active':''}>{labels[index]}</Link>)}</nav>
    <div className="actions"><div className="language-menu"><button type="button" className="language-trigger" aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{languageLabels[locale]}<span className="language-caret" aria-hidden="true"/></button>{open&&<div className="language-dropdown" role="menu">{locales.map(item=><Link key={item} href={'/'+item+suffix} className={item===locale?'active':''} onClick={()=>setOpen(false)} role="menuitem">{languageLabels[item]}<span>{item==='zh-hans'?'简体中文':item==='zh-hant'?'繁體中文':item==='en'?'English':'日本語'}</span></Link>)}</div>}</div><Link className="btn btn-primary" href={'/'+locale+'/contact'}>{joinLabel}</Link><button className="mobile-menu" type="button" aria-label={mobileOpen?'關閉選單':'開啟選單'} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?'×':'☰'}</button></div>
    {mobileOpen&&<nav className="mobile-links" aria-label="Mobile navigation">{sections.map((section,index)=><Link key={section} href={'/'+locale+'/'+section} onClick={()=>setMobileOpen(false)}>{labels[index]}</Link>)}</nav>}
  </div></header>;
}
