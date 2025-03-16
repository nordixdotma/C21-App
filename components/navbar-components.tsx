"use client"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function NavLink({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm ${isScrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-primary"} py-1.5`}
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
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={`flex items-center gap-1.5 text-sm font-medium ${
          isScrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-primary"
        } py-1.5 transition-colors duration-200`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isActive ? "text-primary rotate-180" : "text-gray-500"
          }`}
        />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-2 w-64 z-10">
          <div className="bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden">
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.href} className="hover:bg-gray-50">
                  <Link
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-800 hover:text-primary transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
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

