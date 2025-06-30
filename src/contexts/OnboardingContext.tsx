import React, { createContext, useContext, useState,} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  page: string
}

interface OnboardingContextType {
  isOnboardingActive: boolean
  currentStep: number
  steps: OnboardingStep[]
  startOnboarding: () => void
  nextStep: () => void
  prevStep: () => void
  skipOnboarding: () => void
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to EcoMeter! 🌱',
    description: 'Track your carbon footprint, earn rewards, and make a positive impact on the planet. Let me show you around!',
    target: '.eco-logo',
    position: 'bottom',
    page: '/dashboard'
  },
  {
    id: 'dashboard',
    title: 'Your Dashboard',
    description: 'Here you can see your daily footprint, current streak, and key sustainability metrics at a glance.',
    target: '.dashboard-metrics',
    position: 'bottom',
    page: '/dashboard'
  },
  {
    id: 'activity-logger',
    title: 'Log Your Activities',
    description: 'Click here to track transportation, energy use, food choices, and more to calculate your CO2 impact.',
    target: '[href="/logger"]',
    position: 'right',
    page: '/dashboard'
  },
  {
    id: 'ai-coach',
    title: 'AI-Powered Coaching',
    description: 'Get personalized tips, voice coaching, and video insights from GreenGPT, your AI sustainability coach.',
    target: '[href="/ai-coach"]',
    position: 'right',
    page: '/dashboard'
  },
  {
    id: 'challenges',
    title: 'Join Challenges',
    description: 'Complete daily, weekly, and special challenges to earn EcoTokens and NFT rewards.',
    target: '[href="/challenges"]',
    position: 'right',
    page: '/dashboard'
  },
  {
    id: 'web3',
    title: 'Web3 Features',
    description: 'Connect your wallet to earn EcoTokens and mint achievement NFTs on the Algorand blockchain.',
    target: '[href="/web3"]',
    position: 'right',
    page: '/dashboard'
  },
  {
    id: 'climate-awareness',
    title: 'Climate Awareness',
    description: 'Learn about global climate data, trends, and solutions to stay informed about our planet.',
    target: '[href="/climate-awareness"]',
    position: 'right',
    page: '/dashboard'
  }
]

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  // const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
  //   return localStorage.getItem('onboardingCompleted') === 'true'
  // })
  
  const location = useLocation()
  const navigate = useNavigate()

  const startOnboarding = () => {
    setCurrentStep(0)
    setIsOnboardingActive(true)
    // setHasCompletedOnboarding(false)
    localStorage.removeItem('onboardingCompleted')
    // Navigate to dashboard if not already there
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard')
    }
  }

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStepData = onboardingSteps[currentStep + 1]
      setCurrentStep(currentStep + 1)
      
      // Navigate to the required page for the next step
      if (nextStepData.page !== location.pathname) {
        navigate(nextStepData.page)
      }
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepData = onboardingSteps[currentStep - 1]
      setCurrentStep(currentStep - 1)
      
      // Navigate to the required page for the previous step
      if (prevStepData.page !== location.pathname) {
        navigate(prevStepData.page)
      }
    }
  }

  const skipOnboarding = () => {
    setIsOnboardingActive(false)
    completeOnboarding()
  }

  const completeOnboarding = () => {
    setIsOnboardingActive(false)
    // setHasCompletedOnboarding(true)
    localStorage.setItem('onboardingCompleted', 'true')
  }

  const value = {
    isOnboardingActive,
    currentStep,
    steps: onboardingSteps,
    startOnboarding,
    nextStep,
    prevStep,
    skipOnboarding,
    completeOnboarding
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}