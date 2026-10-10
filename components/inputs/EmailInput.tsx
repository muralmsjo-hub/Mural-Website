"use client";

import { AlertCircle } from "lucide-react";
import React, { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | string;
  register?: UseFormRegisterReturn;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ label, error, register, className = "", ...props }, ref) => {
    const errorMessage = typeof error === "string" ? error : error?.message;
    return (
      <div className={className}>
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
        >
          {label}
        </label>
        <input
          type="email"
          ref={ref}
          {...register}
          {...props}
          className={`w-full rounded-xl border bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-black focus:bg-white text-start ${
            errorMessage ? "border-red-300" : "border-neutral-200"
          }`}
        />
        {errorMessage && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
            <AlertCircle size={12} className="text-red-600 mb-0.5" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
