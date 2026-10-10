"use client";

import { AlertCircle } from "lucide-react";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PhoneInputProps {
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  placeholder?: string;
  className?: string;
  description?: string;
  intialValue?: string;
  initialValue?: string;
  dir?: string;
  countryCode?: string;
  showCountryCode?: boolean;
  maxLength?: number;
}

export default function PhoneInput({
  label,
  register,
  error,
  placeholder,
  className = "",
  description,
  intialValue,
  initialValue,
  dir,
  countryCode = "+966",
  showCountryCode = true,
  maxLength = 20,
}: PhoneInputProps) {
  const id =
    register?.name ?? `input-${label ?? "".replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;
  const defaultVal = initialValue ?? intialValue ?? undefined;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...register}
        type="text"
        inputMode="text"
        defaultValue={defaultVal}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        dir={dir}
        aria-describedby={
          error ? errorId : description ? `${id}-desc` : undefined
        }
        className={`w-full rounded-xl border bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-black focus:bg-white ${
          error ? "border-red-300" : "border-neutral-200"
        }`}
      />

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-3">
          {description}
        </p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
          <AlertCircle size={12} className="text-red-600 mb-0.5" />
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
}
