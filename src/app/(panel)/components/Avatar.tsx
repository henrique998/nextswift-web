'use client'

import * as PrimitiveAvatar from '@radix-ui/react-avatar'
import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'lg' | 'sm'
}

export function Avatar({ src, alt, size = 'sm' }: AvatarProps) {
  return (
    <PrimitiveAvatar.Root
      className={`flex ${
        size === 'lg' ? 'h-[100px] w-[100px]' : 'h-10 w-10'
      } items-center justify-center rounded-full`}
    >
      <PrimitiveAvatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />

      <PrimitiveAvatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
        <User
          className={`${
            size === 'lg' ? 'h-[50px] w-[50px]' : 'h-6 w-6'
          } stroke-gray-500`}
        />
      </PrimitiveAvatar.Fallback>
    </PrimitiveAvatar.Root>
  )
}
