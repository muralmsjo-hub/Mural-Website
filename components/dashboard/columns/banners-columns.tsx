"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Image as ImageIcon } from "lucide-react";
import { AllBanners } from "@/server/banner/types";

export const bannerColumns: ColumnDef<AllBanners>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div className="relative h-12 w-20 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={row.getValue("nameEn") || "Banner image"}
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
    accessorKey: "nameEn",
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
        {row.getValue("nameEn")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (EN)" },
  },
  {
    accessorKey: "nameAr",
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
        {row.getValue("nameAr")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (AR)" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700 hover:text-[#0b8b99] transition-colors"
      >
        Created date
        <ArrowUpDown className="h-4 w-4 ml-1" />
      </button>
    ),
    cell: ({ row }) => {
      const dateVal = row.getValue("createdAt") as Date | string | null;
      if (!dateVal) return <span className="text-slate-400 text-xs">-</span>;
      const formatted = new Date(dateVal).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <span className="text-xs text-slate-600">{formatted}</span>;
    },
    enableSorting: true,
    meta: { headerLabel: "Created date" },
  },
];
