import { XCircle } from 'lucide-react'
import Image from 'next/image'

interface ImagePreviewProps {
  url: string
  name: string
  onRemove: () => void
}

export function ImagePreview({ url, name, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative w-24">
      <button
        type="button"
        onClick={onRemove}
        className="absolute -right-2 -top-2"
      >
        <XCircle className="h-5 w-5 fill-red-500 stroke-white transition-colors hover:fill-red-700" />
      </button>

      <Image
        src={url}
        alt="preview image"
        width={372}
        height={228}
        className="h-16 w-full rounded-lg object-cover"
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
