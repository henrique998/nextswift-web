import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { CustomersContent } from './components/CustomersContent'

export type CustomerData = {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  createdAt: Date
  updatedAt: string
}

export default async function Customers() {
  const token = cookies().get('token')?.value

  const response = await api.get<CustomerData[]>('/customers/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const total = Number(response.headers['x-total-count'])

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Visualize todos os clientes
      </h1>

      <CustomersContent customersData={response.data} totalCount={total} />
    </div>
  )
}
