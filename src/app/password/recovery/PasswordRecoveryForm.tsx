'use client'

import * as Form from '@radix-ui/react-form'
import { Mail } from 'lucide-react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const passwordRecoveryFormValidationSchema = zod.object({
  email: zod.string(),
})

type PasswordRecoveryFormData = zod.infer<
  typeof passwordRecoveryFormValidationSchema
>

export function PasswordRecoveryForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register, reset } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(passwordRecoveryFormValidationSchema),
  })

  async function handleRecoverPassword({ email }: PasswordRecoveryFormData) {
    try {
      setIsLoading(true)

      await api.post('/employees/password/forgot', {
        email,
      })

      reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Form onSubmit={handleSubmit(handleRecoverPassword)}>
      <Input
        label="Email"
        type="email"
        placeholder="Digite seu email"
        errors={[
          {
            match: 'typeMismatch',
            msg: 'Digite um email válido',
          },
          {
            match: 'valueMissing',
            msg: 'Campo obrigatório',
          },
        ]}
        prefixIcon={<Mail className="h-6 w-6 stroke-gray-300" />}
        className="mb-6"
        {...register('email')}
      />

      <Button isLoading={isLoading}>Enviar</Button>
    </Form.Form>
  )
}
