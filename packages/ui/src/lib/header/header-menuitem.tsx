'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface HeaderMenuitemProps {
  label: string
  href: string
}

export const HeaderMenuitem = (props: HeaderMenuitemProps) => {
  const { label, href } = props

  const isActive = usePathname() === href

  return (
    <Link
      key={href}
      href={href}
      className={twMerge(
        'btn btn-ghost btn-sm rounded-btn',
        isActive ? 'btn-active' : 'btn-primary',
      )}
    >
      {label}
    </Link>
  )
}
