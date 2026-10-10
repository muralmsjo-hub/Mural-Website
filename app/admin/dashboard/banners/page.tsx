import { getAllBanners } from "@/server/banner/services";
import { bannerColumns } from "@/components/dashboard/columns/banners-columns";
import { DataTable } from "@/components/dashboard/data-table";
import {
  deleteBannerAction,
  deleteManyBannersAction,
} from "./(actions)/deleteBanner";
import { Image as ImageIcon, Plus, ImageOff } from "lucide-react";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { AllBanners } from "@/server/banner/types";

export default async function BannersTablePage() {
  const result = await getAllBanners();
  const bannersList = (result.banners || []) as AllBanners[];

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-[#0b8b99]" />
            <span>Banners</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage homepage banners, graphic promotions, and display media.
          </p>
        </div>
        <div>
          <PrimaryButton
            href="/admin/dashboard/banners/newBanner"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Add banner
          </PrimaryButton>
        </div>
      </div>

      {bannersList.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <ImageOff className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No promotional banners found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              You haven't added any banners yet.
            </p>
            <PrimaryButton
              href="/admin/dashboard/banners/newBanner"
              icon={<Plus className="h-4 w-4" />}
              iconPosition="left"
            >
              Add new banner
            </PrimaryButton>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={bannerColumns}
          data={bannersList}
          routeName="banners"
          deleteAction={deleteBannerAction}
          deleteManyAction={deleteManyBannersAction}
        />
      )}
    </main>
  );
}
