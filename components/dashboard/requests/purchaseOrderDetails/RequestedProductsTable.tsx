import { ShoppingBag, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProductDetailItem {
  productName: string;
  productDescription: string;
  productImage: string;
  quantity: number;
}

interface RequestedProductsTableProps {
  products: ProductDetailItem[];
}

export default function RequestedProductsTable({
  products,
}: RequestedProductsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-base font-bold text-[#062b56] flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#0b8b99]" />
          <span>Requested Products ({products?.length || 0})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products && products.length > 0 ? (
                products.map((prod, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="h-12 w-16 rounded-md overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                        {prod.productImage ? (
                          <img
                            src={prod.productImage}
                            alt={prod.productName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {prod.productName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-lg">
                      {prod.productDescription || "—"}
                    </td>
                    <td className="py-3 px-4 font-extrabold text-[#0b8b99] text-right">
                      {prod.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-slate-500 font-medium"
                  >
                    No products specified in this request.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
