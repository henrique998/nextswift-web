import { Plus } from 'lucide-react'
import Link from 'next/link'

interface AddProductLinkProps {
  path: string
}

export function AddProductLink({ path }: AddProductLinkProps) {
  return (
    <Link
      href={path}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 px-2 transition-shadow hover:shadow-badge-shadow"
    >
      <Plus className="h-6 w-6 stroke-white" />
    </Link>
  )
}
