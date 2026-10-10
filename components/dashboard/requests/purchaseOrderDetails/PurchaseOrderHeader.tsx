import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

interface PurchaseOrderHeaderProps {
  companyName: string;
  createdAt?: Date | string | null;
}

export default function PurchaseOrderHeader({
  companyName,
  createdAt,
}: PurchaseOrderHeaderProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
      <div className="space-y-1">
        <Link
          href="/admin/dashboard/purchase-order-requests"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Purchase Order Requests
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-3xl font-bold text-[#062b56]">
            {companyName}
          </h1>
        </div>
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          Submitted on {formattedDate}
        </p>
      </div>
    </div>
  );
}
