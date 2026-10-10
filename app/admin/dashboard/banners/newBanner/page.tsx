import { addBannerAction } from "../(actions)/addBanner";
import CreateBannerForm from "@/components/dashboard/banners/createComponents/NewBannerForm";

async function NewBannerPage() {
  return <CreateBannerForm action={addBannerAction} />;
}

export default NewBannerPage;
