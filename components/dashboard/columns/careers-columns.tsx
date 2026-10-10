"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AllCareersType } from "@/server/careers/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const CareersColumns: ColumnDef<AllCareersType>[] = [
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
    accessorKey: "positionEn",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("positionEn") as string;
      return <div className=" font-medium">{name}</div>;
    },
    enableSorting: true,
    meta: { headerLabel: "Position (EN)" },
  },
  {
    accessorKey: "posistionAr",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.original.positionAr;
      return <div className=" font-medium">{name}</div>;
    },
    enableSorting: true,
    meta: { hiddenByDefault: true, headerLabel: "Position (AR)" },
  },

 {
  accessorKey: "descriptionEn",
  header: "Description (EN)",
  cell: ({ row }) => {
    const desc = row.original.descriptionEn;
    return (
      <div className="truncate max-w-xs">
        {desc.length > 35 ? desc.slice(0, 35) + "..." : desc}
      </div>
    );
  },
},
  {
    accessorKey: "descriptionAr",
    header: "Description (AR)",
    cell: ({ row }) => {
      const desc = row.original.descriptionAr;
      return <div className="truncate max-w-xs">
        {desc.length > 35 ? desc.slice(0, 35) + "..." : desc}
      </div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  {
    accessorKey: "experienceEn",
    header: "Experience (EN)",
    cell: ({ row }) => {
      const name = row.original.experienceEn;
      return <div>{name}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "experienceAr",
    header: "Experience (AR)",
    cell: ({ row }) => {
      const name = row.original.experienceAr;
      return <div>{name}</div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  {
    accessorKey: "roleEn",
    header: "Role (EN)",
    cell: ({ row }) => {
      const name = row.original.roleEn;
      return <div>{name}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "roleAr",
    header: "Role (AR)",
    cell: ({ row }) => {
      const name = row.original.roleAr;
      return <div>{name}</div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  
];
