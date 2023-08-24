import { api } from '@/libs/api'
import Cookie from 'cookie'
import { cookies } from 'next/headers'

interface Employee {
  name: string
  email: string
  avatar: string
  phone: string
  role: string
}

export async function PUT(req: Request) {
  const formData = await req.formData()

  formData.get('name')
  formData.get('email')
  formData.get('phone')
  formData.get('avatar')

  const token = cookies().get('token')?.value

  const res = await api.put<Employee>('/employees/update', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const cookieExpiresTime = 60 * 60 * 24 * 30 // 30 days

  const employeeDataHeader = Cookie.serialize(
    'employee',
    JSON.stringify(res.data),
    {
      httpOnly: false,
      path: '/',
      maxAge: cookieExpiresTime,
    },
  )

  const headers = new Headers()
  headers.append('Set-Cookie', employeeDataHeader)

  return new Response(null, {
    headers,
    status: 200,
  })
}
