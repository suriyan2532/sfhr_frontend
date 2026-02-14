"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { GlassCard } from "./glass-ui";

interface ImageUploadProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  label?: string;
  error?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label = "Upload Image",
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string"
      ? value
      : value
        ? URL.createObjectURL(value)
        : null,
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange],
  );

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-green-400 bg-green-50/10"
            : "border-white/20 hover:border-white/40 hover:bg-white/5"
        }
        ${error ? "border-red-500/50" : ""}
        `}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative w-full h-full p-2">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={handleRemove}
              type="button"
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-white/70 group-hover:text-white transition-colors">
            <div className="p-3 mb-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="mb-2 text-sm font-semibold">
              <span className="font-bold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white/50">
              SVG, PNG, JPG or GIF (MAX. 5MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
