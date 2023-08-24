'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Dropzone } from '../../../components/Dropzone'
import { Editor } from '../../components/Editor'
import { TagInput } from '../../components/TagInput'

const addProductFormValidationSchema = zod.object({
  name: zod.string().min(5),
  excerpt: zod
    .string()
    .min(5, 'O campo é obrigatório e deve possuir pelo menos 5 letras!'),
  description: zod.string().min(1, { message: 'Campo obrigatório' }),
  width: zod.string().min(2, 'O campo é obrigatório'),
  height: zod.string().min(2, 'O campo é obrigatório'),
  weight: zod.string().min(2, 'O campo é obrigatório'),
  price: zod.string().min(2, 'O campo é obrigatório'),
  quantity: zod.string().min(2, 'O campo é obrigatório'),
})

type AddProductFormData = zod.infer<typeof addProductFormValidationSchema>

type ResponseCategory = {
  id: string
  name: string
}

export type Category = {
  value: string
  label: string
}

export function ProductForm() {
  const [images, setImages] = useState<File[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [fecthedCategories, setFecthedCategories] = useState<Category[]>([])
  const [categoryContent, setCategoryContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const token = cookies.get('token')

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

  const { register, handleSubmit, control, formState } =
    useForm<AddProductFormData>({
      resolver: zodResolver(addProductFormValidationSchema),
    })

  function handleSelectCategory(category: Category) {
    setCategories((state) => [...state, category])
    setCategoryContent('')
  }

  async function handleAddProduct({
    name,
    excerpt,
    description,
    width,
    height,
    weight,
    price,
    quantity,
  }: AddProductFormData) {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('excerpt', excerpt)
    formData.append('description', description)
    formData.append('width', width)
    formData.append('height', height)
    formData.append('weight', weight)
    formData.append('price', price)
    formData.append('quantity', quantity)

    const categoriesIds = categories.map((category) => category.value)
    formData.append('categories', JSON.stringify(categoriesIds))

    images.forEach((image) => formData.append('image', image))

    try {
      setIsLoading(true)

      await api.post('/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      window.location.reload()
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(handleAddProduct)}
      className="mt-10 flex h-full w-full flex-col gap-5"
    >
      <Input
        type="text"
        label="Nome"
        placeholder="Camiseta branca, Sapato preto, etc..."
        errors={[
          {
            match: 'valueMissing',
            msg: 'Você deve fornecer um nome de pelo menos 5 letras!',
          },
        ]}
        {...register('name')}
      />

      <Textarea
        label="Resumo"
        id="excerpt"
        placeholder="Resumo do meu produto..."
        error={formState.errors.excerpt && 'Você DE'}
        {...register('excerpt')}
      />

      <div>
        <label className="mb-1 text-sm font-medium text-zinc-900">
          Descrição
        </label>

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Editor
              onChange={(value) => field.onChange(value!!)}
              error={fieldState.error && 'Você deve fornecer uma descrição!'}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Input
          type="number"
          label="Largura (cm)"
          placeholder="180"
          errors={[
            {
              match: 'valueMissing',
              msg: 'Você deve fornecer uma largura!',
            },
          ]}
          {...register('width')}
        />

        <Input
          type="number"
          label="Altura (cm)"
          placeholder="362"
          errors={[
            {
              match: 'valueMissing',
              msg: 'Você deve fornecer uma altura!',
            },
          ]}
          {...register('height')}
        />

        <Input
          type="number"
          label="Peso (g)"
          placeholder="55"
          errors={[
            {
              match: 'valueMissing',
              msg: 'Você deve fornecer um peso!',
            },
          ]}
          {...register('weight')}
        />

        <Input
          label="Preço (R$)"
          placeholder="72,90"
          errors={[
            {
              match: 'valueMissing',
              msg: 'Você deve fornecer um preço!',
            },
          ]}
          {...register('price')}
        />

        <Input
          type="number"
          label="Quantidade"
          placeholder="55"
          errors={[
            {
              match: 'valueMissing',
              msg: 'Você deve fornecer uma quantidade!',
            },
          ]}
          {...register('quantity')}
        />
      </div>

      <div>
        <label
          htmlFor="images"
          className="mb-1 text-sm font-medium text-zinc-900"
        >
          Imagens
        </label>

        <Dropzone
          id="images"
          label="Arraste e solte suas imagens aqui"
          images={images}
          onChange={setImages}
        />
      </div>

      <div className="relative">
        <h3 className="text-sm font-medium text-zinc-900">
          Categorias <span className="text-gray-300">(opcional)</span>
        </h3>

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

      <Button type="submit" className="ml-auto w-[120px]" isLoading={isLoading}>
        Adicionar
      </Button>
    </Form.Root>
  )
}
