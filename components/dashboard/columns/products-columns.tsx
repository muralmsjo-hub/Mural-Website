"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Image as ImageIcon, Package } from "lucide-react";
import { AllProducts } from "@/server/products/types";

export const productsColumns: ColumnDef<AllProducts>[] = [
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
    accessorKey: "productCardImage",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("productCardImage") as string;
      return (
        <div className="relative h-10 w-10 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={row.getValue("productNameEn") || "Product image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package className="h-5 w-5 text-slate-400" />
          )}
        </div>
      );
    },
    enableSorting: false,
    meta: { headerLabel: "Image" },
  },
  {
    accessorKey: "productNameEn",
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
        {row.getValue("productNameEn")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (EN)" },
  },
  {
    accessorKey: "productNameAr",
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
        {row.getValue("productNameAr")}
      </span>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name (AR)", hiddenByDefault: true },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => {
      const categoryName =
        row.original.categories?.categoryNameEn || "Uncategorized";
      return (
        <Badge
          variant="outline"
          className="bg-slate-50 text-slate-700 border-slate-200 font-medium"
        >
          {categoryName}
        </Badge>
      );
    },
    enableSorting: false,
    meta: { headerLabel: "Category" },
  },
  {
    accessorKey: "manufacturerNameEN",
    header: "Manufacturer",
    cell: ({ row }) => {
      const logo = row.original.manufacturerLogo;
      const name = row.original.manufacturerNameEN;
      return (
        <div className="flex items-center gap-2">
          {logo && (
            <img
              src={logo}
              alt={name || "Manufacturer logo"}
              className="h-5 w-5 object-contain rounded-xs"
            />
          )}
          <span className="text-xs font-medium text-slate-700">
            {name || "-"}
          </span>
        </div>
      );
    },
    enableSorting: false,
    meta: { headerLabel: "Manufacturer" },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700 hover:text-[#0b8b99] transition-colors"
      >
        Featured
        <ArrowUpDown className="h-4 w-4 ml-1" />
      </button>
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured") as boolean;
      return (
        <Badge
          variant="outline"
          className={
            isFeatured
              ? "bg-[#0b8b99]/10 text-[#0b8b99] border-[#0b8b99]/30 font-semibold px-2.5 py-0.5 text-xs"
              : "bg-slate-100 text-slate-600 border-slate-200 font-medium px-2.5 py-0.5 text-xs"
          }
        >
          {isFeatured ? "Featured" : "Standard"}
        </Badge>
      );
    },
    enableSorting: true,
    meta: { headerLabel: "Featured" },
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
