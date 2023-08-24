'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { SupplierData } from '../page'

interface SuppliersFormProps {
  supplierData: SupplierData
}

const updateSupplierFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  ddd: zod.string(),
  phone: zod.string(),
  street: zod.string(),
  number: zod.string(),
  cep: zod.string(),
  complement: zod.string().optional(),
  uf: zod.string(),
})

type UpdateSupplierFormData = zod.infer<
  typeof updateSupplierFormValidationSchema
>

export function SuppliersForm({ supplierData }: SuppliersFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register } = useForm<UpdateSupplierFormData>({
    resolver: zodResolver(updateSupplierFormValidationSchema),
    defaultValues: {
      name: supplierData.name,
      email: supplierData.email,
      ddd: String(supplierData.ddd),
      phone: String(supplierData.phone),
      street: supplierData.street,
      complement: supplierData.complement,
      cep: supplierData.cep,
      number: String(supplierData.number),
      uf: supplierData.uf,
    },
  })

  const token = Cookies.get('token')

  async function handleUpdateSupplier({
    name,
    email,
    ddd,
    phone,
    cep,
    number,
    street,
    complement,
    uf,
  }: UpdateSupplierFormData) {
    try {
      setIsLoading(true)

      await api.put(
        `/suppliers/update/${supplierData.id}`,
        {
          name,
          email,
          ddd: Number(ddd),
          phone: Number(phone),
          cep,
          number: Number(number),
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
      onSubmit={handleSubmit(handleUpdateSupplier)}
      className="mt-10 flex w-full flex-col gap-4 lg:gap-16"
    >
      <div>
        <h2 className="text-xl font-medium text-zinc-900">
          Dados do fornecedor
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Nome" placeholder="Jhon doe" {...register('name')} />

          <Input
            label="Email"
            placeholder="jhondoe@gmail.com"
            {...register('email')}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input
              label="DDD"
              placeholder="00"
              type="number"
              {...register('ddd')}
              className="w-24"
            />

            <Input
              label="Celular/Telefone"
              placeholder="000000000"
              {...register('phone')}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-medium text-zinc-900">
          Endereço do fornecedor
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Rua" placeholder="brasil" {...register('street')} />

          <Input
            label="Complemento"
            placeholder="complento..."
            {...register('complement')}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input
              label="Número"
              placeholder="00"
              type="number"
              {...register('number')}
            />
            <Input label="CEP" placeholder="00000-00" {...register('cep')} />
            <Input label="UF" placeholder="SP" {...register('uf')} />
          </div>
        </div>
      </div>

      <div className="ml-auto w-[120px]">
        <Button isLoading={isLoading}>Adicionar</Button>
      </div>
    </Form.Root>
  )
}
