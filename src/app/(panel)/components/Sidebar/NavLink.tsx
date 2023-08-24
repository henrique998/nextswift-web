import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  path: string
  isActive?: boolean
  children: ReactNode
}

export function NavLink({ path, isActive = false, children }: NavLinkProps) {
  return (
    <li
      className={`flex h-10 w-10 items-center justify-center rounded-md ${
        isActive && ' bg-purple-700'
      }`}
    >
      <Link href={path} className="h-6 w-6">
        {children}
      </Link>
    </li>
  )
}
