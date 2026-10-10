import { TextInput } from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import SelectorInput from "@/components/inputs/SelectorInput";
import CheckBoxInput from "@/components/inputs/CheckBoxInput";
import { useFormContext } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";
import { Layers } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  categories: { label: string; value: string }[];
}

function BasicInfo({ categories }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateProductFormType>();

  return (
    <Card className="border border-slate-200 shadow-xs bg-white">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#0b8b99]" />
          <span>Product basic information</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Enter product names, descriptions, category assignment, and feature status
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextInput
            register={register("productNameEn")}
            label="Product name (English)"
            placeholder="e.g. Premium Acoustic Panel"
            error={errors.productNameEn}
          />
          <TextInput
            register={register("productNameAr")}
            label="Product name (Arabic)"
            placeholder="مثال: لوحة صوتية فاخرة"
            dir="rtl"
            error={errors.productNameAr}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextareaInput
            register={register("productDescriptionEn")}
            label="Product description (English)"
            placeholder="Detailed description of the product..."
            error={errors.productDescriptionEn}
          />
          <TextareaInput
            register={register("productDescriptionAr")}
            label="Product description (Arabic)"
            placeholder="وصف تفصيلي للمنتج..."
            dir="rtl"
            error={errors.productDescriptionAr}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          <SelectorInput
            name="categoryId"
            control={control}
            label="Product category"
            placeholder="Select a category"
            options={categories}
            error={errors.categoryId}
          />

          <div className="pt-7">
            <CheckBoxInput
              name="isFeatured"
              control={control}
              label="Feature this product on homepage catalog"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BasicInfo;
