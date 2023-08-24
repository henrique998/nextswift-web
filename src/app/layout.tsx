import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata = {
  title: 'Next Swift',
  description: 'Description',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
