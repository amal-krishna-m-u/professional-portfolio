/**
 * SectionTitle Component
 * 
 * Reusable section header with // prefix and animated underline.
 */


interface SectionTitleProps {
  children: string;
  className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-12 text-center md:text-left ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold relative inline-block font-sans">
        <span className="text-accent-blue font-mono">// </span>
        {children}
        <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-accent-blue rounded mt-2 animate-pulse" />
      </h2>
    </div>
  );
}
