import { TextInput } from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import { CreateBannerFormType } from "@/server/banner/validators";
import { Layers } from "lucide-react";
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
  } = useFormContext<CreateBannerFormType>();

  return (
    <Card className="border border-slate-200 shadow-xs bg-white">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#0b8b99]" />
          <span>Banner information</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Enter the banner title in English and Arabic for promotional displays
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <TextInput
          register={register("nameEn")}
          label="Banner name (English)"
          placeholder="e.g. Summer Special Promotion"
          error={errors.nameEn}
        />
        <TextInput
          register={register("nameAr")}
          label="Banner name (Arabic)"
          placeholder="مثال: عرض الصيف الخاص"
          dir="rtl"
          error={errors.nameAr}
        />
      </CardContent>
    </Card>
  );
}

export default BasicInfo;
