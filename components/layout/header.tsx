"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const [is_menu_open, setIsMenuOpen] = useState<boolean>(false)
  const [is_scrolled, setIsScrolled] = useState<boolean>(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const is_dark = theme === "dark"

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        is_scrolled
          ? is_dark
            ? "bg-[#0C0C0C]/95 backdrop-blur-sm shadow-md"
            : "bg-white/95 backdrop-blur-sm shadow-md"
          : is_dark
            ? "bg-[#0C0C0C]"
            : "bg-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#670D2F]">Addis</span>
            <span className="text-2xl font-medium">Spare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#670D2F]",
                pathname === "/" ? "text-[#670D2F]" : is_dark ? "text-white" : "text-gray-700",
              )}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#670D2F]",
                pathname === "/products" || pathname.startsWith("/product/")
                  ? "text-[#670D2F]"
                  : is_dark
                    ? "text-white"
                    : "text-gray-700",
              )}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#670D2F]",
                pathname === "/categories" ? "text-[#670D2F]" : is_dark ? "text-white" : "text-gray-700",
              )}
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#670D2F]",
                pathname === "/contact" ? "text-[#670D2F]" : is_dark ? "text-white" : "text-gray-700",
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Search, Cart, User, Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
             
            </div>

            <button
              className={cn("p-2 rounded-full transition-colors", is_dark ? "hover:bg-gray-800" : "hover:bg-gray-100")}
              onClick={() => setTheme(is_dark ? "light" : "dark")}
              aria-label={is_dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {is_dark ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>

            <Link
              href="/cart"
              className={cn(
                "p-2 rounded-full relative transition-colors",
                is_dark ? "hover:bg-gray-800" : "hover:bg-gray-100",
              )}
              aria-label="Shopping cart"
            >
              <ShoppingCart className={cn("h-5 w-5", is_dark ? "text-gray-300" : "text-gray-700")} />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#670D2F] text-white text-xs flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              href="/account"
              className={cn("p-2 rounded-full transition-colors", is_dark ? "hover:bg-gray-800" : "hover:bg-gray-100")}
              aria-label="User account"
            >
              <User className={cn("h-5 w-5", is_dark ? "text-gray-300" : "text-gray-700")} />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md"
              onClick={() => setIsMenuOpen(!is_menu_open)}
              aria-label={is_menu_open ? "Close menu" : "Open menu"}
            >
              {is_menu_open ? (
                <X className={cn("h-6 w-6", is_dark ? "text-white" : "text-gray-900")} />
              ) : (
                <Menu className={cn("h-6 w-6", is_dark ? "text-white" : "text-gray-900")} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Always visible below header on mobile */}
        <div className="md:hidden py-3">
     
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {is_menu_open && (
        <div className={cn("md:hidden fixed inset-0 z-50 pt-16", is_dark ? "bg-[#0C0C0C]" : "bg-white")}>
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className={cn(
                "py-3 px-4 text-lg font-medium rounded-md transition-colors",
                pathname === "/"
                  ? "bg-[#670D2F]/10 text-[#670D2F]"
                  : is_dark
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-900 hover:bg-gray-100",
              )}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={cn(
                "py-3 px-4 text-lg font-medium rounded-md transition-colors",
                pathname === "/products" || pathname.startsWith("/product/")
                  ? "bg-[#670D2F]/10 text-[#670D2F]"
                  : is_dark
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-900 hover:bg-gray-100",
              )}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={cn(
                "py-3 px-4 text-lg font-medium rounded-md transition-colors",
                pathname === "/categories"
                  ? "bg-[#670D2F]/10 text-[#670D2F]"
                  : is_dark
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-900 hover:bg-gray-100",
              )}
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className={cn(
                "py-3 px-4 text-lg font-medium rounded-md transition-colors",
                pathname === "/contact"
                  ? "bg-[#670D2F]/10 text-[#670D2F]"
                  : is_dark
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-900 hover:bg-gray-100",
              )}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
