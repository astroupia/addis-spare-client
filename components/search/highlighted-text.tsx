import type { HighlightedText } from "@/types/search"
import { cn } from "@/lib/utils"

interface HighlightedTextProps {
  segments: HighlightedText[]
  className?: string
}

export function HighlightedTextDisplay({ segments, className }: HighlightedTextProps) {
  return (
    <span className={className}>
      {segments.map((segment, index) => (
        <span
          key={index}
          className={cn(segment.highlighted && "bg-[#670D2F]/20 text-[#670D2F] font-medium px-1 rounded")}
        >
          {segment.text}
        </span>
      ))}
    </span>
  )
}
