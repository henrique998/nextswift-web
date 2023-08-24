import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { ProductForm } from '../components/ProductForm'

interface UpdateProductProps {
  params: {
    id: string
  }
}

export type Product = {
  id: string
  name: string
  excerpt: string
  description: string
  width: number
  height: number
  quantity: number
  price: number
  weight: number
  images: {
    id: string
    url: string
  }[]
  categories: {
    id: string
    name: string
  }[]
}

export default async function Update({ params }: UpdateProductProps) {
  const token = cookies().get('token')?.value

  const res = await api.get<Product[]>(`/products/get-by-id/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center px-4 py-4 lg:mx-auto lg:max-w-[1126px] lg:p-0">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Atualize um produto
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <ProductForm
          product={{ ...res.data[0], price: res.data[0].price / 100 }}
        />
      </div>
    </div>
  )
}
