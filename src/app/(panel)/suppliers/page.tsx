import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { SuppliersContent } from './components/SuppliersContent'

export type SupplierData = {
  id: string
  name: string
  email: string
  cpf: string | null
  cnpj: string | null
  ddd: number
  phone: number
  createdAt: Date
  updatedAt: string
}

export default async function Suppliers() {
  const token = cookies().get('token')?.value

  const res = await api.get<SupplierData[]>('/suppliers/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const total = Number(res.headers['x-total-count'])

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900 max-[414px]:text-center">
        Visualize todos os fornecedores
      </h1>

      <SuppliersContent suppliersData={res.data} totalCount={total} />
    </div>
  )
}
