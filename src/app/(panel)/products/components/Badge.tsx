import { ButtonHTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  children: ReactNode
}

export function Badge({ isActive = false, children, ...rest }: BadgeProps) {
  return (
    <button
      {...rest}
      className={`h-10 w-full select-none rounded-md px-6 text-xs font-semibold transition-all  ${
        isActive
          ? 'bg-purple-700 text-white hover:brightness-90'
          : 'border border-gray-200 text-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}
