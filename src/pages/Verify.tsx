// import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Email Verified!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your email is verified. You can now log in to your account.
        </p>
        <Link
          to="/login"
          className="btn-primary px-6 py-2 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}
