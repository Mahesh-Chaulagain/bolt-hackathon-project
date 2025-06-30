import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react'
import { useOnboarding } from '../contexts/OnboardingContext'
import { useLocation } from 'react-router-dom'

export default function OnboardingTooltip() {
  const { 
    isOnboardingActive, 
    currentStep, 
    steps, 
    nextStep, 
    prevStep, 
    skipOnboarding 
  } = useOnboarding()
  
  const location = useLocation()
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (!isOnboardingActive || !currentStepData) {
      setIsVisible(false)
      // Remove highlight from all elements
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight')
      })
      return
    }

    // Check if we're on the correct page for this step
    if (currentStepData.page !== location.pathname) {
      setIsVisible(false)
      return
    }

    // Wait a bit for the page to render
    const timer = setTimeout(() => {
      // Find the target element
      const targetElement = document.querySelector(currentStepData.target)
      if (!targetElement) {
        console.log('Target element not found:', currentStepData.target)
        setIsVisible(false)
        return
      }

      // Calculate position
      const rect = targetElement.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

      let top = 0
      let left = 0

      switch (currentStepData.position) {
        case 'top':
          top = rect.top + scrollTop - 10
          left = rect.left + scrollLeft + rect.width / 2
          break
        case 'bottom':
          top = rect.bottom + scrollTop + 10
          left = rect.left + scrollLeft + rect.width / 2
          break
        case 'left':
          top = rect.top + scrollTop + rect.height / 2
          left = rect.left + scrollLeft - 10
          break
        case 'right':
          top = rect.top + scrollTop + rect.height / 2
          left = rect.right + scrollLeft + 10
          break
      }

      // Ensure tooltip stays within viewport
      const tooltipWidth = 350
      const tooltipHeight = 250
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Adjust horizontal position
      if (left + tooltipWidth > viewportWidth) {
        left = viewportWidth - tooltipWidth - 20
      }
      if (left < 20) {
        left = 20
      }

      // Adjust vertical position - keep tooltip visible in viewport
      const maxTop = Math.max(scrollTop + 20, viewportHeight + scrollTop - tooltipHeight - 20)
      const minTop = scrollTop + 20
      
      if (top + tooltipHeight > maxTop) {
        top = maxTop
      }
      if (top < minTop) {
        top = minTop
      }

      setTooltipPosition({ top, left })
      setIsVisible(true)

      // Remove highlight from all elements first
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight')
      })

      // Add highlight to target element
      targetElement.classList.add('onboarding-highlight')
      
      // Scroll element into view if needed - but keep tooltip visible
      const elementRect = targetElement.getBoundingClientRect()
      const isElementVisible = elementRect.top >= 0 && 
                              elementRect.bottom <= viewportHeight &&
                              elementRect.left >= 0 && 
                              elementRect.right <= viewportWidth

      if (!isElementVisible) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        })
      }
    }, 800) // Wait 800ms for page to render

    return () => {
      clearTimeout(timer)
    }
  }, [isOnboardingActive, currentStep, currentStepData, location.pathname])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight')
      })
    }
  }, [])

  if (!isOnboardingActive || !isVisible || !currentStepData) {
    return null
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none" />
      
      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-80 sm:w-96 max-w-sm"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: currentStepData.position === 'left' ? 'translateX(-100%)' : 
                      currentStepData.position === 'right' ? 'translateX(0)' :
                      'translateX(-50%)'
          }}
        >
          {/* Close button */}
          <button
            onClick={skipOnboarding}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors touch-button"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-eco-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-button"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Back
            </button>

            <button
              onClick={skipOnboarding}
              className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors touch-button"
            >
              <SkipForward className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Skip
            </button>

            <button
              onClick={nextStep}
              className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-eco-500 text-white text-xs sm:text-sm rounded-lg hover:bg-eco-600 transition-colors touch-button"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              {currentStep !== steps.length - 1 && <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />}
            </button>
          </div>

          {/* Arrow pointer */}
          <div 
            className={`absolute w-3 h-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform rotate-45 ${
              currentStepData.position === 'top' ? '-bottom-1.5 left-1/2 -translate-x-1/2' :
              currentStepData.position === 'bottom' ? '-top-1.5 left-1/2 -translate-x-1/2' :
              currentStepData.position === 'left' ? '-right-1.5 top-1/2 -translate-y-1/2' :
              '-left-1.5 top-1/2 -translate-y-1/2'
            }`}
          />
        </motion.div>
      </AnimatePresence>
    </>
  )
}