'use client'

import { Button } from '@/components/Button'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import { ReactNode } from 'react'

interface DeleteButtonProps {
  onDelete: () => void
  isLoading: boolean
  children: ReactNode
}

export function DeleteButtonModal({
  onDelete,
  isLoading,
  children,
}: DeleteButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay fixed inset-0 z-40" />

        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 w-80 rounded-lg bg-zinc-900 px-4 py-6"
          asChild
        >
          <motion.div
            initial={{ scale: 0, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="flex justify-center">
              <ImageOff className="h-10 w-10 stroke-gray-300" />
            </div>

            <Dialog.Title className="pt-5 text-center font-semibold text-white">
              Você tem certeza de que deseja fazer isso?
            </Dialog.Title>

            <Dialog.Description className="py-5 text-sm text-white/60">
              Esta ação é irreversível. você terá de adicionar outras imagens ao
              seu produto mais tarde
            </Dialog.Description>

            <div className="flex justify-center gap-3">
              <Dialog.Close asChild>
                <Button className="h-12" color="zinc-800">
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button onClick={onDelete} isLoading={isLoading} className="h-12">
                Deletar
              </Button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
