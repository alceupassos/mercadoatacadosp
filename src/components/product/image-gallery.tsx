"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
  const next = () => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-2xl bg-[var(--muted)] overflow-hidden group">
        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={`${title} - imagem ${current + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
            <ZoomIn className="w-16 h-16 opacity-30" />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors",
                i === current ? "border-[var(--primary)]" : "border-transparent hover:border-gray-300"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
