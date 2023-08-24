import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TdProps {
  className?: string
  children: ReactNode
}

export function Td({ className, children }: TdProps) {
  return (
    <td className={twMerge('text-sm text-zinc-900', className)}>{children}</td>
  )
}
