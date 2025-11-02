import React from 'react'
import { cn } from '@utils/cn'

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'glass-effect rounded-xl p-6',
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card