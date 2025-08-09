import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center">
      <Loader2 className="h-12 w-12 animate-spin text-[#670D2F]" />
    </div>
  )
}
