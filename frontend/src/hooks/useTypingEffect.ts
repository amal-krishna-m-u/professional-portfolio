/**
 * useTypingEffect Hook
 * 
 * Creates a typing animation effect for text
 * Returns the current text being "typed"
 */

import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting (milliseconds)
  onComplete?: () => void;
}

export function useTypingEffect({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);

    // Wait for delay before starting
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return { displayedText, isComplete };
}
