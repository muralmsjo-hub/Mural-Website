import { ArrowLeft, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ApplicationHeaderProps {
  isShown: boolean;
  onMarkAsShown: () => void;
  loading: boolean;
}

export default function ApplicationHeader({
  isShown,
  onMarkAsShown,
  loading,
}: ApplicationHeaderProps) {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0b8b99] transition-colors font-medium text-xs sm:text-sm group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-[#0b8b99]" />
          <span className="hidden sm:inline">Back to applications list</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Action & Status */}
        <div className="flex items-center gap-3">
        

          <button
            disabled={loading}
            onClick={onMarkAsShown}
            className="inline-flex items-center gap-2 bg-[#0b8b99] hover:bg-[#062b56] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : isShown ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Mark as pending</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as reviewed</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
