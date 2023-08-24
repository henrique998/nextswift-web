import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { ItemOption } from '../../components/Select'
import { EmployeesForm } from './components/EmployeesForm'

export type RoleData = {
  id: string
  name: string
}

export default async function Add() {
  const token = cookies().get('token')?.value

  const res = await api.get<RoleData[]>('/roles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const roles = res.data.map<ItemOption>((role) => {
    return {
      value: role.id,
      label: role.name,
    }
  })

  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Adicione um novo funcionário
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <EmployeesForm rolesData={roles} />
      </div>
    </div>
  )
}
