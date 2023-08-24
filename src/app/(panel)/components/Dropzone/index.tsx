import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImagePreview } from './ImagePreview'

type PreviewImage = {
  file: File
  url: string
}

interface DropzoneProps {
  label: string
  id?: string
  images: File[]
  onChange: (files: File[]) => void
  showPreview?: boolean
}

export function Dropzone({
  label,
  id,
  images,
  onChange,
  showPreview = true,
}: DropzoneProps) {
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])

  const onDrop = useCallback(
    (files: File[]) => {
      onChange(files)
    },
    [onChange],
  )

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
    setPreviewImages(previewImages.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      },
      onDrop,
    })

  useEffect(() => {
    const imagesUrls = images.map((image) => {
      return {
        file: image,
        url: URL.createObjectURL(image),
      }
    })

    setPreviewImages((state) => [...state, ...imagesUrls])
  }, [images])

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={`h-60 w-full cursor-pointer rounded-lg border-2 border-dashed ${
          isDragAccept ? 'border-purple-700 bg-purple-700/5' : 'border-gray-200'
        } ${isDragReject ? 'border-red-500 bg-red-500/5' : 'border-gray-200'}`}
      >
        <input {...getInputProps()} id={id} />

        <div className="flex h-full flex-col items-center justify-center lg:flex-row">
          <Image
            src="/upload-1.svg"
            alt=""
            width={600}
            height={600}
            className="h-40 w-40 object-cover lg:h-48 lg:w-48"
          />

          {isDragAccept && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-sm font-medium text-zinc-900">
                Solte suas imagens aqui
              </h3>

              <p className="text-xs text-purple-700">Imagens permitidas</p>
            </div>
          )}

          {isDragReject && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-sm font-medium text-zinc-900">
                Arquivo(s) inválido(s)
              </h3>

              <p className="text-xs text-purple-700">
                Extensões permitidas: .png, .jpg, .jpeg
              </p>
            </div>
          )}

          {!isDragAccept && !isDragReject && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-sm font-medium text-zinc-900">
                {label}, ou{' '}
                <span className="font-semibold text-purple-700">Procure</span>
              </h3>

              <p className="text-xs text-gray-300">
                Tamanho máximo permitido: 5mb
              </p>
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <div className="grid grid-cols-7 items-center gap-4">
          {previewImages.map((preview, index) => (
            <ImagePreview
              key={index}
              url={preview.url}
              name={preview.file.name}
              onRemove={() => removeImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
