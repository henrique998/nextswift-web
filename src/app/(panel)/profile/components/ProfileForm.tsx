'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Avatar } from '../../components/Avatar'
import { Dropzone } from '../../components/Dropzone'

type Employee = {
  name: string
  email: string
  avatar: string
  phone: number
}

const updateEmployeeFormValidationSchema = zod.object({
  name: zod.string().optional(),
  email: zod.string().optional(),
  phone: zod.string().optional(),
})

type UpdateEmployeeFormData = zod.infer<
  typeof updateEmployeeFormValidationSchema
>

export function ProfileForm() {
  const employee = JSON.parse(Cookies.get('employee') ?? '') as Employee

  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [avatarPreview, setAvatarPreview] = useState(employee.avatar)

  useEffect(() => {
    if (images.length > 0) {
      const url = URL.createObjectURL(images[0])

      setAvatarPreview(url)
    }
  }, [images])

  const { handleSubmit, register } = useForm<UpdateEmployeeFormData>({
    resolver: zodResolver(updateEmployeeFormValidationSchema),
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phone: String(employee.phone),
    },
  })

  async function handleUpdateEmployee({
    name,
    email,
    phone,
  }: UpdateEmployeeFormData) {
    const formData = new FormData()

    formData.append('name', name ?? '')
    formData.append('email', email ?? '')
    formData.append('phone', phone ?? '')
    formData.append('avatar', images[0] ?? null)

    try {
      setIsLoading(true)

      await axios.put('/api/profile/update', formData)

      window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(handleUpdateEmployee)}
      className="mt-10 flex w-full flex-col gap-4 lg:gap-6"
    >
      <div>
        <h2 className="text-xl font-medium text-zinc-900">Dados pessoais</h2>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Nome" placeholder="Jhon doe" {...register('name')} />

          <Input
            label="Email"
            placeholder="jhondoe@gmail.com"
            {...register('email')}
          />

          <Input
            label="Celular/Telefone"
            placeholder="0 00000000"
            {...register('phone')}
          />

          <div>
            <label htmlFor="profile">Foto de perfil</label>

            <div className="mt-2 flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <Avatar size="lg" src={avatarPreview} />

              <div className="w-full flex-1">
                <Dropzone
                  id="profile"
                  label="Arraste e solte uma imagem aqui"
                  onChange={setImages}
                  images={images}
                  showPreview={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto w-[120px]">
        <Button isLoading={isLoading}>Atualizar</Button>
      </div>
    </Form.Root>
  )
}
