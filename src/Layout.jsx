import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "./Components/Shared/Footer";
import { getCalApi } from "@calcom/embed-react";

function Nav() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `transition-colors ${isActive(path) ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'}`;

    return (
        <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4 flex items-center gap-8 text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-200 transition-colors font-medium mr-auto">
                Evan Jacobson
            </Link>
            <Link to="/toolbox" className={linkClass('/toolbox')}>Toolbox</Link>
        </nav>
    );
}

export default function Layout({ children }) {
    const location = useLocation();
    const isHome = location.pathname === '/book-a-call';

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
            <Nav />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
