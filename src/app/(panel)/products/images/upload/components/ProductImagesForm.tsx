'use client'

import { Dropzone } from '@/app/(panel)/components/Dropzone'
import { ItemOption, Select } from '@/app/(panel)/components/Select'
import { Button } from '@/components/Button'
import { api } from '@/libs/api'
import * as Form from '@radix-ui/react-form'
import Cookies from 'js-cookie'
import { FormEvent, useState } from 'react'

interface ProductImagesFormProps {
  selectOptions: ItemOption[]
}

export function ProductImagesForm({ selectOptions }: ProductImagesFormProps) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const token = Cookies.get('token')

  async function handleAddImages(e: FormEvent) {
    e.preventDefault()

    if (!selectedProduct || images.length === 0) {
      alert('Selecione um produto e uma ou mais imagens!')

      return
    }

    const formData = new FormData()

    images.map((image) => formData.append('image', image))

    try {
      setIsLoading(true)

      await api.post(`/products/${selectedProduct}/images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form.Root
      onSubmit={handleAddImages}
      className="flex w-full flex-col gap-5"
    >
      <Select
        placeholder="Selecione um produto"
        options={selectOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
      />

      <div>
        <label htmlFor="images" className="text-sm font-medium text-zinc-900">
          Imagens
        </label>
        <Dropzone
          id="images"
          label="Arraste e solte suas imagens aqui"
          images={images}
          onChange={setImages}
        />
      </div>

      <Button isLoading={isLoading} className="ml-auto w-fit">
        Adicionar imagens
      </Button>
    </Form.Root>
  )
}
