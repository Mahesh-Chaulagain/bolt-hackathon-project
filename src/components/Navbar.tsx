// import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useWeb3 } from '../contexts/Web3Context'
import { useOnboarding } from '../contexts/OnboardingContext'
import { Leaf, Bell, User, Wallet, HelpCircle } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { isConnected, walletAddress, ecoTokenBalance, connectWallet } = useWeb3()
  const { startOnboarding } = useOnboarding()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
      toast.success('Wallet connected successfully!')
    } catch (error) {
      toast.error('Failed to connect wallet')
    }
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-eco-200 dark:border-gray-700 sticky top-0 z-50 safe-area-top">
      <div className="container-mobile">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 eco-logo">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-eco-500" />
              <span className="text-xl sm:text-2xl font-bold eco-gradient bg-clip-text text-transparent">
                EcoMeter
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Help/Onboarding */}
            {user && (
              <button
                onClick={startOnboarding}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400 transition-colors touch-button"
                title="Start Tutorial"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            )}

            {/* Web3 Wallet Section */}
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex items-center space-x-2 bg-eco-50 dark:bg-eco-900/30 px-2 sm:px-3 py-1 rounded-lg">
                  <Wallet className="h-4 w-4 text-eco-600 dark:text-eco-400" />
                  <span className="text-xs sm:text-sm font-medium text-eco-700 dark:text-eco-300">
                    {ecoTokenBalance} ECO
                  </span>
                  <span className="hidden sm:inline text-xs text-eco-500 dark:text-eco-400">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="flex items-center space-x-1 bg-eco-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-eco-600 transition-colors touch-button"
                >
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">Connect</span>
                </button>
              )}
            </div>

            {/* Notifications */}
            <button 
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400 transition-colors touch-button"
              onClick={() => toast('No new notifications', { icon: '🔔' })}
            >
              <Bell className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-eco-50 dark:hover:bg-gray-800 transition-colors touch-button">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {""}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-eco-50 dark:hover:bg-gray-700 rounded-t-lg"
                >
                  Profile Settings
                </Link>
                <Link
                  to="/web3"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-eco-50 dark:hover:bg-gray-700"
                >
                  Web3 Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}