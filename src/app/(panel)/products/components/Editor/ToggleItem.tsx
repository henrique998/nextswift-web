import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ToggleItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  isActive?: boolean
  onClick?: () => void
  children: ReactNode
}

export function ToggleItem({
  value,
  isActive = false,
  children,
  ...rest
}: ToggleItemProps) {
  return (
    <button
      value={value}
      type="button"
      {...rest}
      className={`rounded-md p-2 leading-none ${
        isActive ? 'bg-gray-200 text-purple-700' : 'text-gray-300'
      } ${!isActive && 'hover:bg-gray-200'}`}
    >
      {children}
    </button>
  )
}
