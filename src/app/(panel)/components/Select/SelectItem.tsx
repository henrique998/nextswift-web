import * as PrimitveSelect from '@radix-ui/react-select'
import { ReactNode } from 'react'

interface SelectItemProps {
  value: string
  children: ReactNode
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <PrimitveSelect.Item
      value={value}
      className={`w-full cursor-pointer p-2 transition-colors hover:text-purple-700 focus:outline-none`}
    >
      <PrimitveSelect.ItemText>{children}</PrimitveSelect.ItemText>
    </PrimitveSelect.Item>
  )
}
