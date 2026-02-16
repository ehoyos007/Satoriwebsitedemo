import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <SEO title="Page Not Found" noIndex />
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text mb-4">
          404
        </div>
        <h1 className="text-2xl text-white mb-2">Page not found</h1>
        <p className="text-zinc-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-zinc-300 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
