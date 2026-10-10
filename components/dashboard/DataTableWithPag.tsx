"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  RowData,
} from "@tanstack/react-table";
import { useState } from "react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    hiddenByDefault?: boolean;
    headerLabel?: string;
  }
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ExportApplicationsButton from "./ExportApplicationsButton";
import BulkDeleteButton from "./BulkDeleteButton";
import DeleteButton from "./deleteButton";
import { SquarePen } from "lucide-react";

interface DataTableWithPagProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  routeName?: string;
  emptyMessage?: string;
  careerId?: string;
  careerName?: string;
  deleteAction?: (
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
  deleteManyAction?: (
    ids: string[],
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export function DataTableWithPag<TData>({
  columns,
  data,
  totalPages,
  currentPage,
  routeName,
  emptyMessage = "No records found.",
  careerId,
  careerName,
  deleteAction,
  deleteManyAction,
}: DataTableWithPagProps<TData>) {
  const initialVisibility: VisibilityState = Object.fromEntries(
    columns
      .map((col) => {
        const key =
          col.id ?? (col as { accessorKey?: string }).accessorKey ?? undefined;
        if (!key) return [];
        return [key, col.meta?.hiddenByDefault ? false : true];
      })
      .filter((entry): entry is [string, boolean] => entry.length === 2),
  );

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initialVisibility);
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasExplicitActions = columns.some((col) => col.id === "actions");
  const effectiveColumns =
    !hasExplicitActions && (routeName || deleteAction)
      ? [
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: any }) => {
              const rowData = row.original as TData & { id: string };
              return (
                <div className="flex gap-2">
                  {routeName && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`${routeName}/${rowData.id}`)}
                      className="cursor-pointer"
                    >
                      <SquarePen className="h-4 w-4" />
                    </Button>
                  )}
                  {deleteAction && (
                    <DeleteButton
                      id={rowData.id ?? ""}
                      deleteAction={deleteAction}
                    />
                  )}
                </div>
              );
            },
            enableSorting: false,
            enableHiding: false,
          },
        ]
      : columns;

  const table = useReactTable({
    data,
    columns: effectiveColumns,
    manualPagination: true,
    pageCount: totalPages,
    getRowId: (row: any) => row.id,
    state: {
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().flatRows;
  const selectedIds = selectedRows
    .map((row) => (row.original as TData & { id: string })?.id)
    .filter(Boolean);

  return (
    <div className="space-y-4 w-full text-slate-700">
      {/* === Controls Toolbar === */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && deleteManyAction && (
            <BulkDeleteButton
              ids={selectedIds}
              deleteManyAction={deleteManyAction}
              onFinish={() => {
                setRowSelection({});
                router.refresh();
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {careerId && careerName && (
            <ExportApplicationsButton
              careerId={careerId}
              careerName={careerName}
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1.5">
                View <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllLeafColumns()
                .filter((col) => col.getCanHide())
                .map((column) => {
                  const label =
                    column.columnDef.meta?.headerLabel ||
                    (typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : undefined) ||
                    column.id.replace(/_/g, " ");

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* === Table Container === */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table className="w-full min-w-full">
          <TableHeader className="bg-slate-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-200"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-bold  tracking-wider text-slate-600 py-3.5 px-4 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-3 px-4 text-sm whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={effectiveColumns.length}
                  className="h-32 text-center text-slate-500 font-medium"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* === Pagination Controls === */}
      {totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-1">
          <div className="text-xs font-semibold text-slate-500">
            Page <span className="text-slate-900 font-bold">{currentPage}</span>{" "}
            of <span className="text-slate-900 font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1 text-xs font-semibold"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
