import { XCircle } from 'lucide-react'
import Image from 'next/image'

interface FilePreviewProps {
  name: string
  onRemove: () => void
}

export function FilePreview({ name, onRemove }: FilePreviewProps) {
  return (
    <div className="relative w-36">
      <button
        type="button"
        onClick={onRemove}
        className="absolute -right-2 -top-2"
      >
        <XCircle className="h-5 w-5 fill-red-500 stroke-white transition-colors hover:fill-red-700" />
      </button>

      <Image
        src="/excel-icon.svg"
        alt="preview image"
        width={372}
        height={228}
        className="h-20 w-full rounded-lg border border-gray-200 object-cover"
      />

      <span
        title={name}
        className="mt-2 block truncate text-xs font-medium text-gray-300"
      >
        {name}
      </span>
    </div>
  )
}
