'use client'

import { api } from '@/libs/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Cookies from 'js-cookie'
import { Ban } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Pagnination } from '../../components/Pagnination'
import { QuantitySelect } from '../../components/QuantitySelect'
import { Tooltip } from '../../components/Tooltip'
import { Td } from '../../components/table/Td'
import { Th } from '../../components/table/Th'
import { quantityOptions } from '../../products/restore/data'
import { EmployeeData } from '../page'
import { DismissEmployeeModal } from './DismissEmployeeModal'
import { EmptyDismissedEmployeesContent } from './EmptyDismissedEmployeesContent'

dayjs.locale(ptBr)

interface EmployeesContentProps {
  employeesData: EmployeeData[]
  totalCount: number
}

export function EmployeesContent({
  employeesData,
  totalCount,
}: EmployeesContentProps) {
  const [employees, setEmployees] = useState(employeesData)
  const [total, setTotal] = useState(totalCount)
  const [quantity, setQuantity] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')

  function handleToggleSelectEmployee(employeeId: string) {
    const imageAlreadySelected = selectedEmployees.some(
      (selectedEmployeeId) => selectedEmployeeId === employeeId,
    )

    if (imageAlreadySelected) {
      setSelectedEmployees(
        selectedEmployees.filter(
          (selectedEmployeeId) => selectedEmployeeId !== employeeId,
        ),
      )
    } else {
      setSelectedEmployees((state) => [...state, employeeId])
    }
  }

  const token = Cookies.get('token')

  async function handleDismissEmployee(employeeId: string) {
    try {
      if (password && employeeId) {
        setIsLoading(true)

        await api.patch(
          '/employees/dismiss',
          {
            adminPassword: password,
            employeeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const params = useSearchParams()

  const page = params.get('page') ?? '1'
  const currentPage = Number(page)

  useEffect(() => {
    async function loadEmployees() {
      const res = await api.get<EmployeeData[]>('/employees', {
        params: {
          page: currentPage,
          limit: quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setEmployees(res.data)
      setTotal(Number(res.headers['x-total-count']))
    }

    if (quantity || currentPage > 1) {
      loadEmployees()
    }
  }, [currentPage, quantity, token])

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="w-fit max-[414px]:ml-4 max-[414px]:mr-auto lg:ml-auto">
        <QuantitySelect
          value={quantity}
          onChange={setQuantity}
          options={quantityOptions}
        />
      </div>

      {employees.length > 0 ? (
        <div className="scrollbar max-[414px]:max-w-[400px] max-[414px]:overflow-scroll max-[414px]:px-4">
          <table className="w-[1024px] table-fixed border-spacing-1">
            <thead>
              <tr className="border-b border-gray-200">
                <th></th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>CNPJ</Th>
                <Th className="pl-6">DDD</Th>
                <Th>Número</Th>
                <Th>Adicionado</Th>
                <Th>Atualizado</Th>
                <th></th>
              </tr>
            </thead>

            <tbody className="before-tbody">
              {employees.map((employee) => {
                const isProductSelected = selectedEmployees.some(
                  (selectedEmployeeId) => selectedEmployeeId === employee.id,
                )

                return (
                  <tr
                    key={employee.id}
                    className="h-14 border-b border-gray-200"
                  >
                    <td>
                      <div className="flex h-full items-center justify-center">
                        <Checkbox
                          checked={isProductSelected}
                          onChange={() =>
                            handleToggleSelectEmployee(employee.id)
                          }
                        />
                      </div>
                    </td>
                    <Td>
                      <Tooltip content={employee.name} side="top">
                        <span className="block w-24 truncate">
                          {employee.name}
                        </span>
                      </Tooltip>
                    </Td>
                    <Td>
                      <Tooltip content={employee.email} side="top">
                        <span className="block w-24 truncate">
                          {employee.email}
                        </span>
                      </Tooltip>
                    </Td>
                    <Td>
                      <Tooltip content={employee.cpf} side="top">
                        <span className="block w-24 truncate">
                          {employee.cpf}
                        </span>
                      </Tooltip>
                    </Td>
                    <Td className="pl-6">{employee.ddd}</Td>
                    <Td>{employee.phone}</Td>
                    <Td>{dayjs(employee.createdAt).format('DD/MM/YYYY')}</Td>
                    <Td>
                      {employee.updatedAt
                        ? dayjs(employee.updatedAt).format('DD/MM/YYYY')
                        : 'Não atualizado'}
                    </Td>
                    <td className="text-center">
                      {isProductSelected && (
                        <DismissEmployeeModal
                          passwordValue={password}
                          onChangePassword={setPassword}
                          onDelete={() => handleDismissEmployee(employee.id)}
                          isLoading={isLoading}
                        >
                          <button className="rounded-full p-2 transition-all hover:bg-gray-200">
                            <Ban className="h-5 w-5 stroke-purple-700" />
                          </button>
                        </DismissEmployeeModal>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="mx-auto mt-4 w-fit">
            <Pagnination
              totalCount={total}
              currentPage={currentPage}
              baseUrl="/employees?page"
            />
          </div>
        </div>
      ) : (
        <EmptyDismissedEmployeesContent />
      )}
    </div>
  )
}
