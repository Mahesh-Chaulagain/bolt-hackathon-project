import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, RefreshCw, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { user, signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendingConfirmation, setIsResendingConfirmation] = useState(false)
  const [error, setError] = useState('')
  const [showEmailNotConfirmed, setShowEmailNotConfirmed] = useState(false)
  
  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [passwordResetSent, setPasswordResetSent] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleResendConfirmation = async () => {
    if (!email) {
      toast.error('Please enter your email address first')
      return
    }

    setIsResendingConfirmation(true)
    try {
      const { supabase } = await import('../lib/supabase')
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        throw error
      }

      toast.success('Confirmation email sent! Please check your inbox.')
      setShowEmailNotConfirmed(false)
      setError('')
    } catch (error: any) {
      console.error('Resend confirmation error:', error)
      toast.error('Failed to resend confirmation email. Please try again.')
    } finally {
      setIsResendingConfirmation(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast.error('Please enter your email address')
      return
    }

    setIsResettingPassword(true)
    try {
      const { supabase } = await import('../lib/supabase')
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      setPasswordResetSent(true)
      toast.success('Password reset email sent! Please check your inbox.')
    } catch (error: any) {
      console.error('Password reset error:', error)
      toast.error('Failed to send password reset email. Please try again.')
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setShowEmailNotConfirmed(false)

    try {
      await signIn(email, password)
      toast.success('Welcome back to EcoMeter!')
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Handle specific authentication errors
      if (error.message?.includes('Email not confirmed') || 
          error.message?.includes('email_not_confirmed')) {
        setError('Your email address has not been confirmed yet. Please check your inbox (including spam folder) for a confirmation email from EcoMeter.')
        setShowEmailNotConfirmed(true)
        toast.error('Email not confirmed')
      } else if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('invalid_credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.')
        toast.error('Invalid email or password')
      } else if (error.message?.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment before trying again.')
        toast.error('Too many attempts')
      } else {
        setError('An error occurred during sign in. Please try again.')
        toast.error(error.message || 'Failed to sign in')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eco-500"></div>
      </div>
    )
  }

  // Forgot Password Screen
  if (showForgotPassword) {
    if (passwordResetSent) {
      return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We've sent a password reset link to:
              </p>
              <div className="bg-eco-50 dark:bg-eco-900/20 border border-eco-200 dark:border-eco-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-eco-600 dark:text-eco-400 mr-2" />
                  <span className="font-medium text-eco-800 dark:text-eco-300">{forgotPasswordEmail}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Please click the reset link in your email to create a new password. 
                Don't forget to check your spam folder if you don't see it in your inbox.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowForgotPassword(false)
                    setPasswordResetSent(false)
                    setForgotPasswordEmail('')
                  }}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </button>
                <button
                  onClick={handleForgotPassword}
                  disabled={isResettingPassword}
                  className="btn-secondary w-full flex items-center justify-center"
                >
                  {isResettingPassword ? (
                    <>
                      <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Reset Email
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Leaf className="h-12 w-12 text-eco-500" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Reset Your Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a reset link
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleForgotPassword()
            }}
          >
            <div>
              <label htmlFor="forgot-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isResettingPassword}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-eco-600 hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResettingPassword ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false)
                  setForgotPasswordEmail('')
                }}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-eco-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <Leaf className="h-12 w-12 text-eco-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to EcoMeter
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start your sustainability journey
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3 flex-1">
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                  {showEmailNotConfirmed && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={handleResendConfirmation}
                        disabled={isResendingConfirmation}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResendingConfirmation ? (
                          <>
                            <RefreshCw className="animate-spin -ml-1 mr-2 h-3 w-3" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail className="-ml-1 mr-2 h-3 w-3" />
                            Resend confirmation email
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                    setShowEmailNotConfirmed(false)
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                    setShowEmailNotConfirmed(false)
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true)
                  setForgotPasswordEmail(email)
                }}
                className="font-medium text-eco-600 dark:text-eco-400 hover:text-eco-500 dark:hover:text-eco-300 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-eco-600 hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-eco-600 dark:text-eco-400 hover:text-eco-500 dark:hover:text-eco-300"
              >
                Sign up for free
              </Link>
            </span>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-eco-600 dark:text-eco-400 hover:text-eco-500 dark:hover:text-eco-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-eco-600 dark:text-eco-400 hover:text-eco-500 dark:hover:text-eco-300">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}