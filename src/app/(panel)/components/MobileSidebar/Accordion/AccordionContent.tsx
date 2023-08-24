import * as Accordion from '@radix-ui/react-accordion'
import { ReactNode } from 'react'

interface AccordionContentProps {
  children: ReactNode
}

export function AccordionContent({ children }: AccordionContentProps) {
  return <Accordion.Content>{children}</Accordion.Content>
}
