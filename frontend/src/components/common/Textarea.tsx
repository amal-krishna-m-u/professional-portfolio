/**
 * Textarea Component
 * 
 * Styled textarea field with label and error states
 */

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', rows = 5, ...props }, ref) => {
    const textareaStyles = `
      w-full px-4 py-3 
      bg-white/5 
      border border-white/10 
      rounded-lg 
      text-text-primary 
      font-mono 
      placeholder-text-secondary
      transition-all duration-300
      focus:outline-none 
      focus:border-accent-blue 
      focus:bg-white/10
      resize-vertical
      ${error ? 'border-red-500 focus:border-red-500' : ''}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-accent-blue font-mono text-sm">
            {label}:
          </label>
        )}
        
        <textarea
          ref={ref}
          rows={rows}
          className={textareaStyles}
          {...props}
        />
        
        {error && (
          <p className="mt-2 text-sm text-red-400 font-mono">
            ⚠️ {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-text-secondary font-mono">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
