import { getRequestById } from "@/server/purchase-order-request/services";
import { notFound } from "next/navigation";
import PurchaseOrderHeader from "@/components/dashboard/requests/purchaseOrderDetails/PurchaseOrderHeader";
import RequesterInfoCard from "@/components/dashboard/requests/purchaseOrderDetails/RequesterInfoCard";
import DeliveryInfoCard from "@/components/dashboard/requests/purchaseOrderDetails/DeliveryInfoCard";
import AdditionalRequirementsCard from "@/components/dashboard/requests/purchaseOrderDetails/AdditionalRequirementsCard";
import RequestedProductsTable from "@/components/dashboard/requests/purchaseOrderDetails/RequestedProductsTable";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PurchaseOrderRequestDetailsPage({
  params,
}: Props) {
  const { id } = await params;
  const result = await getRequestById(id);

  if (!result || !result.data) {
    notFound();
  }

  const request = result.data;

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 min-w-0 text-slate-800">
      {/* Header Bar */}
      <PurchaseOrderHeader
        companyName={request.companyName}
        createdAt={request.createdAt}
      />

      {/* Grid: Requester & Delivery Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequesterInfoCard
          companyName={request.companyName}
          personName={request.personName}
          jobTitle={request.jobTitle}
          email={request.email}
          phoneNumber={request.phoneNumber}
          city={request.city}
          streetName={request.streetName}
        />

        <DeliveryInfoCard
          deliveryCity={request.deliveryCity}
          deliveryStreetName={request.deliveryStreetName}
          deliveryBuildingNumber={request.deliveryBuildingNumber}
          productsCount={request.productsCount}
          totalQuantity={request.totalQuantity}
        />
      </div>

      {/* Additional Requirements & Documents */}
      <AdditionalRequirementsCard
        additionalProductRequirements={request.additionalProductRequirements}
        supportingDocuments={request.supportingDocuments}
      />

      {/* Ordered Products Table */}
      <RequestedProductsTable products={request.productDetails || []} />
    </main>
  );
}
