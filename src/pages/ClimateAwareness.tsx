import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Thermometer, 
  CloudRain, 
  Wind, 
  // Zap,
  TreePine,
  // Factory,
  // Car,
  // Home,
  // TrendingUp,
  // TrendingDown,
  AlertTriangle,
  // Info,
  // Target,
  // MapPin,
  // Building,
  Newspaper,
  Clock,
  ExternalLink,
  RefreshCw,
  // Calendar,
  Lightbulb
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ClimateAwareness() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentData, setCurrentData] = useState<any>(null)
  const [newsData, setNewsData] = useState<any[]>([])
  const [loadingNews, setLoadingNews] = useState(false)
  const [climateFacts, setClimateFacts] = useState<any[]>([])
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [expandedFact, setExpandedFact] = useState<number | null>(null)

  useEffect(() => {
    loadClimateData()
    loadClimateFacts()
    if (activeTab === 'news') {
      loadNewsData()
    }
  }, [activeTab])

  // Rotate climate facts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % climateFacts.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [climateFacts.length])

  const loadClimateData = () => {
    setCurrentData({
      globalTemp: 1.1,
      co2Level: 421.5,
      seaLevel: 3.4,
      arcticIce: -13.1,
      lastUpdated: new Date().toISOString()
    })
  }

  const loadNewsData = async () => {
    setLoadingNews(true)
    try {
      // Simulate news data (in real app, would fetch from RSS feeds)
      const mockNews = [
        {
          id: 1,
          title: "Global CO2 Levels Reach Record High of 421.5 ppm",
          summary: "Atmospheric carbon dioxide concentrations continue to rise despite climate commitments...",
          source: "NASA Climate",
          publishedAt: "2024-01-15T10:30:00Z",
          url: "https://climate.nasa.gov/news/",
          category: "atmospheric"
        },
        {
          id: 2,
          title: "Arctic Sea Ice Hits Second-Lowest Winter Maximum on Record",
          summary: "Scientists report concerning trends in polar ice coverage affecting global weather patterns...",
          source: "The Guardian Environment",
          publishedAt: "2024-01-15T08:15:00Z",
          url: "https://www.theguardian.com/environment",
          category: "ice"
        },
        {
          id: 3,
          title: "UN Climate Report: Urgent Action Needed to Limit Warming to 1.5°C",
          summary: "Latest IPCC findings emphasize the critical window for climate action is rapidly closing...",
          source: "UN Climate News",
          publishedAt: "2024-01-14T16:45:00Z",
          url: "https://unfccc.int/news",
          category: "policy"
        },
        {
          id: 4,
          title: "Renewable Energy Capacity Grows 260 GW in 2023",
          summary: "Global renewable energy installations continue to accelerate, offering hope for emissions reduction...",
          source: "Climate Central",
          publishedAt: "2024-01-14T14:20:00Z",
          url: "https://www.climatecentral.org/",
          category: "energy"
        },
        {
          id: 5,
          title: "Ocean Temperatures Break Records for Fifth Consecutive Year",
          summary: "Marine heat waves and rising sea temperatures threaten ecosystems worldwide...",
          source: "NOAA Climate",
          publishedAt: "2024-01-14T11:30:00Z",
          url: "https://www.climate.gov/news-features",
          category: "ocean"
        }
      ]
      
      setNewsData(mockNews)
    } catch (error) {
      console.error('Error loading news data:', error)
    } finally {
      setLoadingNews(false)
    }
  }

  const loadClimateFacts = () => {
    const facts = [
      {
        id: 1,
        fact: "A single round-trip flight from NYC to London emits ~1.5 tons CO₂ per person.",
        explanation: "Aviation accounts for about 2.5% of global CO2 emissions, but its impact is growing rapidly. The high altitude of aircraft emissions makes them particularly potent for climate change. One transatlantic flight can emit as much CO2 as many people produce in an entire year through other activities.",
        category: "transportation",
        impact: "high"
      },
      {
        id: 2,
        fact: "The last decade was the warmest on record, with 2023 being the hottest year ever measured.",
        explanation: "Global temperature records show an unmistakable warming trend. The past decade has seen unprecedented heat waves, droughts, and extreme weather events. This warming is primarily driven by human activities, particularly the burning of fossil fuels.",
        category: "temperature",
        impact: "critical"
      },
      {
        id: 3,
        fact: "Switching to a plant-based diet can reduce your food carbon footprint by up to 73%.",
        explanation: "Animal agriculture is responsible for about 14.5% of global greenhouse gas emissions. Beef production is particularly carbon-intensive, requiring large amounts of land, water, and feed. Plant-based alternatives typically have a much lower environmental impact.",
        category: "food",
        impact: "high"
      },
      {
        id: 4,
        fact: "Arctic sea ice is declining at a rate of 13% per decade.",
        explanation: "The Arctic is warming twice as fast as the global average, causing rapid ice loss. This creates a feedback loop: less ice means less sunlight reflected back to space, leading to more warming. Arctic ice loss affects global weather patterns and sea levels.",
        category: "ice",
        impact: "critical"
      },
      {
        id: 5,
        fact: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.",
        explanation: "Lighting accounts for about 15% of global electricity consumption. Switching to LED technology is one of the most cost-effective ways to reduce energy use. If everyone switched to LEDs, we could reduce global lighting energy use by more than half.",
        category: "energy",
        impact: "medium"
      },
      {
        id: 6,
        fact: "The ocean has absorbed about 30% of human-produced CO2, making it 30% more acidic.",
        explanation: "Ocean acidification is often called 'the other CO2 problem.' As seawater absorbs CO2, it becomes more acidic, threatening marine ecosystems, especially coral reefs and shellfish. This process is happening faster than at any time in the last 300 million years.",
        category: "ocean",
        impact: "critical"
      }
    ]
    setClimateFacts(facts)
  }

  // Climate countdown calculations
  const calculateCountdowns = () => {
    const carbonBudgetExhaustion = new Date('2030-01-01') // Simplified estimate
    const parisAgreementDeadline = new Date('2030-12-31')
    const now = new Date()

    const carbonBudgetDays = Math.max(0, Math.floor((carbonBudgetExhaustion.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    const parisAgreementDays = Math.max(0, Math.floor((parisAgreementDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

    return {
      carbonBudget: {
        days: carbonBudgetDays,
        years: Math.floor(carbonBudgetDays / 365),
        months: Math.floor((carbonBudgetDays % 365) / 30)
      },
      parisAgreement: {
        days: parisAgreementDays,
        years: Math.floor(parisAgreementDays / 365),
        months: Math.floor((parisAgreementDays % 365) / 30)
      }
    }
  }

  const countdowns = calculateCountdowns()

  // Mock climate data (same as before)
  const temperatureData = [
    { year: '1880', temp: -0.2, baseline: 0 },
    { year: '1900', temp: -0.1, baseline: 0 },
    { year: '1920', temp: -0.15, baseline: 0 },
    { year: '1940', temp: 0.05, baseline: 0 },
    { year: '1960', temp: -0.05, baseline: 0 },
    { year: '1980', temp: 0.3, baseline: 0 },
    { year: '2000', temp: 0.6, baseline: 0 },
    { year: '2020', temp: 1.0, baseline: 0 },
    { year: '2024', temp: 1.1, baseline: 0 }
  ]

  const co2Data = [
    { year: '1960', co2: 315, target: 350 },
    { year: '1970', co2: 325, target: 350 },
    { year: '1980', co2: 340, target: 350 },
    { year: '1990', co2: 355, target: 350 },
    { year: '2000', co2: 370, target: 350 },
    { year: '2010', co2: 390, target: 350 },
    { year: '2020', co2: 415, target: 350 },
    { year: '2024', co2: 421.5, target: 350 }
  ]

  // const emissionsSources = [
  //   { source: 'Energy', percentage: 73.2, color: '#ef4444', icon: Zap },
  //   { source: 'Agriculture', percentage: 18.4, color: '#22c55e', icon: TreePine },
  //   { source: 'Industrial', percentage: 5.2, color: '#f97316', icon: Factory },
  //   { source: 'Waste', percentage: 3.2, color: '#8b5cf6', icon: Home }
  // ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transportation': return '✈️'
      case 'temperature': return '🌡️'
      case 'food': return '🌱'
      case 'ice': return '🧊'
      case 'energy': return '💡'
      case 'ocean': return '🌊'
      default: return '🌍'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-green-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Climate Awareness</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Stay informed about our planet's climate crisis with real-time data, breaking news, and actionable insights.
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
              { id: 'overview', name: 'Overview', icon: Globe },
              { id: 'news', name: 'Live News', icon: Newspaper },
              { id: 'facts', name: 'Climate Facts', icon: Lightbulb },
              { id: 'countdown', name: 'Climate Clock', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Current Climate Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="metric-card text-center"
            >
              <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-lg w-fit mx-auto mb-3">
                <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">+{currentData?.globalTemp}°C</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Global Temperature Rise</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Since pre-industrial times</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="metric-card text-center"
            >
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-3">
                <Wind className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{currentData?.co2Level} ppm</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Atmospheric CO2</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Highest in 3 million years</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="metric-card text-center"
            >
              <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-3">
                <CloudRain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">+{currentData?.seaLevel} mm</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Sea Level Rise</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Per year average</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="metric-card text-center"
            >
              <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-3">
                <TreePine className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{currentData?.arcticIce}%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Arctic Ice Decline</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Per decade</div>
            </motion.div>
          </div>

          {/* Climate Data Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Temperature Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="metric-card"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Global Temperature Anomaly</h3>
              
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value}°C`, 'Temperature Anomaly']} />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#ef4444"
                      fill="#fef2f2"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="#6b7280"
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* CO2 Levels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="metric-card"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Atmospheric CO2 Concentration
              </h3>
              
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={co2Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} ppm`, 'CO2 Level']} />
                    <Line
                      type="monotone"
                      dataKey="co2"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#22c55e"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-300">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  Current CO2 levels are 50% higher than pre-industrial levels and rising rapidly.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeTab === 'news' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Newspaper className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Climate News Today
            </h3>
            <button
              onClick={loadNewsData}
              disabled={loadingNews}
              className="flex items-center px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loadingNews ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loadingNews ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="metric-card animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {newsData.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="metric-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{getCategoryIcon(article.category)}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{article.source}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{article.summary}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        Read full article
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'facts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
            Did You Know?
          </h3>

          {/* Featured Fact */}
          <motion.div
            key={currentFactIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="metric-card bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-l-4 border-blue-500"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{getCategoryIcon(climateFacts[currentFactIndex]?.category)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(climateFacts[currentFactIndex]?.impact)}`}>
                    {climateFacts[currentFactIndex]?.impact} impact
                  </span>
                  <div className="flex space-x-1">
                    {climateFacts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentFactIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {climateFacts[currentFactIndex]?.fact}
                </p>
                <button
                  onClick={() => setExpandedFact(expandedFact === currentFactIndex ? null : currentFactIndex)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  {expandedFact === currentFactIndex ? 'Show less' : 'Learn more'}
                </button>
                {expandedFact === currentFactIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {climateFacts[currentFactIndex]?.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* All Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {climateFacts.map((fact, index) => (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`metric-card cursor-pointer transition-all ${
                  index === currentFactIndex ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setCurrentFactIndex(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getCategoryIcon(fact.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(fact.impact)}`}>
                        {fact.impact}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {fact.fact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'countdown' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
            Climate Clock
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Carbon Budget Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="metric-card bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500"
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4">
                  Carbon Budget Exhaustion
                </h4>
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {countdowns.carbonBudget.years}y {countdowns.carbonBudget.months}m
                </div>
                <div className="text-sm text-red-700 dark:text-red-400 mb-4">
                  {countdowns.carbonBudget.days.toLocaleString()} days remaining
                </div>
                <p className="text-xs text-red-800 dark:text-red-300">
                  Time left to stay within 1.5°C warming budget at current emission rates
                </p>
              </div>
            </motion.div>

            {/* Paris Agreement Deadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="metric-card bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-l-4 border-blue-500"
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
                  Paris Agreement Target
                </h4>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {countdowns.parisAgreement.years}y {countdowns.parisAgreement.months}m
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                  {countdowns.parisAgreement.days.toLocaleString()} days to 2030
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  Deadline for 45% emission reduction to limit warming to 1.5°C
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action Urgency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="metric-card"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Time Matters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-sm font-medium text-red-800 dark:text-red-300">Temperature Rise</div>
                <div className="text-xs text-red-700 dark:text-red-400 mt-1">
                  Every 0.1°C matters for extreme weather
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl mb-2">🧊</div>
                <div className="text-sm font-medium text-orange-800 dark:text-orange-300">Ice Loss</div>
                <div className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                  Irreversible tipping points approaching
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">🌊</div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Sea Level</div>
                <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Coastal cities at increasing risk
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Data Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400"
      >
        <p className="mb-2">Data sources: NASA GISS, NOAA, IPCC, Global Carbon Atlas, IEA</p>
        <p>Last updated: {currentData?.lastUpdated ? new Date(currentData.lastUpdated).toLocaleString() : 'Loading...'}</p>
      </motion.div>
    </div>
  )
}