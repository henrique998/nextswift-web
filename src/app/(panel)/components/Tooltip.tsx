import * as PrimitiveTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TooltipProps {
  content: string
  side?: 'left' | 'top' | 'right' | 'bottom'
  children: ReactNode
}

export function Tooltip({ content, side = 'right', children }: TooltipProps) {
  return (
    <PrimitiveTooltip.Provider>
      <PrimitiveTooltip.Root>
        <PrimitiveTooltip.Trigger asChild>{children}</PrimitiveTooltip.Trigger>

        <PrimitiveTooltip.Portal>
          <PrimitiveTooltip.Content
            className={`z-40 ${side === 'left' && 'mr-[10px]'} ${
              side === 'top' && 'mb-[10px]'
            } ${side === 'right' && 'ml-[10px]'} ${
              side === 'bottom' && 'mt-[10px]'
            } rounded-md bg-purple-700 p-2 text-xs font-medium text-white`}
            side={side}
            asChild
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0,
              }}
              transition={{ type: 'spring', duration: 0.25 }}
            >
              {content}
            </motion.div>
          </PrimitiveTooltip.Content>
        </PrimitiveTooltip.Portal>
      </PrimitiveTooltip.Root>
    </PrimitiveTooltip.Provider>
  )
}
