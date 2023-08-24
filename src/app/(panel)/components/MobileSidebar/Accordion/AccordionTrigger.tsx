import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

interface AccordionTriggerProps {
  isActive?: boolean
  children: ReactNode
}

export function AccordionTrigger({
  isActive = false,
  children,
}: AccordionTriggerProps) {
  return (
    <Accordion.Header>
      <Accordion.Trigger
        className={`group flex h-10 w-full items-center justify-between rounded-md px-2 ${
          isActive && 'bg-gray-200'
        }`}
      >
        {children}
        <ChevronDown className="h-6 w-6 stroke-gray-300 group-data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
  )
}
