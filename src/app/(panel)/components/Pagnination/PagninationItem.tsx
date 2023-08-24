import { AnchorHTMLAttributes, ReactNode } from 'react'

interface PagninationItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function PagninationItem({ children, ...rest }: PagninationItemProps) {
  return (
    <a
      {...rest}
      className="flex h-8 w-8 items-center justify-center rounded-md font-medium transition-all hover:bg-gray-200 data-[active=true]:bg-purple-700 data-[active=true]:text-white data-[active=true]:hover:brightness-90"
    >
      {children}
    </a>
  )
}
