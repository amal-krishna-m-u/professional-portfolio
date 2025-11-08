/**
 * Input Component
 * 
 * Styled input field with label and error states
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputStyles = `
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
        
        <input
          ref={ref}
          className={inputStyles}
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

Input.displayName = 'Input';

export default Input;
