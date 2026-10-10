export default function Loading() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0fafb] text-[#062b56] px-4 relative overflow-hidden">
      {/* Background Ambient Blur Rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0b8b99]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {/* Dual Ring Pulse Spinner */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Outer glowing pulse */}
          <div className="absolute inset-0 rounded-full border-2 border-[#0b8b99]/20 animate-ping" />
          {/* Main spinning indicator */}
          <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-[#0b8b99] border-r-[#062b56] animate-spin" />
          {/* Inner core dot */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0b8b99] animate-pulse" />
        </div>
        {/* Brand Loading Text */}
      </div>
    </main>
  );
}
