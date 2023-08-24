'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import * as Form from '@radix-ui/react-form'
import Cookies from 'js-cookie'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ItemOption, Select } from '../../../components/Select'
import { paymentsOptions } from '../data'
import { ProductsBar } from './ProductsBar'

interface SellFormProps {
  customersOptions: ItemOption[]
}

type ProductsResponse = {
  id: string
  images: {
    url: string
  }[]
  name: string
}

type ProductData = {
  id: string
  image: string
  name: string
}

export function SellForm({ customersOptions }: SellFormProps) {
  const [products, setProducts] = useState<ProductData[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productsQty, setProductsQty] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const token = Cookies.get('token')

  useEffect(() => {
    if (search) {
      api
        .get<ProductsResponse[]>('/products/search', {
          params: {
            search,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const products = res.data.map((product) => {
            return {
              id: product.id,
              image: product.images[0].url,
              name: product.name,
            }
          })

          setProducts(products)
        })
    }
  }, [search, token])

  async function handleSellProduct() {
    if (!selectedCustomer) {
      alert('Selecione um cliente por favor!')
      return
    }

    if (!selectedPaymentMethod) {
      alert('Selecione um método de pagamento por favor!')
      return
    }

    try {
      setIsLoading(true)

      await api.post(
        `/purchases/product/${selectedProduct}`,
        {
          buyerId: selectedCustomer,
          productsQty,
          paymentMethod: selectedPaymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form.Root
      onSubmit={handleSellProduct}
      className="mt-10 flex w-full flex-col gap-5 overflow-hidden px-4 lg:px-0"
    >
      <div className="w-full">
        <label className="mb-1 block font-medium text-zinc-900">Cliente</label>

        <Select
          placeholder="Escolha um cliente"
          value={selectedCustomer}
          onChange={setSelectedCustomer}
          options={customersOptions}
        />
      </div>

      <div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline">
          <Input
            label="Produto"
            name="product"
            type="search"
            placeholder="Procure um produto"
            prefixIcon={<Search className="h-5 w-5 stroke-gray-300" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            errors={[
              {
                match: 'valueMissing',
                msg: 'Selecione um produto por favor!',
              },
            ]}
            className="flex-1"
          />

          <Input
            label="Quantidade"
            name="quantity"
            type="number"
            placeholder="12"
            value={productsQty}
            errors={[
              {
                match: 'valueMissing',
                msg: 'Escolha uma quantidade maior que 0!',
              },
            ]}
            onChange={(e) => setProductsQty(e.target.value)}
          />
        </div>

        <ProductsBar products={products} onChange={setSelectedProduct} />
      </div>

      <div className="w-full">
        <label className="mb-1 block font-medium text-zinc-900">
          Método de pagamento
        </label>

        <Select
          placeholder="Selecione um método de pagamento"
          value={selectedPaymentMethod}
          onChange={setSelectedPaymentMethod}
          options={paymentsOptions}
        />
      </div>

      <div className="ml-auto w-full lg:w-[120px]">
        <Button isLoading={isLoading}>Finalizar</Button>
      </div>
    </Form.Root>
  )
}
