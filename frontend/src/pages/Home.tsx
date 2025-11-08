import { Hero } from '@/components/sections';

export default function Home() {
  return (
    <div className="bg-bg-dark">
      {/* Hero Section */}
      <Hero />

      {/* Placeholder for other sections */}
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-accent-blue mb-4">Projects</h2>
          <p className="text-text-secondary">Coming soon...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-accent-blue mb-4">Contact</h2>
          <p className="text-text-secondary">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
