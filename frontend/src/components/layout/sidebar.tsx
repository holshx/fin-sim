"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Incomes', href: '/incomes' },
  { name: 'Expenses', href: '/expenses' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Investments', href: '/investments' },
  { name: 'Credits', href: '/credits' },
  { name: 'Simulations', href: '/simulations' },
  { name: 'Users', href: '/users' },
  { name: 'Settings', href: '/settings' },
]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        {/* Close button for mobile */}
        <button 
          className="mobile-close-btn"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Finance</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
