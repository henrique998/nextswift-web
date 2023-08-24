import { Edit3 } from 'lucide-react'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'

interface InfoProps {
  productId: string
  price: string
  onDeleteProduct: () => void
}

export function Info({ productId, price, onDeleteProduct }: InfoProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className="text-sm font-medium text-gray-300">
        <strong className="text-lg text-purple-700">{price}</strong>
      </h2>

      <div className="flex items-center gap-1">
        <Link
          href={`/products/update/${productId}`}
          className="rounded-full p-2 transition-all hover:bg-gray-200"
        >
          <Edit3 className="h-5 w-5 stroke-purple-700" />
        </Link>

        <DeleteButton productId={productId} onDelete={onDeleteProduct} />
      </div>
    </div>
  )
}
