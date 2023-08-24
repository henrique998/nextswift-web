'use client'

import { motion } from 'framer-motion'

import { Spinner } from '@/components/Spinner'
import { api } from '@/libs/api'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Pagnination } from '../components/Pagnination'
import { AddProductLink } from './components/AddProductLink'
import { CategoriesSlider } from './components/CategoriesSlider'
import { Divider } from './components/Divider'
import { EmptyProductsBox } from './components/EmptyProductsBox'
import { ProductCard } from './components/ProductCard'
import { SearchProductsForm } from './components/SearchProductsForm'
import { CategoryData, ProductData } from './page'

interface ProductsContentProps {
  productsData: ProductData[]
  categories: CategoryData[]
  totalProductsCount: number
}

export function ProductsContent({
  productsData,
  categories,
  totalProductsCount,
}: ProductsContentProps) {
  const [products, setProducts] = useState<ProductData[]>(productsData)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [totalCount, setTotalCount] = useState(totalProductsCount)
  const [isFetchingData, setIsFetchingData] = useState(false)

  const token = Cookies.get('token')

  const params = useSearchParams()

  const page = params.get('page')
  const currentPage = Number(page ?? 1)

  useEffect(() => {
    async function getPaginatedProducts() {
      if (currentPage) {
        setIsFetchingData(true)

        const response = await api.get<ProductData[]>('/products/get-many', {
          params: {
            page: currentPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setIsFetchingData(false)

        setTotalCount(Number(response.headers['x-total-count']))
        setProducts(response.data)
      }
    }

    getPaginatedProducts()
  }, [currentPage, token])

  useEffect(() => {
    async function getProductsByCategory() {
      try {
        const response = await api.get<ProductData[]>(
          '/products/get-many-by-category',
          {
            params: {
              page: currentPage,
              categoryId: selectedCategory,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setTotalCount(Number(response.headers['x-total-count']))
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (selectedCategory) {
      getProductsByCategory()
    }
  }, [currentPage, selectedCategory, token])

  async function getAllProducts() {
    const response = await api.get<ProductData[]>('/products/get-many', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setSelectedCategory('')
    setProducts(response.data)
  }

  return (
    <>
      <div className="border-b border-b-gray-200 py-4">
        <div className="mx-auto flex h-full w-full max-w-[1126px] items-center">
          <SearchProductsForm onSearchProducts={setProducts} />
        </div>
      </div>

      <div className="mx-auto mb-6 mt-2 max-w-[1126px] px-6 lg:px-0">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <CategoriesSlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onGetAllProducts={getAllProducts}
          />

          <Divider />

          <AddProductLink path="/products/add" />
        </div>

        {products.length > 0 ? (
          <>
            <ul className="mt-10 flex flex-col items-center gap-4 md:grid md:grid-cols-3 lg:mx-auto lg:flex lg:max-w-6xl lg:flex-row lg:flex-wrap">
              {products.map((product, index) => (
                <motion.li
                  key={product.id}
                  initial={{
                    opacity: 0,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.3 }}
                >
                  <ProductCard
                    product={{ ...product, image: product.images[0] }}
                    onDeleteProduct={() =>
                      setProducts((state) =>
                        state.filter((data) => data.id !== product.id),
                      )
                    }
                  />
                </motion.li>
              ))}
            </ul>

            <div className="mx-auto mt-4 w-fit max-w-xs">
              <Pagnination
                totalCount={totalCount}
                perPage={10}
                currentPage={currentPage === 0 ? 1 : currentPage}
                baseUrl="/products?page"
              />
            </div>
          </>
        ) : isFetchingData ? (
          <div className="flex h-72 flex-col items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <EmptyProductsBox />
        )}
      </div>
    </>
  )
}
