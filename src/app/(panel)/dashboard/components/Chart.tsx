'use client'

import { api } from '@/libs/api'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { Datepicker } from '../../products/components/Datepicker'
import { EmptyMetricsBox } from './EmptyMetricsBox'

interface SalesMetricsData {
  dates: Date[]
  products: string[]
  quantities: number[]
}

export function Chart() {
  const [dates, setDates] = useState<Date[]>([])
  const [quantities, setQuantities] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(() => dayjs().toDate())

  const token = Cookies.get('token')

  useEffect(() => {
    async function loadSalesMetrics() {
      const res = await api.get<SalesMetricsData>('/metrics/sales', {
        params: {
          searchDate: selectedDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setDates(res.data.dates)
      setQuantities(res.data.quantities)
    }

    if (selectedDate) {
      loadSalesMetrics()
    }
  }, [token, selectedDate])

  return (
    <div className="relative mt-6 h-[60vh] w-full px-1 lg:px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900 lg:text-2xl">
          Vendas do mês
        </h1>

        <Datepicker
          label="Selecione uma data"
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />
      </div>

      {quantities?.length > 0 ? (
        <div className="mx-auto w-full max-w-5xl">
          <ApexChart
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
                zoom: {
                  enabled: false,
                },
              },
              xaxis: {
                type: 'datetime',
                axisTicks: {
                  color: '#7913fc',
                },
                categories: dates,
              },
              fill: {
                colors: ['#7913fc'],
              },
              stroke: {
                colors: ['#7913fc'],
              },
            }}
            series={[{ name: 'quantidade', data: quantities }]}
            type="area"
            height={300}
          />
        </div>
      ) : (
        <EmptyMetricsBox />
      )}
    </div>
  )
}
