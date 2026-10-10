"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ExportApplicationsButtonProps {
  careerId: string;
  careerName?: string;
  className?: string;
}

export default function ExportApplicationsButton({
  careerId,
  careerName,
  className = "",
}: ExportApplicationsButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      const url = `/api/applications/export?careerId=${encodeURIComponent(
        careerId
      )}`;
      const res = await fetch(url, { method: "GET" });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;

      const contentDisposition = res.headers.get("Content-Disposition");
      const safeName = careerName
        ? careerName.replace(/\s+/g, "_")
        : "Applications";
      let filename = `${safeName}_Applications.xlsx`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);

      toast.success("Applications exported successfully");
    } catch (err) {
      console.error("Export error", err);
      toast.error("Failed to export applications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={loading}
      variant="outline"
      className={`flex items-center gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium ${className}`}
      type="button"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4 text-emerald-600" />
      )}
      {loading ? "Preparing..." : "Export to Excel"}
    </Button>
  );
}
