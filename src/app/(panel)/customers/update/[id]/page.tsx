import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { CustomersForm } from '../components/CustomersForm'

interface UpdateProps {
  params: {
    id: string
  }
}

export default async function Update({ params }: UpdateProps) {
  const token = cookies().get('token')?.value

  const res = await api.get(`/customers/get-by-id/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Atualize um cliente
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <CustomersForm customer={res.data} />
      </div>
    </div>
  )
}
