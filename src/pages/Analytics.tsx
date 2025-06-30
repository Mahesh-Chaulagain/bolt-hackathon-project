import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingDown, 
  TrendingUp, 
  // Calendar, 
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  // Filter
} from 'lucide-react'
import { 
  // LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('emissions')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  const monthlyData = [
    { month: 'Jan', emissions: 245, target: 200, saved: 15 },
    { month: 'Feb', emissions: 198, target: 200, saved: 32 },
    { month: 'Mar', emissions: 167, target: 200, saved: 48 },
    { month: 'Apr', emissions: 189, target: 200, saved: 28 },
    { month: 'May', emissions: 156, target: 200, saved: 55 },
    { month: 'Jun', emissions: 142, target: 200, saved: 67 }
  ]

  const categoryBreakdown = [
    { name: 'Transportation', value: 45, color: '#ef4444' },
    { name: 'Energy', value: 30, color: '#f97316' },
    { name: 'Food', value: 20, color: '#eab308' },
    { name: 'Waste', value: 5, color: '#22c55e' }
  ]

  const weeklyComparison = [
    { week: 'Week 1', thisMonth: 38, lastMonth: 52 },
    { week: 'Week 2', thisMonth: 35, lastMonth: 48 },
    { week: 'Week 3', thisMonth: 32, lastMonth: 45 },
    { week: 'Week 4', thisMonth: 29, lastMonth: 42 }
  ]

  const achievements = [
    { title: 'Best Week Ever', value: '23% reduction', trend: 'up' },
    { title: 'Streak Record', value: '14 days', trend: 'up' },
    { title: 'Monthly Goal', value: '87% complete', trend: 'up' },
    { title: 'Yearly Progress', value: '34% reduction', trend: 'up' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Deep insights into your carbon footprint and sustainability progress
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
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
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'trends', name: 'Trends', icon: TrendingUp },
              { id: 'breakdown', name: 'Breakdown', icon: PieChartIcon },
              { id: 'goals', name: 'Goals', icon: Target }
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="metric-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{achievement.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{achievement.value}</p>
                  </div>
                  <div className="p-3 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
                    {achievement.trend === 'up' ? (
                      <TrendingUp className="h-6 w-6 text-eco-600 dark:text-eco-400" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Emissions Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Emissions Trend</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMetric('emissions')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedMetric === 'emissions'
                        ? 'bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Emissions
                  </button>
                  <button
                    onClick={() => setSelectedMetric('savings')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedMetric === 'savings'
                        ? 'bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Savings
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric === 'emissions' ? 'emissions' : 'saved'}
                      stroke={selectedMetric === 'emissions' ? '#ef4444' : '#22c55e'}
                      fill={selectedMetric === 'emissions' ? '#fef2f2' : '#f0fdf4'}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#6b7280"
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="metric-card"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Emissions by Category
              </h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Weekly Comparison
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="thisMonth" fill="#22c55e" name="This Month" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lastMonth" fill="#e5e7eb" name="Last Month" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Goals & Targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
              Goals & Targets
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Goal</span>
                  <span className="text-sm text-eco-600 dark:text-eco-400">87%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-eco-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">13% to go</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Yearly Target</span>
                  <span className="text-sm text-eco-600 dark:text-eco-400">34%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-eco-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">On track for 50% reduction</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Streak Goal</span>
                  <span className="text-sm text-eco-600 dark:text-eco-400">93%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-eco-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 day to 15-day streak</p>
              </div>
            </div>
            
            <button className="btn-primary w-full mt-6">
              Update Goals
            </button>
          </motion.div>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Category Analysis</h3>
            <div className="space-y-4">
              {categoryBreakdown.map((category) => (
                <div key={category.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: category.color }}>
                      {category.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.value}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Monthly Breakdown</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'goals' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Goal Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-eco-50 dark:bg-eco-900/20 rounded-lg">
              <div className="text-3xl font-bold text-eco-600 dark:text-eco-400 mb-2">87%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly Goal</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-eco-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">34%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Yearly Target</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">93%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Streak Goal</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insights & Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="metric-card"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          AI-Powered Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-eco-50 dark:bg-eco-900/20 rounded-lg border-l-4 border-eco-500">
            <h4 className="font-semibold text-eco-800 dark:text-eco-300 mb-2">🎯 Best Performance</h4>
            <p className="text-sm text-eco-700 dark:text-eco-400">
              Your transportation emissions dropped 32% this month. Keep using public transport!
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚡ Opportunity</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Energy usage increased 15%. Consider switching to LED bulbs for 20% savings.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📈 Trend Alert</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              You're on track to achieve a 45% yearly reduction - 5% ahead of your goal!
            </p>
          </div>
        
        </div>
      </motion.div>
    </div>
  )
}