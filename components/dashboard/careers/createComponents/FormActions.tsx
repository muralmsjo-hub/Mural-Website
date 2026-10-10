"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PrimaryButton, CancelButton } from "@/components/common";
import { Loader2 } from "lucide-react";

function FormActions() {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 mt-6">
      <CancelButton
        disabled={isSubmitting}
        type="button"
        onClick={() => router.push("/admin/dashboard/careers")}
      />
      <PrimaryButton
        type="submit"
        disabled={!isDirty || isSubmitting}
        aria-disabled={!isDirty || isSubmitting}
        icon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : undefined}
        iconPosition="left"
        className="cursor-pointer"
      >
        {isSubmitting ? "Adding career..." : "Add career"}
      </PrimaryButton>
    </div>
  );
}

export default FormActions;
