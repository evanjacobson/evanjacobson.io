import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">404</p>
            <h1 className="text-3xl font-bold text-slate-50 mt-3">Page not found</h1>
            <p className="text-slate-400 mt-4">The page you requested does not exist.</p>
            <Link to="/" className="inline-block text-sm text-emerald-400 hover:text-emerald-300 mt-8">
                Return home
            </Link>
        </div>
    );
}
