import { cookies } from 'next/headers'
import Link from 'next/link'
import { Avatar } from './Avatar'

type Employee = {
  name: string
  avatar: string
  role: string
}

export function Header() {
  const employee = JSON.parse(
    cookies().get('employee')?.value ?? '',
  ) as Employee

  return (
    <header className="sticky left-0 right-0 top-0 z-20 hidden h-16 items-center justify-between border-b border-b-gray-200 px-20 lg:flex">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">
          Seja bem vindo,{' '}
          <span className="text-purple-700">{employee.name}!</span>
        </h2>

        <span className="text-sm text-gray-300">
          Encontre tudo o que precisa aqui{' '}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-base font-medium text-gray-300">
          {employee.role}
        </span>

        <Link
          href="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
        >
          <Avatar src={employee.avatar} alt="Sua foto de perfil" />
        </Link>
      </div>
    </header>
  )
}
