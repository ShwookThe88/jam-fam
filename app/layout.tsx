import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Jam Fam — Make some noise together',description:'Find your groove. Bring your people. Play instruments, record real guitar, and build music together in Jam Fam.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
