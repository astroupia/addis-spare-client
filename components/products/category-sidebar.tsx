"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface CategorySidebarProps {
  categories: {
    id: string
    name: string
    count: number
  }[]
  makes: {
    id: string
    name: string
  }[]
  models: {
    id: string
    name: string
    makeId: string
  }[]
  years: {
    id: string
    year: number
  }[]
}

export default function CategorySidebar({ categories, makes, models, years }: CategorySidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"
  const currentMake = searchParams.get("make") || "all"
  const currentModel = searchParams.get("model") || "all"
  const currentYear = searchParams.get("year") || "all"

  const [isCategoryOpen, setCategoryOpen] = useState(true)
  const [isVehicleOpen, setVehicleOpen] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter models based on selected make
  const filteredModels = currentMake !== "all" ? models.filter((model) => model.makeId === currentMake) : []

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams)

    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    router.push(`/?${params.toString()}`)
  }

  const handleMakeChange = (makeId: string) => {
    const params = new URLSearchParams(searchParams)

    if (makeId === "all") {
      params.delete("make")
      params.delete("model") // Reset model when make is reset
    } else {
      params.set("make", makeId)
      params.delete("model") // Reset model when make changes
    }

    router.push(`/?${params.toString()}`)
  }

  const handleModelChange = (modelId: string) => {
    const params = new URLSearchParams(searchParams)

    if (modelId === "all") {
      params.delete("model")
    } else {
      params.set("model", modelId)
    }

    router.push(`/?${params.toString()}`)
  }

  const handleYearChange = (yearId: string) => {
    const params = new URLSearchParams(searchParams)

    if (yearId === "all") {
      params.delete("year")
    } else {
      params.set("year", yearId)
    }

    router.push(`/?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/")
  }

  // Count active filters
  const activeFilterCount = [
    currentCategory !== "all",
    currentMake !== "all",
    currentModel !== "all",
    currentYear !== "all",
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Mobile filter button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full flex justify-between items-center"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </span>
          {isMobileFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className={cn("flex flex-wrap gap-2", isMobileFilterOpen ? "block" : "hidden md:flex")}>
          {currentCategory !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              {categories.find((c) => c.id === currentCategory)?.name}
              <button onClick={() => handleCategoryChange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentMake !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              {makes.find((m) => m.id === currentMake)?.name}
              <button onClick={() => handleMakeChange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentModel !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              {models.find((m) => m.id === currentModel)?.name}
              <button onClick={() => handleModelChange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentYear !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              {years.find((y) => y.id === currentYear)?.year}
              <button onClick={() => handleYearChange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilterCount > 1 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 text-xs">
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Sidebar content - hidden on mobile unless expanded */}
      <div className={cn("space-y-4", isMobileFilterOpen ? "block" : "hidden md:block")}>
        {/* Vehicle selector */}
        <div className="bg-card rounded-lg border border-border p-4">
          <Collapsible open={isVehicleOpen} onOpenChange={setVehicleOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between font-medium">
              Select Vehicle
              {isVehicleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-3">
              {/* Make selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Make</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => handleMakeChange("all")}
                    className={cn(
                      "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                      currentMake === "all" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                    )}
                  >
                    All Makes
                  </button>
                  {makes.map((make) => (
                    <button
                      key={make.id}
                      onClick={() => handleMakeChange(make.id)}
                      className={cn(
                        "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                        currentMake === make.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                      )}
                    >
                      {make.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model selection - only show if make is selected */}
              {currentMake !== "all" && (
                <div className="space-y-2">
                  <label className="text-xs font-medium">Model</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => handleModelChange("all")}
                      className={cn(
                        "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                        currentModel === "all" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                      )}
                    >
                      All Models
                    </button>
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelChange(model.id)}
                        className={cn(
                          "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                          currentModel === model.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                        )}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Year selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Year</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => handleYearChange("all")}
                    className={cn(
                      "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                      currentYear === "all" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                    )}
                  >
                    All Years
                  </button>
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => handleYearChange(year.id)}
                      className={cn(
                        "flex items-center justify-center px-2 py-1.5 text-xs rounded-md",
                        currentYear === year.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                      )}
                    >
                      {year.year}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator className="my-4" />

        {/* Part categories */}
        <div className="bg-card rounded-lg border border-border p-4">
          <Collapsible open={isCategoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between font-medium">
              Part Categories
              {isCategoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-1">
              {/* All categories option */}
              <button
                onClick={() => handleCategoryChange("all")}
                className={cn(
                  "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md",
                  currentCategory === "all" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                )}
              >
                <span>All Parts</span>
                {currentCategory === "all" && <Check className="h-4 w-4" />}
              </button>

              {/* Category list */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md",
                    currentCategory === category.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                  )}
                >
                  <span>{category.name}</span>
                  <span className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">({category.count})</span>
                    {currentCategory === category.id && <Check className="h-4 w-4" />}
                  </span>
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator className="my-4" />

        {/* Price filter could go here */}
        {/* Availability filter could go here */}
        {/* Brand filter could go here */}
      </div>
    </div>
  )
}
