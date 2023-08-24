/* eslint-disable react/display-name */

import * as Form from '@radix-ui/react-form'
import { AlertCircle, Eye, EyeOffIcon } from 'lucide-react'
import {
  HTMLInputTypeAttribute,
  ReactElement,
  ReactSVG,
  forwardRef,
  useState,
} from 'react'

interface PasswordInputProps extends Form.FormFieldProps {
  label: string
  type?: HTMLInputTypeAttribute
  error: string
  prefixIcon?: ReactElement<ReactSVG>
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, placeholder, prefixIcon, ...rest }, ref) => {
    const [isShowing, setIsShowing] = useState(false)

    return (
      <Form.Field {...rest} ref={ref}>
        <Form.Label className="text-sm font-medium text-zinc-900">
          {label}
        </Form.Label>

        <div className="flex flex-col gap-2">
          <div className="relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-md border-2 border-gray-200 outline-none transition-colors focus-within:border-purple-700">
            <div className="flex h-full w-full items-center gap-2">
              <div className="absolute left-3">{prefixIcon}</div>
              <Form.Control
                className="h-full flex-1 pl-11 pr-3 outline-none placeholder:text-sm"
                type={isShowing ? 'text' : 'password'}
                placeholder={placeholder}
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setIsShowing(!isShowing)}
              className="absolute right-3"
            >
              {isShowing ? (
                <EyeOffIcon className="h-6 w-6 stroke-gray-300" />
              ) : (
                <Eye className="h-6 w-6 stroke-gray-300" />
              )}
            </button>
          </div>

          <Form.Message
            match="valueMissing"
            className="flex items-center gap-2 text-xs font-medium text-red-500"
          >
            <AlertCircle className="h-4 w-4" /> {error}
          </Form.Message>
        </div>
      </Form.Field>
    )
  },
)
