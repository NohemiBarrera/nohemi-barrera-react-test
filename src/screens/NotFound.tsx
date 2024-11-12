import React from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <HomeIcon size={20} />
        <span>Go Home</span>
      </Link>
    </div>
  )
}

export default NotFound