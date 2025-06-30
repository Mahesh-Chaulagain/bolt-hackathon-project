import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingDown, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  Leaf,
  Zap,
  Users,
  Plus
} from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { useAI } from '../contexts/AIContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user } = useAuth()
  const { getPersonalizedTips, isProcessing } = useAI()
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [userActivities, setUserActivities] = useState<any[]>([])
  const [dashboardData, setDashboardData] = useState({
    todayFootprint: 0,
    monthlyReduction: 0,
    ecoTokens: 0,
    globalRank: 0,
    totalSaved: 0
  })

  useEffect(() => {
    loadDashboardData()
    loadPersonalizedTips()
  }, [])

  const loadDashboardData = () => {
    // Load data from localStorage or initialize with zeros
    const savedActivities = JSON.parse(localStorage.getItem('userActivities') || '[]')
    const savedData = JSON.parse(localStorage.getItem('dashboardData') || '{}')
    
    setUserActivities(savedActivities)
    setDashboardData({
      todayFootprint: savedData.todayFootprint || 0,
      monthlyReduction: savedData.monthlyReduction || 0,
      ecoTokens: savedData.ecoTokens || 0,
      globalRank: savedData.globalRank || 0,
      totalSaved: savedData.totalSaved || 0
    })
    
    // Calculate current streak
    const streak = calculateStreak(savedActivities)
    setCurrentStreak(streak)
  }

  const calculateStreak = (activities: any[]) => {
    if (activities.length === 0) return 0
    
    const today = new Date().toDateString()
    const activityDates = activities.map(a => new Date(a.date).toDateString())
    const uniqueDates = [...new Set(activityDates)].sort()
    
    let streak = 0
    let currentDate = new Date()
    
    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const activityDate = new Date(uniqueDates[i])
      const daysDiff = Math.floor((currentDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === streak) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const loadPersonalizedTips = async () => {
    try {
      const userData = {
        primaryTransport: 'car',
        energyLevel: 'moderate',
        streak: currentStreak
      }
      const tips = await getPersonalizedTips(userData)
      setPersonalizedTips(tips)
    } catch (error) {
      console.error('Failed to load personalized tips:', error)
      toast.error('Failed to load AI tips')
    }
  }

  // Calculate carbon data from user activities
  const calculateCarbonData = () => {
    if (userActivities.length === 0) {
      return [
        { name: 'Transport', value: 0, color: '#ef4444' },
        { name: 'Energy', value: 0, color: '#f97316' },
        { name: 'Food', value: 0, color: '#eab308' },
        { name: 'Waste', value: 0, color: '#22c55e' }
      ]
    }

    const categoryTotals = userActivities.reduce((acc, activity) => {
      const category = activity.category
      acc[category] = (acc[category] || 0) + (activity.co2_impact || 0)
      return acc
    }, {})

    const total = Object.values(categoryTotals).reduce((sum: number, val: any) => sum + val, 0)
    
    if (total === 0) {
      return [
        { name: 'Transport', value: 0, color: '#ef4444' },
        { name: 'Energy', value: 0, color: '#f97316' },
        { name: 'Food', value: 0, color: '#eab308' },
        { name: 'Waste', value: 0, color: '#22c55e' }
      ]
    }

    return [
      { name: 'Transport', value: Math.round(((categoryTotals.transportation || 0) / total) * 100), color: '#ef4444' },
      { name: 'Energy', value: Math.round(((categoryTotals.energy || 0) / total) * 100), color: '#f97316' },
      { name: 'Food', value: Math.round(((categoryTotals.food || 0) / total) * 100), color: '#eab308' },
      { name: 'Waste', value: Math.round(((categoryTotals.waste || 0) / total) * 100), color: '#22c55e' }
    ]
  }

  // Calculate weekly data from user activities
  const calculateWeeklyData = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const today = new Date()
    const weekData = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dayName = weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1]
      const dateString = date.toDateString()

      const dayActivities = userActivities.filter(activity => 
        new Date(activity.date).toDateString() === dateString
      )

      const dayEmissions = dayActivities.reduce((sum, activity) => 
        sum + (activity.co2_impact || 0), 0
      )

      weekData.push({
        day: dayName,
        emissions: Math.round(dayEmissions * 100) / 100,
        target: 10 // Daily target
      })
    }

    return weekData
  }

  const carbonData = calculateCarbonData()
  const weeklyData = calculateWeeklyData()

  // Calculate today's footprint
  const todayString = new Date().toDateString()
  const todayActivities = userActivities.filter(activity => 
    new Date(activity.date).toDateString() === todayString
  )
  const todayFootprint = todayActivities.reduce((sum, activity) => 
    sum + (activity.co2_impact || 0), 0
  )

  const achievements = [
    { id: 1, title: 'First Steps', icon: '🌱', earned: currentStreak >= 1, description: 'Started your sustainability journey' },
    { id: 2, title: 'Week Warrior', icon: '🔥', earned: currentStreak >= 7, description: 'Maintained a 7-day streak' },
    { id: 3, title: 'Green Commuter', icon: '🚲', earned: userActivities.some(a => a.category === 'transportation' && a.type.includes('bike')), description: 'Used sustainable transportation' },
    { id: 4, title: 'Energy Saver', icon: '💡', earned: userActivities.some(a => a.category === 'energy'), description: 'Tracked energy consumption' },
    { id: 5, title: 'Waste Warrior', icon: '♻️', earned: userActivities.some(a => a.category === 'waste'), description: 'Managed waste sustainably' },
    { id: 6, title: 'Food Hero', icon: '🌿', earned: userActivities.some(a => a.category === 'food' && a.type.includes('plant')), description: 'Chose plant-based options' }
  ]

  const handleQuickAction = (action: string) => {
    toast.success(`Navigating to ${action}...`)
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'emissions' ? ' kg CO2' : entry.dataKey === 'value' ? '%' : ''}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Calculate comprehensive stats
  const totalActivities = userActivities.length
  const totalEmissions = userActivities.reduce((sum, activity) => sum + (activity.co2_impact || 0), 0)
  const averageDailyEmissions = totalActivities > 0 ? totalEmissions / Math.max(1, new Set(userActivities.map(a => new Date(a.date).toDateString())).size) : 0
  const monthlyTarget = 300 // kg CO2
  const monthlyProgress = Math.min(100, (totalEmissions / monthlyTarget) * 100)
  const ecoTokensEarned = dashboardData.ecoTokens + (currentStreak * 10) + (totalActivities * 5)

  // Status messages based on actual data
  const getStatusMessage = (value: number, type: string) => {
    switch (type) {
      case 'footprint':
        if (value === 0) return 'No data yet'
        if (value <= 5) return 'Excellent!'
        if (value <= 10) return 'Good progress'
        if (value <= 15) return 'Room for improvement'
        return 'Needs attention'
      
      case 'streak':
        if (value === 0) return 'Start today!'
        if (value >= 30) return 'Incredible dedication!'
        if (value >= 14) return 'Amazing consistency!'
        if (value >= 7) return 'Great momentum!'
        return 'Building habits!'
      
      case 'tokens':
        if (value >= 1000) return 'Token master!'
        if (value >= 500) return 'Great earnings!'
        if (value >= 100) return 'Good progress'
        return 'Keep earning!'
      
      case 'rank':
        if (totalActivities === 0) return 'Start tracking to rank'
        if (value <= 100) return 'Elite performer!'
        if (value <= 500) return 'Top performer!'
        return 'Rising star!'
      
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-eco-500 to-eco-600 dark:from-eco-600 dark:to-eco-700 rounded-2xl p-4 sm:p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Welcome, {'Eco Warrior'}! 🌍
        </h1>
        <p className="text-eco-100 text-base sm:text-lg lg:text-xl">
          {totalEmissions > 0 
            ? `You've tracked ${totalActivities} activities and logged ${totalEmissions.toFixed(1)} kg CO2. Your average daily footprint is ${averageDailyEmissions.toFixed(1)} kg - that's ${averageDailyEmissions < 10 ? 'below' : 'above'} the global average!`
            : "Start logging your activities to track your environmental impact and earn rewards!"
          }
        </p>
      </motion.div>

      {/* Key Metrics - Enhanced with clear information */}
      <div className="dashboard-metrics grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Today's Footprint</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {todayFootprint.toFixed(1)} kg
              </p>
              <p className="text-xs sm:text-sm text-eco-600 dark:text-eco-400 flex items-center">
                {todayFootprint <= 10 ? (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>{getStatusMessage(todayFootprint, 'footprint')}</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>{getStatusMessage(todayFootprint, 'footprint')}</span>
                  </>
                )}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-eco-100 dark:bg-eco-900/30 rounded-lg flex-shrink-0">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-eco-600 dark:text-eco-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">{currentStreak} days</p>
              <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{getStatusMessage(currentStreak, 'streak')}</span>
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">EcoTokens</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {ecoTokensEarned.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                {getStatusMessage(ecoTokensEarned, 'tokens')}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="metric-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Global Rank</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {totalActivities > 0 ? '#342' : 'Unranked'}
              </p>
              <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400">
                {getStatusMessage(342, 'rank')}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="metric-card text-center"
        >
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalActivities}</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Activities Logged</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="metric-card text-center"
        >
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalEmissions.toFixed(1)} kg</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total CO2 Tracked</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="metric-card text-center"
        >
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{averageDailyEmissions.toFixed(1)} kg</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Daily Average</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="metric-card text-center"
        >
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{achievements.filter(a => a.earned).length}/{achievements.length}</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Achievements</div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Carbon Footprint Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="metric-card"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Carbon Footprint Breakdown
          </h3>
          {carbonData.every(item => item.value === 0) ? (
            <div className="h-48 sm:h-64 flex items-center justify-center">
              <div className="text-center">
                <Leaf className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No activity data yet</p>
                <Link to="/logger" className="text-eco-600 dark:text-eco-400 hover:underline">
                  Start logging activities
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carbonData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {carbonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4">
                {carbonData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="metric-card"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Weekly CO2 Emissions (kg)
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }} 
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  stroke="#6b7280"
                  label={{ value: 'kg CO2', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="emissions" 
                  fill="#22c55e" 
                  radius={[4, 4, 0, 0]} 
                  name="Actual Emissions"
                />
                <Bar 
                  dataKey="target" 
                  fill="#e5e7eb" 
                  radius={[4, 4, 0, 0]} 
                  name="Daily Target"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Green bars show your actual emissions, gray bars show the 10kg daily target
            </p>
          </div>
        </motion.div>
      </div>

      {/* AI Tips and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Personalized AI Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="metric-card"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
            AI-Powered Tips
          </h3>
          {isProcessing ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {personalizedTips.length > 0 ? personalizedTips.map((tip, index) => (
                <div key={index} className="p-3 sm:p-4 bg-eco-50 dark:bg-eco-900/20 rounded-lg border-l-4 border-eco-500">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                </div>
              )) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Start logging activities to get personalized tips!</p>
                  <Link to="/logger" className="text-eco-600 dark:text-eco-400 hover:underline">
                    Log your first activity
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="metric-card"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
            <Award className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
            Achievements ({achievements.filter(a => a.earned).length}/{achievements.length})
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'border-eco-200 dark:border-eco-700 bg-eco-50 dark:bg-eco-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
                }`}
              >
                <div className="text-xl sm:text-2xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{achievement.description}</p>
                {achievement.earned ? (
                  <span className="text-xs text-eco-600 dark:text-eco-400 font-medium">Earned!</span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400">Not earned yet</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="metric-card"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link 
            to="/logger"
            className="btn-primary flex items-center justify-center touch-button"
            onClick={() => handleQuickAction('Activity Logger')}
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Log Activities
          </Link>
          <Link 
            to="/challenges"
            className="btn-secondary flex items-center justify-center touch-button"
            onClick={() => handleQuickAction('Challenges')}
          >
            <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            View Challenges
          </Link>
          <Link 
            to="/social"
            className="btn-secondary flex items-center justify-center touch-button"
            onClick={() => handleQuickAction('Social Hub')}
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Connect Friends
          </Link>
        </div>
      </motion.div>
    </div>
  )
}