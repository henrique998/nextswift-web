'use client'

import { Checkbox } from '@/app/(panel)/components/Checkbox'
import { ItemOption, Select } from '@/app/(panel)/components/Select'
import { Tooltip } from '@/app/(panel)/components/Tooltip'
import { Td } from '@/app/(panel)/components/table/Td'
import { Th } from '@/app/(panel)/components/table/Th'
import { api } from '@/libs/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DeleteButtonModal } from './DeleteButton'
import { EmptyProductImageBox } from './EmptyProductImagesBox'

dayjs.locale(ptBr)

interface ProductImagesContentProps {
  selectOptions: ItemOption[]
}

type ProductImage = {
  id: string
  url: string
  name: string
  size: string
  createdAt: string
}

export function ProductImagesContent({
  selectOptions,
}: ProductImagesContentProps) {
  const [selectedProductImgs, setSelectedProductImgs] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function handleToggleSelectImage(imageId: string) {
    const imageAlreadySelected = selectedProductImgs.some(
      (productImgId) => productImgId === imageId,
    )

    if (imageAlreadySelected) {
      setSelectedProductImgs(
        selectedProductImgs.filter((productImgId) => productImgId !== imageId),
      )
    } else {
      setSelectedProductImgs((state) => [...state, imageId])
    }
  }

  const token = Cookies.get('token')

  async function handleDeleteImages() {
    try {
      setIsLoading(true)

      await api.patch(
        `/products/${selectedProduct}/images/remove`,
        { imagesIds: JSON.stringify(selectedProductImgs) },
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

  useEffect(() => {
    async function fetchProductImages() {
      if (selectedProduct) {
        const res = await api.get<ProductImage[]>(
          `/products/${selectedProduct}/images/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setProductImages(res.data)
      }
    }

    fetchProductImages()
  }, [selectedProduct, token])

  return (
    <div className="flex w-full flex-col gap-5">
      <Select
        placeholder="Selecione um produto"
        options={selectOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
      />

      <div>
        {productImages.length > 0 ? (
          <table className="mt-10 w-full table-fixed border-spacing-1">
            <thead>
              <tr className="border-b border-gray-200">
                <th></th>
                <Th>Imagem</Th>
                <Th>Nome</Th>
                <Th>Tamanho</Th>
                <Th>Adicionada em</Th>
                <th>
                  {selectedProductImgs.length > 0 && (
                    <DeleteButtonModal
                      onDelete={handleDeleteImages}
                      isLoading={isLoading}
                    >
                      <button className="rounded-full p-2 transition-all hover:bg-gray-200">
                        <Trash2 className="h-5 w-5 stroke-purple-700" />
                      </button>
                    </DeleteButtonModal>
                  )}
                </th>
              </tr>
            </thead>

            <tbody className="before-tbody">
              {productImages.map((productImg) => (
                <tr key={productImg.id} className="border-b border-gray-200">
                  <td>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedProductImgs.some(
                          (productImgId) => productImgId === productImg.id,
                        )}
                        onChange={() => handleToggleSelectImage(productImg.id)}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="py-2">
                      <Image
                        src={productImg.url}
                        alt=""
                        width={120}
                        height={120}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </div>
                  </td>

                  <Td>
                    <Tooltip content={productImg.name} side="top">
                      <span className="block w-24 truncate">
                        {productImg.name}
                      </span>
                    </Tooltip>
                  </Td>

                  <Td>{productImg.size}</Td>

                  <Td>{dayjs(productImg.createdAt).format('DD/MM/YYYY')}</Td>

                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyProductImageBox />
        )}
      </div>
    </div>
  )
}
