import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isDisabled?: boolean
  color?: 'purple-700' | 'zinc-600' | 'zinc-800' | 'zinc-900'
}

export function Button({
  isLoading = false,
  isDisabled = false,
  color = 'purple-700',
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        `flex h-10 w-full min-w-[100px] items-center justify-center rounded-md px-5 bg-${color} font-semibold text-white transition-all ${
          isDisabled && 'cursor-default opacity-75'
        } ${!isLoading && !isDisabled && 'hover:brightness-75'} ${
          isLoading && 'cursor-default opacity-75'
        }`,
        className,
      )}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner color={color === 'zinc-900' ? 'dark' : 'purple'} />
      ) : (
        children
      )}
    </button>
  )
}
