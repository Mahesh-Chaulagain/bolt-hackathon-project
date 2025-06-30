import algosdk, { SuggestedParams } from 'algosdk'

interface AchievementData {
  title: string
  imageUrl?: string
}

interface NFT {
  id: string
  name: string
  description: string
  imageUrl: string
  mintedAt: string
}

export class AlgorandService {
  private algodClient: algosdk.Algodv2
  indexerClient: algosdk.Indexer
  ecoTokenId: number = 0

  constructor() {
    const algodToken = ''
    const algodServer = 'https://testnet-api.algonode.cloud'
    const algodPort = 443

    const indexerToken = ''
    const indexerServer = 'https://testnet-idx.algonode.cloud'
    const indexerPort = 443

    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)
    this.indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort)
  }

  async connectWallet(): Promise<string> {
    try {
      const account = algosdk.generateAccount()
      return account.addr
    } catch (error) {
      throw new Error('Failed to connect wallet')
    }
  }

  async createEcoToken(): Promise<number> {
    try {
      const creator = algosdk.generateAccount()

      const suggestedParams: SuggestedParams = await this.algodClient.getTransactionParams().do()

      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator.addr,
        suggestedParams,
        defaultFrozen: false,
        unitName: 'ECO',
        assetName: 'EcoToken',
        manager: creator.addr,
        reserve: creator.addr,
        freeze: creator.addr,
        clawback: creator.addr,
        total: 1_000_000_000,
        decimals: 6,
        assetURL: 'https://ecometer.app/token-info',
        assetMetadataHash: undefined as unknown as Uint8Array, // Explicit type fix
      })

      const signedTxn = txn.signTxn(creator.sk)
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do()

      await algosdk.waitForConfirmation(this.algodClient, txId, 4)

      const ptx = await this.algodClient.pendingTransactionInformation(txId).do()
      const assetID = ptx['asset-index'] as number | undefined

      if (!assetID) {
        throw new Error('Asset creation failed: Asset ID not found.')
      }

      this.ecoTokenId = assetID
      return assetID
    } catch (error) {
      console.error('Error creating EcoToken:', error)
      throw error
    }
  }

  async mintAchievementNFT( achievementData: AchievementData): Promise<string> {
    try {
      const creator = algosdk.generateAccount()

      const suggestedParams: SuggestedParams = await this.algodClient.getTransactionParams().do()

      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator.addr,
        suggestedParams,
        defaultFrozen: false,
        unitName: 'ECONFT',
        assetName: `EcoMeter Achievement: ${achievementData.title}`,
        manager: creator.addr,
        reserve: creator.addr,
        freeze: creator.addr,
        clawback: creator.addr,
        total: 1,
        decimals: 0,
        assetURL: achievementData.imageUrl || 'https://ecometer.app/nft-placeholder',
        assetMetadataHash: undefined as unknown as Uint8Array,
      })

      const signedTxn = txn.signTxn(creator.sk)
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do()

      await algosdk.waitForConfirmation(this.algodClient, txId, 4)

      const ptx = await this.algodClient.pendingTransactionInformation(txId).do()
      const nftId = ptx['asset-index'] as number | undefined

      if (!nftId) {
        throw new Error('NFT minting failed: Asset ID not found.')
      }

      return nftId.toString()
    } catch (error) {
      console.error('Error minting NFT:', error)
      throw error
    }
  }

  async getEcoTokenBalance(): Promise<number> {
    try {
      // Simulate for demo
      return Math.floor(Math.random() * 1000) + 100
    } catch (error) {
      console.error('Error getting token balance:', error)
      return 0
    }
  }

  async getUserNFTs(): Promise<NFT[]> {
    try {
      const now = new Date().toISOString()
      return [
        {
          id: '1001',
          name: 'First Steps Achievement',
          description: 'Completed your first carbon tracking week',
          imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
          mintedAt: now,
        },
        {
          id: '1002',
          name: 'Green Commuter',
          description: 'Used sustainable transport for 30 days',
          imageUrl: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=300',
          mintedAt: now,
        }
      ]
    } catch (error) {
      console.error('Error getting user NFTs:', error)
      return []
    }
  }

  async transferEcoTokens(from: string, to: string, amount: number): Promise<void> {
    try {
      console.log(`Transferring ${amount} ECO tokens from ${from} to ${to}`)
    } catch (error) {
      console.error('Error transferring tokens:', error)
      throw error
    }
  }

  async rewardUser(userAddress: string, amount: number, reason: string): Promise<void> {
    try {
      console.log(`Rewarding ${userAddress} with ${amount} ECO tokens for: ${reason}`)
    } catch (error) {
      console.error('Error rewarding user:', error)
      throw error
    }
  }
}
