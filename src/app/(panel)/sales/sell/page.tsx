import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { ItemOption } from '../../components/Select'
import { SellForm } from './components/SellForm'

type Customer = {
  id: string
  name: string
}

export default async function Sell() {
  const token = cookies().get('token')?.value

  const res = await api.get<Customer[]>('/customers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const customersOptions: ItemOption[] = res.data.map((customer) => {
    return {
      value: customer.id,
      label: customer.name,
    }
  })

  return (
    <div className="flex h-full w-full flex-col items-center py-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Venda um produto
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <SellForm customersOptions={customersOptions} />
      </div>
    </div>
  )
}
