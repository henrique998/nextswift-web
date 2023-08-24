import { ShoppingBag } from 'lucide-react'

export function NoSalesContent() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 stroke-gray-300 stroke-1 lg:h-32 lg:w-32" />

      <h1 className="text-center text-xl font-medium text-gray-300 lg:text-start lg:text-3xl">
        Você não fez nenhuma venda até o momento
      </h1>

      <p className="mt-2 text-center font-medium text-gray-300 lg:text-start">
        Quando você fizer ao menos uma venda poderá gerar relatórios
      </p>
    </div>
  )
}
