"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, Building2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/dashboard/deleteButton";
import { deletePurchaseOrderRequestAction } from "@/app/admin/dashboard/purchase-order-requests/(actions)/deletePurchaseOrderRequest";
import type { AllRequestsData } from "@/server/purchase-order-request/types";

export const purchaseOrderRequestColumns: ColumnDef<AllRequestsData>[] = [
  // Checkbox column for selection
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

  // Company Name
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="font-semibold text-slate-900">
          {row.original.companyName}
        </span>
      </div>
    ),
  },

  // Contact Person / Email
  {
    accessorKey: "personName",
    header: "Contact Person",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">
          {row.original.personName || "N/A"}
        </span>
      </div>
    ),
  },

  // Phone Number
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700 font-medium">
        {row.original.phoneNumber}
      </span>
    ),
  },

  // Delivery City
  {
    accessorKey: "deliveryCity",
    header: "Delivery City",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        {row.original.deliveryCity}
      </span>
    ),
  },

  // Items / Quantity
  {
    accessorKey: "numberOfProducts",
    header: "Products / Qty",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
        <span>
          {row.original.numberOfProducts} item(s) ({row.original.totalQuantity}{" "}
          total qty)
        </span>
      </div>
    ),
  },

  // Created Date
  {
    accessorKey: "createdAt",
    header: "Submitted Date",
    cell: ({ row }) => {
      const date = row.original.createdAt
        ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "—";
      return <span className="text-xs font-medium text-slate-600">{date}</span>;
    },
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
            <Link
              href={`/admin/dashboard/purchase-order-requests/${id}`}
            >
              <Eye className="w-3.5 h-3.5  text-slate-500" />
            </Link>
          </Button>

          <DeleteButton
            id={id}
            deleteAction={deletePurchaseOrderRequestAction}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
