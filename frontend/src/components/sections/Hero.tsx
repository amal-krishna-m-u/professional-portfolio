/**
 * Hero Section Component (macOS-style, draggable + resizable)
 *
 * - 8-directional resize (edges + corners)
 * - Smooth drag using transform translate()
 * - Neon cyan glow while resizing
 * - Min/max size constraints
 * - Handles visible only on hover
 */

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import TerminalDots from '@/components/common/TerminalDots';
import Cursor from '@/components/common/Cursor';
import { getHeroContent } from '@/services/contentService';
import type { HeroContent } from '@/types';

const MIN_WIDTH = 700;
const MAX_WIDTH = 1600;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 900;

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [size, setSize] = useState({ width: 1100, height: 550 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resizingEdge, setResizingEdge] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isResizing && !isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (isDragging) {
        setPosition((prev) => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY,
        }));
      } else if (isResizing) {
        setSize((prev) => {
          const deltaX = e.movementX;
          const deltaY = e.movementY;
          let newWidth = prev.width;
          let newHeight = prev.height;

          if (resizingEdge?.includes('right')) newWidth = prev.width + deltaX;
          if (resizingEdge?.includes('left')) newWidth = prev.width - deltaX;
          if (resizingEdge?.includes('bottom')) newHeight = prev.height + deltaY;
          if (resizingEdge?.includes('top')) newHeight = prev.height - deltaY;

          newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth));
          newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, newHeight));
          return { width: newWidth, height: newHeight };
        });
      }
    };

    const stopInteraction = () => {
      setIsResizing(false);
      setIsDragging(false);
      setResizingEdge(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopInteraction);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopInteraction);
    };
  }, [isResizing, isDragging, resizingEdge]);

  const startResize = (e: React.MouseEvent, edge: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingEdge(edge);
    setIsResizing(true);
  };

  const startDrag = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  if (!heroContent) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-16">
        <div>Loading...</div>
      </section>
    );
  }

  const fontScale = Math.max(0.9, Math.min(1.2, size.width / 1100));
  const lineSpacing = `${1.4 + (size.height - 550) / 1000}`;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-visible">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            top: '50%',
            left: '20%',
            transform: 'translateY(-50%)',
            background:
              'radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '20%',
            background:
              'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Terminal Container */}
      <div
        ref={containerRef}
        className={`absolute glass-bg rounded-xl overflow-hidden shadow-2xl z-10 border border-white/10 transition-shadow duration-300 ${
          isResizing ? 'shadow-[0_0_25px_#33FFFFAA] border-[#33FFFF99]' : ''
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition:
            isResizing || isDragging
              ? 'none'
              : 'width 0.15s ease, height 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.15s ease',
        }}
      >
        {/* Terminal Header */}
        <div
          onMouseDown={startDrag}
          className="px-4 py-3 border-b border-white/10 flex items-center gap-2 select-none"
          style={{
            background: 'rgba(255,255,255,0.03)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <TerminalDots />
        </div>

        {/* Terminal Content */}
        <div
          className="p-8 md:p-12 font-mono text-left flex flex-col justify-between h-full overflow-hidden"
          style={{
            fontSize: `${fontScale * 0.9}rem`,
            lineHeight: lineSpacing,
            height: 'calc(100% - 41px)',
          }}
        >
          <div className="flex-grow overflow-y-auto">
            {heroContent.lines.map((line) => (
              <div key={line.id} className="mb-2 opacity-0 animate-terminal-fade-in">
                {line.type === 'command' && (
                  <span className="text-accent-blue">$</span>
                )}{' '}
                <span>{line.content}</span>
                {line.show_cursor && <Cursor />}
              </div>
            ))}
          </div>

          <div className="mt-8 flex-shrink-0 flex flex-wrap gap-4 justify-center md:justify-start">
            {heroContent.cta_buttons.map((cta, index) => (
              <Button
                key={index}
                variant={index === 0 ? 'primary' : 'secondary'}
                onClick={() => {
                  const target = document.querySelector(`#${cta.text.toLowerCase()}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cta.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Resize Handles */}
        {[
          ['top', 'ns-resize'],
          ['bottom', 'ns-resize'],
          ['left', 'ew-resize'],
          ['right', 'ew-resize'],
          ['top-left', 'nwse-resize'],
          ['top-right', 'nesw-resize'],
          ['bottom-left', 'nesw-resize'],
          ['bottom-right', 'nwse-resize'],
        ].map(([edge, cursor]) => (
          <div
            key={edge}
            onMouseDown={(e) => startResize(e, edge as string)}
            className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              cursor,
              ...(edge === 'top' && { top: 0, left: '10px', right: '10px', height: '10px' }),
              ...(edge === 'bottom' && { bottom: 0, left: '10px', right: '10px', height: '10px' }),
              ...(edge === 'left' && { left: 0, top: '10px', bottom: '10px', width: '10px' }),
              ...(edge === 'right' && { right: 0, top: '10px', bottom: '10px', width: '10px' }),
              ...(edge === 'top-left' && { top: 0, left: 0, width: '14px', height: '14px' }),
              ...(edge === 'top-right' && { top: 0, right: 0, width: '14px', height: '14px' }),
              ...(edge === 'bottom-left' && { bottom: 0, left: 0, width: '14px', height: '14px' }),
              ...(edge === 'bottom-right' && { bottom: 0, right: 0, width: '14px', height: '14px' }),
            }}
          />
        ))}
      </div>
    </section>
  );
}
