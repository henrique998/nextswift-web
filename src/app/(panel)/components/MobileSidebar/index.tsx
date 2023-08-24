'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import {
  LayoutGrid,
  Menu,
  PackageSearch,
  PowerOff,
  ShoppingBag,
  Tag,
  Truck,
  Users,
  Users2,
  X,
} from 'lucide-react'

import { Accordion } from './Accordion'
import { usePathname } from 'next/navigation'
import {
  customersLinks,
  employeesLinks,
  productsLinks,
  salesLinks,
  suppliersLinks,
} from '../Sidebar/data'
import { useEffect, useState } from 'react'
import { LoggoutButton } from '../LoggoutButton'

export function MobileSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathName = usePathname()

  const isActive = (path: string) => {
    return pathName.startsWith(`/${path}`)
  }

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathName])

  return (
    <Dialog.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <Dialog.Trigger asChild>
        <button>
          <Menu className="h-8 w-8" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-50 h-screen w-full bg-white">
          <header className="flex h-16 items-center justify-between border-b border-b-gray-200 px-6">
            <Link href="/dashboard">
              <Image src="/complete-logo.svg" alt="" width={142} height={24} />
            </Link>

            <Dialog.Close asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <X className="h-5 w-5 stroke-gray-500" />
              </button>
            </Dialog.Close>
          </header>

          <nav className="mt-10 px-6">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex h-10 items-center gap-2 rounded-md px-2 ${
                    isActive('dashboard') && 'bg-gray-200'
                  }`}
                >
                  {' '}
                  <LayoutGrid
                    className={`h-6 w-6 ${
                      isActive('dashboard') && 'stroke-purple-700'
                    } ${
                      !isActive('dashboard') &&
                      'stroke-gray-300 hover:stroke-purple-700'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isActive('dashboard')
                        ? 'text-purple-700'
                        : 'text-gray-300'
                    }`}
                  >
                    Painel
                  </span>
                </Link>
              </li>

              <li>
                <Accordion
                  value="products"
                  icon={
                    <PackageSearch
                      className={`h-6 w-6 ${
                        isActive('products') && 'stroke-purple-700'
                      } ${
                        !isActive('products') &&
                        'stroke-gray-300 hover:stroke-purple-700'
                      }`}
                    />
                  }
                  label="produtos"
                  links={productsLinks}
                  isActive={isActive('products')}
                />
              </li>

              <li>
                <Accordion
                  value="sales"
                  icon={
                    <ShoppingBag
                      className={`h-6 w-6 ${
                        isActive('sales') && 'stroke-purple-700'
                      } ${
                        !isActive('sales') &&
                        'stroke-gray-300 hover:stroke-purple-700'
                      }`}
                    />
                  }
                  label="vendas"
                  links={salesLinks}
                  isActive={isActive('sales')}
                />
              </li>

              <li>
                <Accordion
                  value="customers"
                  icon={
                    <Users2
                      className={`h-6 w-6 ${
                        isActive('customers') && 'stroke-purple-700'
                      } ${
                        !isActive('customers') &&
                        'stroke-gray-300 hover:stroke-purple-700'
                      }`}
                    />
                  }
                  label="clientes"
                  links={customersLinks}
                  isActive={isActive('customers')}
                />
              </li>

              <li>
                <Accordion
                  value="employees"
                  icon={
                    <Users
                      className={`h-6 w-6 ${
                        isActive('employees') && 'stroke-purple-700'
                      } ${
                        !isActive('employees') &&
                        'stroke-gray-300 hover:stroke-purple-700'
                      }`}
                    />
                  }
                  label="funcionários"
                  links={employeesLinks}
                  isActive={isActive('employees')}
                />
              </li>

              <li>
                <Link
                  href="/categories"
                  className={`flex h-10 items-center gap-2 rounded-md px-2 ${
                    isActive('categories') && 'bg-gray-200'
                  }`}
                >
                  {' '}
                  <Tag
                    className={`h-6 w-6 ${
                      isActive('categories') && 'stroke-purple-700'
                    } ${
                      !isActive('categories') &&
                      'stroke-gray-300 hover:stroke-purple-700'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isActive('categories')
                        ? 'text-purple-700'
                        : 'text-gray-300'
                    }`}
                  >
                    Categorias
                  </span>
                </Link>
              </li>

              <li>
                <Accordion
                  value="suppliers"
                  icon={
                    <Truck
                      className={`h-6 w-6 ${
                        isActive('suppliers') && 'stroke-purple-700'
                      } ${
                        !isActive('suppliers') &&
                        'stroke-gray-300 hover:stroke-purple-700'
                      }`}
                    />
                  }
                  label="fornecedores"
                  links={suppliersLinks}
                  isActive={isActive('suppliers')}
                />
              </li>
            </ul>
          </nav>

          <LoggoutButton>
            <button className="mx-6 mt-10 flex items-center gap-2 pl-2">
              <PowerOff className="h-6 w-6 stroke-gray-400" />

              <span className="block text-gray-400">Sair</span>
            </button>
          </LoggoutButton>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
