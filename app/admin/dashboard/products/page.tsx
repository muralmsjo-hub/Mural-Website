import { getAllProducts } from "@/server/products/services";
import { productsColumns } from "@/components/dashboard/columns/products-columns";
import { DataTableWithPag } from "@/components/dashboard/DataTableWithPag";
import {
  deleteProductAction,
  deleteManyProductsAction,
} from "./(actions)/deleteProduct";
import { AllProducts } from "@/server/products/types";
import { Package, Plus, PackageOpen } from "lucide-react";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProductsTablePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const take = 10;

  const result = await getAllProducts({ page, take });
  const productsList = (result.data?.products || []) as AllProducts[];
  const totalPages = result.data?.pagination?.totalPages ?? 1;

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <Package className="h-6 w-6 text-[#0b8b99]" />
            <span>Products</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage product catalog, Arabic and English specifications, category assignments, and media.
          </p>
        </div>
        <div>
          <PrimaryButton
            href="/admin/dashboard/products/newProduct"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Add product
          </PrimaryButton>
        </div>
      </div>

      {productsList.length === 0 && page === 1 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <PackageOpen className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No products found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              You haven't added any products to the catalog yet.
            </p>
            <PrimaryButton
              href="/admin/dashboard/products/newProduct"
              icon={<Plus className="h-4 w-4" />}
              iconPosition="left"
            >
              Add new product
            </PrimaryButton>
          </CardContent>
        </Card>
      ) : (
        <DataTableWithPag
          columns={productsColumns}
          data={productsList}
          totalPages={totalPages}
          currentPage={page}
          routeName="products"
          emptyMessage="No products found on this page."
          deleteAction={deleteProductAction}
          deleteManyAction={deleteManyProductsAction}
        />
      )}
    </main>
  );
}
