import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  path: string
  isActive?: boolean
  children: ReactNode
}

export function NavLink({ path, isActive = false, children }: NavLinkProps) {
  return (
    <Link
      href={path}
      className={`flex h-10 w-full items-center gap-2 rounded-md px-2 ${
        isActive && ' bg-gray-200'
      }`}
    >
      {children}
    </Link>
  )
}
