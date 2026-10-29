import {FaInstagram, FaXTwitter, FaYoutube, FaBilibili} from 'react-icons/fa6';

const socials = [
  {label:'Instagram', href:'https://www.instagram.com/miraistage_official', icon:FaInstagram},
  {label:'X', href:'https://x.com/miraistagehk', icon:FaXTwitter},
  {label:'YouTube', href:'https://www.youtube.com/@MiraiStage', icon:FaYoutube},
  {label:'Bilibili', href:'https://space.bilibili.com/', icon:FaBilibili}
];

export default function SocialLinks(){return <nav className="social-links" aria-label="官方社交媒体">{socials.map(({label,href,icon:Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon aria-hidden="true"/></a>)}</nav>}
