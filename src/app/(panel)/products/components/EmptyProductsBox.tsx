import { PackageX, Plus } from 'lucide-react'
import Link from 'next/link'

export function EmptyProductsBox() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <PackageX className="h-32 w-32 stroke-gray-300 stroke-1" />

      <h1 className="text-3xl font-medium text-gray-300">
        Sem produtos no estoque
      </h1>

      <p className="mt-2 font-medium text-gray-300">
        Adicione um novo produto ao seu catálogo
      </p>

      <Link
        href="/products/add"
        className="mt-2 flex items-center justify-center gap-1 rounded-md bg-gray-50 py-2 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all hover:brightness-95"
      >
        <Plus className="h-6 w-6 stroke-purple-700" />
        Adicionar
      </Link>
    </div>
  )
}
