'use client'

import { ItemOption, Select } from '@/app/(panel)/components/Select'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const addSupplierFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  cpf: zod.string().optional(),
  cnpj: zod.string().optional(),
  ddd: zod.string(),
  phone: zod.string(),
  street: zod.string(),
  number: zod.string(),
  cep: zod.string(),
  complement: zod.string().optional(),
  uf: zod.string(),
})

type AddSupplierFormData = zod.infer<typeof addSupplierFormValidationSchema>

const selectOptions: ItemOption[] = [
  {
    label: 'cpf',
    value: 'CPF',
  },
  {
    label: 'cnpj',
    value: 'CNPJ',
  },
]

export function SuppliersForm() {
  const [selectedDocumentType, setSelectedDocumentType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register } = useForm<AddSupplierFormData>({
    resolver: zodResolver(addSupplierFormValidationSchema),
  })

  const token = Cookies.get('token')

  async function handleAddSupplier({
    name,
    email,
    cpf,
    cnpj,
    ddd,
    phone,
    cep,
    number,
    street,
    complement,
    uf,
  }: AddSupplierFormData) {
    try {
      setIsLoading(true)

      await api.post(
        '/suppliers',
        {
          name,
          email,
          cpf,
          cnpj,
          ddd,
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
      onSubmit={handleSubmit(handleAddSupplier)}
      className="mt-10 flex w-full flex-col gap-4 lg:gap-16"
    >
      <div>
        <h2 className="text-xl font-medium text-zinc-900">Dados pessoais</h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input {...register('name')} label="Nome" placeholder="Jhon doe" />

          <Input
            {...register('email')}
            label="Email"
            placeholder="jhondoe@gmail.com"
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-900">
              Documento
            </label>

            <Select
              placeholder="selecione uma opção"
              options={selectOptions}
              onChange={setSelectedDocumentType}
              value={selectedDocumentType}
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            {selectedDocumentType === 'CNPJ' ? (
              <Input
                {...register('cnpj')}
                label="CNPJ"
                required={false}
                placeholder="000.000.00-00"
              />
            ) : (
              <Input
                {...register('cpf')}
                label="CPF"
                required={false}
                placeholder="000.000.00-00"
              />
            )}

            <Input
              {...register('ddd')}
              label="DDD"
              placeholder="00"
              className="w-24"
            />

            <Input
              {...register('phone')}
              label="Celular/Telefone"
              placeholder="000000000"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-medium text-zinc-900">
          Endereço do cliente
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input {...register('street')} label="Rua" placeholder="brasil" />

          <Input
            {...register('complement')}
            label="Complemento"
            required={false}
            placeholder="próximo ao supermercado...."
          />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Input {...register('number')} label="Número" placeholder="00" />
            <Input {...register('cep')} label="CEP" placeholder="00000-00" />
            <Input {...register('uf')} label="UF" placeholder="SP" />
          </div>
        </div>
      </div>

      <div className="ml-auto w-[120px]">
        <Button isLoading={isLoading}>Adicionar</Button>
      </div>
    </Form.Root>
  )
}
