import * as Select from '@radix-ui/react-select'
import { SelectItem } from '../../components/Select/SelectItem'

interface TagDropdownProps {
  options: {
    value: string
    label: string
  }[]
  onChange: (value: string) => void
  open?: boolean
}

export function TagSelect({
  options,
  onChange,
  open = false,
}: TagDropdownProps) {
  return (
    <Select.Root open={open}>
      <Select.Portal>
        <Select.Content
          asChild
          position="popper"
          className={`mt-2 overflow-hidden rounded-md border border-gray-200 bg-white focus:outline-none max-[414px]:w-[360px]`}
        >
          <Select.Viewport>
            <Select.Group className="divide-y divide-gray-200">
              {options.map((option) => (
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
