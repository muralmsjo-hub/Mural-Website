import { getAllPartners } from "@/server/partners/services";
import { partnerColumns } from "@/components/dashboard/columns/partners-columns";
import { DataTable } from "@/components/dashboard/data-table";
import {
  deletePartnerAction,
  deleteManyPartnersAction,
} from "./(actions)/deletePartner";
import { Handshake, Plus, FolderOpen } from "lucide-react";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { AllPartners } from "@/server/partners/types";

export default async function PartnersTablePage() {
  const result = await getAllPartners();
  const partnersList = (result.partners || []) as AllPartners[];

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <Handshake className="h-6 w-6 text-[#0b8b99]" />
            <span>Partners</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage company partners, brand logos, descriptions, and reference links.
          </p>
        </div>
        <div>
          <PrimaryButton
            href="/admin/dashboard/partners/newPartner"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Add partner
          </PrimaryButton>
        </div>
      </div>

      {partnersList.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <FolderOpen className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No partners found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              You haven't added any partners yet.
            </p>
            <PrimaryButton
              href="/admin/dashboard/partners/newPartner"
              icon={<Plus className="h-4 w-4" />}
              iconPosition="left"
            >
              Add new partner
            </PrimaryButton>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={partnerColumns}
          data={partnersList}
          routeName="partners"
          deleteAction={deletePartnerAction}
          deleteManyAction={deleteManyPartnersAction}
        />
      )}
    </main>
  );
}
