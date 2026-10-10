"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/dashboard/deleteButton";
import { deleteApplicationAction } from "@/app/admin/dashboard/applications/(actions)/deleteApplication";
import { AllApplicationsType } from "@/server/applications/types";

export const ApplicationColumns: ColumnDef<AllApplicationsType>[] = [
  // Checkbox column
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

  // Applicant Name
  {
    accessorKey: "applicant_name",
    header: "Applicant Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "N/A";
      return <div className="font-semibold text-slate-900">{fullName}</div>;
    },
  },

  // Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700 font-mono">
        {row.original.email}
      </div>
    ),
  },

  // Phone Number
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700">{row.original.phoneNumber}</div>
    ),
  },

  // Academic Major
  {
    accessorKey: "major",
    header: "Major",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700">{row.original.major || "—"}</div>
    ),
  },

  // Applied Date
  {
    accessorKey: "appliedAt",
    header: "Applied Date",
    cell: ({ row }) => {
      const date = row.original.appliedAt
        ? new Date(row.original.appliedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "—";
      return <div className="text-sm text-slate-600 font-medium">{date}</div>;
    },
  },

  // Status (Is Shown / Reviewed)
  {
    accessorKey: "isShown",
    header: "Status",
    cell: ({ row }) => {
      const isShown = row.original.isShown;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isShown
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {isShown ? "Reviewed" : "Pending"}
        </span>
      );
    },
  },

  // CV Link
  {
    accessorKey: "cv",
    header: "CV",
    cell: ({ row }) => (
      <a
        href={row.original.cv}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
      >
        <span>View CV</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    ),
    enableSorting: false,
  },

  // Actions Column (View details + Delete)
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-8 px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border-slate-300"
          >
            <Link href={`/admin/dashboard/applications/applicationById/${id}`}>
              <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" />
            </Link>
          </Button>

          <DeleteButton id={id} deleteAction={deleteApplicationAction} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
