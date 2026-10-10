"use client";

import { UploadCloudIcon, X } from "lucide-react";
import { useState, useRef, DragEvent } from "react";
import Image from "next/image";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";

interface GalleryUploaderProps {
  endpoint: keyof OurFileRouter;
  value: { image_url: string }[];
  onChange: (images: { image_url: string }[]) => void;
  onUploadError: (error: Error) => void;
}

export default function GalleryUploader({
  endpoint,
  value,
  onChange,
  onUploadError,
}: GalleryUploaderProps) {
  const { startUpload, isUploading } = useUploadThing(endpoint);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_BYTES = 4 * 1024 * 1024; // 4MB

  function getUrlFromRes(res: any): string | null {
    if (!res) return null;
    return (
      res.url ??
      res.ufsUrl ??
      res.uploadedUrl ??
      res.serverData?.uploadedUrl ??
      res.file?.url ??
      res.file?.ufsUrl ??
      res.file?.ufs_url ??
      null
    );
  }

  async function uploadFiles(files: FileList | File[]) {
    const validFiles = Array.from(files).filter(
      (file) => file.size <= MAX_BYTES
    );

    if (!validFiles.length) return;

    try {
      const rawRes = await startUpload(validFiles);
      if (!rawRes || !rawRes.length) return;

      const newImages = rawRes
        .map((res) => getUrlFromRes(res))
        .filter((url): url is string => Boolean(url))
        .map((url) => ({ image_url: url }));

      onChange([...value, ...newImages]);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Upload failed");
      onUploadError(error);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    uploadFiles(e.target.files);
    e.currentTarget.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    uploadFiles(e.dataTransfer.files);
  }

  function removeImage(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleInput}
      />

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-slate-200 hover:border-[#0b8b99]/50 rounded-lg cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloudIcon className="w-10 h-10 text-slate-400 mb-2" />
        <p className="text-sm font-semibold text-slate-700">
          {isUploading
            ? "Uploading gallery images..."
            : "Drop images here or click to upload"}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Multiple images allowed (Max 4MB each)
        </p>
      </div>

      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {value.map((img, index) => (
            <div key={index} className="relative h-28 border border-slate-200 rounded-md overflow-hidden bg-slate-50 group">
              <Image
                src={img.image_url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-xs transition-colors"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}