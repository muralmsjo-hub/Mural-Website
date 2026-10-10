"use client";
import { AlertCircle } from "lucide-react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextareaInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
  dir?:string
}

export default function TextareaInput({
  label,
  register,
  error,
  placeholder,
  className = "",
  description,
  dir
}: TextareaInputProps) {
  const id = register?.name ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className} text-gray-600`}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
        {label}
      </label>
      <textarea
      dir={dir}
        id={id}
        {...register}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
        className={`w-full pl-3 h-40 pr-3 py-2 border rounded-md bg-white shadow-sm transition
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:scale-101
          ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
      />

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-3">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
          <AlertCircle size={12} className="text-red-600 mb-0.5" />
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
}
