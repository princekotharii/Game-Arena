import React from 'react'
import { cn } from '@utils/cn'

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-arena-light text-white',
    primary: 'bg-arena-accent text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
  }

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}

export default Badge