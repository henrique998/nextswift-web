import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from './Avatar'
import { MobileSidebar } from './MobileSidebar'

type Employee = {
  name: string
  avatar: string
}

export function MobileHeader() {
  const employee = JSON.parse(
    cookies().get('employee')?.value ?? '',
  ) as Employee

  return (
    <header className="sticky left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-b-gray-200 px-6 lg:hidden">
      <MobileSidebar />

      <Link href="/dashboard">
        <Image src="/complete-logo.svg" alt="" width={142} height={24} />
      </Link>

      <Link
        href="/profile"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
      >
        <Avatar src={employee.avatar} alt={employee.name} />
      </Link>
    </header>
  )
}
