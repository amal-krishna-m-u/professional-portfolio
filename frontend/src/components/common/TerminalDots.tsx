/**
 * TerminalDots Component
 * 
 * MacOS-style window control dots
 */

export default function TerminalDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  );
}
