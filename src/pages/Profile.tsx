import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Mail,
  Lock,
  Camera,
  Save,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    location: 'San Francisco, CA',
    bio: 'Passionate about sustainable living and reducing my carbon footprint.',
    goals: {
      dailyTarget: 10,
      monthlyTarget: 300,
      yearlyReduction: 50
    }
  })

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    challengeUpdates: true,
    achievementAlerts: true,
    weeklyReports: true,
    friendActivity: false
  })

  const stats = {
    totalReduction: 234.5,
    challengesCompleted: 23,
    streakRecord: 14,
    tokensEarned: 1247,
    nftsMinted: 3,
    friendsConnected: 12
  }

  const recentAchievements = [
    { title: 'Green Commuter', date: '2024-01-15', icon: '🚲' },
    { title: 'Energy Saver', date: '2024-01-10', icon: '💡' },
    { title: 'Waste Warrior', date: '2024-01-05', icon: '♻️' }
  ]

  const handleProfileUpdate = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationToggle = (setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage your account, preferences, and sustainability goals
        </p>
      </motion.div>

      {/* Horizontal Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {[
              { id: 'profile', name: 'Profile', icon: User },
              { id: 'settings', name: 'Settings', icon: Settings },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'privacy', name: 'Privacy', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-eco-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400'
                }`}
              >
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Profile Picture */}
              <div className="metric-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Picture</h3>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-eco-100 dark:bg-eco-900/30 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-eco-600 dark:text-eco-400" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-eco-500 text-white p-2 rounded-full hover:bg-eco-600 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Update your photo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Choose a photo that represents your eco-friendly lifestyle
                    </p>
                    <button className="btn-secondary">Upload Photo</button>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="metric-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileUpdate('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Tell us about your sustainability journey..."
                    />
                  </div>
                </div>
              </div>

              {/* Sustainability Goals */}
              <div className="metric-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Sustainability Goals</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Daily CO2 Target (kg)
                    </label>
                    <input
                      type="number"
                      value={profileData.goals.dailyTarget}
                      onChange={(e) => handleProfileUpdate('goals', {
                        ...profileData.goals,
                        dailyTarget: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly CO2 Target (kg)
                    </label>
                    <input
                      type="number"
                      value={profileData.goals.monthlyTarget}
                      onChange={(e) => handleProfileUpdate('goals', {
                        ...profileData.goals,
                        monthlyTarget: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Yearly Reduction Goal (%)
                    </label>
                    <input
                      type="number"
                      value={profileData.goals.yearlyReduction}
                      onChange={(e) => handleProfileUpdate('goals', {
                        ...profileData.goals,
                        yearlyReduction: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <button className="btn-primary flex items-center">
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="metric-card"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getNotificationDescription(key)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-eco-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="metric-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">App Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Units
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>Metric (kg, km)</option>
                      <option>Imperial (lbs, miles)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Update your account password</div>
                        </div>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500">→</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</div>
                        </div>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500">→</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="metric-card"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Public</option>
                    <option>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Activity Sharing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share your eco-activities with others</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-eco-500">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Data Analytics</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Help improve EcoMeter with usage data</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-eco-500">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Impact</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total CO2 Saved</span>
                <span className="font-semibold text-eco-600 dark:text-eco-400">{stats.totalReduction} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Challenges Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats.challengesCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Longest Streak</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats.streakRecord} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">EcoTokens Earned</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats.tokensEarned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">NFTs Minted</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats.nftsMinted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Friends Connected</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats.friendsConnected}</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-eco-50 dark:bg-eco-900/20 rounded-lg">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary flex items-center justify-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Globe className="h-4 w-4 mr-2" />
                Share Profile
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    dailyReminders: 'Get reminded to log your daily activities',
    challengeUpdates: 'Receive updates about your active challenges',
    achievementAlerts: 'Be notified when you earn new achievements',
    weeklyReports: 'Get weekly summaries of your progress',
    friendActivity: 'See updates from your eco-friends'
  }
  return descriptions[key] || ''
}