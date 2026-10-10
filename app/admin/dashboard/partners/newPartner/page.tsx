import { addPartnerAction } from "../(actions)/addPartner";
import NewPartnerForm from "@/components/dashboard/partners/createComponents/NewPartnerForm";

export default function NewPartnerPage() {
  return <NewPartnerForm action={addPartnerAction} />;
}
