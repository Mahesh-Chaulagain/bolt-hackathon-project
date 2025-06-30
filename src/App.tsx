import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Web3Provider } from './contexts/Web3Context'
import { AIProvider } from './contexts/AIContext'
import Layout from './components/Layout'
import OnboardingTooltip from './components/OnboardingTooltip'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ActivityLogger from './pages/ActivityLogger'
import Analytics from './pages/Analytics'
import Social from './pages/Social'
import Challenges from './pages/Challenges'
import Profile from './pages/Profile'
import Web3Dashboard from './pages/Web3Dashboard'
import AICoach from './pages/AICoach'
import ClimaChat from './pages/ClimaChat'
import ClimateAwareness from './pages/ClimateAwareness'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Verify from './pages/Verify'

function App() {
  return (
    <AuthProvider>
      <Web3Provider>
        <AIProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="logger" element={<ActivityLogger />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="social" element={<Social />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="profile" element={<Profile />} />
              <Route path="web3" element={<Web3Dashboard />} />
              <Route path="ai-coach" element={<AICoach />} />
              <Route path="clima-chat" element={<ClimaChat />} />
              <Route path="climate-awareness" element={<ClimateAwareness />} />
            </Route>
          </Routes>
          <OnboardingTooltip />
        </AIProvider>
      </Web3Provider>
    </AuthProvider>
  )
}

export default App