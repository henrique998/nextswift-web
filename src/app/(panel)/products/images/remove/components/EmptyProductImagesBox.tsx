import { PackageX } from 'lucide-react'

export function EmptyProductImageBox() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <PackageX className="h-16 w-16 stroke-gray-300 stroke-1 lg:h-32 lg:w-32" />

      <h1 className="text-xl font-medium text-gray-300 lg:text-3xl">
        Nenhum produto selecionado
      </h1>

      <p className="mt-2 font-medium text-gray-300">
        Selecione um produto para ver e/ou deletar suas imagens
      </p>
    </div>
  )
}
