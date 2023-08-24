import * as Dialog from '@radix-ui/react-dialog'
import { Link } from 'lucide-react'

interface LinkButtonProps {
  onSetLink: (url: string) => void
}

export function LinkButton({ onSetLink }: LinkButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          value="a"
          type="button"
          //   onClick={onToggleAnchor}
          className="rounded-md p-2 leading-none text-gray-300 hover:bg-gray-200"
        >
          <Link className="h-4 w-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay fixed inset-0 z-40" />

        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 px-4 py-6">
          <div className="flex justify-center">
            <Link className="h-10 w-10 stroke-white/60" />
          </div>

          <Dialog.Title className="mt-2 text-center font-semibold text-white">
            Adicione um link
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-center text-sm text-white/60">
            A url deve começar com:{' '}
            <strong className="font-medium">https://</strong>
          </Dialog.Description>

          <div className="mt-6 grid gap-3">
            <input
              type="text"
              onChange={(e) => onSetLink(e.target.value)}
              placeholder="https://website.com"
              className="h-10 flex-1 rounded-md border-2 border-zinc-800 bg-zinc-900 px-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-purple-700 focus:outline-none"
            />

            <Dialog.Close asChild>
              <button className="h-10 w-full rounded-md bg-purple-700 px-5 font-semibold text-white transition-all hover:brightness-75">
                Finalizar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
