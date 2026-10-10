import { editCareerAction } from "../(actions)/editCareer";
import { notFound } from "next/navigation";
import { getCareerById } from "@/server/careers/services";
import EditCareerForm from "@/components/dashboard/careers/editComponents/EditCareerForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const career = await getCareerById(id);

  if (!career || !career.career) {
    notFound();
  }

  return <EditCareerForm career={career.career} action={editCareerAction} />;
}

export default Page;
