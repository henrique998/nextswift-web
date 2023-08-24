import { Tooltip } from '@/app/(panel)/components/Tooltip'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Excerpt } from './Excerpt'
import { Info } from './Info'

interface ProductCardProps {
  product: {
    id: string
    name: string
    excerpt: string
    price: string
    quantity: number
    image?: {
      id: string
      url: string
    }
  }
  onDeleteProduct: () => void
}

export function ProductCard({ product, onDeleteProduct }: ProductCardProps) {
  return (
    <div className="relative flex h-[300px] w-64 flex-col justify-between rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-product-shadow">
      {product?.image?.url ? (
        <Image
          src={product.image.url}
          alt={`produto: ${product.name}`}
          width={800}
          height={1920}
          className="h-32 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100">
          <ImageIcon className="h-12 w-12 stroke-gray-300" />
        </div>
      )}

      <div className="absolute right-4 top-4 flex items-center justify-center rounded-2xl bg-purple-700 px-3 py-2 text-xs font-medium text-white">
        {product.quantity} pcs
      </div>

      <Tooltip content={product.name} side="top">
        <h3 className="mt-2 block w-56 truncate font-medium text-zinc-900">
          {product.name}
        </h3>
      </Tooltip>

      <Excerpt content={product.excerpt} />

      <Info
        productId={product.id}
        price={product.price}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
  )
}
