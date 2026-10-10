import { CareersColumns } from "@/components/dashboard/columns/careers-columns";
import { DataTable } from "@/components/dashboard/data-table";
import { deleteCareerAction, deleteManyCareersAction } from "./(actions)/deleteCareer";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Briefcase, Plus } from "lucide-react";
import { getAllCareers } from "@/server/careers/services";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export default async function CareersTablePage() {
  const allCareers = (await getAllCareers()).careers || [];

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#0b8b99]" />
            <span>Careers</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage career opportunities, job postings, and applicant requirements.
          </p>
        </div>
        <div>
          <PrimaryButton href="/admin/dashboard/careers/newCareer" icon={<Plus className="h-4 w-4" />} iconPosition="left">
            Add career
          </PrimaryButton>
        </div>
      </div>

      {allCareers.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <FolderOpen className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No career postings found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              You haven't added any career postings yet.
            </p>
            <PrimaryButton href="/admin/dashboard/careers/newCareer" icon={<Plus className="h-4 w-4" />} iconPosition="left">
              Add new career
            </PrimaryButton>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={CareersColumns}
          data={allCareers}
          routeName="careers"
          deleteAction={deleteCareerAction}
          deleteManyAction={deleteManyCareersAction}
        />
      )}
    </main>
  );
}
