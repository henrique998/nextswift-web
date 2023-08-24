'use client'

import { api } from '@/libs/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Cookies from 'js-cookie'
import { Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Pagnination } from '../../components/Pagnination'
import { QuantitySelect } from '../../components/QuantitySelect'
import { Tooltip } from '../../components/Tooltip'
import { Td } from '../../components/table/Td'
import { Th } from '../../components/table/Th'
import { quantityOptions } from '../../products/restore/data'
import { SupplierData } from '../page'
import { DeleteSupplierModal } from './DeleteSupplierModal'
import { EmptySuppliersContent } from './EmptySuppliersContent'

dayjs.locale(ptBr)

interface SuppliersContentProps {
  suppliersData: SupplierData[]
  totalCount: number
}

export function SuppliersContent({
  suppliersData,
  totalCount,
}: SuppliersContentProps) {
  const [suppliers, setSuppliers] = useState<SupplierData[]>(suppliersData)
  const [total, setTotal] = useState(totalCount)
  const [quantity, setQuantity] = useState('')
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

  const params = useSearchParams()

  const page = params.get('page') ?? '1'
  const currentPage = Number(page)

  const isSupplierSelected = (supplierId: string) =>
    selectedSuppliers.some((supplier) => supplier === supplierId)

  function toggleSelectSupplier(supplierId: string) {
    if (isSupplierSelected(supplierId)) {
      setSelectedSuppliers(
        selectedSuppliers.filter((supplier) => supplier !== supplierId),
      )
    } else {
      setSelectedSuppliers((value) => [...value, supplierId])
    }
  }

  const token = Cookies.get('token')

  useEffect(() => {
    async function loadSuppliers() {
      if (quantity) {
        const res = await api.get<SupplierData[]>('/suppliers/search', {
          params: {
            page: currentPage > 0 && currentPage,
            limit: quantity,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const suppliersTotal = Number(res.headers['x-total-count'])

        setSuppliers(res.data)
        setTotal(suppliersTotal)
      }
    }

    if (quantity || currentPage > 1) {
      loadSuppliers()
    }
  }, [currentPage, quantity, token])

  return (
    <div className="mt-10 flex w-full flex-col gap-4">
      <div className="w-fit max-[414px]:ml-4 max-[414px]:mr-auto lg:ml-auto">
        <QuantitySelect
          options={quantityOptions}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      {suppliers.length > 0 ? (
        <div className="scrollbar max-[414px]:max-w-[400px] max-[414px]:overflow-scroll max-[414px]:px-4">
          <table className="w-[1024px] table-fixed border-spacing-1">
            <thead>
              <tr className="border-b border-gray-200">
                <th></th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>CPF/CNPJ</Th>
                <Th className="pl-6">DDD</Th>
                <Th>Número</Th>
                <Th>Adicionado</Th>
                <Th>Atualizado</Th>
                <th></th>
              </tr>
            </thead>

            <tbody className="before-tbody">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="h-14 border-b border-gray-200">
                  <td>
                    <div className="flex h-full items-center justify-center">
                      <Checkbox
                        checked={isSupplierSelected(supplier.id)}
                        onChange={() => toggleSelectSupplier(supplier.id)}
                      />
                    </div>
                  </td>
                  <Td>
                    <Tooltip content={supplier.name} side="top">
                      <span className="block w-24 truncate">
                        {supplier.name}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip content={supplier.email} side="top">
                      <span className="block w-24 truncate">
                        {supplier.email}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip
                      content={supplier.cpf ? supplier.cpf : supplier.cnpj!!}
                      side="top"
                    >
                      <span className="block w-24 truncate">
                        {supplier.cpf ? supplier.cpf : supplier.cnpj!!}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td className="pl-6">{supplier.ddd}</Td>
                  <Td>{supplier.phone}</Td>
                  <Td>{dayjs(supplier.createdAt).format('DD/MM/YYYY')}</Td>
                  <Td>
                    {supplier.updatedAt
                      ? dayjs(supplier.updatedAt).format('DD/MM/YYYY')
                      : 'Não atualizado'}
                  </Td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      {isSupplierSelected(supplier.id) && (
                        <>
                          <Link
                            href={`/suppliers/update/${supplier.id}`}
                            className="rounded-full p-2 transition-all hover:bg-gray-200"
                          >
                            <Edit3 className="h-5 w-5 stroke-purple-700" />
                          </Link>

                          <DeleteSupplierModal supplierId={supplier.id}>
                            <button className="rounded-full p-2 transition-all hover:bg-gray-200">
                              <Trash2 className="h-5 w-5 stroke-purple-700" />
                            </button>
                          </DeleteSupplierModal>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mx-auto mt-4 w-fit">
            <Pagnination
              totalCount={total}
              currentPage={currentPage}
              baseUrl="/suppliers?page"
            />
          </div>
        </div>
      ) : (
        <EmptySuppliersContent />
      )}
    </div>
  )
}
