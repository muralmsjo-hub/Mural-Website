"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AllUsers } from "@/server/auth/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

// Define the columns for the User table
export const userColumns: ColumnDef<AllUsers>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    enableSorting: true,
    meta: { headerLabel: "Name" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <a
          href={`mailto:${email}`}
          className="underline text-gray-900 hover:text-gray-600"
        >
          {email}
        </a>
      );
    },
    enableSorting: true,
    meta: { headerLabel: "Email" },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Role
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <>
          {role === "admin" ? (
            <div className="text-red-800 uppercase ">{role}</div>
          ) : (
            <div className="uppercase">{role}</div>
          )}
        </>
      );
    },
    enableSorting: true,
    meta: { headerLabel: "Role" },
  },
];
