"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils"; 
import { AlertCircle } from "lucide-react";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: { message?: string };
  description?: string;
  className?: string;
}

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  control,
  error,
  description,
  className,
}: FormCheckboxProps<T>) {
  const id = name as string;

  return (
    <div className={cn("space-y-2", className)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
              className={cn(error && "border-destructive")}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      />
      {error?.message && (
        <p className="text-[0.8rem] font-medium text-destructive">
          <AlertCircle size={12} className="text-red-600" />
          {error.message}
        </p>
      )}
    </div>
  );
}