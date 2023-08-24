'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ItemOption } from '../Select'
import { SelectItem } from './SelectItem'

interface QuantitySelectProps {
  options: ItemOption[]
  value: string
  onChange: (value: string) => void
}

export function QuantitySelect({
  options,
  value,
  onChange,
}: QuantitySelectProps) {
  const selectedOption = options?.find((opt) => opt.value === value)

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex w-32 items-center justify-center rounded-md border border-gray-200 p-2 text-xs font-semibold text-purple-700 focus:outline-none">
        <Select.Value>
          {value ? selectedOption?.label : 'Quantidade'}
        </Select.Value>
        <Select.Icon>
          <ChevronDown className="h-5 w-5" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="mt-2 w-32 overflow-hidden rounded-md border-l border-r border-t border-gray-200 bg-white focus:outline-none"
        >
          <Select.Viewport>
            <Select.Group>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
