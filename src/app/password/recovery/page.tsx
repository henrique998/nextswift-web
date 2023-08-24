import Image from 'next/image'
import { PasswordRecoveryForm } from './PasswordRecoveryForm'

export default function PasswordRecovery() {
  return (
    <main className="block min-h-screen grid-cols-2 lg:grid">
      <div className="p-4">
        <div className="flex justify-center lg:block">
          <Image src="/complete-logo.svg" alt="" width={180} height={36} />
        </div>

        <div className="mx-auto mt-36 max-w-md">
          <h1 className="mb-6 text-3xl font-medium">
            Esqueceu sua{' '}
            <span className="font-bold text-purple-700">senha?</span> insira seu
            email para recupera-la
          </h1>

          <PasswordRecoveryForm />
        </div>
      </div>

      <div className="brand-gradient hidden items-center justify-center lg:flex">
        <Image src="/Logo.svg" alt="" width={90} height={84} />
      </div>
    </main>
  )
}
