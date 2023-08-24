import { UserX } from 'lucide-react'

export function EmptyCustomersBox() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-20">
      <UserX className="h-32 w-32 stroke-gray-300 stroke-1" />

      <h1 className="text-3xl font-medium text-gray-300">
        Lista de clientes vázia
      </h1>

      <p className="mt-2 font-medium text-gray-300">
        Quando houverem clientes cadastrados eles aparecerão aqui
      </p>
    </div>
  )
}
