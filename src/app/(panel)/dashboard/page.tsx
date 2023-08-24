import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { Chart } from './components/Chart'
import { Slider } from './components/Slider'

export interface Metrics {
  productsCount: number
  purchasesCount: number
  customersCount: number
  employeesCount: number
  categoriesCount: number
  suppliersCount: number
}

export default async function Dashboard() {
  const token = cookies().get('token')?.value

  const res = await api.get<Metrics>('/metrics/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="px-4 pt-4 lg:px-0">
      <div className="lg:pl-4">
        <Slider metrics={res.data} />
      </div>

      <Chart />
    </div>
  )
}
