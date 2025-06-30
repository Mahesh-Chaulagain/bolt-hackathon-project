import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  // Leaf,
  TrendingUp,
  Lightbulb,
  // Heart,
  ThumbsUp,
  ThumbsDown,
  Loader
} from 'lucide-react'
import { useAI } from '../contexts/AIContext'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  liked?: boolean
  disliked?: boolean
}

export default function ClimaChat() {
  const { getChatResponse, isProcessing } = useAI()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm GreenGPT, your AI sustainability companion. I'm here to help you on your eco-friendly journey. Whether you need tips for reducing your carbon footprint, advice on sustainable living, or just want to chat about environmental topics, I'm here to help! What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage.trim()
    setInputMessage('')

    try {
      // Create comprehensive context for AI response
      const context = {
        recentMessages: messages.slice(-5),
        userGoals: ['reduce_carbon', 'sustainable_living'],
        currentStreak: 7,
        userEmail: user?.email,
        messageHistory: messages.filter(m => m.type === 'user').slice(-3).map(m => m.content)
      }

      const aiResponse = await getChatResponse(currentInput, context)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      toast.success('Response generated!')
    } catch (error) {
      console.error('Failed to get AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble responding right now. Please try asking your question again, or try asking about specific topics like 'How can I reduce my carbon footprint?' or 'What are some sustainable transportation options?'",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error('Failed to get response. Please try again.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMessageReaction = (messageId: string, reaction: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const newMsg = {
          ...msg,
          liked: reaction === 'like' ? !msg.liked : false,
          disliked: reaction === 'dislike' ? !msg.disliked : false
        }
        
        // Show feedback toast
        if (reaction === 'like' && newMsg.liked) {
          toast.success('Thanks for the feedback!')
        } else if (reaction === 'dislike' && newMsg.disliked) {
          toast('We\'ll improve our responses', { icon: '📝' })
        }
        
        return newMsg
      }
      return msg
    }))
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
    // Focus the input after setting the message
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const quickPrompts = [
    "How can I reduce my carbon footprint?",
    "What are some easy sustainable swaps?",
    "Tips for eco-friendly transportation?",
    "How to start composting at home?",
    "Best renewable energy options?",
    "Sustainable fashion advice?"
  ]

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-eco-600 rounded-2xl p-4 sm:p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full p-2 sm:p-3 flex-shrink-0">
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">ClimaChat</h1>
            <p className="text-green-100 text-sm sm:text-base">
              Chat with GreenGPT • Your AI sustainability coach
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 min-h-0">
        {/* Chat Area */}
        <div className="xl:col-span-3 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[600px] lg:min-h-[700px]">
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-eco-600 rounded-full p-2 flex-shrink-0">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">GreenGPT</h3>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="truncate">Online • AI Sustainability Coach</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-[85%] sm:max-w-[75%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-eco-500' 
                      : 'bg-gradient-to-br from-green-500 to-eco-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                    message.type === 'user'
                      ? 'bg-eco-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-eco-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleMessageReaction(message.id, 'like')}
                          className={`p-1 rounded-full transition-colors touch-button ${
                            message.liked ? 'bg-green-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleMessageReaction(message.id, 'dislike')}
                          className={`p-1 rounded-full transition-colors touch-button ${
                            message.disliked ? 'bg-red-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3 max-w-[75%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-eco-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin text-eco-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">GreenGPT is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex space-x-2 sm:space-x-3 items-end">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about sustainability..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 text-sm sm:text-base resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isProcessing}
                  maxLength={500}
                />
                <div className="absolute right-3 bottom-2 text-xs text-gray-400 dark:text-gray-500">
                  {inputMessage.length}/500
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
                className="bg-eco-500 text-white p-2 sm:p-3 rounded-full hover:bg-eco-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-button flex-shrink-0"
              >
                {isProcessing ? (
                  <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Responsive */}
        <div className="xl:col-span-1 space-y-4 sm:space-y-6 flex-shrink-0">
          {/* Quick Prompts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-eco-600 dark:text-eco-400" />
              Quick Prompts
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-eco-50 dark:hover:bg-eco-900/20 rounded-lg transition-colors touch-button text-gray-700 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chat Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Chat Insights
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Messages Today</span>
                <span className="font-semibold text-gray-900 dark:text-white">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Topics Discussed</span>
                <span className="font-semibold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tips Received</span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Satisfaction</span>
                <span className="font-semibold text-green-600 dark:text-green-400">95%</span>
              </div>
            </div>
          </motion.div>

          {/* Popular Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
              Popular Topics
            </h3>
            <div className="space-y-3">
              {[
                { topic: 'Carbon Footprint', icon: '🌍', count: 234 },
                { topic: 'Renewable Energy', icon: '⚡', count: 189 },
                { topic: 'Sustainable Food', icon: '🌱', count: 156 },
                { topic: 'Eco Transportation', icon: '🚲', count: 142 },
                { topic: 'Zero Waste', icon: '♻️', count: 98 }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(`Tell me about ${item.topic.toLowerCase()}`)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer touch-button transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.topic}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{item.count}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}