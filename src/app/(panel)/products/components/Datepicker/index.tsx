'use client'

import * as Popover from '@radix-ui/react-popover'
import { motion } from 'framer-motion'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { CalendarDays } from 'lucide-react'
import { Calendar } from './Calendar'

dayjs.locale(ptBr)

interface DatepickerProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
  comparedDate?: Date
  label: string
}

export function Datepicker({
  selectedDate,
  onDateSelected,
  comparedDate,
  label,
}: DatepickerProps) {
  return (
    <Popover.Root>
      <div className="flex flex-col gap-1">
        {label && (
          <h3 className="text-sm font-medium text-zinc-900">{label}</h3>
        )}

        <Popover.Trigger asChild>
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-md bg-gray-50 p-2 transition-all hover:brightness-95"
          >
            <CalendarDays className="hidden h-6 w-6 stroke-gray-300 md:block" />

            <span className="text-sm font-medium text-gray-300">
              {dayjs(selectedDate).format('DD/MM/YYYY')}
            </span>
          </button>
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content className="mt-2" asChild>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <Calendar
              selectedDate={selectedDate}
              onDateSelected={onDateSelected}
              comparedDate={comparedDate}
            />
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
