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
        className={`flex items-center gap-2 text-sm ${isScrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-primary"} py-1.5`}
      >
        {label}
        <ChevronDown className={`h-3 w-3 ${isActive ? "text-primary" : "text-gray-500"}`} />
      </button>
      {isActive && (
        <ul className="absolute top-full left-0 bg-white shadow-md rounded-md mt-1 z-10">
          {items.map((item) => (
            <li key={item.href} className="p-2 hover:text-primary">
              <Link href={item.href} className="text-gray-900 hover:text-primary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
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

