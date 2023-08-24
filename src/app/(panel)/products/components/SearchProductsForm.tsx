'use client'

import * as Form from '@radix-ui/react-form'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { Search } from 'lucide-react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { ProductData } from '../page'
import { Datepicker } from './Datepicker'

const searchFormValidationSchema = zod.object({
  search: zod.string(),
})

type SearchFormData = zod.infer<typeof searchFormValidationSchema>

interface SearchProductsFormProps {
  onSearchProducts: (products: ProductData[]) => void
}

export function SearchProductsForm({
  onSearchProducts,
}: SearchProductsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>(() => {
    return dayjs().set('date', 1).toDate()
  })

  const [endDate, setEndDate] = useState<Date>(() => {
    return dayjs().endOf('month').toDate()
  })

  const { handleSubmit, register, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormValidationSchema),
  })

  const token = Cookies.get('token')

  async function handleSearchProducts({ search }: SearchFormData) {
    setIsLoading(true)

    const response = await api.get<ProductData[]>(
      '/products/search/get-many-by-dates',
      {
        params: {
          startDate,
          endDate,
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    onSearchProducts(response.data)

    setIsLoading(false)

    reset()
  }

  return (
    <Form.Form
      onSubmit={handleSubmit(handleSearchProducts)}
      className="flex w-full flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between md:gap-0 lg:px-0"
    >
      <div className="flex items-center justify-between gap-4 md:justify-normal">
        <Datepicker
          selectedDate={startDate}
          onDateSelected={setStartDate}
          comparedDate={endDate}
          label="Data de Início:"
        />

        <Datepicker
          selectedDate={endDate}
          onDateSelected={setEndDate}
          comparedDate={startDate}
          label="Data de Término:"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <Input
          label="Pesquise por um produto"
          type="search"
          placeholder="Camiseta branca, sapato marron...."
          prefixIcon={<Search className="h-5 w-5 stroke-gray-300" />}
          className="flex-1"
          {...register('search')}
        />

        <Button isLoading={isLoading} color="zinc-900">
          Buscar
        </Button>
      </div>
    </Form.Form>
  )
}
