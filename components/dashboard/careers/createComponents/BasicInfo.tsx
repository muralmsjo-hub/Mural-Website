import TextareaInput from "@/components/inputs/TextareaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import { CreateCareerFormType } from "@/server/careers/validators";
import MultiInputForm from "@/components/inputs/MultiInput";
import { Briefcase, FileText, ListCheck } from "lucide-react";
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
  } = useFormContext<CreateCareerFormType>();

  return (
    <div className="space-y-6">
      {/* Card 1: Position details */}
      <Card className="border border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          
            <span>Position details</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Specify the title, role type, and experience level in English and
            Arabic
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextInput
            register={register("positionEn")}
            label="Position title (English)"
            placeholder="e.g. Senior Medical Supplies Specialist"
            error={errors.positionEn}
          />
          <TextInput
            register={register("positionAr")}
            label="Position title (Arabic)"
            placeholder="مثال: أخصائي مستلزمات طبية أول"
            dir="rtl"
            error={errors.positionAr}
          />

          <TextInput
            register={register("roleEn")}
            label="Role type (English)"
            placeholder="e.g. Full-time"
            error={errors.roleEn}
          />
          <TextInput
            register={register("roleAr")}
            label="Role type (Arabic)"
            placeholder="مثال: دوام كامل"
            dir="rtl"
            error={errors.roleAr}
          />

          <TextInput
            register={register("experienceEn")}
            label="Experience level (English)"
            placeholder="e.g. 3-5 years"
            error={errors.experienceEn}
          />
          <TextInput
            register={register("experienceAr")}
            label="Experience level (Arabic)"
            placeholder="مثال: ٣ - ٥ سنوات"
            dir="rtl"
            error={errors.experienceAr}
          />
        </CardContent>
      </Card>

      {/* Card 2: Descriptions */}
      <Card className="border border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0b8b99]" />
            <span>Job description</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Detailed role summary and responsibilities in both languages
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TextareaInput
            register={register("descriptionEn")}
            label="Description (English)"
            placeholder="Write a clear overview of the role, responsibilities, and team expectations..."
            error={errors.descriptionEn}
          />
          <TextareaInput
            register={register("descriptionAr")}
            label="Description (Arabic)"
            placeholder="اكتب وصفاً واضحاً للمسمى الوظيفي والمسؤوليات والتوقعات..."
            dir="rtl"
            error={errors.descriptionAr}
          />
        </CardContent>
      </Card>

      {/* Card 3: Requirements */}
      <Card className="border border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
            <ListCheck className="h-5 w-5 text-[#0b8b99]" />
            <span>Requirements & qualifications</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Add key qualification bullet points for candidate evaluation
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <MultiInputForm
            control={control}
            label="Requirements (English)"
            name="requirementsEn"
            error={errors.requirementsEn}
            placeholder="Type a requirement and press Enter..."
          />
          <MultiInputForm
            control={control}
            label="Requirements (Arabic)"
            name="requirementsAr"
            error={errors.requirementsAr}
            placeholder="اكتب متطلباً واضغط Enter..."
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicInfo;
