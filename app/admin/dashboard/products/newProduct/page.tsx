import { addProductAction } from "../(actions)/addProduct";
import { getAllCategories } from "@/server/categories/services";
import CreateProductForm from "@/components/dashboard/products/createComponents/NewProductForm";

async function NewProductPage() {
  const result = await getAllCategories();
  const categoriesList = result.categories || [];
  const categoryOptions = categoriesList.map((cat) => ({
    label: cat.categoryNameEn,
    value: cat.id,
  }));

  return (
    <CreateProductForm
      action={addProductAction}
      categories={categoryOptions}
    />
  );
}

export default NewProductPage;
