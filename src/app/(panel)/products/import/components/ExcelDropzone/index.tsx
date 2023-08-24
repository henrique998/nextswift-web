import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FilePreview } from './FilePreview'

interface ExcelDropzoneProps {
  file: File | null
  onChange: (files: File | null) => void
}

export function ExcelDropzone({ file, onChange }: ExcelDropzoneProps) {
  const onDrop = useCallback(
    (files: File[]) => {
      onChange(files[0])
    },
    [onChange],
  )

  function removeImage() {
    onChange(null)
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        acceptedFileTypes: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/csv',
        ],
      },
      onDrop,
    })

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={`h-60 w-full cursor-pointer rounded-lg border-2 border-dashed ${
          isDragAccept ? 'border-purple-700 bg-purple-700/5' : 'border-gray-200'
        } ${isDragReject ? 'border-red-500 bg-red-500/5' : 'border-gray-200'}`}
      >
        <input {...getInputProps()} id="excel-file" />

        <div className="flex h-full flex-col items-center justify-center lg:flex-row">
          <Image
            src="/upload-2.svg"
            alt=""
            width={600}
            height={600}
            className="h-40 w-40 object-cover lg:h-48 lg:w-48"
          />

          {isDragAccept && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-sm font-medium text-zinc-900">
                Solte seu arquivo aqui
              </h3>

              <p className="text-xs text-purple-700">Arquivo permitido</p>
            </div>
          )}

          {isDragReject && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-sm font-medium text-zinc-900">
                Arquivo inválido
              </h3>

              <p className="text-xs text-purple-700">
                Extensões permitidas: .xlsx, .csv
              </p>
            </div>
          )}

          {!isDragAccept && !isDragReject && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-sm font-medium text-zinc-900">
                Arraste e solte seu arquivo, ou{' '}
                <span className="font-semibold text-purple-700">Procure</span>
              </h3>

              <p className="text-xs text-gray-300">
                Tamanho máximo permitido: 5mb
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 items-center gap-4">
        {file && <FilePreview name={file.name} onRemove={removeImage} />}
      </div>
    </div>
  )
}
