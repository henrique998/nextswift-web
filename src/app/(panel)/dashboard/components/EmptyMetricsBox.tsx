import { ShoppingBag } from 'lucide-react'

export function EmptyMetricsBox() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 stroke-gray-300 stroke-1 lg:h-32 lg:w-32" />

      <h1 className="text-center text-xl font-medium text-gray-300 lg:text-start lg:text-3xl">
        Não existem vendas nesse período
      </h1>

      <p className="mt-2 text-center font-medium text-gray-300 lg:text-start">
        Selecione um período e visualize quantas vendas ocorreram
      </p>
    </div>
  )
}
