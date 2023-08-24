'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Checkbox } from '../../components/Checkbox'
import { Tooltip } from '../../components/Tooltip'
import { Td } from '../../components/table/Td'
import { Th } from '../../components/table/Th'
import { CategoryData } from '../page'
import { DeleteCategoryModal } from './DeleteCategoryModal'

dayjs.locale(ptBr)

const categoriesFormValidationSchema = zod.object({
  name: zod.string(),
})

type CategoriesFormData = zod.infer<typeof categoriesFormValidationSchema>

interface CategoriesContentProps {
  categories: CategoryData[]
}

export function CategoriesContent({ categories }: CategoriesContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const { register, handleSubmit } = useForm<CategoriesFormData>({
    resolver: zodResolver(categoriesFormValidationSchema),
  })

  const token = cookies.get('token')

  async function handleCreateCategory({ name }: CategoriesFormData) {
    try {
      setIsLoading(true)

      await api.post(
        '/categories',
        {
          name,
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
    } finally {
      setIsLoading(false)
    }
  }

  const isCategorySelected = (categoryId: string) => {
    return selectedCategories.some((category) => category === categoryId)
  }

  function toggleCategory(categoryId: string) {
    if (isCategorySelected(categoryId)) {
      setSelectedCategories((v) =>
        v.filter((category) => category !== categoryId),
      )
    } else {
      setSelectedCategories((v) => [...v, categoryId])
    }
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">
          Crie uma nova categoria
        </h2>

        <Form.Root
          className="mt-10"
          onSubmit={handleSubmit(handleCreateCategory)}
        >
          <Input
            label="Nome da categoria"
            placeholder="camisetas, sapatos..."
            {...register('name')}
          />

          <div className="ml-auto mt-6 w-[120px]">
            <Button isLoading={isLoading}>Criar</Button>
          </div>
        </Form.Root>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Gerencie todas as categorias
        </h2>

        <div className="scrollbar max-[414px]:overflow-scroll">
          <table className="mt-10 w-[520px] table-fixed border-spacing-1 lg:w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th></th>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Produtos</Th>
                <Th>Criada em</Th>
                <th></th>
              </tr>
            </thead>

            <tbody className="before-tbody">
              {categories?.map((category) => (
                <tr
                  key={category?.id}
                  className="h-14 border-b border-gray-200"
                >
                  <td>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={isCategorySelected(category.id)}
                        onChange={() => toggleCategory(category.id)}
                      />
                    </div>
                  </td>
                  <Td>
                    <Tooltip content={category?.id} side="top">
                      <span className="block w-28 truncate">
                        {category?.id}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip content={category?.name} side="top">
                      <span className="block w-28 truncate">
                        {category?.name}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td>{category?.products}</Td>
                  <Td>{dayjs(category?.createdAt).format('DD/MM/YYYY')}</Td>
                  <td>
                    {isCategorySelected(category.id) && (
                      <DeleteCategoryModal categoryId={category.id}>
                        <button className="rounded-full p-2 transition-all hover:bg-gray-200">
                          <Trash2 className="h-5 w-5 stroke-purple-700" />
                        </button>
                      </DeleteCategoryModal>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
