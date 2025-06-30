import React, { createContext, useContext, useState } from 'react'
import { AIService } from '../services/ai'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface AIContextType {
  aiService: AIService
  isProcessing: boolean
  getPersonalizedTips: (userData: any) => Promise<string[]>
  generateVoiceCoaching: (text: string) => Promise<string>
  createPersonalizedVideo: (script: string, userData: any) => Promise<string>
  analyzeHabits: (activities: any[]) => Promise<any>
  getChatResponse: (message: string, context: any) => Promise<string>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

export function AIProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [aiService] = useState(() => new AIService())
  const [isProcessing, setIsProcessing] = useState(false)

  const getPersonalizedTips = async (userData: any) => {
    setIsProcessing(true)
    try {
      const tips = await aiService.generatePersonalizedTips(userData)
      return tips
    } catch (error) {
      console.error('Error getting personalized tips:', error)
      toast.error('Failed to generate personalized tips')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const generateVoiceCoaching = async (text: string) => {
    setIsProcessing(true)
    try {
      const audioUrl = await aiService.generateVoiceCoaching(text)
      return audioUrl
    } catch (error) {
      console.error('Error generating voice coaching:', error)
      toast.error('Failed to generate voice coaching')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const createPersonalizedVideo = async (script: string, userData: any) => {
    setIsProcessing(true)
    try {
      const videoUrl = await aiService.createPersonalizedVideo(script, userData)
      return videoUrl
    } catch (error) {
      console.error('Error creating personalized video:', error)
      toast.error('Failed to create personalized video')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const analyzeHabits = async (activities: any[]) => {
    setIsProcessing(true)
    try {
      const analysis = await aiService.analyzeUserHabits(activities)
      return analysis
    } catch (error) {
      console.error('Error analyzing habits:', error)
      toast.error('Failed to analyze habits')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const getChatResponse = async (message: string, context: any) => {
    setIsProcessing(true)
    try {
      const response = await aiService.getChatResponse(message, context)
      return response
    } catch (error) {
      console.error('Error getting chat response:', error)
      toast.error('Failed to get chat response')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const value = {
    aiService,
    isProcessing,
    getPersonalizedTips,
    generateVoiceCoaching,
    createPersonalizedVideo,
    analyzeHabits,
    getChatResponse,
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}