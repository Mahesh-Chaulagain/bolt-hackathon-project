import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileNavigation from './MobileNavigation'
import { Menu, X } from 'lucide-react'

export default function Layout() {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eco-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800 mobile-viewport-fix transition-colors duration-300">
      <Navbar />
      
      {/* Mobile menu button - Smaller and better positioned */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed z-50 p-1.5 bg-white dark:bg-gray-800 rounded-md shadow-md touch-button border border-gray-200 dark:border-gray-700"
        style={{ 
          top: 'calc(4rem + env(safe-area-inset-top) + 0.5rem)',
          left: '0.75rem'
        }}
      >
        <Menu className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className={`mobile-sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-button"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content - Proper padding to avoid burger button overlap */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 pb-20 md:pb-6">
          <div className="container-mobile" style={{ paddingTop: '2rem', paddingLeft: '2rem' }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  )
}