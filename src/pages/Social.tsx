import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Trophy, 
  Globe, 
  MapPin, 
  // TrendingUp, 
  // Award,
  UserPlus,
  MessageCircle,
  Share2,
  Crown
} from 'lucide-react'

export default function Social() {
  const [activeTab, setActiveTab] = useState('global')

  // Mock data for demonstration
  const globalLeaderboard = [
    { rank: 1, name: 'EcoWarrior2024', location: 'Sweden', reduction: 67, tokens: 15420, avatar: '🌱' },
    { rank: 2, name: 'GreenGuru', location: 'Denmark', reduction: 64, tokens: 14890, avatar: '🌿' },
    { rank: 3, name: 'ClimateChamp', location: 'Norway', reduction: 62, tokens: 14230, avatar: '🍃' },
    { rank: 4, name: 'SustainableSam', location: 'Finland', reduction: 59, tokens: 13670, avatar: '🌳' },
    { rank: 5, name: 'EcoExplorer', location: 'Netherlands', reduction: 57, tokens: 13120, avatar: '🌲' },
    { rank: 342, name: 'You', location: 'Your City', reduction: 34, tokens: 1247, avatar: '👤', isUser: true }
  ]

  const friends = [
    { name: 'Alex Green', reduction: 45, streak: 12, status: 'online', avatar: '🌱' },
    { name: 'Sarah Eco', reduction: 38, streak: 8, status: 'offline', avatar: '🌿' },
    { name: 'Mike Climate', reduction: 52, streak: 15, status: 'online', avatar: '🍃' },
    { name: 'Emma Sustain', reduction: 41, streak: 10, status: 'online', avatar: '🌳' }
  ]

  const challenges = [
    {
      id: 1,
      title: 'Car-Free Week',
      participants: 1247,
      timeLeft: '3 days',
      reward: 500,
      difficulty: 'Medium',
      joined: true
    },
    {
      id: 2,
      title: 'Zero Waste Challenge',
      participants: 892,
      timeLeft: '1 week',
      reward: 750,
      difficulty: 'Hard',
      joined: false
    },
    {
      id: 3,
      title: 'Plant-Based Month',
      participants: 2156,
      timeLeft: '2 weeks',
      reward: 1000,
      difficulty: 'Easy',
      joined: true
    }
  ]

  const recentActivity = [
    { user: 'Alex Green', action: 'completed Car-Free Week challenge', time: '2 hours ago', icon: '🚲' },
    { user: 'Sarah Eco', action: 'achieved 30-day streak', time: '4 hours ago', icon: '🔥' },
    { user: 'Mike Climate', action: 'minted Green Commuter NFT', time: '6 hours ago', icon: '🎨' },
    { user: 'Emma Sustain', action: 'joined Zero Waste Challenge', time: '8 hours ago', icon: '♻️' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Social Hub</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Connect with eco-warriors worldwide and compete in sustainability challenges
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
              { id: 'global', name: 'Global Leaderboard', icon: Globe },
              { id: 'friends', name: 'Friends', icon: Users },
              { id: 'challenges', name: 'Group Challenges', icon: Trophy }
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
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content based on active tab */}
      {activeTab === 'global' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 metric-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                Global Leaderboard
              </h3>
              <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>This Month</option>
                <option>This Week</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-3">
              {globalLeaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center p-4 rounded-lg transition-all ${
                    user.isUser
                      ? 'bg-eco-50 dark:bg-eco-900/20 border-2 border-eco-200 dark:border-eco-700'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`text-2xl font-bold ${
                      user.rank <= 3 ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      #{user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-eco-600 dark:text-eco-400">{user.reduction}% reduction</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{user.tokens.toLocaleString()} ECO</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Regional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="metric-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Global Rank</span>
                  <span className="font-semibold text-gray-900 dark:text-white">#342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Regional Rank</span>
                  <span className="font-semibold text-gray-900 dark:text-white">#23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Percentile</span>
                  <span className="font-semibold text-eco-600 dark:text-eco-400">Top 5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">EcoTokens</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1,247</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-lg">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Friends List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 metric-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Eco-Friends</h3>
              <button className="btn-primary flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friends
              </button>
            </div>

            <div className="space-y-4">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl mr-4">{friend.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{friend.name}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {friend.reduction}% reduction • {friend.streak} day streak
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-eco-600 dark:hover:text-eco-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-eco-600 dark:hover:text-eco-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Friend Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Friend Challenges</h3>
            <div className="space-y-4">
              <div className="p-4 bg-eco-50 dark:bg-eco-900/20 rounded-lg border border-eco-200 dark:border-eco-700">
                <h4 className="font-semibold text-eco-800 dark:text-eco-300">Weekly Showdown</h4>
                <p className="text-sm text-eco-700 dark:text-eco-400 mt-1">
                  You vs Alex Green - Lowest emissions wins!
                </p>
                <div className="mt-3 flex justify-between text-sm">
                  <span>You: 45.2 kg</span>
                  <span>Alex: 52.1 kg</span>
                </div>
                <div className="mt-2 text-xs text-eco-600 dark:text-eco-400">You're winning! 🎉</div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Group Goal</h4>
                <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                  Team reduction target: 200 kg CO2
                </p>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-eco-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">146/200 kg saved</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="metric-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Active Challenges</h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{challenge.title}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {challenge.participants.toLocaleString()} participants
                          </span>
                          <span>{challenge.timeLeft} left</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            challenge.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                            challenge.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-eco-600 dark:text-eco-400">
                          {challenge.reward} ECO
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Reward</div>
                      </div>
                    </div>
                    
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        challenge.joined
                          ? 'bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-300 border border-eco-200 dark:border-eco-700'
                          : 'bg-eco-500 text-white hover:bg-eco-600'
                      }`}
                    >
                      {challenge.joined ? 'Joined ✓' : 'Join Challenge'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Challenge Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="metric-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Challenge Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-semibold text-eco-600 dark:text-eco-400">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tokens Earned</span>
                  <span className="font-semibold text-gray-900 dark:text-white">8,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5 challenges</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-eco-50 dark:bg-eco-900/20 rounded-lg">
                  <div className="text-2xl mr-3">🏆</div>
                  <div>
                    <div className="font-medium text-eco-800 dark:text-eco-300">Challenge Master</div>
                    <div className="text-sm text-eco-600 dark:text-eco-400">Complete 10 challenges</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl mr-3">⚡</div>
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-300">Speed Demon</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Complete challenge in 1 day</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl mr-3">👥</div>
                  <div>
                    <div className="font-medium text-purple-800 dark:text-purple-300">Team Player</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Join 5 group challenges</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}