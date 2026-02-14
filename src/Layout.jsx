import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "./Components/Shared/Footer";
import { getCalApi } from "@calcom/embed-react";

function Nav() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/log') {
            return location.pathname === '/log' || location.pathname.startsWith('/work/');
        }
        return location.pathname === path;
    };

    const linkClass = (path) =>
        `transition-colors ${isActive(path) ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'}`;

    return (
        <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-200 transition-colors font-medium">
                Evan Jacobson
            </Link>
            <div className="flex gap-6">
                <Link to="/log" className={linkClass('/log')}>Log</Link>
                <Link to="/toolbox" className={linkClass('/toolbox')}>Toolbox</Link>
            </div>
        </nav>
    );
}

export default function Layout({ children }) {
    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/book-a-call';

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: {
                    branding: { brandColor: "#10b981" },
                },
            });
        })();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
            {!isHome && <Nav />}
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
