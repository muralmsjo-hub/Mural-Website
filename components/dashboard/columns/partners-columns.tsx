"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Image as ImageIcon, ExternalLink } from "lucide-react";
import { AllPartners } from "@/server/partners/types";

export const partnerColumns: ColumnDef<AllPartners>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logoUrl = row.getValue("logo") as string;
      return (
        <div className="relative h-12 w-20 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={row.getValue("partnerNameEn") || "Partner logo"}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-slate-400" />
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "partnerNameEn",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700 hover:text-[#0b8b99] transition-colors"
      >
        Name (EN)
        <ArrowUpDown className="h-4 w-4 ml-1" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900">
        {row.getValue("partnerNameEn")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (EN)" },
  },
  {
    accessorKey: "partnerNameAr",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700 hover:text-[#0b8b99] transition-colors"
      >
        Name (AR)
        <ArrowUpDown className="h-4 w-4 ml-1" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-slate-800" dir="rtl">
        {row.getValue("partnerNameAr")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (AR)" },
  },
  {
    accessorKey: "partnerDescriptionEn",
    header: "Description (EN)",
    cell: ({ row }) => {
      const desc = row.getValue("partnerDescriptionEn") as string;
      return (
        <span className="text-xs text-slate-600 line-clamp-2 max-w-xs">
          {desc || "-"}
        </span>
      );
    },
    enableSorting: false,
    meta: { headerLabel: "Description (EN)" },
  },
  {
    accessorKey: "referenceLink",
    header: "Reference Link",
    cell: ({ row }) => {
      const link = row.getValue("referenceLink") as string | null;
      if (!link) return <span className="text-slate-400 text-xs">-</span>;
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#0b8b99] hover:underline font-medium"
        >
          <span>Visit</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      );
    },
    enableSorting: false,
    meta: { headerLabel: "Reference Link" },
  },
];
