import { getFilteredApplications } from "@/server/applications/services";
import {
  deleteApplicationAction,
  deleteManyApplicationsAction,
} from "../(actions)/deleteApplication";
import { ApplicationColumns } from "@/components/dashboard/columns/application-columns";
import { Info, ArrowLeft } from "lucide-react";
import { getCareerNameAndIdById } from "@/server/careers/services";
import { DataTableWithPag } from "@/components/dashboard/DataTableWithPag";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{ id: string }>;
}

async function Page({ params, searchParams }: Props) {
  // note that id is the career id not application id
  const { id } = await params;
  const searchParamsData = await searchParams;
  const page = Math.max(1, Number(searchParamsData.page ?? 1));

  const careerResult = await getCareerNameAndIdById(id);

  if (!careerResult || !careerResult.career) {
    notFound();
  }

  const careerDetails = careerResult.career;
  const filteredData = await getFilteredApplications(id, page);

  const totalPages = filteredData.pagination?.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-6 p-2 sm:p-4 md:p-6 w-full max-w-7xl mx-auto min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            href="/admin/dashboard/applications"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Careers
          </Link>
          <h1 className="text-lg md:text-3xl font-bold text-slate-800">
            Applications for {careerDetails.positionEn}
          </h1>
        </div>
      </div>

      {/* Main Table */}
      <DataTableWithPag
        columns={ApplicationColumns}
        data={filteredData.applications}
        totalPages={totalPages}
        currentPage={page}
        careerId={id}
        careerName={careerDetails.positionEn}
        deleteAction={deleteApplicationAction}
        deleteManyAction={deleteManyApplicationsAction}
      />

      {/* Expiration Info Banner */}
      <div className="w-full">
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3.5 shadow-sm">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-blue-800 font-medium">
            All applications are automatically deleted 45 days after submission.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
