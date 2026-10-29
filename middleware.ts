import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
const locales=['zh-hant','zh-hans','en','ja'] as const;
type Locale=typeof locales[number];
function detectLocale(req:NextRequest):Locale {
  const saved=req.cookies.get('NEXT_LOCALE')?.value;
  if(saved && locales.includes(saved as Locale)) return saved as Locale;
  const accepted=req.headers.get('accept-language')?.toLowerCase() || '';
  const ranked=accepted.split(',').map((part,index)=>{const [tag,qPart]=part.trim().split(';q=');return {tag,q:qPart?Number(qPart):1,index}}).filter(item=>item.tag).sort((a,b)=>b.q-a.q||a.index-b.index);
  for(const {tag} of ranked){
    if(tag==='ja'||tag.startsWith('ja-')) return 'ja';
    if(['zh-cn','zh-sg','zh-hans'].some(prefix=>tag===prefix||tag.startsWith(prefix+'-'))) return 'zh-hans';
    if(['zh-tw','zh-hk','zh-mo','zh-hant'].some(prefix=>tag===prefix||tag.startsWith(prefix+'-'))) return 'zh-hant';
    if(tag==='en'||tag.startsWith('en-')) return 'en';
  }
  const country=(req.headers.get('cf-ipcountry')||req.headers.get('x-vercel-ip-country')||req.headers.get('x-country-code')||'').toUpperCase();
  if(['HK','TW','MO'].includes(country)) return 'zh-hant';
  if(['CN','SG'].includes(country)) return 'zh-hans';
  if(country==='JP') return 'ja';
  return 'zh-hant';
}
function publicOrigin(req:NextRequest){
  const host=req.headers.get('x-forwarded-host')?.split(',')[0].trim()||req.headers.get('host')?.split(',')[0].trim();
  const proto=req.headers.get('x-forwarded-proto')?.split(',')[0].trim()||'https';
  return host?`${proto}://${host}`:req.nextUrl.origin;
}
export function middleware(req:NextRequest){const {pathname}=req.nextUrl;if(pathname.startsWith('/api')||pathname.startsWith('/_next')||pathname.includes('.'))return NextResponse.next();const first=pathname.split('/')[1];if(!locales.includes(first as Locale)){const locale=detectLocale(req);const url=new URL(req.nextUrl.pathname+req.nextUrl.search,publicOrigin(req));url.pathname='/'+locale+(pathname==='/'?'':pathname);const response=NextResponse.redirect(url);response.cookies.set('NEXT_LOCALE',locale,{path:'/',maxAge:31536000,sameSite:'lax'});return response}const response=NextResponse.next();if(req.cookies.get('NEXT_LOCALE')?.value!==first)response.cookies.set('NEXT_LOCALE',first,{path:'/',maxAge:31536000,sameSite:'lax'});return response}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
