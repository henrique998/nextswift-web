'use client'

import { api } from '@/libs/api'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Pagnination } from '../../components/Pagnination'
import { QuantitySelect } from '../../components/QuantitySelect'
import { Tooltip } from '../../components/Tooltip'
import { Td } from '../../components/table/Td'
import { Th } from '../../components/table/Th'
import { quantityOptions } from '../../products/restore/data'
import { CustomerData } from '../page'
import { DeleteCustomerModal } from './DeleCustomerModal'
import { EmptyCustomersBox } from './EmptyCustomersBox'

type Customer = {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  createdAt: Date
  updatedAt: string
}

interface CustomersContentProps {
  customersData: Customer[]
  totalCount: number
}

export function CustomersContent({
  customersData,
  totalCount,
}: CustomersContentProps) {
  const [quantity, setQuantity] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [totalCustomers, setTotalCustomers] = useState(totalCount)
  const [customers, setCustomers] = useState(customersData)

  const params = useSearchParams()

  const page = params.get('page') ?? '0'
  const currentPage = Number(page)

  const isCustomerSelected = (customerId: string) =>
    selectedCustomers.some((customer) => customer === customerId)

  function toggleSelectCustomer(customerId: string) {
    if (isCustomerSelected(customerId)) {
      setSelectedCustomers(
        selectedCustomers.filter((customer) => customer !== customerId),
      )
    } else {
      setSelectedCustomers((value) => [...value, customerId])
    }
  }

  const token = Cookies.get('token')

  useEffect(() => {
    async function loadCustomers() {
      const res = await api.get<CustomerData[]>('/customers/search', {
        params: {
          page: currentPage,
          limit: quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTotalCustomers(Number(res.headers['x-total-count']))
      setCustomers(res.data)
    }

    if (quantity || currentPage > 1) {
      loadCustomers()
    }
  }, [currentPage, quantity, token])

  if (customersData.length === 0) {
    return <EmptyCustomersBox />
  }

  return (
    <div className="mt-10 flex flex-col gap-4 px-4 lg:px-0">
      <div className="w-fit max-[414px]:mr-auto max-[414px]:px-4 lg:ml-auto">
        <QuantitySelect
          options={quantityOptions}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      <div className="scrollbar max-[414px]:max-w-[400px] max-[414px]:overflow-scroll max-[414px]:px-4">
        <table className="w-[1024px] table-fixed border-spacing-1">
          <thead>
            <tr className="border-b border-gray-200">
              <th></th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>CPF</Th>
              <Th>Número</Th>
              <Th>Adicionado</Th>
              <Th>Atualizado</Th>
              <th></th>
            </tr>
          </thead>

          <tbody className="before-tbody">
            {customers?.map((customer) => (
              <tr key={customer.id} className="h-14 border-b border-gray-200">
                <td>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={isCustomerSelected(customer.id)}
                      onChange={() => toggleSelectCustomer(customer.id)}
                    />
                  </div>
                </td>
                <Td>
                  <Tooltip content={customer.name} side="top">
                    <span className="block w-24 truncate">{customer.name}</span>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip content={customer.email} side="top">
                    <span className="block w-24 truncate">
                      {customer.email}
                    </span>
                  </Tooltip>
                </Td>
                <Td>{customer.cpf}</Td>
                <Td>{customer.phone}</Td>
                <Td>{dayjs(customer.createdAt).format('DD/MM/YYYY')}</Td>
                <Td>
                  {customer.updatedAt
                    ? dayjs(customer.updatedAt).format('DD/MM/YYYY')
                    : 'Não atualizado'}
                </Td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    {isCustomerSelected(customer.id) && (
                      <>
                        <Link
                          href={`/customers/update/${customer.id}`}
                          className="rounded-full p-2 transition-all hover:bg-gray-200"
                        >
                          <Edit3 className="h-5 w-5 stroke-purple-700" />
                        </Link>

                        <DeleteCustomerModal customerId={customer.id}>
                          <button className="rounded-full p-2 transition-all hover:bg-gray-200">
                            <Trash2 className="h-5 w-5 stroke-purple-700" />
                          </button>
                        </DeleteCustomerModal>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-4">
        <Pagnination
          totalCount={totalCustomers}
          currentPage={currentPage}
          baseUrl="/customers?page"
        />
      </div>
    </div>
  )
}
