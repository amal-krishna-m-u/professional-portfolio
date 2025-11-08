/**
 * Footer Component
 *
 * Minimal footer with accent-blue hover effect and subtle border.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-8 border-t border-white/10 text-text-secondary font-mono text-sm bg-dark">
      <p className="hover:text-accent-blue transition-colors duration-300">
        © 2025 • Built with React + FastAPI + ❤️ • Deployed on Azure
      </p>
    </footer>
  );
}
