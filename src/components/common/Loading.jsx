import React from 'react'

const Loading = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-arena-light border-t-arena-accent rounded-full animate-spin`} />
    </div>
  )
}

export default Loading