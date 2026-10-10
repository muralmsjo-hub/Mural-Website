import { updateBannerAction } from "../(actions)/updateBanner";
import { notFound } from "next/navigation";
import { getBannerById } from "@/server/banner/services";
import EditBannerForm from "@/components/dashboard/banners/editComponents/EditBannerForm";

async function EditBannerPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const result = await getBannerById(id);

  if (!result || !result.banner) {
    notFound();
  }

  return (
    <EditBannerForm
      banner={result.banner}
      action={updateBannerAction}
    />
  );
}

export default EditBannerPage;
