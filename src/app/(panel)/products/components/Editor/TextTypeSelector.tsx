'use client'

import { HeadingsData } from './Header'
import { ToggleItem } from './ToggleItem'

interface TextTypeSelectProps {
  headingsData: HeadingsData
}

export function TextTypeSelector({ headingsData }: TextTypeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ToggleItem
        value="h1"
        isActive={headingsData.headingH1Data.isActive}
        onClick={headingsData.headingH1Data.onToggle}
      >
        H1
      </ToggleItem>
      <ToggleItem
        value="h2"
        isActive={headingsData.headingH2Data.isActive}
        onClick={headingsData.headingH2Data.onToggle}
      >
        H2
      </ToggleItem>
      <ToggleItem
        value="h3"
        isActive={headingsData.headingH3Data.isActive}
        onClick={headingsData.headingH3Data.onToggle}
      >
        H3
      </ToggleItem>
      <ToggleItem
        value="h4"
        isActive={headingsData.headingH4Data.isActive}
        onClick={headingsData.headingH4Data.onToggle}
      >
        H4
      </ToggleItem>
      <ToggleItem
        value="h5"
        isActive={headingsData.headingH5Data.isActive}
        onClick={headingsData.headingH5Data.onToggle}
      >
        H5
      </ToggleItem>
      <ToggleItem
        value="h6"
        isActive={headingsData.headingH6Data.isActive}
        onClick={headingsData.headingH6Data.onToggle}
      >
        H6
      </ToggleItem>
    </div>
  )
}

// <Select.Root>
//   <Select.Trigger className="flex w-28 items-center justify-center gap-2 rounded-md px-2 py-[6px] text-sm hover:bg-gray-200">
//     <Select.Value
//       placeholder={<Type className="h-4 w-4 stroke-zinc-900" />}
//       defaultValue="p"
//     />

//     <Select.Icon>
//       <ChevronDown className="h-4 w-4 stroke-zinc-900" />
//     </Select.Icon>
//   </Select.Trigger>

//   <Select.Portal>
//     <Select.Content
//       position="popper"
//       className="mt-2 w-28 overflow-hidden rounded-md border border-gray-200 bg-white py-2 focus:outline-none"
//     >
//       <Select.Viewport>
//         <Select.Group>
//           <SelectItem value="h1" onClick={headingsData.onToggleHeadingH1}>
//             Heading 1
//           </SelectItem>
//           <SelectItem value="h2" onClick={headingsData.onToggleHeadingH2}>
//             Heading 2
//           </SelectItem>
//           <SelectItem value="h3" onClick={headingsData.onToggleHeadingH3}>
//             Heading 3
//           </SelectItem>
//           <SelectItem value="h4" onClick={headingsData.onToggleHeadingH4}>
//             Heading 4
//           </SelectItem>
//           <SelectItem value="h5" onClick={headingsData.onToggleHeadingH5}>
//             Heading 5
//           </SelectItem>
//           <SelectItem value="h6" onClick={headingsData.onToggleHeadingH6}>
//             Heading 6
//           </SelectItem>
//           <SelectItem value="p">Paragraph</SelectItem>
//         </Select.Group>
//       </Select.Viewport>
//     </Select.Content>
//   </Select.Portal>
// </Select.Root>
