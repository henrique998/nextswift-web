'use client'

import * as PrimitiveCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (value: boolean) => void
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <PrimitiveCheckbox.Root
      checked={checked}
      onCheckedChange={onChange}
      className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 transition-all data-[state=checked]:border-purple-700 data-[state=checked]:bg-purple-700"
    >
      <PrimitiveCheckbox.Indicator>
        <Check className="h-4 w-4 stroke-white" />
      </PrimitiveCheckbox.Indicator>
    </PrimitiveCheckbox.Root>
  )
}
