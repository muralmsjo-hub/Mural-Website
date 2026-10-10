import { getAllPurchaseRequest } from "@/server/purchase-order-request/services";
import { getAllProducts } from "@/server/products/services";
import { deleteManyPurchaseOrderRequestsAction } from "./(actions)/deletePurchaseOrderRequest";
import { purchaseOrderRequestColumns } from "@/components/dashboard/columns/purchase-order-request-columns";
import PurchaseOrderRequestFilters from "@/components/dashboard/requests/PurchaseOrderRequestFilters";
import { DataTableWithPag } from "@/components/dashboard/DataTableWithPag";
import { ShoppingBag, ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  searchParams: Promise<{
    page?: string;
    companyName?: string;
    productId?: string;
  }>;
}

export default async function PurchaseOrderRequestsPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const companyName = params.companyName || undefined;
  const productId = params.productId || undefined;

  // Fetch paginated purchase order requests with filters
  const result = await getAllPurchaseRequest({
    page,
    take: 10,
    companyName,
    productId,
  });

  // Fetch all products for the product filter dropdown
  const productsResult = await getAllProducts({ page: 1, take: 100 });
  const productOptions = (productsResult.data?.products || []).map((p) => ({
    id: p.id,
    name: p.productNameEn,
  }));

  const requestData = result.data?.requestData ?? [];
  const pagination = result.data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <main className="w-full p-4 md:p-6 space-y-6 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            href="/admin/dashboard/requests"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Inbound Requests
          </Link>
          <h1 className="text-xl md:text-3xl font-bold text-[#062b56] flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-[#0b8b99]" />
            <span>Purchase Order Requests</span>
          </h1>
          <p className="text-sm text-slate-500">
            Review and manage product order requests submitted by clients and
            companies.
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <PurchaseOrderRequestFilters products={productOptions} />

      {/* Main Data Table */}
      {requestData.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <ClipboardList className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No purchase order requests found
            </h3>
            <p className="text-slate-500 text-sm">
              {companyName || productId
                ? "No purchase requests match your active filters. Try resetting the filters."
                : "No purchase order requests have been submitted yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <DataTableWithPag
          columns={purchaseOrderRequestColumns}
          data={requestData}
          totalPages={totalPages}
          currentPage={page}
          deleteManyAction={deleteManyPurchaseOrderRequestsAction}
        />
      )}
    </main>
  );
}
