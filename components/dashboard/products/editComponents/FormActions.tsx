import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PrimaryButton, CancelButton } from "@/components/common";
import { Loader2 } from "lucide-react";

function FormActions() {
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
      <CancelButton
        disabled={isSubmitting}
        onClick={() => {
          router.push("/admin/dashboard/products");
        }}
      />
      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        icon={
          isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          ) : undefined
        }
        iconPosition="left"
        className="cursor-pointer"
      >
        {isSubmitting ? "Updating product..." : "Update product"}
      </PrimaryButton>
    </div>
  );
}

export default FormActions;
