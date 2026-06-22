"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface JournalPromptProps {
  prompt: string;
}

export function JournalPrompt({ prompt }: JournalPromptProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const textareaId = `journal-${prompt.slice(0, 20).replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div
      className="my-8 rounded-xl border border-dashed border-border bg-surface-sunken p-5 sm:p-6"
      role="region"
      aria-label="Journal prompt"
    >
      {/* Header */}
      <p className="text-small font-semibold uppercase tracking-wide text-ink-muted mb-2">
        Journal
      </p>

      {/* Prompt */}
      <label htmlFor={textareaId} className="block text-body italic text-ink mb-3">
        {prompt}
      </label>

      {/* Textarea */}
      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        rows={4}
        placeholder="Write your thoughts here..."
        className={cn(
          "w-full rounded-lg border border-border bg-paper px-3 py-2.5",
          "text-body text-ink placeholder:text-ink-muted/60",
          "transition-colors resize-y",
          "focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none"
        )}
      />

      {/* Privacy note */}
      <p className="mt-2 text-small text-ink-muted">
        Your notes stay private -- nothing is saved or sent.
      </p>
    </div>
  );
}
