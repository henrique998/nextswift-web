import * as Select from '@radix-ui/react-select'
import { ReactNode } from 'react'

interface SelectItemProps {
  value: string
  children: ReactNode
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Select.Item
      value={value}
      className="cursor-pointer border-b border-gray-200 text-center transition-colors hover:text-purple-700 focus:outline-none"
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}
