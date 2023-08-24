'use client'

import { Checkbox } from '@/app/(panel)/components/Checkbox'
import { Pagnination } from '@/app/(panel)/components/Pagnination'
import { QuantitySelect } from '@/app/(panel)/components/QuantitySelect'
import { Tooltip } from '@/app/(panel)/components/Tooltip'
import { Td } from '@/app/(panel)/components/table/Td'
import { Th } from '@/app/(panel)/components/table/Th'
import { api } from '@/libs/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Cookies from 'js-cookie'
import { ImageIcon, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { quantityOptions } from '../data'
import { RemovedProductData } from '../page'
import { EmptyRemovedProductsBox } from './EmptyRemovedProductsBox'
dayjs.locale(ptBr)

type Product = {
  id: string
  name: string
  image?: string
  width: number
  height: number
  weight: number
  quantity: number
  price: string
  removedAt: Date
}

interface RestoreContentProps {
  productsData: Product[]
  totalCount: number
}

export function RestoreContent({
  productsData,
  totalCount,
}: RestoreContentProps) {
  const [products, setProducts] = useState<Product[]>(productsData)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState('')

  const params = useSearchParams()

  const page = params.get('page') ?? '1'
  const currentPage = Number(page)

  const token = Cookies.get('token')

  function selectProduct(productId: string) {
    if (selectedProduct === productId) {
      setSelectedProduct('')
    } else {
      setSelectedProduct(productId)
    }
  }

  async function handleRestoreProduct() {
    try {
      await api.patch(`/products/${selectedProduct}/restore`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      window.location.reload()
    } catch (error: any) {
      console.log(selectedProduct)
    }
  }

  useEffect(() => {
    async function getRemovedProducts() {
      const res = await api.get<RemovedProductData[]>('/products/removed', {
        params: {
          page: currentPage,
          limit: Number(quantity),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const productsData = res.data.map((product) => {
        return {
          id: product.id,
          name: product.name,
          image: product?.images[0]?.url,
          width: product.width,
          height: product.height,
          weight: product.weight,
          quantity: product.quantity,
          price: product.price,
          removedAt: product.removedAt,
        }
      })

      setProducts(productsData)
    }

    getRemovedProducts()
  }, [currentPage, quantity, token])

  if (products.length === 0) {
    return <EmptyRemovedProductsBox />
  }

  return (
    <>
      <div className="mt-10 w-fit max-[414px]:ml-4 max-[414px]:mr-auto lg:ml-auto">
        <QuantitySelect
          options={quantityOptions}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      <div className="scrollbar mt-4 max-[414px]:max-w-[400px] max-[414px]:overflow-scroll max-[414px]:px-4">
        <table className="w-[1024px] table-fixed border-spacing-1">
          <thead>
            <tr className="border-b border-gray-200">
              <th></th>
              <Th>Produto</Th>
              <Th>Imagem</Th>
              <Th>Largura</Th>
              <Th>Altura</Th>
              <Th>Peso</Th>
              <Th>Quantidade</Th>
              <Th>Preço</Th>
              <Th>Removido em</Th>
              <th></th>
            </tr>
          </thead>

          <tbody className="before-tbody">
            {products.map((product) => (
              <tr key={product?.id} className="border-b border-gray-200">
                <td className="pl-4">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      onChange={() => selectProduct(product.id)}
                      checked={selectedProduct === product.id}
                    />
                  </div>
                </td>
                <Td>
                  <Tooltip content={product?.name} side="top">
                    <span className="block w-24 truncate">{product?.name}</span>
                  </Tooltip>
                </Td>
                <td>
                  <div className="py-2">
                    {product.image ? (
                      <Image
                        src={product?.image}
                        alt=""
                        width={120}
                        height={120}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <ImageIcon className="h-5 w-5 stroke-gray-300" />
                      </div>
                    )}
                  </div>
                </td>
                <Td>{product?.width} cm</Td>
                <Td>{product?.height} cm</Td>
                <Td>{product?.weight} g</Td>
                <Td>{product?.quantity} units</Td>
                <Td>{product?.price}</Td>
                <Td>{dayjs(product?.removedAt).format('DD/MM/YYYY')}</Td>
                <td className="pr-4">
                  {selectedProduct === product.id && (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleRestoreProduct}
                        className="rounded-full p-2 transition-all hover:bg-gray-200"
                      >
                        <RotateCcw className="h-5 w-5 stroke-purple-700" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-4 w-fit max-w-xs">
        <Pagnination
          totalCount={totalCount}
          currentPage={currentPage}
          baseUrl="/products/restore?page"
        />
      </div>
    </>
  )
}
