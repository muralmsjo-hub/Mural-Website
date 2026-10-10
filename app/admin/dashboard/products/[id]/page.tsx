import { updateProductAction } from "../(actions)/updateProduct";
import { notFound } from "next/navigation";
import { getProductById } from "@/server/products/services";
import { getAllCategories } from "@/server/categories/services";
import EditProductForm from "@/components/dashboard/products/editComponents/EditProductForm";

async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const [productResult, categoriesResult] = await Promise.all([
    getProductById(id),
    getAllCategories(),
  ]);

  if (!productResult || !productResult.data) {
    notFound();
  }

  const categoryOptions = (categoriesResult.categories || []).map((cat) => ({
    label: cat.categoryNameEn,
    value: cat.id,
  }));

  return (
    <EditProductForm
      product={productResult.data}
      categories={categoryOptions}
      action={updateProductAction}
    />
  );
}

export default EditProductPage;
