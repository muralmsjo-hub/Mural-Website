"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SelectorInput from "@/components/inputs/SelectorInput";
import { UserRoles } from "@/server/auth/types";
import { PrimaryButton, CancelButton } from "@/components/common";
import { Loader2, ShieldCheck, UserCheck, Info } from "lucide-react";

interface Props {
  userId: string;
  userRole: string;
  action: (data: {
    userId: string;
    newRole: UserRoles;
  }) => Promise<{ message: string; status: number; success: boolean }>;
}

interface FormValues {
  newRole: UserRoles;
}

export default function UpdateRoleForm({ userId, userRole, action }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: { newRole: userRole as UserRoles },
  });

  const selectedRole = watch("newRole");

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const result = await action({ userId, newRole: values.newRole });
        if (result.status === 401) {
          toast.error(result.message);
          router.push("/login");
          return;
        }
        if (result.status === 403) {
          toast.error(result.message);
          router.push("/");
          return;
        }

        if (!result.success) {
          toast.error(result.message || "Failed to update user role.");
          return;
        }

        toast.success(result.message || "User role updated successfully.");
        router.push("/admin/dashboard/users");
      } catch (error) {
        toast.error("An unexpected error occurred while updating the role.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" name="userId" value={userId} />

      <div className="space-y-2">
        <SelectorInput
          name="newRole"
          control={control}
          label="User role"
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          description="Select the system permission level for this account"
        />
      </div>

      {/* Role details box */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#062b56] tracking-wider">
          <Info className="h-4 w-4 text-[#0b8b99]" />
          <span>Role permissions summary</span>
        </div>

        {selectedRole === "admin" ? (
          <div className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-md border border-slate-100 shadow-xs">
            <ShieldCheck className="h-5 w-5 text-[#0b8b99] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#062b56]">Admin role</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Full access to the administration dashboard, user role management, system settings, and all administrative data.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-md border border-slate-100 shadow-xs">
            <UserCheck className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#062b56]">Standard user role</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Standard access restricted to customer-facing features and purchase request submissions.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Form actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <CancelButton
          disabled={isPending}
          onClick={() => {
            router.push("/admin/dashboard/users");
          }}
        />
        <PrimaryButton
          type="submit"
          disabled={isPending}
          icon={isPending ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : undefined}
          iconPosition="left"
          className="cursor-pointer"
        >
          {isPending ? "Updating role..." : "Update role"}
        </PrimaryButton>
      </div>
    </form>
  );
}

