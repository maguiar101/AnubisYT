import { NavLink, useLocation } from "react-router-dom";

import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function Navbar({ fonts } : { fonts: any } ) {
    const youtubeIcon = <FaYoutube />;
    const tiktokIcon = <FaTiktok />;
    const location = useLocation();

        // Define page titles AND title for different routes
    const pageTitles: { [key: string]: string } = {
        '/': 'Welcome',
        '/twitch': 'Twitch',
        '/youtube': 'YouTube',
        '/tiktok': 'TikTok'
    };
    const title = (pageTitles[location.pathname]);

       // Define colors for different pages
    const navbarColors: { [key: string]: string } = {
        '/': 'bg-indigo-950/75',
        '/twitch': 'bg-purple-600/75',
        '/youtube': 'bg-red-600/75',
        '/tiktok': 'bg-purple-600/75'

    };
    const navbarColor = navbarColors[location.pathname];

    useEffect( function() {

        {title === 'Welcome' ?  'Anubis' :  document.title = `Anubis - ${title}`}

        return function() {
            document.title = 'Anubis';
        }
    }, [location.pathname]);

    return (
        <div className={`rounded-2xl mt-4 mx-20 max-lg:mx-10 p-1 ${navbarColor} text-white text-center`}>
            <h1 className="pt-2 text-4xl tracking-widest" style={fonts.story}>{title}</h1>
            <nav>
                <ul className="flex space-x-8 justify-center pt-2 text-lg">
                    <Links to="/youtube" hoverColor={'hover:text-red-600'}> {youtubeIcon} </Links>
                    <Links to="/tiktok" hoverColor={'hover:text-purple-500'}> {tiktokIcon} </Links>
                </ul>
            </nav>
        </div>
    );
}

// ====================== 'LINKS' COMPONENT ===============================

export function Links({ children, to, hoverColor }: 
                      { children: ReactNode, to: string, hoverColor?: string } ) {

    return (
         <li className={hoverColor}>
            <NavLink  
                className={({ isActive }) => (isActive ? 'text-zinc-950 pointer-events-none' : '')}
                to={to}
            >
                {children}
            </NavLink>
        </li>
    );
}