import { CalendarDays } from 'lucide-react'

interface TriggerProps {
  date: string
}

export function Trigger({ date }: TriggerProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-md bg-gray-50 p-2 transition-all hover:brightness-95"
    >
      <CalendarDays className="hidden h-6 w-6 stroke-gray-300 md:block" />{' '}
      <span className="text-sm font-medium text-gray-300">{date}</span>
    </button>
  )
}
