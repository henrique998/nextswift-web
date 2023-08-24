import { ReactNode } from 'react'
import { Header } from './components/Header'
import { MobileHeader } from './components/MobileHeader'
import { Sidebar } from './components/Sidebar'

interface PanelLayoutProps {
  children: ReactNode
}

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main className="flex items-start">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-white">
            <Header />
            <MobileHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
