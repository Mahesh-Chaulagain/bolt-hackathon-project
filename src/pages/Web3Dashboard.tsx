import  { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  Coins, 
  Award, 
  Send, 
  Download,
  ExternalLink,
  Copy,
  Sparkles,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react'
import { useWeb3 } from '../contexts/Web3Context'
import toast from 'react-hot-toast'

export default function Web3Dashboard() {
  const { 
    isConnected, 
    walletAddress, 
    ecoTokenBalance, 
    nftCollection, 
    connectWallet, 
    disconnectWallet,
    mintNFT,
    transferTokens,
    loading 
  } = useWeb3()

  const [activeTab, setActiveTab] = useState('overview')
  const [transferAmount, setTransferAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast.success('Address copied to clipboard!')
    }
  }

  const handleMintAchievement = async () => {
    try {
      const achievementData = {
        title: 'Eco Warrior',
        description: 'Completed 30 days of sustainable living',
        imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
      await mintNFT(achievementData)
      toast.success('NFT minted successfully!')
    } catch (error) {
      toast.error('Failed to mint NFT')
    }
  }

  const handleTransfer = async () => {
    if (!transferAmount || !recipientAddress) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await transferTokens(parseFloat(transferAmount), recipientAddress)
      toast.success('Tokens transferred successfully!')
      setTransferAmount('')
      setRecipientAddress('')
    } catch (error) {
      toast.error('Failed to transfer tokens')
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Wallet className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Connect Your Wallet</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Connect your Algorand wallet to access Web3 features, earn EcoTokens, and mint achievement NFTs
          </p>
          <button
            onClick={connectWallet}
            disabled={loading}
            className="btn-primary flex items-center mx-auto"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Wallet className="h-5 w-5 mr-2" />
            )}
            Connect Wallet
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Supports Algorand wallets including Pera Wallet and MyAlgo
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Web3 Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your EcoTokens, NFTs, and blockchain achievements
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="bg-eco-50 dark:bg-eco-900/30 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-eco-700 dark:text-eco-300">Connected</span>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="btn-secondary"
          >
            Disconnect
          </button>
        </div>
      </motion.div>

      {/* Wallet Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-eco-500 to-eco-600 dark:from-eco-600 dark:to-eco-700 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Algorand Wallet</h3>
            <div className="flex items-center space-x-2">
              <span className="text-eco-100 font-mono text-sm">
                {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-8)}
              </span>
              <button
                onClick={handleCopyAddress}
                className="text-eco-100 hover:text-white transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{ecoTokenBalance}</div>
            <div className="text-eco-100">EcoTokens</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-medium">NFTs Owned</span>
            </div>
            <div className="text-2xl font-bold">{nftCollection.length}</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="font-medium">Token Value</span>
            </div>
            <div className="text-2xl font-bold">$0.12</div>
            <div className="text-sm text-eco-100">per ECO</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Verified</span>
            </div>
            <div className="text-sm">Blockchain secured</div>
          </div>
        </div>
      </motion.div>

      {/* Horizontal Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'tokens', name: 'EcoTokens', icon: Coins },
              { id: 'nfts', name: 'NFT Collection', icon: Award },
              { id: 'transfer', name: 'Transfer', icon: Send }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-eco-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-eco-600 dark:hover:text-eco-400'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Token Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Earned Tokens</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Daily challenge completion</div>
                  </div>
                </div>
                <div className="text-green-600 dark:text-green-400 font-bold">+50 ECO</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">NFT Minted</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Green Commuter achievement</div>
                  </div>
                </div>
                <div className="text-blue-600 dark:text-blue-400 font-bold">-100 ECO</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Challenge Reward</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Zero Waste Week</div>
                  </div>
                </div>
                <div className="text-purple-600 dark:text-purple-400 font-bold">+500 ECO</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button
                onClick={handleMintAchievement}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Sparkles className="h-5 w-5 mr-2" />
                )}
                Mint Achievement NFT
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                Export Transaction History
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                View on Algorand Explorer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'tokens' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">EcoToken Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-eco-50 dark:bg-eco-900/20 rounded-lg">
              <div className="text-3xl font-bold text-eco-600 dark:text-eco-400 mb-2">{ecoTokenBalance}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Balance</div>
            </div>
            
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2,450</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Earned</div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,203</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">How to Earn EcoTokens</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-eco-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">50</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Daily Challenges</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Complete eco-friendly tasks</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">100</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Weekly Goals</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Meet reduction targets</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">500</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Group Challenges</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Participate with friends</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">1K</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Special Events</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Limited-time challenges</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'nfts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">NFT Collection</h3>
          
          {nftCollection.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No NFTs Yet</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Complete challenges and achievements to mint your first NFT
              </p>
              <button
                onClick={handleMintAchievement}
                className="btn-primary"
              >
                Mint Your First NFT
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftCollection.map((nft, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{nft.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{nft.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">#{nft.id}</span>
                      <button className="text-eco-600 dark:text-eco-400 hover:text-eco-700 dark:hover:text-eco-300 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'transfer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <div className="metric-card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Transfer EcoTokens</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Algorand address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">ECO</span>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Available: {ecoTokenBalance} ECO
                </div>
              </div>
              
              <button
                onClick={handleTransfer}
                disabled={loading || !transferAmount || !recipientAddress}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                Transfer Tokens
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Security Notice:</strong> Double-check the recipient address before sending. 
                  Blockchain transactions cannot be reversed.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}