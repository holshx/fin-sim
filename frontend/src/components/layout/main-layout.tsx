"use client"

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}
