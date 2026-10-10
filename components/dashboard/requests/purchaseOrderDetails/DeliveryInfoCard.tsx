import { Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryInfoCardProps {
  deliveryCity: string;
  deliveryStreetName: string;
  deliveryBuildingNumber: string;
  productsCount: number;
  totalQuantity: number;
}

export default function DeliveryInfoCard({
  deliveryCity,
  deliveryStreetName,
  deliveryBuildingNumber,
  productsCount,
  totalQuantity,
}: DeliveryInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-base font-bold text-[#062b56] flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#0b8b99]" />
          <span>Delivery Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3 text-sm">
        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Delivery City:</span>
          <span className="font-semibold text-slate-900">{deliveryCity}</span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Delivery Street:</span>
          <span className="font-semibold text-slate-800">
            {deliveryStreetName}
          </span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Building Number:</span>
          <span className="font-semibold text-slate-800">
            {deliveryBuildingNumber}
          </span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Products Count:</span>
          <span className="font-bold text-slate-900">{productsCount} item(s)</span>
        </div>

        <div className="flex items-start justify-between py-1">
          <span className="text-slate-500 font-medium">Total Quantity:</span>
          <span className="font-bold text-[#0b8b99]">
            {totalQuantity} units
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
