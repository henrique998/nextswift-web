'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Category } from '../../add/components/ProductForm'
import { Editor } from '../../components/Editor'
import { TagInput } from '../../components/TagInput'
import { Product } from '../[id]/page'

interface ProductFormProps {
  product: Product
}

const updateProductFormValidationSchema = zod.object({
  name: zod.string().optional(),
  excerpt: zod.string().optional(),
  description: zod.string().optional(),
  width: zod.string().optional(),
  height: zod.string().optional(),
  weight: zod.string().optional(),
  price: zod.string().optional(),
  quantity: zod.string().optional(),
})

type UpdateProductFormData = zod.infer<typeof updateProductFormValidationSchema>

type ResponseCategory = {
  id: string
  name: string
}

export function ProductForm({ product }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>(
    product?.categories?.map((category) => {
      return {
        value: category.id,
        label: category.name,
      }
    }),
  )
  const [categoryContent, setCategoryContent] = useState('')
  const [fecthedCategories, setFecthedCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, control } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductFormValidationSchema),
    defaultValues: {
      name: product.name,
      excerpt: product.excerpt,
      description: product.description,
      width: String(product.width),
      height: String(product.height),
      weight: String(product.weight),
      price: String(product.price).replace('.', ','),
      quantity: String(product.quantity),
    },
  })

  function handleSelectCategory(category: Category) {
    setCategories((state) => [...state, category])
    setCategoryContent('')
  }

  const token = Cookies.get('token')

  async function handleUpdateProduct({
    name,
    excerpt,
    description,
    width,
    height,
    weight,
    price,
    quantity,
  }: UpdateProductFormData) {
    const categoriesIds = categories.map((category) => category.value)

    try {
      setIsLoading(true)

      await api.put(
        `/products/update/${product.id}`,
        {
          name,
          excerpt,
          description,
          width,
          height,
          weight,
          price,
          quantity,
          categories: categoriesIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      window.location.reload()
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function handleSearchCategories() {
      const res = await api.get<ResponseCategory[]>('/categories/search', {
        params: {
          name: categoryContent,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const categoriesData = res.data.map((category) => {
        return {
          value: category.id,
          label: category.name,
        }
      })

      setFecthedCategories(categoriesData)
    }

    if (categoryContent !== '') {
      handleSearchCategories()
    }
  }, [categoryContent, token])

  return (
    <Form.Root
      className="mt-10 flex w-full flex-col gap-5"
      onSubmit={handleSubmit(handleUpdateProduct)}
    >
      <Input
        type="text"
        label="Nome"
        placeholder="Camiseta branca, Sapato preto, etc..."
        {...register('name')}
      />

      <Textarea
        id="excerpt"
        label="Resumo"
        placeholder="Resumo do meu produto..."
        {...register('excerpt')}
      />

      <div>
        <label className="mb-1 text-sm font-medium text-zinc-900">
          Descrição
        </label>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Editor content={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Input
          type="number"
          label="Largura (cm)"
          placeholder="180"
          {...register('width')}
        />

        <Input
          type="number"
          label="Altura (cm)"
          placeholder="362"
          {...register('height')}
        />

        <Input
          type="number"
          label="Peso (g)"
          placeholder="55"
          {...register('weight')}
        />

        <Input label="Preço (R$)" placeholder="72,90" {...register('price')} />

        <Input
          type="number"
          label="Quantidade"
          placeholder="55"
          {...register('quantity')}
        />
      </div>

      <div className="relative">
        <h3 className="text-sm font-medium text-zinc-900">Categorias</h3>

        {categoryContent !== '' && fecthedCategories.length > 0 && (
          <ul className="absolute bottom-12 w-full divide-y divide-gray-200 rounded-md border-2 border-gray-200 bg-white">
            {fecthedCategories.map((category) => (
              <li key={category.value}>
                <button
                  onClick={() => handleSelectCategory(category)}
                  type="button"
                  className="flex h-10 w-full items-center p-2 text-left transition-colors hover:bg-gray-50 focus:outline-none"
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        <TagInput
          selectedCategories={categories}
          onChange={setCategories}
          categoryContent={categoryContent}
          onCategoryContentChange={setCategoryContent}
        />
      </div>

      <Button isLoading={isLoading} className="ml-auto w-[120px]">
        Atualizar
      </Button>
    </Form.Root>
  )
}
