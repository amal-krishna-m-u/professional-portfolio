/**
 * Hero Section Component
 * 
 * Terminal-style hero with typing animation
 */

import { useState } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { Button, TerminalDots, Cursor } from '@/components/common';
import { HERO_CONTENT, UI } from '@/constants';

export default function Hero() {
  // Track which lines have completed typing
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  // Line 1: Command (starts after 1000ms)
  const line1 = useTypingEffect({
    text: HERO_CONTENT.COMMAND_1,
    speed: UI.ANIMATION.TERMINAL_TYPING,
    delay: 1000,
    onComplete: () => setCompletedLines((prev) => [...prev, 1]),
  });

  // Line 2: Response (starts 1000ms after line 1 completes)
  const line2 = useTypingEffect({
    text: HERO_CONTENT.RESPONSE_1,
    speed: UI.ANIMATION.TERMINAL_TYPING,
    delay: completedLines.includes(1) ? 1000 : 999999,
    onComplete: () => setCompletedLines((prev) => [...prev, 2]),
  });

  // Line 3: Command (starts 1500ms after line 2 completes)
  const line3 = useTypingEffect({
    text: HERO_CONTENT.COMMAND_2,
    speed: UI.ANIMATION.TERMINAL_TYPING,
    delay: completedLines.includes(2) ? 1500 : 999999,
    onComplete: () => setCompletedLines((prev) => [...prev, 3]),
  });

  // Line 4: Response part 1 (starts 1000ms after line 3 completes)
  const line4 = useTypingEffect({
    text: HERO_CONTENT.RESPONSE_2_LINE_1,
    speed: UI.ANIMATION.TERMINAL_TYPING,
    delay: completedLines.includes(3) ? 1000 : 999999,
    onComplete: () => setCompletedLines((prev) => [...prev, 4]),
  });

  // Line 5: Response part 2 (starts 100ms after line 4 - almost immediate)
  const line5 = useTypingEffect({
    text: HERO_CONTENT.RESPONSE_2_LINE_2,
    speed: UI.ANIMATION.TERMINAL_TYPING,
    delay: completedLines.includes(4) ? 100 : 999999,
    onComplete: () => setCompletedLines((prev) => [...prev, 5]),
  });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Terminal Container */}
      <div className="relative w-full max-w-4xl z-10">
        {/* Terminal Window */}
        <div className="glass-bg rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <TerminalDots />
            <span className="text-text-secondary text-sm font-mono">
              portfolio-terminal
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-8 md:p-12 font-mono text-base md:text-lg space-y-2 min-h-[400px]">
            {/* Line 1: Command */}
            <div>
              <span className="text-accent-blue">$</span>
              <span className="ml-2 text-text-primary">{line1.displayedText}</span>
              {line1.displayedText && !line1.isComplete && <Cursor />}
            </div>

            {/* Line 2: Response */}
            {completedLines.includes(1) && (
              <div>
                <span className="text-text-primary">{line2.displayedText}</span>
                {line2.displayedText && !line2.isComplete && <Cursor />}
              </div>
            )}

            {/* Line 3: Command (with extra spacing) */}
            {completedLines.includes(2) && (
              <div className="mt-6">
                <span className="text-accent-blue">$</span>
                <span className="ml-2 text-text-primary">{line3.displayedText}</span>
                {line3.displayedText && !line3.isComplete && <Cursor />}
              </div>
            )}

            {/* Line 4: Response part 1 */}
            {completedLines.includes(3) && (
              <div>
                <span className="text-text-primary">{line4.displayedText}</span>
                {line4.displayedText && !line4.isComplete && <Cursor />}
              </div>
            )}

            {/* Line 5: Response part 2 */}
            {completedLines.includes(4) && (
              <div>
                <span className="text-text-primary">{line5.displayedText}</span>
                {line5.displayedText && !line5.isComplete && <Cursor />}
              </div>
            )}

            {/* CTA Buttons - appear after all typing is done */}
            {completedLines.includes(5) && (
              <div className="pt-8 flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                {HERO_CONTENT.CTA_BUTTONS.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.primary ? 'primary' : 'secondary'}
                    onClick={() => {
                      if (button.href.startsWith('#')) {
                        // Scroll to section
                        const element = document.querySelector(button.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // Navigate or download
                        window.location.href = button.href;
                      }
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {completedLines.includes(5) && (
          <div className="mt-12 text-center opacity-0 animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            <p className="text-text-secondary text-sm font-mono mb-2">
              Scroll to explore
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
        )}
      </div>
    </section>
  );
}
