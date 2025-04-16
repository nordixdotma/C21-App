"use client"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavLink({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-base font-medium py-1.5 px-1 relative group",
        isScrolled ? "text-gray-900" : "text-white",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-center after:transition-transform after:duration-300",
        "hover:after:scale-x-100",
      )}
    >
      {label}
    </Link>
  )
}

export function NavDropdown({
  label,
  items,
  isScrolled,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string
  items: { href: string; label: string }[]
  isScrolled: boolean
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  // Convert label to lowercase for use in query params
  const category = label.toLowerCase()

  return (
    <div className="relative z-50" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={cn(
          "flex items-center gap-1.5 text-base font-medium py-1.5 px-1 transition-colors duration-200",
          isScrolled ? "text-gray-900" : "text-white",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-center after:transition-transform after:duration-300",
          isActive ? "after:scale-x-100" : "hover:after:scale-x-100",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isActive ? "text-primary rotate-180" : "text-gray-500",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 pt-2 w-64 transition-all duration-200",
          isActive ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        <div className="bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden">
          <ul className="py-1">
            {items.map((item) => (
              <li key={item.href} className="hover:bg-gray-50">
                <Link
                  href={`/search?category=${category}&type=${encodeURIComponent(item.label)}`}
                  className="block px-4 py-2.5 text-sm text-gray-800 hover:text-primary transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function MobileNavSection({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-gray-900 font-medium text-base mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-gray-900 hover:text-primary py-1.5 text-base">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
