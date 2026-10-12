import { useFormContext } from "react-hook-form";
import { CreateBannerFormType } from "@/server/banner/validators";
import ImageUploader from "@/components/dashboard/ImageUpload";
import { toast } from "sonner";
import { AlertCircle, Image as ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateBannerFormType>();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <Card className="border border-slate-200 shadow-xs bg-white">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-[#062b56] flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-[#0b8b99]" />
          <span>Banner image</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Upload a high resolution banner graphic for hero carousel displays
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="max-w-lg space-y-2">
          <ImageUploader
            locale="en"
            initialImageUrl={watch("image")}
            endpoint="banners"
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onDelete={() =>
              setValue("image", "", {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          />

          {errors.image && (
            <p className="text-xs flex items-center gap-1.5 text-red-600 font-medium pt-1">
              <AlertCircle size={14} className="text-red-600 shrink-0" />
              <span>{errors.image.message || "Banner image is required"}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MediaSection;
