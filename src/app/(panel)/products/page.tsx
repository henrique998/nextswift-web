import { cookies } from 'next/headers'

import { api } from '@/libs/api'
import { ProductsContent } from './ProductsContent'

export type ProductData = {
  id: string
  name: string
  excerpt: string
  price: string
  quantity: number
  images: {
    id: string
    url: string
  }[]
}

export type CategoryData = {
  id: string
  name: string
}

export default async function Products() {
  const token = cookies().get('token')?.value

  async function getAllProducts() {
    try {
      const response = await api.get<ProductData[]>('/products/get-many', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return {
        productsData: response.data,
        totalCount: Number(response.headers['x-total-count']),
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllCategories() {
    const response = await api.get<CategoryData[]>('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  }

  const [productsResponse, categoriesResponse] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ])

  const products = productsResponse?.productsData.map((product) => {
    return {
      ...product,
      image: product.images[0],
    }
  })

  return (
    <ProductsContent
      productsData={products ?? []}
      totalProductsCount={productsResponse?.totalCount ?? 0}
      categories={categoriesResponse}
    />
  )
}
