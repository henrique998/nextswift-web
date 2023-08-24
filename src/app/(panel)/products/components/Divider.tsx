'use client'

import * as Separator from '@radix-ui/react-separator'

export function Divider() {
  return (
    <Separator.Root
      orientation="vertical"
      className="h-10 w-[1px] bg-gray-200"
    />
  )
}
