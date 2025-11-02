import React from 'react'
import { cn } from '@utils/cn'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'bg-arena-accent hover:bg-arena-accent/90 text-white',
    secondary: 'bg-arena-light hover:bg-arena-light/80 text-white border border-white/10',
    outline: 'border-2 border-arena-accent text-arena-accent hover:bg-arena-accent hover:text-white',
    ghost: 'hover:bg-white/5 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  const sizes = {
    sm: 'py-1.5 px-4 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg',
  }

  return (
    <button
      className={cn(
        'font-semibold rounded-lg transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button