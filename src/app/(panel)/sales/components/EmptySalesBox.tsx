import { ShoppingBag } from 'lucide-react'
import { NoSalesContent } from './NoSalesContent'

interface EmptySalesBoxProps {
  hasQuantitySelected: boolean
}

export function EmptySalesBox({ hasQuantitySelected }: EmptySalesBoxProps) {
  if (hasQuantitySelected) {
    return <NoSalesContent />
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 stroke-gray-300 stroke-1 lg:h-32 lg:w-32" />

      <h1 className="text-xl font-medium text-gray-300 lg:text-3xl">
        Sem vendas no momento
      </h1>

      <p className="mt-2 text-center font-medium text-gray-300 lg:text-start">
        Escolha uma quantidade de vendas para gerar gerar os relatórios
      </p>
    </div>
  )
}
