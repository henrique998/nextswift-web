'use client'

import { Button } from '@/components/Button'
import { api } from '@/libs/api'
import Cookies from 'js-cookie'
import { FormEvent, useState } from 'react'
import { ExcelDropzone } from './ExcelDropzone'

export function ProductForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('products-file', file)

    const token = Cookies.get('token')

    try {
      setIsLoading(true)

      await api.post('/products/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setFile(null)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mt-10 flex w-full flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-1 text-sm font-medium text-zinc-900"
          htmlFor="excel-file"
        >
          Arquivo
        </label>
        <ExcelDropzone file={file} onChange={setFile} />
      </div>

      <Button type="submit" isLoading={isLoading} className="ml-auto w-[120px]">
        Cadastrar
      </Button>
    </form>
  )
}
