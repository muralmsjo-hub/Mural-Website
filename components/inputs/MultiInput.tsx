"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, X } from "lucide-react";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
  Merge,
} from "react-hook-form";

interface MultiInputFormProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  placeholder?: string;
  className?: string;
  description?: string;
}

export default function MultiInputForm<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder = "Add target audience",
  className = "",
  description,
}: MultiInputFormProps<T>) {
  const id = name;
  const errorId = `${id}-error`;

  const truncate = (text: string, max = 25) =>
    text.length > max ? `${text.slice(0, max)}…` : text;

  return (
    <div className={`mb-6 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [input, setInput] = useState("");

          const addAudience = () => {
            const trimmed = input.trim();
            if (!trimmed) return;

            field.onChange([...(field.value || []), trimmed]);
            setInput("");
          };

          const removeAudience = (index: number) => {
            field.onChange(
              (field.value || []).filter((_: string, i: number) => i !== index),
            );
          };

          return (
            <>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id={id}
                  placeholder={placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAudience();
                    }
                  }}
                  aria-invalid={!!error}
                  aria-describedby={
                    error ? errorId : description ? `${id}-desc` : undefined
                  }
                  className={`w-full bg-white shadow-sm transition
                    focus:outline-none focus:ring-2
                    ${
                      error
                        ? "border-red-600 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                />

                <Button
                  type="button"
                  onClick={addAudience}
                  className="w-full sm:w-auto bg-[#0b8b99] hover:bg-[#097480] text-white font-medium cursor-pointer"
                >
                  + Add
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(field.value || []).map((item: string, index: number) => (
                  <Badge
                    key={`${item}-${index}`}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-2 text-sm max-w-full"
                  >
                    <span className="truncate max-w-50 sm:max-w-60">
                      {truncate(item)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeAudience(index)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </>
          );
        }}
      />

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-2">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className=" text-xs text-red-600 ml-2 flex flex-row gap-1.5"
        >
          <AlertCircle size={12} className="text-red-600 mt-0.5" />
          {error.message}
        </p>
      )}
    </div>
  );
}
