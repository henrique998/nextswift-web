'use client'

import { api } from '@/libs/api'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import Download from 'js-file-download'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Pagnination } from '../../components/Pagnination'
import { QuantitySelect } from '../../components/QuantitySelect'
import { Tooltip } from '../../components/Tooltip'
import { Td } from '../../components/table/Td'
import { Th } from '../../components/table/Th'
import { Datepicker } from '../../products/components/Datepicker'
import { quantityOptions } from '../../products/restore/data'
import { EmptySalesBox } from './EmptySalesBox'

type Sale = {
  id: string
  total: string
  product: string
  quantity: string
  paymentMethod: string
  customer: string
}

export function SalesContent() {
  const [sales, setSales] = useState<Sale[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const [quantity, setQuantity] = useState('')
  const [startDate, setStartDate] = useState<Date>(() => {
    return dayjs().set('date', 1).toDate()
  })

  const [endDate, setEndDate] = useState<Date>(() => {
    return dayjs().endOf('month').toDate()
  })

  const params = useSearchParams()

  const page = params.get('page') ?? '1'
  const currentPage = Number(page)

  const token = Cookies.get('token')

  useEffect(() => {
    async function loadSales() {
      const res = await api.get<Sale[]>('/purchases/search', {
        params: {
          startDate,
          endDate,
          page: currentPage,
          limit: quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTotalCount(Number(res.headers['x-total-count']))
      setSales(res.data)
    }

    if (quantity && (startDate || endDate)) {
      loadSales()
    }
  }, [currentPage, endDate, quantity, startDate, token])

  async function handleGenerateReport(fileType: string) {
    try {
      const res = await api.get(`/purchases/report/${fileType}`, {
        params: {
          startDate,
          endDate,
          page: currentPage > 1 ? page : '0',
          limit: quantity,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const filename = res.headers['x-filename']

      Download(res.data, filename)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 max-[414px]:max-w-[400px] max-[414px]:px-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-4">
          <Datepicker
            selectedDate={startDate}
            comparedDate={endDate}
            onDateSelected={setStartDate}
            label="Data de Início:"
          />

          <Datepicker
            selectedDate={endDate}
            comparedDate={startDate}
            onDateSelected={setEndDate}
            label="Data de Término:"
          />
        </div>

        <div>
          <QuantitySelect
            options={quantityOptions}
            value={quantity}
            onChange={setQuantity}
          />
        </div>
      </div>

      {sales.length === 0 ? (
        <EmptySalesBox hasQuantitySelected={!!quantity} />
      ) : (
        <>
          <div className="scrollbar mt-10 max-[414px]:max-w-[400px] max-[414px]:overflow-scroll max-[414px]:px-4">
            <table className="w-[1024px] table-fixed border-spacing-1">
              <thead>
                <tr className="border-b border-gray-200">
                  <Th>Total</Th>
                  <Th>Produto</Th>
                  <Th>Quantidade</Th>
                  <Th>Método de pagamento</Th>
                  <Th>Cliente</Th>
                  <th className="flex items-center gap-2">
                    <Tooltip content="Fazer download em excel" side="bottom">
                      <button
                        onClick={() => handleGenerateReport('excel')}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 hover:brightness-90"
                      >
                        <Image
                          src="/excel-icon.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </button>
                    </Tooltip>

                    <Tooltip content="Fazer download em pdf" side="bottom">
                      <button
                        onClick={() => handleGenerateReport('pdf')}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 hover:brightness-90"
                      >
                        <Image
                          src="/pdf-icon.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      </button>
                    </Tooltip>
                  </th>
                </tr>
              </thead>

              <tbody className="before-tbody">
                {sales?.map((sale) => (
                  <tr key={sale.id} className="h-14 border-b border-gray-200">
                    <Td>
                      <Tooltip content={sale.total} side="top">
                        <span className="block w-24 truncate">
                          {sale.total}
                        </span>
                      </Tooltip>
                    </Td>
                    <Td>
                      <Tooltip content={sale.product} side="top">
                        <span className="block w-32 truncate">
                          {sale.product}
                        </span>
                      </Tooltip>
                    </Td>
                    <Td>{sale.quantity}</Td>
                    <Td>{sale.paymentMethod}</Td>
                    <Td>{sale.customer}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-4">
            <Pagnination
              totalCount={totalCount}
              currentPage={currentPage}
              baseUrl="/sales?page"
            />
          </div>
        </>
      )}
    </>
  )
}
