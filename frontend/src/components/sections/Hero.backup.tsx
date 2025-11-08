/**
 * Hero Section Component
 *
 * Terminal-style hero with fade-in animation (matching mockup exactly)
 */

import { useState, useEffect } from 'react';
import { Button, TerminalDots, Cursor } from '@/components/common';
import { getHeroContent } from '@/services/contentService';
import type { HeroContent } from '@/types';

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const content = await getHeroContent();
        setHeroContent(content);
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    };

    loadHeroContent();
  }, []);

  if (!heroContent) {
    return null; // Or a loading skeleton
  }
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background gradients - matching mockup */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            top: '50%',
            left: '20%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Terminal Container */}
      <div className="relative w-full max-w-[900px] z-10">
        {/* Terminal Window */}
        <div className="glass-bg rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div 
            className="px-4 py-3 border-b border-white/10 flex items-center gap-2"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            <TerminalDots />
          </div>

          {/* Terminal Content */}
          <div className="p-8 md:p-12 font-mono text-sm md:text-base text-left">
            {/* Dynamic terminal lines */}
            {heroContent.lines.map((line) => (
              <div
                key={line.id}
                className="mb-2 opacity-0 animate-terminal-fade-in"
                style={{ animationDelay: line.delay }}
              >
                {line.type === 'command' ? (
                  <>
                    <span className="text-accent-blue">$</span>
                    <span className="text-text-primary"> {line.content}</span>
                  </>
                ) : (
                  <>
                    <span className="text-text-primary">{line.content}</span>
                    {line.show_cursor && <Cursor />}
                  </>
                )}
              </div>
            ))}

            {/* CTA Buttons - fade in after 2.5s */}
            <div
              className="mt-8 flex flex-wrap gap-4 opacity-0 animate-terminal-fade-in"
              style={{ animationDelay: '2.5s' }}
            >
              {heroContent.cta_buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.primary ? 'primary' : 'secondary'}
                  onClick={() => {
                    if (button.href.startsWith('#')) {
                      const element = document.querySelector(button.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = button.href;
                    }
                  }}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator - fade in after 3s */}
        <div
          className="mt-12 text-center opacity-0 animate-terminal-fade-in"
          style={{ animationDelay: '3s' }}
        >
          <p className="text-text-secondary text-sm font-mono mb-2">
            {heroContent.scroll_text}
          </p>
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-accent-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}