import { ProductForm } from './components/ProductForm'

export default function Import() {
  return (
    <div className="flex h-full flex-col items-center p-4 py-4 lg:mx-auto lg:w-full lg:max-w-[1126px] lg:p-0">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Adicione produtos via excel
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <ProductForm />
      </div>
    </div>
  )
}
