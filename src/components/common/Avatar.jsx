import React from 'react'
import { cn } from '@utils/cn'

const Avatar = ({ src, alt, size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  }

  return (
    <div className={cn(
      'rounded-full bg-gradient-to-br from-arena-accent to-primary-500',
      'flex items-center justify-center font-bold text-white',
      sizes[size],
      className
    )}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span>{alt?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}

export default Avatar