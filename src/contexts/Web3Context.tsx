import React, { createContext, useContext, useState, useEffect } from 'react'
import { AlgorandService } from '../services/algorand'
import { useAuth } from './AuthContext'

interface Web3ContextType {
  algorandService: AlgorandService | null
  walletAddress: string | null
  ecoTokenBalance: number
  nftCollection: any[]
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  mintNFT: (achievementData: any) => Promise<string>
  transferTokens: (amount: number, recipient: string) => Promise<void>
  loading: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [algorandService, setAlgorandService] = useState<AlgorandService | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [ecoTokenBalance, setEcoTokenBalance] = useState(0)
  const [nftCollection, setNftCollection] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const service = new AlgorandService()
      setAlgorandService(service)
    }
  }, [user])

  const connectWallet = async () => {
    if (!algorandService) return
    
    setLoading(true)
    try {
      const address = await algorandService.connectWallet()
      setWalletAddress(address)
      setIsConnected(true)
      
      // Load user's tokens and NFTs
      await loadWalletData(address)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    setEcoTokenBalance(0)
    setNftCollection([])
  }

  const loadWalletData = async (address: string) => {
    if (!algorandService) return
    
    try {
      const balance = await algorandService.getEcoTokenBalance(address)
      setEcoTokenBalance(balance)
      
      const nfts = await algorandService.getUserNFTs(address)
      setNftCollection(nfts)
    } catch (error) {
      console.error('Failed to load wallet data:', error)
    }
  }

  const mintNFT = async (achievementData: any) => {
    if (!algorandService || !walletAddress) {
      throw new Error('Wallet not connected')
    }
    
    setLoading(true)
    try {
      const nftId = await algorandService.mintAchievementNFT(walletAddress, achievementData)
      await loadWalletData(walletAddress)
      return nftId
    } catch (error) {
      console.error('Failed to mint NFT:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const transferTokens = async (amount: number, recipient: string) => {
    if (!algorandService || !walletAddress) {
      throw new Error('Wallet not connected')
    }
    
    setLoading(true)
    try {
      await algorandService.transferEcoTokens(walletAddress, recipient, amount)
      await loadWalletData(walletAddress)
    } catch (error) {
      console.error('Failed to transfer tokens:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    algorandService,
    walletAddress,
    ecoTokenBalance,
    nftCollection,
    isConnected,
    connectWallet,
    disconnectWallet,
    mintNFT,
    transferTokens,
    loading,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}