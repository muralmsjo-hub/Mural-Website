import { getAllCategories } from "@/server/categories/services";
import { categoryColumns } from "@/components/dashboard/columns/categories-columns";
import { DataTable } from "@/components/dashboard/data-table";
import {
  deleteCategoryAction,
  deleteManyCategoriesAction,
} from "./(actions)/deleteCategory";
import { AllCategories } from "@/server/categories/types";
import { FolderTree, Plus, FolderOpen } from "lucide-react";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";

export default async function CategoriesTablePage() {
  const result = await getAllCategories();
  const categoriesList = (result.categories || []) as AllCategories[];

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <FolderTree className="h-6 w-6 text-[#0b8b99]" />
            <span>Categories</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage product categories, Arabic and English names, and featured catalog displays.
          </p>
        </div>
        <div>
          <PrimaryButton href="/admin/dashboard/categories/newCategory" icon={<Plus className="h-4 w-4" />} iconPosition="left">
            Add category
          </PrimaryButton>
        </div>
      </div>

      {categoriesList.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="flex flex-col items-center text-center pt-6">
            <FolderOpen className="w-10 h-10 text-slate-400 mb-3" />
            <h3 className="text-slate-700 text-lg font-semibold">
              No product categories found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              You haven't added any product categories yet.
            </p>
            <PrimaryButton href="/admin/dashboard/categories/newCategory" icon={<Plus className="h-4 w-4" />} iconPosition="left">
              Add new category
            </PrimaryButton>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={categoryColumns}
          data={categoriesList}
          routeName="categories"
          deleteAction={deleteCategoryAction}
          deleteManyAction={deleteManyCategoriesAction}
        />
      )}
    </main>
  );
}
