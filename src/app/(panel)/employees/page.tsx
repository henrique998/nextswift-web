import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { EmployeesContent } from './components/EmployeesContent'

export type EmployeeData = {
  id: string
  name: string
  email: string
  cpf: string
  ddd: number
  phone: number
  createdAt: Date
  updatedAt: Date | null
}

export default async function Employees() {
  const token = cookies().get('token')?.value

  const res = await api.get<EmployeeData[]>('/employees', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const total = Number(res.headers['x-total-count'])

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900 max-[414px]:text-center">
        Visualize todos os funcionários
      </h1>

      <EmployeesContent employeesData={res.data} totalCount={total} />
    </div>
  )
}
