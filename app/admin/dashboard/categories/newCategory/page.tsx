import { addCategoryAction } from "../(actions)/addCategory";
import CreateCategoryForm from "@/components/dashboard/categories/createComponents/NewCategoryForm";

async function NewCategoryPage() {
  return <CreateCategoryForm action={addCategoryAction} />;
}

export default NewCategoryPage;
