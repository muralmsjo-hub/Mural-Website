import TextareaInput from "@/components/inputs/TextareaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { useFormContext, Controller } from "react-hook-form";
import { UpdateCategoryFormType } from "@/server/categories/validators";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderTree, FileText, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function BasicInfo() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<UpdateCategoryFormType>();

  return (
    <div className="space-y-6">
      {/* Card 1: Category Details & Featured Toggle */}
      <Card className="border border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-[#0b8b99]" />
            <span>Category details</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Specify the category titles in English and Arabic, and set catalog visibility options
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <TextInput
              register={register("categoryNameEn")}
              label="Category name (English)"
              placeholder="e.g. Diagnostic Equipment"
              error={errors.categoryNameEn}
            />
            <TextInput
              register={register("categoryNameAr")}
              label="Category name (Arabic)"
              placeholder="مثال: معدات التشخيص"
              dir="rtl"
              error={errors.categoryNameAr}
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isFeatured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              )}
            />
            <div className="space-y-0.5">
              <label
                htmlFor="isFeatured"
                className="text-sm font-semibold text-[#062b56] cursor-pointer flex items-center gap-1.5"
              >
                <Star className="h-4 w-4 text-[#0b8b99]" />
                <span>Featured category</span>
              </label>
              <p className="text-xs text-slate-500">
                Display this category in the featured section on the catalog homepage. Maximum 5 featured categories permitted.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Descriptions */}
      <Card className="border border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0b8b99]" />
            <span>Category description</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Write a detailed summary of products within this category
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextareaInput
            register={register("categoryDescriptionEn")}
            label="Description (English)"
            placeholder="Overview of medical products included in this category..."
            error={errors.categoryDescriptionEn}
          />
          <TextareaInput
            register={register("categoryDescriptionAr")}
            label="Description (Arabic)"
            placeholder="نظرة عامة على المنتجات الطبية المدرجة في هذه الفئة..."
            dir="rtl"
            error={errors.categoryDescriptionAr}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicInfo;
