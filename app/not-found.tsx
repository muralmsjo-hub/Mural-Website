import Link from "next/link";
import { Home, Package, FileQuestion, ArrowRight } from "lucide-react";
import Logo from "@/public/logo-hor.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0fafb] text-[#062b56] px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Glow Decorative Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0b8b99]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#062b56]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
        {/* 404 Visual Indicator */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#0b8b99]/10 border border-[#0b8b99]/20 text-[#0b8b99] flex items-center justify-center mx-auto shadow-xs">
            <FileQuestion className="w-8 h-8" />
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#062b56]">
            404
          </h1>

          <h2 className="text-lg sm:text-xl font-bold text-[#062b56]">
            Page Not Found 
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-sm mx-auto">
            The page you are looking for doesn't exist, has been removed, or is
            temporarily unavailable.
          </p>
        </div>

        {/* Separator Divider */}
        <div className="w-16 h-[2px] bg-[#0b8b99]/30 mx-auto my-6 rounded-full" />

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#062b56] text-white text-xs sm:text-sm font-semibold hover:bg-[#062b56]/90 transition-all shadow-sm active:scale-[0.98]"
          >
            <Home className="w-4 h-4 text-[#0b8b99]" />
            <span>Go to Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 hover:text-[#062b56] hover:border-[#0b8b99]/40 transition-all shadow-2xs active:scale-[0.98]"
          >
            <Package className="w-4 h-4 text-[#0b8b99]" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
