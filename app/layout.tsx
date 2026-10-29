import './globals.css';
import type {Metadata} from 'next';

export const metadata:Metadata={
  title:'未來舞台 | Mirai Stage',
  icons:{
    icon:'/logo-mark.png',
    shortcut:'/logo-mark.png',
    apple:'/logo-mark.png',
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body>{children}</body></html>}
