"use client";

import { cn } from "@/lib/utils";

type Option = {
  title: string;
  values: { value: string }[];
};

type VariantSelectorProps = {
  options: Option[];
  selected: Record<string, string>;
  onSelect: (optionTitle: string, value: string) => void;
};

export function VariantSelector({
  options,
  selected,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.title}>
          <h4 className="text-sm font-semibold mb-2">{option.title}</h4>
          <div className="flex flex-wrap gap-2">
            {option.values.map((v) => {
              const isSelected = selected[option.title] === v.value;
              return (
                <button
                  key={v.value}
                  onClick={() => onSelect(option.title, v.value)}
                  className={cn(
                    "h-10 px-4 rounded-lg border text-sm font-medium transition-colors",
                    isSelected
                      ? "bg-[var(--foreground)] text-white border-[var(--foreground)]"
                      : "bg-white border-[var(--border)] hover:border-[var(--foreground)]"
                  )}
                >
                  {v.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
