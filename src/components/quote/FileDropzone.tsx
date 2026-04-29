"use client";

import { motion } from "framer-motion";
import { FolderOpen, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const ACCEPTED = [".stl", ".step", ".stp", ".obj", ".3mf"];
const MAX_BYTES = 50 * 1024 * 1024;

function normalizeExt(name: string) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function isAcceptedFile(name: string) {
  return ACCEPTED.includes(normalizeExt(name));
}

export function FileDropzone({
  files,
  onChange,
  id = "quote-files",
}: {
  files: File[];
  onChange: (files: File[]) => void;
  id?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const next: File[] = [...files];
      const incoming = Array.from(list);
      for (const f of incoming) {
        if (!isAcceptedFile(f.name)) {
          setError(
            `Unsupported file: ${f.name}. Use ${ACCEPTED.join(", ")}.`,
          );
          return;
        }
        if (f.size > MAX_BYTES) {
          setError(`${f.name} exceeds 50 MB limit.`);
          return;
        }
        next.push(f);
      }
      setError(null);
      onChange(next);
    },
    [files, onChange],
  );

  return (
    <div className="space-y-3">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setActive(true);
        }}
        onDragLeave={() => setActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setActive(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        animate={{
          borderColor: active
            ? "rgba(34, 211, 238, 0.55)"
            : "rgba(255,255,255,0.12)",
          backgroundColor: active
            ? "rgba(34, 211, 238, 0.06)"
            : "rgba(255,255,255,0.03)",
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        )}
      >
        <Upload
          className="mx-auto size-10 text-filament-cyan"
          aria-hidden
        />
        <p className="mt-4 font-medium text-foreground">
          Drag & drop CAD files
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          .STL, .OBJ, .3MF, .STEP · max 50 MB each · optional if you send via
          WhatsApp instead
        </p>
        <label htmlFor={id} className="mt-6 inline-flex cursor-pointer">
          <span className="focus-ring rounded-full border border-filament-cyan/40 bg-filament-cyan/15 px-5 py-2.5 text-sm font-semibold text-filament-cyan hover:bg-filament-cyan/25">
            Browse files
          </span>
          <input
            id={id}
            type="file"
            className="sr-only"
            multiple
            accept=".stl,.step,.stp,.obj,.3mf"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </motion.div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {files.length > 0 ? (
        <ul className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          {files.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between gap-3 text-sm text-muted-foreground"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FolderOpen
                  className="size-4 shrink-0 text-filament-cyan"
                  aria-hidden
                />
                <span className="truncate text-foreground">{f.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  ({(f.size / 1024).toFixed(1)} KB)
                </span>
              </span>
              <button
                type="button"
                className="focus-ring rounded-lg p-1 text-muted-foreground hover:text-foreground"
                onClick={() => onChange(files.filter((_, i) => i !== idx))}
                aria-label={`Remove ${f.name}`}
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
