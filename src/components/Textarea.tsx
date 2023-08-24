/* eslint-disable react/display-name */
import { AlertCircle } from 'lucide-react'
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-zinc-900">
          {label}
        </label>

        <textarea
          {...rest}
          id={id}
          ref={ref}
          className="h-28 resize-none rounded-md border-2 border-gray-200 p-3 outline-none transition-colors placeholder:text-sm focus:border-purple-700"
        />

        {error && (
          <span className="flex items-center gap-2 text-xs font-medium text-red-500">
            <AlertCircle className="h-4 w-4" /> {error}
          </span>
        )}
      </div>
    )
  },
)
