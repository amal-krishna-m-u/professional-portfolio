import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent-blue mb-4 font-mono">
          404
        </h1>
        <p className="text-2xl text-text-secondary mb-8">
          Page not found
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-accent-blue text-bg-dark rounded-lg font-mono font-semibold hover:opacity-80 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
