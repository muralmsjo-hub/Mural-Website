import { useFormContext } from "react-hook-form";
import { UpdateProductFormType } from "@/server/products/validators";
import ImageUploader from "@/components/dashboard/ImageUpload";
import GalleryUploader from "@/components/dashboard/GalleryUploader";
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
  } = useFormContext<UpdateProductFormType>();

  const productCardImage = watch("productCardImage");
  const rawProductImages = watch("productImages") || [];
  const galleryValues = rawProductImages.map((url) => ({ image_url: url }));

  const handleCardImageUpload = (url: string) => {
    setValue("productCardImage", url, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleGalleryChange = (images: { image_url: string }[]) => {
    const urls = images.map((img) => img.image_url);
    setValue("productImages", urls, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
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
          <span>Product graphics & media gallery</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Upload the primary card thumbnail graphic and gallery images for
          product page presentation
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Main Card Image */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Primary product card image
          </label>
          <div className="max-w-md">
            <ImageUploader
              locale="en"
              initialImageUrl={productCardImage}
              endpoint="products"
              onUploadComplete={handleCardImageUpload}
              onUploadError={handleUploadError}
              onDelete={() =>
                setValue("productCardImage", "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            />
          </div>
          {errors.productCardImage && (
            <p className="text-xs flex items-center gap-1.5 text-red-600 font-medium pt-1">
              <AlertCircle size={14} className="text-red-600 shrink-0" />
              <span>
                {errors.productCardImage.message ||
                  "Product card image is required"}
              </span>
            </p>
          )}
        </div>

        {/* Gallery Images with GalleryUploader */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <label className="block text-sm font-semibold text-slate-700">
            Product gallery images
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Add one or more gallery images for detailed product views
          </p>

          <GalleryUploader
            endpoint="products"
            value={galleryValues}
            onChange={handleGalleryChange}
            onUploadError={handleUploadError}
          />

          {errors.productImages && (
            <p className="text-xs flex items-center gap-1.5 text-red-600 font-medium pt-1">
              <AlertCircle size={14} className="text-red-600 shrink-0" />
              <span>
                {errors.productImages.message ||
                  "At least one gallery image is required"}
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MediaSection;
