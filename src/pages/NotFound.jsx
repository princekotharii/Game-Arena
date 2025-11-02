import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@components/common/Button'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="container-custom py-20">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-9xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-white/60 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound