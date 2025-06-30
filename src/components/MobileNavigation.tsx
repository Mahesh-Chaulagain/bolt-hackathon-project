// import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Plus, 
  TrendingUp, 
  // Trophy, 
  User,
  Globe
} from 'lucide-react'

const mobileNavigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Log', href: '/logger', icon: Plus },
  { name: 'Stats', href: '/analytics', icon: TrendingUp },
  { name: 'Climate', href: '/climate-awareness', icon: Globe },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function MobileNavigation() {
  return (
    <nav className="mobile-nav safe-area-bottom">
      <div className="flex justify-around">
        {mobileNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `mobile-nav-item ${
                isActive
                  ? 'text-eco-600 dark:text-eco-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}