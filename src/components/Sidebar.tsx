import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Users, 
  Trophy, 
  User,
  Bot,
  MessageCircle,
  Coins,
  Globe
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Activity Logger', href: '/logger', icon: Plus },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Social Hub', href: '/social', icon: Users },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'AI Coach', href: '/ai-coach', icon: Bot },
  { name: 'ClimaChat', href: '/clima-chat', icon: MessageCircle },
  { name: 'Climate Awareness', href: '/climate-awareness', icon: Globe },
  { name: 'Web3 Dashboard', href: '/web3', icon: Coins },
  { name: 'Profile', href: '/profile', icon: User },
]

interface SidebarProps {
  onItemClick?: () => void
}

export default function Sidebar({ onItemClick }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-eco-200 dark:border-gray-700 pt-16">
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-button ${
                  isActive
                    ? 'bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-eco-50 dark:hover:bg-eco-900/20 hover:text-eco-600 dark:hover:text-eco-400'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-eco-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-eco-500 to-eco-600 rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm">Go Premium</h3>
            <p className="text-xs opacity-90 mt-1">
              Unlock advanced AI coaching and exclusive NFT rewards
            </p>
            <button className="mt-2 bg-white text-eco-600 px-3 py-1 rounded text-xs font-medium hover:bg-eco-50 transition-colors touch-button">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}