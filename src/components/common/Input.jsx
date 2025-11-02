import React from 'react'
import { cn } from '@utils/cn'

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 rounded-lg',
          'glass-effect border border-white/10',
          'focus:outline-none focus:ring-2 focus:ring-arena-accent focus:border-transparent',
          'placeholder:text-white/40',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input