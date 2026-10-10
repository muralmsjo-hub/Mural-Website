"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  control: Control<T>;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
  triggerClassName?: string;
  dir?: "rtl" | "ltr";
}

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  control,
  options,
  error,
  placeholder = "Select option",
  className = "",
  description,
  triggerClassName = "w-full",
  dir = "ltr",
}: FormSelectProps<T>) {
  const id = name;
  const errorId = `${id}-error`;

  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-gray-700 mb-1 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select dir={dir} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              id={id}
              dir={dir}
              aria-invalid={!!error}
              aria-describedby={
                error ? errorId : description ? `${id}-desc` : undefined
              }
              className={`
                bg-white shadow-sm transition text-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${triggerClassName}
                ${isRTL ? "text-right" : "text-left"}
                ${
                  error
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-200"
                }
              `}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            {/* FIXED: Using valid Tailwind syntax for CSS variables */}
            <SelectContent
              position="popper"
              dir={dir}
              align="start"
              sideOffset={4}
              className="w-(--radix-select-trigger-width) min-w-(--radix-select-trigger-width) max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`${isRTL ? "text-right" : "text-left"} w-full`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {description && (
        <p
          id={`${id}-desc`}
          className={`mt-1 text-xs text-gray-500 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className={`mt-1 text-xs flex flex-row gap-2 text-red-600 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          <AlertCircle size={12} className="text-red-600 mt-0.5" />
          {error.message}
        </p>
      )}
    </div>
  );
}
