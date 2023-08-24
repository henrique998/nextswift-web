'use client'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ThProps {
  className?: string
  children: ReactNode
}

export function Th({ className, children }: ThProps) {
  return (
    <th
      className={twMerge(
        'text-left text-sm font-medium text-gray-300',
        className,
      )}
    >
      <div className="py-2">{children}</div>
    </th>
  )
}
