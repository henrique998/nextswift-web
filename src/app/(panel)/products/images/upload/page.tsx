import { ItemOption } from '@/app/(panel)/components/Select'
import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import { ProductImagesForm } from './components/ProductImagesForm'

type ProductResponse = {
  id: string
  name: string
}

export default async function ProductImagesUpload() {
  const token = cookies().get('token')?.value

  const res = await api.get<ProductResponse[]>('/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const productsOptions: ItemOption[] = res.data.map((product) => {
    return {
      value: product.id,
      label: product.name,
    }
  })

  return (
    <div className="flex h-full w-full flex-col items-center px-4 lg:mx-auto lg:max-w-[1126px] lg:px-4">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Adicione imagens a um produto
      </h1>

      <div className="mx-auto mt-10 w-full max-w-3xl">
        <ProductImagesForm selectOptions={productsOptions} />
      </div>
    </div>
  )
}
