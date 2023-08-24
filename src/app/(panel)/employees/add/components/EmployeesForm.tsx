'use client'

import { Dropzone } from '@/app/(panel)/components/Dropzone'
import { ItemOption, Select } from '@/app/(panel)/components/Select'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import * as Form from '@radix-ui/react-form'

import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const addEmployeeFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  ddd: zod.string(),
  phone: zod.string(),
  cpf: zod.string(),
})

type AddEmployeeFormData = zod.infer<typeof addEmployeeFormValidationSchema>

interface EmployeesFormProps {
  rolesData: ItemOption[]
}

export function EmployeesForm({ rolesData }: EmployeesFormProps) {
  const [selectedRole, setSelectedRole] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register, reset } = useForm<AddEmployeeFormData>({
    resolver: zodResolver(addEmployeeFormValidationSchema),
  })

  const token = Cookies.get('token')

  async function handleAddCustomer({
    name,
    email,
    ddd,
    phone,
    cpf,
  }: AddEmployeeFormData) {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('ddd', ddd)
    formData.append('phone', phone)
    formData.append('cpf', cpf)
    formData.append('role', selectedRole)
    formData.append('avatar', images[0])

    try {
      setIsLoading(true)

      await api.post('/employees', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(handleAddCustomer)}
      className="mt-10 flex w-full flex-col gap-4 lg:gap-16"
    >
      <div>
        <h2 className="text-xl font-medium text-zinc-900">Dados pessoais</h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Nome" placeholder="Jhon doe" {...register('name')} />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input
              label="Email"
              placeholder="jhondoe@gmail.com"
              {...register('email')}
              className="flex-1"
            />

            <Input
              label="Cpf"
              placeholder="333.444.555-00"
              {...register('cpf')}
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input
              label="DDD"
              placeholder="82"
              {...register('ddd')}
              className="w-24"
            />

            <Input
              label="Celular/Telefone"
              placeholder="000000000"
              {...register('phone')}
              className="flex-1"
            />

            <div>
              <label>Cargo</label>

              <Select
                placeholder="Selecione um cargo"
                options={rolesData}
                onChange={setSelectedRole}
                value={selectedRole}
                size="sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="employee-avatar">Foto de perfil</label>

            <Dropzone
              id="employee-avatar"
              label="Arraste e solte uma imagem aqui"
              onChange={setImages}
              images={images}
            />
          </div>
        </div>
      </div>

      <div className="ml-auto w-[120px]">
        <Button isLoading={isLoading}>Adicionar</Button>
      </div>
    </Form.Root>
  )
}
