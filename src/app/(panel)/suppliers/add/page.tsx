import { SuppliersForm } from './components/SuppliersForm'

export default function Add() {
  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1126px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900 max-[414px]:text-center">
        Adicione um novo fornecedor
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <SuppliersForm />
      </div>
    </div>
  )
}
