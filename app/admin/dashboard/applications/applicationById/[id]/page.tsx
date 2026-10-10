import { getApplicationsWithCareerById } from "@/server/applications/services";
import ApplicationDetailsClient from "@/components/dashboard/applications/applicationDetails/MainComponent";
import { markApplicationAsShownAction } from "../../(actions)/markApplicationAction";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const result = await getApplicationsWithCareerById(id);
  if (!result || !result.data) {
    notFound();
  }

  const application = result.data;

  return (
    <div>
      <ApplicationDetailsClient
        applicationDetails={application}
        markApplicationAsShownAction={markApplicationAsShownAction}
      />
    </div>
  );
}
