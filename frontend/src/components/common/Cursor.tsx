/**
 * Cursor Component
 * 
 * Blinking terminal cursor that matches the mockup
 */

export default function Cursor() {
  return (
    <span 
      className="inline-block w-2 h-[18px] bg-accent-blue animate-blink ml-0.5"
      aria-hidden="true"
    />
  );
}