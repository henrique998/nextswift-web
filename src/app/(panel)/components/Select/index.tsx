import * as PrimitveSelect from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { SelectItem } from './SelectItem'

export type ItemOption = {
  value: string
  label: string
}

interface SelectProps {
  placeholder?: string
  size?: 'sm' | 'lg'
  options: ItemOption[]
  value: string
  onChange: (value: string) => void
}

export function Select({
  placeholder,
  size = 'lg',
  options,
  value,
  onChange,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <PrimitveSelect.Root value={value} onValueChange={onChange}>
      <PrimitveSelect.Trigger
        className={`${
          size === 'sm' ? 'w-[258px]' : 'w-full'
        } flex items-center justify-between rounded-md border border-gray-200 p-2 text-sm font-medium text-gray-900 focus:outline-none`}
      >
        <PrimitveSelect.Value>
          {value ? selectedOption?.label : placeholder}
        </PrimitveSelect.Value>
        <PrimitveSelect.Icon>
          <ChevronDown className="h-5 w-5 stroke-purple-700" />
        </PrimitveSelect.Icon>
      </PrimitveSelect.Trigger>

      <PrimitveSelect.Portal>
        <PrimitveSelect.Content
          asChild
          position="popper"
          className={`mt-2 bg-white ${
            size === 'sm' ? 'w-[258px]' : 'w-[768px]'
          } overflow-hidden rounded-md border border-gray-200 bg-white focus:outline-none max-[414px]:w-[360px]`}
        >
          <PrimitveSelect.Viewport>
            <PrimitveSelect.Group className="divide-y divide-gray-200">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </PrimitveSelect.Group>
          </PrimitveSelect.Viewport>
        </PrimitveSelect.Content>
      </PrimitveSelect.Portal>
    </PrimitveSelect.Root>
  )
}
