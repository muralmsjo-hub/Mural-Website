import { TextInput } from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";
import ImageUploader from "@/components/dashboard/ImageUpload";
import { toast } from "sonner";
import { AlertCircle, Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ManufacturerSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateProductFormType>();

  const handleUploadComplete = (url: string) => {
    setValue("manufacturerLogo", url, { shouldValidate: true,shouldDirty: true, shouldTouch: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <Card className="border border-slate-200 shadow-xs bg-white">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#0b8b99]" />
          <span>Manufacturer details</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Provide manufacturer brand names and brand logo graphic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextInput
            register={register("manufacturerNameEN")}
            label="Manufacturer name (English)"
            placeholder="e.g. Mural Industrial Ltd."
            error={errors.manufacturerNameEN}
          />
          <TextInput
            register={register("manufacturerNameAr")}
            label="Manufacturer name (Arabic)"
            placeholder="مثال: شركة ميورال الصناعية"
            dir="rtl"
            error={errors.manufacturerNameAr}
          />
        </div>

        <div className="max-w-md space-y-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Manufacturer logo
          </label>
          <ImageUploader
            locale="en"
            initialImageUrl={watch("manufacturerLogo")}
            endpoint="products"
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />

          {errors.manufacturerLogo && (
            <p className="text-xs flex items-center gap-1.5 text-red-600 font-medium pt-1">
              <AlertCircle size={14} className="text-red-600 shrink-0" />
              <span>{errors.manufacturerLogo.message || "Manufacturer logo is required"}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ManufacturerSection;
