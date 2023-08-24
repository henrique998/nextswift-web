import { SalesContent } from './components/SalesContent'

export default function Sales() {
  return (
    <div className="flex h-full w-full flex-col items-center p-4 lg:mx-auto lg:max-w-[1024px]">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900 max-[414px]:text-center">
        Visualize o relatório de vendas
      </h1>

      <div className="mt-10 flex w-full flex-col gap-4">
        <SalesContent />
      </div>
    </div>
  )
}
