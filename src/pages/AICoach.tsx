import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Mic, 
  Video, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  TrendingUp,
  Target,
  Lightbulb,
  Calendar,
  Award,
  MessageSquare,
  RefreshCw,
  Download
} from 'lucide-react'
import { useAI } from '../contexts/AIContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

export default function AICoach() {
  const { 
    getPersonalizedTips, 
    generateVoiceCoaching, 
    createPersonalizedVideo, 
    analyzeHabits,
    isProcessing 
  } = useAI()

  const [activeTab, setActiveTab] = useState('overview')
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([])
  const [habitAnalysis, setHabitAnalysis] = useState<any>(null)
  const [voiceCoachingUrl, setVoiceCoachingUrl] = useState<string | null>(null)
  const [videoCoachingUrl, setVideoCoachingUrl] = useState<string | null>(null)
  
  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes default
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(180) // 3 minutes default
  const [videoVolume, setVideoVolume] = useState(1)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  // Analytics data for video
  const analyticsData = {
    carbonData: [
      { name: 'Transport', value: 45, color: '#ef4444' },
      { name: 'Energy', value: 30, color: '#f97316' },
      { name: 'Food', value: 20, color: '#eab308' },
      { name: 'Waste', value: 5, color: '#22c55e' }
    ],
    weeklyData: [
      { day: 'Mon', emissions: 12.5, target: 10 },
      { day: 'Tue', emissions: 8.2, target: 10 },
      { day: 'Wed', emissions: 15.1, target: 10 },
      { day: 'Thu', emissions: 9.8, target: 10 },
      { day: 'Fri', emissions: 11.3, target: 10 },
      { day: 'Sat', emissions: 6.7, target: 10 },
      { day: 'Sun', emissions: 7.9, target: 10 }
    ],
    stats: {
      totalReduction: 234.5,
      currentStreak: 7,
      tokensEarned: 1247,
      globalRank: 342
    }
  }

  useEffect(() => {
    loadAIInsights()
  }, [])

  // Audio simulation effect with actual audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && voiceCoachingUrl) {
      // Create actual audio for voice coaching
      if (audioRef.current) {
        // Use Web Speech API for text-to-speech
        const utterance = new SpeechSynthesisUtterance(getVoiceCoachingScript())
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = isMuted ? 0 : volume
        
        utterance.onstart = () => {
          setIsPlaying(true)
        }
        
        utterance.onend = () => {
          setIsPlaying(false)
          setCurrentTime(0)
        }
        
        utterance.onboundary = (event) => {
          // Update progress based on speech progress
          const progress = (event.charIndex / getVoiceCoachingScript().length) * duration
          setCurrentTime(progress)
        }
        
        speechSynthesis.speak(utterance)
      }
      
      // Fallback timer for progress tracking
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => {
      clearInterval(interval)
      speechSynthesis.cancel()
    }
  }, [isPlaying, duration, voiceCoachingUrl, isMuted, volume])

  // Video simulation effect with analytics narration
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isVideoPlaying && videoCoachingUrl) {
      // Generate analytics narration
      const narrationScript = generateAnalyticsNarration()
      
      // Use Web Speech API for video narration
      const utterance = new SpeechSynthesisUtterance(narrationScript)
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.volume = isVideoMuted ? 0 : videoVolume
      
      utterance.onstart = () => {
        setIsVideoPlaying(true)
      }
      
      utterance.onend = () => {
        setIsVideoPlaying(false)
        setVideoCurrentTime(0)
      }
      
      utterance.onboundary = (event) => {
        const progress = (event.charIndex / narrationScript.length) * videoDuration
        setVideoCurrentTime(progress)
      }
      
      speechSynthesis.speak(utterance)
      
      // Fallback timer
      interval = setInterval(() => {
        setVideoCurrentTime(prev => {
          if (prev >= videoDuration) {
            setIsVideoPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => {
      clearInterval(interval)
      speechSynthesis.cancel()
    }
  }, [isVideoPlaying, videoDuration, videoCoachingUrl, isVideoMuted, videoVolume])

  const getVoiceCoachingScript = () => {
    return `Hello! I'm your AI sustainability coach. Based on your recent activities, I can see you've made excellent progress with a ${analyticsData.stats.currentStreak}-day streak! Your carbon footprint shows that transportation accounts for 45% of your emissions, which is a key area for improvement. Energy usage is at 30%, and food choices contribute 20%. The great news is you've saved ${analyticsData.stats.totalReduction} kg of CO2 this month! Here are three personalized recommendations: First, try carpooling or using public transport twice this week to reduce transportation emissions by 40%. Second, switch to LED bulbs and unplug devices when not in use to cut energy consumption by 25%. Third, incorporate two plant-based meals per week to lower your food carbon footprint by 15%. Keep up the fantastic work - you're currently ranked ${analyticsData.stats.globalRank} globally, which puts you in the top 5%!`
  }

  const generateAnalyticsNarration = () => {
    return `Welcome to your personalized sustainability analytics report. Let me walk you through your environmental impact data. Your current carbon footprint breakdown shows transportation at 45%, energy at 30%, food at 20%, and waste at just 5%. This week, your daily emissions ranged from 6.7 kg on Saturday to 15.1 kg on Wednesday, with an average of 10.2 kg per day. You've successfully saved ${analyticsData.stats.totalReduction} kg of CO2 this month, equivalent to planting ${Math.floor(analyticsData.stats.totalReduction / 12)} trees. Your ${analyticsData.stats.currentStreak}-day streak demonstrates excellent consistency. You've earned ${analyticsData.stats.tokensEarned} EcoTokens and rank ${analyticsData.stats.globalRank} globally. Key insights: Transportation is your highest impact area - consider sustainable alternatives. Your weekend emissions are notably lower, showing great weekend habits. Energy efficiency improvements could reduce your footprint by an additional 25%. Keep up the excellent work on your sustainability journey!`
  }

  const loadAIInsights = async () => {
    try {
      const userData = {
        primaryTransport: 'car',
        energyLevel: 'high',
        streak: 7,
        goals: ['reduce_transport', 'save_energy']
      }
      
      const tips = await getPersonalizedTips(userData)
      setPersonalizedTips(tips)

      const mockActivities = [
        { category: 'transportation', type: 'car_gasoline', value: 25, date: '2024-01-15', co2_impact: 5.25 },
        { category: 'energy', type: 'electricity', value: 35, date: '2024-01-15', co2_impact: 17.5 },
        { category: 'food', type: 'beef', value: 0.5, date: '2024-01-15', co2_impact: 13.5 }
      ]
      
      const analysis = await analyzeHabits(mockActivities)
      setHabitAnalysis(analysis)
    } catch (error) {
      console.error('Failed to load AI insights:', error)
    }
  }

  const handleGenerateVoiceCoaching = async () => {
    try {
      setVoiceCoachingUrl('voice-coaching-session')
      setCurrentTime(0)
      setIsPlaying(true)
      toast.success('Voice coaching started!')
    } catch (error) {
      console.error('Failed to generate voice coaching:', error)
      toast.error('Failed to generate voice coaching')
    }
  }

  const handleCreatePersonalizedVideo = async () => {
    try {
      setVideoCoachingUrl('analytics-video')
      setVideoCurrentTime(0)
      setIsVideoPlaying(true)
      toast.success('Analytics video with narration started!')
    } catch (error) {
      console.error('Failed to create personalized video:', error)
      toast.error('Failed to create analytics video')
    }
  }

  // Audio player controls
  const togglePlayPause = () => {
    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
    toast(isPlaying ? 'Audio paused' : 'Audio playing', { 
      icon: isPlaying ? '⏸️' : '▶️' 
    })
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    // Note: Web Speech API doesn't support seeking, this is for UI feedback
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast(isMuted ? 'Audio unmuted' : 'Audio muted', { 
      icon: isMuted ? '🔊' : '🔇' 
    })
  }

  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10))
    toast('Skipped back 10s', { icon: '⏪' })
  }

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10))
    toast('Skipped forward 10s', { icon: '⏩' })
  }

  // Video player controls
  const toggleVideoPlayPause = () => {
    if (isVideoPlaying) {
      speechSynthesis.cancel()
      setIsVideoPlaying(false)
    } else {
      setIsVideoPlaying(true)
    }
    toast(isVideoPlaying ? 'Video paused' : 'Video playing', { 
      icon: isVideoPlaying ? '⏸️' : '▶️' 
    })
  }

  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setVideoCurrentTime(newTime)
  }

  const handleVideoVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVideoVolume(newVolume)
    setIsVideoMuted(newVolume === 0)
  }

  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted)
    toast(isVideoMuted ? 'Video unmuted' : 'Video muted', { 
      icon: isVideoMuted ? '🔊' : '🔇' 
    })
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const coachingModules = [
    {
      id: 'habits',
      title: 'Habit Formation',
      description: 'Build lasting sustainable habits with AI-powered guidance',
      icon: '🧠',
      lessons: 12,
      duration: '4 weeks'
    },
    {
      id: 'transport',
      title: 'Green Transportation',
      description: 'Optimize your commute and travel for minimal environmental impact',
      icon: '🚲',
      lessons: 8,
      duration: '2 weeks'
    },
    {
      id: 'energy',
      title: 'Energy Efficiency',
      description: 'Master home energy management and renewable solutions',
      icon: '⚡',
      lessons: 10,
      duration: '3 weeks'
    },
    {
      id: 'consumption',
      title: 'Conscious Consumption',
      description: 'Make informed choices about purchases and waste reduction',
      icon: '🛒',
      lessons: 6,
      duration: '2 weeks'
    }
  ]

  const weeklyGoals = [
    { goal: 'Reduce car trips by 30%', progress: 75, status: 'on-track' },
    { goal: 'Lower energy usage by 15%', progress: 45, status: 'behind' },
    { goal: 'Try 3 plant-based meals', progress: 100, status: 'completed' },
    { goal: 'Recycle 90% of waste', progress: 85, status: 'on-track' }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">GreenGPT AI Coach</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Your personal AI sustainability coach powered by advanced machine learning
        </p>
      </motion.div>

      {/* AI Coach Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card text-center"
        >
          <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-3">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">87%</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Accuracy Score</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card text-center"
        >
          <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-3">
            <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">156</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Tips Generated</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card text-center"
        >
          <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-3">
            <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">23</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Goals Achieved</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="metric-card text-center"
        >
          <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-3">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">28</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Days Coached</div>
        </motion.div>
      </div>

      {/* Horizontal Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {[
              { id: 'overview', name: 'Overview', icon: Bot },
              { id: 'voice', name: 'Voice Coaching', icon: Mic },
              { id: 'video', name: 'Analytics Video', icon: Video },
              { id: 'modules', name: 'Learning Modules', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Personalized Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="metric-card"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              AI-Powered Insights
            </h3>
            
            {isProcessing ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {personalizedTips.map((tip, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Habit Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="metric-card"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Habit Analysis
            </h3>
            
            {habitAnalysis ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sustainability Score</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${habitAnalysis.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{habitAnalysis.score}/100</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Patterns</h4>
                  <div className="space-y-2">
                    {habitAnalysis.patterns.map((pattern: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{pattern}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">AI Recommendations</h4>
                  <div className="space-y-2">
                    {habitAnalysis.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Analyzing your habits...</p>
              </div>
            )}
          </motion.div>

          {/* Weekly Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 metric-card"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              AI-Suggested Weekly Goals
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{goal.goal}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      goal.status === 'on-track' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {goal.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.status === 'completed' ? 'bg-green-500' :
                        goal.status === 'on-track' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{goal.progress}% complete</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'voice' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="metric-card text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Voice Coaching with AI</h3>
            
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 sm:p-8 mb-6">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative ${isPlaying ? 'audio-playing' : ''}`}>
                <Mic className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Personal AI Voice Coach</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
                Get personalized sustainability coaching with natural-sounding AI voice guidance
              </p>
              
              {voiceCoachingUrl ? (
                <div className="space-y-6">
                  {/* Audio Player */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                          onClick={skipBackward}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-button"
                        >
                          <SkipBack className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        
                        <button
                          onClick={togglePlayPause}
                          className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors touch-button"
                        >
                          {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
                        </button>
                        
                        <button
                          onClick={skipForward}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-button"
                        >
                          <SkipForward className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors touch-button"
                        >
                          {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 sm:w-20 slider"
                        />
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full slider"
                      />
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Personal Coaching Session</h5>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">AI-generated sustainability guidance with voice narration</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGenerateVoiceCoaching}
                    disabled={isProcessing}
                    className="btn-secondary"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500 mr-2"></div>
                    ) : (
                      <RefreshCw className="h-5 w-5 mr-2" />
                    )}
                    Generate New Session
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerateVoiceCoaching}
                  disabled={isProcessing}
                  className="btn-primary flex items-center mx-auto"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Mic className="h-5 w-5 mr-2" />
                  )}
                  Generate Voice Coaching
                </button>
              )}
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Voice Coaching Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: '🎯', title: 'Personalized Content', desc: 'Based on your data' },
                  { icon: '🗣️', title: 'Natural Voice', desc: 'Human-like speech' },
                  { icon: '📱', title: 'On-the-Go', desc: 'Listen anywhere' },
                  { icon: '🔄', title: 'Daily Updates', desc: 'Fresh content daily' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">{feature.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{feature.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'video' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="metric-card">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Analytics Video Dashboard</h3>
            
            {videoCoachingUrl ? (
              <div className="space-y-6">
                {/* Video Player with Analytics Visualization */}
                <div className="bg-gradient-to-br from-eco-50 to-blue-50 dark:from-eco-900/20 dark:to-blue-900/20 rounded-2xl p-4 sm:p-6 video-container">
                  <div className="text-center mb-6">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Sustainability Journey</h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">AI-powered analysis with voice narration</p>
                  </div>
                  
                  {/* Video Player Interface with Analytics */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-6 relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6">
                      {/* Analytics Visualization */}
                      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Pie Chart */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-center text-sm">Emissions Breakdown</h5>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={analyticsData.carbonData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={20}
                                  outerRadius={40}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {analyticsData.carbonData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-1 mt-2">
                            {analyticsData.carbonData.map((item) => (
                              <div key={item.name} className="flex items-center">
                                <div
                                  className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Bar Chart */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-center text-sm">Weekly Progress</h5>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={analyticsData.weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} />
                                <Tooltip formatter={(value) => [`${value} kg`, 'CO2 Emissions']} />
                                <Bar dataKey="emissions" fill="#22c55e" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="target" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      {/* Video Playing Indicator */}
                      {isVideoPlaying && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          AI Narrating
                        </div>
                      )}
                    </div>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <button
                          onClick={toggleVideoPlayPause}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isVideoPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                        </button>
                        
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max={videoDuration}
                            value={videoCurrentTime}
                            onChange={handleVideoSeek}
                            className="w-full slider"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={toggleVideoMute}
                            className="p-1 text-white hover:text-gray-300 transition-colors"
                          >
                            {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isVideoMuted ? 0 : videoVolume}
                            onChange={handleVideoVolumeChange}
                            className="w-16 slider"
                          />
                        </div>
                        
                        <span className="text-white text-sm">
                          {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-eco-600 dark:text-eco-400">{analyticsData.stats.totalReduction} kg</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">CO2 Saved</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{analyticsData.stats.currentStreak}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{analyticsData.stats.tokensEarned}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">EcoTokens</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">#{analyticsData.stats.globalRank}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Global Rank</div>
                    </div>
                  </div>
                  
                  {/* AI Insights */}
                  <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">AI Analysis</h5>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <p>🎯 <strong>Key Insight:</strong> Transportation accounts for 45% of your emissions - focus area for improvement</p>
                      <p>📈 <strong>Progress:</strong> You've reduced your footprint by 23% compared to last month</p>
                      <p>🏆 <strong>Achievement:</strong> Your 7-day streak puts you in the top 15% of users</p>
                      <p>💡 <strong>Recommendation:</strong> Try carpooling 2 days this week to reduce transport emissions by 40%</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleCreatePersonalizedVideo}
                    disabled={isProcessing}
                    className="btn-secondary flex items-center justify-center"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Refresh Analytics
                  </button>
                  <button className="btn-primary flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Export Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Video Dashboard</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
                    Generate an interactive video showing your sustainability progress with charts and AI voice narration
                  </p>
                  
                  <button
                    onClick={handleCreatePersonalizedVideo}
                    disabled={isProcessing}
                    className="btn-primary flex items-center mx-auto"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Video className="h-5 w-5 mr-2" />
                    )}
                    Create Analytics Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'modules' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">AI Learning Modules</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Structured learning paths powered by artificial intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {coachingModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="metric-card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{module.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h4>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>
                    <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{module.lessons} lessons</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                    </div>
                    <button className="btn-primary w-full text-sm sm:text-base">
                      Start Module
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hidden audio element for reference */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}