import * as Accordion from '@radix-ui/react-accordion'
import { ReactNode } from 'react'

interface AccordionItemProps {
  value: string
  isActive?: boolean
  children: ReactNode
}

export function AccordionItem({
  value,
  isActive = false,
  children,
}: AccordionItemProps) {
  return (
    <Accordion.Item value={value} className={`${isActive && 'bg-gray-200'}`}>
      {children}
    </Accordion.Item>
  )
}
