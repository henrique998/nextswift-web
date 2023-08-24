'use client'

import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

dayjs.locale(ptBr)

interface Day {
  date: dayjs.Dayjs
  disabled: boolean
}

interface CalendarWeek {
  week: number
  days: Day[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
  comparedDate?: Date
}

export function Calendar({
  selectedDate,
  onDateSelected,
  comparedDate,
}: CalendarProps) {
  const [now, setNow] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = now.subtract(1, 'month')

    setNow(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = now.add(1, 'month')

    setNow(nextMonthDate)
  }

  const currentMonth = now.format('MMMM')
  const currentYear = now.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInCurrentMonth = Array.from({ length: now.daysInMonth() }).map(
      (_, i) => {
        return now.set('date', i + 1)
      },
    )

    const firstWeekDay = now.get('day')

    const previousRemainingMonthDays = Array.from({ length: firstWeekDay })
      .map((_, i) => {
        return now.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = now.set('date', now.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMothDays = Array.from({ length: 7 - (lastWeekDay + 1) }).map(
      (_, i) => {
        return lastDayInCurrentMonth.add(i + 1, 'day')
      },
    )

    const calendarDays = [
      ...previousRemainingMonthDays.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInCurrentMonth.map((date) => {
        return {
          date,
          disabled: comparedDate
            ? dayjs(date).isSame(comparedDate, 'day')
            : false,
        }
      }),
      ...nextMothDays.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [comparedDate, now])

  function isSameDate(date: dayjs.Dayjs): boolean {
    return dayjs(selectedDate).isSame(date, 'day')
  }

  return (
    <div className="flex w-72 flex-col rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
        <Popover.Close asChild>
          <button className="text-sm font-bold capitalize text-zinc-900">
            Cancelar
          </button>
        </Popover.Close>

        <Popover.Close>
          <button
            disabled={!selectedDate}
            className="text-sm font-bold capitalize text-purple-700 disabled:text-gray-300"
          >
            Concluído
          </button>
        </Popover.Close>
      </div>
      <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
        <button
          className="text-zinc-900 transition-colors hover:text-gray-300"
          onClick={handlePreviousMonth}
        >
          <ChevronLeft />
        </button>

        <h3 className="font-medium capitalize text-zinc-900">
          {currentMonth}, <span className="text-purple-700">{currentYear}</span>
        </h3>

        <button
          className="text-zinc-900 transition-colors hover:text-gray-300"
          onClick={handleNextMonth}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="p-4">
        <table className="w-full table-fixed border-spacing-1">
          <thead>
            <tr>
              <th className="text-base font-medium text-zinc-900">D</th>
              <th className="text-base font-medium text-zinc-900">S</th>
              <th className="text-base font-medium text-zinc-900">T</th>
              <th className="text-base font-medium text-zinc-900">Q</th>
              <th className="text-base font-medium text-zinc-900">Q</th>
              <th className="text-base font-medium text-zinc-900">S</th>
              <th className="text-base font-medium text-zinc-900">S</th>
            </tr>
          </thead>
          <tbody className="before-tbody">
            {calendarWeeks.map(({ week, days }) => (
              <tr key={week}>
                {days.map(({ date, disabled }) => (
                  <td className="box-border" key={date.toString()}>
                    <button
                      disabled={disabled}
                      className={`aspect-square w-full rounded-md text-center font-bold  ${
                        !isSameDate(date) &&
                        'text-zinc-900 hover:text-purple-700'
                      } disabled:text-gray-300 ${
                        isSameDate(date) && 'bg-purple-700 text-white'
                      } ${
                        comparedDate &&
                        dayjs(date).isSame(comparedDate, 'day') &&
                        'border-2 border-purple-700 text-white disabled:text-purple-700'
                      }`}
                      onClick={() => onDateSelected(date.toDate())}
                    >
                      {date.get('date')}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
