// import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  // Leaf, 
  TrendingDown, 
  Award, 
  Users, 
  ArrowRight,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-500/10 to-earth-500/10 rounded-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Track Your{' '}
                <span className="eco-gradient bg-clip-text text-transparent">
                  Carbon Impact
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join the global movement towards sustainable living. Track, reduce, and earn rewards 
                for your eco-friendly actions with blockchain-verified achievements and AI-powered coaching.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/dashboard"
                className="btn-primary inline-flex items-center text-lg px-8 py-4"
              >
                Start Tracking
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/ai-coach"
                className="btn-secondary inline-flex items-center text-lg px-8 py-4"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Try AI Coach
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600">
              Powered by AI, secured by blockchain, gamified for engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="metric-card group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-eco-100 rounded-lg group-hover:bg-eco-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-eco-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-eco-600 font-medium hover:text-eco-700 inline-flex items-center"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold eco-gradient bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-eco-500 to-eco-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of eco-warriors earning rewards for sustainable actions
            </p>
            <Link
              to="/register"
              className="bg-white text-eco-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-eco-50 transition-colors inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: 'Smart Carbon Tracking',
    description: 'AI-powered activity logging with real-time CO2 calculations and personalized insights.',
    icon: TrendingDown,
    link: '/logger'
  },
  {
    title: 'Blockchain Rewards',
    description: 'Earn EcoTokens and mint NFT achievements verified on the Algorand blockchain.',
    icon: Award,
    link: '/web3'
  },
  {
    title: 'AI Coach (GreenGPT)',
    description: 'Personalized coaching with voice and video AI to build sustainable habits.',
    icon: Sparkles,
    link: '/ai-coach'
  },
  {
    title: 'Social Impact',
    description: 'Connect with eco-warriors worldwide, join challenges, and climb leaderboards.',
    icon: Users,
    link: '/social'
  },
  {
    title: 'Global Community',
    description: 'Part of a worldwide movement with regional challenges and impact tracking.',
    icon: Globe,
    link: '/challenges'
  },
  {
    title: 'Gamified Experience',
    description: 'Daily challenges, streaks, and achievements make sustainability engaging.',
    icon: Zap,
    link: '/challenges'
  }
]

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '2.3M', label: 'kg CO2 Saved' },
  { value: '15K+', label: 'NFTs Minted' },
  { value: '98%', label: 'User Satisfaction' }
]