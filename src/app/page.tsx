import { SignInForm } from '@/components/SignInForm'
import Image from 'next/image'

export default function SignIn() {
  return (
    <main className="block min-h-screen grid-cols-2 lg:grid">
      <div className="brand-gradient hidden items-center justify-center lg:flex">
        <Image src="/Logo.svg" alt="" width={90} height={84} />
      </div>

      <div className="p-4">
        <div className="flex justify-center lg:block">
          <Image src="/complete-logo.svg" alt="" width={180} height={36} />
        </div>

        <div className="mx-auto mt-36 max-w-md">
          <h1 className="mb-6 text-3xl font-medium">
            Seja bem vindo ao{' '}
            <span className="font-bold text-purple-700">NextSwift</span>, entre
            para continuar.
          </h1>

          <SignInForm />
        </div>
      </div>
    </main>
  )
}
