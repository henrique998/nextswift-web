'use client'

import { Button } from '@/components/Button'
import { api } from '@/libs/api'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { Tag } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface DeleteCategoryModalProps {
  categoryId: string
  children: ReactNode
}

export function DeleteCategoryModal({
  categoryId,
  children,
}: DeleteCategoryModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const token = Cookies.get('token')

  async function handleDeleteCategory() {
    try {
      setIsLoading(true)

      await api.delete(`/categories/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay fixed inset-0 z-40" />

        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 px-4 py-6"
          asChild
        >
          <motion.div
            initial={{ scale: 0, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="flex justify-center">
              <Tag className="h-10 w-10 stroke-white/60" />
            </div>

            <Dialog.Title className="pt-5 text-center font-semibold text-white">
              Deletar categoria
            </Dialog.Title>

            <Dialog.Description className="py-5 text-sm text-white/60">
              Por favor confirme que você realmente deseja deletar esta
              categoria. esta ação é irreversível. você têm certeza?
            </Dialog.Description>

            <div className="flex justify-center gap-3">
              <Dialog.Close asChild>
                <Button color="zinc-800" className="h-12 ">
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button
                onClick={handleDeleteCategory}
                isLoading={isLoading}
                className="h-12"
              >
                Confirmar
              </Button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
