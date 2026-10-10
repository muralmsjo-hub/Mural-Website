import { updateCategoryAction } from "../(actions)/updateCategory";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/server/categories/services";
import EditCategoryForm from "@/components/dashboard/categories/editComponents/EditCategoryForm";

async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const result = await getCategoryById(id);

  if (!result || !result.category) {
    notFound();
  }

  return (
    <EditCategoryForm
      category={result.category}
      action={updateCategoryAction}
    />
  );
}

export default EditCategoryPage;
