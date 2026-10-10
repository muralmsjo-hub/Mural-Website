import { TextInput } from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import { useFormContext } from "react-hook-form";
import { UpdatePartnerFormType } from "@/server/partners/validators";
import { Handshake } from "lucide-react";
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
  } = useFormContext<UpdatePartnerFormType>();

  return (
    <Card className="border border-slate-200 shadow-xs bg-white">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          <Handshake className="h-5 w-5 text-[#0b8b99]" />
          <span>Partner information</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Update the partner name, description, and website reference link in English and Arabic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextInput
            register={register("partnerNameEn")}
            label="Partner name (English)"
            placeholder="e.g. Acme Corporation"
            error={errors.partnerNameEn}
          />
          <TextInput
            register={register("partnerNameAr")}
            label="Partner name (Arabic)"
            placeholder="مثال: شركة أكمي"
            dir="rtl"
            error={errors.partnerNameAr}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextareaInput
            register={register("partnerDescriptionEn")}
            label="Partner description (English)"
            placeholder="Brief overview of partner relationship and services..."
            error={errors.partnerDescriptionEn}
          />
          <TextareaInput
            register={register("partnerDescriptionAr")}
            label="Partner description (Arabic)"
            placeholder="نبذة عن الشريك والخدمات المقدمة..."
            dir="rtl"
            error={errors.partnerDescriptionAr}
          />
        </div>

        <TextInput
          register={register("referenceLink")}
          label="Website reference link (Optional)"
          placeholder="e.g. https://www.partner-website.com"
          error={errors.referenceLink}
        />
      </CardContent>
    </Card>
  );
}

export default BasicInfo;
