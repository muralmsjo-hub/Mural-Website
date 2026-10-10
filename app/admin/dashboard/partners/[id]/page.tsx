import { updatePartnerAction } from "../(actions)/updatePartner";
import { notFound } from "next/navigation";
import { getPartnerById } from "@/server/partners/services";
import EditPartnerForm from "@/components/dashboard/partners/editComponents/EditPartnerForm";

async function EditPartnerPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const result = await getPartnerById(id);

  if (!result || !result.partner) {
    notFound();
  }

  return (
    <EditPartnerForm
      partner={result.partner}
      action={updatePartnerAction}
    />
  );
}

export default EditPartnerPage;
