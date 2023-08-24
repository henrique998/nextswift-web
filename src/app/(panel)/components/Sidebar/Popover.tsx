import * as PrimitivePopover from '@radix-ui/react-popover'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import { LinkData } from './data'

interface PopoverProps {
  links: LinkData[]
  children: ReactNode
}

export function Popover({ links, children }: PopoverProps) {
  const path = usePathname()

  function isActive(pathname: string) {
    return path.endsWith(pathname)
  }

  return (
    <PrimitivePopover.Root>
      <PrimitivePopover.Trigger asChild>{children}</PrimitivePopover.Trigger>

      <PrimitivePopover.Portal>
        <PrimitivePopover.Content
          side="right"
          className="z-50 ml-2 flex flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-900 p-2"
          asChild
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 0.35 }}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-medium  transition-colors hover:text-white ${
                  isActive(link.path) ? 'text-white' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </PrimitivePopover.Content>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  )
}
