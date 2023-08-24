import { Truck } from 'lucide-react'

export function EmptySuppliersContent() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Truck className="h-32 w-32 stroke-gray-300 stroke-1" />

      <h1 className="text-3xl font-medium text-gray-300">
        Lista de fornecedores vázia
      </h1>

      <p className="mt-2 font-medium text-gray-300">
        Quando houverem fornecedores cadastrados eles aparecerão aqui
      </p>
    </div>
  )
}
