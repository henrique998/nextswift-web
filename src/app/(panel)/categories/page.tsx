import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { CategoriesContent } from './components/CategoriesContent'

export type CategoryData = {
  id: string
  name: string
  products: number
  createdAt: Date
}

export default async function Categories() {
  const token = cookies().get('token')?.value

  const res = await api.get<CategoryData[]>('/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="h-full w-full p-4 lg:mx-auto lg:max-w-[768px]">
      <CategoriesContent categories={res.data} />
    </div>
  )
}
