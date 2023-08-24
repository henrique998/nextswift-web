import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { SuppliersForm } from './components/SuppliersForm'

interface UpdateProps {
  params: {
    id: string
  }
}

export type SupplierData = {
  id: string
  name: string
  email: string
  ddd: number
  phone: number
  street: string
  complement: string
  number: number
  cep: string
  uf: string
}

export default async function Update({ params }: UpdateProps) {
  const token = cookies().get('token')?.value

  const res = await api.get<SupplierData>(`/suppliers/get-by-id/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900 max-[414px]:text-center">
        Atualize um novo fornecedor
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <SuppliersForm supplierData={res.data} />
      </div>
    </div>
  )
}
