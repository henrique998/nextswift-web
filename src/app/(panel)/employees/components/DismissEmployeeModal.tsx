'use client'

import { Button } from '@/components/Button'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { Ban } from 'lucide-react'
import { ReactNode } from 'react'

interface DismissEmployeeModalProps {
  passwordValue: string
  onChangePassword: (value: string) => void
  onDelete: () => void
  isLoading: boolean
  children: ReactNode
}

export function DismissEmployeeModal({
  passwordValue,
  onChangePassword,
  onDelete,
  isLoading,
  children,
}: DismissEmployeeModalProps) {
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
              <Ban className="h-10 w-10 stroke-gray-300" />
            </div>

            <Dialog.Title className="pt-5 text-center font-semibold text-white">
              Você tem certeza de que deseja demitir este funcionário?
            </Dialog.Title>

            <Dialog.Description className="py-5 text-sm text-white/60">
              Esta ação é irreversível. Digite sua senha para confirmar esta
              ação
            </Dialog.Description>

            <div className="mb-5 flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/60"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={passwordValue}
                onChange={(e) => onChangePassword(e.target.value)}
                className="h-10 rounded-md border-2 border-zinc-700 bg-zinc-800 px-2 text-white/60 outline-none placeholder:text-sm focus:border-purple-700"
              />
            </div>

            <div className="flex justify-center gap-3">
              <Dialog.Close asChild>
                <Button type="button" className="h-12" color="zinc-800">
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button
                type="submit"
                onClick={onDelete}
                isLoading={isLoading}
                isDisabled={!passwordValue}
                className="h-12"
              >
                Deletar
              </Button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
