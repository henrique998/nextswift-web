'use client'

import * as Form from '@radix-ui/react-form'

import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'
import { api } from '@/libs/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const passwordResetFormValidationSchema = zod
  .object({
    password: zod.string(),
    passwordConfirmation: zod.string(),
  })
  .superRefine(({ password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      alert('As senhas devem ser iguais!')
    }
  })

type PasswordResetFormData = zod.infer<typeof passwordResetFormValidationSchema>

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetFormValidationSchema),
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')

  async function handleRecoverPassword({
    password,
    passwordConfirmation,
  }: PasswordResetFormData) {
    try {
      if (code && password === passwordConfirmation) {
        setIsLoading(true)

        await api.patch(
          '/employees/password/reset',
          {
            newPassword: password,
          },
          {
            params: {
              code,
            },
          },
        )

        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Form onSubmit={handleSubmit(handleRecoverPassword)}>
      <PasswordInput
        label="Nova senha"
        placeholder="Digite sua nova senha"
        error="Campo obrigatório"
        prefixIcon={<KeyRound className="h-6 w-6 stroke-gray-300" />}
        className="mt-6"
        {...register('password')}
      />

      <PasswordInput
        label="Confirmação de senha"
        placeholder="As senhas devem ser iguais"
        error="Campo obrigatório"
        prefixIcon={<KeyRound className="h-6 w-6 stroke-gray-300" />}
        className="mb-6 mt-6"
        {...register('passwordConfirmation')}
      />

      <Button isLoading={isLoading}>Redifinir</Button>
    </Form.Form>
  )
}
