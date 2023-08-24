import * as PrimitiveAccordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, ReactSVG } from 'react'
import { LinkData } from '../../Sidebar/data'
import { AccordionContent } from './AccordionContent'
import { AccordionItem } from './AccordionItem'
import { AccordionTrigger } from './AccordionTrigger'

interface AccordionProps {
  value: string
  icon: ReactElement<ReactSVG>
  label: string
  isActive?: boolean
  links: LinkData[]
}

export function Accordion({
  value,
  icon,
  label,
  isActive = false,
  links,
}: AccordionProps) {
  const pathName = usePathname()

  const isSamePath = (path: string) => {
    return pathName === path
  }

  return (
    <PrimitiveAccordion.Root type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger isActive={isActive}>
          <div className="flex items-center gap-2">
            {icon}

            <span
              className={`font-medium ${
                isActive ? 'text-purple-700' : 'text-gray-300'
              }`}
            >
              {label}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <ul className="mt-2 flex flex-col gap-2 pl-4">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`text-sm ${
                    isSamePath(link.path)
                      ? 'font-semibold text-zinc-900'
                      : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </PrimitiveAccordion.Root>
  )
}
