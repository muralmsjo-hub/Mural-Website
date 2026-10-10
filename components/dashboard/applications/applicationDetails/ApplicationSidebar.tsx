"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  Download,
  FileText,
  Mail,
  Phone,
  ClipboardCopy,
  ExternalLink,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ApplicationSidebar({
  application,
}: {
  application: any;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownload = async (url: string, fileName: string) => {
    if (!url) return;

    setIsDownloading(true);
    const toastId = toast.loading("Preparing document for download...");

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const safeName = fileName.trim().replace(/\s+/g, "_") || "Applicant";
      link.download = `${safeName}_CV.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      toast.success("Download started successfully", { id: toastId });
    } catch (error) {
      toast.error(
        "Could not download the file directly. Opening in a new tab instead...",
        { id: toastId }
      );
      window.open(url, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const applicantName =
    `${application.firstName || ""} ${application.lastName || ""}`.trim() ||
    application.full_name ||
    "Applicant";

  const positionName =
    application.possitionName || application.careers?.positionEn || "General position";

  const imageUrl = application.careers?.image || application.possitionImage;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden space-y-6">
      {/* Position Header Banner */}
      <div className="relative h-44 bg-slate-900 overflow-hidden group">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={positionName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#062b56] to-[#0b8b99] text-white/40">
            <Briefcase size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
          <span className="text-slate-300 text-xs font-medium mb-1">
            Applied position
          </span>
          <h2 className="text-white text-base font-bold line-clamp-2">
            {positionName}
          </h2>
        </div>
      </div>

      {/* Main Content Area inside Sidebar */}
      <div className="px-5 pb-6 space-y-6">
        {/* Document Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Primary document
          </h3>
          {application.cv ? (
            <div className="space-y-2">
              <Button
                onClick={() => handleDownload(application.cv, applicantName)}
                disabled={isDownloading}
                className="w-full bg-[#0b8b99] hover:bg-[#062b56] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
              </Button>

              <a
                href={application.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-[#0b8b99] py-2 transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open document in new tab</span>
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 w-full bg-slate-50 text-slate-400 py-3.5 px-4 rounded-xl text-xs font-medium justify-center border border-dashed border-slate-200">
              <FileText className="w-4 h-4 text-slate-300" />
              <span>No CV uploaded</span>
            </div>
          )}
        </div>

        {/* Contact Channels */}
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Contact channels
          </h3>

          <div className="space-y-2.5">
            <ContactRow
              icon={<Mail className="w-4 h-4 text-[#0b8b99]" />}
              label="Email address"
              value={application.email}
              href={application.email ? `mailto:${application.email}` : undefined}
              isCopied={copiedField === "Email"}
              onCopy={() => handleCopy(application.email, "Email")}
            />

            <ContactRow
              icon={<Phone className="w-4 h-4 text-[#0b8b99]" />}
              label="Phone number"
              value={application.phoneNumber || application.phone_number}
              href={
                application.phoneNumber || application.phone_number
                  ? `tel:${application.phoneNumber || application.phone_number}`
                  : undefined
              }
              isCopied={copiedField === "Phone"}
              onCopy={() =>
                handleCopy(
                  application.phoneNumber || application.phone_number,
                  "Phone"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  isCopied,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
  isCopied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="group flex items-center justify-between p-3 bg-slate-50/80 hover:bg-slate-100/70 rounded-xl border border-slate-200/60 transition-all">
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div className="p-2 bg-white rounded-lg shadow-2xs shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-slate-400 font-medium leading-none mb-1">
            {label}
          </p>
          {href && value ? (
            <a
              href={href}
              className="text-xs font-semibold text-slate-800 hover:text-[#0b8b99] transition-colors truncate block"
            >
              {value}
            </a>
          ) : (
            <p className="text-xs font-semibold text-slate-800 truncate">
              {value || "Not provided"}
            </p>
          )}
        </div>
      </div>

      {value && (
        <button
          onClick={onCopy}
          title={`Copy ${label}`}
          className="p-1.5 text-slate-400 hover:text-[#0b8b99] hover:bg-white rounded-md transition-all shrink-0 cursor-pointer"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <ClipboardCopy className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}

