import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { RestoreContent } from './components/RestoreContent'

export type RemovedProductData = {
  id: string
  name: string
  width: number
  height: number
  weight: number
  price: string
  quantity: number
  images: {
    id: string
    url: string
  }[]
  removedAt: Date
}

export default async function Restore() {
  const token = cookies().get('token')?.value

  const response = await api.get<RemovedProductData[]>('/products/removed', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const total = Number(response.headers['x-total-count'])
  const products = response.data.map((product) => {
    return {
      id: product.id,
      name: product.name,
      image: product.images[0]?.url,
      width: product.width,
      height: product.height,
      weight: product.weight,
      quantity: product.quantity,
      price: product.price,
      removedAt: product.removedAt,
    }
  })

  console.log(products)

  return (
    <div className="flex h-full w-full flex-col items-center px-4 lg:mx-auto lg:max-w-[1126px] lg:px-4">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Resgate produtos removidos
      </h1>

      <RestoreContent productsData={products} totalCount={total} />
    </div>
  )
}
