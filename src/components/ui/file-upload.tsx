"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, FileText, CheckCircle } from "lucide-react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  label?: string;
  error?: string;
  accept?: Record<string, string[]>;
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  label = "Upload File",
  error,
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "image/*": [".jpeg", ".png", ".jpg"],
  },
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange],
  );

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`group relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-green-400 bg-green-50/10"
            : "border-white/20 hover:border-white/40 hover:bg-white/5"
        }
        ${error ? "border-red-500/50" : ""}
        `}
      >
        <input {...getInputProps()} />

        {value ? (
          <div className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-green-500/20 rounded-full text-green-400">
              <CheckCircle size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate max-w-[200px]">
                {value.name}
              </p>
              <p className="text-xs text-white/50">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleRemove}
              type="button"
              className="p-1 px-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-white/70 group-hover:text-white transition-colors">
            <Upload className="w-8 h-8 mb-3" />
            <p className="mb-1 text-sm font-semibold">
              <span className="font-bold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white/50">
              PDF, DOC, DOCX, IMG (MAX. 5MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
