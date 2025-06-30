import  { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Calendar, 
  Users, 
  Target, 
  Clock,
  Zap,
  Leaf,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

export default function Challenges() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock data for demonstration
  const dailyChallenges = [
    {
      id: 1,
      title: 'Walk or Bike to Work',
      description: 'Replace one car trip with walking or cycling',
      points: 50,
      co2Saved: 2.3,
      difficulty: 'easy',
      timeLeft: '18h 32m',
      completed: false,
      icon: '🚲'
    },
    {
      id: 2,
      title: 'Plant-Based Meal',
      description: 'Have one completely plant-based meal today',
      points: 30,
      co2Saved: 1.8,
      difficulty: 'easy',
      timeLeft: '18h 32m',
      completed: true,
      icon: '🌱'
    },
    {
      id: 3,
      title: 'Energy Audit',
      description: 'Identify and fix 3 energy waste sources in your home',
      points: 100,
      co2Saved: 5.2,
      difficulty: 'medium',
      timeLeft: '18h 32m',
      completed: false,
      icon: '💡'
    }
  ]

  const weeklyChallenges = [
    {
      id: 4,
      title: 'Zero Waste Week',
      description: 'Go an entire week without creating any waste',
      points: 500,
      co2Saved: 15.7,
      difficulty: 'hard',
      timeLeft: '4 days',
      participants: 1247,
      progress: 65,
      icon: '♻️'
    },
    {
      id: 5,
      title: 'Public Transport Champion',
      description: 'Use only public transport for all trips this week',
      points: 300,
      co2Saved: 12.4,
      difficulty: 'medium',
      timeLeft: '6 days',
      participants: 892,
      progress: 0,
      icon: '🚌'
    }
  ]

  const specialChallenges = [
    {
      id: 6,
      title: 'Earth Month Challenge',
      description: 'Complete 30 eco-actions in 30 days',
      points: 2000,
      co2Saved: 45.0,
      difficulty: 'hard',
      timeLeft: '23 days',
      participants: 5432,
      progress: 23,
      reward: 'Exclusive NFT',
      icon: '🌍'
    }
  ]

  const achievements = [
    { title: 'First Steps', description: 'Complete your first challenge', earned: true, icon: '👶' },
    { title: 'Streak Master', description: 'Complete 7 daily challenges in a row', earned: true, icon: '🔥' },
    { title: 'Team Player', description: 'Join 5 group challenges', earned: false, icon: '👥' },
    { title: 'Eco Warrior', description: 'Save 100kg CO2 through challenges', earned: false, icon: '⚔️' }
  ]

  const stats = {
    completed: 23,
    totalPoints: 1247,
    co2Saved: 45.6,
    currentStreak: 7
  }

  const filterChallenges = (challenges: any[], filter: string) => {
    if (filter === 'all') return challenges
    if (filter === 'active') return challenges.filter(c => !c.completed)
    if (filter === 'completed') return challenges.filter(c => c.completed)
    return challenges
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Eco Challenges</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete daily challenges, earn rewards, and make a positive impact on the planet
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card text-center"
        >
          <div className="p-3 bg-eco-100 dark:bg-eco-900/30 rounded-lg w-fit mx-auto mb-3">
            <Trophy className="h-8 w-8 text-eco-600 dark:text-eco-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card text-center"
        >
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg w-fit mx-auto mb-3">
            <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPoints}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card text-center"
        >
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-3">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.co2Saved}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">kg CO2 Saved</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="metric-card text-center"
        >
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-3">
            <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
        </motion.div>
      </div>

      {/* Horizontal Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {[
              { id: 'all', name: 'All Challenges' },
              { id: 'active', name: 'Active' },
              { id: 'completed', name: 'Completed' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeFilter === filter.id
                    ? 'bg-eco-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenges */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="metric-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
                Daily Challenges
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Resets in 18h 32m
              </div>
            </div>

            <div className="space-y-4">
              {filterChallenges(dailyChallenges, activeFilter).map((challenge) => (
                <div
                  key={challenge.id}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    challenge.completed
                      ? 'border-eco-200 dark:border-eco-700 bg-eco-50 dark:bg-eco-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-eco-300 dark:hover:border-eco-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-eco-600 dark:text-eco-400">
                            <Zap className="h-4 w-4 mr-1" />
                            {challenge.points} points
                          </span>
                          <span className="flex items-center text-green-600 dark:text-green-400">
                            <Leaf className="h-4 w-4 mr-1" />
                            {challenge.co2Saved} kg CO2
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            challenge.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                            challenge.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {challenge.completed ? (
                        <div className="flex items-center text-eco-600 dark:text-eco-400">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      ) : (
                        <button className="btn-primary">
                          Start Challenge
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
              Weekly Challenges
            </h3>

            <div className="space-y-4">
              {weeklyChallenges.map((challenge) => (
                <div key={challenge.id} className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-eco-300 dark:hover:border-eco-600 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-eco-600 dark:text-eco-400">
                            <Zap className="h-4 w-4 mr-1" />
                            {challenge.points} points
                          </span>
                          <span className="flex items-center text-green-600 dark:text-green-400">
                            <Leaf className="h-4 w-4 mr-1" />
                            {challenge.co2Saved} kg CO2
                          </span>
                          <span className="flex items-center text-blue-600 dark:text-blue-400">
                            <Users className="h-4 w-4 mr-1" />
                            {challenge.participants} joined
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{challenge.timeLeft} left</div>
                      <button className="btn-primary">
                        Join Challenge
                      </button>
                    </div>
                  </div>
                  
                  {challenge.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-eco-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Special Challenges
            </h3>

            <div className="space-y-4">
              {specialChallenges.map((challenge) => (
                <div key={challenge.id} className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-yellow-600 dark:text-yellow-400 font-medium">
                            <Zap className="h-4 w-4 mr-1" />
                            {challenge.points} points
                          </span>
                          <span className="flex items-center text-green-600 dark:text-green-400 font-medium">
                            <Leaf className="h-4 w-4 mr-1" />
                            {challenge.co2Saved} kg CO2
                          </span>
                          <span className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                            <Users className="h-4 w-4 mr-1" />
                            {challenge.participants} joined
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                          🎁 Reward: {challenge.reward}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{challenge.timeLeft} left</div>
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all">
                        Join Challenge
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-white dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
              Achievements
            </h3>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg ${
                    achievement.earned
                      ? 'bg-eco-50 dark:bg-eco-900/20 border border-eco-200 dark:border-eco-700'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-60'
                  }`}
                >
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</div>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="h-5 w-5 text-eco-600 dark:text-eco-400" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Challenge Leaderboard</h3>
            
            <div className="space-y-3">
              {[
                { rank: 1, name: 'EcoChampion', points: 2450, avatar: '🏆' },
                { rank: 2, name: 'GreenGuru', points: 2380, avatar: '🌟' },
                { rank: 3, name: 'ClimateHero', points: 2290, avatar: '⭐' },
                { rank: 23, name: 'You', points: 1247, avatar: '👤', isUser: true }
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-2 rounded ${
                    user.isUser ? 'bg-eco-50 dark:bg-eco-900/20 border border-eco-200 dark:border-eco-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">#{user.rank}</span>
                    <span className="text-lg">{user.avatar}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                  <span className="text-sm font-bold text-eco-600 dark:text-eco-400">{user.points}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}