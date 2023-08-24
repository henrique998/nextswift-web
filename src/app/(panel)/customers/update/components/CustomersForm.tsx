'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import * as Form from '@radix-ui/react-form'

import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

interface CustomersFormProps {
  customer: {
    id: string
    name: string
    email: string
    cpf: string
    phone: string
    createdAt: Date
    updatedAt: string
    address: {
      street: string
      complement?: string
      number: number
      cep: string
      uf: string
    }
  }
}

const updateCustomerFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  cpf: zod.string().optional(),
  cnpj: zod.string().optional(),
  phone: zod.string(),
  street: zod.string(),
  number: zod.string(),
  cep: zod.string(),
  complement: zod.string().optional(),
  uf: zod.string(),
})

type UpdateCustomerFormData = zod.infer<
  typeof updateCustomerFormValidationSchema
>

export function CustomersForm({ customer }: CustomersFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register } = useForm<UpdateCustomerFormData>({
    resolver: zodResolver(updateCustomerFormValidationSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      phone: customer.phone,
      street: customer.address.street,
      complement: customer.address.complement,
      cep: customer.address.cep,
      number: String(customer.address.number),
      uf: customer.address.uf,
    },
  })

  const token = Cookies.get('token')

  async function handleUpdateCustomer({
    name,
    email,
    cpf,
    cnpj,
    phone,
    cep,
    number,
    street,
    complement,
    uf,
  }: UpdateCustomerFormData) {
    try {
      setIsLoading(true)

      await api.put(
        `/customers/update/${customer.id}`,
        {
          name,
          email,
          cpf,
          cnpj,
          phone,
          cep,
          number,
          street,
          complement,
          uf,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(handleUpdateCustomer)}
      className="mt-10 flex w-full flex-col gap-4 lg:gap-16"
    >
      <div>
        <h2 className="text-xl font-medium text-zinc-900">Dados pessoais</h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Nome" {...register('name')} placeholder="Jhon doe" />

          <Input
            label="Email"
            {...register('email')}
            placeholder="jhondoe@gmail.com"
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input
              label="CPF"
              {...register('cpf')}
              placeholder="000.000.00-00"
            />

            <Input
              label="Celular/Telefone"
              {...register('phone')}
              placeholder="000000000"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium text-zinc-900">
          Endereço do cliente
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Rua" {...register('street')} placeholder="brasil" />

          <Input
            {...register('complement')}
            label="Complemento"
            required={false}
            placeholder="próximo ao supermercado...."
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input label="Número" {...register('number')} placeholder="00" />

            <Input {...register('cep')} label="CEP" placeholder="00000-00" />

            <Input {...register('uf')} label="UF" placeholder="SP" />
          </div>
        </div>
      </div>

      <div className="ml-auto w-[120px]">
        <Button isLoading={isLoading}>Atualizar</Button>
      </div>
    </Form.Root>
  )
}
