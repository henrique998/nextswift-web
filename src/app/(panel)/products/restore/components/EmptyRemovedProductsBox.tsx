import { PackageX } from 'lucide-react'

export function EmptyRemovedProductsBox() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-20">
      <PackageX className="h-16 w-16 stroke-gray-300 stroke-1 lg:h-32 lg:w-32" />

      <h1 className="w-64 text-center text-xl font-medium text-gray-300 lg:w-full lg:text-3xl">
        Você não removeu nenhum produto do catálogo
      </h1>

      <p className="mt-2 w-72 text-center font-medium text-gray-300 lg:w-full">
        Os produtos removidos aparecerão aqui e você poderá recuperá-los quando
        quiser
      </p>
    </div>
  )
}
