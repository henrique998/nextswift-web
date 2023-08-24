import { ReactElement, ReactSVG } from 'react'

interface MetricCardProps {
  icon: ReactElement<ReactSVG>
  label: string
  quantity: number
}

export function MetricCard({ icon, label, quantity }: MetricCardProps) {
  return (
    <div className="flex w-72 flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 py-6">
      <div className="flex items-center gap-3">
        {icon}{' '}
        <span className="text-lg font-semibold text-zinc-900">{label}</span>
      </div>
      <h2 className="text-4xl font-semibold text-purple-700">{quantity}</h2>
    </div>
  )
}
