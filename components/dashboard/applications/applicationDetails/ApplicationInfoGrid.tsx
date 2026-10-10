"use client";

import React, { useState } from "react";
import {
  Calendar,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  Clock,
  ShieldAlert,
  ExternalLink,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
} from "lucide-react";

export default function ApplicationInfoGrid({
  application,
}: {
  application: any;
}) {
  const [showDocPreview, setShowDocPreview] = useState(true);

  const formatDate = (date: any) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not specified";

  const appliedDate = application.appliedAt || application.applied_at;
  const deletionDate = appliedDate ? new Date(appliedDate) : new Date();
  deletionDate.setDate(deletionDate.getDate() + 45);

  const fullName =
    `${application.firstName || ""} ${application.lastName || ""}`.trim() ||
    application.full_name ||
    "Applicant";

  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Candidate Hero Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            {/* Avatar circle */}
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#0b8b99] to-[#062b56] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              {initials || <User className="w-6 h-6" />}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {fullName}
                </h1>
                {application.isShown ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Reviewed</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pending review</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span>Candidate reference:</span>
                <span className="font-mono text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                  {application.id
                    ? application.id.substring(0, 8).toUpperCase()
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          {/* Timeline info block */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-4 text-xs">
            <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 font-medium block text-[11px]">
                Applied date
              </span>
              <span className="font-semibold text-slate-800">
                {formatDate(appliedDate)}
              </span>
            </div>

            <div className="bg-amber-50/60 px-4 py-2.5 rounded-xl border border-amber-200/50">
              <span className="text-amber-800/70 font-medium block text-[11px] items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-600" />
                Data retention expiration
              </span>
              <span className="font-semibold text-amber-900">
                {formatDate(deletionDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Candidate Overview */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#0b8b99] uppercase tracking-wider">
              Candidate overview
            </h3>

            <div className="space-y-3">
              <InfoItem
                icon={<GraduationCap className="w-4 h-4" />}
                label="Major / Field of study"
                value={application.major}
              />
              <InfoItem
                icon={<Mail className="w-4 h-4" />}
                label="Email address"
                value={application.email}
              />
              <InfoItem
                icon={<Phone className="w-4 h-4" />}
                label="Phone number"
                value={application.phoneNumber || application.phone_number}
              />
            </div>
          </div>

          {/* Application Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#0b8b99] uppercase tracking-wider">
              Position details
            </h3>

            <div className="space-y-3">
              <InfoItem
                icon={<Briefcase className="w-4 h-4" />}
                label="Position title"
                value={application.possitionName || "General position"}
              />
              <InfoItem
                icon={<Calendar className="w-4 h-4" />}
                label="Date submitted"
                value={formatDate(appliedDate)}
              />
              <InfoItem
                icon={<FileText className="w-4 h-4" />}
                label="Resume uploaded"
                value={application.cv ? "Document available" : "No file uploaded"}
              />
            </div>
          </div>
        </div>

        {/* Position Description preview if present */}
        {application.possitionDescription && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Position overview
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60 line-clamp-3">
              {application.possitionDescription}
            </p>
          </div>
        )}
      </div>

      {/* Embedded Resume Viewer Card */}
      {application.cv && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl text-[#0b8b99] shadow-2xs border border-slate-200/60">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Applicant resume & credentials
                </h3>
                <p className="text-xs text-slate-500">
                  Review original candidate document inline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDocPreview(!showDocPreview)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
              >
                {showDocPreview ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    <span>Hide preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Show preview</span>
                  </>
                )}
              </button>

              <a
                href={application.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0b8b99] hover:bg-[#062b56] text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in new window</span>
              </a>
            </div>
          </div>

          {showDocPreview && (
            <div className="w-full bg-slate-100 p-2 sm:p-4">
              <div className="w-full h-150 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                <iframe
                  src={application.cv}
                  className="w-full h-full border-0"
                  title={`${fullName}'s CV`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200/50 transition-colors">
      <div className="p-2 bg-white rounded-lg text-[#0b8b99] shadow-2xs shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-400 mb-0.5">
          {label}
        </p>
        <p className="text-xs font-semibold text-slate-800 truncate">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}

